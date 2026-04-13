import Card from "@shared/ui/Card";
import Badge from "@shared/ui/Badge";
import ProgressBar from "@shared/ui/ProgressBar";
import { ProgressBarColor } from "@shared/ui/ProgressBar";
import PriorityTag, { Priority } from "@shared/ui/PriorityTag";
import { useState } from "react";

interface ActionItemData {
  priority: Priority;
  title: string;
  description: string;
  chips: string[];
  impactLabel: string;
  impactPercent: number;
  impactColor: ProgressBarColor;
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
    impactColor: "pink",
    confidence: 94,
  },
  {
    priority: "high",
    title: "광고 노출 빈도 조정",
    description: "2레벨→5레벨당 1회로 변경. 리워드형 광고 전환 시 이탈률 35% 감소 예측.",
    chips: ["📋 286개 리뷰", "📱 신규 유저 집중", "⏱ 2주 내"],
    impactLabel: "예상 이탈률 감소",
    impactPercent: 55,
    impactColor: "pink",
    confidence: 88,
  },
  {
    priority: "medium",
    title: "다국어 CS 자동 답변 도입",
    description: "일본·독일 유저 응답률 0% 확인. AI 자동 번역 답변으로 평점 개선 기대.",
    chips: ["📋 134개 리뷰", "🌏 일본·독일 유저", "⏱ 1개월 내"],
    impactLabel: "예상 평점 개선",
    impactPercent: 40,
    impactColor: "yellow",
    confidence: 76,
  },
];

const priorityBorderColorClass: Record<Priority, string> = {
  high: "border-color-pink",
  medium: "border-color-yellow",
  low: "border-color-blue",
};

const impactTextColorClass: Record<ProgressBarColor, string> = {
  pink: "text-color-pink",
  green: "text-color-green",
  yellow: "text-color-yellow",
  blue: "text-color-blue",
  purple: "text-color-purple",
};

export default function AIActionItemList() {
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  const [hoveredJiraIndex, setHoveredJiraIndex] = useState<number | null>(null);
  return (
    <Card>
      <div className="flex items-center justify-between px-size-18 py-size-14 border-b border-border-color">
        <div>
          <div className="text-size-13 font-extrabold">AI 추천 액션 아이템</div>
          <div className="text-size-10 mt-0.5 text-color-sub">
            Gemini 분석 · 우선순위 · 예상 임팩트
          </div>
        </div>
        <Badge variant="pink">AI</Badge>
      </div>
      <div className="px-size-18 py-size-14 flex flex-col gap-3">
        {MOCK_ACTION_ITEMS.map((item, index) => (
          <div
            key={index}
            className={`rounded-size-8 border overflow-hidden cursor-pointer transition-transform duration-100 hover:-translate-y-px bg-color-card-2 ${
              hoveredItemIndex === index ? "border-color-white-a12" : "border-border-color"
            }`}
            onMouseEnter={() => setHoveredItemIndex(index)}
            onMouseLeave={() => setHoveredItemIndex(null)}
          >
            {/* 상단 */}
            <div
              className={`flex gap-3 px-size-14 pt-size-13 pb-size-10 border-l-size-3 ${priorityBorderColorClass[item.priority]}`}
            >
              <PriorityTag priority={item.priority} />
              <div className="flex-1 min-w-0">
                <div className="text-size-13 font-bold mb-size-3">{item.title}</div>
                <div className="text-size-11 leading-[1.5] text-color-sub">{item.description}</div>
                <div className="flex gap-2 flex-wrap mt-size-6">
                  {item.chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-size-10 px-size-7 py-0.5 rounded-size-4 border bg-color-white-a04 text-color-sub border-border-color"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* 하단: 임팩트 바 */}
            <div className="flex items-center gap-size-10 px-size-14 py-size-9 border-t border-border-color bg-color-black-a20">
              <span className="text-size-10 flex-shrink-0 text-color-muted">
                {item.impactLabel}
              </span>
              <ProgressBar value={item.impactPercent} color={item.impactColor} />
              <span
                className={`text-size-11 font-bold flex-shrink-0 ${impactTextColorClass[item.impactColor]}`}
              >
                −{item.impactPercent}%
              </span>
              <span className="text-size-10 flex-shrink-0 ml-auto text-color-muted">
                신뢰도 {item.confidence}%
              </span>
              <button
                className={`text-size-10 font-bold px-size-9 py-size-3 rounded-size-4 border cursor-pointer transition-all duration-100 ${
                  hoveredJiraIndex === index
                    ? "border-color-pink text-color-pink"
                    : "border-border-color text-color-sub"
                }`}
                onMouseEnter={() => setHoveredJiraIndex(index)}
                onMouseLeave={() => setHoveredJiraIndex(null)}
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
