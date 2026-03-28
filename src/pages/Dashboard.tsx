import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { BadgeStatus, StatusDot } from "@/components/komisi/BadgeStatus";
import { PlatformFilter } from "@/components/komisi/PlatformFilter";
import { useAppScope } from "@/hooks/use-app-scope";
import { Button } from "@/components/ui/button";
import {
  Users, Download, DollarSign, Target, TrendingUp,
  Plus, Link2, BarChart3, ChevronDown, X, AlertTriangle
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const chartData = [
  { date: "Feb 25", installs: 89, revenue: 245 },
  { date: "Feb 26", installs: 102, revenue: 289 },
  { date: "Feb 27", installs: 95, revenue: 268 },
  { date: "Feb 28", installs: 134, revenue: 378 },
  { date: "Mar 1", installs: 156, revenue: 445 },
  { date: "Mar 2", installs: 128, revenue: 356 },
  { date: "Mar 3", installs: 145, revenue: 412 },
  { date: "Mar 4", installs: 98, revenue: 289 },
];

const affiliates = [
  { initials: "SC", name: "@sarahcreates", platforms: "TikTok, YouTube", installs: 234, revenue: "$890", rate: "5.2%", watercolor: "watercolor-pink" },
  { initials: "TR", name: "@techreviewer", platforms: "YouTube", installs: 189, revenue: "$672", rate: "4.8%", watercolor: "watercolor-blue" },
  { initials: "AJ", name: "@appjunkie", platforms: "Blog, Twitter", installs: 156, revenue: "$445", rate: "3.9%", watercolor: "watercolor-green" },
  { initials: "FT", name: "@fitnesstech", platforms: "TikTok", installs: 98, revenue: "$333", rate: "6.1%", watercolor: "watercolor-yellow" },
];

const activities = [
  { color: "bg-success", text: "New affiliate joined: @mobilereview", time: "2h ago" },
  { color: "bg-chart-purple", text: "Payout sent: $234 to @sarahcreates", time: "5h ago" },
  { color: "bg-chart-blue", text: 'New install attributed: Campaign "TikTok Q1"', time: "6h ago" },
  { color: "bg-warning", text: "Fraud alert: Unusual pattern from @user892", time: "1d ago" },
  { color: "bg-success", text: 'Campaign "YouTube Review" reached 100 installs', time: "2d ago" },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card shadow-lg border border-border p-3 text-sm">
      <p className="font-medium text-foreground mb-1">{label}</p>
      <p className="text-chart-blue">Installs: {payload[0]?.value}</p>
      <p className="text-chart-purple">Revenue: ${payload[1]?.value}</p>
    </div>
  );
};

const metrics = [
  { icon: <Users size={18} />, value: "12", label: "Active Affiliates", trend: { value: "3 new", positive: true } },
  { icon: <Download size={18} />, value: "847", label: "Installs This Week", trend: { value: "12%", positive: true } },
  { icon: <DollarSign size={18} />, value: "$2,340", label: "Affiliate Revenue", trend: { value: "23%", positive: true } },
  { icon: <Target size={18} />, value: "8", label: "Active Campaigns", trend: null },
  { icon: <DollarSign size={18} />, value: "$1,230", label: "Commissions Paid", trend: { value: "18%", positive: true } },
];

