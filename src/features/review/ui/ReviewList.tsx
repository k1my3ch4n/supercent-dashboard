"use client";

import Card from "@shared/ui/Card";
import LoadingSpinner from "@shared/ui/LoadingSpinner";
import ErrorMessage from "@shared/ui/ErrorMessage";
import ReviewItem from "./ReviewItem";
import { useReviewStore } from "@features/review/model/reviewStore";

const AVATAR_COLORS = ["#3d0060", "#7a1a00", "#005530", "#00102a", "#2a0500", "#003070", "#5c3300"];

const MAX_DISPLAY = 10;

export default function ReviewList() {
  const { reviews, isLoading, error } = useReviewStore();

  const displayedReviews = reviews.slice(0, MAX_DISPLAY);

  return (
    <Card>
      <div className="flex items-center justify-between px-size-18 py-size-14 border-b border-border-color">
        <div>
          <div className="text-size-13 font-extrabold">최근 리뷰</div>
          <div className="text-size-10 mt-0.5 text-color-sub">실시간 수집 · Google Play</div>
        </div>
        {reviews.length > 0 && (
          <span className="text-size-10 font-bold px-2 py-0.5 rounded-full bg-color-pink-a14 text-color-pink">
            {reviews.length}개
          </span>
        )}
      </div>
      <div>
        {isLoading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && error && (
          <div className="px-size-18 py-size-14">
            <ErrorMessage message={error} />
          </div>
        )}
        {!isLoading && !error && reviews.length === 0 && (
          <p className="text-size-12 text-color-muted py-8 text-center">
            AI 분석을 실행하면 리뷰를 불러옵니다.
          </p>
        )}
        {!isLoading &&
          !error &&
          displayedReviews.map((review, index) => (
            <ReviewItem
              key={review.id}
              userName={review.userName}
              score={review.score}
              text={review.text}
              date={new Date(review.date).toLocaleDateString("ko-KR")}
              avatarColor={AVATAR_COLORS[index % AVATAR_COLORS.length]}
            />
          ))}
      </div>
    </Card>
  );
}
