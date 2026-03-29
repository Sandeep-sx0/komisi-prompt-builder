import React, { useState } from "react";
import { DashboardLayout } from "@/components/komisi/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ChipSelector } from "@/components/komisi/ChipSelector";
import { X, ArrowLeft, Star, Users, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const apps = [
  { name: "MindfulApp", category: "Health & Fitness", commission: "30% rev share", stars: 4.8, ratings: "2.1K", affiliates: 12, icon: "🧘", cat: "health" },
  { name: "FocusTimer", category: "Productivity", commission: "$5/install", stars: 4.6, ratings: "1.8K", affiliates: 4, icon: "⏱", cat: "productivity" },
  { name: "DailyYoga", category: "Health & Fitness", commission: "25% rev share", stars: 4.7, ratings: "3.2K", affiliates: 8, icon: "🧘‍♀️", cat: "health" },
  { name: "SleepWell", category: "Health & Fitness", commission: "$3/install", stars: 4.5, ratings: "900", affiliates: 2, icon: "😴", cat: "health" },
  { name: "CodeSnap", category: "Productivity", commission: "20% rev share", stars: 4.4, ratings: "1.2K", affiliates: 6, icon: "💻", cat: "productivity" },
  { name: "LangMaster", category: "Education", commission: "35% rev share", stars: 4.8, ratings: "4.5K", affiliates: 15, icon: "🌍", cat: "education" },
  { name: "PhotoStack", category: "Photo & Video", commission: "$4/install", stars: 4.3, ratings: "800", affiliates: 3, icon: "📸", cat: "photo" },
  { name: "BudgetBoss", category: "Finance", commission: "25% rev share", stars: 4.6, ratings: "2.0K", affiliates: 5, icon: "💰", cat: "finance" },
];

const CreatorMarketplace = () => {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);

  const filtered = apps.filter(a => {
    if (category !== "all" && category !== "recommended" && a.cat !== category) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const recommended = apps.slice(0, 4);
  const app = apps.find(a => a.name === selectedApp);

  return (
    <DashboardLayout activeItem="Marketplace" userType="creator">
      <div className="px-8 py-8 max-w-[1200px]">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">App Marketplace</h1>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search apps..." className="h-9 w-[320px] px-3 text-sm bg-card border border-border outline-none focus:border-foreground" />
        </div>

        {/* Category chips */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {[
            { value: "all", label: "All" },
            { value: "recommended", label: "✦ AI Recommended" },
            { value: "health", label: "Health & Fitness" },
            { value: "productivity", label: "Productivity" },
            { value: "education", label: "Education" },
            { value: "finance", label: "Finance" },
            { value: "photo", label: "Photo & Video" },
          ].map((c) => (
            <button key={c.value} onClick={() => setCategory(c.value)} className={cn("h-9 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-all border", category === c.value ? "bg-primary text-primary-foreground border-transparent" : "bg-card text-text-secondary border-border hover:border-[hsl(var(--border-hover))]")}>{c.label}</button>
          ))}
        </div>

        {/* Recommended Section */}
        {(category === "all" || category === "recommended") && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base font-semibold text-foreground">✦ Recommended for You</h2>
              <span className="text-xs text-text-tertiary">(Based on your profile)</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {recommended.map((a) => (
                <div key={a.name} onClick={() => { setSelectedApp(a.name); setApplied(false); setShowApplyForm(false); }} className="bg-card border border-border p-5 hover:border-[hsl(var(--border-hover))] transition-colors cursor-pointer">
                  <div className="text-4xl mb-3">{a.icon}</div>
                  <h3 className="text-base font-semibold text-foreground">{a.name}</h3>
                  <p className="text-xs text-text-secondary">{a.category}</p>
                  <div className="mt-3 space-y-1">
                    <div className="text-sm font-medium text-foreground">{a.commission}</div>
                    <div className="text-xs text-text-secondary flex items-center gap-1"><Star size={12} className="text-warning fill-warning" /> {a.stars} ({a.ratings})</div>
                    <div className="text-xs text-text-tertiary">{a.affiliates} affiliates</div>
                  </div>
                  <Button variant="secondary" size="sm" className="w-full mt-4">View & Apply →</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Apps */}
        {category !== "recommended" && (
          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">All Apps</h2>
            <div className="grid grid-cols-4 gap-3">
              {filtered.map((a) => (
                <div key={a.name} onClick={() => { setSelectedApp(a.name); setApplied(false); setShowApplyForm(false); }} className="bg-card border border-border p-5 hover:border-[hsl(var(--border-hover))] transition-colors cursor-pointer">
                  <div className="text-4xl mb-3">{a.icon}</div>
                  <h3 className="text-base font-semibold text-foreground">{a.name}</h3>
                  <p className="text-xs text-text-secondary">{a.category}</p>
                  <div className="mt-3 space-y-1">
                    <div className="text-sm font-medium text-foreground">{a.commission}</div>
                    <div className="text-xs text-text-secondary flex items-center gap-1"><Star size={12} className="text-warning fill-warning" /> {a.stars} ({a.ratings})</div>
                    <div className="text-xs text-text-tertiary">{a.affiliates} affiliates</div>
                  </div>
                  <Button variant="secondary" size="sm" className="w-full mt-4">View & Apply →</Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* App Detail Slide-Out */}
      {app && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedApp(null)} />
          <div className="fixed right-0 top-0 h-full w-[560px] bg-card border-l border-border shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <button onClick={() => setSelectedApp(null)} className="text-sm text-text-secondary hover:text-foreground flex items-center gap-1"><ArrowLeft size={16} /> Back</button>
              <button onClick={() => setSelectedApp(null)} className="text-text-tertiary hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="px-6 py-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">{app.icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground">{app.name}</h2>
                  <p className="text-sm text-text-secondary">{app.category} · iOS + Android</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm flex items-center gap-1"><Star size={14} className="text-warning fill-warning" /> {app.stars} ({app.ratings} ratings)</span>
                    <span className="text-xs text-text-tertiary">· 500K+ downloads</span>
                  </div>
                </div>
                {!applied && <Button onClick={() => setShowApplyForm(true)}>Apply Now →</Button>}
              </div>

              <p className="text-sm text-text-secondary mb-6">"Guided meditation and mindfulness exercises for daily wellness."</p>

              <div className="border-t border-border pt-6 mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Commission Details</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "30%", label: "First Purchase" },
                    { value: "20%", label: "Recurring (12mo)" },
                    { value: "30 days", label: "Attribution Window" },
                  ].map(s => (
                    <div key={s.label} className="bg-background-subtle p-3 text-center">
                      <div className="text-lg font-semibold text-foreground">{s.value}</div>
                      <div className="text-xs text-text-secondary">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Program Details</h3>
                <div className="space-y-2 text-sm text-text-secondary">
                  <p><strong className="text-foreground">Subscription:</strong> $9.99/mo or $59.99/yr</p>
                  <p><strong className="text-foreground">Avg Revenue Per Install:</strong> $4.20</p>
                  <p><strong className="text-foreground">Active Affiliates:</strong> {app.affiliates}</p>
                  <p><strong className="text-foreground">Approval:</strong> Manual (24-48 hours)</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">What They're Looking For</h3>
                <p className="text-sm text-text-secondary italic">"Health, wellness, and productivity creators with engaged audiences of 10K+. Authentic, personal recommendation-style content performs best."</p>
              </div>

              {showApplyForm && !applied && (
                <div className="border-t border-border pt-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Why should they pick you? (optional)</label>
                    <textarea rows={3} placeholder="I have 120K followers focused on wellness..." className="w-full px-3 py-2 text-sm bg-card border border-border outline-none resize-y" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Your primary content platform</label>
                    <div className="flex gap-2">
                      {["TikTok", "YouTube", "Blog", "Other"].map(p => (
                        <button key={p} className="h-9 px-4 rounded-full border border-border text-sm font-medium text-text-secondary hover:bg-background-subtle">{p}</button>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full" size="lg" onClick={() => setApplied(true)}>Submit Application →</Button>
                </div>
              )}

              {applied && (
                <div className="border-t border-border pt-6 text-center">
                  <div className="text-success text-lg font-semibold">Application submitted!</div>
                  <p className="text-sm text-text-secondary mt-1">You'll hear back within 24-48 hours.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default CreatorMarketplace;