import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Trash2, QrCode, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const recentLinks = [
  { source: "tiktok", medium: "affiliate", campaign: "q1-push", clicks: 1245, installs: 234, date: "Feb 28, 2026" },
  { source: "youtube", medium: "affiliate", campaign: "review-program", clicks: 876, installs: 189, date: "Feb 20, 2026" },
  { source: "instagram", medium: "affiliate", campaign: "stories-sprint", clicks: 432, installs: 67, date: "Feb 14, 2026" },
  { source: "newsletter", medium: "email", campaign: "feb-digest", clicks: 198, installs: 34, date: "Feb 10, 2026" },
  { source: "blog", medium: "affiliate", campaign: "seo-backlinks", clicks: 87, installs: 12, date: "Feb 3, 2026" },
];

const UtmTracking: React.FC = () => {
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("affiliate");
  const [campaign, setCampaign] = useState("");
  const [content, setContent] = useState("");
  const [term, setTerm] = useState("");
  const [copiedMain, setCopiedMain] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showQr, setShowQr] = useState(false);

  const baseUrl = "https://komisi.io/go/mindfulapp";

  const generatedUrl = (() => {
    if (!source) return "";
    const params = new URLSearchParams();
    params.set("utm_source", source);
    if (medium) params.set("utm_medium", medium);
    if (campaign) params.set("utm_campaign", campaign);
    if (content) params.set("utm_content", content);
    if (term) params.set("utm_term", term);
    return `${baseUrl}?${params.toString()}`;
  })();

  const handleCopyMain = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    setCopiedMain(true);
    setTimeout(() => setCopiedMain(false), 2000);
  };

  const handleCopyRecent = (idx: number) => {
    const l = recentLinks[idx];
    const params = new URLSearchParams({ utm_source: l.source, utm_medium: l.medium, utm_campaign: l.campaign });
    navigator.clipboard.writeText(`${baseUrl}?${params.toString()}`);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <DashboardLayout activeItem="UTM Tracking">
      <div className="px-8 py-6 max-w-[1200px]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">UTM Tracking</h1>
          <p className="text-sm text-text-secondary mt-1">Build tracked links and monitor UTM performance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Builder (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">UTM Link Builder</h2>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Base URL</Label>
                  <Input value={baseUrl} disabled className="font-mono text-text-secondary bg-muted" />
                </div>
                <div className="space-y-1.5">
                  <Label>Source *</Label>
                  <Input placeholder="e.g., tiktok, youtube, newsletter" value={source} onChange={(e) => setSource(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Medium *</Label>
                  <Input placeholder="e.g., affiliate, email, cpc" value={medium} onChange={(e) => setMedium(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Campaign</Label>
                  <Input placeholder="e.g., spring-push, q1-review" value={campaign} onChange={(e) => setCampaign(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Content <span className="text-text-tertiary">(optional)</span></Label>
                    <Input placeholder="e.g., video-5apps, banner-v2" value={content} onChange={(e) => setContent(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Term <span className="text-text-tertiary">(optional)</span></Label>
                    <Input placeholder="e.g., meditation, fitness" value={term} onChange={(e) => setTerm(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Link Preview */}
            <div className="bg-muted rounded-xl p-5 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">Generated Link</h3>
              {generatedUrl ? (
                <>
                  <div className="bg-card rounded-lg border border-border p-3 mb-4 overflow-x-auto">
                    <p className="text-sm font-mono text-foreground break-all">{generatedUrl}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="sm" onClick={handleCopyMain}>
                      {copiedMain ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Link</>}
                    </Button>
                    <Button variant="secondary" size="sm" onClick={() => setShowQr(!showQr)}>
                      <QrCode size={14} /> {showQr ? "Hide QR" : "Generate QR Code"}
                    </Button>
                  </div>
                  {showQr && (
                    <div className="mt-4 flex justify-center">
                      <div className="bg-card rounded-xl border border-border p-4 inline-block">
                        <QRCodeSVG value={generatedUrl} size={180} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-text-tertiary italic">Enter at least a source to generate a link.</p>
              )}
            </div>
          </div>

          {/* Right: Recent Links (2/5) */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent UTM Links</h2>
              <div className="space-y-0.5">
                {recentLinks.map((link, idx) => (
                  <div key={idx} className="py-3 border-b border-muted last:border-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-mono bg-muted text-foreground rounded px-1.5 py-0.5">{link.source}</span>
                          <span className="text-text-tertiary text-xs">/</span>
                          <span className="text-xs font-mono bg-muted text-foreground rounded px-1.5 py-0.5">{link.medium}</span>
                          <span className="text-text-tertiary text-xs">/</span>
                          <span className="text-xs font-mono bg-muted text-foreground rounded px-1.5 py-0.5">{link.campaign}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-text-secondary">
                          <span>{link.clicks.toLocaleString()} clicks</span>
                          <span>{link.installs} installs</span>
                          <span className="text-text-tertiary">{link.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopyRecent(idx)}>
                          {copiedIdx === idx ? <Check size={13} className="text-[hsl(var(--success))]" /> : <Copy size={13} />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-text-tertiary hover:text-destructive">
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UtmTracking;
