const MOCK_INSIGHTS = [
  {
    icon: "🔴",
    html: '<strong>광고 빈도 과다</strong>가 전체 부정 리뷰의 <span class="hl-red">38%</span>를 차지합니다. 특히 레벨 10-20 구간에서 집중 발생 중입니다.',
    text: "광고 빈도 과다가 전체 부정 리뷰의 38%를 차지합니다. 특히 레벨 10-20 구간에서 집중 발생 중입니다.",
  },
  {
    icon: "⚠️",
    text: "이벤트 던전 크래시 버그가 신규 감지됐습니다. 지난 48시간 내 147건 급증 — 즉각 대응이 필요합니다.",
    highlight: { pattern: "147건", color: "var(--pink)" },
  },
  {
    icon: "✅",
    text: "결제 관련 불만이 전주 대비 23% 감소했습니다. 지난 업데이트의 결제 플로우 개선이 효과를 보이고 있습니다.",
    highlight: { pattern: "23% 감소", color: "var(--green)" },
  },
  {
    icon: "📊",
    text: "일본·독일 유저의 응답률이 낮아 다국어 CS 대응이 부재한 상황입니다. 자동 번역 답변 도입을 권고합니다.",
  },
  {
    icon: "🔮",
    text: "현재 추세 지속 시 14일 내 평점 3.9 하락이 예측됩니다. 광고 빈도 조정 시 4.3 회복 가능합니다.",
  },
];

const MOCK_SCORES = [
  { value: "7.2", label: "Health", colorVar: "var(--green)" },
  { value: "62%", label: "Positive", colorVar: "var(--yellow)" },
  { value: "8", label: "Alerts", colorVar: "var(--pink)" },
];

export default function AISummaryBlock() {
  return (
    <div
      className="rounded-[14px] border p-5 grid gap-5"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,45,122,.09), rgba(182,109,255,.07), rgba(0,180,255,.07))",
        borderColor: "rgba(255,45,122,.22)",
        gridTemplateColumns: "1fr auto",
      }}
    >
      {/* 왼쪽: 인사이트 목록 */}
      <div>
        <div
          className="flex items-center gap-[6px] text-[9px] font-bold tracking-[2px] uppercase mb-[10px]"
          style={{ color: "var(--pink)" }}
        >
          <div
            className="w-[6px] h-[6px] rounded-full flex-shrink-0 pulse-animation"
            style={{ background: "var(--pink)" }}
          />
          Gemini AI · 종합 분석 리포트
        </div>
        <div className="flex flex-col gap-[7px]">
          {MOCK_INSIGHTS.map((insight, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-xs leading-[1.5]"
              style={{ color: "#ccc" }}
            >
              <span className="text-sm flex-shrink-0 mt-px">{insight.icon}</span>
              <span>{insight.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽: 스코어 + 모델 뱃지 */}
      <div className="flex flex-col gap-3 items-end">
        <div className="flex gap-4">
          {MOCK_SCORES.map((score) => (
            <div
              key={score.label}
              className="text-center px-4 py-3 rounded-[8px] border min-w-[80px]"
              style={{ background: "rgba(255,255,255,.04)", borderColor: "var(--border-color)" }}
            >
              <div
                className="text-[28px] font-black leading-none"
                style={{ color: score.colorVar }}
              >
                {score.value}
              </div>
              <div
                className="text-[9px] uppercase tracking-[1px] mt-1"
                style={{ color: "var(--sub)" }}
              >
                {score.label}
              </div>
            </div>
          ))}
        </div>
        <div
          className="flex items-center gap-[5px] px-[10px] py-1 rounded-full border text-[10px] font-semibold"
          style={{
            background: "rgba(182,109,255,.1)",
            borderColor: "rgba(182,109,255,.2)",
            color: "var(--purple)",
          }}
        >
          🤖 Powered by Gemini 2.0
        </div>
      </div>
    </div>
  );
}
