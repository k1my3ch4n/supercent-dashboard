"use client";

export type StoreOption = "google-play" | "app-store" | "galaxy-store";

const STORES: { key: StoreOption; label: string; icon: string; available: boolean }[] = [
  { key: "google-play", label: "Google Play", icon: "🟢", available: true },
  { key: "app-store", label: "App Store", icon: "🍎", available: false },
  { key: "galaxy-store", label: "Galaxy Store", icon: "🌐", available: false },
];

interface StoreSelectorProps {
  activeStore: StoreOption;
  onStoreChange: (store: StoreOption) => void;
}

export default function StoreSelector({ activeStore, onStoreChange }: StoreSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-semibold mr-1" style={{ color: "var(--muted)" }}>
        스토어
      </span>
      {STORES.map((store) => (
        <button
          key={store.key}
          className="flex items-center gap-[6px] px-[14px] py-[7px] rounded-full border text-xs font-semibold cursor-pointer transition-all duration-150 disabled:opacity-35 disabled:cursor-not-allowed"
          style={
            activeStore === store.key
              ? {
                  borderColor: "var(--pink)",
                  background: "rgba(255,45,122,.1)",
                  color: "#fff",
                }
              : {
                  borderColor: "var(--border-color)",
                  background: "none",
                  color: "var(--sub)",
                }
          }
          disabled={!store.available}
          onClick={() => {
            if (store.available) {
              onStoreChange(store.key);
            }
          }}
          onMouseEnter={(e) => {
            if (store.available && activeStore !== store.key) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,.2)";
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            }
          }}
          onMouseLeave={(e) => {
            if (store.available && activeStore !== store.key) {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-color)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--sub)";
            }
          }}
        >
          {store.icon} {store.label}
          {!store.available && (
            <span
              className="text-[9px] font-bold px-[5px] py-px rounded-[3px]"
              style={{ background: "rgba(255,255,255,.06)", color: "var(--muted)" }}
            >
              SOON
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
