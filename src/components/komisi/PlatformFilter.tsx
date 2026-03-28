import React from "react";
import { cn } from "@/lib/utils";

interface PlatformFilterProps {
  value: "all" | "ios" | "android";
  onChange: (value: "all" | "ios" | "android") => void;
  className?: string;
}

export const PlatformFilter: React.FC<PlatformFilterProps> = ({ value, onChange, className }) => {
  const options = [
    { label: "All", value: "all" as const },
    { label: "iOS", value: "ios" as const },
    { label: "Android", value: "android" as const },
  ];

  return (
    <div className={cn("inline-flex border border-border bg-card", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "px-3 h-8 text-sm font-medium transition-colors",
            value === option.value
              ? "bg-foreground text-background"
              : "text-text-secondary hover:text-foreground hover:bg-background-subtle"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
