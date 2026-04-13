import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextRequest } from "next/server";
import type { Review } from "@shared/types/review";
import type { AnalysisResult } from "@shared/types/analysis";

const MAX_REVIEWS = 500;
const MIN_SCORE = 1;
const MAX_SCORE = 5;

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

function toLabel(score: number): "긍정" | "부정" | "중립" {
  if (score >= 61) {
    return "긍정";
  }
  if (score <= 40) {
    return "부정";
  }
  return "중립";
}

function clampInteger(value: unknown, min: number, max: number, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  const integerValue = Math.round(value);
  if (integerValue < min) {
    return min;
  }
  if (integerValue > max) {
    return max;
  }
  return integerValue;
}

function clampNumber(value: unknown, min: number, max: number, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function buildDefaultAnalysisResult(reviews: Review[]): AnalysisResult {
  const reviewCount = reviews.length;
  const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
  const averageRating = reviewCount > 0 ? Number((totalScore / reviewCount).toFixed(1)) : 0;
  const positiveCount = reviews.filter((review) => review.score >= 4).length;
  const positivePercent = reviewCount > 0 ? Math.round((positiveCount / reviewCount) * 100) : 0;
  const sentimentScore = clampInteger(positivePercent, 0, 100, 50);

  return {
    sentimentScore,
    sentimentLabel: toLabel(sentimentScore),
    positivePercent,
    prediction: {
      currentRating: clampNumber(averageRating, 0, 5, 0),
      predictedRating14d: clampNumber(averageRating, 0, 5, 0),
      confidence: 70,
    },
    anomalies: [],
    csReplies: [],
    categories: [],
    painPoints: [],
    actionItems: [],
    clusters: [],
    insights: ["일부 분석 항목을 생성하지 못해 기본값으로 대체했습니다."],
    summary: "일부 분석 항목이 기본값으로 대체되었습니다.",
  };
}

function parseAnalysisResult(
  text: string,
  reviews: Review[],
): { result: AnalysisResult; warnings: string[] } {
  const warnings: string[] = [];
  const fallback = buildDefaultAnalysisResult(reviews);

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    warnings.push("Gemini 응답에서 JSON을 찾지 못해 전체 기본값으로 대체했습니다.");
    return { result: fallback, warnings };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch (error) {
    warnings.push(
      `Gemini JSON 파싱에 실패해 전체 기본값으로 대체했습니다: ${error instanceof Error ? error.message : "unknown"}`,
    );
    return { result: fallback, warnings };
  }

  if (typeof parsed !== "object" || parsed === null) {
    warnings.push("Gemini 응답 루트가 객체가 아니어서 전체 기본값으로 대체했습니다.");
    return { result: fallback, warnings };
  }

  const candidate = parsed as Record<string, unknown>;
  const result: AnalysisResult = { ...fallback };

  result.sentimentScore = clampInteger(candidate.sentimentScore, 0, 100, fallback.sentimentScore);

  if (
    candidate.sentimentLabel === "긍정" ||
    candidate.sentimentLabel === "부정" ||
    candidate.sentimentLabel === "중립"
  ) {
    result.sentimentLabel = candidate.sentimentLabel;
  } else {
    result.sentimentLabel = toLabel(result.sentimentScore);
    warnings.push("sentimentLabel 형식이 올바르지 않아 sentimentScore 기준으로 보정했습니다.");
  }

  result.positivePercent = clampInteger(
    candidate.positivePercent,
    0,
    100,
    fallback.positivePercent,
  );

  if (typeof candidate.summary === "string" && candidate.summary.trim().length > 0) {
    result.summary = candidate.summary;
  } else {
    warnings.push("summary 형식이 올바르지 않아 기본값을 사용했습니다.");
  }

  if (typeof candidate.prediction === "object" && candidate.prediction !== null) {
    const prediction = candidate.prediction as Record<string, unknown>;
    result.prediction = {
      currentRating: clampNumber(prediction.currentRating, 0, 5, fallback.prediction.currentRating),
      predictedRating14d: clampNumber(
        prediction.predictedRating14d,
        0,
        5,
        fallback.prediction.predictedRating14d,
      ),
      confidence: clampInteger(prediction.confidence, 0, 100, fallback.prediction.confidence),
    };
  } else {
    warnings.push("prediction 형식이 올바르지 않아 기본값을 사용했습니다.");
  }

  if (Array.isArray(candidate.categories)) {
    result.categories = candidate.categories
      .map((item) => {
        if (typeof item !== "object" || item === null) {
          return null;
        }
        const c = item as Record<string, unknown>;
        if (typeof c.name !== "string") {
          return null;
        }
        return { name: c.name, count: clampInteger(c.count, 0, Number.MAX_SAFE_INTEGER, 0) };
      })
      .filter((item): item is AnalysisResult["categories"][number] => item !== null)
      .slice(0, 5);
  } else {
    warnings.push("categories 형식이 올바르지 않아 기본값(빈 배열)을 사용했습니다.");
  }

  if (Array.isArray(candidate.painPoints)) {
    result.painPoints = candidate.painPoints
      .map((item) => {
        if (typeof item !== "object" || item === null) {
          return null;
        }
        const c = item as Record<string, unknown>;
        if (
          typeof c.title !== "string" ||
          typeof c.description !== "string" ||
          (c.severity !== "high" && c.severity !== "medium" && c.severity !== "low")
        ) {
          return null;
        }
        return {
          title: c.title,
          description: c.description,
          severity: c.severity,
        };
      })
      .filter((item): item is AnalysisResult["painPoints"][number] => item !== null)
      .slice(0, 5);
  } else {
    warnings.push("painPoints 형식이 올바르지 않아 기본값(빈 배열)을 사용했습니다.");
  }

  if (Array.isArray(candidate.actionItems)) {
    result.actionItems = candidate.actionItems
      .map((item) => {
        if (typeof item !== "object" || item === null) {
          return null;
        }
        const c = item as Record<string, unknown>;
        if (
          typeof c.title !== "string" ||
          typeof c.description !== "string" ||
          (c.priority !== "high" && c.priority !== "medium" && c.priority !== "low") ||
          typeof c.targetSegment !== "string" ||
          typeof c.timeline !== "string" ||
          typeof c.impactLabel !== "string"
        ) {
          return null;
        }
        return {
          title: c.title,
          description: c.description,
          priority: c.priority,
          reviewCount: clampInteger(c.reviewCount, 0, Number.MAX_SAFE_INTEGER, 0),
          targetSegment: c.targetSegment,
          timeline: c.timeline,
          impactLabel: c.impactLabel,
          impactPercent: clampInteger(c.impactPercent, 0, 100, 0),
          confidence: clampInteger(c.confidence, 0, 100, 0),
        };
      })
      .filter((item): item is AnalysisResult["actionItems"][number] => item !== null)
      .slice(0, 5);
  } else {
    warnings.push("actionItems 형식이 올바르지 않아 기본값(빈 배열)을 사용했습니다.");
  }

  if (Array.isArray(candidate.clusters)) {
    result.clusters = candidate.clusters
      .map((item) => {
        if (typeof item !== "object" || item === null) {
          return null;
        }
        const c = item as Record<string, unknown>;
        if (
          typeof c.name !== "string" ||
          typeof c.quote !== "string" ||
          !Array.isArray(c.keywords)
        ) {
          return null;
        }
        const keywords = c.keywords.filter(
          (keyword): keyword is string => typeof keyword === "string",
        );
        return {
          name: c.name,
          count: clampInteger(c.count, 0, Number.MAX_SAFE_INTEGER, 0),
          quote: c.quote,
          keywords,
        };
      })
      .filter((item): item is AnalysisResult["clusters"][number] => item !== null)
      .slice(0, 4);
  } else {
    warnings.push("clusters 형식이 올바르지 않아 기본값(빈 배열)을 사용했습니다.");
  }

  if (Array.isArray(candidate.insights)) {
    const insights = candidate.insights.filter(
      (insight): insight is string => typeof insight === "string",
    );
    result.insights = insights.length > 0 ? insights.slice(0, 5) : fallback.insights;
    if (insights.length === 0) {
      warnings.push("insights에 유효한 문자열이 없어 기본값을 사용했습니다.");
    }
  } else {
    warnings.push("insights 형식이 올바르지 않아 기본값을 사용했습니다.");
  }

  if (Array.isArray(candidate.anomalies)) {
    result.anomalies = candidate.anomalies
      .map((item) => {
        if (typeof item !== "object" || item === null) {
          return null;
        }
        const c = item as Record<string, unknown>;
        if (
          (c.level !== "alert" && c.level !== "warn" && c.level !== "info") ||
          typeof c.highlight !== "string" ||
          typeof c.text !== "string"
        ) {
          return null;
        }
        return { level: c.level, highlight: c.highlight, text: c.text };
      })
      .filter((item): item is AnalysisResult["anomalies"][number] => item !== null)
      .slice(0, 3);
  } else {
    warnings.push("anomalies 형식이 올바르지 않아 기본값(빈 배열)을 사용했습니다.");
  }

  if (Array.isArray(candidate.csReplies)) {
    result.csReplies = candidate.csReplies
      .map((item) => {
        if (typeof item !== "object" || item === null) {
          return null;
        }
        const c = item as Record<string, unknown>;
        const reviewId =
          typeof c.reviewId === "string"
            ? c.reviewId
            : typeof c.reviewId === "number"
              ? String(c.reviewId)
              : "";

        if (
          reviewId.length === 0 ||
          typeof c.userName !== "string" ||
          typeof c.reviewText !== "string" ||
          typeof c.draftText !== "string" ||
          typeof c.languageLabel !== "string" ||
          typeof c.date !== "string"
        ) {
          return null;
        }

        return {
          reviewId,
          userName: c.userName,
          score: clampInteger(c.score, MIN_SCORE, MAX_SCORE, 3),
          reviewText: c.reviewText,
          draftText: c.draftText,
          languageLabel: c.languageLabel,
          date: c.date,
        };
      })
      .filter((item): item is AnalysisResult["csReplies"][number] => item !== null)
      .slice(0, 3);
  } else {
    warnings.push("csReplies 형식이 올바르지 않아 기본값(빈 배열)을 사용했습니다.");
  }

  return { result, warnings };
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

    const { result: analysisResult, warnings } = parseAnalysisResult(responseText, reviews);

    return Response.json({ result: analysisResult, reviewCount: reviews.length, warnings });
  } catch (error) {
    console.error(
      "Failed to analyze reviews with Gemini",
      error instanceof Error ? error.message : error,
    );
    return Response.json({ error: "Failed to analyze reviews" }, { status: 500 });
  }
}
