import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import {
  Plus, Users, Download, DollarSign, TrendingUp, Calendar,
  MoreHorizontal, X, MessageCircle, ArrowLeft, ExternalLink, Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const activeAffiliates = [
  { name: "Sarah Chen", handle: "@sarahcreates", platforms: "TikTok, YouTube", initials: "SC", wc: "watercolor-pink", installs: 234, earned: "$890", cvr: "5.2%", campaigns: 2, lastPaid: "Feb 28", joined: "Feb 2", status: "active" as const },
  { name: "Alex Kim", handle: "@techreviewer", platforms: "YouTube", initials: "AK", wc: "watercolor-blue", installs: 189, earned: "$672", cvr: "4.8%", campaigns: 1, lastPaid: "Feb 28", joined: "Jan 15", status: "active" as const },
  { name: "Jordan Lee", handle: "@appjunkie", platforms: "Blog, Twitter", initials: "JL", wc: "watercolor-green", installs: 156, earned: "$445", cvr: "3.9%", campaigns: 2, lastPaid: "Feb 15", joined: "Jan 8", status: "active" as const },
  { name: "Maria Santos", handle: "@fitnesstech", platforms: "TikTok", initials: "MS", wc: "watercolor-yellow", installs: 98, earned: "$333", cvr: "6.1%", campaigns: 1, lastPaid: "Feb 28", joined: "Feb 10", status: "active" as const },
  { name: "David Park", handle: "@davidreviews", platforms: "YouTube, Blog", initials: "DP", wc: "watercolor-purple", installs: 87, earned: "$298", cvr: "4.1%", campaigns: 1, lastPaid: "Feb 15", joined: "Feb 5", status: "active" as const },
  { name: "Priya Patel", handle: "@priyatech", platforms: "Instagram", initials: "PP", wc: "watercolor-blue", installs: 76, earned: "$256", cvr: "3.5%", campaigns: 2, lastPaid: "Feb 28", joined: "Jan 20", status: "active" as const },
  { name: "Jake Wilson", handle: "@jakewilson", platforms: "TikTok", initials: "JW", wc: "watercolor-pink", installs: 65, earned: "$212", cvr: "4.4%", campaigns: 1, lastPaid: "Feb 15", joined: "Feb 12", status: "active" as const },
  { name: "Nina Torres", handle: "@ninacreates", platforms: "YouTube", initials: "NT", wc: "watercolor-green", installs: 54, earned: "$178", cvr: "3.2%", campaigns: 1, lastPaid: "Feb 28", joined: "Feb 18", status: "active" as const },
];

const pendingAffiliates = [
  { email: "alex@reviews.com", time: "2 hours ago", message: "I run a YouTube channel with 45K subscribers focused on productivity apps. I'd love to review MindfulApp.", initials: "AR", wc: "watercolor-yellow" },
  { email: "fitness@influencer.com", time: "5 hours ago", message: "I have 120K followers on TikTok focused on health and wellness. Great fit for MindfulApp!", initials: "FI", wc: "watercolor-purple" },
  { email: "blogwriter@email.com", time: "1 day ago", message: "I write a popular tech blog with 30K monthly readers. Would love to feature your app.", initials: "BW", wc: "watercolor-blue" },
];

const blockedAffiliates = [
  { name: "Spam User", handle: "@user892", platforms: "Unknown", initials: "SU", wc: "watercolor-pink", reason: "Suspicious install pattern", blocked: "Feb 27", status: "blocked" as const },
];

const profileChartData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  earnings: Math.floor(15 + Math.random() * 25 + i * 0.8),
}));

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

