"use client";

import { useState } from "react";
import ProgressBar, { ProgressBarColor } from "@shared/ui/ProgressBar";
import PriorityTag, { Priority } from "@shared/ui/PriorityTag";
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

interface ActionItemCardProps {
  item: ActionItem;
}

export default function ActionItemCard({ item }: ActionItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isJiraHovered, setIsJiraHovered] = useState(false);
  const color = priorityToColor[item.priority];

  const chips = [`📋 ${item.reviewCount}개 리뷰`, `👥 ${item.targetSegment}`, `⏱ ${item.timeline}`];

  return (
    <article
      className={`rounded-size-8 border cursor-pointer transition-colors duration-100 bg-color-card-2 ${
        isHovered ? "border-color-white-a12" : "border-border-color"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <header
        className={`flex gap-3 px-size-14 pt-size-13 pb-size-10 border-l-size-3 ${priorityBorderColorClass[item.priority]}`}
      >
        <PriorityTag priority={item.priority} />
        <div className="flex-1 min-w-0">
          <h4 className="text-size-13 font-bold mb-size-3">{item.title}</h4>
          <p className="text-size-11 leading-[1.5] text-color-sub">{item.description}</p>
          <ul className="flex gap-2 flex-wrap mt-size-6">
            {chips.map((chip) => (
              <li
                key={chip}
                className="list-none text-size-10 px-size-7 py-0.5 rounded-size-4 border bg-color-white-a04 text-color-sub border-border-color"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <footer className="flex items-center gap-size-10 px-size-14 py-size-9 border-t border-border-color bg-color-black-a20">
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
      </footer>
    </article>
  );
}
