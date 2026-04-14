"use client";

import { useRouter } from "next/navigation";
import GameGrid from "@features/game/ui/GameGrid";
import { useGameStore } from "@features/game/model/gameStore";

export default function GameSelectWidget() {
  const router = useRouter();
  const games = useGameStore((state) => state.games);

  const handleGameClick = (gameId: string) => {
    router.push(`/detail/${gameId}`);
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-10 py-size-22 border-b border-border-color">
        <div className="flex-shrink-0">
          <h1 className="text-size-22 font-black tracking-widest">SUPERCENT</h1>
          <p className="text-size-12 tracking-md mt-0.5 text-color-pink">Review Intelligence</p>
        </div>
      </header>

      {/* 게임 그리드 */}
      <GameGrid games={games} onGameClick={handleGameClick} />
    </main>
  );
}
