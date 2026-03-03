import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import {
  Plus, Users, Download, DollarSign, TrendingUp,
  Calendar, MoreHorizontal, Pause, Play, ArrowRight, Target
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const campaigns = [
  { name: "TikTok Q1 Push", slug: "tiktok-q1-push", app: "MindfulApp", commission: "30/20%", status: "active" as const, affiliates: 8, installs: 432, revenue: "$1,890", rate: "4.4%", dates: "Jan 15 – Mar 31, 2026" },
  { name: "YouTube Review Program", slug: "youtube-review-program", app: "MindfulApp", commission: "25/15%", status: "active" as const, affiliates: 4, installs: 189, revenue: "$945", rate: "3.8%", dates: "Feb 1 – Apr 30, 2026" },
  { name: "Instagram Stories Sprint", slug: "instagram-stories-sprint", app: "MindfulApp", commission: "30/20%", status: "active" as const, affiliates: 3, installs: 67, revenue: "$234", rate: "2.9%", dates: "Mar 1 – Mar 31, 2026" },
  { name: "Launch Week Blitz", slug: "launch-week-blitz", app: "FocusTimer", commission: "35/25%", status: "paused" as const, affiliates: 6, installs: 312, revenue: "$1,456", rate: "5.1%", dates: "Dec 1 – Dec 31, 2025" },
  { name: "Holiday Campaign 2025", slug: "holiday-campaign-2025", app: "MindfulApp", commission: "40/30%", status: "ended" as const, affiliates: 10, installs: 890, revenue: "$4,230", rate: "4.7%", dates: "Nov 15 – Dec 31, 2025" },
];

const statusMap = { active: "success" as const, paused: "warning" as const, ended: "neutral" as const };

const Campaigns = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? campaigns : campaigns.filter((c) => c.status === filter);

  return (
    <DashboardLayout activeItem="Campaigns">
      <div className="px-8 py-6 max-w-[1200px]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Campaigns</h1>
          <Button onClick={() => navigate("/campaigns/create")}><Plus size={14} /> Create Campaign</Button>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4 border-b border-border">
            {[
              { value: "all", label: `All (${campaigns.length})` },
              { value: "active", label: `Active (${campaigns.filter((c) => c.status === "active").length})` },
              { value: "paused", label: `Paused (${campaigns.filter((c) => c.status === "paused").length})` },
              { value: "ended", label: `Ended (${campaigns.filter((c) => c.status === "ended").length})` },
            ].map((t) => (
              <button key={t.value} onClick={() => setFilter(t.value)} className={cn("text-sm font-medium pb-3 border-b-2 transition-all", filter === t.value ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t.label}</button>
            ))}
          </div>
          <input placeholder="Search campaigns..." className="h-9 w-[280px] px-3 text-sm bg-card border border-border rounded-lg outline-none focus:border-foreground" />
        </div>

        {/* Campaign cards */}
        <div className="space-y-4">
          {filtered.map((c) => (
            <div key={c.name} className="bg-card border border-border rounded-xl p-6 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{c.name}</h3>
                  <p className="text-sm text-text-secondary">{c.app} · Revenue Share {c.commission}</p>
                </div>
                <BadgeStatus variant={statusMap[c.status]} dot>{c.status}</BadgeStatus>
              </div>
              <div className="flex gap-6 mt-4 text-sm">
                {[
                  { icon: Users, value: c.affiliates, label: "affiliates" },
                  { icon: Download, value: c.installs, label: "installs" },
                  { icon: DollarSign, value: c.revenue, label: "revenue" },
                  { icon: TrendingUp, value: c.rate, label: "conversion" },
                ].map((s) => (
                  <span key={s.label} className="flex items-center gap-1.5"><s.icon size={16} className="text-text-tertiary" /><span className="font-medium text-foreground">{s.value}</span><span className="text-text-secondary">{s.label}</span></span>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs text-text-tertiary"><Calendar size={12} /> {c.dates}</div>
              <div className="flex items-center gap-2 mt-4">
                <Button variant="ghost" size="sm" onClick={() => navigate(`/campaigns/create?edit=${c.slug}`)}>
                  View Details <ArrowRight size={14} />
                </Button>
                <Button variant="ghost" size="sm">{c.status === "paused" ? <><Play size={14} /> Resume</> : <><Pause size={14} /> Pause</>}</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal size={16} /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/campaigns/create?edit=${c.slug}`)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>End Campaign</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
