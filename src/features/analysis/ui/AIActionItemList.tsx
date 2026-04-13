"use client";

import Card from "@shared/ui/Card";
import LoadingSpinner from "@shared/ui/LoadingSpinner";
import { useAnalysisStore } from "@features/analysis/model/analysisStore";
import ActionItemCard from "./ActionItemCard";

export default function AIActionItemList() {
  const { result, isLoading } = useAnalysisStore();

  return (
    <Card
      className="h-[460px] flex flex-col"
      title="AI 추천 액션 아이템"
      subtitle="Gemini 분석 · 우선순위 · 예상 임팩트"
      badgeVariant="pink"
    >
      <div className="px-size-18 py-size-14 flex-1 min-h-0 overflow-y-auto flex flex-col gap-3">
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
          result?.actionItems.map((item, index) => <ActionItemCard key={index} item={item} />)}
      </div>
    </Card>
  );
}
