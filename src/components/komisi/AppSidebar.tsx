import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { KomisiLogo } from "@/components/komisi/KomisiLogo";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/komisi/BadgeStatus";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Home, BarChart3, Smartphone, Target, Users, UserPlus,
  Wallet, Link2, Settings, BookOpen, MessageCircle, Plus,
  ChevronsLeft, Store, Sparkles, ChevronDown, Check, LogOut
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";

type NavItem = { icon: React.ElementType; label: string; badge?: string; href?: string; external?: boolean };
type NavGroup = { section: string; items: NavItem[] };

const devNav: NavGroup[] = [
  { section: "OVERVIEW", items: [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
  ]},
  { section: "MANAGE", items: [
    { icon: Smartphone, label: "Apps", href: "/apps" },
    { icon: Target, label: "Campaigns", href: "/campaigns" },
    { icon: Users, label: "Affiliates", badge: "3", href: "/affiliates" },
    { icon: FileText, label: "Content", href: "/content" },
  ]},
  { section: "REVENUE", items: [
    { icon: Wallet, label: "Payouts", badge: "2", href: "/payouts" },
    { icon: Link2, label: "UTM Tracking", href: "/utm-tracking" },
  ]},
];

const creatorNav: NavGroup[] = [
  { section: "OVERVIEW", items: [
    { icon: Home, label: "Dashboard", href: "/creator/dashboard" },
    { icon: BarChart3, label: "My Earnings", href: "/creator/earnings" },
  ]},
  { section: "PROMOTE", items: [
    { icon: Store, label: "Marketplace", href: "/creator/marketplace" },
    { icon: Smartphone, label: "My Programs", badge: "4", href: "/creator/programs" },
    { icon: Link2, label: "My Links", href: "/creator/links" },
  ]},
  { section: "CONTENT", items: [
    { icon: FileText, label: "Content Tracker", href: "/creator/content" },
  ]},
];

const bottomItems: NavItem[] = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: BookOpen, label: "Docs", external: true },
  { icon: MessageCircle, label: "Support" },
];

interface AppSidebarProps {
  userType?: "developer" | "creator";
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  activeItem?: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  userType = "developer",
  collapsed = false,
  onToggleCollapse,
  activeItem,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const nav = userType === "developer" ? devNav : creatorNav;
  const [appSwitcherOpen, setAppSwitcherOpen] = React.useState(false);
  const [logoutOpen, setLogoutOpen] = React.useState(false);

  const isActive = (item: NavItem) => {
    if (activeItem) return item.label === activeItem;
    if (item.href) return location.pathname === item.href;
    return false;
  };

  return (
    <aside className={cn(
      "h-screen bg-background-subtle border-r border-border flex flex-col shrink-0 transition-all duration-200 sticky top-0",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo + App Switcher */}
      <div className="p-4 border-b border-border">
        {!collapsed && <KomisiLogo size="sm" />}
        {collapsed && <Sparkles size={20} className="mx-auto text-foreground" />}
        {!collapsed && userType === "developer" && (
          <div className="relative mt-3">
            <button
              onClick={() => setAppSwitcherOpen(!appSwitcherOpen)}
              className="w-full h-8 rounded-lg border border-border bg-card text-sm text-foreground px-3 text-left flex items-center justify-between hover:border-[hsl(var(--border-hover))] transition-colors"
            >
              <span className="truncate">MindfulApp</span>
              <ChevronDown size={14} className="text-text-tertiary shrink-0" />
            </button>
            {appSwitcherOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 py-1">
                {["MindfulApp", "FocusTimer Pro"].map((app) => (
                  <button key={app} className="w-full px-3 py-2 text-sm text-left hover:bg-background-subtle flex items-center justify-between" onClick={() => setAppSwitcherOpen(false)}>
                    {app}
                    {app === "MindfulApp" && <Check size={14} className="text-success" />}
                  </button>
                ))}
                <div className="border-t border-border mt-1 pt-1">
                  <button className="w-full px-3 py-2 text-sm text-left hover:bg-background-subtle flex items-center gap-2 text-text-secondary">
                    <Plus size={14} /> Add New App
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      {!collapsed && (
        <div className="px-3 pt-3">
          <Button variant="secondary" size="sm" className="w-full" onClick={() => navigate(userType === "developer" ? "/campaigns/create" : "/creator/links")}>
            <Plus size={14} /> {userType === "developer" ? "Create Campaign" : "Get New Link"}
          </Button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 pt-1">
        {nav.map((group) => (
          <div key={group.section}>
            {!collapsed && (
              <div className="text-[11px] uppercase tracking-[0.08em] font-semibold text-text-tertiary px-3 pt-4 pb-2">{group.section}</div>
            )}
            {collapsed && <div className="h-3" />}
            <div className="space-px">
              {group.items.map((item) => {
                const active = isActive(item);
                const Wrapper = item.href ? Link : "button" as any;
                const wrapperProps = item.href ? { to: item.href } : {};
                return (
                  <Wrapper
                    key={item.label}
                    {...wrapperProps}
                    className={cn(
                      "w-full h-9 rounded-md text-sm font-medium flex items-center transition-all",
                      collapsed ? "justify-center px-0" : "px-3 gap-2",
                      active
                        ? "bg-card text-foreground shadow-sm border border-border/50"
                        : "text-text-secondary hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon size={18} />
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Wrapper>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-border px-2 py-2">
        {bottomItems.slice(0, userType === "creator" ? 2 : 3).map((item) => {
          const href = item.href === "/settings" && userType === "creator" ? "/creator/settings" : item.href;
          const Wrapper = href ? Link : "button" as any;
          const wrapperProps = href ? { to: href } : {};
          const active = href ? location.pathname === href : (activeItem === item.label);
          return (
            <Wrapper key={item.label} {...wrapperProps} className={cn(
              "w-full h-9 rounded-md text-sm font-medium flex items-center transition-all",
              collapsed ? "justify-center px-0" : "px-3 gap-2",
              active ? "bg-card text-foreground shadow-sm border border-border/50" : "text-text-secondary hover:bg-muted hover:text-foreground"
            )}>
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </Wrapper>
          );
        })}
      </div>

      {/* User */}
      <div className="border-t border-border p-3">
        {collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">SC</div>
            <button onClick={() => setLogoutOpen(true)} className="text-text-tertiary hover:text-destructive transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground shrink-0">SC</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">
                {userType === "developer" ? "Sandeep Kumar" : "Sarah Creates"}
              </div>
              <div className="text-xs text-text-tertiary truncate">
                {userType === "developer" ? "sandeep@upturn.ae" : "@sarahcreates"}
              </div>
            </div>
            {userType === "developer" ? (
              <BadgeStatus variant="neutral">Free</BadgeStatus>
            ) : (
              <span className="text-xs text-[hsl(var(--success))] font-medium whitespace-nowrap">$890</span>
            )}
            <button onClick={() => setLogoutOpen(true)} className="text-text-tertiary hover:text-destructive transition-colors shrink-0 ml-1">
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Logout Confirmation */}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Log out of Komisi?</DialogTitle>
            <DialogDescription>You'll need to sign in again to access your account.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setLogoutOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { setLogoutOpen(false); navigate("/login"); }}>Log Out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Collapse Toggle */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className="border-t border-border h-10 flex items-center justify-center text-text-tertiary hover:text-foreground transition-colors"
        >
          <ChevronsLeft size={18} className={cn("transition-transform", collapsed && "rotate-180")} />
        </button>
      )}
    </aside>
  );
};
