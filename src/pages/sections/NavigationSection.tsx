import React from "react";
import { SectionHeader } from "@/pages/Index";
import { Home, BarChart3, Smartphone, Target, Users, FileText, Wallet, Link2, Settings, BookOpen, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import { KomisiLogo } from "@/components/komisi/KomisiLogo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const navItems = [
  { section: "OVERVIEW", items: [
    { icon: Home, label: "Dashboard", active: true },
    { icon: BarChart3, label: "Analytics" },
  ]},
  { section: "MANAGE", items: [
    { icon: Smartphone, label: "Apps" },
    { icon: Target, label: "Campaigns" },
    { icon: Users, label: "Affiliates", badge: "3" },
    { icon: FileText, label: "Content" },
  ]},
  { section: "REVENUE", items: [
    { icon: Wallet, label: "Payouts", badge: "2" },
    { icon: Link2, label: "UTM Tracking" },
  ]},
];

const bottomItems = [
  { icon: Settings, label: "Settings" },
  { icon: BookOpen, label: "Docs" },
  { icon: MessageCircle, label: "Support" },
];

export const NavigationSection = () => (
  <div>
    <SectionHeader title="Navigation" desc="Sidebar navigation and horizontal tab bar." />
    <div className="bg-background-subtle rounded-xl p-8 space-y-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 bg-background-subtle border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border">
            <KomisiLogo size="sm" />
            <button className="mt-3 w-full h-8 rounded-lg border border-border bg-card text-sm text-foreground px-3 text-left flex items-center justify-between">
              MindfulApp <span className="text-text-tertiary text-xs">▾</span>
            </button>
          </div>
          <div className="p-3">
            <Button variant="secondary" size="sm" className="w-full mb-4">
              <Plus size={14} /> Create Campaign
            </Button>
            {navItems.map((group) => (
              <div key={group.section}>
                <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-text-tertiary px-3 pt-4 pb-2">{group.section}</div>
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    className={cn(
                      "w-full h-9 px-3 rounded-md text-sm font-medium flex items-center gap-2 transition-all",
                      item.active
                        ? "bg-card text-foreground shadow-sm border border-border/50"
                        : "text-text-secondary hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-border p-3 mt-2">
            {bottomItems.map((item) => (
              <button key={item.label} className="w-full h-9 px-3 rounded-md text-sm font-medium flex items-center gap-2 text-text-secondary hover:bg-muted hover:text-foreground">
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-border p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">SC</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">Sarah Chen</div>
              <div className="text-xs text-text-tertiary truncate">sarah@mindful.app</div>
            </div>
            <BadgeStatus variant="neutral">Free</BadgeStatus>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-3">Horizontal Tab Bar</p>
          <div className="flex gap-6 border-b border-border">
            {["General", "Integrations", "Billing", "Team", "API Keys"].map((tab, i) => (
              <button
                key={tab}
                className={cn(
                  "text-sm font-medium pb-3 border-b-2 transition-all",
                  i === 0 ? "text-foreground border-foreground" : "text-text-secondary border-transparent hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
