"use client";

import Card from "@shared/ui/Card";
import Badge from "@shared/ui/Badge";
import LoadingSpinner from "@shared/ui/LoadingSpinner";
import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import ReplyCard from "./ReplyCard";

export default function AICSAutoReply() {
  const { result, isLoading } = useAnalysisStore();

  return (
    <Card>
      <div className="flex items-center justify-between px-size-18 py-size-14 border-b border-border-color">
        <div>
          <div className="text-size-13 font-extrabold">AI CS 자동 답변</div>
          <div className="text-size-10 mt-0.5 text-color-sub">
            부정 리뷰 · AI 초안 자동 생성 · 다국어 지원
          </div>
        </div>
        <Badge variant="purple">AI</Badge>
      </div>
      <div className="px-size-18 py-size-14 flex flex-col gap-size-14">
        {isLoading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && !result && (
          <p className="text-size-12 text-color-muted py-8 text-center">
            분석 결과가 없습니다. AI 분석을 실행하세요.
          </p>
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
