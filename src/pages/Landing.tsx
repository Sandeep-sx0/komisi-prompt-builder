import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ArrowRight, Menu, X, Twitter, Github, Linkedin,
  Link2, Download, Fingerprint, CircleDollarSign,
  Shield, Zap, CheckCircle, Copy, Check,
  Code, BarChart3, Wallet, ChevronLeft, ChevronRight,
  AlertTriangle, ExternalLink, TrendingUp, Globe,
} from "lucide-react";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";

/* ── Scroll-reveal wrapper ── */
const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ── Social proof logos ── */
const socialProofLogos = [
  { name: "Notion", src: "/logos/notion.webp" },
  { name: "Linear", src: "/logos/linear.webp" },
  { name: "Vercel", src: "/logos/vercel.webp" },
  { name: "Figma", src: "/logos/figma.webp" },
  { name: "Supabase", src: "/logos/supabase.webp" },
  { name: "PostHog", src: "/logos/posthog.webp" },
  { name: "Amplitude", src: "/logos/amplitude.webp" },
  { name: "Slack", src: "/logos/slack.webp" },
];

/* ── Code tabs data ── */
const codeExamples: Record<string, string[]> = {
  Swift: [
    "import KomisiSDK",
    "",
    "KomisiSDK.configure(",
    '  apiKey: "YOUR_API_KEY"',
    ")",
    "KomisiSDK.resolve()",
    "// ✔ Attribution active",
  ],
  Kotlin: [
    "import io.komisi.sdk.KomisiSDK",
    "",
    "KomisiSDK.configure(",
    '  apiKey = "YOUR_API_KEY"',
    ")",
    "KomisiSDK.resolve()",
    "// ✔ Attribution active",
  ],
  Flutter: [
    "import 'package:komisi_sdk/komisi_sdk.dart';",
    "",
    "await KomisiSDK.configure(",
    '  apiKey: "YOUR_API_KEY",',
    ");",
    "await KomisiSDK.resolve();",
    "// ✔ Attribution active",
  ],
  "React Native": [
    "import KomisiSDK from '@komisi/react-native-sdk';",
    "",
    "await KomisiSDK.configure({",
    "  apiKey: 'YOUR_API_KEY'",
    "});",
    "await KomisiSDK.resolve();",
    "// ✔ Attribution active",
  ],
};

/* ── Testimonial data ── */
const testimonials = [
  {
    quote: "We replaced $3,000/month in paid ads with Komisi affiliates. Our CAC dropped 60% in three months.",
    name: "Sarah Chen", title: "Head of Growth", company: "MindfulApp", initials: "SC", color: "hsl(var(--foreground))",
  },
  {
    quote: "Setup took less time than writing this testimonial. The RevenueCat integration worked out of the box.",
    name: "James Park", title: "Founder", company: "FocusTimer", initials: "JP", color: "hsl(215 16% 47%)",
  },
  {
    quote: "I can see exactly which TikTok video drove the most subscriptions. That changes how we brief creators entirely.",
    name: "Marcus Lee", title: "Growth Lead", company: "CalorieSnap", initials: "ML", color: "hsl(160 84% 39%)",
  },
  {
    quote: "The fraud detection alone paid for itself. We caught fake installs in the first week.",
    name: "Priya Nair", title: "Founder", company: "MindfulApp", initials: "PN", color: "hsl(38 92% 50%)",
  },
];

/* ── Integration data with logos ── */
const integrations = [
  { name: "RevenueCat", logo: "/logos/revenuecat.webp" },
  { name: "Adapty", logo: "/logos/adapty.webp" },
  { name: "Stripe Connect", logo: "/logos/stripe.webp" },
  { name: "Apple App Store", logo: "/logos/apple.webp" },
  { name: "Google Play", logo: "/logos/google.webp" },
  { name: "Amplitude", logo: "/logos/amplitude.webp" },
  { name: "Mixpanel", logo: "/logos/mixpanel.webp" },
  { name: "AppsFlyer", logo: "/logos/appsflyer.webp" },
  { name: "Adjust", logo: "/logos/adjust.webp" },
  { name: "Firebase", logo: "/logos/firebase.webp" },
  { name: "Braze", logo: "/logos/braze.webp" },
  { name: "Slack", logo: "/logos/slack.webp" },
  { name: "TikTok", logo: "/logos/tiktok.webp" },
  { name: "OneSignal", logo: "/logos/onesignal.webp" },
  { name: "PostHog", logo: "/logos/posthog.webp" },
];

