"use client";

import { useState } from "react";
import type { CSAutoReplyItem } from "@shared/types/analysis";

const AVATAR_COLOR_CLASS = [
  "bg-color-purple",
  "bg-color-pink",
  "bg-color-green",
  "bg-color-blue",
  "bg-color-yellow",
] as const;

interface ReplyCardProps {
  item: CSAutoReplyItem;
  index: number;
}

function getInitial(userName: string): string {
  const trimmedName = userName.trim();

  if (trimmedName.length === 0) {
    return "?";
  }

  return trimmedName[0].toUpperCase();
}

export default function ReplyCard({ item, index }: ReplyCardProps) {
  const [isEditHovered, setIsEditHovered] = useState(false);
  const [isRegenerateHovered, setIsRegenerateHovered] = useState(false);

  return (
    <div className="rounded-size-8 border border-border-color">
      <div className="px-size-14 py-size-11 border-b bg-color-pink-a04 border-border-color">
        <div className="flex items-center justify-between mb-size-5">
          <div className="flex items-center gap-size-7">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-size-10 font-bold flex-shrink-0 ${AVATAR_COLOR_CLASS[index % AVATAR_COLOR_CLASS.length]}`}
            >
              {getInitial(item.userName)}
            </div>
            <span className="text-size-11 font-bold">{item.userName}</span>
            <span className="text-size-11 text-color-yellow">
              {"★".repeat(item.score)}
              {"☆".repeat(5 - item.score)}
            </span>
          </div>
          <span className="text-size-10 text-color-muted">{item.date}</span>
        </div>
        <p className="text-size-11 leading-[1.5] text-color-soft">{item.reviewText}</p>
      </div>

      <div className="px-size-14 py-size-11">
        <div className="flex items-center gap-size-5 text-size-10 font-bold tracking-sm uppercase mb-size-6 text-color-purple">
          🤖 AI 초안{" "}
          <span className="text-size-9 font-normal normal-case text-color-muted">
            {item.languageLabel}
          </span>
        </div>
        <p className="text-size-11 leading-[1.6] text-color-sub">{item.draftText}</p>
        <div className="flex gap-size-7 mt-size-9">
          <button className="text-size-10 font-bold px-size-10 py-1 rounded-size-4 border cursor-pointer transition-all duration-100 bg-color-purple-a12 border-color-purple-a30 text-color-purple">
            답변 등록
          </button>
          <button
            className={`text-size-10 font-bold px-size-10 py-1 rounded-size-4 border cursor-pointer transition-all duration-100 ${
              isEditHovered
                ? "border-color-purple text-color-purple"
                : "border-border-color text-color-sub"
            }`}
            onMouseEnter={() => setIsEditHovered(true)}
            onMouseLeave={() => setIsEditHovered(false)}
          >
            수정
          </button>
          <button
            className={`text-size-10 font-bold px-size-10 py-1 rounded-size-4 border cursor-pointer transition-all duration-100 ${
              isRegenerateHovered
                ? "border-color-purple text-color-purple"
                : "border-border-color text-color-sub"
            }`}
            onMouseEnter={() => setIsRegenerateHovered(true)}
            onMouseLeave={() => setIsRegenerateHovered(false)}
          >
            재생성
          </button>
        </div>
      </div>
    </div>
  );
}
