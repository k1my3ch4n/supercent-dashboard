"use client";

import StoreSelector from "@shared/ui/layout/StoreSelector";
import type { Game } from "@features/game/model/games";

interface TopbarProps {
  games: Game[];
  currentGameId: string;
  onGoMain: () => void;
  onSelectGame: (gameId: string) => void;
  onRunAI: () => void;
  isAnalyzing?: boolean;
}

export default function Topbar({
  games,
  currentGameId,
  onGoMain,
  onSelectGame,
  onRunAI,
  isAnalyzing = false,
}: TopbarProps) {
  return (
    <div className="flex items-center justify-between px-7 h-14 border-b border-border-color sticky top-0 z-[5] bg-black">
      {/* 왼쪽 */}
      <div className="flex items-center gap-3">
        <button
          className="bg-transparent border-0 p-0 text-left cursor-pointer"
          onClick={onGoMain}
          aria-label="메인으로 이동"
        >
          <div className="text-size-18 font-black tracking-widest">SUPERCENT</div>
          <div className="text-size-10 tracking-md mt-0.5 text-color-pink">Review Intelligence</div>
        </button>

        <nav className="flex items-center gap-2" aria-label="게임 바로가기">
          {games.map((game) => (
            <button
              key={game.id}
              className={`w-size-30 h-size-30 rounded-size-7 border text-base cursor-pointer transition-all duration-150 ${
                game.id === currentGameId
                  ? "border-color-pink bg-color-pink-a10 ring-2 ring-color-pink shadow-[0_0_14px_rgba(255,45,122,0.35)] scale-105"
                  : "border-border-color bg-color-card-2 hover:border-color-white-a20"
              }`}
              onClick={() => onSelectGame(game.id)}
              aria-label={`${game.name}로 이동`}
              aria-current={game.id === currentGameId ? "page" : undefined}
              title={game.name}
            >
              {game.emoji}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <StoreSelector />
        <button
          className="flex items-center gap-size-6 text-white border-none rounded-size-8 px-size-14 py-2 text-xs font-bold cursor-pointer transition-opacity duration-150 disabled:opacity-40 disabled:cursor-not-allowed bg-color-pink"
          onClick={onRunAI}
          disabled={isAnalyzing}
        >
          <div className="w-size-7 h-size-7 rounded-full bg-white flex-shrink-0 pulse-animation" />
          AI 분석 실행
        </button>
      </div>
    </div>
  );
}
