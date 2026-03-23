import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, X as XIcon, Menu, X, Twitter, Github, Linkedin,
  Target, Shield, BarChart2, Zap, Code2,
} from "lucide-react";
import DarkVeil from "@/components/Backgrounds/DarkVeil";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ── Social proof logos (reused from landing) ── */
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

const navLinks = ["Product", "Pricing", "Docs", "Marketplace"];

/* ── Animation ease ── */
const ease = [0.16, 1, 0.3, 1] as const;
const anim = { duration: 0.5, ease };

/* ── Plan data ── */
const plans = [
  {
    id: "free",
    name: "FREE",
    tagline: "Test the waters",
    monthlyPrice: 0,
    yearlyPrice: 0,
    yearlyTotal: 0,
    cta: "Get Started Free →",
    ctaLink: "/signup",
    ctaStyle: "outlined" as const,
    noCcNote: true,
    dark: false,
    popular: false,
    features: [
      { included: true, text: "1 app · 5 affiliates · 1 campaign" },
      { included: true, text: "iOS + Android SDK attribution" },
      { included: true, text: "Privacy-safe — no IDFA, no ATT prompt" },
      { included: true, text: "RevenueCat integration" },
      { included: true, text: "Stripe Connect payouts (monthly)" },
      { included: true, text: "Basic dashboard · 30-day history" },
      { included: true, text: "Rules-based fraud detection" },
      { included: false, text: "UTM link builder" },
      { included: false, text: "Content tracking (TikTok / YouTube)" },
      { included: false, text: "Adapty integration" },
      { included: false, text: "API access · data export" },
    ],
  },
  {
    id: "growth",
    name: "GROWTH",
    tagline: "Build your channel",
    monthlyPrice: 49,
    yearlyPrice: 39,
    yearlyTotal: 468,
    cta: "Start Growth Plan →",
    ctaLink: "/signup",
    ctaStyle: "outlined" as const,
    noCcNote: false,
    dark: false,
    popular: false,
    features: [
      { included: true, text: "3 apps · 25 affiliates · 5 campaigns" },
      { included: true, text: "Everything in Free" },
      { included: true, text: "UTM link builder" },
      { included: true, text: "Content tracking — TikTok & YouTube" },
      { included: true, text: "Flutter + React Native SDK" },
      { included: true, text: "Adapty integration" },
      { included: true, text: "Funnel analytics · 90-day history" },
      { included: true, text: "On-demand payouts + tax docs (1099)" },
      { included: true, text: "API access (300 req/min)" },
      { included: true, text: "3 team members" },
      { included: false, text: "AI/ML fraud detection" },
      { included: false, text: "Custom payout schedule" },
      { included: false, text: "Natural language analytics" },
    ],
  },
  {
    id: "scale",
    name: "SCALE",
    tagline: "Go unlimited",
    monthlyPrice: 149,
    yearlyPrice: 119,
    yearlyTotal: 1428,
    cta: "Start Scale Plan →",
    ctaLink: "/signup",
    ctaStyle: "filled" as const,
    noCcNote: false,
    dark: false,
    popular: true,
    features: [
      { included: true, text: "Unlimited apps · affiliates · campaigns" },
      { included: true, text: "Everything in Growth" },
      { included: true, text: "0% platform commission", bold: true },
      { included: true, text: "AI/ML fraud detection" },
      { included: true, text: "Multi-touch attribution + QR codes" },
      { included: true, text: "Natural language analytics" },
      { included: true, text: "Revenue forecasting" },
      { included: true, text: "Custom payout schedule" },
      { included: true, text: "Wise + Payoneer payouts" },
      { included: true, text: "All SDKs including Unity + Web API" },
      { included: true, text: "Unlimited webhooks · 12-month history" },
      { included: true, text: "Featured marketplace placement" },
      { included: true, text: "10 team members" },
    ],
  },
  {
    id: "enterprise",
    name: "ENTERPRISE",
    tagline: "Built for scale",
    monthlyPrice: -1,
    yearlyPrice: -1,
    yearlyTotal: 0,
    cta: "Contact Sales →",
    ctaLink: "/demo",
    ctaStyle: "enterprise" as const,
    noCcNote: false,
    dark: true,
    popular: false,
    features: [
      { included: true, text: "Everything in Scale" },
      { included: true, text: "White-label API" },
      { included: true, text: "SSO / SAML 2.0" },
      { included: true, text: "SOC 2 Type II report" },
      { included: true, text: "GDPR DPA" },
      { included: true, text: "Dedicated infrastructure" },
      { included: true, text: "Unlimited team members" },
      { included: true, text: "Dedicated account manager · 4hr SLA" },
    ],
  },
];

