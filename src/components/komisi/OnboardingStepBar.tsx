import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OnboardingStepBarProps {
  totalSteps: number;
  currentStep: number;
  stepLabel: string;
  onBack?: () => void;
  onNext?: () => void;
  onSkipStep?: () => void;
  onSkipAll?: () => void;
  isLast?: boolean;
  className?: string;
}

export const OnboardingStepBar: React.FC<OnboardingStepBarProps> = ({
  totalSteps, currentStep, stepLabel, onBack, onNext, onSkipStep, onSkipAll, isLast, className
}) => {
  return (
    <div className={cn("h-16 bg-card border-t border-border px-6 flex items-center justify-between", className)}>
      <div className="flex items-center gap-3">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const completed = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={i} className={cn(
              "rounded-full flex items-center justify-center text-xs font-semibold transition-all",
              completed && "w-8 h-8 bg-primary text-primary-foreground",
              active && "w-9 h-9 bg-primary text-primary-foreground",
              !completed && !active && "w-8 h-8 bg-background border border-border text-text-tertiary"
            )}>
              {completed ? "✓" : i + 1}
            </div>
          );
        })}
        <span className="text-sm font-medium text-foreground ml-2">{stepLabel}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onSkipStep}>Skip Step</Button>
        <Button variant="ghost" size="sm" onClick={onSkipAll}>Skip All</Button>
        {currentStep > 0 && <Button variant="secondary" size="sm" onClick={onBack}>Back</Button>}
        <Button size="sm" onClick={onNext}>{isLast ? "Finish" : "Next →"}</Button>
      </div>
    </div>
  );
};
