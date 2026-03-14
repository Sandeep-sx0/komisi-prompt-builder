import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  ArrowRight, Menu, X, Twitter, Github, Linkedin,
  Smartphone, Shield, Zap, Box, Check, X as XIcon,
  ExternalLink,
} from "lucide-react";
import { ShimmeringText } from "@/components/animate-ui/primitives/texts/shimmering-text";
import { SplittingText } from "@/components/animate-ui/primitives/texts/splitting-text";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";
import { SlidingNumber } from "@/components/animate-ui/primitives/texts/sliding-number";
import { Shine } from "@/components/animate-ui/primitives/effects/shine";
import { Magnetic } from "@/components/animate-ui/primitives/effects/magnetic";
import { Tilt } from "@/components/animate-ui/primitives/effects/tilt";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

/* ── Pill label component ── */
const PillLabel = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div className={cn(
    "inline-flex items-center px-4 py-1.5 mb-8 border font-mono text-xs uppercase tracking-[0.15em]",
    dark ? "border-white/20 text-white/50" : "border-border text-text-secondary"
  )}>
    {children}
  </div>
);

/* ── Reusable scroll-reveal wrapper ── */
const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ── Data ── */
const logoFiles = [
  "/logos/calibre.svg",
  "/logos/atomicojs.svg",
  "/logos/hootsuite.svg",
  "/logos/nvidia.svg",
  "/logos/broadcom.svg",
  "/logos/architect.svg",
  "/logos/descript.svg",
  "/logos/storyblocks.svg",
  "/logos/builder-io.svg",
  "/logos/launchdarkly.svg",
  "/logos/notion.svg",
  "/logos/posthog.svg",
  "/logos/snaplet.svg",
  "/logos/linear.svg",
  "/logos/biomejs.svg",
  "/logos/perplexity.svg",
  "/logos/importio.svg",
];

const pricingPlans = [
  {
    name: "Free", price: "$0", yearly: "$0",
    included: ["5 affiliates", "Basic attribution", "RevenueCat integration", "Community support"],
    excluded: ["Fraud detection", "Adapty integration", "Marketplace access"],
    cta: "Get Started →", primary: false,
  },
  {
    name: "Growth", price: "$49", yearly: "$39", popular: true,
    included: ["25 affiliates", "Full attribution (iOS + Android)", "0% platform commission", "RevenueCat + Adapty", "AI fraud detection", "Stripe Connect payouts", "Marketplace access", "Priority support"],
    excluded: [],
    cta: "Start Growth Plan →", primary: true,
  },
  {
    name: "Scale", price: "$149", yearly: "$119",
    included: ["Unlimited affiliates", "0% platform commission", "All integrations", "Custom commission tiers", "White label options", "API access", "Custom addons", "Dedicated support"],
    excluded: [],
    cta: "Start Scale Plan →", primary: false,
  },
];

const caseStudies = [
  { headline: "How MindfulApp cut CAC by 60% using creator affiliates", tags: ["MINDFULAPP", "WELLNESS"], stat1: "60%", stat1Label: "CAC reduction", stat2: "$3,000/mo", stat2Label: "paid ads replaced", name: "Sarah Chen", role: "Head of Growth" },
  { headline: "How FocusTimer onboarded 40 creators in under 2 weeks", tags: ["FOCUSTIMER", "PRODUCTIVITY"], stat1: "40", stat1Label: "creators live", stat2: "5 min", stat2Label: "RevenueCat setup", name: "David Park", role: "Founder & CTO" },
  { headline: "How DailyYoga detected $2K in fake installs before first payout", tags: ["DAILYYOGA", "HEALTH"], stat1: "$2,000", stat1Label: "fraud blocked", stat2: "0", stat2Label: "false payouts sent", name: "Priya Patel", role: "Co-founder" },
  { headline: "How AlphaApp went from 0 to 30% revenue from creator referrals", tags: ["ALPHAAPP", "FINANCE"], stat1: "30%", stat1Label: "revenue share", stat2: "8 weeks", stat2Label: "from zero to running", name: "Alex Rivera", role: "Founder" },
];

