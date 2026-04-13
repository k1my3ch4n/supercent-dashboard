import { StoreType } from "@shared/ui/StoreBadge";

export interface Game {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  stores: StoreType[];
}

export const MOCK_GAMES: Game[] = [
  {
    id: "xp-hero",
    name: "XP Hero",
    emoji: "🦸",
    gradient: "linear-gradient(135deg,#120030,#3d0060,#7b0050)",
    stores: ["google-play", "app-store"],
  },
  {
    id: "slime",
    name: "Super Big Slime",
    emoji: "🟢",
    gradient: "linear-gradient(135deg,#002010,#005530,#008040)",
    stores: ["google-play", "galaxy-store"],
  },
  {
    id: "dino",
    name: "Dinosaur Universe",
    emoji: "🦕",
    gradient: "linear-gradient(135deg,#1a0d00,#5c3300,#8b5e00)",
    stores: ["google-play"],
  },
  {
    id: "pizza",
    name: "Pizza Ready",
    emoji: "🍕",
    gradient: "linear-gradient(135deg,#2a0500,#7a1a00,#bb3a00)",
    stores: ["google-play", "app-store", "galaxy-store"],
  },
  {
    id: "wallpaper",
    name: "Wallpaper Download",
    emoji: "🖼️",
    gradient: "linear-gradient(135deg,#00102a,#003070,#0055b0)",
    stores: ["google-play", "app-store"],
  },
];

export const ALL_STORES: StoreType[] = ["google-play", "app-store", "galaxy-store"];