/* ── Comparison table data ── */
const comparisonGroups = [
  {
    label: "LIMITS",
    rows: [
      ["Apps", "1", "3", "Unlimited", "Unlimited"],
      ["Active affiliates", "5", "25", "Unlimited", "Unlimited"],
      ["Campaigns", "1", "5", "Unlimited", "Unlimited"],
      ["Team members", "1", "3", "10", "Unlimited"],
      ["Platform commission", "20%", "10%", "0%", "0%"],
    ],
  },
  {
    label: "ATTRIBUTION & TRACKING",
    rows: [
      ["iOS fingerprint attribution", "✓", "✓", "✓", "✓"],
      ["Android Install Referrer", "✓", "✓", "✓", "✓"],
      ["No IDFA, no ATT prompt", "✓", "✓", "✓", "✓"],
      ["UTM link builder", "✗", "✓", "✓", "✓"],
      ["Content tracking (TikTok/YouTube)", "✗", "✓", "✓", "✓"],
      ["Multi-touch attribution", "✗", "✗", "✓", "✓"],
      ["QR code attribution", "✗", "✗", "✓", "✓"],
    ],
  },
  {
    label: "SDK",
    rows: [
      ["Swift / Kotlin", "✓", "✓", "✓", "✓"],
      ["Flutter / React Native", "✗", "✓", "✓", "✓"],
      ["Unity / Web API", "✗", "✗", "✓", "✓"],
    ],
  },
  {
    label: "INTEGRATIONS",
    rows: [
      ["RevenueCat", "✓", "✓", "✓", "✓"],
      ["Adapty", "✗", "✓", "✓", "✓"],
      ["Stripe Connect", "✓", "✓", "✓", "✓"],
      ["Wise / Payoneer", "✗", "✗", "✓", "✓"],
      ["Outbound webhooks", "✗", "3 endpoints", "Unlimited", "Unlimited"],
      ["API access", "✗", "300 req/min", "1000 req/min", "Custom"],
    ],
  },
  {
    label: "ANALYTICS",
    rows: [
      ["Basic dashboard", "✓", "✓", "✓", "✓"],
      ["Funnel analytics", "✗", "✓", "✓", "✓"],
      ["Data export (CSV)", "✗", "✓", "✓", "✓"],
      ["Natural language analytics", "✗", "✗", "✓", "✓"],
      ["Revenue forecasting", "✗", "✗", "✓", "✓"],
      ["Data history", "30 days", "90 days", "12 months", "Custom"],
    ],
  },
  {
    label: "FRAUD DETECTION",
    rows: [
      ["Rules-based fraud engine", "✓", "✓", "✓", "✓"],
      ["Manual review queue", "✗", "✓", "✓", "✓"],
      ["AI/ML fraud detection", "✗", "✗", "✓", "✓"],
      ["Fraud alerts (email/Slack)", "✗", "Email", "Email + Slack", "Email + Slack"],
    ],
  },
  {
    label: "PAYOUTS",
    rows: [
      ["Monthly payouts", "✓", "✓", "✓", "✓"],
      ["On-demand payouts", "✗", "✓", "✓", "✓"],
      ["Custom payout schedule", "✗", "✗", "✓", "✓"],
      ["Tax documents (1099)", "✗", "✓", "✓", "✓"],
    ],
  },
  {
    label: "SECURITY & COMPLIANCE",
    rows: [
      ["SSO / SAML", "✗", "✗", "✗", "✓"],
      ["SOC 2 Type II", "✗", "✗", "✗", "✓"],
      ["GDPR DPA", "✗", "✗", "✗", "✓"],
      ["White-label API", "✗", "✗", "✗", "✓"],
    ],
  },
  {
    label: "SUPPORT",
    rows: [
      ["Support type", "Community", "Email", "Priority email", "Dedicated AM"],
      ["Response SLA", "—", "48h", "24h", "4h"],
      ["Onboarding call", "✗", "✗", "✓", "✓"],
    ],
  },
];

