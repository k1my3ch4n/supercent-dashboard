export type StoreType = "google-play" | "app-store" | "galaxy-store";

const storeIcons: Record<StoreType, string> = {
  "google-play": "🟢",
  "app-store": "🍎",
  "galaxy-store": "🌐",
};

interface StoreBadgeProps {
  store: StoreType;
  active?: boolean;
}

export default function StoreBadge({ store, active = false }: StoreBadgeProps) {
  return (
    <span
      className="w-[21px] h-[21px] rounded-[5px] border flex items-center justify-center text-xs flex-shrink-0"
      style={{
        borderColor: active ? "rgba(255,255,255,.2)" : "var(--border-color)",
        color: active ? "#fff" : "var(--muted)",
      }}
    >
      {storeIcons[store]}
    </span>
  );
}
