import React from "react";
import { SectionHeader } from "@/pages/Index";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const areaData = [
  { month: "Jan", revenue: 2400 }, { month: "Feb", revenue: 3600 }, { month: "Mar", revenue: 4200 },
  { month: "Apr", revenue: 3800 }, { month: "May", revenue: 5100 }, { month: "Jun", revenue: 6400 },
  { month: "Jul", revenue: 7200 },
];

const barData = [
  { day: "Mon", installs: 120 }, { day: "Tue", installs: 190 }, { day: "Wed", installs: 150 },
  { day: "Thu", installs: 220 }, { day: "Fri", installs: 280 }, { day: "Sat", installs: 310 },
  { day: "Sun", installs: 240 },
];

const donutData = [
  { name: "TikTok", value: 40 }, { name: "YouTube", value: 30 },
  { name: "Instagram", value: 20 }, { name: "Blog", value: 10 },
];
const DONUT_COLORS = ["#8B5CF6", "#EC4899", "#3B82F6", "#10B981"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card rounded-lg shadow-lg border border-border p-3 text-sm">
      <p className="font-medium text-foreground">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-text-secondary">{p.name}: {typeof p.value === "number" && p.name?.includes("revenue") ? `$${p.value}` : p.value}</p>
      ))}
    </div>
  );
};

export const ChartsSection = () => (
  <div>
    <SectionHeader title="Charts" desc="Area, bar, and donut charts styled for the Komisi design system." />
    <div className="space-y-8">
      {/* Area Chart */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Revenue Over Time</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={areaData}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} fill="url(#areaGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Installs by Day</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="installs" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Channel Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={donutData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                {donutData.map((_, i) => (
                  <Cell key={i} fill={DONUT_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {donutData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1 text-xs text-text-secondary">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DONUT_COLORS[i] }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