/* ── Helper to render animated stat numbers ── */
const AnimatedStat = ({ value }: { value: string }) => {
  // Extract numeric part for counting animation
  const match = value.match(/^(\$?)([\d,]+)(%?)(.*)$/);
  if (!match) return <>{value}</>;
  const [, prefix, numStr, suffix, rest] = match;
  const num = parseInt(numStr.replace(/,/g, ''));
  if (isNaN(num)) return <>{value}</>;
  return (
    <CountingNumber
      number={num}
      prefix={prefix}
      suffix={suffix + rest}
      inView
      inViewOnce
      transition={{ stiffness: 60, damping: 30 }}
    />
  );
};

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════════
          SECTION 1 — NAVBAR
      ═══════════════════════════════════════════ */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      )}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-lg text-foreground tracking-tight font-normal">komisi</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Product", href: "#product" },
              { label: "Pricing", href: "#pricing" },
              { label: "Docs", href: "#" },
              { label: "Marketplace", href: "#marketplace" },
            ].map(l => (
              <a key={l.label} href={l.href} className="text-sm text-text-secondary hover:text-foreground transition-colors">{l.label}</a>
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
                <a key={l} href="#" className="block text-sm py-2 text-text-secondary">{l}</a>
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
      <section className="pt-36 pb-24 px-6 relative overflow-hidden">
        {/* Sky background image — furthest back */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Komisi_BG.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Flickering grid background — on top of sky */}
        <div className="absolute inset-0 z-[1]">
          <FlickeringGrid
            squareSize={4}
            gridGap={12}
            flickerChance={0.05}
            maxOpacity={0.05}
            color="#000000"
            className="w-full h-full"
          />
        </div>
        {/* Bottom fade to blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

        <div className="relative z-20 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0 }}>
            <PillLabel><ShimmeringText duration={3}>BUILT FOR MOBILE APPS</ShimmeringText></PillLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-normal tracking-tighter text-foreground leading-[1.1] mb-6"
          >
            <SplittingText
              text="The infrastructure between mobile apps and the creator economy."
              type="words"
              delay={0.2}
              stagger={0.04}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-secondary max-w-[600px] mx-auto mb-10"
          >
            Attribute every install. Automate every payout.<br className="hidden sm:block" />
            Launch your creator affiliate program in days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <Link to="/signup" className="inline-flex">
              <Magnetic strength={0.2} className="inline-flex items-center">
                <Shine className="inline-flex items-center">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }} className="inline-flex">
                    <Button size="lg" className="h-12 px-8 border border-transparent">Try Komisi <ArrowRight size={16} /></Button>
                  </motion.div>
                </Shine>
              </Magnetic>
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }} className="inline-flex">
              <Button variant="outline" size="lg" className="h-12 px-8">Book a Demo</Button>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-text-tertiary"
          >
            Trusted by 200+ indie app developers · No credit card required
          </motion.p>
        </div>

        {/* Floating testimonial cards */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.6 },
            x: { duration: 0.7, delay: 0.6 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
          }}
          className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/4 max-w-[260px] border border-border bg-background p-5 shadow-lg z-20"
        >
          <p className="text-sm text-text-secondary mb-3">"Our CAC dropped 60% in three months."</p>
          <p className="text-xs text-foreground font-normal">Sarah Chen</p>
          <p className="text-xs text-text-tertiary">Head of Growth, MindfulApp</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.7 },
            x: { duration: 0.7, delay: 0.7 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
          }}
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/3 max-w-[260px] border border-border bg-background p-5 shadow-lg z-20"
        >
          <p className="text-sm text-text-secondary mb-3">"RevenueCat setup took under 5 minutes."</p>
          <p className="text-xs text-foreground font-normal">David Park</p>
          <p className="text-xs text-text-tertiary">Founder, FocusTimer</p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — LOGO BAR
      ═══════════════════════════════════════════ */}
      <section className="py-10 border-y border-border overflow-hidden">
        <Reveal>
          <p className="text-xs text-text-tertiary text-center mb-6 uppercase tracking-[0.1em]">
            Developers building on Komisi
          </p>
        </Reveal>
        <div className="marquee-container">
          <div className="marquee-track hover:[animation-play-state:paused]">
            {[...logoFiles, ...logoFiles].map((src, i) => (
              <div key={i} className="opacity-50 flex items-center shrink-0 [&_svg_*]:!fill-black">
                <img src={src} alt="" height={20} className="h-5 w-auto brightness-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — HOW IT WORKS
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6" id="product">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <PillLabel>THREE STEPS</PillLabel>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight">
              Under 10 lines of code.<br />
              A full affiliate program running in days.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 — Install SDK */}
            <Reveal delay={0}>
              <Tilt maxTilt={6}><motion.div className="border border-border bg-card overflow-hidden h-full">
                <div className="bg-foreground p-6">
                  <pre className="text-primary-foreground font-mono text-sm leading-relaxed">
{`KomisiSDK.configure(
  apiKey: "your_key"
)
KomisiSDK.resolve()`}
                  </pre>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-normal text-foreground mb-2">Install the SDK</h3>
                  <p className="text-sm text-text-secondary mb-4">One method call. Works on iOS, Android, Flutter, and React Native. Initializes in under 100ms. Zero impact on app performance.</p>
                  <div className="flex flex-wrap gap-2">
                    {["iOS", "Android", "Flutter", "React Native"].map(t => (
                      <span key={t} className="text-xs border border-border text-text-tertiary px-2 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div></Tilt>
            </Reveal>

            {/* Card 2 — Connect Revenue */}
            <Reveal delay={0.08}>
              <Tilt maxTilt={6}><motion.div className="border border-border bg-card overflow-hidden h-full">
                <div className="bg-muted p-6 flex items-center justify-center gap-6 h-[160px]">
                  <div className="w-16 h-16 bg-background border border-border flex items-center justify-center">
                    <span className="text-[10px] text-text-tertiary text-center leading-tight">Revenue<br/>Cat</span>
                  </div>
                  <div className="w-8 border-t border-dashed border-text-tertiary" />
                  <div className="w-16 h-16 bg-background border border-border flex items-center justify-center">
                    <span className="text-[10px] text-text-tertiary">Komisi</span>
                  </div>
                  <div className="w-8 border-t border-dashed border-text-tertiary" />
                  <div className="w-16 h-16 bg-background border border-border flex items-center justify-center">
                    <span className="text-[10px] text-text-tertiary">Adapty</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-normal text-foreground mb-2">Connect RevenueCat or Adapty</h3>
                  <p className="text-sm text-text-secondary mb-4">Point your existing webhook to Komisi. The SDK sets $komisiAffiliateId on every attributed user automatically. No additional code.</p>
                  <div className="flex flex-wrap gap-2">
                    {["RevenueCat", "Adapty", "Stripe Connect"].map(t => (
                      <span key={t} className="text-xs border border-border text-text-tertiary px-2 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div></Tilt>
            </Reveal>

            {/* Card 3 — Invite Creators */}
            <Reveal delay={0.16}>
              <Tilt maxTilt={6}><motion.div className="border border-border bg-card overflow-hidden h-full">
                <div className="bg-muted p-6 flex items-center justify-center h-[160px]">
                  <div className="w-full max-w-[200px] border border-border bg-background p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-muted flex items-center justify-center text-xs text-text-tertiary">AV</div>
                      <div>
                        <div className="text-sm text-foreground">@creator</div>
                        <div className="text-[10px] text-text-tertiary">12.4K followers</div>
                      </div>
                    </div>
                    <div className="bg-foreground text-primary-foreground text-xs text-center py-1.5">Apply</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-normal text-foreground mb-2">Invite creators or find them in the marketplace</h3>
                  <p className="text-sm text-text-secondary mb-4">Share your program link or browse the Komisi marketplace. Creators apply, you approve. Tracking links generated instantly.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Tracking Links", "Referral Codes", "Marketplace"].map(t => (
                      <span key={t} className="text-xs border border-border text-text-tertiary px-2 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div></Tilt>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — ATTRIBUTION ENGINE
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Copy */}
          <Reveal>
            <PillLabel>HOW ATTRIBUTION WORKS</PillLabel>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight mb-10">
              Every install attributed.<br />
              No IDFA. No ATT prompt.<br />
              No guesswork.
            </h2>

            <div className="space-y-0">
              {[
                { step: "STEP 1", text: "Creator shares their unique Komisi link" },
                { step: "STEP 2", text: "User clicks and lands in App Store or Google Play" },
                { step: "STEP 3", text: "App installs" },
                { step: "STEP 4", text: "SDK resolves attribution on first launch", detail: "Android — deterministic via Google Play Install Referrer API. 100% accurate.\n\niOS — server-side fingerprint matching using IP, locale, timezone, device model, screen resolution. Confidence scoring 0.60–0.95. Referral code fallback if below threshold." },
                { step: "STEP 5", text: "RevenueCat or Adapty webhook fires on subscription event" },
                { step: "STEP 6", text: "Commission calculated against net revenue after store fees. Payout queued." },
              ].map((s, i) => (
                <div key={i} className="border-t border-border py-4">
                  <div className="flex gap-4">
                    <span className="text-xs font-mono text-text-tertiary tracking-wider whitespace-nowrap pt-0.5">{s.step}</span>
                    <div>
                      <p className="text-sm text-foreground">{s.text}</p>
                      {s.detail && <p className="text-xs text-text-secondary mt-2 whitespace-pre-line leading-relaxed">{s.detail}</p>}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-border" />
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {["No IDFA", "No ATT prompt", "No cookies", "App Store privacy label: zero impact"].map(t => (
                <span key={t} className="text-xs bg-muted text-text-secondary px-3 py-1.5">{t}</span>
              ))}
            </div>
          </Reveal>

          {/* Right — Flow diagram */}
          <Reveal delay={0.2} className="flex items-center">
            <div className="w-full bg-foreground p-8 lg:p-10">
              <div className="space-y-4">
                {[
                  { label: "Creator Link", sub: "" },
                  { label: "App Store / Play Store", sub: "" },
                  { label: "App Install", sub: "" },
                  { label: "SDK First Launch", sub: "Android: Play Install Referrer | iOS: Fingerprint Match" },
                  { label: "RevenueCat Webhook", sub: "" },
                  { label: "Commission Queued", sub: "" },
                ].map((node, i) => (
                  <React.Fragment key={i}>
                    <div className="border border-white/20 px-5 py-3">
                      <p className="text-sm text-primary-foreground">{node.label}</p>
                      {node.sub && <p className="text-[10px] text-white/40 mt-1">{node.sub}</p>}
                    </div>
                    {i < 5 && (
                      <div className="flex justify-center">
                        <div className="w-px h-4 bg-white/20" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — FEATURE CARDS
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <PillLabel>BUILT FOR PRODUCTION</PillLabel>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight">
              Everything the infrastructure needs.<br />
              Nothing it doesn't.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1 */}
            <Reveal delay={0}>
              <Tilt maxTilt={6}><div className="border border-border bg-card overflow-hidden">
                <div className="bg-muted p-8 flex items-center justify-center gap-12">
                  <div className="text-center">
                    <Smartphone size={32} className="text-text-secondary mx-auto mb-2" />
                    <span className="text-xs text-text-tertiary block">Android</span>
                    <span className="text-[10px] text-text-tertiary">Install Referrer</span>
                  </div>
                  <div className="text-center">
                    <Smartphone size={32} className="text-text-secondary mx-auto mb-2" />
                    <span className="text-xs text-text-tertiary block">iOS</span>
                    <span className="text-[10px] text-text-tertiary">Fingerprint</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-normal text-foreground mb-2">Dual platform attribution</h3>
                  <p className="text-sm text-text-secondary">Android uses Google Play Install Referrer — deterministic, 100% accurate. iOS uses server-side fingerprint matching with Apple-permitted signals only. No IDFA. No ATT prompt triggered. Ever.</p>
                </div>
              </div></Tilt>
            </Reveal>

            {/* Feature 2 */}
            <Reveal delay={0.08}>
              <Tilt maxTilt={6}><div className="border border-border bg-card overflow-hidden">
                <div className="bg-muted p-8 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {["RevenueCat", "Adapty", "Stripe", "Apple", "Google Play", "Paddle"].map(n => (
                      <div key={n} className="w-20 h-12 bg-background border border-border flex items-center justify-center">
                        <span className="text-[10px] text-text-tertiary text-center">{n}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-normal text-foreground mb-2">Native webhook integrations</h3>
                  <p className="text-sm text-text-secondary">RevenueCat and Adapty webhooks supported natively. Stripe Connect for automated payouts. Apple receipt verification and Google Play API as direct fallbacks. Paddle and Stripe Billing coming soon.</p>
                </div>
              </div></Tilt>
            </Reveal>

            {/* Feature 3 */}
            <Reveal delay={0.16}>
              <Tilt maxTilt={6}><div className="border border-border bg-card overflow-hidden">
                <div className="bg-muted p-8 flex items-center justify-center">
                  <div className="w-full max-w-[280px]">
                    <div className="flex items-center justify-between text-xs text-text-tertiary mb-2">
                      <span>0.0</span>
                      <span>Fraud Score</span>
                      <span>1.0</span>
                    </div>
                    <div className="w-full h-3 bg-background border border-border relative">
                      <div className="absolute left-0 top-0 h-full w-[70%] bg-foreground/20" />
                      <div className="absolute left-[70%] top-0 h-full w-[20%] bg-warning/40" />
                      <div className="absolute left-[90%] top-0 h-full w-[10%] bg-destructive/40" />
                      <div className="absolute left-[70%] -top-5 text-[9px] text-warning">auto-hold</div>
                      <div className="absolute left-[90%] -top-5 text-[9px] text-destructive">auto-block</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-normal text-foreground mb-2">AI fraud detection built in</h3>
                  <p className="text-sm text-text-secondary">Velocity checks, IP clustering, device repetition, geo mismatch, and self-referral detection run on every install. Fraud score 0.0–1.0. Auto-hold at 0.7. Auto-block at 0.9. No manual review needed.</p>
                </div>
              </div></Tilt>
            </Reveal>

            {/* Feature 4 */}
            <Reveal delay={0.24}>
              <Tilt maxTilt={6}><div className="border border-border bg-card overflow-hidden">
                <div className="bg-muted p-8 flex items-center justify-center">
                  <div className="space-y-3 w-full max-w-[240px]">
                    <div>
                      <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                        <span>iOS</span><span>&lt;80KB</span>
                      </div>
                      <div className="w-full h-2 bg-background border border-border"><div className="h-full w-[35%] bg-foreground" /></div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                        <span>Android</span><span>&lt;100KB</span>
                      </div>
                      <div className="w-full h-2 bg-background border border-border"><div className="h-full w-[42%] bg-foreground" /></div>
                    </div>
                    <p className="text-[10px] text-text-tertiary text-center mt-2">&lt;30ms cold start</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-normal text-foreground mb-2">Lightweight. Invisible. Production-safe.</h3>
                  <p className="text-sm text-text-secondary">SDK size under 80KB on iOS, 100KB on Android. Cold start impact under 30ms. All network calls async on background threads. Fails silently if server is unreachable. Zero impact on your app experience.</p>
                </div>
              </div></Tilt>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — FULL-BLEED QUOTE
      ═══════════════════════════════════════════ */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 bg-foreground">
        <Reveal className="max-w-3xl text-center">
          <p className="text-2xl md:text-3xl lg:text-4xl text-primary-foreground leading-snug mb-10">
            "We replaced $3,000/month in paid ads with Komisi affiliates. Our CAC dropped 60% in three months."
          </p>
          <div>
            <p className="text-xs text-white/60 uppercase tracking-[0.2em] mb-1">SARAH CHEN</p>
            <p className="text-xs text-white/40 uppercase tracking-[0.15em]">HEAD OF GROWTH, MINDFULAPP</p>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — CREATOR MARKETPLACE
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6" id="marketplace">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <Reveal>
            <PillLabel>CREATOR MARKETPLACE</PillLabel>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight mb-6">
              No creators yet?<br />
              Find them here.
            </h2>
            <p className="text-base text-text-secondary mb-8 max-w-[480px]">
              Browse creators by niche, platform, and audience size directly inside Komisi. Creators apply to your program. You approve. A unique tracking link and referral code are generated instantly. Every install and subscription attributed from day one — no manual setup on their end.
            </p>
            <a href="#" className="text-sm text-text-secondary hover:text-foreground transition-colors inline-flex items-center gap-1">
              Are you a creator? See how Komisi works for you. <ArrowRight size={14} />
            </a>
          </Reveal>

          {/* Right — Marketplace preview */}
          <Reveal delay={0.2}>
            <div className="bg-muted p-6 lg:p-8 space-y-4">
              {[
                { name: "Emma Davis", niche: "Productivity", followers: "45.2K", platforms: ["TikTok", "YouTube"] },
                { name: "James Lee", niche: "Wellness", followers: "28.7K", platforms: ["Instagram", "YouTube"] },
                { name: "Sofia Martinez", niche: "Finance", followers: "91.3K", platforms: ["TikTok", "Instagram"] },
              ].map(c => (
                <motion.div key={c.name} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="bg-background border border-border p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted flex items-center justify-center text-xs text-text-tertiary">
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm text-foreground">{c.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {c.platforms.map(p => (
                          <span key={p} className="text-[10px] text-text-tertiary">{p}</span>
                        ))}
                        <span className="text-[10px] text-text-tertiary">·</span>
                        <span className="text-[10px] text-text-tertiary">{c.followers}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] bg-muted text-text-tertiary px-2 py-0.5">{c.niche}</span>
                    <Button size="sm" variant="outline" className="text-xs h-7">Apply</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9 — CASE STUDY CARDS
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight">
              Developers replacing paid UA<br />with Komisi.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((cs, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="border border-border bg-card p-8 hover:border-foreground/30">
                  <h3 className="text-lg font-normal text-foreground mb-4 leading-snug">{cs.headline}</h3>
                  <div className="flex gap-2 mb-6">
                    {cs.tags.map(t => (
                      <span key={t} className="text-[10px] bg-muted text-text-tertiary px-2 py-1 uppercase tracking-wider">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-12 mb-6">
                    <div>
                      <p className="text-2xl text-foreground font-normal"><AnimatedStat value={cs.stat1} /></p>
                      <p className="text-xs text-text-tertiary">{cs.stat1Label}</p>
                    </div>
                    <div>
                      <p className="text-2xl text-foreground font-normal"><AnimatedStat value={cs.stat2} /></p>
                      <p className="text-xs text-text-tertiary">{cs.stat2Label}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-sm text-foreground">{cs.name}</p>
                      <p className="text-xs text-text-tertiary">{cs.role}</p>
                    </div>
                    <div className="w-10 h-10 bg-muted flex items-center justify-center text-[10px] text-text-tertiary">
                      {cs.tags[0]?.slice(0, 2)}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 10 — PRICING
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 border-t border-border" id="pricing">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <PillLabel>SIMPLE PRICING</PillLabel>
            <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight mb-3">Start free. Scale as you grow.</h2>
            <p className="text-base text-text-secondary">Only pay when you're earning more.</p>
          </Reveal>

          <Reveal className="flex justify-center mb-10">
            <div className="flex gap-0 border border-border">
              <button onClick={() => setBilling("monthly")} className={cn("h-10 px-5 text-sm transition-all", billing === "monthly" ? "bg-foreground text-primary-foreground" : "bg-background text-text-secondary")}>Monthly</button>
              <button onClick={() => setBilling("yearly")} className={cn("h-10 px-5 text-sm transition-all", billing === "yearly" ? "bg-foreground text-primary-foreground" : "bg-background text-text-secondary")}>Yearly · Save 20%</button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "border bg-card p-8 relative",
                    plan.popular ? "border-foreground" : "border-border",
                  )}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-6 bg-foreground text-primary-foreground text-xs px-3 py-1">MOST POPULAR</span>
                  )}
                  <h3 className="text-xl font-normal text-foreground">{plan.name}</h3>
                  <div className="mt-3 mb-6">
                    <span className="text-3xl text-foreground font-normal">
                      <SlidingNumber 
                        number={billing === "monthly" 
                          ? parseInt(plan.price.replace(/[^0-9]/g, '')) 
                          : parseInt(plan.yearly.replace(/[^0-9]/g, ''))} 
                        prefix={plan.price.startsWith('$') ? '$' : ''} 
                      />
                    </span>
                    <span className="text-text-secondary"> / month</span>
                  </div>
                  <ul className="space-y-2.5 mb-8">
                    {plan.included.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                        <Check size={14} className="text-foreground shrink-0" /> {f}
                      </li>
                    ))}
                    {plan.excluded.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-tertiary">
                        <XIcon size={14} className="text-text-tertiary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button variant={plan.primary ? "default" : "outline"} className="w-full">{plan.cta}</Button>
                  </Link>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="text-center text-sm text-text-secondary mt-8">Need more? <a href="#" className="underline hover:text-foreground transition-colors">Talk to us →</a></p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 11 — FINAL CTA
      ═══════════════════════════════════════════ */}
      <section className="py-24 px-6 bg-foreground">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal text-primary-foreground tracking-tight mb-4">
            Ready to attribute every install?
          </h2>
          <p className="text-base text-white/50 mb-10">
            Join 200+ developers already running creator affiliate programs on Komisi.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/signup" className="inline-flex">
              <Magnetic strength={0.2} className="inline-flex items-center">
                <Shine className="inline-flex items-center">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }} className="inline-flex">
                    <Button size="lg" className="h-12 px-8 bg-primary-foreground text-foreground hover:bg-white/90 border border-transparent">Try Komisi <ArrowRight size={16} /></Button>
                  </motion.div>
                </Shine>
              </Magnetic>
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }} className="inline-flex">
              <Button variant="outline" size="lg" className="h-12 px-8 border-white/20 text-primary-foreground hover:bg-white/10 bg-transparent">Book a Demo</Button>
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 12 — FOOTER
      ═══════════════════════════════════════════ */}
      <footer className="bg-foreground text-primary-foreground px-6 pt-16 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <span className="text-lg font-normal tracking-tight block mb-2">komisi</span>
              <p className="text-xs text-white/40">The infrastructure between mobile apps and the creator economy.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Marketplace"] },
              { title: "Resources", links: ["Docs", "API Reference", "SDK Guides", "Support"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-normal mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">© 2026 Komisi · All rights reserved</p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-white/30 hover:text-white transition-colors"><Icon size={16} /></a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
