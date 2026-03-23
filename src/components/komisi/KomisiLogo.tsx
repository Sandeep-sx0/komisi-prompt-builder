import React from "react";
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

export const KomisiLogo: React.FC<KomisiLogoProps> = ({ size = "md", className }) => {
  return (
    <span className={cn("inline-flex items-center gap-1.5 tracking-tighter text-foreground group", sizeMap[size], className)} style={{ fontWeight: 500 }}>
      <span>komisi</span>
    </span>
  );
};
