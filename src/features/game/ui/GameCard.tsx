"use client";

import AppStoreIcon from "@shared/ui/icons/stores/AppStoreIcon";
import GooglePlayIcon from "@shared/ui/icons/stores/GooglePlayIcon";
import type { StoreType } from "@shared/constants/stores";
import { Game } from "@features/game/model/games";
import Image from "next/image";

interface GameCardProps {
  game: Game;
  onSelect: () => void;
}

const storeIconMap: Record<StoreType, React.ComponentType<{ className?: string }>> = {
  "google-play": GooglePlayIcon,
  "app-store": AppStoreIcon,
};

export default function GameCard({ game, onSelect }: GameCardProps) {
  return (
    <article
      className="rounded-size-14 overflow-hidden cursor-pointer border border-border-color transition-all duration-[180ms] hover:-translate-y-1 hover:border-color-white-a18 hover:shadow-lg shadow-none bg-color-card group"
      onClick={onSelect}
    >
      <figure className="w-full relative aspect-square" style={{ background: game.gradient }}>
        <Image
          src={game.iconUrl}
          alt={game.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/55" />

        <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-size-14 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-size-14">
          <h3 className="text-4xl md:text-3xl font-black text-white text-center drop-shadow leading-tight">
            {game.name}
          </h3>
          <div className="flex gap-3">
            {game.stores.map((store) => {
              const Icon = storeIconMap[store];
              return <Icon key={store} className="w-16 h-16 md:w-12 md:h-12" />;
            })}
          </div>
        </figcaption>
      </figure>
    </article>
  );
}
