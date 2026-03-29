import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { DollarSign, Calendar, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

const earningsChartData = [
  ...Array.from({ length: 10 }, (_, i) => ({ month: `Jan ${i * 3 + 1}`, earnings: Math.floor(20 + Math.random() * 15 + i * 2) })),
  ...Array.from({ length: 10 }, (_, i) => ({ month: `Feb ${i * 3 + 1}`, earnings: Math.floor(35 + Math.random() * 15 + i * 3) })),
  ...Array.from({ length: 10 }, (_, i) => ({ month: `Mar ${i * 3 + 1}`, earnings: Math.floor(45 + Math.random() * 20 + i * 2) })),
];

const earningsByApp = [
  { app: "MindfulApp", installs: 234, revenue: "$2,100", commission: "$630", status: "$178 due", initial: "M" },
  { app: "FocusTimer", installs: 89, revenue: "$445", commission: "$89", status: "$89 due", initial: "F" },
  { app: "DailyYoga", installs: 56, revenue: "$340", commission: "$85", status: "Paid", initial: "D" },
];

const transactions = [
  { date: "Mar 4", app: "MindfulApp", type: "Renewal", typeVariant: "neutral" as const, amount: "+$0.60", amountColor: "text-success", status: "Attributed" },
  { date: "Mar 3", app: "FocusTimer", type: "New Install", typeVariant: "info" as const, amount: "+$5.00", amountColor: "text-success", status: "Attributed" },
  { date: "Mar 2", app: "MindfulApp", type: "New Subscription", typeVariant: "success" as const, amount: "+$3.00", amountColor: "text-success", status: "Attributed" },
  { date: "Mar 1", app: "MindfulApp", type: "Renewal", typeVariant: "neutral" as const, amount: "+$0.60", amountColor: "text-success", status: "Attributed" },
  { date: "Feb 28", app: "—", type: "PAYOUT", typeVariant: "active" as const, amount: "-$156.00", amountColor: "text-chart-purple", status: "Sent" },
  { date: "Feb 27", app: "DailyYoga", type: "New Subscription", typeVariant: "success" as const, amount: "+$2.50", amountColor: "text-success", status: "Attributed" },
  { date: "Feb 26", app: "MindfulApp", type: "Refund", typeVariant: "error" as const, amount: "-$3.00", amountColor: "text-error", status: "Reversed" },
];

const invoices = [
  { month: "March 2026", amount: "$890.00", status: "Pending", action: "Preview" },
  { month: "February 2026", amount: "$156.00", status: "Paid", action: "Download PDF" },
  { month: "January 2026", amount: "$98.00", status: "Paid", action: "Download PDF" },
];

const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card shadow-lg border border-border p-3 text-[13px]">
      <p className="font-medium text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' && p.name.toLowerCase().includes('revenue') ? `$${p.value}` : p.value}</p>
      ))}
    </div>
  );
};

