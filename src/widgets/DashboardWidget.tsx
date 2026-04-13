"use client";

import { useState } from "react";

import Sidebar from "@shared/ui/layout/Sidebar";
import Topbar, { Period } from "@shared/ui/layout/Topbar";
import StoreSelector, { StoreOption } from "@shared/ui/layout/StoreSelector";
import AISummaryBlock from "@features/analysis/ui/AISummaryBlock";
import StatsRow from "@features/analysis/ui/StatsRow";
import AIActionItemList from "@features/analysis/ui/AIActionItemList";
import AIPainPointClusters from "@features/analysis/ui/AIPainPointClusters";
import AICSAutoReply from "@features/analysis/ui/AICSAutoReply";
import AIPredictionPanel from "@features/analysis/ui/AIPredictionPanel";
import { MOCK_GAMES } from "@features/game/model/mockGames";

interface DashboardWidgetProps {
  gameId: string;
  onBack: () => void;
}

export default function DashboardWidget({ gameId, onBack }: DashboardWidgetProps) {
  const [activePeriod, setActivePeriod] = useState<Period>("7D");
  const [activeStore, setActiveStore] = useState<StoreOption>("google-play");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const game = MOCK_GAMES.find((g) => g.id === gameId) ?? MOCK_GAMES[0];

  const handleRunAI = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        gameName={game.name}
        gameEmoji={game.emoji}
        gameGradient={game.gradient}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onGameChange={onBack}
      />

      <main className="flex flex-col flex-1" style={{ marginLeft: "210px" }}>
        <Topbar
          gameName={game.name}
          activePeriod={activePeriod}
          onPeriodChange={setActivePeriod}
          onBack={onBack}
          onRunAI={handleRunAI}
          isAnalyzing={isAnalyzing}
        />

        <div className="flex flex-col gap-size-18 px-7 py-size-22">
          {/* 스토어 선택 */}
          <StoreSelector activeStore={activeStore} onStoreChange={setActiveStore} />

          {/* AI 요약 */}
          <AISummaryBlock />

          {/* 통계 카드 */}
          <StatsRow />

          {/* 메인 그리드: 액션 아이템 + 클러스터 */}
          <div className="grid gap-4" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
            <AIActionItemList />
            <AIPainPointClusters />
          </div>

          {/* 하단 그리드: CS 자동 답변 + 예측 패널 */}
          <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <AICSAutoReply />
            <AIPredictionPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