/* ── FAQ data ── */
const faqs = [
  {
    q: "What is the platform commission?",
    a: "Komisi charges a percentage of every affiliate payout you make to your creators. On Free it's 20%, Growth 10%, Scale 0%. It's separate from the commission you set for your affiliates — it's what we charge to run the attribution, fraud detection, and payout infrastructure. On Scale, we take nothing.",
  },
  {
    q: "When does Scale pay for itself?",
    a: "At roughly $1,490/month in total affiliate payouts, Scale ($149/mo) costs less than the Growth plan's 10% commission alone. Beyond that point, every dollar of affiliate payouts saves you money. The 0% commission on Scale is designed to align our incentives with yours — we want you to scale.",
  },
  {
    q: "Does Komisi require the ATT prompt or IDFA?",
    a: "No. Our iOS attribution uses privacy-safe fingerprint matching with only Apple-permitted signals — IP, locale, timezone, device model, and screen dimensions. We never use IDFA and we never trigger Apple's App Tracking Transparency prompt. Your App Store privacy label is unaffected.",
  },
  {
    q: "Does Komisi work without RevenueCat?",
    a: "Yes. You can connect Adapty, use direct App Store and Google Play receipt webhooks, or report purchase events via our REST API. RevenueCat is the most popular setup because it's already the standard for subscription apps, but it's not required.",
  },
  {
    q: "Is there a free trial on paid plans?",
    a: "Growth and Scale plans include a 14-day free trial. No credit card required to start. You can switch between plans at any time — upgrades take effect immediately, downgrades at the end of your billing period.",
  },
  {
    q: "What counts as an 'active affiliate'?",
    a: "An affiliate with at least one approved tracking link active in the last 30 days counts against your plan limit. Invited affiliates who haven't been approved yet, and affiliates you've paused, do not count.",
  },
  {
    q: "How does yearly billing work?",
    a: "Yearly plans are billed as a single upfront payment. You get 2 months free compared to monthly pricing — that's a 20% discount. If you cancel before your renewal date, you receive a prorated refund for unused months.",
  },
  {
    q: "How is Komisi different from Impact.com or ShareASale?",
    a: "Impact.com and ShareASale were built for web — cookie-based tracking, browser pixels, and URL redirects. None of that works inside a mobile app. A user who clicks a TikTok link, opens the App Store, installs, and subscribes breaks every web-based attribution system. Komisi was built specifically for this mobile journey, without IDFA and without ATT.",
  },
  {
    q: "How hard is it to migrate from another attribution tool?",
    a: "The Komisi SDK is 3 lines of code. If you're already using RevenueCat, you add a subscriber attribute in your existing RevenueCat setup — no changes to your purchase flow. Most developers have their first affiliate attributed within the hour of starting setup.",
  },
  {
    q: "What happens if I exceed my affiliate limit on the Free plan?",
    a: "You'll receive an email notification when you're approaching your limit. You can upgrade at any time to unlock more slots. Existing affiliates are never deactivated — you just can't approve new ones until you upgrade or free up a slot.",
  },
];

/* ── Features by job-to-be-done ── */
const featureCategories = [
  {
    icon: Target,
    name: "Attribution & Tracking",
    description: "Know exactly which creator drove which install and which subscription. No IDFA. No ATT prompt. No cookies.",
    bullets: [
      "iOS privacy-safe fingerprint matching (0.60–0.95 confidence)",
      "Android Play Install Referrer (100% deterministic)",
      "Deep link tracking — click to App Store to install",
      "UTM link builder with auto-tagging",
      "Referral code generation and resolution",
      "Multi-touch attribution (Scale+)",
      "QR code attribution for offline campaigns",
      "30-day to lifetime attribution windows",
    ],
  },
  {
    icon: Shield,
    name: "Fraud Detection",
    description: "AI watches every install so you don't have to. Fake traffic gets blocked before it reaches your payout pool.",
    bullets: [
      "Velocity checks — installs per affiliate per hour",
      "IP cluster detection — subnet-level analysis",
      "Device fingerprint repetition detection",
      "Geo mismatch flagging (audience vs. install location)",
      "Self-referral auto-block",
      "Trial churn pattern analysis",
      "AI/ML scoring model (Scale+) — XGBoost, weekly retraining",
      "Manual fraud review queue with one-click block",
    ],
  },
  {
    icon: BarChart2,
    name: "Analytics",
    description: "Real-time data on every creator, every campaign, every dollar. Sliced exactly how you need it.",
    bullets: [
      "Click → install → purchase funnel",
      "Affiliate leaderboard with performance scoring",
      "Revenue time-series by creator, campaign, platform",
      "Channel breakdown — TikTok vs. YouTube vs. Instagram",
      "Content performance tracking (video-level attribution)",
      'Natural language analytics — "Show me TikTok revenue last month" (Scale+)',
      "Revenue forecasting (Scale+)",
      "CSV export + scheduled reports (Scale+)",
    ],
  },
  {
    icon: Zap,
    name: "Payouts",
    description: "Automated payouts to every creator in 150+ countries. They get paid on time. You get the paperwork handled.",
    bullets: [
      "Monthly payouts via Stripe Connect (15th of month)",
      "On-demand payout trigger (Growth+)",
      "Custom payout schedule — weekly/bi-weekly (Scale+)",
      "Wise + Payoneer in addition to Stripe (Scale+)",
      "Automated PDF invoicing",
      "1099 tax document generation for US affiliates (Growth+)",
      "International tax document support (Scale+)",
      "Idempotent transfers — zero duplicate payouts",
    ],
  },
  {
    icon: Code2,
    name: "SDK & Integrations",
    description: "Drop in 3 lines of code. Komisi handles attribution, fraud, and payouts automatically. No server coding required.",
    bullets: [
      "Swift (iOS) · Kotlin (Android) · Flutter · React Native",
      "Unity + Web API (Scale+)",
      "RevenueCat webhook integration (all plans)",
      "Adapty webhook integration (Growth+)",
      "TikTok API + YouTube API content tracking (Growth+)",
      "Outbound webhooks — up to 3 endpoints (Growth) / unlimited (Scale+)",
      "REST API access (Growth+)",
      "Sandbox / test mode environment (Scale+)",
    ],
  },
];

