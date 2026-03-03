import React from "react";
import { cn } from "@/lib/utils";

interface BadgeStatusProps {
  variant: "success" | "warning" | "error" | "info" | "neutral" | "active";
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeStatusProps["variant"], string> = {
  success: "bg-success-light text-[#065F46]",
  warning: "bg-warning-light text-[#92400E]",
  error: "bg-error-light text-[#991B1B]",
  info: "bg-info-light text-[#1E40AF]",
  neutral: "bg-muted text-foreground",
  active: "bg-primary text-primary-foreground",
};

export const BadgeStatus: React.FC<BadgeStatusProps> = ({ variant, children, dot, className }) => {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", variantClasses[variant], className)}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
};

interface StatusDotProps {
  status: "active" | "pending" | "error" | "inactive";
  className?: string;
}

const dotColors: Record<StatusDotProps["status"], string> = {
  active: "bg-success",
  pending: "bg-warning",
  error: "bg-error",
  inactive: "bg-muted-foreground/40",
};

export const StatusDot: React.FC<StatusDotProps> = ({ status, className }) => {
  return <span className={cn("inline-block w-2 h-2 rounded-full", dotColors[status], className)} />;
};
