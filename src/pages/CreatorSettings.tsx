import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Upload, Lock, Check, Wifi, WifiOff } from "lucide-react";

const tabs = ["Profile", "Payout Methods", "Tax Info", "Notifications"];

const platformOptions = ["TikTok", "YouTube", "Instagram", "Blog", "Twitter/X"];
const categoryOptions = ["Health & Fitness", "Productivity", "Education", "Finance", "Gaming", "Photo & Video", "Lifestyle", "Tech"];

const CreatorSettings = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  // Profile
  const [displayName, setDisplayName] = useState("Sarah Creates");
  const [bio, setBio] = useState("Content creator sharing honest app reviews and productivity tips. 150K+ across platforms.");
  const [primaryPlatform, setPrimaryPlatform] = useState("tiktok");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["TikTok", "YouTube", "Instagram"]);
  const [audienceSize, setAudienceSize] = useState("100k-500k");
  const [selectedCategories, setSelectedCategories] = useState(["Health & Fitness", "Productivity"]);

  // Payout
  const [minPayout, setMinPayout] = useState("25.00");
  const [preferredMethod, setPreferredMethod] = useState("stripe");

  // Tax
  const [taxCountry, setTaxCountry] = useState("");

  // Notifications
  const [notifs, setNotifs] = useState({
    approval: true, payout: true, summary: true, matching: false, rateChanges: false,
  });

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };
  const toggleCategory = (c: string) => {
    setSelectedCategories(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  return (
    <DashboardLayout activeItem="Settings" userType="creator">
      <div className="px-8 py-8 max-w-[900px]">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-8">Creator Settings</h1>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border mb-8">
          {tabs.map((t) => (
            <button key={t} onClick={() => setActiveTab(t)} className={cn("text-sm font-medium pb-3 border-b-2 transition-all", activeTab === t ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t}</button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "Profile" && (
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-lg font-semibold text-foreground">SC</div>
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <span className="text-xs text-white font-medium">Change</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Profile Photo</p>
                <p className="text-xs text-text-tertiary">JPG, PNG. Max 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Display Name *</Label>
                <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Handle</Label>
                <div className="relative">
                  <Input value="@sarahcreates" disabled className="pr-8" />
                  <Lock size={14} className="absolute right-3 top-3 text-text-tertiary" />
                </div>
                <p className="text-xs text-text-tertiary">Contact support to change</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Bio</Label>
              <Textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Primary Platform</Label>
                <Select value={primaryPlatform} onValueChange={setPrimaryPlatform}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {platformOptions.map(p => <SelectItem key={p} value={p.toLowerCase().replace("/", "")}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Audience Size</Label>
                <Select value={audienceSize} onValueChange={setAudienceSize}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["1K-10K", "10K-50K", "50K-100K", "100K-500K", "500K+"].map(s => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>All Platforms</Label>
              <div className="flex flex-wrap gap-2">
                {platformOptions.map(p => (
                  <button key={p} onClick={() => togglePlatform(p)} className={cn("inline-flex items-center gap-1.5 rounded-full h-8 px-3 text-sm font-medium border transition-all", selectedPlatforms.includes(p) ? "bg-primary text-primary-foreground border-transparent" : "bg-background text-text-secondary border-border hover:border-[hsl(var(--border-hover))]")}>
                    {selectedPlatforms.includes(p) && <Check size={14} />}
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="grid grid-cols-3 gap-2">
                {categoryOptions.map(c => (
                  <label key={c} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <Checkbox checked={selectedCategories.includes(c)} onCheckedChange={() => toggleCategory(c)} />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <Button>Save Changes</Button>
            </div>
          </div>
        )}

        {/* Payout Methods Tab */}
        {activeTab === "Payout Methods" && (
          <div className="space-y-4">
            {/* Stripe */}
            <div className="bg-card border border-border p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[hsl(var(--info-light))] flex items-center justify-center"><Wifi size={18} className="text-[hsl(var(--info))]" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">Stripe Connect</span>
                    <BadgeStatus variant="success" dot>Connected</BadgeStatus>
                  </div>
                  <p className="text-xs text-text-tertiary">Account ending in ••4242</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">Manage</Button>
                <Button variant="destructive" size="sm">Disconnect</Button>
              </div>
            </div>

            {/* PayPal */}
            <div className="bg-card border border-border p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted flex items-center justify-center"><WifiOff size={18} className="text-text-tertiary" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">PayPal</span>
                    <BadgeStatus variant="neutral">Not Connected</BadgeStatus>
                  </div>
                </div>
              </div>
              <Button variant="secondary" size="sm">Connect PayPal</Button>
            </div>

            {/* Wise */}
            <div className="bg-card border border-border p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted flex items-center justify-center"><WifiOff size={18} className="text-text-tertiary" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">Wise</span>
                    <BadgeStatus variant="neutral">Not Connected</BadgeStatus>
                  </div>
                </div>
              </div>
              <Button variant="secondary" size="sm">Connect Wise</Button>
            </div>

            <div className="border-t border-border pt-6 mt-6 grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Minimum Payout</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-sm text-text-tertiary">$</span>
                  <Input className="pl-7" value={minPayout} onChange={(e) => setMinPayout(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Preferred Method</Label>
                <Select value={preferredMethod} onValueChange={setPreferredMethod}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe">Stripe Connect</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="wise">Wise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button>Save Changes</Button>
            </div>
          </div>
        )}

        {/* Tax Info Tab */}
        {activeTab === "Tax Info" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Tax Country</Label>
                <Select value={taxCountry} onValueChange={setTaxCountry}>
                  <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                  <SelectContent>
                    {["United States", "United Kingdom", "Canada", "Australia", "Malaysia", "Singapore", "India", "Germany"].map(c => (
                      <SelectItem key={c} value={c.toLowerCase().replace(/ /g, "-")}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Tax Form Status</Label>
                <div className="h-10 flex items-center">
                  <BadgeStatus variant="warning" dot>Not Submitted</BadgeStatus>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-5">
              <p className="text-sm text-text-secondary mb-4">Submit a W-8BEN (international) or W-9 (US) form for tax compliance.</p>
              <div className="flex gap-3">
                <Button variant="secondary"><Upload size={14} /> Upload Tax Form</Button>
                <Button variant="ghost">Fill Out Online →</Button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "Notifications" && (
          <div className="space-y-1">
            {([
              { key: "approval" as const, label: "New program approval" },
              { key: "payout" as const, label: "Payout sent" },
              { key: "summary" as const, label: "Monthly earnings summary" },
              { key: "matching" as const, label: "New apps matching my profile" },
              { key: "rateChanges" as const, label: "Commission rate changes" },
            ]).map((n) => (
              <div key={n.key} className="flex items-center justify-between py-3 border-b border-border">
                <span className="text-sm text-foreground">{n.label}</span>
                <Switch checked={notifs[n.key]} onCheckedChange={(v) => setNotifs({ ...notifs, [n.key]: v })} />
              </div>
            ))}
            <div className="flex justify-end pt-6">
              <Button>Save Preferences</Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreatorSettings;