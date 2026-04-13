import { ReactNode } from "react";

export type BadgeVariant = "pink" | "green" | "yellow" | "blue" | "purple";

const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  pink: { bg: "rgba(255,45,122,.14)", color: "var(--pink)" },
  green: { bg: "rgba(0,230,118,.11)", color: "var(--green)" },
  yellow: { bg: "rgba(255,230,0,.11)", color: "var(--yellow)" },
  blue: { bg: "rgba(0,180,255,.11)", color: "var(--blue)" },
  purple: { bg: "rgba(182,109,255,.14)", color: "var(--purple)" },
};

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export default function Badge({ variant, children, className = "" }: BadgeProps) {
  const { bg, color } = variantStyles[variant];
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${className}`}
      style={{ background: bg, color }}
    >
      {children}
    </span>
  );
}
