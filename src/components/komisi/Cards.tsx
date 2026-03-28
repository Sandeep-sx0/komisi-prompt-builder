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
    <div className={cn("bg-card border border-border rounded-xl p-6 transition-all duration-200 hover:shadow-sm hover:-translate-y-px hover:border-[hsl(var(--border-hover))]", className)}>
      <div className="text-text-tertiary mb-3">{icon}</div>
      <div className="text-2xl font-semibold text-foreground tracking-tighter tabular-nums">{value}</div>
      <div className="text-sm text-text-secondary mt-1 leading-snug">{label}</div>
      {trend && (
        <div className={cn("text-xs font-medium mt-2 inline-flex items-center gap-1", trend.positive ? "text-success" : "text-error")}>
          {trend.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {trend.value}
        </div>
      )}
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
