"use client";

import GameGrid from "@features/game/ui/GameGrid";
import { MOCK_GAMES } from "@features/game/model/mockGames";

interface GameSelectWidgetProps {
  onGameSelect: (gameId: string) => void;
}

export default function GameSelectWidget({ onGameSelect }: GameSelectWidgetProps) {
  const handleAddClick = () => {
    alert("게임 추가는 Settings에서 설정할 수 있습니다.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <header
        className="flex items-center justify-between px-10 py-[22px] border-b"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div>
          <div className="text-[18px] font-black tracking-widest">SUPERCENT</div>
          <div className="text-[10px] tracking-[2px] mt-0.5" style={{ color: "var(--pink)" }}>
            Review Intelligence
          </div>
        </div>
        <button
          className="flex items-center gap-[6px] px-4 py-2 rounded-[8px] border text-xs font-semibold cursor-pointer transition-all duration-150"
          style={{
            borderColor: "var(--border-color)",
            background: "transparent",
            color: "var(--sub)",
          }}
          onClick={handleAddClick}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--pink)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--pink)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-color)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--sub)";
          }}
        >
          ＋ 게임 추가
        </button>
      </header>

      {/* 게임 그리드 */}
      <GameGrid games={MOCK_GAMES} onGameClick={onGameSelect} onAddClick={handleAddClick} />
    </div>
  );
}
