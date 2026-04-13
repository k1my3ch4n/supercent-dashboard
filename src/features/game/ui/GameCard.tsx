"use client";

import { useState } from "react";
import StoreBadge from "@shared/ui/StoreBadge";
import { Game } from "@features/game/model/mockGames";
import { ALL_STORES } from "@shared/constants/stores";

interface GameCardProps {
  game: Game;
  onClick: (gameId: string) => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`rounded-size-14 overflow-hidden cursor-pointer border flex flex-col transition-all duration-[180ms] hover:-translate-y-1 bg-color-card ${
        isHovered ? "border-color-white-a18 shadow-lg" : "border-border-color shadow-none"
      }`}
      onClick={() => {
        onClick(game.id);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full relative flex items-center justify-center text-size-64 aspect-[4/3]"
        style={{ background: game.gradient }}
      >
        <span className="z-[1]">{game.emoji}</span>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/55" />
      </div>
      <div className="px-size-15 py-size-13 flex items-center justify-between">
        <span className="text-sm font-extrabold whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-80px)]">
          {game.name}
        </span>
        <div className="flex gap-1 flex-shrink-0">
          {ALL_STORES.map((store) => (
            <StoreBadge key={store} store={store} active={game.stores.includes(store)} />
          ))}
        </div>
      </div>
    </div>
  );
}
