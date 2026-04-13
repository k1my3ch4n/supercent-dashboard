"use client";

import Card from "@shared/ui/Card";
import LoadingSpinner from "@shared/ui/LoadingSpinner";
import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import ReplyCard from "./ReplyCard";

export default function AICSAutoReply() {
  const { result, isLoading } = useAnalysisStore();

  return (
    <Card
      className="h-[460px] flex flex-col"
      title="AI CS 자동 답변"
      subtitle="부정 리뷰 · AI 초안 자동 생성 · 다국어 지원"
      badgeVariant="purple"
    >
      <div className="px-size-18 py-size-14 flex-1 min-h-0 overflow-y-auto flex flex-col gap-size-14">
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && !result && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-size-12 text-color-muted text-center">
              분석 결과가 없습니다. AI 분석을 실행하세요.
            </p>
          </div>
        )}
        {!isLoading && result?.csReplies.length === 0 && (
          <p className="text-size-11 text-color-muted">생성된 CS 자동 답변이 없습니다.</p>
        )}
        {!isLoading &&
          result?.csReplies.map((replyItem, index) => (
            <ReplyCard key={replyItem.reviewId} item={replyItem} index={index} />
          ))}
      </div>
    </Card>
  );
}
