import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextRequest } from "next/server";
import type { Review } from "@shared/types/review";
import type { AnalysisResult } from "@shared/types/analysis";

const MAX_REVIEWS = 500;
const MIN_SCORE = 1;
const MAX_SCORE = 5;

class AnalysisParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AnalysisParseError";
  }
}

function isValidReview(review: unknown): review is Review {
  if (typeof review !== "object" || review === null) {
    return false;
  }

  const candidate = review as Record<string, unknown>;

  if (
    typeof candidate.id !== "string" ||
    typeof candidate.userName !== "string" ||
    typeof candidate.score !== "number" ||
    !Number.isInteger(candidate.score) ||
    candidate.score < MIN_SCORE ||
    candidate.score > MAX_SCORE ||
    typeof candidate.text !== "string" ||
    candidate.text.trim().length === 0 ||
    typeof candidate.date !== "string"
  ) {
    return false;
  }

  return true;
}

function isValidAnalysisResult(parsed: unknown): parsed is AnalysisResult {
  if (typeof parsed !== "object" || parsed === null) {
    return false;
  }

  const candidate = parsed as Record<string, unknown>;
  const sentimentLabel = candidate.sentimentLabel;
  const sentimentScore = candidate.sentimentScore;
  const categories = candidate.categories;
  const painPoints = candidate.painPoints;
  const actionItems = candidate.actionItems;
  const summary = candidate.summary;

  if (
    typeof sentimentScore !== "number" ||
    !Number.isInteger(sentimentScore) ||
    sentimentScore < 0 ||
    sentimentScore > 100 ||
    (sentimentLabel !== "긍정" && sentimentLabel !== "부정" && sentimentLabel !== "중립") ||
    typeof summary !== "string"
  ) {
    return false;
  }

  if (!Array.isArray(categories) || !Array.isArray(painPoints) || !Array.isArray(actionItems)) {
    return false;
  }

  const areCategoriesValid = categories.every((category) => {
    if (typeof category !== "object" || category === null) {
      return false;
    }

    const categoryCandidate = category as Record<string, unknown>;
    return (
      typeof categoryCandidate.name === "string" &&
      typeof categoryCandidate.count === "number" &&
      Number.isInteger(categoryCandidate.count)
    );
  });

  const arePainPointsValid = painPoints.every((painPoint) => {
    if (typeof painPoint !== "object" || painPoint === null) {
      return false;
    }

    const painPointCandidate = painPoint as Record<string, unknown>;
    return (
      typeof painPointCandidate.title === "string" &&
      typeof painPointCandidate.description === "string" &&
      (painPointCandidate.severity === "high" ||
        painPointCandidate.severity === "medium" ||
        painPointCandidate.severity === "low")
    );
  });

  const areActionItemsValid = actionItems.every((actionItem) => {
    if (typeof actionItem !== "object" || actionItem === null) {
      return false;
    }

    const actionItemCandidate = actionItem as Record<string, unknown>;
    return (
      typeof actionItemCandidate.title === "string" &&
      typeof actionItemCandidate.description === "string" &&
      (actionItemCandidate.priority === "high" ||
        actionItemCandidate.priority === "medium" ||
        actionItemCandidate.priority === "low")
    );
  });

  return areCategoriesValid && arePainPointsValid && areActionItemsValid;
}

function buildPrompt(reviews: Review[]): string {
  const reviewLines = reviews
    .map((review, index) => `[${index + 1}] 평점: ${review.score}/5\n내용: ${review.text}`)
    .join("\n\n");

  return `당신은 앱 리뷰 분석 전문가입니다. 아래 구글 플레이 스토어 리뷰 ${reviews.length}개를 분석하여 JSON 형식으로 결과를 반환하세요.

## 리뷰 목록

${reviewLines}

## 분석 요구사항

다음 JSON 구조를 정확히 따르세요. JSON 외 다른 텍스트는 절대 포함하지 마세요.

{
  "sentimentScore": <0~100 사이 정수. 0=매우 부정, 100=매우 긍정>,
  "sentimentLabel": <"긍정" | "부정" | "중립">,
  "categories": [
    { "name": <카테고리명>, "count": <해당 카테고리 언급 리뷰 수> }
  ],
  "painPoints": [
    {
      "title": <페인 포인트 제목 (30자 이내)>,
      "description": <구체적인 설명 (100자 이내)>,
      "severity": <"high" | "medium" | "low">
    }
  ],
  "actionItems": [
    {
      "title": <액션 아이템 제목 (30자 이내)>,
      "description": <구체적인 실행 방안 (100자 이내)>,
      "priority": <"high" | "medium" | "low">
    }
  ],
  "summary": <전체 리뷰 요약 (200자 이내)>
}

## 규칙

- categories는 최대 5개, painPoints는 최대 5개, actionItems는 최대 5개
- sentimentScore가 61 이상이면 "긍정", 40 이하면 "부정", 41~60이면 "중립"
- 반드시 유효한 JSON만 반환`;
}

function parseAnalysisResult(text: string): AnalysisResult {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new AnalysisParseError("No JSON found in Gemini response");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  if (!isValidAnalysisResult(parsed)) {
    throw new AnalysisParseError("Invalid analysis result structure");
  }

  return parsed;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });
  }

  let reviews: Review[];
  try {
    const body = (await request.json()) as { reviews?: unknown };

    if (!Array.isArray(body.reviews) || body.reviews.length === 0) {
      return Response.json(
        { error: "reviews array is required and must not be empty" },
        { status: 400 },
      );
    }

    const hasInvalidReview = body.reviews.some((reviewItem) => !isValidReview(reviewItem));
    if (hasInvalidReview) {
      return Response.json(
        { error: "Invalid review item structure in reviews array" },
        { status: 400 },
      );
    }

    reviews = body.reviews;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (reviews.length > MAX_REVIEWS) {
    return Response.json(
      { error: `Too many reviews. Maximum allowed is ${MAX_REVIEWS}` },
      { status: 400 },
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = buildPrompt(reviews);
    const geminiResult = await model.generateContent(prompt);
    const responseText = geminiResult.response.text();

    const analysisResult = parseAnalysisResult(responseText);

    return Response.json({ result: analysisResult, reviewCount: reviews.length });
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof AnalysisParseError) {
      console.error("Failed to parse Gemini response as JSON", { error });
      return Response.json({ error: "Failed to parse analysis result" }, { status: 500 });
    }

    console.error(
      "Failed to analyze reviews with Gemini",
      error instanceof Error ? error.message : error,
    );
    return Response.json({ error: "Failed to analyze reviews" }, { status: 500 });
  }
}