const CreatorEarnings = () => {
  const [tab, setTab] = useState("overview");
  const [txPage, setTxPage] = useState(1);

  return (
    <DashboardLayout activeItem="My Earnings" userType="creator">
      <div className="px-8 py-8 max-w-[1200px]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">My Earnings</h1>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm"><Calendar size={14} /> Last 90 days</Button>
            <Button variant="secondary" size="sm"><Download size={14} /> Export</Button>
          </div>
        </div>

        <div className="flex gap-4 border-b border-border mb-8">
          {["Overview", "Transactions", "Invoices"].map((t) => (
            <button key={t} onClick={() => setTab(t.toLowerCase())} className={cn("text-sm font-medium pb-3 border-b-2 transition-all", tab === t.toLowerCase() ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t}</button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            {/* Metrics Strip */}
            <div className="bg-card border border-border mb-8">
              <div className="grid grid-cols-4 divide-x divide-border">
                {[
                  { icon: <DollarSign size={18} />, value: "$3,562", label: "Total Earned" },
                  { icon: <DollarSign size={18} />, value: "$2,672", label: "Paid Out" },
                  { icon: <DollarSign size={18} />, value: "$890", label: "Pending" },
                  { icon: <Calendar size={18} />, value: "Mar 15", label: "Next Payout" },
                ].map((m) => (
                  <div key={m.label} className="px-5 py-5">
                    <div className="flex items-center gap-2 text-text-tertiary mb-3">
                      {m.icon}
                      <span className="text-[13px] text-text-secondary">{m.label}</span>
                    </div>
                    <span className="text-[28px] font-semibold text-foreground tracking-tight leading-none tabular-nums">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border p-6 pb-4 mb-8">
              <h2 className="text-base font-semibold text-foreground mb-6">Earnings Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={earningsChartData}>
                  <defs><linearGradient id="eGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient></defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#B0B0B0" }} axisLine={false} tickLine={false} interval={5} />
                  <YAxis tick={{ fontSize: 10, fill: "#B0B0B0" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <ReferenceLine y={40} stroke="#B0B0B0" strokeDasharray="4 4" label={{ value: "Avg", position: "right", fontSize: 10, fill: "#B0B0B0" }} />
                  <Area type="monotone" dataKey="earnings" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#eGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border overflow-hidden">
              <div className="p-6 pb-3"><h2 className="text-base font-semibold text-foreground">Earnings by App</h2></div>
              <table className="w-full">
                <thead><tr className="border-b border-border">
                  {["App", "Installs", "Revenue Generated", "Your Commission", "Status"].map(h => (
                    <th key={h} className="text-left text-[11px] uppercase tracking-[0.08em] font-medium text-text-tertiary h-10 px-6">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {earningsByApp.map(a => (
                    <tr key={a.app} className="border-b border-muted last:border-0">
                      <td className="px-6 h-[52px] flex items-center gap-2">
                        <span className="w-8 h-8 bg-muted flex items-center justify-center text-xs font-medium text-text-secondary">{a.initial}</span>
                        <span className="text-sm font-medium text-foreground">{a.app}</span>
                      </td>
                      <td className="px-6 h-[52px] text-sm text-foreground">{a.installs}</td>
                      <td className="px-6 h-[52px] text-sm text-foreground">{a.revenue}</td>
                      <td className="px-6 h-[52px] text-sm font-semibold text-foreground">{a.commission}</td>
                      <td className="px-6 h-[52px]"><BadgeStatus variant={a.status === "Paid" ? "success" : "warning"}>{a.status}</BadgeStatus></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "transactions" && (
          <div className="bg-card border border-border overflow-hidden">
            <table className="w-full">
              <thead><tr className="border-b border-border">
                {["Date", "App", "Type", "Amount", "Status"].map(h => (
                  <th key={h} className="text-left text-[11px] uppercase tracking-[0.08em] font-medium text-text-tertiary h-10 px-6">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} className="border-b border-muted last:border-0 hover:bg-background-subtle transition-colors">
                    <td className="px-6 h-[52px] text-sm text-text-secondary">{t.date}</td>
                    <td className="px-6 h-[52px] text-sm text-foreground">{t.app}</td>
                    <td className="px-6 h-[52px]"><BadgeStatus variant={t.typeVariant}>{t.type}</BadgeStatus></td>
                    <td className={cn("px-6 h-[52px] text-sm font-medium", t.amountColor)}>{t.amount}</td>
                    <td className="px-6 h-[52px] text-sm text-text-secondary">{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-6 py-3 border-t border-border">
              <span className="text-xs text-text-secondary">Showing 1–7 of 47 transactions</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft size={14} /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight size={14} /></Button>
              </div>
            </div>
          </div>
        )}

        {tab === "invoices" && (
          <div className="bg-card border border-border divide-y divide-border">
            {invoices.map(inv => (
              <div key={inv.month} className="p-5 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground">{inv.month} {inv.status === "Pending" && <BadgeStatus variant="warning" className="ml-2">Pending</BadgeStatus>}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-foreground">{inv.amount}</span>
                  <Button variant="ghost" size="sm">{inv.action}</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreatorEarnings;