"use client";

import { useState } from "react";
import { useDashboardFilterStore, StoreOption } from "@shared/model/dashboardFilterStore";

export type { StoreOption };

const STORES: { key: StoreOption; label: string; icon: string; available: boolean }[] = [
  { key: "google-play", label: "Google Play", icon: "🟢", available: true },
  { key: "app-store", label: "App Store", icon: "🍎", available: false },
  { key: "galaxy-store", label: "Galaxy Store", icon: "🌐", available: false },
];

export default function StoreSelector() {
  const { activeStore, setStore } = useDashboardFilterStore();
  const [hoveredStore, setHoveredStore] = useState<StoreOption | null>(null);

  return (
    <div className="flex items-center gap-2">
      <span className="text-size-11 font-semibold mr-1 text-color-muted">스토어</span>
      {STORES.map((store) => (
        <button
          key={store.key}
          className={`flex items-center gap-size-6 px-size-14 py-size-7 rounded-full border text-xs font-semibold cursor-pointer transition-all duration-150 disabled:opacity-35 disabled:cursor-not-allowed ${
            activeStore === store.key
              ? "border-color-pink bg-color-pink-a10 text-white"
              : hoveredStore === store.key && store.available
                ? "border-color-white-a20 text-white"
                : "border-border-color bg-transparent text-color-sub"
          }`}
          disabled={!store.available}
          onClick={() => {
            if (store.available) {
              setStore(store.key);
            }
          }}
          onMouseEnter={() => setHoveredStore(store.key)}
          onMouseLeave={() => setHoveredStore(null)}
        >
          {store.icon} {store.label}
          {!store.available && (
            <span className="text-size-9 font-bold px-size-5 py-px rounded-size-3 bg-color-white-a06 text-color-muted">
              SOON
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
