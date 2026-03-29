import React, { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  ArrowRight, Copy, Check, CalendarIcon, Info,
} from "lucide-react";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";

const campaignPresets: Record<string, {
  name: string; app: string; description: string; commission: string; commType: string;
  firstPurchase: string; recurring: string; duration: string; attribution: string;
  source: string; medium: string; affiliates: number;
}> = {
  "tiktok-q1-push": {
    name: "TikTok Q1 Push", app: "mindfulapp", description: "Drive installs through TikTok creators with authentic recommendation-style videos.", commission: "custom", commType: "revenue",
    firstPurchase: "30", recurring: "20", duration: "12", attribution: "30",
    source: "tiktok", medium: "affiliate", affiliates: 8,
  },
  "youtube-review-program": {
    name: "YouTube Review Program", app: "mindfulapp", description: "Partner with YouTube reviewers for in-depth app reviews.", commission: "custom", commType: "revenue",
    firstPurchase: "25", recurring: "15", duration: "12", attribution: "30",
    source: "youtube", medium: "affiliate", affiliates: 4,
  },
  "instagram-stories-sprint": {
    name: "Instagram Stories Sprint", app: "mindfulapp", description: "Quick Instagram Stories campaign targeting wellness audiences.", commission: "default", commType: "revenue",
    firstPurchase: "30", recurring: "20", duration: "12", attribution: "30",
    source: "instagram", medium: "affiliate", affiliates: 3,
  },
  "launch-week-blitz": {
    name: "Launch Week Blitz", app: "focustimer", description: "Intensive launch week push with multiple creator partnerships.", commission: "custom", commType: "revenue",
    firstPurchase: "35", recurring: "25", duration: "6", attribution: "30",
    source: "tiktok", medium: "affiliate", affiliates: 6,
  },
  "holiday-campaign-2025": {
    name: "Holiday Campaign 2025", app: "mindfulapp", description: "End-of-year holiday promotion with seasonal content.", commission: "custom", commType: "revenue",
    firstPurchase: "40", recurring: "30", duration: "12", attribution: "30",
    source: "multi", medium: "affiliate", affiliates: 10,
  },
};

const affiliatesList = [
  { name: "Sarah Chen", handle: "@sarahcreates", platforms: "TikTok, YouTube", initials: "SC", color: "bg-pink-100" },
  { name: "Alex Kim", handle: "@techreviewer", platforms: "YouTube", initials: "AK", color: "bg-blue-100" },
  { name: "Jordan Lee", handle: "@appjunkie", platforms: "Blog, Twitter", initials: "JL", color: "bg-green-100" },
  { name: "Maria Santos", handle: "@fitnesstech", platforms: "TikTok", initials: "MS", color: "bg-yellow-100" },
  { name: "David Park", handle: "@mobilereview", platforms: "YouTube", initials: "DP", color: "bg-purple-100" },
  { name: "Emma Wilson", handle: "@wellnessemma", platforms: "Instagram, Blog", initials: "EW", color: "bg-pink-100" },
];

