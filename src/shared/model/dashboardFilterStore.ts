import { create } from "zustand";

export type Period = "7D" | "30D" | "90D";
export type StoreOption = "google-play" | "app-store" | "galaxy-store";

interface DashboardFilterState {
  activePeriod: Period;
  activeStore: StoreOption;
  setPeriod: (period: Period) => void;
  setStore: (store: StoreOption) => void;
}

export const useDashboardFilterStore = create<DashboardFilterState>((set) => ({
  activePeriod: "7D",
  activeStore: "google-play",
  setPeriod: (period) => set({ activePeriod: period }),
  setStore: (store) => set({ activeStore: store }),
}));
