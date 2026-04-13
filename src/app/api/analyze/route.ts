import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextRequest } from "next/server";
import type { Review } from "@shared/types/review";
import type { AnalysisResult, ActionItem, ClusterItem } from "@shared/types/analysis";

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

function isValidActionItem(item: unknown): item is ActionItem {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const c = item as Record<string, unknown>;

  return (
    typeof c.title === "string" &&
    typeof c.description === "string" &&
    (c.priority === "high" || c.priority === "medium" || c.priority === "low") &&
    typeof c.reviewCount === "number" &&
    Number.isInteger(c.reviewCount) &&
    c.reviewCount >= 0 &&
    typeof c.targetSegment === "string" &&
    typeof c.timeline === "string" &&
    typeof c.impactLabel === "string" &&
    typeof c.impactPercent === "number" &&
    Number.isInteger(c.impactPercent) &&
    c.impactPercent >= 0 &&
    c.impactPercent <= 100 &&
    typeof c.confidence === "number" &&
    Number.isInteger(c.confidence) &&
    c.confidence >= 0 &&
    c.confidence <= 100
  );
}

function isValidClusterItem(item: unknown): item is ClusterItem {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const c = item as Record<string, unknown>;

  return (
    typeof c.name === "string" &&
    typeof c.count === "number" &&
    Number.isInteger(c.count) &&
    c.count >= 0 &&
    typeof c.quote === "string" &&
    Array.isArray(c.keywords) &&
    c.keywords.every((keyword: unknown) => typeof keyword === "string")
  );
}

function isValidPrediction(prediction: unknown): boolean {
  if (typeof prediction !== "object" || prediction === null) {
    return false;
  }

  const c = prediction as Record<string, unknown>;

  return (
    typeof c.currentRating === "number" &&
    c.currentRating >= 0 &&
    c.currentRating <= 5 &&
    typeof c.predictedRating14d === "number" &&
    c.predictedRating14d >= 0 &&
    c.predictedRating14d <= 5 &&
    typeof c.confidence === "number" &&
    Number.isInteger(c.confidence) &&
    c.confidence >= 0 &&
    c.confidence <= 100
  );
}

function isValidAnomalyItem(item: unknown): boolean {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const c = item as Record<string, unknown>;

  return (
    (c.level === "alert" || c.level === "warn" || c.level === "info") &&
    typeof c.highlight === "string" &&
    typeof c.text === "string"
  );
}

function isValidCSAutoReplyItem(item: unknown): boolean {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const c = item as Record<string, unknown>;

  return (
    typeof c.reviewId === "string" &&
    typeof c.userName === "string" &&
    typeof c.score === "number" &&
    Number.isInteger(c.score) &&
    c.score >= MIN_SCORE &&
    c.score <= MAX_SCORE &&
    typeof c.reviewText === "string" &&
    typeof c.draftText === "string" &&
    typeof c.languageLabel === "string" &&
    typeof c.date === "string"
  );
}

