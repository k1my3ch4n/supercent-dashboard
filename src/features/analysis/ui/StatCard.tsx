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
  const basisLabel = variant === "ai-predict" ? "14일 후 예측" : "최근 리뷰 기준";

  return (
    <article
      className={`rounded-size-14 border flex h-full flex-col px-size-18 py-4 bg-color-card ${
        variant === "highlight" ? "border-color-pink" : "border-border-color"
      }`}
    >
      <header className="flex min-h-size-36 items-start justify-between">
        <h3 className="text-size-10 font-bold tracking-size-1 uppercase text-color-sub">{label}</h3>
        <div className="flex flex-col items-end gap-1">
          <span className="text-size-9 px-size-5 py-px rounded-size-4 bg-color-white-a06 text-color-muted whitespace-nowrap">
            {basisLabel}
          </span>
          <span className="sr-only">{icon}</span>
        </div>
      </header>

      <div className="mt-auto flex flex-col gap-size-6">
        <div className={`text-size-30 font-black leading-none ${valueColorClass}`}>{value}</div>
        <div className="text-size-11 text-color-sub">
          <span className={`${CHANGE_COLOR_CLASS[changeType]} truncate`}>{change}</span>
        </div>
      </div>
    </article>
  );
}
