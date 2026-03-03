import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import { Plus, Copy, X, QrCode, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

const links = [
  { name: "Default Link", url: "https://komisi.io/go/mindfulapp?ref=sarahcreates" },
  { name: "TikTok Bio Link", url: "https://komisi.io/go/mindfulapp?ref=sarahcreates&src=tiktok" },
  { name: "YouTube Description Link", url: "https://komisi.io/go/mindfulapp?ref=sarahcreates&src=youtube" },
];

const CreatorLinks = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [qrLink, setQrLink] = useState(links[0].url);
  const [qrSize, setQrSize] = useState("m");
  const [codeEditing, setCodeEditing] = useState(false);
  const [refCode, setRefCode] = useState("SARAH30");

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const qrSizes = { s: 120, m: 200, l: 280 };

  return (
    <DashboardLayout activeItem="My Links" userType="creator">
      <div className="px-8 py-6 max-w-[1200px]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tighter text-foreground">My Links & Assets</h1>
          <Button onClick={() => setCreateOpen(true)}><Plus size={14} /> Create Link</Button>
        </div>

        {/* Program selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-1.5">Select Program:</label>
          <select className="h-11 w-full max-w-xs px-4 text-sm bg-card border border-border rounded-xl outline-none focus:border-foreground">
            <option>🧘 MindfulApp</option>
            <option>⏱ FocusTimer</option>
            <option>🧘‍♀️ DailyYoga</option>
          </select>
        </div>

        {/* Links */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Affiliate Links</h2>
          <div className="space-y-3">
            {links.map((l) => (
              <div key={l.name}>
                <label className="block text-xs text-text-tertiary mb-1">{l.name}</label>
                <div className="flex items-center gap-2 bg-background-subtle rounded-lg px-4 py-3">
                  <span className="font-mono text-sm text-foreground flex-1 truncate">{l.url}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(l.url, l.name)}>
                    {copied === l.name ? <span className="text-success text-xs">Copied!</span> : <><Copy size={14} /> Copy</>}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setQrLink(l.url)}><QrCode size={14} /> QR</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Code */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Referral Code</h2>
          <div className="text-center py-4">
            {codeEditing ? (
              <div className="flex items-center justify-center gap-2">
                <input value={refCode} onChange={e => setRefCode(e.target.value.toUpperCase())} className="text-2xl font-bold tracking-widest font-mono text-center w-40 h-12 border border-border rounded-lg outline-none focus:border-foreground" />
                <Button size="sm" onClick={() => setCodeEditing(false)}>Save</Button>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold tracking-[0.1em] font-mono text-foreground">{refCode}</div>
                <p className="text-sm text-text-secondary mt-2">Users enter this code in-app for attribution.</p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(refCode, "code")}>
                    {copied === "code" ? <span className="text-success text-xs">Copied!</span> : <><Copy size={14} /> Copy</>}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setCodeEditing(true)}>Edit Code</Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* QR Code Generator */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">QR Code Generator</h2>
          <div className="flex gap-8">
            <div className="flex items-center justify-center">
              <QRCodeSVG value={qrLink} size={qrSizes[qrSize as keyof typeof qrSizes]} />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Link</label>
                <select value={qrLink} onChange={e => setQrLink(e.target.value)} className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none">
                  {links.map(l => <option key={l.name} value={l.url}>{l.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Size</label>
                <div className="flex gap-2">
                  {["s", "m", "l"].map(s => (
                    <button key={s} onClick={() => setQrSize(s)} className={cn("h-9 px-4 rounded-full border text-sm font-medium uppercase transition-all", qrSize === s ? "bg-primary text-primary-foreground border-transparent" : "bg-card text-text-secondary border-border")}>{s}</button>
                  ))}
                </div>
              </div>
              <Button variant="secondary"><Download size={14} /> Download QR Code</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Link Modal */}
      {createOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setCreateOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border rounded-xl p-6 shadow-lg z-50 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Create Custom Link</h2>
              <button onClick={() => setCreateOpen(false)} className="text-text-tertiary hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-foreground mb-1.5">Link Name</label><input placeholder='e.g., "TikTok Bio Spring"' className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none focus:border-foreground" /></div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Platform</label>
                <div className="flex gap-2">
                  {["TikTok", "YouTube", "Instagram", "Blog", "Custom"].map(p => (
                    <button key={p} className="h-9 px-4 rounded-full border border-border text-sm font-medium text-text-secondary hover:bg-background-subtle">{p}</button>
                  ))}
                </div>
              </div>
              <div><label className="block text-sm font-medium text-foreground mb-1.5">Custom UTM Source (optional)</label><input placeholder="tiktok-bio" className="w-full h-10 px-3 text-sm bg-card border border-border rounded-lg outline-none focus:border-foreground" /></div>
              <div className="bg-background-subtle rounded-lg p-3">
                <p className="text-xs text-text-tertiary mb-1">Generated Link:</p>
                <p className="font-mono text-xs text-foreground">https://komisi.io/go/mindfulapp?ref=sarahcreates&src=tiktok-bio</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="ghost" onClick={() => setCreateOpen(false)}>Cancel</Button>
              <Button onClick={() => setCreateOpen(false)}>Create Link →</Button>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default CreatorLinks;
