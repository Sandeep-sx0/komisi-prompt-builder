import React from "react";
import { SectionHeader } from "@/pages/Index";
import { BadgeStatus, StatusDot } from "@/components/komisi/BadgeStatus";

export const BadgesSection = () => (
  <div>
    <SectionHeader title="Badges & Status" desc="Status badges and indicator dots." />
    <div className="bg-background-subtle rounded-xl p-8 space-y-6">
      <div>
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-3">Badges</p>
        <div className="flex flex-wrap gap-3">
          <BadgeStatus variant="success" dot>Active</BadgeStatus>
          <BadgeStatus variant="warning" dot>Pending</BadgeStatus>
          <BadgeStatus variant="error" dot>Blocked</BadgeStatus>
          <BadgeStatus variant="info">Info</BadgeStatus>
          <BadgeStatus variant="neutral">Draft</BadgeStatus>
          <BadgeStatus variant="active">Live</BadgeStatus>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-3">Status Dots</p>
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-2 text-sm"><StatusDot status="active" /> Active</span>
          <span className="flex items-center gap-2 text-sm"><StatusDot status="pending" /> Pending</span>
          <span className="flex items-center gap-2 text-sm"><StatusDot status="error" /> Error</span>
          <span className="flex items-center gap-2 text-sm"><StatusDot status="inactive" /> Inactive</span>
        </div>
      </div>
    </div>
  </div>
);
