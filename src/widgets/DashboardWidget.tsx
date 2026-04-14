"use client";

import { useRouter } from "next/navigation";
import Topbar from "@shared/ui/layout/Topbar";
import AISummaryBlock from "@features/analysis/ui/AISummaryBlock";
import StatsRow from "@features/analysis/ui/StatsRow";
import AIActionItemList from "@features/analysis/ui/AIActionItemList";
import AIPainPointClusters from "@features/analysis/ui/AIPainPointClusters";
import AICSAutoReply from "@features/analysis/ui/AICSAutoReply";
import AIPredictionPanel from "@features/analysis/ui/AIPredictionPanel";
import ReviewList from "@features/review/ui/ReviewList";
import { useGameStore } from "@features/game/model/gameStore";
import { GAMES } from "@features/game/model/games";
import { useDashboardData } from "@features/analysis/model/useDashboardData";

interface DashboardWidgetProps {
  gameId: string;
}

export default function DashboardWidget({ gameId }: DashboardWidgetProps) {
  const router = useRouter();
  const games = useGameStore((state) => state.games);
  const game = games.find((game) => game.id === gameId) ?? GAMES[0];

  const { isAnalyzing, handleRunAI } = useDashboardData(game.appId);

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
        onRunAI={handleRunAI}
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
