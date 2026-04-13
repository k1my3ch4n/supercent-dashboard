"use client";

import { useState } from "react";
import GameSelectWidget from "@widgets/GameSelectWidget";
import DashboardWidget from "@widgets/DashboardWidget";

export default function Home() {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  if (selectedGameId) {
    return (
      <DashboardWidget
        gameId={selectedGameId}
        onBack={() => {
          setSelectedGameId(null);
        }}
      />
    );
  }

  return (
    <GameSelectWidget
      onGameSelect={(id) => {
        setSelectedGameId(id);
      }}
    />
  );
}
