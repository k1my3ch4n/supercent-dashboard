export type ProgressBarColor = "pink" | "green" | "yellow" | "blue" | "purple";

const PROGRESS_BAR_COLOR_CLASS: Record<ProgressBarColor, string> = {
  pink: "bg-color-pink",
  green: "bg-color-green",
  yellow: "bg-color-yellow",
  blue: "bg-color-blue",
  purple: "bg-color-purple",
};

interface ProgressBarProps {
  value: number;
  color?: ProgressBarColor;
  className?: string;
}

export default function ProgressBar({ value, color = "pink", className = "" }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`flex-1 h-size-5 rounded-full overflow-hidden bg-border-color ${className}`}>
      <div
        className={`h-full rounded-full ${PROGRESS_BAR_COLOR_CLASS[color]}`}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
