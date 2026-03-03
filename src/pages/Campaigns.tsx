import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import { EmptyState } from "@/components/komisi/EmptyState";
import {
  Plus, Users, Download, DollarSign, TrendingUp,
  Calendar, MoreHorizontal, Pause, Play, Copy, ArrowRight, Target
} from "lucide-react";
import { cn } from "@/lib/utils";

const campaigns = [
  { name: "TikTok Q1 Push", app: "MindfulApp", commission: "30/20%", status: "active" as const, affiliates: 8, installs: 432, revenue: "$1,890", rate: "4.4%", dates: "Jan 15 – Mar 31, 2026" },
  { name: "YouTube Review Program", app: "MindfulApp", commission: "25/15%", status: "active" as const, affiliates: 4, installs: 189, revenue: "$945", rate: "3.8%", dates: "Feb 1 – Apr 30, 2026" },
  { name: "Instagram Stories Sprint", app: "MindfulApp", commission: "30/20%", status: "active" as const, affiliates: 3, installs: 67, revenue: "$234", rate: "2.9%", dates: "Mar 1 – Mar 31, 2026" },
  { name: "Launch Week Blitz", app: "FocusTimer", commission: "35/25%", status: "paused" as const, affiliates: 6, installs: 312, revenue: "$1,456", rate: "5.1%", dates: "Dec 1 – Dec 31, 2025" },
  { name: "Holiday Campaign 2025", app: "MindfulApp", commission: "40/30%", status: "ended" as const, affiliates: 10, installs: 890, revenue: "$4,230", rate: "4.7%", dates: "Nov 15 – Dec 31, 2025" },
];

const statusMap = { active: "success" as const, paused: "warning" as const, ended: "neutral" as const };

const Campaigns = () => {
  const [view, setView] = useState<"list" | "create">("list");
  const [filter, setFilter] = useState("all");
  const [assignType, setAssignType] = useState("all");
  const [commSource, setCommSource] = useState("default");
  const [commType, setCommType] = useState("revenue");

  const filtered = filter === "all" ? campaigns : campaigns.filter((c) => c.status === filter);

  return (
    <DashboardLayout activeItem="Campaigns">
      <div className="px-8 py-6 max-w-[1200px]">
        {/* Toggle */}
        <div className="flex justify-end mb-2">
          <button onClick={() => setView(view === "list" ? "create" : "list")} className="text-xs text-text-tertiary hover:text-foreground underline">
            {view === "list" ? "Show Create Form" : "Show Campaign List"}
          </button>
        </div>

        {view === "list" ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold tracking-tighter text-foreground">Campaigns</h1>
              <Button onClick={() => setView("create")}><Plus size={14} /> Create Campaign</Button>
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
                    <Button variant="ghost" size="sm">View Details →</Button>
                    <Button variant="ghost" size="sm">{c.status === "paused" ? <><Play size={14} /> Resume</> : <><Pause size={14} /> Pause</>}</Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal size={16} /></Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* CREATE FORM */
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold tracking-tighter text-foreground">Create Campaign</h1>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setView("list")}>Cancel</Button>
                <Button variant="secondary">Save as Draft</Button>
              </div>
            </div>

            <div className="space-y-8 max-w-3xl">
              {/* Section 1 */}
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-1">Campaign Details</h2>
                <div className="h-px bg-border mb-6" />
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">Campaign Name *</label><input placeholder="e.g., TikTok Q1 Push" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none focus:border-foreground" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-foreground mb-1.5">App *</label><select className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none"><option>MindfulApp</option><option>FocusTimer Pro</option></select></div>
                    <div><label className="block text-sm font-medium text-foreground mb-1.5">Duration</label><div className="flex gap-2"><input type="date" className="flex-1 h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none" /><input type="date" className="flex-1 h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none" /></div></div>
                  </div>
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">Description</label><textarea placeholder="Describe this campaign for your affiliates..." rows={3} className="w-full px-3 py-2 text-sm bg-card border border-border rounded-lg outline-none resize-y" /></div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-1">Commission Structure</h2>
                <div className="h-px bg-border mb-6" />
                <div className="space-y-4">
                  <div className="flex gap-4">
                    {[{ value: "default", label: "Use app default (30% / 20%)" }, { value: "custom", label: "Custom for this campaign" }].map((o) => (
                      <button key={o.value} onClick={() => setCommSource(o.value)} className={cn("h-10 px-4 rounded-lg border text-sm font-medium transition-all", commSource === o.value ? "bg-primary text-primary-foreground border-transparent" : "bg-card text-text-secondary border-border")}>{o.label}</button>
                    ))}
                  </div>
                  {commSource === "custom" && (
                    <div className="space-y-4 animate-fade-in">
                      <ChipSelector options={[{ label: "Revenue Share (%)", value: "revenue" }, { label: "Fixed Amount ($)", value: "fixed" }, { label: "Tiered", value: "tiered" }]} value={commType} onChange={setCommType} />
                      <div className="grid grid-cols-3 gap-4">
                        <div><label className="block text-sm font-medium text-foreground mb-1.5">First Purchase *</label><input defaultValue="30" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none" /></div>
                        <div><label className="block text-sm font-medium text-foreground mb-1.5">Recurring</label><input defaultValue="20" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none" /></div>
                        <div><label className="block text-sm font-medium text-foreground mb-1.5">Duration</label><select className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none"><option>12 months</option><option>6 months</option></select></div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-1">Links & Tracking</h2>
                <div className="h-px bg-border mb-6" />
                <div className="bg-background-subtle rounded-lg p-4 mb-4">
                  <p className="text-xs text-text-tertiary mb-1">Smart Link (auto-generated):</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-foreground">https://komisi.io/go/mindfulapp-tiktok-q1</span>
                    <button className="text-text-tertiary hover:text-foreground"><Copy size={14} /></button>
                  </div>
                  <p className="text-xs text-text-tertiary mt-2">This link will be customized per affiliate with their ref ID.</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">Source</label><input placeholder="tiktok" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none" /></div>
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">Medium</label><input defaultValue="affiliate" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none" /></div>
                  <div><label className="block text-sm font-medium text-foreground mb-1.5">Campaign</label><input defaultValue="tiktok-q1-push" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none" /></div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-1">Affiliate Assignment</h2>
                <div className="h-px bg-border mb-6" />
                <div className="space-y-3">
                  {[
                    { value: "all", label: "All current affiliates (12)" },
                    { value: "select", label: "Select specific affiliates" },
                    { value: "open", label: "Open to marketplace — any creator can apply" },
                  ].map((o) => (
                    <button key={o.value} onClick={() => setAssignType(o.value)} className={cn("w-full text-left h-10 px-4 rounded-lg border text-sm font-medium transition-all", assignType === o.value ? "bg-primary text-primary-foreground border-transparent" : "bg-card text-text-secondary border-border hover:border-[hsl(var(--border-hover))]")}>{o.label}</button>
                  ))}
                </div>
              </section>

              {/* Bottom */}
              <div className="border-t border-border pt-6 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setView("list")}>Cancel</Button>
                <Button variant="secondary">Save as Draft</Button>
                <Button size="lg">Launch Campaign <ArrowRight size={16} /></Button>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
