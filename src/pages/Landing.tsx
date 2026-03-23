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
  Code, BarChart3, Wallet,
  AlertTriangle, ExternalLink, TrendingUp, Globe,
} from "lucide-react";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";
import PersonaCards from "@/components/komisi/PersonaCards";
import AttributionFlowAnimation from "@/components/komisi/AttributionFlowAnimation";
import FraudDetectionAnimation from "@/components/komisi/FraudDetectionAnimation";
import AnalyticsAnimation from "@/components/komisi/AnalyticsAnimation";
import PayoutsAnimation from "@/components/komisi/PayoutsAnimation";
import HeroDashboard from "@/components/komisi/HeroDashboard";
import HeroVisual from "@/components/komisi/HeroVisual";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { IntegrationGrid } from "@/components/komisi/IntegrationGrid";

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
  { name: "Stripe", src: "/logos/stripe.webp" },
  { name: "PostHog", src: "/logos/posthog.webp" },
  { name: "Braze", src: "/logos/braze.webp" },
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
  { text: "We replaced $3,000/month in paid ads with Komisi affiliates. Our CAC dropped 60% in three months.", image: "/avatars/user-1.jpg", name: "Sarah Chen", role: "Founder, MindfulApp" },
  { text: "Setup took less time than writing this testimonial. The RevenueCat integration worked out of the box.", image: "/avatars/user-2.jpg", name: "James Park", role: "Developer, FocusTimer" },
  { text: "I can finally see which creator drove which subscription. That data alone is worth the price.", image: "/avatars/user-3.jpg", name: "Marcus Lee", role: "Growth, SleepWell" },
  { text: "Automated payouts saved me hours every month. Creators love getting paid on time without me chasing invoices.", image: "/avatars/user-4.jpg", name: "Priya Nair", role: "Founder, HabitKit" },
  { text: "The fraud detection flagged a click farm on day two. Would have wasted thousands without it.", image: "/avatars/user-5.jpg", name: "David Park", role: "Developer, CalTrack" },
  { text: "Komisi is the first affiliate tool that actually understands mobile. Everything else was built for web.", image: "/avatars/user-6.jpg", name: "Aisha Okonkwo", role: "Founder, MeditateNow" },
  { text: "Went from zero affiliates to 40 active creators in six weeks. The marketplace made discovery effortless.", image: "/avatars/user-7.jpg", name: "Tom Rivera", role: "Growth, RunCoach" },
  { text: "Three lines of SDK code and attribution was live. I expected it to take a week.", image: "/avatars/user-8.jpg", name: "Nina Walsh", role: "Developer, StudyFlash" },
  { text: "Our top creator drives 22% of all new subscribers. Komisi made that relationship visible and scalable.", image: "/avatars/user-9.jpg", name: "Kai Nakamura", role: "Founder, LanguagePal" },
];
const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

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

/* ── Syntax highlighting helper (Tokyo Night) ── */
const SyntaxLine = ({ line, num }: { line: string; num: number }) => {
  const lineNum = <span className="inline-block w-6 mr-4 text-right select-none" style={{ color: "#565f89" }}>{num}</span>;
  if (line.startsWith("//")) {
    return <div className="leading-6">{lineNum}<span style={{ color: "#565f89", fontStyle: "italic" }}>{line}</span></div>;
  }
  if (line.includes("import")) {
    return <div className="leading-6">{lineNum}<span style={{ color: "#bb9af7" }}>import</span><span style={{ color: "#c0caf5" }}>{line.replace("import", "")}</span></div>;
  }
  if (line.includes("await")) {
    const rest = line.replace("await ", "");
    return <div className="leading-6">{lineNum}<span style={{ color: "#bb9af7" }}>await </span><span style={{ color: "#c0caf5" }}>{rest}</span></div>;
  }
  if (line.includes('"') || line.includes("'")) {
    const parts: React.ReactNode[] = [];
    let inString = false;
    let current = "";
    const quoteChar = line.includes('"') ? '"' : "'";
    for (let i = 0; i < line.length; i++) {
      if (line[i] === quoteChar) {
        if (inString) {
          parts.push(<span key={i} style={{ color: "#9ece6a" }}>{quoteChar}{current}{quoteChar}</span>);
          current = "";
          inString = false;
        } else {
          parts.push(<span key={`b${i}`} style={{ color: "#c0caf5" }}>{current}</span>);
          current = "";
          inString = true;
        }
      } else {
        current += line[i];
      }
    }
    if (current) parts.push(<span key="end" style={{ color: "#c0caf5" }}>{current}</span>);
    return <div className="leading-6">{lineNum}{parts}</div>;
  }
  return <div className="leading-6">{lineNum}<span style={{ color: "#c0caf5" }}>{line || "\u00A0"}</span></div>;
};

