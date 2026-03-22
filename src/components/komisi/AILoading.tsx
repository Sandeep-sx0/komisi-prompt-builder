import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface AILoadingStep {
  label: string;
}

interface AILoadingProps {
  steps: AILoadingStep[];
  className?: string;
  autoPlay?: boolean;
}

export const AILoading: React.FC<AILoadingProps> = ({ steps, className, autoPlay = true }) => {
  const [currentStep, setCurrentStep] = useState(autoPlay ? 0 : -1);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length) return prev;
        return prev + 1;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [steps.length, autoPlay]);

  return (
    <div className={cn("max-w-md mx-auto rounded-xl border border-border p-6 bg-card", className)}
         style={{ boxShadow: "0 0 0 1px rgba(8,145,178,0.1), 0 0 20px rgba(8,145,178,0.05)" }}>
      <div className="space-y-4">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                isCompleted && "gradient-ai",
                isActive && "border-2 border-transparent ai-spin",
                !isCompleted && !isActive && "border-2 border-dashed border-border"
              )}
              style={isActive ? { 
                borderImage: "linear-gradient(135deg, #0891B2, #EC4899, #F59E0B) 1",
                borderRadius: "50%",
                border: "2px solid",
                borderColor: "#0891B2"
              } : {}}>
                {isCompleted && <Check size={14} className="text-primary-foreground" />}
              </div>
              <span className={cn(
                "text-sm transition-all duration-300",
                isCompleted && "font-semibold text-foreground",
                isActive && "font-medium text-foreground",
                !isCompleted && !isActive && "text-text-tertiary"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
