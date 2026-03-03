import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Plus, ExternalLink, Copy, X, Eye, Download, DollarSign, TrendingUp,
  Sparkles, CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const contentItems = [
  { title: "5 Apps That Changed My Morning Routine", creator: "@sarahcreates", platform: "TikTok", posted: "Feb 14, 2026", views: "245K", installs: 234, revenue: "$890", cvr: "0.095%", utm: "source=tiktok · medium=affiliate · campaign=morning-routine", type: "tiktok" },
  { title: "MindfulApp — Honest 30-Day Review", creator: "@techreviewer", platform: "YouTube", posted: "Feb 20, 2026", views: "89K", installs: 189, revenue: "$672", cvr: "0.21%", utm: "source=youtube · medium=affiliate · campaign=30day-review", type: "youtube" },
  { title: "My Morning Routine App Stack (2026 Edition)", creator: "@appjunkie", platform: "Blog", posted: "Feb 22, 2026", views: "32K", installs: 98, revenue: "$334", cvr: "0.31%", utm: "source=blog · medium=affiliate · campaign=morning-stack", type: "blog" },
  { title: "Apps That Actually Help With Anxiety", creator: "@fitnesstech", platform: "TikTok", posted: "Mar 1, 2026", views: "156K", installs: 67, revenue: "$228", cvr: "0.043%", utm: "source=tiktok · medium=affiliate · campaign=anxiety-apps", type: "tiktok" },
  { title: "Productivity Apps I Can't Live Without", creator: "@priyatech", platform: "Instagram", posted: "Mar 2, 2026", views: "45K", installs: 34, revenue: "$112", cvr: "0.076%", utm: "source=instagram · medium=affiliate · campaign=productivity", type: "instagram" },
];

