"use client";

import StoreBadge from "@shared/ui/StoreBadge";
import { Game, ALL_STORES } from "@features/game/model/mockGames";

interface GameCardProps {
  game: Game;
  onClick: (gameId: string) => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  return (
    <div
      className="rounded-[14px] overflow-hidden cursor-pointer border flex flex-col transition-transform duration-[180ms] hover:-translate-y-1"
      style={{
        background: "var(--card)",
        borderColor: "var(--border-color)",
        boxShadow: "0 0 0 transparent",
        transition: "transform .18s, border-color .15s, box-shadow .18s",
      }}
      onClick={() => {
        onClick(game.id);
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,.18)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(0,0,0,.55)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-color)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 transparent";
      }}
    >
      <div
        className="w-full relative flex items-center justify-center text-[64px]"
        style={{ aspectRatio: "4/3", background: game.gradient }}
      >
        <span style={{ zIndex: 1 }}>{game.emoji}</span>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.55))" }}
        />
      </div>
      <div className="px-[15px] py-[13px] flex items-center justify-between">
        <span
          className="text-sm font-extrabold whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ maxWidth: "calc(100% - 80px)" }}
        >
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
