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
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-10 py-size-22 border-b border-border-color">
        <div>
          <div className="text-size-18 font-black tracking-widest">SUPERCENT</div>
          <div className="text-size-10 tracking-md mt-0.5 text-color-pink">Review Intelligence</div>
        </div>
      </header>

      {/* 게임 그리드 */}
      <GameGrid games={games} onGameClick={handleGameClick} />
    </div>
  );
}
