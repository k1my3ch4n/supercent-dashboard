"use client";

import { useState } from "react";
import GameGrid from "@features/game/ui/GameGrid";
import { MOCK_GAMES } from "@features/game/model/mockGames";

interface GameSelectWidgetProps {
  onGameSelect: (gameId: string) => void;
}

export default function GameSelectWidget({ onGameSelect }: GameSelectWidgetProps) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleAddGame = () => {
    alert("게임 추가는 Settings에서 설정할 수 있습니다.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-10 py-size-22 border-b border-border-color">
        <div>
          <div className="text-size-18 font-black tracking-widest">SUPERCENT</div>
          <div className="text-size-10 tracking-md mt-0.5 text-color-pink">Review Intelligence</div>
        </div>
        <button
          className={`flex items-center gap-size-6 px-4 py-2 rounded-size-8 border text-xs font-semibold cursor-pointer transition-all duration-150 ${
            isButtonHovered
              ? "border-color-pink text-color-pink"
              : "border-border-color text-color-sub"
          }`}
          onClick={handleAddGame}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          ＋ 게임 추가
        </button>
      </header>

      {/* 게임 그리드 */}
      <GameGrid games={MOCK_GAMES} onGameClick={onGameSelect} onAddClick={handleAddGame} />
    </div>
  );
}