const sdkPlatforms = [
  { name: "Swift", logo: "/logos/swift.webp" },
  { name: "Kotlin", logo: "/logos/kotlin.webp" },
  { name: "Flutter", logo: "/logos/flutter.webp" },
  { name: "React Native", logo: "/logos/react-native.webp" },
  { name: "Web API", logo: null },
  { name: "Unity", logo: "/logos/unity.webp" },
];

/* ── Syntax highlighting helper ── */
const SyntaxLine = ({ line, num }: { line: string; num: number }) => {
  const lineNum = <span className="inline-block w-6 mr-4 text-right select-none" style={{ color: "#4B5563" }}>{num}</span>;
  if (line.startsWith("//")) {
    return <div className="leading-6">{lineNum}<span style={{ color: "#6A737D" }}>{line}</span></div>;
  }
  if (line.includes("import")) {
    return <div className="leading-6">{lineNum}<span style={{ color: "#79B8FF" }}>import</span><span style={{ color: "#E1E4E8" }}>{line.replace("import", "")}</span></div>;
  }
  if (line.includes("await")) {
    const rest = line.replace("await ", "");
    return <div className="leading-6">{lineNum}<span style={{ color: "#79B8FF" }}>await </span><span style={{ color: "#E1E4E8" }}>{rest}</span></div>;
  }
  if (line.includes('"') || line.includes("'")) {
    const parts: React.ReactNode[] = [];
    let inString = false;
    let current = "";
    const quoteChar = line.includes('"') ? '"' : "'";
    for (let i = 0; i < line.length; i++) {
      if (line[i] === quoteChar) {
        if (inString) {
          parts.push(<span key={i} style={{ color: "#85E89D" }}>{quoteChar}{current}{quoteChar}</span>);
          current = "";
          inString = false;
        } else {
          parts.push(<span key={`b${i}`} style={{ color: "#E1E4E8" }}>{current}</span>);
          current = "";
          inString = true;
        }
      } else {
        current += line[i];
      }
    }
    if (current) parts.push(<span key="end" style={{ color: "#E1E4E8" }}>{current}</span>);
    return <div className="leading-6">{lineNum}{parts}</div>;
  }
  return <div className="leading-6">{lineNum}<span style={{ color: "#E1E4E8" }}>{line || "\u00A0"}</span></div>;
};

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState("Swift");
  const [copied, setCopied] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [isPaused]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeCodeTab].join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextTestimonial = () => setActiveTestimonial((p) => (p + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════════
          SECTION 1 — NAVIGATION
      ═══════════════════════════════════════════ */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      )}>
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-lg text-foreground tracking-tight font-normal">komisi</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {["Product", "Pricing", "Docs", "Marketplace"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-text-secondary hover:text-foreground transition-colors">{l}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
            <Link to="/signup"><Button size="sm">Get Started <ArrowRight size={14} /></Button></Link>
          </div>
          <button className="md:hidden text-foreground" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border p-4 space-y-2 overflow-hidden"
            >
              {["Product", "Pricing", "Docs", "Marketplace"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm py-2 text-text-secondary">{l}</a>
              ))}
              <Link to="/login"><Button variant="secondary" className="w-full mt-2">Login</Button></Link>
              <Link to="/signup"><Button className="w-full">Get Started</Button></Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════════════════════════════════════
          SECTION 2 — HERO
      ═══════════════════════════════════════════ */}
      <section className="pt-32 pb-20 px-6" id="product">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-text-secondary border border-border px-3 py-1.5 mb-6">
                ✦ Built for mobile app developers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tighter text-foreground leading-[1.05] mb-6"
            >
              Affiliate marketing<br />
              infrastructure for<br />
              mobile apps.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base text-text-secondary mb-8 max-w-[480px]"
            >
              Turn creators into your most profitable growth channel. Attribute every install, automate every payout.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 mb-4"
            >
              <Input placeholder="Enter your email" className="h-12 max-w-[280px]" />
              <Link to="/signup">
                <Button size="lg" className="h-12 px-6 border border-transparent">Get Started Free <ArrowRight size={16} /></Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center gap-4 mb-2">
              <Link to="/demo" className="text-sm text-text-secondary hover:text-foreground transition-colors">Book a Demo →</Link>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.35 }} className="text-xs text-text-tertiary mt-4">
              Trusted by 200+ indie app developers · No credit card required
            </motion.p>
          </div>

          {/* Right — product visual composite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative ml-auto max-w-[360px] p-5 border border-white/10 shadow-xl" style={{ backgroundColor: "#0C1C28" }}>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs text-white/60 tracking-wider uppercase">Komisi Dashboard</span>
                <span className="flex items-center gap-1.5 text-[10px] text-green-400">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Live
                </span>
              </div>
              <div className="space-y-3 mb-5">
                {[
                  { label: "Installs Today", value: "47", trend: "↑ 12%" },
                  { label: "Revenue Attributed", value: "$1,240", trend: "↑ 8%" },
                  { label: "Active Creators", value: "12", trend: "↑ 3" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-xs text-white/40">{m.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white">{m.value}</span>
                      <span className="text-[10px] text-green-400">{m.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-8 w-full">
                <svg viewBox="0 0 200 32" className="w-full h-full" preserveAspectRatio="none">
                  <polyline fill="none" stroke="hsl(160 84% 39%)" strokeWidth="1.5" points="0,28 20,24 40,26 60,20 80,22 100,16 120,18 140,12 160,14 180,8 200,4" />
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity="0" />
                  </linearGradient>
                  <polygon fill="url(#sparkGrad)" points="0,28 20,24 40,26 60,20 80,22 100,16 120,18 140,12 160,14 180,8 200,4 200,32 0,32" />
                </svg>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 -bottom-6 bg-background border border-border p-4 shadow-lg w-[280px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-muted flex items-center justify-center text-[10px] text-text-tertiary shrink-0">SC</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground">@sarah_creates</p>
                  <p className="text-[10px] text-text-tertiary">234 installs · $630 earned</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-600 border border-green-200 shrink-0">Active</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — SOCIAL PROOF LOGO BAR
      ═══════════════════════════════════════════ */}
      <section className="py-10 border-y border-border overflow-hidden">
        <Reveal>
          <p className="text-xs text-text-tertiary text-center mb-8 uppercase tracking-[0.15em]">
            DEVELOPERS BUILDING WITH KOMISI
          </p>
        </Reveal>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-12 items-center w-max">
            {[...socialProofLogos, ...socialProofLogos].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="shrink-0 transition-all duration-200 cursor-default"
                style={{ filter: "grayscale(100%) opacity(0.5)" }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = "none"; }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(100%) opacity(0.5)"; }}
              >
                <img src={logo.src} alt={logo.name} className="h-8 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
        <Reveal>
          <p className="text-xs text-text-tertiary text-center mt-8">
            200+ app developers trust Komisi to run their affiliate programs
          </p>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — PERSONA SPLIT
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight">
              Built for every person on your team.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1 — Developers */}
            <Reveal delay={0}>
              <div className="border border-border bg-card h-full flex flex-col">
                <div className="h-[220px] flex flex-col justify-center p-6 bg-muted">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] text-text-tertiary">①</span>
                      <span className="text-sm text-text-secondary">Configure your app</span>
                    </div>
                    <div className="border border-border bg-background p-3 ml-2">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-6 h-6 rounded-full border border-foreground bg-foreground flex items-center justify-center text-[10px] text-background">②</span>
                        <span className="text-sm text-foreground font-medium">Install Komisi SDK</span>
                      </div>
                      <pre className="text-[11px] font-mono ml-9 leading-relaxed">
                        <span style={{ color: "#79B8FF" }}>KomisiSDK</span>
                        <span className="text-foreground">.configure(</span>{"\n"}
                        <span className="text-foreground">  apiKey: </span>
                        <span style={{ color: "#85E89D" }}>"YOUR_KEY"</span>
                        <span className="text-foreground">)</span>
                      </pre>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-[10px] text-text-tertiary">③</span>
                      <span className="text-sm text-text-secondary">Attribution active</span>
                      <CheckCircle size={14} className="text-green-500" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm font-medium text-foreground mb-3">For Developers →</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["Lightweight SDK", "No IDFA", "RevenueCat integration", "Privacy-safe"].map(f => (
                      <span key={f} className="text-[10px] text-text-secondary border border-border px-2 py-1">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 2 — Growth Teams */}
            <Reveal delay={0.08}>
              <div className="border border-border bg-card h-full flex flex-col">
                <div className="bg-muted h-[220px] flex flex-col justify-center p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-text-tertiary uppercase tracking-wider">Installs</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-foreground font-medium tracking-tight">$56,823</span>
                      <span className="text-[10px] text-green-500 bg-green-50 border border-green-200 px-1.5 py-0.5">+11.4%</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-1 h-24 mt-2">
                    {[30, 38, 28, 45, 55, 42, 65, 78].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end">
                        <div className="w-full transition-all" style={{ height: `${h}%`, backgroundColor: "#0C1C28" }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {["Aug 12", "Aug 19", "Aug 26", "Sep 02", "Sep 09"].map(m => (
                      <span key={m} className="text-[7px] text-text-tertiary">{m}</span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-3">
                    {[{ c: "#0C1C28", l: "Campaign 1" }, { c: "#6B7280", l: "Campaign 2" }, { c: "#D1D5DB", l: "Campaign 3" }].map(d => (
                      <div key={d.l} className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.c }} />
                        <span className="text-[8px] text-text-tertiary">{d.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm font-medium text-foreground mb-3">For Growth Teams →</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["Campaign tracking", "Creator analytics", "CAC dashboard", "Commission tiers"].map(f => (
                      <span key={f} className="text-[10px] text-text-secondary border border-border px-2 py-1">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 3 — Creators */}
            <Reveal delay={0.16}>
              <div className="border border-border bg-card h-full flex flex-col">
                <div className="bg-muted h-[220px] flex items-center justify-center p-6 relative overflow-hidden">
                  {/* Back screen */}
                  <div className="absolute left-4 top-4 w-[180px] p-4 shadow-md" style={{ backgroundColor: "#0C1C28" }}>
                    <p className="text-[11px] text-white/90 font-medium mb-2">Earn from every install</p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: "68%" }} />
                    </div>
                    <p className="text-[9px] text-white/40 mt-1">68% of monthly goal</p>
                  </div>
                  {/* Front screen */}
                  <div className="absolute right-4 bottom-4 w-[180px] bg-background border border-border p-4 shadow-lg z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-text-tertiary">@creator</span>
                      <span className="text-[9px] px-1.5 py-0.5 bg-green-50 text-green-600 border border-green-200">Active</span>
                    </div>
                    <p className="text-xl text-foreground tracking-tight font-medium">$3,562</p>
                    <p className="text-[9px] text-text-tertiary mb-3">earned this month</p>
                    <button className="text-[10px] text-foreground border border-border px-2 py-1 hover:bg-muted transition-colors w-full text-center">
                      View Links →
                    </button>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm font-medium text-foreground mb-3">For Creators →</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {["Tracking links", "Real-time earnings", "Auto payouts", "Content analytics"].map(f => (
                      <span key={f} className="text-[10px] text-text-secondary border border-border px-2 py-1">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — STATS BAR (Dark)
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: "#0C1C28" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 2, prefix: "$", suffix: "M+", label: "Creator commissions tracked" },
            { value: 200, suffix: "+", label: "App developers" },
            { value: 60, suffix: "%", label: "Average CAC reduction" },
            { value: 99.9, suffix: "%", label: "Attribution accuracy", decimals: 1 },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={cn(
                "py-4",
                i < 3 && "md:border-r md:border-white/10"
              )}>
                <p className="text-5xl md:text-6xl text-white font-normal mb-3 tracking-tight">
                  <CountingNumber
                    number={s.value}
                    prefix={s.prefix || ""}
                    suffix={s.suffix}
                    decimalPlaces={s.decimals || 0}
                    inView
                    inViewOnce
                    transition={{ stiffness: 60, damping: 30 }}
                  />
                </p>
                <p className="text-xs uppercase tracking-wider" style={{ color: "#6B7280" }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — SDK CODE BLOCK (Dark, continues)
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#0C1C28" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-normal text-white tracking-tight leading-tight mb-6">
                Integrate in under<br />30 minutes.
              </h2>
              <p className="text-base mb-6 leading-relaxed" style={{ color: "#9CA3AF" }}>
                One SDK. Works on iOS, Android, Flutter, and React Native. Drop in 3 lines of code and Komisi handles attribution, fraud detection, and payouts automatically. No server coding required.
              </p>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 mb-10">
                Read the docs <ArrowRight size={14} />
              </a>

              <div className="bg-white/5 border border-white/10 p-6 mt-8">
                <p className="text-sm text-white/70 mb-4 leading-relaxed italic">
                  "Setup was faster than I expected. The RevenueCat integration just worked — I had my first affiliate attributed within the hour."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 flex items-center justify-center text-[10px] text-white/60 rounded-full">JP</div>
                  <div>
                    <p className="text-xs text-white/80 font-medium">James Park</p>
                    <p className="text-[10px] text-white/40">Founder, FocusTimer</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <div className="flex" style={{ backgroundColor: "#161B22" }}>
                {Object.keys(codeExamples).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={cn(
                      "px-4 py-2.5 text-xs transition-colors",
                      activeCodeTab === tab ? "bg-white text-foreground" : "text-white/40 hover:text-white/60"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative" style={{ backgroundColor: "#0D1117" }}>
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors z-10"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <pre className="p-6 text-sm overflow-x-auto font-mono">
                  {codeExamples[activeCodeTab].map((line, i) => (
                    <SyntaxLine key={`${activeCodeTab}-${i}`} line={line} num={i + 1} />
                  ))}
                </pre>
              </div>

              <div className="flex items-center justify-between px-4 py-3 border-t border-white/5" style={{ backgroundColor: "#161B22" }}>
                <div className="flex items-center gap-2">
                  <Github size={14} className="text-white/40" />
                  <span className="text-xs text-white/40">100% Open Source</span>
                </div>
                <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors inline-flex items-center gap-1">
                  View on GitHub <ExternalLink size={10} />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {sdkPlatforms.map(p => (
                  <div key={p.name} className="border border-white/10 p-3 text-center hover:border-white/25 transition-colors flex flex-col items-center gap-2" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} className="w-10 h-10 object-contain" />
                    ) : (
                      <Globe size={24} className="text-white/50" />
                    )}
                    <span className="text-[10px] text-white/50">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — FEATURE ALTERNATING SECTIONS
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto space-y-32">

          {/* Feature 1 — Attribution flow */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight leading-tight mb-4">
                  Attribute every install without IDFA or cookies.
                </h3>
                <p className="text-base text-text-secondary mb-6">
                  Komisi's SDK uses privacy-safe fingerprint matching on iOS and the Play Install Referrer API on Android. 100% deterministic on Android. 0.60–0.95 confidence scoring on iOS. No ATT prompt. No impact on your App Store privacy label.
                </p>
                <a href="#" className="text-sm text-text-secondary hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8">
                  Learn how attribution works <ArrowRight size={14} />
                </a>
                <div className="border border-border p-5 mt-4">
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed italic">
                    "We finally know which creators are actually driving installs. Komisi's attribution is the most accurate we've tested."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-muted flex items-center justify-center text-[9px] text-text-tertiary rounded-full">SC</div>
                    <div>
                      <p className="text-xs text-foreground">Sarah Chen</p>
                      <p className="text-[10px] text-text-tertiary">Head of Growth, MindfulApp</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="bg-muted border border-border p-8">
                <div className="flex items-center justify-between gap-2">
                  {[
                    { label: "Creator Link", icon: <Link2 size={14} /> },
                    { label: "App Store", icon: <Download size={14} /> },
                    { label: "Install", icon: <Download size={14} /> },
                    { label: "SDK Launch", icon: <Fingerprint size={14} /> },
                    { label: "Commission ✔", icon: <CircleDollarSign size={14} />, active: true },
                  ].map((node, i, arr) => (
                    <React.Fragment key={node.label}>
                      <div className="flex flex-col items-center gap-1.5">
                        <div className={cn(
                          "w-10 h-10 border flex items-center justify-center text-text-secondary",
                          node.active ? "border-green-400 bg-green-50 text-green-600" : "border-border bg-background"
                        )}>
                          {node.icon}
                        </div>
                        <span className="text-[8px] text-text-tertiary text-center leading-tight max-w-[60px]">{node.label}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="flex-1 h-px bg-border relative min-w-[12px]">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[4px] border-l-border border-y-[3px] border-y-transparent" />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Feature 2 — Fraud detection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="bg-background border border-border shadow-sm">
                <div className="flex items-center gap-2 p-4 border-b border-border" style={{ borderLeft: "3px solid hsl(38 92% 50%)" }}>
                  <AlertTriangle size={16} className="text-warning" />
                  <span className="text-sm text-foreground">Fraud Alert Detected</span>
                </div>
                <div className="p-4 space-y-2 border-b border-border">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Installs</span><span className="text-foreground">47</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Pattern</span><span className="text-foreground">Same IP range</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Timeframe</span><span className="text-foreground">2 hours</span>
                  </div>
                </div>
                <div className="flex gap-3 p-4 border-b border-border">
                  <Button size="sm" variant="secondary" className="flex-1">Review Details</Button>
                  <Button size="sm" variant="ghost" className="flex-1">Dismiss</Button>
                </div>
                <div className="text-[11px]">
                  {[
                    { ip: "192.168.1.x", time: "14:02", status: "flagged" },
                    { ip: "192.168.1.x", time: "14:05", status: "flagged" },
                    { ip: "10.0.0.x", time: "14:12", status: "clean" },
                  ].map((row, i) => (
                    <div key={i} className={cn(
                      "flex items-center justify-between px-4 py-2 border-b border-border last:border-0",
                      row.status === "flagged" ? "bg-warning/5" : ""
                    )}>
                      <span className="text-text-secondary">{row.ip}</span>
                      <span className="text-text-tertiary">{row.time}</span>
                      <span className={row.status === "flagged" ? "text-warning" : "text-text-tertiary"}>{row.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="order-1 lg:order-2">
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight leading-tight mb-4">
                  AI fraud detection that protects your program automatically.
                </h3>
                <p className="text-base text-text-secondary mb-6">
                  Every conversion is scored in real time. Komisi flags suspicious install patterns — same IP clusters, abnormal velocity, emulator installs — before they cost you money.
                </p>
                <a href="#" className="text-sm text-text-secondary hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8">
                  See how fraud detection works <ArrowRight size={14} />
                </a>
                <div className="border border-border p-5 mt-4">
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed italic">
                    "We caught a creator sending fake installs within 24 hours. Komisi flagged it automatically — we would have paid out hundreds without it."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-muted flex items-center justify-center text-[9px] text-text-tertiary rounded-full">DP</div>
                    <div>
                      <p className="text-xs text-foreground">David Park</p>
                      <p className="text-[10px] text-text-tertiary">Founder, FocusTimer</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Feature 3 — Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight leading-tight mb-4">
                  Know exactly which creator drove every install and subscription.
                </h3>
                <p className="text-base text-text-secondary mb-6">
                  Real-time analytics broken down by creator, campaign, platform, and content. See install volume, trial starts, subscription conversions, and revenue attributed — all in one dashboard.
                </p>
                <a href="#" className="text-sm text-text-secondary hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8">
                  Explore the analytics dashboard <ArrowRight size={14} />
                </a>
                <div className="border border-border p-5 mt-4">
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed italic">
                    "I can see exactly which TikTok video drove the most subscriptions. That changes how we brief creators entirely."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-muted flex items-center justify-center text-[9px] text-text-tertiary rounded-full">ML</div>
                    <div>
                      <p className="text-xs text-foreground">Marcus Lee</p>
                      <p className="text-[10px] text-text-tertiary">Growth Lead, CalorieSnap</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="bg-background border border-border shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="text-xs text-foreground">Creator Performance</span>
                  <span className="text-[10px] text-text-tertiary border border-border px-2 py-0.5">Last 30 days</span>
                </div>
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-border">
                      {["Creator", "Platform", "Installs", "Revenue", "Commission"].map(h => (
                        <th key={h} className="text-left p-3 text-text-tertiary font-normal">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { creator: "@sarah_creates", platform: "TikTok", installs: "234", revenue: "$2,100", commission: "$630" },
                      { creator: "@techreview", platform: "YouTube", installs: "89", revenue: "$445", commission: "$89" },
                      { creator: "@dailyapps", platform: "Instagram", installs: "56", revenue: "$340", commission: "$85" },
                    ].map((row, i) => (
                      <tr key={i} className={cn("border-b border-border last:border-0", i % 2 === 1 ? "bg-muted/50" : "")}>
                        <td className="p-3 text-foreground">{row.creator}</td>
                        <td className="p-3 text-text-secondary">{row.platform}</td>
                        <td className="p-3 text-foreground">{row.installs}</td>
                        <td className="p-3 text-foreground">{row.revenue}</td>
                        <td className="p-3 text-foreground">{row.commission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          {/* Feature 4 — Payouts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="bg-background border border-border shadow-sm">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="text-xs text-foreground">Upcoming Payouts</span>
                  <span className="text-[10px] text-text-tertiary">Mar 15</span>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { name: "Emma Davis", amount: "$124.50", status: "Paid", paid: true },
                    { name: "James Lee", amount: "$89.20", status: "Paid", paid: true },
                    { name: "Sofia Martinez", amount: "$156.80", status: "Pending", paid: false },
                    { name: "Alex Rivera", amount: "$97.50", status: "Pending", paid: false },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted flex items-center justify-center text-[9px] text-text-tertiary rounded-full">
                          {row.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm text-foreground">{row.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-foreground">{row.amount}</span>
                        <span className={cn(
                          "text-[10px] px-2 py-0.5",
                          row.paid
                            ? "bg-green-50 text-green-600 border border-green-200"
                            : "bg-muted text-text-tertiary border border-border"
                        )}>
                          {row.paid ? "Paid ✔" : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between p-4 border-t border-border">
                  <span className="text-sm text-foreground">Total: $468.00</span>
                  <Button size="sm">Process All Payouts</Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="order-1 lg:order-2">
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight leading-tight mb-4">
                  Pay every creator automatically. No invoices, no chasing.
                </h3>
                <p className="text-base text-text-secondary mb-6">
                  Creators connect their Stripe account during onboarding. Komisi calculates commissions against net revenue after store fees and queues payouts automatically on your chosen schedule — weekly, bi-weekly, or monthly.
                </p>
                <a href="#" className="text-sm text-text-secondary hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8">
                  Learn about payouts <ArrowRight size={14} />
                </a>
                <div className="border border-border p-5 mt-4">
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed italic">
                    "Creators love that they just get paid. No back-and-forth, no invoices. It's made recruiting affiliates so much easier."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-muted flex items-center justify-center text-[9px] text-text-tertiary rounded-full">PN</div>
                    <div>
                      <p className="text-xs text-foreground">Priya Nair</p>
                      <p className="text-[10px] text-text-tertiary">Founder, MindfulApp</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — INTEGRATIONS GRID
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight mb-3">
              Works with your existing stack.
            </h2>
            <p className="text-base text-text-secondary">
              Komisi plugs into the tools you already use. No ripping and replacing.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {integrations.map(item => (
                <div key={item.name} className="border border-border bg-card rounded-xl p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default group">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="w-12 h-12 mx-auto mb-3 object-contain"
                  />
                  <span className="text-sm font-medium text-text-secondary">{item.name}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <div className="border-l-2 border-foreground p-6 max-w-2xl mx-auto">
              <p className="text-sm text-text-secondary mb-3 leading-relaxed italic">
                "The RevenueCat integration saved us weeks. Komisi just reads our existing webhook events — zero additional engineering."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-muted flex items-center justify-center text-[9px] text-text-tertiary rounded-full">JP</div>
                <div>
                  <p className="text-xs text-foreground font-medium">James Park</p>
                  <p className="text-[10px] text-text-tertiary">Founder, FocusTimer</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9 — TESTIMONIALS CAROUSEL
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight">
              App developers of all sizes grow with Komisi.
            </h2>
          </Reveal>

          <div
            className="relative max-w-[720px] mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="text-8xl text-foreground text-center mb-4 leading-none select-none font-serif">&ldquo;</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="text-center px-16"
              >
                <div
                  className="w-14 h-14 mx-auto mb-6 flex items-center justify-center text-sm text-white"
                  style={{ backgroundColor: testimonials[activeTestimonial].color, borderRadius: "50%", width: 56, height: 56 }}
                >
                  {testimonials[activeTestimonial].initials}
                </div>
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 max-w-[600px] mx-auto italic">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <p className="text-sm text-foreground font-medium">{testimonials[activeTestimonial].name}</p>
                <p className="text-xs text-text-tertiary">
                  {testimonials[activeTestimonial].title}, {testimonials[activeTestimonial].company}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-foreground hover:border-foreground transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-foreground hover:border-foreground transition-colors"
            >
              <ChevronRight size={18} />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors",
                    i === activeTestimonial ? "bg-foreground" : "border border-border"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 10 — TRUST / ENTERPRISE BAR
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-border">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <Shield size={24} />,
              title: "Secure",
              items: [
                "Privacy-safe attribution — no IDFA, no cookies",
                "App Store privacy label: zero impact",
                "SOC2 compliant infrastructure",
              ],
            },
            {
              icon: <Zap size={24} />,
              title: "Reliable",
              items: [
                "99.9% attribution accuracy",
                "Real-time fraud detection",
                "Stripe Connect for secure payouts",
              ],
            },
            {
              icon: <CheckCircle size={24} />,
              title: "Simple",
              items: [
                "Setup in under 30 minutes",
                "Works with RevenueCat and Adapty",
                "Dedicated onboarding support",
              ],
            },
          ].map((col, i) => (
            <Reveal key={col.title} delay={i * 0.1}>
              <div className={cn(
                "text-center md:text-left",
                i < 2 && "md:border-r md:border-border md:pr-12"
              )}>
                <div className="text-foreground mb-4 mx-auto md:mx-0 w-fit">{col.icon}</div>
                <h4 className="text-lg font-normal text-foreground mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.items.map(item => (
                    <li key={item} className="text-sm text-text-secondary">{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 11 — FINAL CTA (Dark)
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "#0C1C28" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
        <Reveal className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight mb-4">
            Your next 1,000 installs<br />
            are one affiliate program away.
          </h2>
          <p className="text-base mb-10" style={{ color: "#9CA3AF" }}>
            Get started today or book a demo for a personal walkthrough.
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link to="/signup">
              <Button size="lg" className="h-12 px-8 bg-white text-foreground hover:bg-white/90 border border-transparent">
                Get Started Free <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="h-12 px-8 border-white/20 text-white hover:bg-white/10 bg-transparent">
                Book a Demo
              </Button>
            </Link>
          </div>
          <p className="text-xs" style={{ color: "#6B7280" }}>
            200+ app developers · No credit card required · Setup in 30 minutes
          </p>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 12 — FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="bg-foreground text-primary-foreground px-6 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2">
              <span className="text-lg font-normal tracking-tight block mb-2">komisi</span>
              <p className="text-xs text-white/40">© 2026 Komisi. All rights reserved.</p>
            </div>
            {[
              { title: "Product", links: ["Attribution", "Fraud Detection", "Payouts", "Analytics", "Creator Marketplace"] },
              { title: "Developers", links: ["SDK Docs", "iOS", "Android", "Flutter", "React Native", "API Reference"] },
              { title: "Company", links: ["About", "Blog", "Pricing", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Data Protection"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-xs text-white/40 hover:text-white transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex items-center justify-end gap-4">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <a key={i} href="#" className="text-white/30 hover:text-white transition-colors"><Icon size={16} /></a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
