"use client";

import Card from "@shared/ui/Card";
import LoadingSpinner from "@shared/ui/LoadingSpinner";
import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import ClusterCard from "./ClusterCard";

export default function AIPainPointClusters() {
  const { result, isLoading } = useAnalysisStore();

  return (
    <Card
      className="h-[460px] flex flex-col"
      title="AI 페인 포인트 클러스터"
      subtitle="자동 클러스터링 · 핵심 이슈 분류"
      badgeVariant="purple"
    >
      <div className="px-size-18 py-size-14 flex-1 min-h-0 overflow-y-auto flex flex-col gap-size-10">
        {isLoading && (
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && !result && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-size-12 text-color-muted text-center">
              분석 결과가 없습니다. AI 분석을 실행하세요.
            </p>
          </div>
        )}
        {!isLoading &&
          result?.clusters.map((cluster, index) => (
            <ClusterCard key={index} cluster={cluster} index={index} />
          ))}
      </div>
    </Card>
  );
}
