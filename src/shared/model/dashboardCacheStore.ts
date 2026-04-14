import { create } from "zustand";
import type { Review } from "@shared/types/review";
import type { AnalysisResult } from "@shared/types/analysis";

interface DashboardCacheState {
  cache: Record<string, { reviews: Review[]; result: AnalysisResult }>;
  setCache: (appId: string, reviews: Review[], result: AnalysisResult) => void;
  removeCache: (appId: string) => void;
}

export const useDashboardCacheStore = create<DashboardCacheState>((set) => ({
  cache: {},
  setCache: (appId, reviews, result) =>
    set((state) => ({
      cache: { ...state.cache, [appId]: { reviews, result } },
    })),
  removeCache: (appId) =>
    set((state) => {
      const newCache = { ...state.cache };
      delete newCache[appId];
      return { cache: newCache };
    }),
}));