const Dashboard = () => {
  const [showFraud, setShowFraud] = useState(true);
  const [showEmpty, setShowEmpty] = useState(false);
  const [platform, setPlatform] = useState<"all" | "ios" | "android">("all");
  const { appName } = useAppScope();

  return (
    <DashboardLayout activeItem="Dashboard">
      <div className="px-8 py-8 max-w-[1200px]">
        {/* Toggle */}
        <div className="flex justify-end mb-2">
          <button onClick={() => setShowEmpty(!showEmpty)} className="text-xs text-text-tertiary hover:text-foreground underline">
            {showEmpty ? "Show with data" : "Show empty state"}
          </button>
        </div>

        {showEmpty ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="w-28 h-28 mx-auto rounded-full watercolor-mixed opacity-50 flex items-center justify-center"><span className="text-4xl">🚀</span></div>
              <h2 className="text-xl font-semibold text-foreground mt-6">Your affiliate program is ready.</h2>
              <p className="text-sm text-text-secondary mt-1">Let's get your first creator on board.</p>
              <div className="mt-6 space-y-2 text-left max-w-xs mx-auto">
                {[
                  { label: "Install the SDK", done: true },
                  { label: "Connect RevenueCat", done: true },
                  { label: "Create your first campaign", done: false },
                  { label: "Invite your first affiliate", done: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    <span className={cn("w-5 h-5 rounded-full flex items-center justify-center text-xs", item.done ? "bg-success text-primary-foreground" : "border border-border text-text-tertiary")}>
                      {item.done ? "✓" : "○"}
                    </span>
                    <span className={item.done ? "line-through text-text-secondary" : "text-foreground"}>{item.label}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-6">Create Your First Campaign <span>→</span></Button>
            </div>
          </div>
        ) : (
          <>
            {/* Fraud banner */}
            {showFraud && (
              <div className="mb-4 bg-warning-light border border-warning/30 px-4 py-3 flex items-center gap-3 text-sm">
                <AlertTriangle size={16} className="text-warning shrink-0" />
                <span className="flex-1 text-foreground">
                  <strong>Fraud Alert:</strong> Unusual install pattern from @user892 — 47 installs from same IP range.
                </span>
                <a href="#" className="underline font-medium text-foreground shrink-0">Review Details →</a>
                <button onClick={() => setShowFraud(false)} className="text-text-tertiary hover:text-foreground shrink-0"><X size={16} /></button>
              </div>
            )}

            {/* Welcome */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back, Sandeep</h1>
                <p className="text-sm text-text-secondary mt-0.5">Viewing: {appName}</p>
              </div>
              <div className="flex items-center gap-3">
                <PlatformFilter value={platform} onChange={setPlatform} />
                <Button variant="secondary" size="sm"><span>Last 7 days</span> <ChevronDown size={14} /></Button>
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="bg-card border border-border mb-8">
              <div className="grid grid-cols-5 divide-x divide-border">
                {metrics.map((metric) => (
                  <div key={metric.label} className="px-5 py-5">
                    <div className="flex items-center gap-2 text-text-tertiary mb-3">
                      {metric.icon}
                      <span className="text-[13px] text-text-secondary">{metric.label}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[28px] font-semibold text-foreground tracking-tight leading-none tabular-nums">
                        {metric.value}
                      </span>
                      {metric.trend && (
                        <span className={cn("text-xs font-medium", metric.trend.positive ? "text-success" : "text-error")}>
                          ↑ {metric.trend.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="bg-card border border-border p-6 pb-4 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-foreground">Revenue from Affiliates</h2>
                <div className="flex items-center gap-5 text-[13px] text-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    Installs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                    Revenue
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="gradInstalls" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} /><stop offset="100%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F1" horizontal vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#B0B0B0" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#B0B0B0" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="installs" stroke="#3B82F6" strokeWidth={2.5} fill="url(#gradInstalls)" dot={false} />
                  <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#gradRevenue)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-5 gap-6 mb-8">
              {/* Affiliates */}
              <div className="col-span-3">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-semibold text-foreground">Top Performing Affiliates</h2>
                  <button className="text-sm text-text-secondary hover:text-foreground">View All →</button>
                </div>
                <div className="bg-card border border-border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {["#", "Affiliate", "Installs", "Revenue", "Conv Rate"].map((h) => (
                          <th key={h} className="text-left text-[11px] uppercase tracking-[0.08em] font-medium text-text-tertiary h-10 px-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {affiliates.map((a, i) => (
                        <tr key={a.name} className="border-b border-muted last:border-0 hover:bg-background-subtle cursor-pointer transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring">
                          <td className="px-4 h-[52px] text-sm text-text-secondary">{i + 1}</td>
                          <td className="px-4 h-[52px]">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full ${a.watercolor} flex items-center justify-center text-xs font-semibold text-foreground`}>{a.initials}</div>
                              <div><div className="text-sm font-medium text-foreground">{a.name}</div><div className="text-xs text-text-tertiary">{a.platforms}</div></div>
                            </div>
                          </td>
                          <td className="px-4 h-[52px] text-sm font-medium text-foreground tabular-nums">{a.installs}</td>
                          <td className="px-4 h-[52px] text-sm font-medium text-foreground tabular-nums">{a.revenue}</td>
                          <td className="px-4 h-[52px]">
                            <BadgeStatus variant={parseFloat(a.rate) > 5 ? "success" : "neutral"} dot>
                              {a.rate}
                            </BadgeStatus>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Activity */}
              <div className="col-span-2">
                <h2 className="text-base font-semibold text-foreground mb-3">Recent Activity</h2>
                <div className="bg-card border border-border p-5">
                  {activities.map((a, i) => (
                    <div key={i} className={cn(
                      "flex items-start gap-3 py-3",
                      i < activities.length - 1 && "border-b border-border/50"
                    )}>
                      <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", a.color)} />
                      <p className="text-[13px] text-foreground flex-1 leading-relaxed">{a.text}</p>
                      <p className="text-[11px] text-text-tertiary whitespace-nowrap ml-3 mt-0.5">{a.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-base font-semibold text-foreground mb-3">Quick Actions</h2>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: Plus, label: "Create Campaign" },
                  { icon: Users, label: "Invite Affiliate" },
                  { icon: Link2, label: "Get Links" },
                  { icon: BarChart3, label: "View Reports" },
                ].map((a) => (
                  <button key={a.label} className="group bg-card border border-border p-4 flex items-center gap-3 hover:border-[hsl(var(--border-hover))] transition-colors cursor-pointer">
                    <a.icon size={16} className="text-text-tertiary group-hover:text-foreground transition-colors" />
                    <span className="text-[13px] font-medium text-foreground">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
