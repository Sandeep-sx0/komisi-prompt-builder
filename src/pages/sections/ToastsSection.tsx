import React from "react";
import { SectionHeader } from "@/pages/Index";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";

const toasts = [
  { variant: "success", icon: CheckCircle, color: "bg-success", title: "Campaign created", msg: "Your campaign is now live and visible to creators." },
  { variant: "error", icon: XCircle, color: "bg-error", title: "Payment failed", msg: "Unable to process payout. Please check payment method." },
  { variant: "warning", icon: AlertTriangle, color: "bg-warning", title: "API rate limit", msg: "You're approaching the rate limit for this endpoint." },
  { variant: "info", icon: Info, color: "bg-info", title: "New affiliate", msg: "Emma Rodriguez applied to your MindfulApp program." },
];

export const ToastsSection = () => (
  <div>
    <SectionHeader title="Toast Notifications" desc="Success, error, warning, and info toasts." />
    <div className="bg-background-subtle rounded-xl p-8 space-y-3 max-w-md">
      {toasts.map((t) => (
        <div key={t.variant} className="bg-card rounded-xl shadow-lg border border-border p-4 flex gap-3 relative overflow-hidden">
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${t.color}`} />
          <t.icon size={18} className="shrink-0 mt-0.5" style={{ color: `hsl(var(--${t.variant === "success" ? "success" : t.variant === "error" ? "error" : t.variant === "warning" ? "warning" : "info"}))` }} />
          <div className="flex-1">
            <div className="text-sm font-semibold text-foreground">{t.title}</div>
            <div className="text-sm text-text-secondary">{t.msg}</div>
          </div>
          <button className="text-text-tertiary hover:text-foreground shrink-0"><X size={14} /></button>
        </div>
      ))}
    </div>
  </div>
);
