import React from "react";
import { SectionHeader } from "@/pages/Index";
import { EmptyState } from "@/components/komisi/EmptyState";
import { Users, BarChart3 } from "lucide-react";

export const EmptyStatesSection = () => (
  <div>
    <SectionHeader title="Empty States" desc="Placeholder states for empty views." />
    <div className="bg-background-subtle rounded-xl p-8 grid grid-cols-2 gap-8">
      <EmptyState
        icon={<Users size={32} />}
        title="No affiliates yet"
        description="Invite your first affiliate to start growing your app with creator partnerships."
        actionLabel="Invite Affiliate"
        secondaryLabel="Browse marketplace"
      />
      <EmptyState
        icon={<BarChart3 size={32} />}
        title="No analytics data"
        description="Analytics will appear once your first affiliate starts driving traffic."
        actionLabel="Set Up Tracking"
      />
    </div>
  </div>
);
