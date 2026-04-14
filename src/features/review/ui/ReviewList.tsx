"use client";

import { useState } from "react";
import Card from "@shared/ui/Card";
import LoadingSpinner from "@shared/ui/LoadingSpinner";
import ErrorMessage from "@shared/ui/ErrorMessage";
import ReviewItem from "./ReviewItem";
import { useReviewStore } from "@features/review/model/reviewStore";

const AVATAR_COLORS = ["#3d0060", "#7a1a00", "#005530", "#00102a", "#2a0500", "#003070", "#5c3300"];

const PAGE_SIZE = 10;

export default function ReviewList() {
  const { reviews, isLoading, error } = useReviewStore();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const displayedReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  function handleLoadMore() {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }

  return (
    <Card
      title="최근 리뷰"
      subtitle="실시간 수집 · Google Play"
      badgeVariant="pink"
      badgeText={reviews.length > 0 ? `${reviews.length}개` : "0개"}
      footer={
        !isLoading && !error && hasMore ? (
          <div className="px-size-18 py-size-14 border-t border-border-color">
            <button
              onClick={handleLoadMore}
              className="w-full text-size-11 font-bold text-color-sub hover:text-white transition-colors py-1"
            >
              더보기 ({reviews.length - visibleCount}개 남음)
            </button>
          </div>
        ) : undefined
      }
    >
      <section aria-label="최근 리뷰 목록">
        {isLoading && (
          <section className="flex justify-center py-8">
            <LoadingSpinner />
          </section>
        )}
        {!isLoading && error && (
          <section className="px-size-18 py-size-14">
            <ErrorMessage message={error} />
          </section>
        )}
        {!isLoading && !error && reviews.length === 0 && (
          <p className="text-size-12 text-color-muted py-8 text-center">
            AI 분석을 실행하면 리뷰를 불러옵니다.
          </p>
        )}
        {!isLoading && !error && displayedReviews.length > 0 && (
          <ul>
            {displayedReviews.map((review, index) => (
              <ReviewItem
                key={review.id}
                userName={review.userName}
                score={review.score}
                text={review.text}
                date={new Date(review.date).toLocaleDateString("ko-KR")}
                dateTime={review.date}
                avatarColor={AVATAR_COLORS[index % AVATAR_COLORS.length]}
              />
            ))}
          </ul>
        )}
      </section>
    </Card>
  );
}
