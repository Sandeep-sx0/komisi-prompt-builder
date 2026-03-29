import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

const programs = [
  {
    name: "MindfulApp", category: "Health & Fitness", platforms: "iOS + Android",
    commission: "30% first purchase · 20% renewals (12mo)",
    installs: 234, earned: "$890", cvr: "5.2%", status: "active" as const,
    joined: "Feb 2, 2026",
  },
  {
    name: "FocusTimer", category: "Productivity", platforms: "iOS",
    commission: "$5 per install",
    installs: 89, earned: "$445", cvr: "3.8%", status: "active" as const,
    joined: "Jan 15, 2026",
  },
  {
    name: "DailyYoga", category: "Health & Fitness", platforms: "iOS + Android",
    commission: "25% first purchase · 15% renewals (6mo)",
    installs: 56, earned: "$227", cvr: "4.1%", status: "active" as const,
    joined: "Jan 28, 2026",
  },
  {
    name: "SleepWell", category: "Health & Fitness", platforms: "iOS",
    commission: "$3 per install",
    installs: 0, earned: "$0", cvr: "—", status: "pending" as const,
    joined: "Applied 2 days ago",
  },
];

const CreatorPrograms = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("active");

  const counts = {
    active: programs.filter(p => p.status === "active").length,
    pending: programs.filter(p => p.status === "pending").length,
    ended: 0,
  };

  const filtered = filter === "all" ? programs : programs.filter(p => {
    if (filter === "active") return p.status === "active";
    if (filter === "pending") return p.status === "pending";
    return false;
  });

  return (
    <DashboardLayout activeItem="My Programs" userType="creator">
      <div className="px-8 py-8 max-w-[1200px]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">My Programs</h1>
          <Button onClick={() => navigate("/creator/marketplace")}>Browse Marketplace →</Button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-4 border-b border-border mb-8">
          {([
            { key: "active", label: `Active (${counts.active})` },
            { key: "pending", label: `Pending (${counts.pending})` },
            { key: "ended", label: `Ended (0)` },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={cn(
                "text-sm font-medium pb-3 border-b-2 transition-all",
                filter === t.key
                  ? "text-foreground border-foreground"
                  : "text-text-secondary border-transparent hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Program cards */}
        <div className="space-y-4">
          {filtered.map((p) => (
            <div key={p.name} className="bg-card border border-border p-5 hover:border-[hsl(var(--border-hover))] transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-background-subtle flex items-center justify-center text-lg shrink-0">📱</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                    {p.status === "active" ? (
                      <BadgeStatus variant="success" dot>Active</BadgeStatus>
                    ) : (
                      <BadgeStatus variant="warning" dot>Pending Approval</BadgeStatus>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">{p.category} · {p.platforms}</p>
                  <p className="text-sm text-text-secondary mt-1">{p.commission}</p>

                  {p.status === "active" ? (
                    <>
                      <div className="flex gap-4 mt-3 text-[13px]">
                        <span className="text-foreground font-medium">{p.installs} installs</span>
                        <span className="text-text-tertiary">·</span>
                        <span className="text-foreground font-medium">{p.earned} earned</span>
                        <span className="text-text-tertiary">·</span>
                        <span className="text-foreground font-medium">{p.cvr} CVR</span>
                      </div>
                      <p className="text-xs text-text-tertiary mt-2">Joined {p.joined}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="ghost" size="sm" onClick={() => navigate("/creator/links")}>View Links →</Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate("/creator/earnings")}>View Earnings →</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-destructive">Leave Program</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-text-tertiary mt-3">{p.joined}</p>
                      <div className="mt-3">
                        <Button variant="destructive" size="sm">Cancel Application</Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatorPrograms;