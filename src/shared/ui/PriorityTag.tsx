export type Priority = "high" | "medium" | "low";

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: "HIGH", className: "bg-color-pink-a14 text-color-pink" },
  medium: { label: "MED", className: "bg-color-yellow-a11 text-color-yellow" },
  low: { label: "LOW", className: "bg-color-blue-a11 text-color-blue" },
};

interface PriorityTagProps {
  priority: Priority;
  className?: string;
}

export default function PriorityTag({ priority, className = "" }: PriorityTagProps) {
  const { label, className: priorityClassName } = priorityConfig[priority];
  return (
    <span
      className={`text-size-10 font-bold px-2 py-0.5 rounded-size-4 flex-shrink-0 whitespace-nowrap h-fit ${priorityClassName} ${className}`}
    >
      {label}
    </span>
  );
}