const Landing = () => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = heroRef.current;
      if (heroEl) {
        const heroHeight = heroEl.offsetHeight;
        setIsPastHero(window.scrollY >= heroHeight - 80);
      } else {
        setIsPastHero(window.scrollY >= window.innerHeight - 80);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  const [activeCodeTab, setActiveCodeTab] = useState("Swift");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install @komisi/sdk");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════════
          SECTION 1 — NAVIGATION
      ═══════════════════════════════════════════ */}
      <motion.nav
        animate={{
          backgroundColor: isPastHero ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0)',
          boxShadow: isPastHero
            ? '0 1px 0 rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)'
            : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: isPastHero ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isPastHero ? 'blur(16px) saturate(180%)' : 'none',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-lg tracking-tight font-normal" style={{ color: '#000000' }}>
              komisi
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {["Product", "Pricing", "Docs", "Marketplace"].map(l => {
              const isLink = l === "Pricing";
              const Comp = isLink ? Link : motion.a;
              const linkProps = isLink
                ? { to: "/pricing" as string }
                : {
                    href: `#${l.toLowerCase()}`,
                    animate: { color: isPastHero ? 'rgba(0,0,0,0.65)' : '#000000' },
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    onMouseEnter: (e: React.MouseEvent) => { (e.target as HTMLElement).style.color = '#000000'; },
                    onMouseLeave: (e: React.MouseEvent) => { (e.target as HTMLElement).style.color = isPastHero ? 'rgba(0,0,0,0.65)' : '#000000'; },
                  };
              if (isLink) {
                return (
                  <Link key={l} to="/pricing" className="text-sm" style={{ cursor: 'pointer', color: isPastHero ? 'rgba(0,0,0,0.65)' : '#000000', transition: 'color 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#000000'; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = isPastHero ? 'rgba(0,0,0,0.65)' : '#000000'; }}
                  >{l}</Link>
                );
              }
              return (
                <motion.a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  animate={{ color: isPastHero ? 'rgba(0,0,0,0.65)' : '#000000' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#000000'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = isPastHero ? 'rgba(0,0,0,0.65)' : '#000000'; }}
                >
                  {l}
                </motion.a>
              );
            })}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <motion.span
                animate={{ color: isPastHero ? 'rgba(0,0,0,0.65)' : 'rgba(0,0,0,0.7)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm cursor-pointer"
              >
                Login
              </motion.span>
            </Link>
            <Link to="/signup"><Button size="sm" style={{ backgroundColor: '#000000', color: '#FFFFFF' }} className="hover:opacity-90">Get Started <ArrowRight size={14} /></Button></Link>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            <span style={{ color: '#000000' }}>
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </span>
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
                l === "Pricing"
                  ? <Link key={l} to="/pricing" className="block text-sm py-2 text-text-secondary">{l}</Link>
                  : <a key={l} href={`#${l.toLowerCase()}`} className="block text-sm py-2 text-text-secondary">{l}</a>
              ))}
              <Link to="/login"><Button variant="secondary" className="w-full mt-2">Login</Button></Link>
              <Link to="/signup"><Button className="w-full" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>Get Started</Button></Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ═══════════════════════════════════════════
          SECTION 2 — HERO
      ═══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden" id="product">
        {/* Hero watercolor background */}
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] px-3 py-1.5 mb-6" style={{ color: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,0,0,0.15)' }}>
                  ✦ Built for mobile app developers
                </span>
              </motion.div>

              <div className="mb-6">
                {["Affiliate marketing", "infrastructure for", "mobile apps."].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 + i * 0.15 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.05]"
                    style={{ color: '#000000' }}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-base mb-8 max-w-[480px]"
                style={{ color: 'rgba(0,0,0,0.6)' }}
              >
                Turn creators into your most profitable growth channel. Attribute every install, automate every payout.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-3 mb-4"
              >
                <Input placeholder="Enter your email" className="h-12 max-w-[280px] border" style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderColor: 'rgba(0,0,0,0.15)', color: '#000000' }} />
                <Link to="/signup">
                  <Button size="lg" className="h-12 px-6 border-none" style={{ backgroundColor: '#000000', color: '#FFFFFF', fontWeight: 500 }}>Get Started Free <ArrowRight size={16} /></Button>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }} className="flex items-center gap-4 mb-2">
                <Link to="/demo" className="text-sm transition-colors" style={{ color: 'rgba(0,0,0,0.5)' }}>Book a Demo →</Link>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.3 }} className="text-xs mt-4" style={{ color: 'rgba(0,0,0,0.4)' }}>
                Trusted by 200+ indie app developers · No credit card required
              </motion.p>
            </div>

            {/* Right — bleeding dashboard + creator card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
              style={{ minHeight: 480 }}
            >
              <HeroVisual />
            </motion.div>
          </div>
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
        <div className="relative overflow-hidden w-full">
          <div
            className="marquee-track"
            style={{ gap: "48px" }}
            onMouseEnter={(e) => { e.currentTarget.style.animationPlayState = "paused"; }}
            onMouseLeave={(e) => { e.currentTarget.style.animationPlayState = "running"; }}
          >
            {[...socialProofLogos, ...socialProofLogos, ...socialProofLogos, ...socialProofLogos].map((logo, i) => (
              <div key={`${logo.name}-${i}`} className="shrink-0 flex items-center gap-2">
                <img src={logo.src} alt={logo.name} className="h-6 w-6 object-contain" />
                <span className="text-sm text-text-secondary whitespace-nowrap" style={{ fontWeight: 400 }}>{logo.name}</span>
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
      <PersonaCards />

      {/* ═══════════════════════════════════════════
          SECTION 5 — STATS BAR (Dark)
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: 2, prefix: "$", suffix: "M+", label: "Creator commissions tracked" },
            { value: 200, suffix: "+", label: "App developers" },
            { value: 60, suffix: "%", label: "Average CAC reduction" },
            { value: 99.9, suffix: "%", label: "Attribution accuracy", decimals: 1 },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — SDK CODE BLOCK (Dark, continues)
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-normal text-white tracking-tight leading-tight mb-6">
                Integrate in under<br />30 minutes.
              </h2>
              <p className="text-base mb-6 leading-relaxed" style={{ color: "#9CA3AF" }}>
                One SDK. Works on iOS, Android, Flutter, and React Native. Drop in 3 lines of code and Komisi handles attribution, fraud detection, and payouts automatically. No server coding required.
              </p>
              <a href="#" className="text-sm hover:text-white transition-colors inline-flex items-center gap-1 mb-10" style={{ color: '#000000' }}>
                Read the docs <ArrowRight size={14} />
              </a>

              <div className="bg-white/5 border border-white/10 p-6 mt-8">
                <p className="text-sm text-white/70 mb-4 leading-relaxed italic">
                  "Setup was faster than I expected. The RevenueCat integration just worked — I had my first affiliate attributed within the hour."
                </p>
                <div className="flex items-center gap-3">
                  <img src="/avatars/user-2.jpg" alt="James Park" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs text-white/80 font-medium">James Park</p>
                    <p className="text-[10px] text-white/40">Founder, FocusTimer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div>
              <div className="flex" style={{ backgroundColor: "#1a1b26" }}>
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

              <div className="relative" style={{ backgroundColor: "#1a1b26" }}>
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

              <div className="flex items-center justify-between px-4 py-3 border-t border-white/5" style={{ backgroundColor: "#1a1b26" }}>
                <div className="flex items-center gap-3">
                  <img src="/logos/github.webp" alt="GitHub" style={{ width: 32, height: 32, borderRadius: 8 }} />
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
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — FEATURE ALTERNATING SECTIONS
      ═══════════════════════════════════════════ */}

      {/* Feature 1 — Attribution flow (white bg) */}
      <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight leading-tight mb-4">
                  Attribute every install without IDFA or cookies.
                </h3>
                <p className="text-base text-text-secondary mb-6">
                  Komisi's SDK uses privacy-safe fingerprint matching on iOS and the Play Install Referrer API on Android. 100% deterministic on Android. 0.60–0.95 confidence scoring on iOS. No ATT prompt. No impact on your App Store privacy label.
                </p>
                <a href="#" className="text-sm transition-colors inline-flex items-center gap-1 mb-8" style={{ color: '#000000' }}>
                  Learn how attribution works <ArrowRight size={14} />
                </a>
                <div className="p-5 mt-4" style={{ border: '1px solid rgba(0,0,0,0.15)' }}>
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed italic">
                    "We finally know which creators are actually driving installs. Komisi's attribution is the most accurate we've tested."
                  </p>
                  <div className="flex items-center gap-3">
                    <img src="/avatars/user-1.jpg" alt="Sarah Chen" className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="text-xs text-foreground">Sarah Chen</p>
                      <p className="text-[10px] text-text-tertiary">Head of Growth, MindfulApp</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <AttributionFlowAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature 2 — Fraud detection (lavender bg) */}
      <section className="w-full" style={{ backgroundColor: "#F8F8F8" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <FraudDetectionAnimation />
            </motion.div>
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight leading-tight mb-4">
                  AI fraud detection that protects your program automatically.
                </h3>
                <p className="text-base text-text-secondary mb-6">
                  Every conversion is scored in real time. Komisi flags suspicious install patterns — same IP clusters, abnormal velocity, emulator installs — before they cost you money.
                </p>
                <a href="#" className="text-sm transition-colors inline-flex items-center gap-1 mb-8" style={{ color: '#000000' }}>
                  See how fraud detection works <ArrowRight size={14} />
                </a>
                <div className="p-5 mt-4" style={{ border: '1px solid rgba(0,0,0,0.15)' }}>
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed italic">
                    "We caught a creator sending fake installs within 24 hours. Komisi flagged it automatically — we would have paid out hundreds without it."
                  </p>
                  <div className="flex items-center gap-3">
                    <img src="/avatars/user-5.jpg" alt="David Park" className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="text-xs text-foreground">David Park</p>
                      <p className="text-[10px] text-text-tertiary">Founder, FocusTimer</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature 3 — Analytics (white bg) */}
      <section className="w-full" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight leading-tight mb-4">
                  Know exactly which creator drove every install and subscription.
                </h3>
                <p className="text-base text-text-secondary mb-6">
                  Real-time analytics broken down by creator, campaign, platform, and content. See install volume, trial starts, subscription conversions, and revenue attributed — all in one dashboard.
                </p>
                <a href="#" className="text-sm transition-colors inline-flex items-center gap-1 mb-8" style={{ color: '#000000' }}>
                  Explore the analytics dashboard <ArrowRight size={14} />
                </a>
                <div className="p-5 mt-4" style={{ border: '1px solid rgba(0,0,0,0.15)' }}>
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed italic">
                    "I can see exactly which TikTok video drove the most subscriptions. That changes how we brief creators entirely."
                  </p>
                  <div className="flex items-center gap-3">
                    <img src="/avatars/user-3.jpg" alt="Marcus Lee" className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="text-xs text-foreground">Marcus Lee</p>
                      <p className="text-[10px] text-text-tertiary">Growth Lead, CalorieSnap</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <AnalyticsAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature 4 — Payouts (lavender bg) */}
      <section className="w-full" style={{ backgroundColor: "#F8F8F8" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <PayoutsAnimation />
            </motion.div>
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight leading-tight mb-4">
                  Pay every creator automatically. No invoices, no chasing.
                </h3>
                <p className="text-base text-text-secondary mb-6">
                  Creators connect their Stripe account during onboarding. Komisi calculates commissions against net revenue after store fees and queues payouts automatically on your chosen schedule — weekly, bi-weekly, or monthly.
                </p>
                <a href="#" className="text-sm transition-colors inline-flex items-center gap-1 mb-8" style={{ color: '#000000' }}>
                  Learn about payouts <ArrowRight size={14} />
                </a>
                <div className="p-5 mt-4" style={{ border: '1px solid rgba(0,0,0,0.15)' }}>
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed italic">
                    "Creators love that they just get paid. No back-and-forth, no invoices. It's made recruiting affiliates so much easier."
                  </p>
                  <div className="flex items-center gap-3">
                    <img src="/avatars/user-4.jpg" alt="Priya Nair" className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="text-xs text-foreground">Priya Nair</p>
                      <p className="text-[10px] text-text-tertiary">Founder, MindfulApp</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — INTEGRATIONS GRID
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 dot-grid">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight mb-3">
              Works with your existing stack.
            </h2>
            <p className="text-base text-text-secondary">
              Komisi plugs into the tools you already use. No ripping and replacing.
            </p>
          </Reveal>

          <IntegrationGrid integrations={integrations} />

          <Reveal className="mt-12">
            <div className="p-6 max-w-2xl mx-auto" style={{ borderLeft: '2px solid #000000' }}>
              <p className="text-sm text-text-secondary mb-3 leading-relaxed italic">
                "The RevenueCat integration saved us weeks. Komisi just reads our existing webhook events — zero additional engineering."
              </p>
              <div className="flex items-center gap-3">
                <img src="/avatars/user-2.jpg" alt="James Park" className="w-7 h-7 rounded-full object-cover" />
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
          SECTION 9 — TESTIMONIALS (SCROLLING COLUMNS)
      ═══════════════════════════════════════════ */}
      <section className="dot-grid" style={{ padding: '80px 0' }}>
        <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 24px' }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
            style={{ maxWidth: '540px', margin: '0 auto 40px' }}
          >

            <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight mb-3">
              App developers of all sizes grow with Komisi.
            </h2>

            <p style={{ fontSize: '17px', color: '#6b7280' }}>
              Real stories from indie developers, growth teams, and creators.
            </p>
          </motion.div>

          {/* Scrolling columns */}
          <div
            className="flex justify-center gap-6"
            style={{
              maxHeight: '740px',
              overflow: 'hidden',
              maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
            }}
          >
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} duration={19} className="hidden md:block" />
            <TestimonialsColumn testimonials={thirdColumn} duration={17} className="hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 10 — TRUST / ENTERPRISE BAR
      ═══════════════════════════════════════════ */}

      {/* ═══════════════════════════════════════════
          SECTION 11 — FINAL CTA (Dark)
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "#111111" }}>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight mb-4"
          >
            Your next 1,000 installs<br />
            are one affiliate program away.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base mb-10" style={{ color: "#9CA3AF" }}
          >
            Get started today or book a demo for a personal walkthrough.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
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
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xs" style={{ color: "#6B7280" }}
          >
            200+ app developers · No credit card required · Setup in 30 minutes
          </motion.p>
        </div>
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
              { title: "Product", links: [{ label: "Attribution", href: "#" }, { label: "Fraud Detection", href: "#" }, { label: "Payouts", href: "#" }, { label: "Analytics", href: "#" }, { label: "Creator Marketplace", href: "#" }] },
              { title: "Developers", links: [{ label: "SDK Docs", href: "#" }, { label: "iOS", href: "#" }, { label: "Android", href: "#" }, { label: "Flutter", href: "#" }, { label: "React Native", href: "#" }, { label: "API Reference", href: "#" }] },
              { title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }, { label: "Pricing", href: "/pricing" }, { label: "Careers", href: "#" }, { label: "Contact", href: "#" }] },
              { title: "Legal", links: [{ label: "Privacy Policy", href: "#" }, { label: "Terms of Service", href: "#" }, { label: "Data Protection", href: "#" }] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-[10px] uppercase tracking-[0.15em] text-white/50 mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l.label}>
                      {l.href.startsWith("/") ? (
                        <Link to={l.href} className="text-xs text-white/40 hover:text-white transition-colors">{l.label}</Link>
                      ) : (
                        <a href={l.href} className="text-xs text-white/40 hover:text-white transition-colors">{l.label}</a>
                      )}
                    </li>
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
