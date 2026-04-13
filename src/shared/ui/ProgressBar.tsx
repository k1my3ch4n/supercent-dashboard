interface ProgressBarProps {
  value: number;
  color?: string;
  className?: string;
}

export default function ProgressBar({
  value,
  color = "var(--pink)",
  className = "",
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`flex-1 h-[5px] rounded-full overflow-hidden ${className}`}
      style={{ background: "var(--border-color)" }}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${clampedValue}%`, background: color }}
      />
    </div>
  );
}
