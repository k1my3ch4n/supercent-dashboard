"use client";

import { useState } from "react";
import { useDashboardFilterStore, Period } from "@shared/model/dashboardFilterStore";

export type { Period };

interface TopbarProps {
  gameName: string;
  onBack: () => void;
  onRunAI: () => void;
  isAnalyzing?: boolean;
}

const PERIODS: Period[] = ["7D", "30D", "90D"];

export default function Topbar({ gameName, onBack, onRunAI, isAnalyzing = false }: TopbarProps) {
  const { activePeriod, setPeriod } = useDashboardFilterStore();
  const [isBackHovered, setIsBackHovered] = useState(false);

  return (
    <div className="flex items-center justify-between px-7 h-14 border-b border-border-color sticky top-0 z-[5] bg-black">
      {/* 왼쪽 */}
      <div className="flex items-center gap-3">
        <button
          className={`flex items-center gap-1 px-size-10 py-size-5 rounded-size-8 border text-xs cursor-pointer transition-all duration-100 ${
            isBackHovered
              ? "text-white border-color-white-a20"
              : "text-color-sub border-border-color"
          }`}
          onClick={onBack}
          onMouseEnter={() => setIsBackHovered(true)}
          onMouseLeave={() => setIsBackHovered(false)}
        >
          ← 목록
        </button>
        <div>
          <div className="text-base font-extrabold">{gameName}</div>
          <div className="text-size-11 mt-0.5 text-color-sub">AI Review Intelligence Dashboard</div>
        </div>
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-2">
        <div className="flex gap-px rounded-size-8 p-size-3 bg-color-card-2">
          {PERIODS.map((period) => (
            <button
              key={period}
              className={`text-size-11 font-semibold px-size-11 py-size-5 rounded-size-6 cursor-pointer border-none transition-all duration-100 ${
                activePeriod === period
                  ? "bg-color-card text-white"
                  : "bg-transparent text-color-sub"
              }`}
              onClick={() => setPeriod(period)}
            >
              {period}
            </button>
          ))}
        </div>
        <button
          className="flex items-center gap-size-6 text-white border-none rounded-size-8 px-size-14 py-2 text-xs font-bold cursor-pointer transition-opacity duration-150 disabled:opacity-40 disabled:cursor-not-allowed bg-color-pink"
          onClick={onRunAI}
          disabled={isAnalyzing}
        >
          <div className="w-size-7 h-size-7 rounded-full bg-white flex-shrink-0 pulse-animation" />
          AI 분석 실행
        </button>
      </div>
    </div>
  );
}
