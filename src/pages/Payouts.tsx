import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { MetricCard } from "@/components/komisi/Cards";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { DollarSign, Users, Download, X } from "lucide-react";
import { cn } from "@/lib/utils";

const upcomingPayouts = [
  { name: "@sarahcreates", earned: "$890", rate: "20%", net: "$178", status: "pending" },
  { name: "@techreviewer", earned: "$672", rate: "20%", net: "$134", status: "pending" },
  { name: "@appjunkie", earned: "$445", rate: "20%", net: "$89", status: "pending" },
  { name: "@fitnesstech", earned: "$333", rate: "20%", net: "$67", status: "pending" },
];

const recentTx = [
  { date: "Feb 28", affiliate: "@sarahcreates", amount: "$156.00", status: "Paid", method: "Stripe Connect" },
  { date: "Feb 28", affiliate: "@techreviewer", amount: "$112.00", status: "Paid", method: "Stripe Connect" },
  { date: "Feb 15", affiliate: "@sarahcreates", amount: "$134.00", status: "Paid", method: "Stripe Connect" },
  { date: "Feb 15", affiliate: "@appjunkie", amount: "$78.00", status: "Paid", method: "Stripe Connect" },
  { date: "Feb 1", affiliate: "@sarahcreates", amount: "$98.00", status: "Paid", method: "Stripe Connect" },
];

const Payouts = () => {
  const [tab, setTab] = useState("overview");
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <DashboardLayout activeItem="Payouts">
      <div className="px-8 py-6 max-w-[1200px]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tighter text-foreground">Payouts</h1>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">⚙ Payout Settings</Button>
            <Button variant="secondary" size="sm"><Download size={14} /> Export</Button>
          </div>
        </div>

        <div className="flex gap-4 border-b border-border mb-6">
          {["Overview", "Transactions", "Upcoming", "Tax Documents"].map((t) => (
            <button key={t} onClick={() => setTab(t.toLowerCase())} className={cn("text-sm font-medium pb-3 border-b-2 transition-all", tab === t.toLowerCase() ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t}</button>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricCard icon={<DollarSign size={20} />} value="$3,450" label="Total Earned" />
          <MetricCard icon={<DollarSign size={20} />} value="$1,230" label="Paid This Month" trend={{ value: "15%", positive: true }} />
          <MetricCard icon={<DollarSign size={20} />} value="$890" label="Upcoming Payouts" />
          <MetricCard icon={<Users size={20} />} value="8" label="Affiliates Enrolled" />
        </div>

        {/* Upcoming Payouts */}
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
          <div className="flex items-center justify-between p-6 pb-3">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Payouts</h2>
            <span className="text-sm text-text-secondary">Next payout: March 15, 2026</span>
          </div>
          <table className="w-full">
            <thead><tr className="bg-background-subtle">
              {["Affiliate", "Earned This Cycle", "Commission Rate", "Net Payout", "Status"].map((h) => (
                <th key={h} className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-6">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {upcomingPayouts.map((p) => (
                <tr key={p.name} className="border-b border-muted last:border-0">
                  <td className="px-6 h-14 text-sm font-medium text-foreground">{p.name}</td>
                  <td className="px-6 h-14 text-sm text-foreground">{p.earned}</td>
                  <td className="px-6 h-14 text-sm text-text-secondary">{p.rate}</td>
                  <td className="px-6 h-14 text-sm font-semibold text-foreground">{p.net}</td>
                  <td className="px-6 h-14"><BadgeStatus variant="warning">○ Pending</BadgeStatus></td>
                </tr>
              ))}
              <tr className="bg-background-subtle">
                <td className="px-6 h-12 text-sm font-semibold text-foreground" colSpan={3}>Total upcoming</td>
                <td className="px-6 h-12 text-sm font-bold text-foreground">$468.00</td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="p-6 pt-4 flex gap-2">
            <Button onClick={() => setConfirmOpen(true)}>Process All Payouts →</Button>
            <Button variant="secondary">Review Individual Payouts</Button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-6 pb-3">
            <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
            <button className="text-sm text-text-secondary hover:text-foreground">View All →</button>
          </div>
          <table className="w-full">
            <thead><tr className="bg-background-subtle">
              {["Date", "Affiliate", "Amount", "Status", "Method"].map((h) => (
                <th key={h} className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-6">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {recentTx.map((t, i) => (
                <tr key={i} className="border-b border-muted last:border-0 hover:bg-background-subtle transition-colors">
                  <td className="px-6 h-14 text-sm text-text-secondary">{t.date}</td>
                  <td className="px-6 h-14 text-sm font-medium text-foreground">{t.affiliate}</td>
                  <td className="px-6 h-14 text-sm font-medium text-foreground">{t.amount}</td>
                  <td className="px-6 h-14"><BadgeStatus variant="success">✅ {t.status}</BadgeStatus></td>
                  <td className="px-6 h-14 text-sm text-text-secondary">{t.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Modal */}
      {confirmOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setConfirmOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-lg z-50 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Process All Payouts?</h2>
              <button onClick={() => setConfirmOpen(false)} className="text-text-tertiary hover:text-foreground"><X size={18} /></button>
            </div>
            <p className="text-sm text-text-secondary mb-4">You're about to send $468.00 to 4 affiliates via Stripe Connect. This action cannot be undone.</p>
            <div className="bg-background-subtle rounded-lg p-3 mb-4 space-y-1 text-sm">
              {upcomingPayouts.map(p => <div key={p.name} className="flex justify-between"><span className="text-text-secondary">{p.name}</span><span className="font-medium text-foreground">{p.net}</span></div>)}
              <div className="border-t border-border pt-1 mt-1 flex justify-between font-semibold"><span>Total</span><span>$468.00</span></div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
              <Button onClick={() => setConfirmOpen(false)}>Process Payouts →</Button>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Payouts;
