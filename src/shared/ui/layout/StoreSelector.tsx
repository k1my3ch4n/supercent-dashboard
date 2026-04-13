"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import { useStoreFilterStore, StoreOption } from "@shared/model/storeFilterStore";
import AppStoreIcon from "@shared/ui/icons/stores/AppStoreIcon";
import GooglePlayIcon from "@shared/ui/icons/stores/GooglePlayIcon";

const STORES: {
  key: StoreOption;
  label: string;
  Icon: ComponentType<{ className?: string }>;
  available: boolean;
}[] = [
  { key: "google-play", label: "Google Play", Icon: GooglePlayIcon, available: true },
  { key: "app-store", label: "App Store", Icon: AppStoreIcon, available: false },
];

export default function StoreSelector() {
  const { activeStore, setStore } = useStoreFilterStore();
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
          <span className="w-size-14 h-size-14 flex-shrink-0">
            <store.Icon className="w-full h-full" />
          </span>
          {store.label}
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
