import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { MetricCard } from "@/components/komisi/Cards";
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
  { app: "MindfulApp", installs: 234, revenue: "$2,100", commission: "$630", status: "$178 due", icon: "🧘" },
  { app: "FocusTimer", installs: 89, revenue: "$445", commission: "$89", status: "$89 due", icon: "⏱" },
  { app: "DailyYoga", installs: 56, revenue: "$340", commission: "$85", status: "Paid", icon: "🧘‍♀️" },
];

const transactions = [
  { date: "Mar 4", app: "MindfulApp", type: "Renewal", typeVariant: "neutral" as const, amount: "+$0.60", amountColor: "text-success", status: "✅ Attributed" },
  { date: "Mar 3", app: "FocusTimer", type: "New Install", typeVariant: "info" as const, amount: "+$5.00", amountColor: "text-success", status: "✅ Attributed" },
  { date: "Mar 2", app: "MindfulApp", type: "New Subscription", typeVariant: "success" as const, amount: "+$3.00", amountColor: "text-success", status: "✅ Attributed" },
  { date: "Mar 1", app: "MindfulApp", type: "Renewal", typeVariant: "neutral" as const, amount: "+$0.60", amountColor: "text-success", status: "✅ Attributed" },
  { date: "Feb 28", app: "—", type: "PAYOUT", typeVariant: "active" as const, amount: "-$156.00", amountColor: "text-chart-purple", status: "💰 Sent" },
  { date: "Feb 27", app: "DailyYoga", type: "New Subscription", typeVariant: "success" as const, amount: "+$2.50", amountColor: "text-success", status: "✅ Attributed" },
  { date: "Feb 26", app: "MindfulApp", type: "Refund", typeVariant: "error" as const, amount: "-$3.00", amountColor: "text-error", status: "↩️ Reversed" },
];

const invoices = [
  { month: "March 2026", amount: "$890.00", status: "Pending", action: "Preview" },
  { month: "February 2026", amount: "$156.00", status: "Paid", action: "Download PDF" },
  { month: "January 2026", amount: "$98.00", status: "Paid", action: "Download PDF" },
];

const CreatorEarnings = () => {
  const [tab, setTab] = useState("overview");
  const [txPage, setTxPage] = useState(1);

  return (
    <DashboardLayout activeItem="My Earnings" userType="creator">
      <div className="px-8 py-6 max-w-[1200px]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tighter text-foreground">My Earnings</h1>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm"><Calendar size={14} /> Last 90 days</Button>
            <Button variant="secondary" size="sm"><Download size={14} /> Export</Button>
          </div>
        </div>

        <div className="flex gap-4 border-b border-border mb-6">
          {["Overview", "Transactions", "Invoices"].map((t) => (
            <button key={t} onClick={() => setTab(t.toLowerCase())} className={cn("text-sm font-medium pb-3 border-b-2 transition-all", tab === t.toLowerCase() ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t}</button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <MetricCard icon={<DollarSign size={20} />} value="$3,562" label="Total Earned" />
              <MetricCard icon={<DollarSign size={20} />} value="$2,672" label="Paid Out" />
              <MetricCard icon={<DollarSign size={20} />} value="$890" label="Pending" />
              <MetricCard icon={<Calendar size={20} />} value="Mar 15" label="Next Payout" />
            </div>

            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Earnings Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={earningsChartData}>
                  <defs><linearGradient id="eGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient></defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} interval={5} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
                  <ReferenceLine y={40} stroke="#94A3B8" strokeDasharray="4 4" label={{ value: "Avg", position: "right", fontSize: 10, fill: "#94A3B8" }} />
                  <Area type="monotone" dataKey="earnings" stroke="#8B5CF6" strokeWidth={2} fill="url(#eGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-6 pb-3"><h2 className="text-lg font-semibold text-foreground">Earnings by App</h2></div>
              <table className="w-full">
                <thead><tr className="bg-background-subtle">
                  {["App", "Installs", "Revenue Generated", "Your Commission", "Status"].map(h => (
                    <th key={h} className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-6">{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {earningsByApp.map(a => (
                    <tr key={a.app} className="border-b border-muted last:border-0">
                      <td className="px-6 h-14 flex items-center gap-2"><span className="text-xl">{a.icon}</span><span className="text-sm font-medium text-foreground">{a.app}</span></td>
                      <td className="px-6 h-14 text-sm text-foreground">{a.installs}</td>
                      <td className="px-6 h-14 text-sm text-foreground">{a.revenue}</td>
                      <td className="px-6 h-14 text-sm font-semibold text-foreground">{a.commission}</td>
                      <td className="px-6 h-14"><BadgeStatus variant={a.status === "Paid" ? "success" : "warning"}>{a.status}</BadgeStatus></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "transactions" && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead><tr className="bg-background-subtle">
                {["Date", "App", "Type", "Amount", "Status"].map(h => (
                  <th key={h} className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-6">{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i} className="border-b border-muted last:border-0 hover:bg-background-subtle transition-colors">
                    <td className="px-6 h-14 text-sm text-text-secondary">{t.date}</td>
                    <td className="px-6 h-14 text-sm text-foreground">{t.app}</td>
                    <td className="px-6 h-14"><BadgeStatus variant={t.typeVariant}>{t.type}</BadgeStatus></td>
                    <td className={cn("px-6 h-14 text-sm font-medium", t.amountColor)}>{t.amount}</td>
                    <td className="px-6 h-14 text-sm text-text-secondary">{t.status}</td>
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
          <div className="bg-card border border-border rounded-xl divide-y divide-border">
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