const CampaignCreate: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editSlug = searchParams.get("edit");
  const preset = editSlug ? campaignPresets[editSlug] : null;
  const isEdit = !!preset;

  // Form state
  const [campaignName, setCampaignName] = useState(preset?.name ?? "");
  const [app, setApp] = useState(preset?.app ?? "");
  const [description, setDescription] = useState(preset?.description ?? "");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [noEndDate, setNoEndDate] = useState(false);

  const [commSource, setCommSource] = useState(preset?.commission ?? "default");
  const [commType, setCommType] = useState(preset?.commType ?? "revenue");
  const [firstPurchase, setFirstPurchase] = useState(preset?.firstPurchase ?? "30");
  const [recurring, setRecurring] = useState(preset?.recurring ?? "20");
  const [commDuration, setCommDuration] = useState(preset?.duration ?? "12");
  const [attribution, setAttribution] = useState(preset?.attribution ?? "30");

  const [utmSource, setUtmSource] = useState(preset?.source ?? "");
  const [utmMedium, setUtmMedium] = useState(preset?.medium ?? "affiliate");
  const [genQr, setGenQr] = useState(true);
  const [genLinks, setGenLinks] = useState(true);
  const [allowCodes, setAllowCodes] = useState(true);

  const [assignType, setAssignType] = useState("all");
  const [selectedAffiliates, setSelectedAffiliates] = useState<string[]>([]);
  const [affiliateSearch, setAffiliateSearch] = useState("");

  const [launchModalOpen, setLaunchModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => campaignName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), [campaignName]);
  const smartLink = `https://komisi.io/go/${app || "app"}-${slug || "campaign"}`;
  const utmCampaign = slug;

  const handleCopy = () => {
    navigator.clipboard.writeText(smartLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAffiliate = (handle: string) => {
    setSelectedAffiliates((prev) =>
      prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]
    );
  };

  const filteredAffiliates = affiliatesList.filter(
    (a) => a.name.toLowerCase().includes(affiliateSearch.toLowerCase()) || a.handle.toLowerCase().includes(affiliateSearch.toLowerCase())
  );

  return (
    <DashboardLayout activeItem="Campaigns">
      <div className="px-8 py-8 max-w-[900px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{isEdit ? "Edit Campaign" : "Create Campaign"}</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/campaigns")}>Cancel</Button>
            <Button variant="secondary">Save as Draft</Button>
          </div>
        </div>

        <div className="space-y-10">
          {/* ─── Section 1: Campaign Details ─── */}
          <section>
            <h2 className="text-base font-semibold text-foreground">Campaign Details</h2>
            <div className="h-px bg-border mt-1 mb-6" />
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Campaign Name *</Label>
                <Input placeholder="e.g., TikTok Q1 Push" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>App *</Label>
                  <Select value={app} onValueChange={setApp}>
                    <SelectTrigger><SelectValue placeholder="Select app" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mindfulapp">MindfulApp</SelectItem>
                      <SelectItem value="focustimer">FocusTimer Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe this campaign for your affiliates..." rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-1.5">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" disabled={noEndDate} className={cn("w-full justify-start text-left font-normal", (!endDate || noEndDate) && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {noEndDate ? "No end date" : endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus className="p-3 pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                  <div className="flex items-center gap-2 mt-2">
                    <Checkbox id="no-end" checked={noEndDate} onCheckedChange={(v) => setNoEndDate(!!v)} />
                    <label htmlFor="no-end" className="text-sm text-text-secondary cursor-pointer">No end date</label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Section 2: Commission Structure ─── */}
          <section>
            <h2 className="text-base font-semibold text-foreground">Commission Structure</h2>
            <div className="h-px bg-border mt-1 mb-6" />
            <div className="space-y-4">
              <ChipSelector
                options={[
                  { label: "Use app default (30% first / 20% renewals)", value: "default" },
                  { label: "Custom for this campaign", value: "custom" },
                ]}
                value={commSource}
                onChange={setCommSource}
              />
              {commSource === "custom" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="space-y-1.5">
                    <Label>Commission Type</Label>
                    <ChipSelector
                      options={[
                        { label: "Revenue Share (%)", value: "revenue" },
                        { label: "Fixed Amount ($)", value: "fixed" },
                        { label: "Tiered", value: "tiered" },
                      ]}
                      value={commType}
                      onChange={setCommType}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label>First Purchase *</Label>
                      <div className="flex gap-2">
                        <Input value={firstPurchase} onChange={(e) => setFirstPurchase(e.target.value)} className="flex-1" />
                        <Select defaultValue="%">
                          <SelectTrigger className="w-16"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="%">%</SelectItem>
                            <SelectItem value="$">$</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Recurring</Label>
                      <div className="flex gap-2">
                        <Input value={recurring} onChange={(e) => setRecurring(e.target.value)} className="flex-1" />
                        <Select defaultValue="%">
                          <SelectTrigger className="w-16"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="%">%</SelectItem>
                            <SelectItem value="$">$</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Duration</Label>
                      <Select value={commDuration} onValueChange={setCommDuration}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 months</SelectItem>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="12">12 months</SelectItem>
                          <SelectItem value="24">24 months</SelectItem>
                          <SelectItem value="lifetime">Lifetime</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1.5 max-w-[240px]">
                    <div className="flex items-center gap-1.5">
                      <Label>Attribution Window</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info size={14} className="text-text-tertiary cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[220px]">
                          How long after clicking should installs be attributed to the affiliate?
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Select value={attribution} onValueChange={setAttribution}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ─── Section 3: Links & Tracking ─── */}
          <section>
            <h2 className="text-base font-semibold text-foreground">Links & Tracking</h2>
            <div className="h-px bg-border mt-1 mb-6" />
            <div className="space-y-4">
              <div className="bg-muted p-4">
                <p className="text-xs text-text-tertiary mb-1">Smart Link (auto-generated):</p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-foreground break-all">{smartLink}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={handleCopy}>
                    {copied ? <Check size={14} className="text-[hsl(var(--success))]" /> : <Copy size={14} />}
                  </Button>
                </div>
                <p className="text-xs text-text-tertiary mt-2">This link will be customized per affiliate with their ref ID.</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label>Source</Label>
                  <Input placeholder="tiktok" value={utmSource} onChange={(e) => setUtmSource(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Medium</Label>
                  <Input value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Campaign</Label>
                  <Input value={utmCampaign} disabled className="text-text-secondary bg-muted" />
                </div>
              </div>
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-2">
                  <Checkbox id="qr" checked={genQr} onCheckedChange={(v) => setGenQr(!!v)} />
                  <label htmlFor="qr" className="text-sm text-foreground cursor-pointer">Generate QR Code for each affiliate</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="links" checked={genLinks} onCheckedChange={(v) => setGenLinks(!!v)} />
                  <label htmlFor="links" className="text-sm text-foreground cursor-pointer">Generate unique tracking links per affiliate</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="codes" checked={allowCodes} onCheckedChange={(v) => setAllowCodes(!!v)} />
                  <label htmlFor="codes" className="text-sm text-foreground cursor-pointer">Allow referral codes as fallback</label>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Section 4: Affiliate Assignment ─── */}
          <section>
            <h2 className="text-base font-semibold text-foreground">Affiliate Assignment</h2>
            <div className="h-px bg-border mt-1 mb-6" />
            <div className="space-y-3">
              {[
                { value: "all", label: "All current affiliates (12)" },
                { value: "select", label: "Select specific affiliates" },
                { value: "open", label: "Open to marketplace — any creator can apply" },
              ].map((o) => (
                <button
                  key={o.value}
                  onClick={() => setAssignType(o.value)}
                  className={cn(
                    "w-full text-left h-11 px-4 border text-sm font-medium transition-all",
                    assignType === o.value
                      ? "bg-primary text-primary-foreground border-transparent"
                      : "bg-card text-text-secondary border-border hover:border-[hsl(var(--border-hover))]"
                  )}
                >
                  {o.label}
                </button>
              ))}

              {assignType === "select" && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 border border-border p-4 mt-2 space-y-3">
                  <Input
                    placeholder="Search affiliates..."
                    value={affiliateSearch}
                    onChange={(e) => setAffiliateSearch(e.target.value)}
                  />
                  <div className="space-y-1 max-h-[260px] overflow-y-auto">
                    {filteredAffiliates.map((a) => (
                      <button
                        key={a.handle}
                        onClick={() => toggleAffiliate(a.handle)}
                        className="w-full flex items-center gap-3 py-2 px-2 hover:bg-muted transition-colors text-left"
                      >
                        <Checkbox checked={selectedAffiliates.includes(a.handle)} className="pointer-events-none" />
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0", a.color)}>
                          {a.initials}
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-foreground">{a.name}</span>
                          <span className="text-sm text-text-tertiary ml-1.5">{a.handle}</span>
                          <p className="text-xs text-text-tertiary">{a.platforms}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  {selectedAffiliates.length > 0 && (
                    <p className="text-xs text-text-secondary">{selectedAffiliates.length} affiliate{selectedAffiliates.length > 1 ? "s" : ""} selected</p>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* ─── Bottom Actions ─── */}
          <div className="border-t border-border pt-6 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => navigate("/campaigns")}>Cancel</Button>
            <Button variant="secondary">Save as Draft</Button>
            <Button size="lg" onClick={() => setLaunchModalOpen(true)}>
              {isEdit ? "Save Changes" : "Launch Campaign"} <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Launch Confirmation Modal */}
      <Dialog open={launchModalOpen} onOpenChange={setLaunchModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Save Changes?" : `Launch "${campaignName || "Campaign"}"?`}</DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Your changes will be applied immediately to the live campaign."
                : "This campaign will go live immediately. Assigned affiliates will be notified and can start promoting."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setLaunchModalOpen(false)}>Cancel</Button>
            <Button onClick={() => { setLaunchModalOpen(false); navigate("/campaigns"); }}>
              {isEdit ? "Save Changes" : "Launch"} <ArrowRight size={14} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default CampaignCreate;