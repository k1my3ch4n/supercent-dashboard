"use client";

import { useRef, useState } from "react";
import Card from "@shared/ui/Card";
import LoadingSpinner from "@shared/ui/LoadingSpinner";
import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import ReplyCard from "./ReplyCard";

export default function AICSAutoReply() {
  const { result, isLoading } = useAnalysisStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasCollapsedOverflow, setHasCollapsedOverflow] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const csReplies = result?.csReplies ?? [];
  const shouldShowToggle = !isLoading && (isExpanded || hasCollapsedOverflow);

  function updateCollapsedOverflow() {
    if (isExpanded) {
      return;
    }
    if (!contentRef.current) {
      setHasCollapsedOverflow(false);
      return;
    }
    const { scrollHeight, clientHeight } = contentRef.current;
    setHasCollapsedOverflow(scrollHeight > clientHeight + 1);
  }

  function handleToggleExpand() {
    setIsExpanded((previousValue) => !previousValue);
    requestAnimationFrame(() => {
      cardContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      updateCollapsedOverflow();
    });
  }

  return (
    <div ref={cardContainerRef}>
      <Card
        className={`${isExpanded ? "h-auto" : "h-[620px] md:h-[460px]"} flex flex-col`}
        title="AI CS 자동 답변"
        subtitle="부정 리뷰 · AI 초안 자동 생성 · 다국어 지원"
        badgeVariant="purple"
        footer={
          shouldShowToggle ? (
            <div className="relative z-20 px-size-18 py-size-14 border-t border-border-color bg-color-card">
              <button
                onClick={handleToggleExpand}
                className="w-full text-size-11 font-bold text-color-sub hover:text-white transition-colors py-1"
              >
                {isExpanded ? "접기" : "더보기"}
              </button>
            </div>
          ) : undefined
        }
      >
        <div
          ref={(node) => {
            contentRef.current = node;
            updateCollapsedOverflow();
          }}
          className="px-size-18 py-size-14 pb-size-18 flex-1 min-h-0 flex flex-col gap-size-14"
        >
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
            csReplies.map((replyItem, index) => (
              <ReplyCard key={replyItem.reviewId} item={replyItem} index={index} />
            ))}
        </div>
      </Card>
    </div>
  );
}