/* ── Enterprise features ── */
const enterpriseFeatures = [
  "White-label API (your brand, your domain)",
  "SSO / SAML 2.0 — Okta, Google Workspace, Azure AD",
  "SOC 2 Type II report available on request",
  "GDPR Data Processing Agreement",
  "Dedicated single-tenant infrastructure",
  "IP allowlisting + custom data retention",
  "Unlimited team members with full RBAC",
  "Custom API rate limits (up to 10,000 req/min)",
  "Custom payout methods + multi-currency",
  "Dedicated account manager",
];

/* ── Cell renderer ── */
const CellValue = ({ val, isScaleCol }: { val: string; isScaleCol: boolean }) => {
  if (val === "✓") return <Check size={18} strokeWidth={2} style={{ color: "#000000" }} className="inline" />;
  if (val === "✗") return <XIcon size={18} strokeWidth={2} style={{ color: "#D1D5DB" }} className="inline" />;
  if (val === "—") return <span style={{ color: "#D1D5DB" }}>—</span>;
  const bold = isScaleCol && val === "0%";
  return <span style={{ color: bold ? "#000000" : "#374151", fontWeight: bold ? 700 : 400 }}>{val}</span>;
};

/* ═══════════════════════════════════════════════════════
   PRICING PAGE
   ═══════════════════════════════════════════════════════ */
