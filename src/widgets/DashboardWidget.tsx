"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@shared/ui/layout/Sidebar";
import Topbar from "@shared/ui/layout/Topbar";
import StoreSelector from "@shared/ui/layout/StoreSelector";
import AISummaryBlock from "@features/analysis/ui/AISummaryBlock";
import StatsRow from "@features/analysis/ui/StatsRow";
import AIActionItemList from "@features/analysis/ui/AIActionItemList";
import AIPainPointClusters from "@features/analysis/ui/AIPainPointClusters";
import AICSAutoReply from "@features/analysis/ui/AICSAutoReply";
import AIPredictionPanel from "@features/analysis/ui/AIPredictionPanel";
import ReviewList from "@features/review/ui/ReviewList";
import { useRunAnalysis } from "@features/analysis/model/useRunAnalysis";
import { useGameStore } from "@features/game/model/gameStore";
import { useReviewStore } from "@features/review/model/reviewStore";
import { GAMES } from "@features/game/model/games";

interface DashboardWidgetProps {
  gameId: string;
}

export default function DashboardWidget({ gameId }: DashboardWidgetProps) {
  const router = useRouter();
  const games = useGameStore((state) => state.games);
  const fetchReviews = useReviewStore((state) => state.fetchReviews);

  const game = games.find((game) => game.id === gameId) ?? GAMES[0];

  const { isAnalyzing, runAnalysis } = useRunAnalysis(game.appId);

  useEffect(() => {
    fetchReviews(game.appId);
  }, [game.appId, fetchReviews]);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar game={game} onGameChange={handleBack} />

      <main className="flex flex-col flex-1 ml-[210px]">
        <Topbar
          gameName={game.name}
          onBack={handleBack}
          onRunAI={runAnalysis}
          isAnalyzing={isAnalyzing}
        />

        <div className="flex flex-col gap-size-18 px-7 py-size-22">
          {/* 스토어 선택 */}
          <StoreSelector />

          {/* AI 요약 */}
          <AISummaryBlock />

          {/* 통계 카드 */}
          <StatsRow />

          {/* 메인 그리드: 액션 아이템 + 클러스터 */}
          <div className="grid gap-4 grid-cols-[1.1fr_0.9fr]">
            <AIActionItemList />
            <AIPainPointClusters />
          </div>

          {/* 하단 그리드: CS 자동 답변 + 예측 패널 */}
          <div className="grid gap-4 grid-cols-2">
            <AICSAutoReply />
            <AIPredictionPanel />
          </div>

          {/* 리뷰 목록 */}
          <ReviewList />
        </div>
      </main>
    </div>
  );
}
