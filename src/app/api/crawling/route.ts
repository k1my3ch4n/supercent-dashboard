import googlePlay from "google-play-scraper";
import type { NextRequest } from "next/server";
import type { Review } from "@/shared/types/review";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const appId = searchParams.get("appId");
  const lang = searchParams.get("lang") ?? "en";
  const num = Number(searchParams.get("num") ?? "100");

  if (!appId) {
    return Response.json({ error: "appId is required" }, { status: 400 });
  }

  if (isNaN(num) || num < 1 || num > 5000) {
    return Response.json({ error: "num must be a number between 1 and 5000" }, { status: 400 });
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
    }));

    return Response.json({ reviews, total: reviews.length, appId, lang });
  } catch (error) {
    const isNotFound =
      error instanceof Error &&
      (error.message.includes("404") || error.message.includes("not found"));

    if (isNotFound) {
      return Response.json({ error: `App '${appId}' not found` }, { status: 404 });
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: `Failed to fetch reviews: ${message}` }, { status: 500 });
  }
}
