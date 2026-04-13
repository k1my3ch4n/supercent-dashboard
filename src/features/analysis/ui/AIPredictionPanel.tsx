"use client";

import { useRef, useState } from "react";
import Card from "@shared/ui/Card";
import LoadingSpinner from "@shared/ui/LoadingSpinner";
import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import type { AnomalyItem } from "@shared/types/analysis";

type AnomalyLevel = AnomalyItem["level"];

const anomalyIcon: Record<AnomalyLevel, string> = {
  alert: "🚨",
  warn: "⚠️",
  info: "ℹ️",
};

const levelConfig: Record<AnomalyLevel, { label: string; bgClass: string; textClass: string }> = {
  alert: {
    label: "ALERT",
    bgClass: "bg-color-pink-a14",
    textClass: "text-color-pink",
  },
  warn: {
    label: "WARN",
    bgClass: "bg-color-yellow-a11",
    textClass: "text-color-yellow",
  },
  info: {
    label: "INFO",
    bgClass: "bg-color-blue-a11",
    textClass: "text-color-blue",
  },
};

export default function AIPredictionPanel() {
  const { result, isLoading } = useAnalysisStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasCollapsedOverflow, setHasCollapsedOverflow] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
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
        title="AI 예측 & 이상 탐지"
        subtitle="평점 예측 포캐스트 · 이상 신호 감지"
        badgeVariant="blue"
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
          {!isLoading && result && (
            <>
              <div className="flex items-center gap-3 p-size-14 rounded-size-8 border bg-color-card-2 border-border-color">
                <div>
                  <div className="text-size-10 font-semibold tracking-xs mb-1 text-color-sub">
                    현재 평점
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-size-28 font-black text-color-yellow">
                      {result.prediction.currentRating.toFixed(1)}
                    </span>
                    <span className="text-base">→</span>
                    <span className="text-size-22 font-black text-color-pink">
                      {result.prediction.predictedRating14d.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-size-10 mt-size-3 text-color-sub">14일 후 예측</div>
                </div>
                <div className="ml-auto text-center">
                  <div className="text-size-18 font-extrabold text-color-purple">
                    {result.prediction.confidence}%
                  </div>
                  <div className="text-size-9 uppercase tracking-sm text-color-muted">신뢰도</div>
                </div>
              </div>

              <div>
                <div className="text-size-10 font-bold tracking-sm uppercase mb-2 text-color-muted">
                  이상 탐지
                </div>
                {result.anomalies.length === 0 && (
                  <p className="text-size-11 text-color-muted">현재 감지된 이상 신호가 없습니다.</p>
                )}
                <div className="flex flex-col gap-2">
                  {result.anomalies.map((anomaly, index) => {
                    const config = levelConfig[anomaly.level];
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-size-10 px-3 py-size-10 rounded-size-8 border bg-color-card-2 border-border-color"
                      >
                        <span className="text-base flex-shrink-0 mt-px">
                          {anomalyIcon[anomaly.level]}
                        </span>
                        <p className="text-size-11 leading-[1.5] flex-1 text-color-soft">
                          <strong className="text-white">{anomaly.highlight}</strong>
                          {anomaly.text}
                        </p>
                        <span
                          className={`text-size-9 font-bold px-size-6 py-0.5 rounded-size-4 flex-shrink-0 self-start ${config.bgClass} ${config.textClass}`}
                        >
                          {config.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
