import { StoreType } from "@shared/constants/stores";
import type { ComponentType } from "react";
import AppStoreIcon from "@shared/ui/icons/stores/AppStoreIcon";
import GooglePlayIcon from "@shared/ui/icons/stores/GooglePlayIcon";

const storeIcons: Record<StoreType, { alt: string; Icon: ComponentType<{ className?: string }> }> =
  {
    "google-play": { alt: "Google Play", Icon: GooglePlayIcon },
    "app-store": { alt: "App Store", Icon: AppStoreIcon },
  };

interface StoreBadgeProps {
  store: StoreType;
}

export default function StoreBadge({ store }: StoreBadgeProps) {
  const { alt, Icon } = storeIcons[store];

  return (
    <span
      className="w-size-21 h-size-21 rounded-size-5 flex items-center justify-center text-xs flex-shrink-0"
      title={alt}
    >
      <Icon className="w-3 h-3" />
    </span>
  );
}
