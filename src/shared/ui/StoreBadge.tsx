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
      className={`w-size-21 h-size-21 rounded-size-5 border flex items-center justify-center text-xs flex-shrink-0 ${
        active ? "border-color-white-a20 text-white" : "border-border-color text-color-muted"
      }`}
    >
      {storeIcons[store]}
    </span>
  );
}
