import googlePlay from "google-play-scraper";
import type { NextRequest } from "next/server";
import type { Review } from "@shared/types/review";

const MIN_REVIEW_COUNT = 1;
const MAX_REVIEW_COUNT = 5000;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const appId = searchParams.get("appId");
  const lang = searchParams.get("lang") ?? "en";
  const num = Number(searchParams.get("num") ?? "100");

  if (!appId) {
    return Response.json({ error: "appId is required" }, { status: 400 });
  }

  if (!Number.isInteger(num) || num < MIN_REVIEW_COUNT || num > MAX_REVIEW_COUNT) {
    return Response.json(
      { error: `num must be an integer between ${MIN_REVIEW_COUNT} and ${MAX_REVIEW_COUNT}` },
      { status: 400 },
    );
  }

  try {
    const result = await googlePlay.reviews({ appId, lang, num });
    const rawReviews = Array.isArray(result) ? result : result.data;

    const reviews: Review[] = rawReviews.map((review) => ({
      id: review.id,
      userName: review.userName,
      score: review.score,
      text: review.text,
      date: review.date instanceof Date ? review.date.toISOString() : String(review.date),
      country: lang,
    }));

    return Response.json({ reviews, total: reviews.length, appId, lang });
  } catch (error) {
    const isNotFound =
      error instanceof Error && (error as Error & { status?: number }).status === 404;

    if (isNotFound) {
      return Response.json({ error: `App '${appId}' not found` }, { status: 404 });
    }

    console.error("Failed to fetch Google Play reviews", {
      appId,
      lang,
      num,
      error,
    });

    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
