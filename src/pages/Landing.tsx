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
  AlertTriangle, ExternalLink,
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

/* ── Logo files ── */
const logoFiles = [
  "/logos/calibre.svg", "/logos/atomicojs.svg", "/logos/hootsuite.svg",
  "/logos/nvidia.svg", "/logos/broadcom.svg", "/logos/architect.svg",
  "/logos/descript.svg", "/logos/storyblocks.svg", "/logos/builder-io.svg",
  "/logos/launchdarkly.svg", "/logos/notion.svg", "/logos/posthog.svg",
  "/logos/snaplet.svg", "/logos/linear.svg", "/logos/biomejs.svg",
  "/logos/perplexity.svg", "/logos/importio.svg",
];

/* ── Code tabs data ── */
const codeExamples: Record<string, string> = {
  Swift: `// Your app's code
import KomisiSDK

KomisiSDK.configure(
  apiKey: "YOUR_API_KEY"
)
KomisiSDK.resolve()
// ✔ Attribution active`,
  Kotlin: `// Your app's code
import com.komisi.sdk.Komisi

Komisi.configure(
  apiKey = "YOUR_API_KEY"
)
Komisi.resolve()
// ✔ Attribution active`,
  Flutter: `// Your app's code
import 'package:komisi_sdk/komisi.dart';

Komisi.configure(
  apiKey: 'YOUR_API_KEY',
);
Komisi.resolve();
// ✔ Attribution active`,
  "React Native": `// Your app's code
import Komisi from 'komisi-react-native';

Komisi.configure({
  apiKey: 'YOUR_API_KEY',
});
Komisi.resolve();
// ✔ Attribution active`,
};

/* ── Testimonial data ── */
const testimonials = [
  {
    quote: "We replaced $3,000/month in paid ads with Komisi affiliates. Our CAC dropped 60% in three months. I wish we had started sooner.",
    name: "Sarah Chen", title: "Head of Growth", company: "MindfulApp",
  },
  {
    quote: "Setup took less time than writing this testimonial. The RevenueCat integration worked out of the box.",
    name: "James Park", title: "Founder", company: "FocusTimer",
  },
  {
    quote: "Creators love the portal. They can see their earnings in real time and they get paid without asking. Retention on our affiliate program is way higher than I expected.",
    name: "Marcus Lee", title: "Growth Lead", company: "CalorieSnap",
  },
  {
    quote: "The fraud detection alone paid for itself. We caught fake installs in the first week.",
    name: "Priya Nair", title: "Founder", company: "MindfulApp",
  },
];

/* ── Integration logos ── */
const integrations = [
  "RevenueCat", "Adapty", "Stripe Connect", "Apple App Store", "Google Play",
  "Amplitude", "Mixpanel", "AppsFlyer", "Adjust", "Firebase",
  "Braze", "Slack", "Webhooks", "REST API", "TikTok",
];