const Affiliates = () => {
  const [filter, setFilter] = useState("all");
  const [profileOpen, setProfileOpen] = useState<string | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmails, setInviteEmails] = useState<string[]>(["creator@tiktok.com", "reviewer@youtube.com"]);
  const [emailInput, setEmailInput] = useState("");
  const [copied, setCopied] = useState(false);

  const allCount = activeAffiliates.length + pendingAffiliates.length + blockedAffiliates.length;
  const selectedAffiliate = activeAffiliates.find(a => a.handle === profileOpen);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout activeItem="Affiliates">
      <div className="px-8 py-8 max-w-[1200px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Affiliates</h1>
          <Button onClick={() => setInviteOpen(true)}><Plus size={14} /> Invite Affiliate</Button>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-4 border-b border-border">
            {[
              { value: "all", label: `All (${allCount})` },
              { value: "active", label: `Active (${activeAffiliates.length})` },
              { value: "pending", label: `Pending (${pendingAffiliates.length})` },
              { value: "blocked", label: `Blocked (${blockedAffiliates.length})` },
            ].map((t) => (
              <button key={t.value} onClick={() => setFilter(t.value)} className={cn("text-sm font-medium pb-3 border-b-2 transition-all", filter === t.value ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t.label}</button>
            ))}
          </div>
          <input placeholder="Search affiliates..." className="h-9 w-[280px] px-3 text-sm bg-card border border-border outline-none focus:border-foreground" />
        </div>

        {/* Active affiliate cards */}
        {(filter === "all" || filter === "active") && (
          <div className="space-y-3 mb-4">
            {activeAffiliates.map((a) => (
              <div key={a.handle} className="bg-card border border-border p-5 hover:border-[hsl(var(--border-hover))] transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${a.wc} flex items-center justify-center text-xs font-semibold text-foreground`}>{a.initials}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-foreground">{a.name}</span>
                        <BadgeStatus variant="success" dot>Active</BadgeStatus>
                      </div>
                      <p className="text-sm text-text-secondary">{a.handle} · {a.platforms}</p>
                    </div>
                  </div>
                  <span className="text-xs text-text-tertiary">Joined {a.joined}</span>
                </div>
                <div className="flex gap-6 mt-3 text-[13px]">
                  {[
                    { icon: Download, value: a.installs, label: "installs" },
                    { icon: DollarSign, value: a.earned, label: "earned" },
                    { icon: TrendingUp, value: a.cvr, label: "CVR" },
                    { icon: Calendar, value: a.campaigns, label: "campaigns" },
                  ].map((s) => (
                    <span key={s.label} className="flex items-center gap-1.5"><s.icon size={14} className="text-text-tertiary" /><span className="font-medium text-foreground">{s.value}</span><span className="text-text-secondary">{s.label}</span></span>
                  ))}
                  <span className="text-text-tertiary text-xs flex items-center">Last paid: {a.lastPaid}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Button variant="ghost" size="sm" onClick={() => setProfileOpen(a.handle)}>View Profile →</Button>
                  <Button variant="ghost" size="sm"><MessageCircle size={14} /> Message</Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal size={16} /></Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pending */}
        {(filter === "all" || filter === "pending") && (
          <div className="space-y-3 mb-4">
            {pendingAffiliates.map((a) => (
              <div key={a.email} className="bg-card border border-border border-l-[3px] border-l-warning p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${a.wc} flex items-center justify-center text-xs font-semibold text-foreground`}>{a.initials}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-foreground">{a.email}</span>
                        <BadgeStatus variant="warning">Awaiting Approval</BadgeStatus>
                      </div>
                      <p className="text-sm text-text-tertiary">Applied {a.time}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 ml-[52px] pl-3 border-l-2 border-border">
                  <p className="text-sm text-text-secondary italic">"{a.message}"</p>
                </div>
                <div className="flex items-center gap-2 mt-3 ml-[52px]">
                  <Button size="sm">Approve</Button>
                  <Button variant="destructive" size="sm">Reject</Button>
                  <Button variant="ghost" size="sm">View Application</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blocked */}
        {(filter === "all" || filter === "blocked") && (
          <div className="space-y-3">
            {blockedAffiliates.map((a) => (
              <div key={a.handle} className="bg-card border border-border border-l-[3px] border-l-error p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${a.wc} flex items-center justify-center text-xs font-semibold text-foreground`}>{a.initials}</div>
                    <div>
                      <span className="text-base font-semibold text-foreground">{a.name}</span>
                      <span className="ml-2"><BadgeStatus variant="error">Blocked</BadgeStatus></span>
                      <p className="text-sm text-text-secondary">{a.handle} · {a.reason}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 ml-[52px]">
                  <Button variant="secondary" size="sm">Unblock</Button>
                  <Button variant="destructive" size="sm">Remove</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Slide-Out */}
      {selectedAffiliate && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setProfileOpen(null)} />
          <div className="fixed right-0 top-0 h-full w-[560px] bg-card border-l border-border shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <button onClick={() => setProfileOpen(null)} className="text-sm text-text-secondary hover:text-foreground flex items-center gap-1"><ArrowLeft size={16} /> Back</button>
              <button onClick={() => setProfileOpen(null)} className="text-text-tertiary hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="px-6 py-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full ${selectedAffiliate.wc} flex items-center justify-center text-lg font-semibold text-foreground`}>{selectedAffiliate.initials}</div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{selectedAffiliate.name}</h2>
                  <p className="text-sm text-text-secondary">{selectedAffiliate.handle}</p>
                  <p className="text-sm text-text-tertiary">{selectedAffiliate.platforms} · <span className="text-success">● Active</span></p>
                  <p className="text-xs text-text-tertiary mt-1">Joined {selectedAffiliate.joined}, 2026</p>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <Button variant="secondary" size="sm"><MessageCircle size={14} /> Message</Button>
                <Button variant="secondary" size="sm">Edit Commission</Button>
                <Button variant="ghost" size="sm"><MoreHorizontal size={14} /></Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { value: selectedAffiliate.installs, label: "Installs", trend: "▲ 18%" },
                  { value: selectedAffiliate.earned, label: "Revenue", trend: "▲ 23%" },
                  { value: selectedAffiliate.cvr, label: "Conv Rate", trend: "" },
                  { value: "$3.80", label: "Avg Rev/Install", trend: "" },
                ].map((s) => (
                  <div key={s.label} className="bg-background-subtle p-4">
                    <div className="text-xl font-semibold text-foreground">{s.value}</div>
                    <div className="text-xs text-text-secondary">{s.label}</div>
                    {s.trend && <div className="text-xs text-success mt-1">{s.trend}</div>}
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Earnings (30 days)</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={profileChartData}>
                    <defs><linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.15} /><stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} /></linearGradient></defs>
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#B0B0B0" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "#B0B0B0" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="earnings" stroke="#8B5CF6" strokeWidth={2} fill="url(#profGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Active Campaigns */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Active Campaigns ({selectedAffiliate.campaigns})</h3>
                <div className="border border-border divide-y divide-border">
                  <div className="p-4 flex items-center justify-between">
                    <div><div className="text-sm font-medium text-foreground">TikTok Q1 Push</div><div className="text-xs text-text-secondary">178 installs · $623 earned</div></div>
                    <span className="text-xs text-text-tertiary">30% rev share</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div><div className="text-sm font-medium text-foreground">YouTube Reviews</div><div className="text-xs text-text-secondary">56 installs · $267 earned</div></div>
                    <span className="text-xs text-text-tertiary">30% rev share</span>
                  </div>
                </div>
              </div>

              {/* Top Content */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Top Content</h3>
                <div className="border border-border divide-y divide-border">
                  {[
                    { title: "5 Apps That Changed My...", platform: "TikTok", views: "245K", revenue: "$890" },
                    { title: "Morning Routine with...", platform: "TikTok", views: "89K", revenue: "$334" },
                  ].map((c) => (
                    <div key={c.title} className="p-4">
                      <div className="text-sm font-medium text-foreground">"{c.title}"</div>
                      <div className="text-xs text-text-secondary mt-1">{c.platform} · {c.views} views · {c.revenue}</div>
                      <button className="text-xs text-text-tertiary hover:text-foreground mt-1 flex items-center gap-1">View on {c.platform} <ExternalLink size={10} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payout History */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">Payout History</h3>
                  <button className="text-xs text-text-secondary hover:text-foreground">View All →</button>
                </div>
                <div className="border border-border divide-y divide-border">
                  {[
                    { date: "Feb 28", amount: "$156.00", status: "Paid" },
                    { date: "Feb 15", amount: "$134.00", status: "Paid" },
                    { date: "Jan 31", amount: "$98.00", status: "Paid" },
                  ].map((p) => (
                    <div key={p.date} className="p-3 flex items-center justify-between text-sm">
                      <span className="text-text-secondary">{p.date}</span>
                      <span className="font-medium text-foreground">{p.amount}</span>
                      <BadgeStatus variant="success">{p.status}</BadgeStatus>
                      <span className="text-xs text-text-tertiary">Stripe</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Invite Modal */}
      {inviteOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setInviteOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border p-6 shadow-lg z-50 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">Invite Affiliates</h2>
              <button onClick={() => setInviteOpen(false)} className="text-text-tertiary hover:text-foreground"><X size={18} /></button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-1.5">Invite by Email</label>
              <div className="flex gap-2">
                <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="Enter email address" className="flex-1 h-10 px-3 text-sm bg-card border border-border outline-none focus:border-foreground" onKeyDown={(e) => { if (e.key === "Enter" && emailInput) { setInviteEmails([...inviteEmails, emailInput]); setEmailInput(""); }}} />
                <Button variant="secondary" size="sm" className="h-10" onClick={() => { if (emailInput) { setInviteEmails([...inviteEmails, emailInput]); setEmailInput(""); } }}>+ Add</Button>
              </div>
              {inviteEmails.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-text-tertiary">Added ({inviteEmails.length}):</p>
                  {inviteEmails.map((email) => (
                    <div key={email} className="flex items-center justify-between bg-background-subtle rounded-full px-3 h-7 text-sm">
                      <span className="text-foreground">{email}</span>
                      <button onClick={() => setInviteEmails(inviteEmails.filter(e => e !== email))} className="text-text-tertiary hover:text-foreground"><X size={12} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-1.5">Personal Message (optional)</label>
              <textarea placeholder="Hey! We'd love to have you promote MindfulApp..." rows={3} className="w-full px-3 py-2 text-sm bg-card border border-border outline-none resize-y" />
            </div>

            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-text-tertiary">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-1.5">Share your program link:</label>
              <div className="flex items-center gap-2 bg-background-subtle px-3 py-2">
                <span className="font-mono text-sm text-foreground flex-1 truncate">https://komisi.io/join/mindfulapp</span>
                <Button variant="ghost" size="sm" onClick={() => handleCopy("https://komisi.io/join/mindfulapp")}>
                  {copied ? "Copied!" : <><Copy size={14} /> Copy</>}
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setInviteOpen(false)}>Cancel</Button>
              <Button>Send Invitations →</Button>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Affiliates;