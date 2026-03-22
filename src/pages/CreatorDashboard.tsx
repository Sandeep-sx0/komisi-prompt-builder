import React from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { MetricCard } from "@/components/komisi/Cards";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import {
  DollarSign, Clock, Download, Smartphone, ChevronDown, Calendar,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const earningsData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  revenue: Math.floor(30 + Math.random() * 15 + i * 1),
  installs: Math.floor(8 + Math.random() * 8 + i * 0.3),
}));

const programs = [
  { name: "MindfulApp", category: "Health & Fitness", commission: "30% rev share", earned: "$890", status: "active" },
  { name: "FocusTimer", category: "Productivity", commission: "$5/install", earned: "$445", status: "active" },
  { name: "DailyYoga", category: "Health & Fitness", commission: "25% rev share", earned: "$227", status: "active" },
];

const topContent = [
  { title: "5 Apps That Changed My...", platform: "TikTok", views: "245K", revenue: "$890" },
  { title: "MindfulApp Full Review", platform: "YouTube", views: "89K", revenue: "$672" },
];

const CreatorDashboard = () => {
  return (
    <DashboardLayout activeItem="Dashboard" userType="creator">
      <div className="px-8 py-6 max-w-[1200px]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tighter text-foreground">Welcome back, Sarah 👋</h1>
          <Button variant="secondary" size="sm"><Calendar size={14} /> Last 30 days <ChevronDown size={14} /></Button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricCard icon={<DollarSign size={20} />} value="$1,562" label="Total Earned" trend={{ value: "34%", positive: true }} />
          <MetricCard icon={<Clock size={20} />} value="$890" label="Pending Payout" />
          <MetricCard icon={<Download size={20} />} value="423" label="Installs Driven" trend={{ value: "22%", positive: true }} />
          <MetricCard icon={<Smartphone size={20} />} value="3" label="Active Programs" />
        </div>

        {/* Earnings chart */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">My Earnings</h2>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-chart-purple" /> Revenue</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-chart-blue" /> Installs</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="cRev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
              <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} fill="url(#cRev)" />
              <Area type="monotone" dataKey="installs" stroke="#3B82F6" strokeWidth={1.5} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-5 gap-6 mb-6">
          <div className="col-span-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">Active Programs</h2>
              <button className="text-sm text-text-secondary hover:text-foreground">View All →</button>
            </div>
            <div className="bg-card border border-border rounded-xl divide-y divide-border">
              {programs.map((p) => (
                <div key={p.name} className="p-4 flex items-center justify-between hover:bg-background-subtle transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-background-subtle flex items-center justify-center text-sm font-bold text-text-secondary">{p.name[0]}</div>
                    <div><div className="text-sm font-medium text-foreground">{p.name}</div><div className="text-xs text-text-secondary">{p.category}</div></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-text-secondary">{p.commission}</span>
                    <span className="text-sm font-semibold text-foreground">{p.earned}</span>
                    <BadgeStatus variant="success" dot>Active</BadgeStatus>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">Top Content This Month</h2>
              <button className="text-sm text-text-secondary hover:text-foreground">View All →</button>
            </div>
            <div className="bg-card border border-border rounded-xl divide-y divide-border">
              {topContent.map((c) => (
                <div key={c.title} className="p-4">
                  <div className="text-sm font-medium text-foreground">🎬 "{c.title}"</div>
                  <div className="text-xs text-text-secondary mt-1">{c.platform} · {c.views} views · {c.revenue} revenue</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Payout */}
        <div className="bg-card border border-border rounded-xl p-5 border-l-[3px] border-l-transparent" style={{ borderImage: "linear-gradient(135deg, #A78BFA, #EC4899, #F59E0B) 1", borderImageSlice: "0 0 0 3" }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-foreground">💰 Next Payout: $890</div>
              <div className="text-sm text-text-secondary">Via Stripe Connect to •••• 4242</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-text-secondary">March 15, 2026</span>
              <Button variant="ghost" size="sm">View Earnings Details →</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatorDashboard;
