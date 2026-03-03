import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const modes = [
  { value: "developer", label: "👨‍💻 Developer View", prefix: "/dashboard" },
  { value: "creator", label: "🎨 Creator View", prefix: "/creator/dashboard" },
] as const;

export const DemoModeSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname.startsWith("/creator") ? "creator" : "developer";

  const handleSwitch = (mode: string) => {
    if (mode === current) return;
    navigate(mode === "creator" ? "/creator/dashboard" : "/dashboard");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-1">
      <span className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider">Demo Mode</span>
      <div className="bg-card border border-border rounded-full shadow-lg p-1 flex gap-1">
        {modes.map((m) => (
          <button
            key={m.value}
            onClick={() => handleSwitch(m.value)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
              current === m.value
                ? "bg-primary text-primary-foreground"
                : "text-text-secondary hover:text-foreground"
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
};
