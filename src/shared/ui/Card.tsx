import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-size-14 overflow-hidden border border-border-color bg-color-card ${className}`}
    >
      {children}
    </div>
  );
}
