"use client";

import { useState } from "react";

interface GameCardAddProps {
  onClick?: () => void;
}

export default function GameCardAdd({ onClick }: GameCardAddProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`rounded-size-14 border border-dashed flex flex-col items-center justify-center gap-size-10 cursor-pointer text-sm min-h-size-200 transition-all duration-150 ${
        isHovered ? "border-color-pink text-color-pink" : "border-border-color text-color-muted"
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-size-28">＋</div>
      <span>게임 추가</span>
    </div>
  );
}
