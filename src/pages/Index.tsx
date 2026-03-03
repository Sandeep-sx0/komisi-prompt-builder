import React, { useState, useEffect } from "react";
import { KomisiLogo } from "@/components/komisi/KomisiLogo";
import { ButtonsSection } from "./sections/ButtonsSection";
import { InputsSection } from "./sections/InputsSection";
import { CardsSection } from "./sections/CardsSection";
import { BadgesSection } from "./sections/BadgesSection";
import { NavigationSection } from "./sections/NavigationSection";
import { TablesSection } from "./sections/TablesSection";
import { ModalsSection } from "./sections/ModalsSection";
import { ToastsSection } from "./sections/ToastsSection";
import { OnboardingBarSection } from "./sections/OnboardingBarSection";
import { AILoadingSection } from "./sections/AILoadingSection";
import { EmptyStatesSection } from "./sections/EmptyStatesSection";
import { ChartsSection } from "./sections/ChartsSection";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  { id: "logo", label: "Logo" },
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "cards", label: "Cards" },
  { id: "badges", label: "Badges" },
  { id: "navigation", label: "Navigation" },
  { id: "tables", label: "Tables" },
  { id: "modals", label: "Modals" },
  { id: "toasts", label: "Toasts" },
  { id: "onboarding", label: "Onboarding Bar" },
  { id: "ai-loading", label: "AI Loading" },
  { id: "empty", label: "Empty States" },
  { id: "charts", label: "Charts" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("logo");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-background-subtle fixed top-0 left-0 h-screen overflow-y-auto">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <KomisiLogo size="md" />
            <p className="text-xs text-text-tertiary mt-1">Design System</p>
          </div>
          <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-muted text-text-secondary hover:text-foreground transition-colors">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={cn(
                "w-full text-left px-3 h-8 rounded-md text-sm font-medium transition-all",
                activeSection === s.id
                  ? "bg-card text-foreground shadow-sm border border-border/50"
                  : "text-text-secondary hover:bg-muted hover:text-foreground"
              )}
            >
              {s.label}
            </button>
          ))}
        </nav>
        {/* Screen links */}
        <div className="p-3 border-t border-border mt-2">
          <p className="text-[11px] uppercase tracking-[0.08em] font-semibold text-text-tertiary px-3 pb-2">Screens</p>
          {[
            { label: "Login", href: "/login" },
            { label: "Sign Up", href: "/signup" },
            { label: "Verify Email", href: "/verify-email" },
            { label: "Onboarding", href: "/onboarding" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Campaigns", href: "/campaigns" },
          ].map((s) => (
            <Link key={s.href} to={s.href} className="block w-full text-left px-3 h-8 rounded-md text-sm font-medium text-text-secondary hover:bg-muted hover:text-foreground transition-all leading-8">
              {s.label}
            </Link>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="ml-60 flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-12 space-y-20">
          {/* Logo Section */}
          <section id="logo">
            <SectionHeader title="Logo & Brand Mark" desc="The Komisi wordmark with sparkle brand mark." />
            <div className="bg-background-subtle rounded-xl p-8 flex items-center gap-12">
              <KomisiLogo size="sm" />
              <KomisiLogo size="md" />
              <KomisiLogo size="lg" />
            </div>
          </section>

          <section id="buttons"><ButtonsSection /></section>
          <section id="inputs"><InputsSection /></section>
          <section id="cards"><CardsSection /></section>
          <section id="badges"><BadgesSection /></section>
          <section id="navigation"><NavigationSection /></section>
          <section id="tables"><TablesSection /></section>
          <section id="modals"><ModalsSection /></section>
          <section id="toasts"><ToastsSection /></section>
          <section id="onboarding"><OnboardingBarSection /></section>
          <section id="ai-loading"><AILoadingSection /></section>
          <section id="empty"><EmptyStatesSection /></section>
          <section id="charts"><ChartsSection /></section>
        </div>
      </main>
    </div>
  );
};

export const SectionHeader: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-foreground tracking-tighter">{title}</h2>
    <p className="text-sm text-text-secondary mt-1">{desc}</p>
  </div>
);

export default Index;
