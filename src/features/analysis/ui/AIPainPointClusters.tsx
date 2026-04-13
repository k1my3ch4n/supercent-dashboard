"use client";

import Card from "@shared/ui/Card";
import Badge from "@shared/ui/Badge";
import LoadingSpinner from "@shared/ui/LoadingSpinner";
import { useState } from "react";
import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import type { ClusterItem } from "@shared/types/analysis";

const CLUSTER_ICONS = ["🔴", "⚠️", "💳", "🌏"];

function ClusterCard({ cluster, index }: { cluster: ClusterItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`rounded-size-8 border px-size-14 py-3 cursor-pointer transition-colors duration-150 bg-color-card-2 ${
        isHovered ? "border-color-white-a15" : "border-border-color"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-size-6">
        <div className="flex items-center gap-size-6 text-xs font-bold">
          <span>{CLUSTER_ICONS[index % CLUSTER_ICONS.length]}</span>
          <span>{cluster.name}</span>
        </div>
        <span className="text-size-11 text-color-sub">{cluster.count.toLocaleString()}개 리뷰</span>
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
  );
}

export default function AIPainPointClusters() {
  const { result, isLoading } = useAnalysisStore();

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
          result?.clusters.map((cluster, index) => (
            <ClusterCard key={index} cluster={cluster} index={index} />
          ))}
      </div>
    </Card>
  );
}
