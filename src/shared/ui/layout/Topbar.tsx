"use client";

export type Period = "7D" | "30D" | "90D";

interface TopbarProps {
  gameName: string;
  activePeriod: Period;
  onPeriodChange: (period: Period) => void;
  onBack: () => void;
  onRunAI: () => void;
  isAnalyzing?: boolean;
}

const PERIODS: Period[] = ["7D", "30D", "90D"];

export default function Topbar({
  gameName,
  activePeriod,
  onPeriodChange,
  onBack,
  onRunAI,
  isAnalyzing = false,
}: TopbarProps) {
  return (
    <div
      className="flex items-center justify-between px-7 h-14 border-b sticky top-0 z-[5]"
      style={{ background: "var(--bg)", borderColor: "var(--border-color)" }}
    >
      {/* 왼쪽 */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-1 px-[10px] py-[5px] rounded-[8px] border text-xs cursor-pointer transition-all duration-100"
          style={{ borderColor: "var(--border-color)", background: "none", color: "var(--sub)" }}
          onClick={onBack}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--sub)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-color)";
          }}
        >
          ← 목록
        </button>
        <div>
          <div className="text-base font-extrabold">{gameName}</div>
          <div className="text-[11px] mt-0.5" style={{ color: "var(--sub)" }}>
            AI Review Intelligence Dashboard
          </div>
        </div>
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-2">
        <div className="flex gap-px rounded-[8px] p-[3px]" style={{ background: "var(--card2)" }}>
          {PERIODS.map((period) => (
            <button
              key={period}
              className="text-[11px] font-semibold px-[11px] py-[5px] rounded-[6px] cursor-pointer border-none transition-all duration-100"
              style={
                activePeriod === period
                  ? { background: "var(--card)", color: "#fff" }
                  : { background: "transparent", color: "var(--sub)" }
              }
              onClick={() => {
                onPeriodChange(period);
              }}
            >
              {period}
            </button>
          ))}
        </div>
        <button
          className="flex items-center gap-[6px] text-white border-none rounded-[8px] px-[14px] py-2 text-xs font-bold cursor-pointer transition-opacity duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: "var(--pink)" }}
          onClick={onRunAI}
          disabled={isAnalyzing}
        >
          <div className="w-[7px] h-[7px] rounded-full bg-white flex-shrink-0 pulse-animation" />
          AI 분석 실행
        </button>
      </div>
    </div>
  );
}
