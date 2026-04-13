export type Priority = "high" | "medium" | "low";

const priorityConfig: Record<Priority, { label: string; bg: string; color: string }> = {
  high: { label: "HIGH", bg: "rgba(255,45,122,.14)", color: "var(--pink)" },
  medium: { label: "MED", bg: "rgba(255,230,0,.11)", color: "var(--yellow)" },
  low: { label: "LOW", bg: "rgba(0,180,255,.11)", color: "var(--blue)" },
};

interface PriorityTagProps {
  priority: Priority;
  className?: string;
}

export default function PriorityTag({ priority, className = "" }: PriorityTagProps) {
  const { label, bg, color } = priorityConfig[priority];
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-[4px] flex-shrink-0 whitespace-nowrap h-fit ${className}`}
      style={{ background: bg, color }}
    >
      {label}
    </span>
  );
}
