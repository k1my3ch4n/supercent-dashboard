import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-[14px] overflow-hidden border ${className}`}
      style={{ background: "var(--card)", borderColor: "var(--border-color)" }}
    >
      {children}
    </div>
  );
}