function isValidAnalysisResult(parsed: unknown): parsed is AnalysisResult {
  if (typeof parsed !== "object" || parsed === null) {
    return false;
  }

  const candidate = parsed as Record<string, unknown>;

  if (
    typeof candidate.sentimentScore !== "number" ||
    !Number.isInteger(candidate.sentimentScore) ||
    candidate.sentimentScore < 0 ||
    candidate.sentimentScore > 100 ||
    (candidate.sentimentLabel !== "긍정" &&
      candidate.sentimentLabel !== "부정" &&
      candidate.sentimentLabel !== "중립") ||
    typeof candidate.positivePercent !== "number" ||
    !Number.isInteger(candidate.positivePercent) ||
    candidate.positivePercent < 0 ||
    candidate.positivePercent > 100 ||
    typeof candidate.summary !== "string"
  ) {
    return false;
  }

  if (
    !isValidPrediction(candidate.prediction) ||
    !Array.isArray(candidate.categories) ||
    !Array.isArray(candidate.painPoints) ||
    !Array.isArray(candidate.actionItems) ||
    !Array.isArray(candidate.clusters) ||
    !Array.isArray(candidate.insights) ||
    !Array.isArray(candidate.anomalies) ||
    !Array.isArray(candidate.csReplies)
  ) {
    return false;
  }

  const areCategoriesValid = candidate.categories.every((category: unknown) => {
    if (typeof category !== "object" || category === null) {
      return false;
    }
    const c = category as Record<string, unknown>;
    return typeof c.name === "string" && typeof c.count === "number" && Number.isInteger(c.count);
  });

  const arePainPointsValid = candidate.painPoints.every((painPoint: unknown) => {
    if (typeof painPoint !== "object" || painPoint === null) {
      return false;
    }
    const c = painPoint as Record<string, unknown>;
    return (
      typeof c.title === "string" &&
      typeof c.description === "string" &&
      (c.severity === "high" || c.severity === "medium" || c.severity === "low")
    );
  });

  const areInsightsValid = candidate.insights.every(
    (insight: unknown) => typeof insight === "string",
  );

  return (
    areCategoriesValid &&
    arePainPointsValid &&
    candidate.actionItems.every(isValidActionItem) &&
    candidate.clusters.every(isValidClusterItem) &&
    candidate.anomalies.every(isValidAnomalyItem) &&
    candidate.csReplies.every(isValidCSAutoReplyItem) &&
    areInsightsValid
  );
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
  "positivePercent": <0~100 정수. 평점 4-5점 리뷰 비율>,
  "prediction": {
    "currentRating": <0~5 현재 평점. 소수점 1자리까지 허용>,
    "predictedRating14d": <0~5 14일 후 예측 평점. 소수점 1자리까지 허용>,
    "confidence": <0~100 예측 신뢰도 정수>
  },
  "anomalies": [
    {
      "level": <"alert" | "warn" | "info">,
      "highlight": <이상 신호 핵심 키워드 (30자 이내)>,
      "text": <설명 문장 (100자 이내)>
    }
  ],
  "csReplies": [
    {
      "reviewId": <원본 리뷰 ID>,
      "userName": <리뷰 작성자>,
      "score": <1~5 정수>,
      "reviewText": <원본 리뷰 내용>,
      "draftText": <AI 답변 초안 (200자 이내)>,
      "languageLabel": <언어 라벨. 예: "🇯🇵 일본어">,
      "date": <리뷰 날짜 문자열>
    }
  ],
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
      "priority": <"high" | "medium" | "low">,
      "reviewCount": <관련 리뷰 수 (정수)>,
      "targetSegment": <대상 유저 세그먼트 (20자 이내)>,
      "timeline": <권고 대응 일정. 예: "즉시 대응" | "2주 내" | "1개월 내">,
      "impactLabel": <예상 임팩트 레이블. 예: "예상 부정 리뷰 감소" | "예상 이탈률 감소">,
      "impactPercent": <0~100 예상 개선율 (정수)>,
      "confidence": <0~100 예측 신뢰도 (정수)>
    }
  ],
  "clusters": [
    {
      "name": <클러스터명 (20자 이내)>,
      "count": <해당 클러스터 관련 리뷰 수 (정수)>,
      "quote": <대표 리뷰 인용구 (120자 이내)>,
      "keywords": [<키워드1>, <키워드2>, <키워드3>, <키워드4>]
    }
  ],
  "insights": [
    <핵심 인사이트 문장 (100자 이내)>
  ],
  "summary": <전체 리뷰 요약 (200자 이내)>
}

## 규칙

- categories는 최대 5개, painPoints는 최대 5개, actionItems는 최대 5개
- clusters는 최대 4개, insights는 정확히 5개
- anomalies는 최대 3개, csReplies는 최대 3개
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
