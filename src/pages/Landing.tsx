import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
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
import StickyFeatureScroll from "@/components/komisi/StickyFeatureScroll";
import HeroDashboard from "@/components/komisi/HeroDashboard";
import HeroVisual from "@/components/komisi/HeroVisual";
import FaultyTerminal from "@/components/Backgrounds/FaultyTerminal";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { IntegrationGrid } from "@/components/komisi/IntegrationGrid";
import Preloader from "@/components/Preloader";

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
  const darkBlockRef = useRef<HTMLDivElement>(null);
  const isDarkBlockInView = useInView(darkBlockRef, { margin: "400px 0px" });

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
    <>
    <Preloader />
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
          backgroundColor: isPastHero ? 'rgba(255,255,255,0.85)' : 'transparent',
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
      <section
        ref={heroRef}
        className="relative overflow-hidden flex items-center"
        id="product"
        style={{ paddingTop: 'clamp(100px, 12vh, 160px)', paddingBottom: 'clamp(64px, 10vh, 120px)' }}
      >
        <style>{`
          @media (max-width: 1023px) {
            #product {
              min-height: auto !important;
              padding: 100px 24px 64px 24px !important;
              border: none !important;
              outline: none !important;
              margin: 0 !important;
            }
            #product > .relative.z-10 {
              padding-right: 0 !important;
              padding-bottom: 0 !important;
            }
            #hero-right { display: none !important; }
            #hero-left { width: 100% !important; max-width: none !important; padding-left: 0 !important; padding-right: 0 !important; }
          }
          @media (min-width: 1024px) and (max-width: 1279px) {
            #hero-left { padding-left: clamp(48px, 6vw, 80px) !important; }
          }
          @media (min-width: 1280px) {
            #hero-left { padding-left: clamp(80px, 8vw, 160px) !important; }
          }
        `}</style>

        {/* Hero watercolor background */}
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
        </div>

        {/* Hero content */}
        <div
          className="relative z-10 w-full"
          style={{
            paddingRight: 'clamp(24px, 5vw, 80px)',
            paddingBottom: 'clamp(48px, 6vh, 80px)',
          }}
        >
          <div className="relative">
            {/* Left content column */}
            <div id="hero-left" <div id="hero-left" style={{ width: '45%', maxWidth: 520, paddingRight: 32, flexShrink: 0 }}>>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] px-3 py-1.5 mb-6" style={{ color: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,0,0,0.15)' }}>
                  ✦ Built for mobile app developers
                </span>
              </motion.div>

              <div className="mb-6">
                {["The affiliate infrastructure", "mobile apps never had."].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 + i * 0.15 }}
                    className="font-medium tracking-tighter leading-[1.05]"
                    style={{ color: '#000000', fontSize: 'clamp(36px, 4vw, 56px)', overflowWrap: 'break-word' }}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8 max-w-[480px]"
                style={{ color: 'rgba(0,0,0,0.6)', fontSize: 'clamp(15px, 1.8vw, 18px)' }}
              >
                Set up in under an hour. Connect creators on TikTok, YouTube, or Instagram. See exactly which post drove which install and which in-app purchase. Privacy-safe on iOS and Android.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-3 mb-4 w-full"
              >
                <Input placeholder="Enter your email" className="h-12 flex-1 border" style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderColor: 'rgba(0,0,0,0.15)', color: '#000000' }} />
                <Link to="/signup">
                  <Button size="lg" className="h-12 px-6 border-none w-full sm:w-auto" style={{ backgroundColor: '#000000', color: '#FFFFFF', fontWeight: 500 }}><Button size="lg" className="h-12 px-6 border-none w-full sm:w-auto" style={{ backgroundColor: '#000000', color: '#FFFFFF', fontWeight: 500 }}>Get Started <ArrowRight size={16} /></Button></Button>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }} className="flex items-center gap-4 mb-2">
                <Link to="/demo" className="text-sm transition-colors" style={{ color: 'rgba(0,0,0,0.5)' }}>Book a Demo →</Link>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.3 }} className="text-xs mt-4" style={{ color: 'rgba(0,0,0,0.4)' }}>
                Used by 200+ app developers on iOS and Android · No credit card required
              </motion.p>
            </div>

            {/* Right — bleeding dashboard + creator card */}
            <motion.div
              id="hero-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                position: 'absolute',
                right: 0,
                left: '42%',
                top: '50%',
                transform: 'translateY(-50%)',
                transformOrigin: 'top right',
              }}
            >
              <div style={{ width: '100%', position: 'relative' }}>
                <HeroVisual />
              </div>
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
            WORKS WITH YOUR EXISTING MOBILE STACK
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
          SECTIONS 5+6 — STATS BAR + SDK (shared dark bg)
      ═══════════════════════════════════════════ */}
      <div ref={darkBlockRef} className="relative w-full dark" style={{ backgroundColor: '#111111', backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        {/* FaultyTerminal overlay */}
        {isDarkBlockInView ? (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.035 }}>
            <FaultyTerminal
              tint="#ffffff"
              scale={2.5}
              dpr={1}
              mouseReact={false}
              pageLoadAnimation={false}
            />
          </div>
        ) : null}
      <div style={{ position: 'relative', zIndex: 1 }}>
      <section className="py-20 px-6">
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
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-normal text-white tracking-tight leading-tight mb-6" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                <span className="md:hidden" style={{ fontSize: 22 }}>Integrate in under 30 minutes.</span>
                <span className="hidden md:inline">Integrate in under<br />30 minutes.</span>
              </h2>
              <p className="text-base mb-6 leading-relaxed" style={{ color: "#9CA3AF" }}>
                One SDK. Works on iOS, Android, Flutter, and React Native. Drop in 3 lines of code and Komisi handles attribution, fraud detection, and payouts automatically. No server coding required.
              </p>
              <a href="#" className="text-sm hover:text-white transition-colors inline-flex items-center gap-1 mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Read the docs <ArrowRight size={14} />
              </a>

              <div className="border border-white/10 p-6 mt-8" style={{ backgroundColor: "#1a1a1a" }}>
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
              <div className="flex" style={{ backgroundColor: "rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "4px", gap: "2px" }}>
                {Object.keys(codeExamples).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className="text-xs transition-colors"
                    style={{
                      padding: "6px 14px",
                      borderRadius: 0,
                      fontWeight: activeCodeTab === tab ? 500 : 400,
                      backgroundColor: activeCodeTab === tab ? "#FFFFFF" : "transparent",
                      color: activeCodeTab === tab ? "#000000" : "rgba(255,255,255,0.45)",
                    }}
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
                  <img src="/logos/github-lockup-white.svg" alt="GitHub" style={{ height: 14 }} />
                  <span className="text-xs text-white/40">100% Open Source</span>
                </div>
                <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors inline-flex items-center gap-1">
                  View on GitHub <ExternalLink size={10} />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {sdkPlatforms.map(p => (
                  <div key={p.name} className="border border-white/10 p-3 text-center hover:border-white/25 transition-colors flex flex-col items-center gap-2" style={{ backgroundColor: "#1a1a1a" }}>
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
      </div>
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 7 — STICKY FEATURE SCROLL
      ═══════════════════════════════════════════ */}
      <StickyFeatureScroll />

      {/* ═══════════════════════════════════════════
          SECTION 8 — INTEGRATIONS GRID
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 dot-grid">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="text-center mb-6">
             <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight mb-3">
              Works with your existing stack. No rip-and-replace.
            </h2>
            <p className="text-base text-text-secondary">
              Komisi layers creator attribution on top of RevenueCat and Adapty. Your existing analytics setup stays exactly as it is. Replaces AppsFlyer and Adjust for creator campaigns.
            </p>
          </Reveal>

          <IntegrationGrid integrations={integrations} />

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
          SECTION 10 — TRUST BAR
      ═══════════════════════════════════════════ */}
      <section className="py-16 px-6 dot-grid">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: Fingerprint,
              label: "Privacy-Safe",
              qualifier: "No personal identifiers collected or stored.",
            },
            {
              icon: Shield,
              label: "No IDFA Required",
              qualifier: "No ATT prompt. Works on iOS 14.5+ out of the box.",
            },
            {
              icon: Code,
              label: "10 Lines of Code",
              qualifier: "RevenueCat or Adapty required. Tracks installs from day one.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <Icon size={28} style={{ color: '#000000', margin: '0 auto 12px' }} />
                  <p className="text-lg font-medium" style={{ color: '#000000' }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', fontWeight: 400, marginTop: 6 }}>
                    {item.qualifier}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 11 — FINAL CTA (Dark)
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: "#FFF8EE" }}>
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "url('/backgrounds/bg-14.jpg.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl font-normal tracking-tight leading-tight mb-4"
            style={{ color: "#000000" }}
          >
            Your next 1,000 installs<br />
            are one creator partnership away.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base mb-10" style={{ color: "rgba(0,0,0,0.5)", fontSize: 16, fontWeight: 400 }}
          >
            No commitment. Cancel anytime. Integrate in under an hour.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <Link to="/signup">
              <Button size="lg" className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90 border border-transparent">
                Get Started Free <ArrowRight size={16} />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="h-12 px-8 border-foreground/30 text-foreground hover:bg-foreground/5 bg-transparent">
                Book a Demo
              </Button>
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xs" style={{ color: "rgba(0,0,0,0.4)" }}
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
    </>
  );
};

export default Landing;
