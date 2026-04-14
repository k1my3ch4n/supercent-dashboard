import { create } from "zustand";
import { StoreType } from "@shared/constants/stores";

export type StoreOption = StoreType;

interface StoreFilterState {
  activeStore: StoreOption;
  setStore: (store: StoreOption) => void;
}

export const useStoreFilterStore = create<StoreFilterState>((set) => ({
  activeStore: "google-play",
  setStore: (store) => set({ activeStore: store }),
}));
