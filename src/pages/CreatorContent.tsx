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
  Plus, ExternalLink, Copy, Eye, Download, DollarSign, TrendingUp,
  Sparkles, CalendarIcon, RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const contentItems = [
  { title: "5 Apps That Changed My Morning Routine", platform: "TikTok", posted: "Feb 14, 2026", views: "245K", installs: 234, revenue: "$890", cvr: "0.095%", utm: "source=tiktok · medium=affiliate · campaign=morning-routine", type: "tiktok" },
  { title: "MindfulApp — Honest 30-Day Review", platform: "YouTube", posted: "Feb 20, 2026", views: "89K", installs: 189, revenue: "$672", cvr: "0.21%", utm: "source=youtube · medium=affiliate · campaign=30day-review", type: "youtube" },
  { title: "My Morning Routine App Stack", platform: "Blog", posted: "Feb 22, 2026", views: "32K", installs: 98, revenue: "$334", cvr: "0.31%", utm: "source=blog · medium=affiliate · campaign=morning-stack", type: "blog" },
];

const CreatorContent = () => {
  const [filter, setFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [contentUrl, setContentUrl] = useState("");
  const [contentPlatform, setContentPlatform] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [contentAffiliate, setContentAffiliate] = useState("");
  const [contentCampaign, setContentCampaign] = useState("");
  const [contentDate, setContentDate] = useState<Date | undefined>(undefined);
  const [fetching, setFetching] = useState(false);

  const filtered = filter === "all" ? contentItems : contentItems.filter(c => c.type === filter);

  const handleCopy = (text: string) => navigator.clipboard.writeText(text);

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
    <DashboardLayout activeItem="Content Tracker" userType="creator">
      <div className="px-8 py-6 max-w-[1200px]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Content</h1>
          <div className="flex gap-2">
            <Button variant="secondary"><RefreshCw size={14} /> Refresh Stats</Button>
            <Button onClick={() => setAddOpen(true)}><Plus size={14} /> Add Content</Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-4 border-b border-border mb-6">
          {["all", "tiktok", "youtube", "blog", "instagram"].map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={cn("text-sm font-medium pb-3 border-b-2 transition-all capitalize", filter === t ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t === "all" ? "All" : t}</button>
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
                  <p className="text-sm text-text-secondary">{c.platform} · Posted {c.posted}</p>

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
                    <Button variant="ghost" size="sm">View Attribution →</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy("https://komisi.io/go/mindfulapp")}><Copy size={14} /> Copy Link</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Content Modal — same as developer */}
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
                <Label>Campaign <span className="text-text-tertiary">(optional)</span></Label>
                <Select value={contentCampaign} onValueChange={setContentCampaign}>
                  <SelectTrigger><SelectValue placeholder="Select campaign" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tiktok-q1">TikTok Q1 Push</SelectItem>
                    <SelectItem value="youtube-review">YouTube Review Program</SelectItem>
                  </SelectContent>
                </Select>
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

export default CreatorContent;
