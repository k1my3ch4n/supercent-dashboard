import Card from "@shared/ui/Card";
import Badge from "@shared/ui/Badge";
import ProgressBar from "@shared/ui/ProgressBar";
import PriorityTag, { Priority } from "@shared/ui/PriorityTag";

interface ActionItemData {
  priority: Priority;
  title: string;
  description: string;
  chips: string[];
  impactLabel: string;
  impactPercent: number;
  impactColor: string;
  confidence: number;
}

const MOCK_ACTION_ITEMS: ActionItemData[] = [
  {
    priority: "high",
    title: "이벤트 던전 크래시 핫픽스",
    description: "48시간 내 147건 크래시 급증 감지. 핫픽스 배포 전 해당 콘텐츠 임시 비활성화 권고.",
    chips: ["📋 372개 리뷰", "👥 캐주얼 유저 집중", "⏱ 즉시 대응"],
    impactLabel: "예상 부정 리뷰 감소",
    impactPercent: 72,
    impactColor: "var(--pink)",
    confidence: 94,
  },
  {
    priority: "high",
    title: "광고 노출 빈도 조정",
    description: "2레벨→5레벨당 1회로 변경. 리워드형 광고 전환 시 이탈률 35% 감소 예측.",
    chips: ["📋 286개 리뷰", "📱 신규 유저 집중", "⏱ 2주 내"],
    impactLabel: "예상 이탈률 감소",
    impactPercent: 55,
    impactColor: "var(--pink)",
    confidence: 88,
  },
  {
    priority: "medium",
    title: "다국어 CS 자동 답변 도입",
    description: "일본·독일 유저 응답률 0% 확인. AI 자동 번역 답변으로 평점 개선 기대.",
    chips: ["📋 134개 리뷰", "🌏 일본·독일 유저", "⏱ 1개월 내"],
    impactLabel: "예상 평점 개선",
    impactPercent: 40,
    impactColor: "var(--yellow)",
    confidence: 76,
  },
];

const priorityBorderColor: Record<Priority, string> = {
  high: "var(--pink)",
  medium: "var(--yellow)",
  low: "var(--blue)",
};

export default function AIActionItemList() {
  return (
    <Card>
      <div
        className="flex items-center justify-between px-[18px] py-[14px] border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div>
          <div className="text-[13px] font-extrabold">AI 추천 액션 아이템</div>
          <div className="text-[10px] mt-0.5" style={{ color: "var(--sub)" }}>
            Gemini 분석 · 우선순위 · 예상 임팩트
          </div>
        </div>
        <Badge variant="pink">AI</Badge>
      </div>
      <div className="px-[18px] py-[14px] flex flex-col gap-3">
        {MOCK_ACTION_ITEMS.map((item, index) => (
          <div
            key={index}
            className="rounded-[8px] border overflow-hidden cursor-pointer transition-transform duration-100 hover:-translate-y-px"
            style={{ background: "var(--card2)", borderColor: "var(--border-color)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-color)";
            }}
          >
            {/* 상단 */}
            <div
              className="flex gap-3 px-[14px] pt-[13px] pb-[10px] border-l-[3px]"
              style={{ borderLeftColor: priorityBorderColor[item.priority] }}
            >
              <PriorityTag priority={item.priority} />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold mb-[3px]">{item.title}</div>
                <div className="text-[11px] leading-[1.5]" style={{ color: "var(--sub)" }}>
                  {item.description}
                </div>
                <div className="flex gap-2 flex-wrap mt-[6px]">
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-[10px] px-[7px] py-0.5 rounded-[4px] border"
                      style={{
                        background: "rgba(255,255,255,.04)",
                        color: "var(--sub)",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* 하단: 임팩트 바 */}
            <div
              className="flex items-center gap-[10px] px-[14px] py-[9px] border-t"
              style={{ borderColor: "var(--border-color)", background: "rgba(0,0,0,.2)" }}
            >
              <span className="text-[10px] flex-shrink-0" style={{ color: "var(--muted)" }}>
                {item.impactLabel}
              </span>
              <ProgressBar value={item.impactPercent} color={item.impactColor} />
              <span
                className="text-[11px] font-bold flex-shrink-0"
                style={{ color: item.impactColor }}
              >
                −{item.impactPercent}%
              </span>
              <span className="text-[10px] flex-shrink-0 ml-auto" style={{ color: "var(--muted)" }}>
                신뢰도 {item.confidence}%
              </span>
              <button
                className="text-[10px] font-bold px-[9px] py-[3px] rounded-[4px] border cursor-pointer transition-all duration-100"
                style={{
                  borderColor: "var(--border-color)",
                  background: "none",
                  color: "var(--sub)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--pink)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--pink)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-color)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--sub)";
                }}
              >
                Jira 생성
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
