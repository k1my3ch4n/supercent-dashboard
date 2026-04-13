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

const levelConfig: Record<
  AnomalyLevel,
  { bg: string; color: string; label: string; bgClass: string; textClass: string }
> = {
  alert: {
    bg: "rgba(255,45,122,.14)",
    color: "var(--pink)",
    label: "ALERT",
    bgClass: "bg-color-pink-a14",
    textClass: "text-color-pink",
  },
  warn: {
    bg: "rgba(255,230,0,.11)",
    color: "var(--yellow)",
    label: "WARN",
    bgClass: "bg-color-yellow-a11",
    textClass: "text-color-yellow",
  },
  info: {
    bg: "rgba(0,180,255,.11)",
    color: "var(--blue)",
    label: "INFO",
    bgClass: "bg-color-blue-a11",
    textClass: "text-color-blue",
  },
};

export default function AIPredictionPanel() {
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
        {/* 평점 예측 포캐스트 */}
        <div className="flex items-center gap-3 p-size-14 rounded-size-8 border bg-color-card-2 border-border-color">
          <div>
            <div className="text-size-10 font-semibold tracking-xs mb-1 text-color-sub">
              현재 평점
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-size-28 font-black text-color-yellow">4.1</span>
              <span className="text-base">→</span>
              <span className="text-size-22 font-black text-color-pink">3.9</span>
            </div>
            <div className="text-size-10 mt-size-3 text-color-sub">14일 후 예측</div>
          </div>
          <div className="ml-auto text-center">
            <div className="text-size-18 font-extrabold text-color-purple">84%</div>
            <div className="text-size-9 uppercase tracking-sm text-color-muted">신뢰도</div>
          </div>
        </div>

        {/* 이상 탐지 목록 */}
        <div>
          <div className="text-size-10 font-bold tracking-sm uppercase mb-2 text-color-muted">
            이상 탐지
          </div>
          <div className="flex flex-col gap-2">
            {MOCK_ANOMALIES.map((anomaly, index) => {
              const config = levelConfig[anomaly.level];
              return (
                <div
                  key={index}
                  className={`flex items-start gap-size-10 px-3 py-size-10 rounded-size-8 border bg-color-card-2 border-border-color`}
                >
                  <span className="text-base flex-shrink-0 mt-px">{anomaly.icon}</span>
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
      </div>
    </Card>
  );
}
