import React from "react";
import { cn } from "@/lib/utils";

interface ChipSelectorProps {
  options: { label: string; value: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const ChipSelector: React.FC<ChipSelectorProps> = ({ options, value, onChange, className }) => {
  return (
    <div className={cn("inline-flex gap-2", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full h-9 px-4 text-sm font-medium transition-all duration-150 border",
            value === opt.value
              ? "bg-primary text-primary-foreground border-transparent"
              : "bg-background text-text-secondary border-border hover:border-[hsl(var(--border-hover))] hover:text-foreground"
          )}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
};
