"use client";

import StoreBadge from "@shared/ui/StoreBadge";
import { Game } from "@features/game/model/games";

interface GameCardProps {
  game: Game;
  onSelect: () => void;
}

export default function GameCard({ game, onSelect }: GameCardProps) {
  return (
    <article
      className="rounded-size-14 overflow-hidden cursor-pointer border border-border-color flex flex-col transition-all duration-[180ms] hover:-translate-y-1 hover:border-color-white-a18 hover:shadow-lg shadow-none bg-color-card"
      onClick={onSelect}
    >
      <figure
        className="w-full relative flex items-center justify-center text-size-64 aspect-[4/3]"
        style={{ background: game.gradient }}
      >
        <span className="z-[1]">{game.emoji}</span>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/55" />
      </figure>
      <footer className="px-size-15 py-size-13 flex items-center justify-between">
        <h3 className="text-sm font-extrabold whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-80px)]">
          {game.name}
        </h3>
        <div className="flex gap-1 flex-shrink-0">
          {game.stores.map((store) => (
            <StoreBadge key={store} store={store} />
          ))}
        </div>
      </footer>
    </article>
  );
}
