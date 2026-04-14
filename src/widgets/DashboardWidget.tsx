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
    <div className="flex min-h-screen flex-col">
      <Topbar
        games={games}
        currentGameId={game.id}
        onGoMain={handleGoMain}
        onSelectGame={handleSelectGame}
        onRunAI={runAnalysis}
        isAnalyzing={isAnalyzing}
      />

      <main className="flex flex-col flex-1">
        <section className="flex flex-col gap-size-18 px-7 py-size-22">
          {/* AI 요약 */}
          <section id="section-insights">
            <AISummaryBlock />
          </section>

          {/* 통계 카드 */}
          <section id="section-dashboard">
            <StatsRow />
          </section>

          {/* AI 분석 4개 카드: 균등 2x2 그리드 */}
          <section className="grid items-start gap-4 grid-cols-1 md:grid-cols-2">
            <section id="section-actions">
              <AIActionItemList />
            </section>
            <section>
              <AIPainPointClusters />
            </section>
            <section id="section-cs-reply">
              <AICSAutoReply />
            </section>
            <section id="section-predictions">
              <AIPredictionPanel />
            </section>
          </section>

          {/* 리뷰 목록 */}
          <section id="section-reviews">
            <ReviewList />
          </section>
        </section>
      </main>
    </div>
  );
}
