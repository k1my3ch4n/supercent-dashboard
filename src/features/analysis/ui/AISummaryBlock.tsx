"use client";

import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import LoadingSpinner from "@shared/ui/LoadingSpinner";

const INSIGHT_ICONS = ["🔴", "⚠️", "✅", "📊", "🔮"];

const SCORE_TEXT_COLOR_CLASS = {
  green: "text-color-green",
  yellow: "text-color-yellow",
  pink: "text-color-pink",
} as const;

type ScoreColor = keyof typeof SCORE_TEXT_COLOR_CLASS;

export default function AISummaryBlock() {
  const { result, isLoading } = useAnalysisStore();

  if (isLoading) {
    return (
      <div className="rounded-size-14 border p-5 flex items-center justify-center min-h-[160px] bg-gradient-to-br from-color-pink-a09 via-color-purple-a07 to-color-blue-a07 border-color-pink-a22">
        <LoadingSpinner />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-size-14 border p-5 flex items-center justify-center min-h-[160px] bg-gradient-to-br from-color-pink-a09 via-color-purple-a07 to-color-blue-a07 border-color-pink-a22">
        <p className="text-size-12 text-color-muted">AI 분석 실행 버튼을 눌러 분석을 시작하세요.</p>
      </div>
    );
  }

  const healthScore = (result.sentimentScore / 10).toFixed(1);
  const alertsCount = result.painPoints.filter((pp) => pp.severity === "high").length;

  const scores: Array<{ value: string; label: string; color: ScoreColor }> = [
    { value: healthScore, label: "Health", color: "green" },
    { value: `${result.positivePercent}%`, label: "Positive", color: "yellow" },
    { value: String(alertsCount), label: "Alerts", color: "pink" },
  ];

  return (
    <div className="rounded-size-14 border p-5 grid gap-5 grid-cols-[1fr_auto] bg-gradient-to-br from-color-pink-a09 via-color-purple-a07 to-color-blue-a07 border-color-pink-a22">
      {/* 왼쪽: 인사이트 목록 */}
      <div>
        <div className="flex items-center gap-size-6 text-size-9 font-bold tracking-md uppercase mb-size-10 text-color-pink">
          <div className="w-size-6 h-size-6 rounded-full flex-shrink-0 pulse-animation bg-color-pink" />
          Gemini AI · 종합 분석 리포트
        </div>
        <div className="flex flex-col gap-size-7">
          {result.insights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-xs leading-[1.5] text-color-sub"
            >
              <span className="text-sm flex-shrink-0 mt-px">
                {INSIGHT_ICONS[index % INSIGHT_ICONS.length]}
              </span>
              <span>{insight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽: 스코어 + 모델 뱃지 */}
      <div className="flex flex-col gap-3 items-end">
        <div className="flex gap-4">
          {scores.map((score) => (
            <div
              key={score.label}
              className="text-center px-4 py-3 rounded-size-8 border min-w-size-80 bg-color-white-a04 border-border-color"
            >
              <div
                className={`text-size-28 font-black leading-none ${SCORE_TEXT_COLOR_CLASS[score.color]}`}
              >
                {score.value}
              </div>
              <div className="text-size-9 uppercase tracking-sm mt-1 text-color-sub">
                {score.label}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-size-5 px-size-10 py-1 rounded-full border text-size-10 font-semibold bg-color-purple-a10 border-color-purple-a20 text-color-purple">
          🤖 Powered by Gemini 2.5
        </div>
      </div>
    </div>
  );
}
