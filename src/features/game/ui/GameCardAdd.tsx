"use client";

interface GameCardAddProps {
  onClick?: () => void;
}

export default function GameCardAdd({ onClick }: GameCardAddProps) {
  return (
    <div
      className="rounded-[14px] border border-dashed flex flex-col items-center justify-center gap-[10px] cursor-pointer text-sm min-h-[200px] transition-all duration-150"
      style={{ borderColor: "var(--border-color)", color: "var(--muted)" }}
      onClick={onClick}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--pink)";
        (e.currentTarget as HTMLDivElement).style.color = "var(--pink)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-color)";
        (e.currentTarget as HTMLDivElement).style.color = "var(--muted)";
      }}
    >
      <div className="text-[28px]">＋</div>
      <span>게임 추가</span>
    </div>
  );
}
