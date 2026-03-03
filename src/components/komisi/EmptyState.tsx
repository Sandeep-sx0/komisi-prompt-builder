import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon, title, description, actionLabel, onAction, secondaryLabel, onSecondary, className
}) => {
  return (
    <div className={cn("max-w-sm mx-auto text-center py-12", className)}>
      <div className="w-20 h-20 mx-auto rounded-full watercolor-mixed opacity-60 flex items-center justify-center">
        <div className="text-text-secondary">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mt-4">{title}</h3>
      <p className="text-sm text-text-secondary mt-1 max-w-[280px] mx-auto">{description}</p>
      {actionLabel && (
        <Button onClick={onAction} className="mt-4">{actionLabel}</Button>
      )}
      {secondaryLabel && (
        <button onClick={onSecondary} className="block mx-auto mt-2 text-sm text-text-secondary hover:text-foreground underline">
          {secondaryLabel}
        </button>
      )}
    </div>
  );
};
