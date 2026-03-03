import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { MetricCard } from "@/components/komisi/Cards";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import {
  DollarSign, Download, TrendingUp, Calendar, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

// 30-day revenue data
const revenueData = Array.from({ length: 30 }, (_, i) => ({
  date: `${i < 5 ? "Feb" : "Mar"} ${i < 5 ? i + 24 : i - 4}`,
  affiliate: Math.floor(80 + Math.random() * 40 + i * 2.8),
  organic: Math.floor(180 + Math.random() * 40),
  paid: Math.floor(300 - Math.random() * 30 - i * 1.7),
}));

const channelData = [
  { name: "TikTok", value: 1904, pct: "45%", color: "#EC4899" },
  { name: "YouTube", value: 1269, pct: "30%", color: "#8B5CF6" },
  { name: "Blog/SEO", value: 635, pct: "15%", color: "#3B82F6" },
  { name: "Instagram", value: 296, pct: "7%", color: "#10B981" },
  { name: "Other", value: 127, pct: "3%", color: "#F59E0B" },
];

const topContent = [
  { title: "Best meditation apps for 2026", creator: "@sarahcreates", platform: "TikTok", installs: 234, revenue: "$890" },
  { title: "MindfulApp — honest 30-day review", creator: "@techreviewer", platform: "YouTube", installs: 189, revenue: "$672" },
  { title: "My morning routine app stack", creator: "@appjunkie", platform: "Blog", installs: 98, revenue: "$334" },
  { title: "Apps that actually help anxiety", creator: "@fitnesstech", platform: "TikTok", installs: 67, revenue: "$228" },
];

const leaderboard = [
  { rank: 1, name: "Sarah Chen", handle: "@sarahcreates", installs: 234, revenue: "$890", cvr: "5.2%" },
  { rank: 2, name: "Alex Kim", handle: "@techreviewer", installs: 189, revenue: "$672", cvr: "4.8%" },
  { rank: 3, name: "Jordan Lee", handle: "@appjunkie", installs: 156, revenue: "$445", cvr: "3.9%" },
  { rank: 4, name: "Maria Santos", handle: "@fitnesstech", installs: 98, revenue: "$333", cvr: "6.1%" },
  { rank: 5, name: "David Park", handle: "@davidreviews", installs: 87, revenue: "$298", cvr: "4.1%" },
  { rank: 6, name: "Priya Patel", handle: "@priyatech", installs: 76, revenue: "$256", cvr: "3.5%" },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card rounded-lg shadow-lg border border-border p-3 text-sm">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: ${p.value}</p>
      ))}
    </div>
  );
};

const Analytics = () => {
  const [tab, setTab] = useState("overview");

  return (
    <DashboardLayout activeItem="Analytics">
      <div className="px-8 py-6 max-w-[1200px]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tighter text-foreground">Analytics</h1>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm"><Calendar size={14} /> Last 30 days <ChevronDown size={14} /></Button>
            <Button variant="secondary" size="sm"><Download size={14} /> Export CSV</Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border mb-6">
          {["Overview", "Revenue", "Content", "Affiliates", "Funnels"].map((t) => (
            <button key={t} onClick={() => setTab(t.toLowerCase())} className={cn("text-sm font-medium pb-3 border-b-2 transition-all", tab === t.toLowerCase() ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t}</button>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricCard icon={<DollarSign size={20} />} value="$4,230" label="Affiliate Revenue" trend={{ value: "23%", positive: true }} />
          <MetricCard icon={<Download size={20} />} value="1,847" label="Attributed Installs" trend={{ value: "18%", positive: true }} />
          <MetricCard icon={<TrendingUp size={20} />} value="4.3%" label="Conversion Rate" trend={{ value: "0.5%", positive: true }} />
          <MetricCard icon={<DollarSign size={20} />} value="$12,400" label="Est. LTV (12mo)" trend={{ value: "12%", positive: true }} />
        </div>

        {/* Revenue Attribution Chart */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Revenue Attribution</h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-chart-purple" /> Affiliate</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-chart-green" /> Organic</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-chart-blue" /> Paid Ads</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={360}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="gAffiliate" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient>
                <linearGradient id="gOrganic" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10B981" stopOpacity={0.15} /><stop offset="100%" stopColor="#10B981" stopOpacity={0} /></linearGradient>
                <linearGradient id="gPaid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} /><stop offset="100%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="affiliate" name="Affiliate" stroke="#8B5CF6" strokeWidth={2} fill="url(#gAffiliate)" />
              <Area type="monotone" dataKey="organic" name="Organic" stroke="#10B981" strokeWidth={2} fill="url(#gOrganic)" />
              <Area type="monotone" dataKey="paid" name="Paid Ads" stroke="#3B82F6" strokeWidth={2} fill="url(#gPaid)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-5 gap-6 mb-6">
          <div className="col-span-3">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Revenue by Channel</h2>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={channelData} cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" dataKey="value" paddingAngle={2}>
                    {channelData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 justify-center mt-2">
                {channelData.map((c) => (
                  <span key={c.name} className="flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />{c.name} {c.pct} · ${c.value}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Top Performing Content</h2>
              <div className="space-y-0 divide-y divide-border">
                {topContent.map((c, i) => (
                  <div key={c.title} className="py-3 hover:bg-background-subtle -mx-2 px-2 rounded transition-colors">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-bold text-text-tertiary w-5">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">"{c.title}"</p>
                        <p className="text-xs text-text-secondary">{c.creator} · {c.platform}</p>
                        <p className="text-xs text-text-tertiary mt-0.5">{c.installs} installs · {c.revenue} revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-6 pb-0">
            <h2 className="text-lg font-semibold text-foreground">Affiliate Leaderboard</h2>
            <button className="text-sm text-text-secondary hover:text-foreground">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="bg-background-subtle">
                {["Rank", "Affiliate", "Installs", "Revenue", "CVR"].map((h) => (
                  <th key={h} className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-6">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {leaderboard.map((a) => (
                  <tr key={a.rank} className="border-b border-muted last:border-0 hover:bg-background-subtle transition-colors">
                    <td className="px-6 h-14 text-sm font-bold text-text-tertiary">{a.rank}</td>
                    <td className="px-6 h-14">
                      <div className="text-sm font-medium text-foreground">{a.name}</div>
                      <div className="text-xs text-text-tertiary">{a.handle}</div>
                    </td>
                    <td className="px-6 h-14 text-sm font-medium text-foreground">{a.installs}</td>
                    <td className="px-6 h-14 text-sm font-medium text-foreground">{a.revenue}</td>
                    <td className="px-6 h-14"><BadgeStatus variant={parseFloat(a.cvr) > 5 ? "success" : "neutral"}>{a.cvr}</BadgeStatus></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
