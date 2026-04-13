"use client";

import Card from "@shared/ui/Card";
import Badge from "@shared/ui/Badge";
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

  return (
    <Card>
      <div className="flex items-center justify-between px-size-18 py-size-14 border-b border-border-color">
        <div>
          <div className="text-size-13 font-extrabold">AI 예측 & 이상 탐지</div>
          <div className="text-size-10 mt-0.5 text-color-sub">
            평점 예측 포캐스트 · 이상 신호 감지
          </div>
        </div>
        <Badge variant="blue">AI</Badge>
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
        {!isLoading && result && (
          <>
            {/* 평점 예측 포캐스트 */}
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

            {/* 이상 탐지 목록 */}
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
                      className={`flex items-start gap-size-10 px-3 py-size-10 rounded-size-8 border bg-color-card-2 border-border-color`}
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
  );
}
