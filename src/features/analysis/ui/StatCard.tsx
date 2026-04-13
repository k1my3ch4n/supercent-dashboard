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
      className={`rounded-size-14 border flex flex-col gap-size-7 px-size-18 py-4 bg-color-card ${
        variant === "highlight" ? "border-color-pink" : "border-border-color"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-size-10 font-bold tracking-size-1 uppercase text-color-sub">
          {label}
        </span>
        <span className="text-base">{icon}</span>
      </div>
      <div className="text-size-30 font-black leading-none" style={{ color: valueColor }}>
        {value}
      </div>
      <div className="text-size-11 text-color-sub">
        <span style={{ color: changeColor }}>{change}</span>
        {variant === "ai-predict" ? " 14일 후 예측 평점" : " vs last period"}
      </div>
    </div>
  );
}
