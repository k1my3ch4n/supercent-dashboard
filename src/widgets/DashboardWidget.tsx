"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Topbar from "@shared/ui/layout/Topbar";
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

  const handleGoMain = () => {
    router.push("/");
  };

  const handleSelectGame = (selectedGameId: string) => {
    router.push(`/detail/${selectedGameId}`);
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex flex-col flex-1">
        <Topbar
          games={games}
          currentGameId={game.id}
          onGoMain={handleGoMain}
          onSelectGame={handleSelectGame}
          onRunAI={runAnalysis}
          isAnalyzing={isAnalyzing}
        />

        <div className="flex flex-col gap-size-18 px-7 py-size-22">
          {/* AI 요약 */}
          <section id="section-insights">
            <AISummaryBlock />
          </section>

          {/* 통계 카드 */}
          <section id="section-dashboard">
            <StatsRow />
          </section>

          {/* 메인 그리드: 액션 아이템 + 클러스터 */}
          <section id="section-actions" className="grid gap-4 grid-cols-[1.1fr_0.9fr]">
            <AIActionItemList />
            <AIPainPointClusters />
          </section>

          {/* 하단 그리드: CS 자동 답변 + 예측 패널 */}
          <div className="grid gap-4 grid-cols-2">
            <section id="section-cs-reply">
              <AICSAutoReply />
            </section>
            <section id="section-predictions">
              <AIPredictionPanel />
            </section>
          </div>

          {/* 리뷰 목록 */}
          <section id="section-reviews">
            <ReviewList />
          </section>
        </div>
      </main>
    </div>
  );
}
