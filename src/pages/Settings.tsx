import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Eye, Copy, X, Lock, Camera, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const integrations = {
  revenue: [
    { name: "RevenueCat", desc: "Webhook active · Last event: 2m ago", connected: true },
    { name: "Adapty", desc: "Connect for IAP tracking", connected: false },
    { name: "Stripe Connect", desc: "Payout account active", connected: true },
    { name: "Direct Store APIs", desc: "Connect to Apple/Google directly", connected: false },
  ],
  content: [
    { name: "TikTok API", desc: "Track affiliate video performance", connected: false },
    { name: "YouTube Data API", desc: "Monitor affiliate content", connected: false },
    { name: "Instagram", desc: "Track story and reel performance", connected: false },
  ],
};

const webhookEvents = [
  "install.attributed",
  "purchase.completed",
  "subscription.renewed",
  "subscription.cancelled",
  "refund.processed",
  "payout.sent",
  "fraud.detected",
];

const Settings = () => {
  const [tab, setTab] = useState("billing");
  const [showLive, setShowLive] = useState(false);
  const [showTest, setShowTest] = useState(false);

  // Profile state
  const [profileName, setProfileName] = useState("Sandeep Kumar");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileTimezone, setProfileTimezone] = useState("asia-kl");
  const [profileLang, setProfileLang] = useState("en");

  // Company state
  const [companyName, setCompanyName] = useState("MindfulApp Inc.");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("health");
  const [companyDesc, setCompanyDesc] = useState("");
  const [companySize, setCompanySize] = useState("1-10");
  const [companyCountry, setCompanyCountry] = useState("");

  // Team modal
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("admin");

  // Webhook state
  const [webhookModalOpen, setWebhookModalOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [webhookSecretCopied, setWebhookSecretCopied] = useState(false);
  const webhookSecret = "whsec_k9m2x7p4r8s1t6v3w5y0";

  const toggleEvent = (evt: string) => {
    setSelectedEvents((prev) => prev.includes(evt) ? prev.filter((e) => e !== evt) : [...prev, evt]);
  };

  const copyWebhookSecret = () => {
    navigator.clipboard.writeText(webhookSecret);
    setWebhookSecretCopied(true);
    setTimeout(() => setWebhookSecretCopied(false), 2000);
  };

  return (
    <DashboardLayout activeItem="Settings">
      <div className="px-8 py-6 max-w-[1200px]">
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-6">Settings</h1>

        <div className="flex gap-4 border-b border-border mb-6 overflow-x-auto">
          {["Your Profile", "Company", "Billing", "Team", "Integrations", "API Keys", "Webhooks"].map((t) => (
            <button key={t} onClick={() => setTab(t.toLowerCase().replace(/ /g, ""))} className={cn("text-sm font-medium pb-3 border-b-2 transition-all whitespace-nowrap", tab === t.toLowerCase().replace(/ /g, "") ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t}</button>
          ))}
        </div>

        {/* ─── YOUR PROFILE ─── */}
        {tab === "yourprofile" && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-lg font-semibold text-foreground">
                    SK
                  </div>
                  <div className="absolute inset-0 rounded-full bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera size={18} className="text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Profile Photo</p>
                  <p className="text-xs text-text-tertiary">JPG, PNG. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Full Name *</Label>
                  <Input value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <div className="relative">
                    <Input value="sandeep@upturn.ae" disabled className="pr-9 bg-muted text-text-secondary" />
                    <Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Phone <span className="text-text-tertiary">(optional)</span></Label>
                <Input placeholder="+60 12 345 6789" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Timezone</Label>
                  <Select value={profileTimezone} onValueChange={setProfileTimezone}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-kl">Asia/Kuala_Lumpur (GMT+8)</SelectItem>
                      <SelectItem value="us-pacific">US/Pacific (GMT-7)</SelectItem>
                      <SelectItem value="us-eastern">US/Eastern (GMT-4)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (GMT+1)</SelectItem>
                      <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Language</Label>
                  <Select value={profileLang} onValueChange={setProfileLang}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ms">Bahasa Melayu</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Change Password</h2>
              <div className="space-y-1.5">
                <Label>Current Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirm Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <Button variant="secondary">Update Password</Button>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        )}

        {/* ─── COMPANY ─── */}
        {tab === "company" && (
          <div className="max-w-2xl">
            <div className="bg-card border border-border rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-semibold text-foreground">Company Information</h2>

              {/* Logo */}
              <div className="space-y-1.5">
                <Label>Company Logo</Label>
                <div className="w-[120px] h-[40px] rounded-lg border-2 border-dashed border-border bg-muted flex items-center justify-center cursor-pointer hover:border-[hsl(var(--border-hover))] transition-colors">
                  <span className="text-xs text-text-tertiary">Upload</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Company Name *</Label>
                  <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Website</Label>
                  <Input placeholder="https://mindfulapp.com" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Industry *</Label>
                  <Select value={companyIndustry} onValueChange={setCompanyIndustry}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Health & Fitness</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="photo">Photo & Video</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Country</Label>
                  <Select value={companyCountry} onValueChange={setCompanyCountry}>
                    <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="my">Malaysia</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="gb">United Kingdom</SelectItem>
                      <SelectItem value="sg">Singapore</SelectItem>
                      <SelectItem value="ae">UAE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Company Description</Label>
                <Textarea placeholder="Tell us about your company..." rows={3} value={companyDesc} onChange={(e) => setCompanyDesc(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label>Company Size</Label>
                <ChipSelector
                  options={[
                    { label: "1-10", value: "1-10" },
                    { label: "10-50", value: "10-50" },
                    { label: "50-200", value: "50-200" },
                    { label: "200+", value: "200+" },
                  ]}
                  value={companySize}
                  onChange={setCompanySize}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button>Save Changes</Button>
            </div>
          </div>
        )}

        {/* ─── BILLING (existing) ─── */}
        {tab === "billing" && (
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-3">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex gap-6">
                  <div className="w-36 h-36 rounded-xl watercolor-mixed flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold text-foreground/80">Free</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-3">Free Plan</h2>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>• 5 affiliates</li><li>• 1 app</li><li>• 500 transactions/mo</li><li>• 20% platform commission</li><li>• Basic dashboard</li><li>• Community support</li>
                    </ul>
                    <div className="mt-4">
                      <span className="text-2xl font-bold text-foreground">$0</span><span className="text-text-secondary">/mo</span>
                    </div>
                    <Button variant="secondary" size="sm" className="mt-3">Manage Billing</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="bg-card border border-border rounded-xl p-6">
                <p className="text-sm text-text-secondary mb-4">Growing fast? Reduce your platform commission and unlock more features. ↓</p>
                <div className="space-y-3">
                  <div className="border border-border rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">Growth · $49/mo</span>
                      <Button size="sm">Upgrade</Button>
                    </div>
                    <p className="text-xs text-text-secondary">25 affiliates · 10% commission · AI fraud detection</p>
                  </div>
                  <div className="border border-border rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">Scale · $149/mo</span>
                      <Button variant="secondary" size="sm">Upgrade</Button>
                    </div>
                    <p className="text-xs text-text-secondary">Unlimited · 0% commission · Full API access</p>
                  </div>
                  <button className="text-sm text-text-secondary hover:text-foreground">Talk to Sales · Enterprise →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TEAM ─── */}
        {tab === "team" && (
          <div className="max-w-3xl">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-6 pb-3">
                <h2 className="text-lg font-semibold text-foreground">Team Members (1)</h2>
                <Button size="sm" onClick={() => setTeamModalOpen(true)}><Plus size={14} /> Invite Member</Button>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-background-subtle">
                    {["Member", "Role", "Actions"].map(h => <th key={h} className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-6">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-muted">
                    <td className="px-6 h-14">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">SK</div>
                        <div>
                          <div className="text-sm font-medium text-foreground">Sandeep Kumar (You)</div>
                          <div className="text-xs text-text-tertiary">sandeep@upturn.ae</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 h-14">
                      <BadgeStatus variant="active">Owner</BadgeStatus>
                    </td>
                    <td className="px-6 h-14 text-sm text-text-tertiary">—</td>
                  </tr>
                </tbody>
              </table>
              <div className="px-6 py-4">
                <p className="text-sm text-text-tertiary">Invite team members to help manage your affiliate program.</p>
              </div>
            </div>

            {/* Invite Member Modal */}
            <Dialog open={teamModalOpen} onOpenChange={setTeamModalOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>Send an invitation to join your team.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-1.5">
                    <Label>Email Address *</Label>
                    <Input placeholder="colleague@company.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Role *</Label>
                    <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setTeamModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setTeamModalOpen(false)}>Send Invite →</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* ─── INTEGRATIONS (existing) ─── */}
        {tab === "integrations" && (
          <div className="space-y-8">
            {[
              { title: "Revenue Platforms", items: integrations.revenue },
              { title: "Content Platforms", items: integrations.content },
            ].map((group) => (
              <div key={group.title}>
                <h2 className="text-lg font-semibold text-foreground mb-4">{group.title}</h2>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.name} className={cn("bg-card border border-border rounded-xl p-5 flex items-center gap-4", item.connected && "border-l-[3px] border-l-[hsl(var(--success))]")}>
                      <div className="w-10 h-10 rounded-lg bg-background-subtle flex items-center justify-center text-sm font-bold text-text-secondary shrink-0">{item.name[0]}</div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-foreground">{item.name}</div>
                        <div className="text-xs text-text-secondary">{item.desc}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className={cn("w-2 h-2 rounded-full", item.connected ? "bg-[hsl(var(--success))]" : "bg-[hsl(var(--error))]")} />
                          <span className={cn("text-xs", item.connected ? "text-[hsl(var(--success))]" : "text-[hsl(var(--error))]")}>{item.connected ? "Connected" : "Not Connected"}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {item.connected ? (
                          <>
                            <Button variant="secondary" size="sm">Manage</Button>
                            <Button variant="ghost" size="sm" className="text-destructive">Disconnect</Button>
                          </>
                        ) : (
                          <Button size="sm">Connect →</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── API KEYS (existing) ─── */}
        {tab === "apikeys" && (
          <div className="space-y-4">
            <div className="bg-[hsl(var(--warning-light))] border border-[hsl(var(--warning))]/30 rounded-lg p-4 text-sm flex items-center gap-2">
              <span>⚠️</span> Keep your API keys secret. Do not share them publicly.
            </div>
            {[
              { label: "Live Key", key: "km_live_a1b2c3d4e5f6g7h8i9j0", created: "Feb 1, 2026", lastUsed: "2 minutes ago", show: showLive, setShow: setShowLive },
              { label: "Test Key", key: "km_test_x9y8z7w6v5u4t3s2r1q0", created: "Feb 1, 2026", lastUsed: "Never", show: showTest, setShow: setShowTest },
            ].map((k) => (
              <div key={k.label} className="bg-card border border-border rounded-xl p-5">
                <div className="text-sm font-semibold text-foreground mb-2">{k.label}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-sm text-foreground flex-1">{k.show ? k.key : k.key.replace(/./g, "•").slice(0, 20) + "..."}</span>
                  <Button variant="ghost" size="sm" onClick={() => k.setShow(!k.show)}><Eye size={14} /> {k.show ? "Hide" : "Show"}</Button>
                  <Button variant="ghost" size="sm"><Copy size={14} /> Copy</Button>
                  <Button variant="ghost" size="sm" className="text-destructive">Revoke</Button>
                </div>
                <p className="text-xs text-text-tertiary">Created: {k.created} · Last used: {k.lastUsed}</p>
              </div>
            ))}
            <Button variant="secondary"><Plus size={14} /> Generate New Key</Button>
          </div>
        )}

        {/* ─── WEBHOOKS ─── */}
        {tab === "webhooks" && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Webhook Endpoints</h2>
              <Button size="sm" onClick={() => setWebhookModalOpen(true)}><Plus size={14} /> Add Endpoint</Button>
            </div>

            {/* Empty State */}
            <div className="bg-card border border-border rounded-xl p-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Link2 size={28} className="text-text-tertiary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No webhook endpoints configured</h3>
              <p className="text-sm text-text-secondary mt-1 max-w-xs">Receive real-time notifications when installs, purchases, and payouts occur.</p>
              <Button className="mt-4" onClick={() => setWebhookModalOpen(true)}><Plus size={14} /> Add Endpoint</Button>
            </div>

            {/* Add Endpoint Modal */}
            <Dialog open={webhookModalOpen} onOpenChange={setWebhookModalOpen}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add Webhook Endpoint</DialogTitle>
                  <DialogDescription>Configure a URL to receive real-time event notifications.</DialogDescription>
                </DialogHeader>
                <div className="space-y-5 py-2">
                  <div className="space-y-1.5">
                    <Label>Endpoint URL *</Label>
                    <Input placeholder="https://your-server.com/webhooks/komisi" value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Events to send *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {webhookEvents.map((evt) => (
                        <button
                          key={evt}
                          onClick={() => toggleEvent(evt)}
                          className="flex items-center gap-2 text-left"
                        >
                          <Checkbox checked={selectedEvents.includes(evt)} className="pointer-events-none" />
                          <span className="text-sm font-mono text-foreground">{evt}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Signing Secret</Label>
                    <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                      <span className="font-mono text-sm text-foreground flex-1 truncate">{webhookSecret}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={copyWebhookSecret}>
                        {webhookSecretCopied ? <Check size={14} className="text-[hsl(var(--success))]" /> : <Copy size={14} />}
                      </Button>
                    </div>
                    <p className="text-xs text-text-tertiary">Use this to verify webhook signatures.</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setWebhookModalOpen(false)}>Cancel</Button>
                  <Button onClick={() => setWebhookModalOpen(false)}>Create Endpoint →</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;