const Content = () => {
  const [filter, setFilter] = useState("all");
  const [utmOpen, setUtmOpen] = useState(false);
  const [utmFields, setUtmFields] = useState({ source: "tiktok", medium: "affiliate", campaign: "morning-routine", content: "video-5apps", term: "" });
  const [copied, setCopied] = useState(false);

  // Add Content modal
  const [addOpen, setAddOpen] = useState(false);
  const [contentUrl, setContentUrl] = useState("");
  const [contentPlatform, setContentPlatform] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [contentAffiliate, setContentAffiliate] = useState("");
  const [contentCampaign, setContentCampaign] = useState("");
  const [contentDate, setContentDate] = useState<Date | undefined>(undefined);
  const [fetching, setFetching] = useState(false);

  const filtered = filter === "all" ? contentItems : contentItems.filter(c => c.type === filter);

  const utmLink = `https://komisi.io/go/mindfulapp?utm_source=${utmFields.source}&utm_medium=${utmFields.medium}&utm_campaign=${utmFields.campaign}${utmFields.content ? `&utm_content=${utmFields.content}` : ""}${utmFields.term ? `&utm_term=${utmFields.term}` : ""}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAutoFetch = () => {
    setFetching(true);
    setTimeout(() => {
      setContentTitle("5 Apps That Changed My Morning Routine");
      if (contentUrl.includes("tiktok")) setContentPlatform("tiktok");
      else if (contentUrl.includes("youtube")) setContentPlatform("youtube");
      else if (contentUrl.includes("instagram")) setContentPlatform("instagram");
      else setContentPlatform("blog");
      setFetching(false);
    }, 1500);
  };

  return (
    <DashboardLayout activeItem="Content">
      <div className="px-8 py-6 max-w-[1200px]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Content Tracking</h1>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setUtmOpen(true)}>UTM Builder</Button>
            <Button onClick={() => setAddOpen(true)}><Plus size={14} /> Add Content</Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-4 border-b border-border mb-6">
          {["all", "tiktok", "youtube", "blog", "instagram"].map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={cn("text-sm font-medium pb-3 border-b-2 transition-all capitalize", filter === t ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t === "all" ? "All Content" : t}</button>
          ))}
        </div>

        {/* Content cards */}
        <div className="space-y-4">
          {filtered.map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-xl p-5 hover:shadow-sm transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-background-subtle flex items-center justify-center text-lg shrink-0">🎬</div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground">"{c.title}"</h3>
                  <p className="text-sm text-text-secondary">{c.creator} · {c.platform} · Posted {c.posted}</p>

                  <div className="grid grid-cols-4 gap-3 mt-3">
                    {[
                      { icon: Eye, value: c.views, label: "Views" },
                      { icon: Download, value: c.installs, label: "Installs" },
                      { icon: DollarSign, value: c.revenue, label: "Revenue" },
                      { icon: TrendingUp, value: c.cvr, label: "CVR" },
                    ].map((s) => (
                      <div key={s.label} className="bg-background-subtle rounded-lg p-2 text-center">
                        <div className="text-sm font-semibold text-foreground">{s.value}</div>
                        <div className="text-xs text-text-tertiary">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3">
                    <span className="font-mono text-xs text-text-tertiary bg-background-subtle rounded px-2 py-1">{c.utm}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <Button variant="ghost" size="sm"><ExternalLink size={14} /> View on {c.platform}</Button>
                    <Button variant="ghost" size="sm">View Attribution Details →</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(`https://komisi.io/go/mindfulapp`)}><Copy size={14} /> Copy Link</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UTM Builder Slide-Out */}
      {utmOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setUtmOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-[480px] bg-card border-l border-border shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">UTM Builder</h2>
              <button onClick={() => setUtmOpen(false)} className="text-text-tertiary hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="px-6 py-6 space-y-4">
              <p className="text-sm text-text-secondary">Build a tracked link for your affiliates.</p>
              <div><label className="block text-sm font-medium text-foreground mb-1.5">Base URL</label><input disabled value="https://komisi.io/go/mindfulapp" className="w-full h-10 px-3 text-sm bg-background-subtle border border-border rounded-lg text-text-secondary" /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1.5">Source *</label><input value={utmFields.source} onChange={e => setUtmFields({...utmFields, source: e.target.value})} placeholder="e.g., tiktok, youtube" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none focus:border-foreground" /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1.5">Medium *</label><input value={utmFields.medium} onChange={e => setUtmFields({...utmFields, medium: e.target.value})} className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none focus:border-foreground" /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1.5">Campaign *</label><input value={utmFields.campaign} onChange={e => setUtmFields({...utmFields, campaign: e.target.value})} placeholder="e.g., spring-push" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none focus:border-foreground" /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1.5">Content (optional)</label><input value={utmFields.content} onChange={e => setUtmFields({...utmFields, content: e.target.value})} placeholder="e.g., banner-v2" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none focus:border-foreground" /></div>
              <div><label className="block text-sm font-medium text-foreground mb-1.5">Term (optional)</label><input value={utmFields.term} onChange={e => setUtmFields({...utmFields, term: e.target.value})} placeholder="e.g., meditation" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none focus:border-foreground" /></div>
              <div className="border-t border-border pt-4">
                <label className="block text-sm font-medium text-foreground mb-2">Generated Link:</label>
                <div className="bg-background-subtle rounded-lg p-4">
                  <p className="font-mono text-xs text-foreground break-all">{utmLink}</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="secondary" size="sm" onClick={() => handleCopy(utmLink)}>
                      {copied ? "Copied!" : <><Copy size={14} /> Copy Link</>}
                    </Button>
                    <Button variant="secondary" size="sm">Generate QR</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add Content Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Content Piece</DialogTitle>
            <DialogDescription>Track a new piece of affiliate content for attribution.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Content URL *</Label>
              <div className="flex gap-2">
                <Input className="flex-1" placeholder="https://tiktok.com/@creator/video/123..." value={contentUrl} onChange={(e) => setContentUrl(e.target.value)} />
                <Button variant="ai" size="sm" onClick={handleAutoFetch} disabled={!contentUrl || fetching}>
                  <Sparkles size={14} /> {fetching ? "Fetching..." : "Auto-Fetch ✦"}
                </Button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Platform *</Label>
              <ChipSelector
                options={[
                  { label: "TikTok", value: "tiktok" },
                  { label: "YouTube", value: "youtube" },
                  { label: "Instagram", value: "instagram" },
                  { label: "Blog", value: "blog" },
                  { label: "Other", value: "other" },
                ]}
                value={contentPlatform}
                onChange={setContentPlatform}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input placeholder="Content title (auto-detected from URL)" value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Affiliate *</Label>
                <Select value={contentAffiliate} onValueChange={setContentAffiliate}>
                  <SelectTrigger><SelectValue placeholder="Select affiliate" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarahcreates">@sarahcreates</SelectItem>
                    <SelectItem value="techreviewer">@techreviewer</SelectItem>
                    <SelectItem value="appjunkie">@appjunkie</SelectItem>
                    <SelectItem value="fitnesstech">@fitnesstech</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Campaign <span className="text-text-tertiary">(optional)</span></Label>
                <Select value={contentCampaign} onValueChange={setContentCampaign}>
                  <SelectTrigger><SelectValue placeholder="Select campaign" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiktok-q1">TikTok Q1 Push</SelectItem>
                    <SelectItem value="youtube-review">YouTube Review Program</SelectItem>
                    <SelectItem value="ig-sprint">Instagram Stories Sprint</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Posted Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !contentDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {contentDate ? format(contentDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={contentDate} onSelect={setContentDate} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Add Content →</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Content;
