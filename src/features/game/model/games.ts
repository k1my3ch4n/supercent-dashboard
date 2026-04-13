import { StoreType } from "@shared/constants/stores";

export interface Game {
  id: string;
  appId: string;
  name: string;
  emoji: string;
  gradient: string;
  stores: StoreType[];
}

export const GAMES: Game[] = [
  {
    id: "pizzaidle",
    appId: "io.supercent.pizzaidle",
    name: "Pizza Ready",
    emoji: "🍕",
    gradient: "linear-gradient(135deg,#2a0500,#7a1a00,#bb3a00)",
    stores: ["google-play", "app-store"],
  },
  {
    id: "linkedcubic",
    appId: "io.supercent.linkedcubic",
    name: "Snake Clash",
    emoji: "🖼️",
    gradient: "linear-gradient(135deg,#00102a,#003070,#0055b0)",
    stores: ["google-play", "app-store"],
  },
  {
    id: "ageofdinosaurs",
    appId: "io.supercent.ageofdinosaurs",
    name: "Dinosaur Universe",
    emoji: "🦕",
    gradient: "linear-gradient(135deg,#1a0d00,#5c3300,#8b5e00)",
    stores: ["google-play"],
  },
  {
    id: "weaponrpg",
    appId: "io.supercent.weaponrpg",
    name: "XP Hero",
    emoji: "🦸",
    gradient: "linear-gradient(135deg,#120030,#3d0060,#7b0050)",
    stores: ["google-play", "app-store"],
  },
  {
    id: "bigslimemanyslime",
    appId: "io.supercent.bigslimemanyslime",
    name: "Super Big Slime",
    emoji: "🟢",
    gradient: "linear-gradient(135deg,#002010,#005530,#008040)",
    stores: ["google-play", "app-store"],
  },
];
