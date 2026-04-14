"use client";

import StatCard from "./StatCard";
import { useReviewStore } from "@features/review/model/reviewStore";

export default function StatsRow() {
  const reviews = useReviewStore((state) => state.reviews);

  const totalReviews = reviews.length;
  const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
  const lowRatingCount = reviews.filter((review) => review.score <= 2).length;
  const lowRatingRate = totalReviews > 0 ? Math.round((lowRatingCount / totalReviews) * 100) : 0;

  const validReviewTimes = reviews
    .map((review) => new Date(review.date).getTime())
    .filter((reviewTime) => !Number.isNaN(reviewTime));
  const latestReviewTime = validReviewTimes.length > 0 ? Math.max(...validReviewTimes) : null;
  const sevenDaysWindowStart =
    latestReviewTime !== null ? latestReviewTime - 7 * 24 * 60 * 60 * 1000 : null;
  const recentSevenDayReviews = reviews.filter((review) => {
    const reviewTime = new Date(review.date).getTime();

    if (Number.isNaN(reviewTime) || sevenDaysWindowStart === null) {
      return false;
    }

    return reviewTime >= sevenDaysWindowStart;
  }).length;

  const averageRating = totalReviews > 0 ? (totalScore / totalReviews).toFixed(1) : "-";

  return (
    <section className="grid gap-4 grid-cols-4" aria-label="핵심 통계">
      <StatCard
        label="Collected Reviews"
        value={totalReviews.toLocaleString()}
        icon="💬"
        change={totalReviews > 0 ? "최근 수집 샘플" : "데이터 없음"}
        changeType="neutral"
        valueColorClass="text-color-pink"
        variant="highlight"
      />
      <StatCard
        label="Avg Rating"
        value={averageRating}
        icon="⭐"
        change={totalReviews > 0 ? "최근 수집 샘플 평균" : "데이터 없음"}
        changeType="neutral"
        valueColorClass="text-color-yellow"
      />
      <StatCard
        label="Response Queue"
        value={lowRatingCount.toLocaleString()}
        icon="📮"
        change={
          totalReviews > 0
            ? `저평점 ${lowRatingRate}% (${lowRatingCount.toLocaleString()}/${totalReviews.toLocaleString()})`
            : "데이터 없음"
        }
        changeType="down"
        valueColorClass="text-color-blue"
      />
      <StatCard
        label="Recent 7D Reviews"
        value={recentSevenDayReviews.toLocaleString()}
        icon="🗓️"
        change={
          totalReviews > 0
            ? `전체 대비 ${Math.round((recentSevenDayReviews / totalReviews) * 100)}%`
            : "데이터 없음"
        }
        changeType="neutral"
        valueColorClass="text-color-pink"
      />
    </section>
  );
}
