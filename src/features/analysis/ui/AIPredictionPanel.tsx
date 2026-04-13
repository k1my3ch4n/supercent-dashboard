import Card from "@shared/ui/Card";
import Badge from "@shared/ui/Badge";

type AnomalyLevel = "alert" | "warn" | "info";

interface AnomalyItemData {
  level: AnomalyLevel;
  icon: string;
  text: string;
  highlight: string;
}

const MOCK_ANOMALIES: AnomalyItemData[] = [
  {
    level: "alert",
    icon: "🚨",
    highlight: "이벤트 던전 크래시",
    text: "가 48시간 내 147건 급증. 즉각 대응 필요.",
  },
  {
    level: "warn",
    icon: "⚠️",
    highlight: "광고 관련 부정 리뷰",
    text: "가 지난주 대비 23% 증가 추세.",
  },
  {
    level: "info",
    icon: "ℹ️",
    highlight: "일본 마켓 평점",
    text: "이 3.2로 전체 평균 대비 0.9 낮은 상태.",
  },
];

const levelConfig: Record<AnomalyLevel, { bg: string; color: string; label: string }> = {
  alert: { bg: "rgba(255,45,122,.14)", color: "var(--pink)", label: "ALERT" },
  warn: { bg: "rgba(255,230,0,.11)", color: "var(--yellow)", label: "WARN" },
  info: { bg: "rgba(0,180,255,.11)", color: "var(--blue)", label: "INFO" },
};

export default function AIPredictionPanel() {
  return (
    <Card>
      <div
        className="flex items-center justify-between px-[18px] py-[14px] border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div>
          <div className="text-[13px] font-extrabold">AI 예측 & 이상 탐지</div>
          <div className="text-[10px] mt-0.5" style={{ color: "var(--sub)" }}>
            평점 예측 포캐스트 · 이상 신호 감지
          </div>
        </div>
        <Badge variant="blue">AI</Badge>
      </div>
      <div className="px-[18px] py-[14px] flex flex-col gap-[14px]">
        {/* 평점 예측 포캐스트 */}
        <div
          className="flex items-center gap-3 p-[14px] rounded-[8px] border"
          style={{ background: "var(--card2)", borderColor: "var(--border-color)" }}
        >
          <div>
            <div
              className="text-[10px] font-semibold tracking-[0.5px] mb-1"
              style={{ color: "var(--sub)" }}
            >
              현재 평점
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-black" style={{ color: "var(--yellow)" }}>
                4.1
              </span>
              <span className="text-base">→</span>
              <span className="text-[22px] font-black" style={{ color: "var(--pink)" }}>
                3.9
              </span>
            </div>
            <div className="text-[10px] mt-[3px]" style={{ color: "var(--sub)" }}>
              14일 후 예측
            </div>
          </div>
          <div className="ml-auto text-center">
            <div className="text-[18px] font-extrabold" style={{ color: "var(--purple)" }}>
              84%
            </div>
            <div className="text-[9px] uppercase tracking-[1px]" style={{ color: "var(--muted)" }}>
              신뢰도
            </div>
          </div>
        </div>

        {/* 이상 탐지 목록 */}
        <div>
          <div
            className="text-[10px] font-bold tracking-[1px] uppercase mb-2"
            style={{ color: "var(--muted)" }}
          >
            이상 탐지
          </div>
          <div className="flex flex-col gap-2">
            {MOCK_ANOMALIES.map((anomaly, index) => {
              const config = levelConfig[anomaly.level];
              return (
                <div
                  key={index}
                  className="flex items-start gap-[10px] px-3 py-[10px] rounded-[8px] border"
                  style={{ background: "var(--card2)", borderColor: "var(--border-color)" }}
                >
                  <span className="text-base flex-shrink-0 mt-px">{anomaly.icon}</span>
                  <p className="text-[11px] leading-[1.5] flex-1" style={{ color: "#ccc" }}>
                    <strong style={{ color: "#fff" }}>{anomaly.highlight}</strong>
                    {anomaly.text}
                  </p>
                  <span
                    className="text-[9px] font-bold px-[6px] py-0.5 rounded-[4px] flex-shrink-0 self-start"
                    style={{ background: config.bg, color: config.color }}
                  >
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
