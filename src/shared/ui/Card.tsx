import { ReactNode } from "react";
import Badge, { type BadgeVariant } from "@shared/ui/Badge";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  badgeVariant?: BadgeVariant;
  badgeText?: string;
  headerClassName?: string;
  footer?: ReactNode;
}

export default function Card({
  children,
  className = "",
  title,
  subtitle,
  badgeVariant,
  badgeText = "AI",
  headerClassName = "",
  footer,
}: CardProps) {
  const shouldRenderHeader = Boolean(title || subtitle || badgeVariant);

  return (
    <div
      className={`rounded-size-14 overflow-hidden border border-border-color bg-color-card ${className}`}
    >
      {shouldRenderHeader && (
        <div
          className={`flex items-center justify-between px-size-18 py-size-14 border-b border-border-color ${headerClassName}`}
        >
          <div>
            {title && <div className="text-size-14 font-extrabold">{title}</div>}
            {subtitle && <div className="text-size-11 mt-0.5 text-color-sub">{subtitle}</div>}
          </div>
          {badgeVariant && <Badge variant={badgeVariant}>{badgeText}</Badge>}
        </div>
      )}
      {children}
      {footer}
    </div>
  );
}
