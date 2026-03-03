import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { Copy, Plus, ExternalLink, QrCode } from "lucide-react";

const utmLinks = [
  {
    name: "TikTok Q1 Push",
    url: "https://komisi.io/go/mindfulapp?utm_source=tiktok&utm_medium=affiliate&utm_campaign=q1-push",
    source: "tiktok",
    medium: "affiliate",
    campaign: "q1-push",
    clicks: 1245,
    installs: 234,
    revenue: "$890",
    status: "active" as const,
  },
  {
    name: "YouTube Review Program",
    url: "https://komisi.io/go/mindfulapp?utm_source=youtube&utm_medium=affiliate&utm_campaign=review-program",
    source: "youtube",
    medium: "affiliate",
    campaign: "review-program",
    clicks: 876,
    installs: 189,
    revenue: "$672",
    status: "active" as const,
  },
  {
    name: "Instagram Stories Sprint",
    url: "https://komisi.io/go/mindfulapp?utm_source=instagram&utm_medium=affiliate&utm_campaign=stories-sprint",
    source: "instagram",
    medium: "affiliate",
    campaign: "stories-sprint",
    clicks: 432,
    installs: 67,
    revenue: "$234",
    status: "active" as const,
  },
  {
    name: "Blog SEO Backlinks",
    url: "https://komisi.io/go/mindfulapp?utm_source=blog&utm_medium=affiliate&utm_campaign=seo-backlinks",
    source: "blog",
    medium: "affiliate",
    campaign: "seo-backlinks",
    clicks: 198,
    installs: 34,
    revenue: "$112",
    status: "paused" as const,
  },
];

const UtmTracking: React.FC = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (url: string, idx: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <DashboardLayout activeItem="UTM Tracking">
      <div className="px-8 py-6 max-w-[1200px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">UTM Tracking</h1>
            <p className="text-sm text-text-secondary mt-1">Monitor all your tracked links and UTM parameters in one place.</p>
          </div>
          <Button>
            <Plus size={16} /> Create UTM Link
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Clicks", value: "2,751" },
            { label: "Total Installs", value: "524" },
            { label: "Overall CVR", value: "19.0%" },
            { label: "Active Links", value: "3" },
          ].map((m) => (
            <div key={m.label} className="bg-card border border-border rounded-xl p-5">
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
              <p className="text-sm text-text-secondary">{m.label}</p>
            </div>
          ))}
        </div>

        {/* UTM Link Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-background-subtle">
                <th className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-6">Link Name</th>
                <th className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-4">Source</th>
                <th className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-4">Medium</th>
                <th className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-4">Campaign</th>
                <th className="text-right text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-4">Clicks</th>
                <th className="text-right text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-4">Installs</th>
                <th className="text-right text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-4">Revenue</th>
                <th className="text-center text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-4">Status</th>
                <th className="text-right text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {utmLinks.map((link, idx) => (
                <tr key={idx} className="border-b border-muted hover:bg-background-subtle transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-foreground">{link.name}</div>
                    <div className="text-xs text-text-tertiary font-mono mt-0.5 truncate max-w-[280px]">{link.url}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-foreground font-mono bg-muted rounded px-2 py-0.5">{link.source}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-foreground font-mono bg-muted rounded px-2 py-0.5">{link.medium}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-foreground font-mono bg-muted rounded px-2 py-0.5">{link.campaign}</span>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium text-foreground">{link.clicks.toLocaleString()}</td>
                  <td className="px-4 py-4 text-right text-sm font-medium text-foreground">{link.installs}</td>
                  <td className="px-4 py-4 text-right text-sm font-medium text-foreground">{link.revenue}</td>
                  <td className="px-4 py-4 text-center">
                    <BadgeStatus variant={link.status === "active" ? "success" : "warning"}>
                      {link.status === "active" ? "Active" : "Paused"}
                    </BadgeStatus>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopy(link.url, idx)}
                      >
                        <Copy size={14} />
                      </Button>
                      {copiedIdx === idx && (
                        <span className="text-xs text-[hsl(var(--success))] font-medium">Copied!</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UtmTracking;
