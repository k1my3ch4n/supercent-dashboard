"use client";

import Card from "@shared/ui/Card";
import Badge from "@shared/ui/Badge";
import ProgressBar from "@shared/ui/ProgressBar";
import { ProgressBarColor } from "@shared/ui/ProgressBar";
import PriorityTag, { Priority } from "@shared/ui/PriorityTag";
import LoadingSpinner from "@shared/ui/LoadingSpinner";
import { useState } from "react";
import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import type { ActionItem } from "@shared/types/analysis";

const priorityBorderColorClass: Record<Priority, string> = {
  high: "border-color-pink",
  medium: "border-color-yellow",
  low: "border-color-blue",
};

const priorityToColor: Record<Priority, ProgressBarColor> = {
  high: "pink",
  medium: "yellow",
  low: "blue",
};

const impactTextColorClass: Record<ProgressBarColor, string> = {
  pink: "text-color-pink",
  green: "text-color-green",
  yellow: "text-color-yellow",
  blue: "text-color-blue",
  purple: "text-color-purple",
};

function ActionItemCard({ item, index }: { item: ActionItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isJiraHovered, setIsJiraHovered] = useState(false);
  const color = priorityToColor[item.priority];

  const chips = [`📋 ${item.reviewCount}개 리뷰`, `👥 ${item.targetSegment}`, `⏱ ${item.timeline}`];

  return (
    <div
      key={index}
      className={`rounded-size-8 border overflow-hidden cursor-pointer transition-transform duration-100 hover:-translate-y-px bg-color-card-2 ${
        isHovered ? "border-color-white-a12" : "border-border-color"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            {chips.map((chip) => (
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
        <span className="text-size-10 flex-shrink-0 text-color-muted">{item.impactLabel}</span>
        <ProgressBar value={item.impactPercent} color={color} />
        <span className={`text-size-11 font-bold flex-shrink-0 ${impactTextColorClass[color]}`}>
          −{item.impactPercent}%
        </span>
        <span className="text-size-10 flex-shrink-0 ml-auto text-color-muted">
          신뢰도 {item.confidence}%
        </span>
        <button
          className={`text-size-10 font-bold px-size-9 py-size-3 rounded-size-4 border cursor-pointer transition-all duration-100 ${
            isJiraHovered
              ? "border-color-pink text-color-pink"
              : "border-border-color text-color-sub"
          }`}
          onMouseEnter={() => setIsJiraHovered(true)}
          onMouseLeave={() => setIsJiraHovered(false)}
        >
          Jira 생성
        </button>
      </div>
    </div>
  );
}

export default function AIActionItemList() {
  const { result, isLoading } = useAnalysisStore();

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
        {!isLoading &&
          result?.actionItems.map((item, index) => (
            <ActionItemCard key={index} item={item} index={index} />
          ))}
      </div>
    </Card>
  );
}
