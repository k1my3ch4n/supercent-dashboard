import { create } from "zustand";
import { Game, GAMES } from "./games";

interface GameState {
  games: Game[];
}

export const useGameStore = create<GameState>(() => ({
  games: GAMES,
}));
