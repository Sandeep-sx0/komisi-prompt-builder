import React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface KomisiLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

const iconSizeMap = {
  sm: 14,
  md: 16,
  lg: 20,
};

export const KomisiLogo: React.FC<KomisiLogoProps> = ({ size = "md", className }) => {
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-bold tracking-tighter text-foreground group", sizeMap[size], className)}>
      <Sparkles size={iconSizeMap[size]} className="transition-all duration-300 group-hover:text-chart-purple" />
      <span>komisi</span>
    </span>
  );
};
