import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, trend, className }) => {
  return (
    <div className={cn(
      "bg-card border border-border p-5 transition-all duration-200",
      "hover:border-[hsl(var(--border-hover))] hover:shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-text-tertiary">{icon}</span>
        {trend && (
          <span className={cn(
            "text-xs font-medium inline-flex items-center gap-0.5",
            trend.positive ? "text-success" : "text-error"
          )}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
      <div className="text-[28px] font-semibold text-foreground tracking-tight leading-none tabular-nums">
        {value}
      </div>
      <div className="text-[13px] text-text-secondary mt-1.5 leading-snug">{label}</div>
    </div>
  );
};

interface WatercolorCardProps {
  watercolor: "blue" | "pink" | "green" | "yellow" | "purple" | "mixed";
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const watercolorBorder: Record<string, string> = {
  blue: "border-info/20",
  pink: "border-chart-pink/20",
  green: "border-success/20",
  yellow: "border-warning/20",
  purple: "border-chart-purple/20",
  mixed: "border-chart-purple/20",
};

export const WatercolorCard: React.FC<WatercolorCardProps> = ({ watercolor, icon, title, description, className }) => {
  return (
    <div className={cn(`watercolor-${watercolor} rounded-xl p-6 border-2 flex flex-col justify-between aspect-[3/4]`, watercolorBorder[watercolor], className)}>
      <div className="text-foreground">{icon}</div>
      <div>
        <div className="text-lg font-semibold text-foreground">{title}</div>
        <div className="text-sm text-text-secondary mt-1">{description}</div>
      </div>
    </div>
  );
};
