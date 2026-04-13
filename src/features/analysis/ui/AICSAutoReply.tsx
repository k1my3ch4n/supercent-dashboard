"use client";

import Card from "@shared/ui/Card";
import Badge from "@shared/ui/Badge";
import { useState } from "react";

interface ReplyItemData {
  userName: string;
  avatarColor: string;
  avatarInitial: string;
  date: string;
  score: number;
  reviewText: string;
  draftText: string;
  lang: string;
}

const MOCK_REPLY_ITEMS: ReplyItemData[] = [
  {
    userName: "Tanaka_JP",
    avatarColor: "#3d0060",
    avatarInitial: "T",
    date: "2시간 전",
    score: 1,
    reviewText:
      "ゲームはいいですが、広告が多すぎて遊べません。課金しても改善されないのはひどいです。",
    draftText:
      "田中様、ご不便をおかけして大変申し訳ございません。広告の頻度については現在改善に取り組んでおります。ご意見をいただきありがとうございます。近日中にアップデートで対応予定ですので、今しばらくお待ちください。",
    lang: "🇯🇵 일본어",
  },
  {
    userName: "CrashVictim99",
    avatarColor: "#7a1a00",
    avatarInitial: "C",
    date: "5시간 전",
    score: 2,
    reviewText:
      "The event dungeon crashes every single time I try to enter it. Lost 3 days of progress. Fix this NOW.",
    draftText:
      "We sincerely apologize for the crash issue in the event dungeon. Our team has identified the problem and a hotfix is being deployed within 24 hours. Your lost progress will be fully compensated — please contact our support team with your player ID.",
    lang: "🇺🇸 영어",
  },
];

export default function AICSAutoReply() {
  const [hoveredEditIndex, setHoveredEditIndex] = useState<number | null>(null);
  const [hoveredRegenerateIndex, setHoveredRegenerateIndex] = useState<number | null>(null);

  return (
    <Card>
      <div className="flex items-center justify-between px-size-18 py-size-14 border-b border-border-color">
        <div>
          <div className="text-size-13 font-extrabold">AI CS 자동 답변</div>
          <div className="text-size-10 mt-0.5 text-color-sub">
            부정 리뷰 · AI 초안 자동 생성 · 다국어 지원
          </div>
        </div>
        <Badge variant="purple">AI</Badge>
      </div>
      <div className="px-size-18 py-size-14 flex flex-col gap-size-14">
        {MOCK_REPLY_ITEMS.map((item, index) => (
          <div key={index} className="rounded-size-8 border overflow-hidden border-border-color">
            {/* 원본 리뷰 */}
            <div className="px-size-14 py-size-11 border-b bg-color-pink-a04 border-border-color">
              <div className="flex items-center justify-between mb-size-5">
                <div className="flex items-center gap-size-7">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-size-10 font-bold flex-shrink-0"
                    style={{ background: item.avatarColor }}
                  >
                    {item.avatarInitial}
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
            {/* AI 초안 */}
            <div className="px-size-14 py-size-11">
              <div className="flex items-center gap-size-5 text-size-10 font-bold tracking-sm uppercase mb-size-6 text-color-purple">
                🤖 AI 초안{" "}
                <span className="text-size-9 font-normal normal-case text-color-muted">
                  {item.lang}
                </span>
              </div>
              <p className="text-size-11 leading-[1.6] text-color-sub">{item.draftText}</p>
              <div className="flex gap-size-7 mt-size-9">
                <button className="text-size-10 font-bold px-size-10 py-1 rounded-size-4 border cursor-pointer transition-all duration-100 bg-color-purple-a12 border-color-purple-a30 text-color-purple">
                  답변 등록
                </button>
                <button
                  className={`text-size-10 font-bold px-size-10 py-1 rounded-size-4 border cursor-pointer transition-all duration-100 ${
                    hoveredEditIndex === index
                      ? "border-color-purple text-color-purple"
                      : "border-border-color text-color-sub"
                  }`}
                  onMouseEnter={() => setHoveredEditIndex(index)}
                  onMouseLeave={() => setHoveredEditIndex(null)}
                >
                  수정
                </button>
                <button
                  className={`text-size-10 font-bold px-size-10 py-1 rounded-size-4 border cursor-pointer transition-all duration-100 ${
                    hoveredRegenerateIndex === index
                      ? "border-color-purple text-color-purple"
                      : "border-border-color text-color-sub"
                  }`}
                  onMouseEnter={() => setHoveredRegenerateIndex(index)}
                  onMouseLeave={() => setHoveredRegenerateIndex(null)}
                >
                  재생성
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