const Pricing = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#000000" }}>

      {/* ── NAVBAR (solid light) ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-lg tracking-tight font-normal" style={{ color: "#000000" }}>komisi</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <Link
                key={l}
                to={l === "Pricing" ? "/pricing" : `/#${l.toLowerCase()}`}
                className="text-sm transition-colors"
                style={{ color: l === "Pricing" ? "#000000" : "#374151" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = "#000000"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = l === "Pricing" ? "#000000" : "#374151"; }}
              >
                {l}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login"><span className="text-sm cursor-pointer" style={{ color: "#374151" }}>Login</span></Link>
            <Link to="/signup">
              <Button size="sm" style={{ backgroundColor: "#000000", color: "#FFFFFF" }} className="hover:opacity-90">
                Get Started <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b p-4 space-y-2 overflow-hidden"
            >
              {navLinks.map(l => (
                <Link key={l} to={l === "Pricing" ? "/pricing" : `/#${l.toLowerCase()}`} className="block text-sm py-2" style={{ color: "#374151" }}>{l}</Link>
              ))}
              <Link to="/login"><Button variant="secondary" className="w-full mt-2">Login</Button></Link>
              <Link to="/signup"><Button className="w-full" style={{ backgroundColor: "#000000", color: "#FFFFFF" }}>Get Started</Button></Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO (Dark)
      ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#000000", paddingTop: 120, paddingBottom: 90 }} className="px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={anim}
            className="inline-block text-[13px] font-medium px-4 py-1.5"
            style={{
              color: "#000000",
              backgroundColor: "rgba(0,0,0,0.15)",
              border: "1px solid rgba(0,0,0,0.3)",
              borderRadius: 999,
            }}
          >
            Simple, transparent pricing
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...anim, delay: 0.08 }}
            className="mt-5 text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight"
          >
            Start free, scale with affiliates.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...anim, delay: 0.16 }}
            className="mx-auto mt-[18px] text-base max-w-[580px]"
            style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}
          >
            Privacy-safe attribution. Automated payouts. Free until your affiliate program takes off.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...anim, delay: 0.24 }}
            className="inline-flex items-center p-1 mt-10"
            style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 999,
              overflow: "visible",
            }}
          >
            <button
              onClick={() => setIsYearly(false)}
              className="text-sm transition-all duration-200"
              style={{
                padding: "9px 28px",
                borderRadius: 999,
                backgroundColor: !isYearly ? "#000000" : "transparent",
                color: !isYearly ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                fontWeight: !isYearly ? 600 : 400,
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className="text-sm transition-all duration-200 inline-flex items-center gap-1.5"
              style={{
                padding: "9px 28px",
                borderRadius: 999,
                backgroundColor: isYearly ? "#000000" : "transparent",
                color: isYearly ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                fontWeight: isYearly ? 600 : 400,
              }}
            >
              Yearly
              {isYearly && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor: "rgba(74,222,128,0.15)",
                    color: "#4ADE80",
                    borderRadius: 999,
                    padding: "2px 8px",
                    fontSize: 11,
                    fontWeight: 700,
                    marginLeft: 6,
                  }}
                >
                  Save 20%
                </span>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — PRICING CARDS
      ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#000000", paddingBottom: 80 }} className="px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {plans.map((plan, i) => {
            const isDark = plan.dark;
            const isPopular = plan.popular;
            const price = plan.monthlyPrice === -1 ? null : isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const showStrike = isYearly && plan.monthlyPrice > 0;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...anim, delay: 0.1 + i * 0.08 }}
                className="relative flex flex-col"
                style={{
                  borderRadius: 20,
                  minHeight: 580,
                  backgroundColor: isDark ? "#111111" : "#FFFFFF",
                  border: isPopular
                    ? "2px solid #000000"
                    : isDark
                    ? "1px solid rgba(0,0,0,0.45)"
                    : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: isPopular
                    ? "0 0 0 1px #000000, 0 24px 80px rgba(0,0,0,0.25)"
                    : isDark
                    ? "0 0 0 1px rgba(0,0,0,0.2), 0 24px 60px rgba(0,0,0,0.2)"
                    : "none",
                  transform: isPopular ? "scale(1.035)" : "none",
                  zIndex: isPopular ? 2 : 1,
                  overflow: isPopular ? "visible" : "hidden",
                }}
              >
                {/* Enterprise shimmer bg */}
                {isDark && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      borderRadius: 20,
                      background: "radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.18) 0%, transparent 70%)",
                      animation: "enterprise-card-glow 8s ease-in-out infinite alternate",
                    }}
                  />
                )}

                {/* Most Popular badge */}
                {isPopular && (
                  <div
                    className="absolute z-10"
                    style={{
                      top: -15,
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#000000",
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "5px 16px",
                      borderRadius: 999,
                      letterSpacing: "0.05em",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Zone A — Header */}
                <div style={{ padding: "32px 32px 28px" }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      color: isDark ? "#000000" : "#000000",
                    }}
                  >
                    {plan.name}
                  </div>
                  <div
                    className="mt-1.5"
                    style={{ fontSize: 14, color: isDark ? "rgba(255,255,255,0.55)" : "#6B7280" }}
                  >
                    {plan.tagline}
                  </div>

                  {/* Price */}
                  <div className="mt-[22px] flex items-baseline gap-2">
                    {price !== null ? (
                      <>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={`${plan.id}-${isYearly}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.12 }}
                            style={{
                              fontSize: 52,
                              fontWeight: 700,
                              lineHeight: 1,
                              color: isDark ? "#FFFFFF" : "#000000",
                            }}
                          >
                            ${price}
                          </motion.span>
                        </AnimatePresence>
                        <span style={{ fontSize: 16, fontWeight: 400, color: "#9CA3AF" }}>/mo</span>
                        {showStrike && (
                          <span
                            className="line-through"
                            style={{ fontSize: 16, color: "#9CA3AF" }}
                          >
                            ${plan.monthlyPrice}
                          </span>
                        )}
                      </>
                    ) : (
                      <span
                        style={{
                          fontSize: 52,
                          fontWeight: 700,
                          lineHeight: 1,
                          color: "#FFFFFF",
                        }}
                      >
                        Custom
                      </span>
                    )}
                  </div>
                  {price === 0 && (
                    <div className="mt-1" style={{ fontSize: 12, color: "#9CA3AF" }}>Free forever</div>
                  )}
                  {price === null && (
                    <div className="mt-1" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Talk to sales</div>
                  )}
                  {showStrike && (
                    <div className="mt-1" style={{ fontSize: 12, color: "#9CA3AF" }}>
                      billed ${plan.yearlyTotal}/year
                    </div>
                  )}
                </div>

                {/* Zone B — CTA */}
                <div style={{ padding: "0 32px 28px" }}>
                  <Link to={plan.ctaLink} className="block">
                    <button
                      className="w-full transition-all duration-200"
                      style={{
                        height: 46,
                        borderRadius: 10,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        ...(plan.ctaStyle === "filled"
                          ? { backgroundColor: "#000000", color: "#FFFFFF", border: "none" }
                          : plan.ctaStyle === "enterprise"
                          ? {
                              backgroundColor: "transparent",
                              color: "rgba(255,255,255,0.85)",
                              border: "1.5px solid rgba(255,255,255,0.3)",
                            }
                          : {
                              backgroundColor: "transparent",
                              color: "#000000",
                              border: "1.5px solid #000000",
                            }),
                      }}
                    >
                      {plan.cta}
                    </button>
                  </Link>
                  {plan.noCcNote && (
                    <p className="text-center mt-2" style={{ fontSize: 12, color: "#9CA3AF" }}>
                      No credit card required
                    </p>
                  )}
                </div>

                {/* Zone C — Features */}
                <div
                  className="flex-1"
                  style={{
                    padding: "0 32px 32px",
                    borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#F3F4F6"}`,
                    paddingTop: 20,
                  }}
                >
                  <div
                    className="mb-3"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: isDark ? "rgba(255,255,255,0.4)" : "#9CA3AF",
                    }}
                  >
                    What's included:
                  </div>
                  <div className="space-y-1.5">
                    {plan.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-2.5" style={{ padding: "6px 0" }}>
                        {f.included ? (
                          <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#000000" }} />
                        ) : (
                          <XIcon size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#D1D5DB" }} />
                        )}
                        <span
                          style={{
                            fontSize: 14,
                            color: f.included
                              ? isDark
                                ? "rgba(255,255,255,0.85)"
                                : "#374151"
                              : isDark
                              ? "rgba(255,255,255,0.3)"
                              : "#9CA3AF",
                            fontWeight: (f as any).bold ? 700 : 400,
                          }}
                        >
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — SOCIAL PROOF LOGO BAR
      ═══════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "#000000",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "56px 0",
        }}
      >
        <p
          className="text-center mb-6"
          style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}
        >
          Trusted by 200+ indie app developers
        </p>
        <div className="overflow-hidden">
          <div className="marquee-track" style={{ gap: 48 }}>
            {[...Array(4)].map((_, ri) =>
              socialProofLogos.map((logo, li) => (
                <div
                  key={`${ri}-${li}`}
                  className="shrink-0 flex items-center gap-2.5"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-6 w-6 object-contain"
                    style={{ filter: "brightness(0) invert(1)", opacity: 0.7 }}
                  />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                    {logo.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — COMMISSION EXPLAINER
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 dot-grid">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={anim}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "#000000",
              }}
            >
              HOW OUR PRICING WORKS
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-normal tracking-tight leading-tight" style={{ color: "#000000" }}>
              The more you grow, the less we take.
            </h2>
            <p className="mt-4 text-base" style={{ color: "#6B7280", lineHeight: 1.75 }}>
              Komisi charges a platform commission on every affiliate payout — a percentage of what you pay your creators. As your program scales, upgrading directly reduces our cut. On Scale, it reaches zero.
            </p>

            {/* Callout */}
            <div
              className="mt-7"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                padding: "18px 22px",
              }}
            >
              <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
                💡 At $1,500/month in affiliate payouts, the Scale plan pays for itself entirely from commission savings alone.
              </p>
            </div>

            <a
              href="#"
              className="inline-block mt-4"
              style={{ color: "#000000", fontSize: 14, fontWeight: 500 }}
            >
              How commission is calculated →
            </a>
          </motion.div>

          {/* Right — commission table */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...anim, delay: 0.1 }}
            className="overflow-hidden self-start"
            style={{ borderRadius: 16, border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", height: "fit-content" }}
          >
            {/* Header */}
            <div
              className="grid grid-cols-3"
              style={{ backgroundColor: "#F9FAFB", padding: "12px 20px" }}
            >
              {["Plan", "Commission", "On $1,500/mo payouts"].map(h => (
                <span
                  key={h}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "#9CA3AF",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
            {/* Rows */}
            {[
              { plan: "Free", comm: "20%", cost: "You pay $300/mo", highlight: false },
              { plan: "Growth", comm: "10%", cost: "You pay $150/mo", highlight: false },
              { plan: "Scale", comm: "0%", cost: "You pay $0/mo", highlight: true },
            ].map((row) => (
              <div
                key={row.plan}
                className="grid grid-cols-3 items-center"
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid #F3F4F6",
                  backgroundColor: row.highlight ? "rgba(0,0,0,0.06)" : "transparent",
                }}
              >
                <span style={{ fontSize: 14, color: "#374151", fontWeight: row.highlight ? 700 : 400 }}>
                  {row.plan}
                </span>
                <span style={{ fontSize: row.highlight ? 16 : 14, color: row.highlight ? "#000000" : "#374151", fontWeight: row.highlight ? 700 : 400 }}>
                  {row.comm}
                </span>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 14, color: row.highlight ? "#000000" : "#374151", fontWeight: row.highlight ? 700 : 400 }}>
                    {row.cost}
                  </span>
                  {row.highlight && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: "rgba(74,222,128,0.12)",
                        color: "#4ADE80",
                        borderRadius: 999,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      SAVE $300
                    </span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — FEATURES BY JOB-TO-BE-DONE
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 dot-grid">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={anim}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight leading-tight" style={{ color: "#000000" }}>
              Everything ambitious apps need, all yours.
            </h2>
            <p className="mt-3 text-base" style={{ color: "#6B7280" }}>
              Every feature included in your plan. No feature gating within tiers.
            </p>
          </motion.div>

          <div className="mt-[60px]">
            {featureCategories.map((cat, ci) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...anim, delay: ci * 0.05 }}
                  className="grid grid-cols-1 lg:grid-cols-[22%_1fr] gap-8"
                  style={{ borderTop: ci > 0 ? "1px solid #F3F4F6" : "none", padding: "52px 0" }}
                >
                  <div style={{ borderRight: "1px solid #F3F4F6", paddingRight: 24 }} className="hidden lg:block">
                    <Icon size={32} style={{ color: "#000000" }} />
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#000000", marginTop: 14 }}>
                      {cat.name}
                    </h3>
                    <p className="mt-2" style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
                      {cat.description}
                    </p>
                  </div>
                  <div className="lg:hidden">
                    <Icon size={32} style={{ color: "#000000" }} />
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#000000", marginTop: 14 }}>
                      {cat.name}
                    </h3>
                    <p className="mt-2" style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
                      {cat.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
                    {cat.bullets.map((b, bi) => (
                      <div key={bi} className="flex items-start gap-2.5 py-1.5">
                        <Check size={14} strokeWidth={2.5} className="flex-shrink-0 mt-1" style={{ color: "#000000" }} />
                        <span style={{ fontSize: 14, color: "#374151", lineHeight: 2.0 }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link to="/signup">
              <button
                className="transition-colors duration-200"
                style={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  padding: "14px 36px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 16,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Get Started Free →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — ENTERPRISE DEEP DIVE (Dark)
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 px-6" style={{ backgroundColor: "#111111" }}>
        {/* Animated bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 40% 30%, rgba(0,0,0,0.12) 0%, transparent 60%)",
            animation: "enterprise-drift 10s ease-in-out infinite alternate",
          }}
        />

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-20">
            {/* Left 40% */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={anim}
            >
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "#000000" }}>
                ENTERPRISE
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-normal text-white tracking-tight leading-tight">
                Built for volume, velocity, and compliance.
              </h2>
              <p className="mt-4 text-base" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                Handle complex affiliate programs at massive scale with infrastructure designed for the world's largest app companies. Get priority access to our team and total control over your data.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <Link to="/demo">
                  <button
                    style={{
                      backgroundColor: "#000000",
                      color: "#FFFFFF",
                      padding: "12px 28px",
                      borderRadius: 10,
                      fontWeight: 600,
                      fontSize: 14,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Contact Sales →
                  </button>
                </Link>
                <a href="#" className="underline" style={{ color: "rgba(255,255,255,0.6)", fontSize: 15 }}>
                  Learn more →
                </a>
              </div>
            </motion.div>

            {/* Right 60% */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...anim, delay: 0.1 }}
            >
              <p className="mb-5" style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>
                Includes all Scale features, plus:
              </p>
              <div className="space-y-1">
                {enterpriseFeatures.map((f, fi) => (
                  <div key={fi} className="flex items-start gap-2.5 py-1.5">
                    <Check size={15} className="mt-0.5 flex-shrink-0" style={{ color: "#000000" }} />
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...anim, delay: 0.15 }}
            className="mt-14 pt-10 grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              { num: "$2M+", label: "Creator commissions tracked" },
              { num: "200+", label: "App developers" },
              { num: "99.9%", label: "Attribution accuracy" },
              { num: "150+", label: "Payout countries" },
            ].map(s => (
              <div key={s.num}>
                <div style={{ fontSize: 36, fontWeight: 700, color: "#FFFFFF" }}>{s.num}</div>
                <div className="mt-1" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — COMPARISON TABLE
      ═══════════════════════════════════════════ */}
      <section className="py-20 px-6 dot-grid">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={anim}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight leading-tight" style={{ color: "#000000" }}>Everything, compared.</h2>
            <p className="mt-2.5 text-base" style={{ color: "#6B7280" }}>
              Every feature, every plan, side by side.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...anim, delay: 0.1 }}
            className="mt-12 overflow-x-auto"
          >
            <div style={{ minWidth: 700 }}>
              <div
                className="sticky z-20"
                style={{
                  top: 64,
                  backgroundColor: "#FAFAFA",
                  boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: "38% repeat(4, minmax(0, 1fr))",
                  }}
                >
                  <div
                    className="py-3 px-4"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#9CA3AF",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      backgroundColor: "#FAFAFA",
                    }}
                  >
                    Feature
                  </div>
                  {["Free", "Growth", "Scale", "Enterprise"].map((h) => (
                    <div
                      key={h}
                      className="py-3 px-4 text-center"
                      style={{
                        fontSize: 12,
                        fontWeight: h === "Scale" ? 700 : 600,
                        color: h === "Scale" ? "#000000" : "#9CA3AF",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        backgroundColor: h === "Scale" ? "#E9F5FF" : "#FAFAFA",
                        boxShadow: h === "Scale" ? "inset 0 3px 0 #000000" : "none",
                      }}
                    >
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              <table className="w-full border-separate border-spacing-0 text-sm">
                <tbody>
                  {comparisonGroups.map(group => (
                    <React.Fragment key={group.label}>
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          backgroundColor: "#E9F5FF",
                          padding: "10px 16px",
                          fontSize: 11,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "#111111",
                        }}
                      >
                        {group.label}
                      </td>
                    </tr>
                    {group.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className="transition-colors hover:bg-[#F3F4F6]"
                        style={{
                          borderBottom: "1px solid #F3F4F6",
                          backgroundColor: ri % 2 === 1 ? "#FAFAFA" : "#FFFFFF",
                        }}
                      >
                        <td className="py-3.5 px-4" style={{ color: "#374151", fontWeight: 500 }}>
                          {row[0]}
                        </td>
                        {[1, 2, 3, 4].map(ci => (
                          <td
                            key={ci}
                            className="text-center py-3.5 px-4"
                            style={{
                              backgroundColor: ci === 3 ? "rgba(0,0,0,0.04)" : "transparent",
                            }}
                          >
                            <CellValue val={row[ci]} isScaleCol={ci === 3} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — FAQ
      ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FFFFFF" }} className="py-20 px-6">
        <div className="max-w-[720px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={anim}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight leading-tight" style={{ color: "#000000" }}>
              Frequently asked questions.
            </h2>
            <p className="mt-2.5 text-base" style={{ color: "#6B7280" }}>
              Still unsure? We've answered the most common questions below.
            </p>
          </motion.div>

          <Accordion type="multiple" className="space-y-0">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...anim, delay: i * 0.03 }}
              >
                <AccordionItem value={`faq-${i}`} style={{ borderBottom: "1px solid #F3F4F6", borderTop: "none" }}>
                  <AccordionTrigger
                    className="py-5 hover:no-underline"
                    style={{ fontSize: 16, fontWeight: 500, color: "#111827" }}
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.75, paddingBottom: 20 }}>
                      {faq.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9 — FINAL CTA (DarkVeil)
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#111111", padding: "100px 24px" }}>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <DarkVeil
            speed={1.8}
            warpAmount={1.2}
            noiseIntensity={0.0}
            scanlineIntensity={0}
            scanlineFrequency={0}
            hueShift={0}
            resolutionScale={1}
          />
        </div>
        <div className="max-w-[680px] mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={anim}
            className="text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight"
          >
            Start for free or schedule a demo for your personal onboarding.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...anim, delay: 0.08 }}
            className="mt-4 text-base"
            style={{ fontSize: 17, color: "rgba(255,255,255,0.5)" }}
          >
            No credit card required. Your first 5 affiliates are always free.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...anim, delay: 0.16 }}
            className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          >
            <Link to="/signup">
              <button
                style={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  padding: "14px 36px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 16,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Get Started Free →
              </button>
            </Link>
            <Link to="/demo">
              <button
                className="transition-colors duration-200"
                style={{
                  backgroundColor: "transparent",
                  color: "rgba(255,255,255,0.8)",
                  padding: "14px 36px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 16,
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  cursor: "pointer",
                }}
              >
                Schedule a Demo →
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-primary-foreground px-6 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2">
              <span className="text-lg font-normal tracking-tight block mb-2">komisi</span>
              <p className="text-xs text-white/40">© 2026 Komisi. All rights reserved.</p>
            </div>
            {[
              { title: "Product", links: [{ label: "Attribution", href: "/#product" }, { label: "Fraud Detection", href: "/#product" }, { label: "Payouts", href: "/#product" }, { label: "Analytics", href: "/#product" }, { label: "Creator Marketplace", href: "/#product" }] },
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

      {/* Enterprise card drift animation */}
      <style>{`
        @keyframes enterprise-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 10px); }
        }
        @keyframes enterprise-card-glow {
          0% { background: radial-gradient(ellipse at 30% 50%, rgba(0,0,0,0.18) 0%, transparent 70%); }
          100% { background: radial-gradient(ellipse at 70% 50%, rgba(0,0,0,0.18) 0%, transparent 70%); }
        }
      `}</style>
    </div>
  );
};

export default Pricing;
