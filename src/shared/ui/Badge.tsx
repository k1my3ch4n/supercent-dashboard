import { ReactNode } from "react";

export type BadgeVariant = "pink" | "green" | "yellow" | "blue" | "purple";

const variantStyles: Record<BadgeVariant, string> = {
  pink: "bg-color-pink-a14 text-color-pink",
  green: "bg-color-green-a11 text-color-green",
  yellow: "bg-color-yellow-a11 text-color-yellow",
  blue: "bg-color-blue-a11 text-color-blue",
  purple: "bg-color-purple-a14 text-color-purple",
};

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export default function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`text-size-10 font-bold px-2 py-0.5 rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
