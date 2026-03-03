import React from "react";
import { SectionHeader } from "@/pages/Index";
import { MetricCard, WatercolorCard } from "@/components/komisi/Cards";
import { DollarSign, Users, TrendingUp, Eye, BarChart3, Smartphone, Target, Zap, Star } from "lucide-react";

export const CardsSection = () => (
  <div>
    <SectionHeader title="Cards" desc="Metric, watercolor feature, app, and testimonial cards." />
    <div className="space-y-8">
      {/* Metric Cards */}
      <div>
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-3">Metric Cards</p>
        <div className="grid grid-cols-4 gap-4">
          <MetricCard icon={<DollarSign size={20} />} value="$12,450" label="Revenue" trend={{ value: "12.5%", positive: true }} />
          <MetricCard icon={<Users size={20} />} value="1,234" label="Active Affiliates" trend={{ value: "8.2%", positive: true }} />
          <MetricCard icon={<TrendingUp size={20} />} value="3.2%" label="Conversion Rate" trend={{ value: "0.4%", positive: false }} />
          <MetricCard icon={<Eye size={20} />} value="45.2K" label="Link Clicks" trend={{ value: "23.1%", positive: true }} />
        </div>
      </div>

      {/* Watercolor Feature Cards */}
      <div>
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-3">Watercolor Feature Cards</p>
        <div className="grid grid-cols-4 gap-4">
          <WatercolorCard watercolor="blue" icon={<BarChart3 size={24} />} title="Analytics" description="Real-time performance tracking across all channels." />
          <WatercolorCard watercolor="pink" icon={<Smartphone size={24} />} title="Mobile SDK" description="One lightweight SDK. Five minutes. Full attribution." />
          <WatercolorCard watercolor="green" icon={<Target size={24} />} title="Smart Matching" description="AI matches your app with the best creators." />
          <WatercolorCard watercolor="yellow" icon={<Zap size={24} />} title="Instant Payouts" description="Automated commission payouts via Stripe Connect." />
        </div>
      </div>

      {/* App Card */}
      <div>
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-3">App Cards</p>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: "MindfulApp", category: "Health", commission: "30%", rating: 4.8, affiliates: 48 },
            { name: "FocusTimer", category: "Productivity", commission: "25%", rating: 4.6, affiliates: 32 },
            { name: "LearnFlow", category: "Education", commission: "35%", rating: 4.9, affiliates: 67 },
            { name: "FitTrack Pro", category: "Fitness", commission: "20%", rating: 4.5, affiliates: 21 },
          ].map((app) => (
            <div key={app.name} className="bg-card border border-border rounded-xl p-4 hover:shadow-sm hover:-translate-y-px transition-all">
              <div className="w-12 h-12 rounded-xl bg-background-subtle border border-border flex items-center justify-center text-text-secondary mb-3">
                <Smartphone size={20} />
              </div>
              <div className="font-semibold text-foreground">{app.name}</div>
              <span className="inline-block mt-1 text-xs bg-muted text-text-secondary rounded-full px-2 py-0.5">{app.category}</span>
              <div className="mt-3 text-sm text-text-secondary">{app.commission} commission</div>
              <div className="flex items-center gap-2 mt-1 text-xs text-text-tertiary">
                <Star size={12} className="text-warning fill-warning" /> {app.rating} · {app.affiliates} affiliates
              </div>
              <button className="mt-3 text-sm font-medium text-foreground hover:underline">View →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div>
        <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-3">Testimonial Card</p>
        <div className="max-w-md watercolor-mixed rounded-xl p-6">
          <div className="w-8 h-8 rounded bg-foreground/10 mb-4" />
          <p className="text-base font-medium text-foreground">"We replaced $3,000/month in paid ads with Komisi affiliates. Our CAC dropped 60% in three months."</p>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-8 h-8 rounded-full bg-foreground/10" />
            <div>
              <div className="text-sm font-semibold text-foreground">Sarah Chen</div>
              <div className="text-sm text-text-secondary">Head of Growth, MindfulApp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
