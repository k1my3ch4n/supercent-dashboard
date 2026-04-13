"use client";

import Card from "@shared/ui/Card";
import Badge from "@shared/ui/Badge";
import { useState } from "react";

interface ClusterData {
  icon: string;
  name: string;
  count: number;
  quote: string;
  keywords: string[];
}

const MOCK_CLUSTERS: ClusterData[] = [
  {
    icon: "🔴",
    name: "광고 피로도",
    count: 1082,
    quote: '"게임은 재밌는데 광고가 너무 많아서 못하겠어요. 3판마다 광고가 나옵니다."',
    keywords: ["광고 과다", "리워드 없음", "강제 광고", "레벨 10-20"],
  },
  {
    icon: "⚠️",
    name: "크래시 & 버그",
    count: 473,
    quote: '"이벤트 던전 들어가면 100% 튕깁니다. 업데이트 후 계속 이러네요."',
    keywords: ["이벤트 던전", "앱 크래시", "데이터 손실", "긴급"],
  },
  {
    icon: "💳",
    name: "결제 & 밸런스",
    count: 318,
    quote: '"유료 아이템 가격 대비 효과가 너무 부족합니다. 과금 유도가 심해요."',
    keywords: ["과금 유도", "밸런스", "가격 정책", "P2W"],
  },
  {
    icon: "🌏",
    name: "다국어 미지원",
    count: 201,
    quote: '"No response from CS for 3 weeks. Japanese players feel ignored."',
    keywords: ["CS 무응답", "번역 오류", "일본어", "독일어"],
  },
];

export default function AIPainPointClusters() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Card>
      <div className="flex items-center justify-between px-size-18 py-size-14 border-b border-border-color">
        <div>
          <div className="text-size-13 font-extrabold">AI 페인 포인트 클러스터</div>
          <div className="text-size-10 mt-0.5 text-color-sub">자동 클러스터링 · 핵심 이슈 분류</div>
        </div>
        <Badge variant="purple">AI</Badge>
      </div>
      <div className="px-size-18 py-size-14 flex flex-col gap-size-10">
        {MOCK_CLUSTERS.map((cluster, index) => (
          <div
            key={index}
            className={`rounded-size-8 border px-size-14 py-3 cursor-pointer transition-colors duration-150 bg-color-card-2 ${
              hoveredIndex === index ? "border-color-white-a15" : "border-border-color"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center justify-between mb-size-6">
              <div className="flex items-center gap-size-6 text-xs font-bold">
                <span>{cluster.icon}</span>
                <span>{cluster.name}</span>
              </div>
              <span className="text-size-11 text-color-sub">
                {cluster.count.toLocaleString()}개 리뷰
              </span>
            </div>
            <div className="text-size-11 leading-[1.5] italic pl-size-10 border-l-2 border-border-color mb-size-7 text-color-sub">
              {cluster.quote}
            </div>
            <div className="flex flex-wrap gap-size-5">
              {cluster.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="text-size-10 px-size-7 py-0.5 rounded-full border bg-color-white-a05 text-color-sub border-border-color"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