const sdkPlatforms = [
  { name: "Swift SDK", icon: "🍎" },
  { name: "Kotlin SDK", icon: "🤖" },
  { name: "Flutter SDK", icon: "💙" },
  { name: "React Native SDK", icon: "⚛️" },
  { name: "Web API", icon: "🌐" },
  { name: "Unity SDK", icon: "🎮" },
];

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState("Swift");
  const [copied, setCopied] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeCodeTab]);
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
          {/* Left — text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-text-secondary border border-border px-3 py-1.5 mb-6">
                ✦ Built for mobile app developers
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-normal tracking-tighter text-foreground leading-[1.1] mb-6"
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4 mb-2"
            >
              <Link to="/demo" className="text-sm text-text-secondary hover:text-foreground transition-colors">
                Book a Demo →
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-xs text-text-tertiary mt-4"
            >
              Trusted by 200+ indie app developers · No credit card required
            </motion.p>
          </div>

          {/* Right — product visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Mock mobile screen */}
            <div className="relative bg-muted border border-border p-4 max-w-[320px] ml-auto">
              <div className="bg-background border border-border p-4 mb-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-muted flex items-center justify-center text-[10px] text-text-tertiary">CR</div>
                  <div>
                    <p className="text-xs text-foreground">@creator_emma</p>
                    <p className="text-[10px] text-text-tertiary">Sharing affiliate link on TikTok</p>
                  </div>
                </div>
                <div className="bg-muted border border-border p-3">
                  <p className="text-[10px] text-text-secondary mb-1">Try this amazing app! 🔗</p>
                  <p className="text-[10px] text-text-tertiary">komisi.link/emma-focus...</p>
                </div>
              </div>
            </div>

            {/* Floating analytics panel */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-8 bg-background border border-border p-4 shadow-lg w-[240px]"
            >
              <p className="text-[10px] text-text-tertiary uppercase tracking-wider mb-3">Today's Performance</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-secondary">Installs Today</span>
                  <span className="text-sm text-foreground">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-secondary">Revenue Attributed</span>
                  <span className="text-sm text-foreground">$1,240</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-secondary">Active Creators</span>
                  <span className="text-sm text-foreground">12</span>
                </div>
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
          <p className="text-xs text-text-tertiary text-center mb-6 uppercase tracking-[0.15em]">
            DEVELOPERS BUILDING WITH KOMISI
          </p>
        </Reveal>
        <div className="marquee-container">
          <div className="marquee-track hover:[animation-play-state:paused]">
            {[...logoFiles, ...logoFiles].map((src, i) => (
              <div key={i} className="opacity-50 flex items-center shrink-0">
                <img src={src} alt="" height={20} className="h-5 w-auto brightness-0" />
              </div>
            ))}
          </div>
        </div>
        <Reveal>
          <p className="text-xs text-text-tertiary text-center mt-6">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 — Developers */}
            <Reveal delay={0}>
              <div className="border border-border bg-card h-full flex flex-col">
                <div className="bg-foreground p-6 h-[200px] flex items-center justify-center">
                  <pre className="text-xs text-primary-foreground leading-relaxed">
{`KomisiSDK.configure(
  apiKey: "your_key"
)`}
                  </pre>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">For Developers →</p>
                  <ul className="space-y-2 mt-auto">
                    {["Lightweight SDK", "No IDFA", "Privacy-safe attribution", "RevenueCat integration"].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check size={12} className="text-foreground shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Card 2 — Growth Teams */}
            <Reveal delay={0.08}>
              <div className="border border-border bg-card h-full flex flex-col">
                <div className="bg-muted p-6 h-[200px] flex items-center justify-center">
                  <div className="w-full max-w-[200px]">
                    <p className="text-[10px] text-text-tertiary mb-2">Install Growth</p>
                    <div className="flex items-end gap-1 h-20">
                      {[20, 35, 28, 45, 52, 48, 65, 78, 72, 90, 95, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-foreground/20" style={{ height: `${h}%` }}>
                          <div className="w-full bg-foreground" style={{ height: `${Math.min(h, 70)}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">For Growth Teams →</p>
                  <ul className="space-y-2 mt-auto">
                    {["Campaign management", "Creator analytics", "CAC tracking", "Commission tiers"].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check size={12} className="text-foreground shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Card 3 — Creators */}
            <Reveal delay={0.16}>
              <div className="border border-border bg-card h-full flex flex-col">
                <div className="bg-muted p-6 h-[200px] flex items-center justify-center">
                  <div className="bg-background border border-border p-4 w-full max-w-[200px]">
                    <p className="text-[10px] text-text-tertiary mb-1">This month</p>
                    <p className="text-2xl text-foreground">$3,562</p>
                    <p className="text-[10px] text-text-tertiary">earned this month</p>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs text-text-tertiary uppercase tracking-wider mb-2">For Creators →</p>
                  <ul className="space-y-2 mt-auto">
                    {["Unique tracking links", "Real-time earnings", "Automatic payouts", "Content performance"].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check size={12} className="text-foreground shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
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
              <div>
                <p className="text-3xl md:text-4xl text-white font-normal mb-2">
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
                <p className="text-sm" style={{ color: "#9CA3AF" }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — SDK CODE BLOCK (Dark, continues)
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#0C1C28" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — text + testimonial */}
          <Reveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-normal text-white tracking-tight leading-tight mb-6">
                Integrate in under<br />30 minutes.
              </h2>
              <p className="text-base mb-6" style={{ color: "#9CA3AF" }}>
                One SDK. Works on iOS, Android, Flutter, and React Native. Drop in 3 lines of code and Komisi handles attribution, fraud detection, and payouts automatically.
              </p>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1 mb-10">
                Read the docs <ArrowRight size={14} />
              </a>

              {/* Testimonial */}
              <div className="border border-white/10 p-6 mt-8">
                <p className="text-sm text-white/70 mb-4 leading-relaxed">
                  "Setup was faster than I expected. The RevenueCat integration just worked — I had my first affiliate attributed within the hour."
                </p>
                <p className="text-xs text-white/50">James Park, Founder, FocusTimer</p>
              </div>
            </div>
          </Reveal>

          {/* Right — code block */}
          <Reveal delay={0.15}>
            <div>
              {/* Tabs */}
              <div className="flex border-b border-white/10">
                {Object.keys(codeExamples).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={cn(
                      "px-4 py-2.5 text-xs transition-colors",
                      activeCodeTab === tab ? "text-white border-b-2 border-white" : "text-white/40 hover:text-white/60"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Code */}
              <div className="relative bg-[#0D1117] p-6">
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <pre className="text-sm leading-relaxed overflow-x-auto">
                  {codeExamples[activeCodeTab].split('\n').map((line, i) => (
                    <div key={i}>
                      {line.startsWith('//') ? (
                        <span style={{ color: "#6A737D" }}>{line}</span>
                      ) : line.includes('import') ? (
                        <span><span style={{ color: "#F97583" }}>import</span><span style={{ color: "#E1E4E8" }}>{line.replace('import', '')}</span></span>
                      ) : line.includes('"') ? (
                        <span style={{ color: "#E1E4E8" }}>
                          {line.split('"').map((part, j) => 
                            j % 2 === 1 ? <span key={j} style={{ color: "#9ECE6A" }}>"{part}"</span> : part
                          )}
                        </span>
                      ) : (
                        <span style={{ color: "#E1E4E8" }}>{line}</span>
                      )}
                    </div>
                  ))}
                </pre>
              </div>

              {/* Below code */}
              <div className="flex items-center gap-4 mt-4">
                <span className="text-xs text-white/40">Open Source</span>
                <span className="text-xs text-white/20">·</span>
                <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors inline-flex items-center gap-1">
                  View on GitHub <ExternalLink size={10} />
                </a>
              </div>

              {/* SDK platform grid */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {sdkPlatforms.map(p => (
                  <div key={p.name} className="border border-white/10 p-3 text-center hover:border-white/20 transition-colors">
                    <span className="text-lg block mb-1">{p.icon}</span>
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

          {/* Feature 1 — Left text, Right visual */}
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
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                    "We finally know which creators are actually driving installs. Komisi's attribution is the most accurate we've tested."
                  </p>
                  <p className="text-xs text-text-tertiary">Sarah Chen, Head of Growth, MindfulApp</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="bg-muted border border-border p-8">
                <div className="flex items-center justify-center gap-3">
                  {[
                    { icon: <Link2 size={16} />, label: "Creator Link" },
                    { icon: <ArrowRight size={12} className="text-text-tertiary" />, label: "" },
                    { icon: <Download size={16} />, label: "App Store" },
                    { icon: <ArrowRight size={12} className="text-text-tertiary" />, label: "" },
                    { icon: <Download size={16} />, label: "Install" },
                    { icon: <ArrowRight size={12} className="text-text-tertiary" />, label: "" },
                    { icon: <Fingerprint size={16} />, label: "SDK Resolves" },
                    { icon: <ArrowRight size={12} className="text-text-tertiary" />, label: "" },
                    { icon: <CircleDollarSign size={16} />, label: "Commission" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={cn(item.label ? "w-10 h-10 border border-border bg-background flex items-center justify-center text-text-secondary" : "")}>
                        {item.icon}
                      </div>
                      {item.label && <span className="text-[9px] text-text-tertiary">{item.label}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Feature 2 — Right text, Left visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="bg-muted border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle size={16} className="text-warning" />
                  <span className="text-sm text-foreground">Suspicious activity detected</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Installs</span>
                    <span className="text-foreground">47</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Pattern</span>
                    <span className="text-foreground">Same IP range</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Timeframe</span>
                    <span className="text-foreground">2 hours</span>
                  </div>
                </div>
                <Button size="sm" variant="secondary" className="w-full">Review</Button>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="order-1 lg:order-2">
              <div>
                <h3 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight leading-tight mb-4">
                  AI fraud detection that protects your program automatically.
                </h3>
                <p className="text-base text-text-secondary mb-6">
                  Every conversion is scored in real time. Komisi flags suspicious install patterns — same IP clusters, abnormal velocity, emulator installs — before they cost you money. You review flagged events. Komisi handles the rest.
                </p>
                <a href="#" className="text-sm text-text-secondary hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8">
                  See how fraud detection works <ArrowRight size={14} />
                </a>
                <div className="border border-border p-5 mt-4">
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                    "We caught a creator sending fake installs within 24 hours. Komisi flagged it automatically — we would have paid out hundreds without it."
                  </p>
                  <p className="text-xs text-text-tertiary">David Park, Founder, FocusTimer</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Feature 3 — Left text, Right visual */}
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
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                    "I can see exactly which TikTok video drove the most subscriptions. That changes how we brief creators entirely."
                  </p>
                  <p className="text-xs text-text-tertiary">Marcus Lee, Growth Lead, CalorieSnap</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="bg-muted border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      {["Creator", "Platform", "Installs", "Trials", "Conv.", "Revenue"].map(h => (
                        <th key={h} className="text-left p-3 text-text-tertiary font-normal">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { creator: "Emma D.", platform: "TikTok", installs: "342", trials: "89", conv: "34", revenue: "$1,240" },
                      { creator: "James L.", platform: "YouTube", installs: "218", trials: "62", conv: "28", revenue: "$890" },
                      { creator: "Sofia M.", platform: "Instagram", installs: "156", trials: "41", conv: "19", revenue: "$620" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="p-3 text-foreground">{row.creator}</td>
                        <td className="p-3 text-text-secondary">{row.platform}</td>
                        <td className="p-3 text-foreground">{row.installs}</td>
                        <td className="p-3 text-text-secondary">{row.trials}</td>
                        <td className="p-3 text-text-secondary">{row.conv}</td>
                        <td className="p-3 text-foreground">{row.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>

          {/* Feature 4 — Right text, Left visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="order-2 lg:order-1">
              <div className="bg-muted border border-border p-6">
                <div className="space-y-3 mb-4">
                  {[
                    { name: "Emma Davis", amount: "$124.50", status: "Paid ✔" },
                    { name: "James Lee", amount: "$89.20", status: "Paid ✔" },
                    { name: "Sofia Martinez", amount: "$156.80", status: "Paid ✔" },
                    { name: "Alex Rivera", amount: "$97.50", status: "Paid ✔" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between bg-background border border-border p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted flex items-center justify-center text-[10px] text-text-tertiary">
                          {row.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm text-foreground">{row.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-foreground">{row.amount}</span>
                        <span className="text-[10px] text-success">{row.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full">Process All Payouts — $468</Button>
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
                  <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                    "Creators love that they just get paid. No back-and-forth, no invoices. It's made recruiting affiliates so much easier."
                  </p>
                  <p className="text-xs text-text-tertiary">Priya Nair, Founder, MindfulApp</p>
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
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {integrations.map(name => (
                <div key={name} className="border border-border bg-card p-4 text-center hover:border-foreground/20 transition-colors">
                  <div className="w-8 h-8 bg-muted mx-auto mb-2 flex items-center justify-center text-[10px] text-text-tertiary">
                    {name.slice(0, 2)}
                  </div>
                  <span className="text-xs text-text-secondary">{name}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <div className="border border-border p-6 text-center max-w-2xl mx-auto">
              <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                "The RevenueCat integration saved us weeks. Komisi just reads our existing webhook events — zero additional engineering."
              </p>
              <p className="text-xs text-text-tertiary">James Park, Founder, FocusTimer</p>
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

          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="text-center px-12"
              >
                <div className="w-12 h-12 bg-muted mx-auto mb-6 flex items-center justify-center text-sm text-text-tertiary">
                  {testimonials[activeTestimonial].name.split(" ").map(n => n[0]).join("")}
                </div>
                <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <p className="text-sm text-foreground">{testimonials[activeTestimonial].name}</p>
                <p className="text-xs text-text-tertiary">
                  {testimonials[activeTestimonial].title}, {testimonials[activeTestimonial].company}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-border flex items-center justify-center text-text-secondary hover:text-foreground transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-border flex items-center justify-center text-text-secondary hover:text-foreground transition-colors"
            >
              <ChevronRight size={18} />
            </button>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={cn(
                    "w-2 h-2 transition-colors",
                    i === activeTestimonial ? "bg-foreground" : "bg-border"
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
          {/* Secure */}
          <Reveal>
            <div className="text-center md:text-left">
              <Shield size={24} className="text-foreground mb-4 mx-auto md:mx-0" />
              <h4 className="text-lg font-normal text-foreground mb-3">Secure</h4>
              <ul className="space-y-2">
                {[
                  "Privacy-safe attribution — no IDFA, no cookies",
                  "App Store privacy label: zero impact",
                  "SOC2 compliant infrastructure",
                ].map(item => (
                  <li key={item} className="text-sm text-text-secondary">{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Reliable */}
          <Reveal delay={0.1}>
            <div className="text-center md:text-left">
              <Zap size={24} className="text-foreground mb-4 mx-auto md:mx-0" />
              <h4 className="text-lg font-normal text-foreground mb-3">Reliable</h4>
              <ul className="space-y-2">
                {[
                  "99.9% attribution accuracy",
                  "Real-time fraud detection",
                  "Stripe Connect for secure payouts",
                ].map(item => (
                  <li key={item} className="text-sm text-text-secondary">{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Simple */}
          <Reveal delay={0.2}>
            <div className="text-center md:text-left">
              <CheckCircle size={24} className="text-foreground mb-4 mx-auto md:mx-0" />
              <h4 className="text-lg font-normal text-foreground mb-3">Simple</h4>
              <ul className="space-y-2">
                {[
                  "Setup in under 30 minutes",
                  "Works with RevenueCat and Adapty",
                  "Dedicated onboarding support",
                ].map(item => (
                  <li key={item} className="text-sm text-text-secondary">{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 11 — FINAL CTA (Dark)
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#0C1C28" }}>
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-white tracking-tight leading-tight mb-4">
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
                <h4 className="text-sm font-normal mb-3">{col.title}</h4>
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
