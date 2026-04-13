export type StatVariant = "default" | "highlight" | "ai-predict";

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  valueColor?: string;
  variant?: StatVariant;
}

export default function StatCard({
  label,
  value,
  icon,
  change,
  changeType,
  valueColor = "#fff",
  variant = "default",
}: StatCardProps) {
  const changeColor =
    changeType === "up" ? "var(--green)" : changeType === "down" ? "var(--pink)" : "var(--sub)";

  return (
    <div
      className="rounded-[14px] border flex flex-col gap-[7px] px-[18px] py-4"
      style={{
        background: "var(--card)",
        borderColor: variant === "highlight" ? "var(--pink)" : "var(--border-color)",
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-bold tracking-[1px] uppercase"
          style={{ color: "var(--sub)" }}
        >
          {label}
        </span>
        <span className="text-base">{icon}</span>
      </div>
      <div className="text-[30px] font-black leading-none" style={{ color: valueColor }}>
        {value}
      </div>
      <div className="text-[11px]" style={{ color: "var(--sub)" }}>
        <span style={{ color: changeColor }}>{change}</span>
        {variant === "ai-predict" ? " 14일 후 예측 평점" : " vs last period"}
      </div>
    </div>
  );
}
