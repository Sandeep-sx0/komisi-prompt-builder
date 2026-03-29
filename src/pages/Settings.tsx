import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Eye, Copy, Lock, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const integrations = {
  revenue: [
    { name: "RevenueCat", desc: "Webhook active · Last event: 2m ago", connected: true },
    { name: "Adapty", desc: "Connect for IAP tracking", connected: false },
    { name: "Stripe Connect", desc: "Payout account active", connected: true },
    { name: "Direct Store APIs", desc: "Connect to Apple/Google directly", connected: false },
  ],
};

const Settings = () => {
  const [tab, setTab] = useState("profile");
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

  // App Config state
  const [commissionType, setCommissionType] = useState("revenue");
  const [firstPurchaseRate, setFirstPurchaseRate] = useState("30");
  const [recurringRate, setRecurringRate] = useState("20");
  const [recurringDuration, setRecurringDuration] = useState("12");
  const [attributionWindow, setAttributionWindow] = useState("30");
  const [iosStoreFee, setIosStoreFee] = useState("30.00");
  const [googlePlayFee, setGooglePlayFee] = useState("30.00");
  const [customDomain, setCustomDomain] = useState("");
  const [webFallbackUrl, setWebFallbackUrl] = useState("");

  return (
    <DashboardLayout activeItem="Settings">
      <div className="px-8 py-8 max-w-[1200px]">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-8">Settings</h1>

        <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto">
          {["Profile", "App Config", "Billing", "Integrations", "API Keys"].map((t) => (
            <button key={t} onClick={() => setTab(t.toLowerCase().replace(/ /g, ""))} className={cn("text-sm font-medium pb-3 border-b-2 transition-all whitespace-nowrap", tab === t.toLowerCase().replace(/ /g, "") ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t}</button>
          ))}
        </div>

        {/* ─── PROFILE ─── */}
        {tab === "profile" && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-card border border-border p-6 space-y-5">
              <h2 className="text-base font-semibold text-foreground">Profile Information</h2>

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

            {/* Company Information */}
            <div className="bg-card border border-border p-6 space-y-5">
              <h2 className="text-base font-semibold text-foreground">Company Information</h2>

              {/* Logo */}
              <div className="space-y-1.5">
                <Label>Company Logo</Label>
                <div className="w-[120px] h-[40px] border-2 border-dashed border-border bg-muted flex items-center justify-center cursor-pointer hover:border-[hsl(var(--border-hover))] transition-colors">
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

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        )}

        {/* ─── APP CONFIG ─── */}
        {tab === "appconfig" && (
          <div className="max-w-2xl space-y-6">
            {/* Commission Defaults */}
            <div className="bg-card border border-border p-6 space-y-5">
              <h2 className="text-base font-semibold text-foreground">Commission Defaults</h2>

              <div className="space-y-1.5">
                <Label>Commission Type</Label>
                <ChipSelector
                  options={[
                    { label: "Revenue Share (%)", value: "revenue" },
                    { label: "Fixed Amount ($)", value: "fixed" },
                  ]}
                  value={commissionType}
                  onChange={setCommissionType}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>First Purchase Rate</Label>
                  <Input value={firstPurchaseRate} onChange={(e) => setFirstPurchaseRate(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Recurring Rate</Label>
                  <Input value={recurringRate} onChange={(e) => setRecurringRate(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Recurring Duration</Label>
                  <Select value={recurringDuration} onValueChange={setRecurringDuration}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="lifetime">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Attribution Window</Label>
                  <Select value={attributionWindow} onValueChange={setAttributionWindow}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Store Fee Rates */}
            <div className="bg-card border border-border p-6 space-y-5">
              <h2 className="text-base font-semibold text-foreground">Store Fee Rates</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>iOS App Store Fee</Label>
                  <div className="relative">
                    <Input value={iosStoreFee} onChange={(e) => setIosStoreFee(e.target.value)} className="pr-8" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-tertiary">%</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Google Play Fee</Label>
                  <div className="relative">
                    <Input value={googlePlayFee} onChange={(e) => setGooglePlayFee(e.target.value)} className="pr-8" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-tertiary">%</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-text-tertiary">Used to calculate net revenue before commission. Apple Small Business Program rate is 15%.</p>
            </div>

            {/* Smart Links */}
            <div className="bg-card border border-border p-6 space-y-5">
              <h2 className="text-base font-semibold text-foreground">Smart Links</h2>

              <div className="space-y-1.5">
                <Label>Custom Domain</Label>
                <Input placeholder="go.yourapp.com" value={customDomain} onChange={(e) => setCustomDomain(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label>Web Fallback URL</Label>
                <Input placeholder="https://yourapp.com" value={webFallbackUrl} onChange={(e) => setWebFallbackUrl(e.target.value)} />
              </div>
            </div>

            {/* SDK Status */}
            <div className="bg-card border border-border p-6 space-y-4">
              <h2 className="text-base font-semibold text-foreground">SDK Status</h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">SDK Installed</span>
                  <BadgeStatus variant="success">Active</BadgeStatus>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">iOS SDK</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[hsl(var(--success))]" />
                    <span className="text-sm text-foreground">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Android SDK</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[hsl(var(--success))]" />
                    <span className="text-sm text-foreground">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Last Seen</span>
                  <span className="text-sm text-foreground">2 minutes ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">SDK Version</span>
                  <span className="text-sm font-mono text-foreground">1.0.3</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        )}

        {/* ─── BILLING ─── */}
        {tab === "billing" && (
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-3">
              <div className="bg-card border border-border p-6">
                <div className="flex gap-6">
                  <div className="w-36 h-36 watercolor-mixed flex items-center justify-center shrink-0">
                    <span className="text-2xl font-semibold text-foreground/80">Free</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-3">Free Plan</h2>
                    <ul className="space-y-1.5 text-sm text-text-secondary">
                      <li>• 5 affiliates</li><li>• 1 app</li><li>• 500 transactions/mo</li><li>• 20% platform commission</li><li>• Basic dashboard</li><li>• Community support</li>
                    </ul>
                    <div className="mt-4">
                      <span className="text-2xl font-semibold text-foreground">$0</span><span className="text-text-secondary">/mo</span>
                    </div>
                    <Button variant="secondary" size="sm" className="mt-3">Manage Billing</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="bg-card border border-border p-6">
                <p className="text-sm text-text-secondary mb-4">Growing fast? Reduce your platform commission and unlock more features.</p>
                <div className="space-y-3">
                  <div className="border border-border p-4 hover:border-[hsl(var(--border-hover))] transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-foreground">Growth · $49/mo</span>
                      <Button size="sm">Upgrade</Button>
                    </div>
                    <p className="text-xs text-text-secondary">25 affiliates · 10% commission · AI fraud detection</p>
                  </div>
                  <div className="border border-border p-4 hover:border-[hsl(var(--border-hover))] transition-colors cursor-pointer">
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

        {/* ─── INTEGRATIONS ─── */}
        {tab === "integrations" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-base font-semibold text-foreground mb-4">Revenue Platforms</h2>
              <div className="space-y-3">
                {integrations.revenue.map((item) => (
                  <div key={item.name} className={cn("bg-card border border-border p-5 flex items-center gap-4", item.connected && "border-l-[3px] border-l-[hsl(var(--success))]")}>
                    <div className="w-10 h-10 bg-background-subtle flex items-center justify-center text-sm font-semibold text-text-secondary shrink-0">{item.name[0]}</div>
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
          </div>
        )}

        {/* ─── API KEYS ─── */}
        {tab === "apikeys" && (
          <div className="space-y-4">
            <div className="bg-[hsl(var(--warning-light))] border border-[hsl(var(--warning))]/30 p-4 text-sm flex items-center gap-2">
              <span>⚠️</span> Keep your API keys secret. Do not share them publicly.
            </div>
            {[
              { label: "Live Key", key: "km_live_a1b2c3d4e5f6g7h8i9j0", created: "Feb 1, 2026", lastUsed: "2 minutes ago", show: showLive, setShow: setShowLive },
              { label: "Test Key", key: "km_test_x9y8z7w6v5u4t3s2r1q0", created: "Feb 1, 2026", lastUsed: "Never", show: showTest, setShow: setShowTest },
            ].map((k) => (
              <div key={k.label} className="bg-card border border-border p-5">
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
      </div>
    </DashboardLayout>
  );
};

export default Settings;