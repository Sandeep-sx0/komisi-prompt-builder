import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { Plus, Eye, Copy, X } from "lucide-react";
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

const Settings = () => {
  const [tab, setTab] = useState("billing");
  const [showLive, setShowLive] = useState(false);
  const [showTest, setShowTest] = useState(false);

  return (
    <DashboardLayout activeItem="Settings">
      <div className="px-8 py-6 max-w-[1200px]">
        <h1 className="text-2xl font-bold tracking-tighter text-foreground mb-6">Settings</h1>

        <div className="flex gap-4 border-b border-border mb-6 overflow-x-auto">
          {["Your Profile", "Company", "Billing", "Team", "Integrations", "API Keys", "Webhooks"].map((t) => (
            <button key={t} onClick={() => setTab(t.toLowerCase().replace(/ /g, ""))} className={cn("text-sm font-medium pb-3 border-b-2 transition-all whitespace-nowrap", tab === t.toLowerCase().replace(/ /g, "") ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground")}>{t}</button>
          ))}
        </div>

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

            {/* Team */}
            <div className="col-span-5 mt-2">
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-6 pb-3">
                  <h2 className="text-lg font-semibold text-foreground">Team Members (1)</h2>
                  <Button variant="secondary" size="sm"><Plus size={14} /> Add Member</Button>
                </div>
                <table className="w-full">
                  <thead><tr className="bg-background-subtle">
                    {["Member", "Role", "Actions"].map(h => <th key={h} className="text-left text-xs uppercase tracking-wider font-semibold text-text-secondary h-10 px-6">{h}</th>)}
                  </tr></thead>
                  <tbody>
                    <tr className="border-b border-muted">
                      <td className="px-6 h-14 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">SK</div>
                        <div><div className="text-sm font-medium text-foreground">Sandeep Kumar (You)</div><div className="text-xs text-text-tertiary">sandeep@upturn.ae</div></div>
                      </td>
                      <td className="px-6 h-14"><BadgeStatus variant="active">Owner</BadgeStatus></td>
                      <td className="px-6 h-14 text-sm text-text-tertiary">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

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
                    <div key={item.name} className={cn("bg-card border border-border rounded-xl p-5 flex items-center gap-4", item.connected && "border-l-[3px] border-l-success")}>
                      <div className="w-10 h-10 rounded-lg bg-background-subtle flex items-center justify-center text-sm font-bold text-text-secondary shrink-0">{item.name[0]}</div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-foreground">{item.name}</div>
                        <div className="text-xs text-text-secondary">{item.desc}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className={cn("w-2 h-2 rounded-full", item.connected ? "bg-success" : "bg-error")} />
                          <span className={cn("text-xs", item.connected ? "text-success" : "text-error")}>{item.connected ? "Connected" : "Not Connected"}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {item.connected ? (
                          <>
                            <Button variant="secondary" size="sm">Manage</Button>
                            <Button variant="ghost" size="sm" className="text-error">Disconnect</Button>
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

        {tab === "apikeys" && (
          <div className="space-y-4">
            <div className="bg-warning-light border border-warning/30 rounded-lg p-4 text-sm flex items-center gap-2">
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
                  <Button variant="ghost" size="sm" className="text-error">Revoke</Button>
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
