export type StatVariant = "default" | "highlight" | "ai-predict";

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  change: string;
  changeType: "up" | "down" | "neutral";
  valueColorClass?: string;
  variant?: StatVariant;
}

const CHANGE_COLOR_CLASS: Record<"up" | "down" | "neutral", string> = {
  up: "text-color-green",
  down: "text-color-pink",
  neutral: "text-color-sub",
};

export default function StatCard({
  label,
  value,
  icon,
  change,
  changeType,
  valueColorClass = "text-white",
  variant = "default",
}: StatCardProps) {
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
      <div className={`text-size-30 font-black leading-none ${valueColorClass}`}>{value}</div>
      <div className="text-size-11 text-color-sub">
        <span className={CHANGE_COLOR_CLASS[changeType]}>{change}</span>
        {variant === "ai-predict" ? " 14일 후 예측 평점" : " 최근 리뷰 기준"}
      </div>
    </div>
  );
}
