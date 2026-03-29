import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [payoutSchedule, setPayoutSchedule] = useState("monthly");
  const [minThreshold, setMinThreshold] = useState("25.00");
  const [autoProcess, setAutoProcess] = useState(false);
  const [payoutMethod, setPayoutMethod] = useState("stripe");
  const [holdPeriod, setHoldPeriod] = useState("none");

  return (
    <DashboardLayout activeItem="Payouts">
      <div className="px-8 py-8 max-w-[1200px]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Payouts</h1>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setSettingsOpen(true)}>Payout Settings</Button>
            <Button variant="secondary" size="sm"><Download size={14} /> Export</Button>
          </div>
        </div>

        <div className="flex gap-4 border-b border-border mb-8">
          {["Overview", "Transactions", "Upcoming", "Tax Documents"].map((t) => (
            <button key={t} onClick={() => setTab(t.toLowerCase())} className={cn("text-sm font-medium pb-3 border-b-2 transition-all", tab === t.toLowerCase() ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t}</button>
          ))}
        </div>

        {/* Metrics Strip */}
        <div className="bg-card border border-border mb-8">
          <div className="grid grid-cols-4 divide-x divide-border">
            {[
              { icon: <DollarSign size={18} />, value: "$3,450", label: "Total Earned", trend: null },
              { icon: <DollarSign size={18} />, value: "$1,230", label: "Paid This Month", trend: "15%" },
              { icon: <DollarSign size={18} />, value: "$890", label: "Upcoming Payouts", trend: null },
              { icon: <Users size={18} />, value: "8", label: "Affiliates Enrolled", trend: null },
            ].map((m) => (
              <div key={m.label} className="px-5 py-5">
                <div className="flex items-center gap-2 text-text-tertiary mb-3">
                  {m.icon}
                  <span className="text-[13px] text-text-secondary">{m.label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[28px] font-semibold text-foreground tracking-tight leading-none tabular-nums">{m.value}</span>
                  {m.trend && <span className="text-xs font-medium text-success">↑ {m.trend}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Payouts */}
        <div className="bg-card border border-border overflow-hidden mb-8">
          <div className="flex items-center justify-between p-6 pb-3">
            <h2 className="text-base font-semibold text-foreground">Upcoming Payouts</h2>
            <span className="text-sm text-text-secondary">Next payout: March 15, 2026</span>
          </div>
          <table className="w-full">
            <thead><tr className="border-b border-border">
              {["Affiliate", "Earned This Cycle", "Commission Rate", "Net Payout", "Status"].map((h) => (
                <th key={h} className="text-left text-[11px] uppercase tracking-[0.08em] font-medium text-text-tertiary h-10 px-6">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {upcomingPayouts.map((p) => (
                <tr key={p.name} className="border-b border-muted last:border-0">
                  <td className="px-6 h-[52px] text-sm font-medium text-foreground">{p.name}</td>
                  <td className="px-6 h-[52px] text-sm text-foreground">{p.earned}</td>
                  <td className="px-6 h-[52px] text-sm text-text-secondary">{p.rate}</td>
                  <td className="px-6 h-[52px] text-sm font-semibold text-foreground">{p.net}</td>
                  <td className="px-6 h-[52px]"><BadgeStatus variant="warning">Pending</BadgeStatus></td>
                </tr>
              ))}
              <tr className="border-t-2 border-border">
                <td className="px-6 h-12 text-sm font-semibold text-foreground" colSpan={3}>Total upcoming</td>
                <td className="px-6 h-12 text-sm font-semibold text-foreground">$468.00</td>
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
        <div className="bg-card border border-border overflow-hidden">
          <div className="flex items-center justify-between p-6 pb-3">
            <h2 className="text-base font-semibold text-foreground">Recent Transactions</h2>
            <button className="text-sm text-text-secondary hover:text-foreground">View All →</button>
          </div>
          <table className="w-full">
            <thead><tr className="border-b border-border">
              {["Date", "Affiliate", "Amount", "Status", "Method"].map((h) => (
                <th key={h} className="text-left text-[11px] uppercase tracking-[0.08em] font-medium text-text-tertiary h-10 px-6">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {recentTx.map((t, i) => (
                <tr key={i} className="border-b border-muted last:border-0 hover:bg-background-subtle transition-colors">
                  <td className="px-6 h-[52px] text-sm text-text-secondary">{t.date}</td>
                  <td className="px-6 h-[52px] text-sm font-medium text-foreground">{t.affiliate}</td>
                  <td className="px-6 h-[52px] text-sm font-medium text-foreground">{t.amount}</td>
                  <td className="px-6 h-[52px]"><BadgeStatus variant="success">{t.status}</BadgeStatus></td>
                  <td className="px-6 h-[52px] text-sm text-text-secondary">{t.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Confirm Modal */}
      {confirmOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setConfirmOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border p-6 shadow-lg z-50 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">Process All Payouts?</h2>
              <button onClick={() => setConfirmOpen(false)} className="text-text-tertiary hover:text-foreground"><X size={18} /></button>
            </div>
            <p className="text-sm text-text-secondary mb-4">You're about to send $468.00 to 4 affiliates via Stripe Connect. This action cannot be undone.</p>
            <div className="bg-background-subtle p-3 mb-4 space-y-1 text-sm">
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

      {/* Payout Settings Modal */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Payout Settings</DialogTitle>
            <DialogDescription>Configure how and when affiliate payouts are processed.</DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div className="space-y-1.5">
              <Label>Payout Schedule</Label>
              <ChipSelector
                options={[
                  { label: "Monthly (15th)", value: "monthly" },
                  { label: "Bi-weekly", value: "biweekly" },
                  { label: "Weekly", value: "weekly" },
                ]}
                value={payoutSchedule}
                onChange={setPayoutSchedule}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Minimum Payout Threshold</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm">$</span>
                <Input className="pl-7" value={minThreshold} onChange={(e) => setMinThreshold(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Process Payouts</Label>
                <p className="text-xs text-text-tertiary mt-0.5">Automatically process payouts on schedule without manual approval</p>
              </div>
              <Switch checked={autoProcess} onCheckedChange={setAutoProcess} />
            </div>
            <div className="space-y-1.5">
              <Label>Default Payout Method</Label>
              <ChipSelector
                options={[
                  { label: "Stripe Connect", value: "stripe" },
                  { label: "PayPal", value: "paypal" },
                  { label: "Wise", value: "wise" },
                ]}
                value={payoutMethod}
                onChange={setPayoutMethod}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Hold Period</Label>
              <Select value={holdPeriod} onValueChange={setHoldPeriod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="24h">24 hours</SelectItem>
                  <SelectItem value="48h">48 hours</SelectItem>
                  <SelectItem value="7d">7 days</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-text-tertiary">Hold payouts for review before processing</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setSettingsOpen(false)}>Cancel</Button>
            <Button onClick={() => setSettingsOpen(false)}>Save Settings →</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Payouts;