import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Menu, X, Twitter, Github, Linkedin,
  Zap, Building2, Rocket,
} from "lucide-react";
import { AnimatePresence } from "motion/react";

const navLinks = ["Product", "Pricing", "Docs", "Marketplace"];

const plans = [
  {
    name: "Free",
    icon: <Zap size={20} />,
    price: "$0",
    period: "forever",
    description: "Perfect for validating your affiliate channel. No credit card required.",
    commission: "20% platform fee",
    cta: "Get Started Free",
    ctaVariant: "secondary" as const,
    features: [
      "Up to 50 affiliates",
      "Basic attribution SDK",
      "Manual payouts",
      "Community support",
      "Standard analytics",
      "1 team member",
      "Komisi branding on creator portal",
    ],
  },
  {
    name: "Growth",
    icon: <Rocket size={20} />,
    price: "$99",
    period: "/month",
    description: "For apps with traction. Automate payouts, unlock fraud detection, and scale.",
    commission: "10% platform fee",
    cta: "Start 14-day Trial",
    ctaVariant: "default" as const,
    popular: true,
    features: [
      "Unlimited affiliates",
      "Advanced attribution + deep links",
      "Automated payouts via Stripe Connect",
      "Fraud detection & click farm blocking",
      "Real-time analytics dashboard",
      "Creator marketplace listing",
      "5 team members",
      "Priority email support",
      "Custom creator portal branding",
      "Webhook integrations",
    ],
  },
  {
    name: "Scale",
    icon: <Building2 size={20} />,
    price: "$399",
    period: "/month",
    description: "For high-growth apps. Zero platform commission. Full control.",
    commission: "0% platform fee",
    cta: "Talk to Sales",
    ctaVariant: "secondary" as const,
    features: [
      "Everything in Growth",
      "0% platform commission",
      "Unlimited team members",
      "SSO & SAML authentication",
      "Dedicated account manager",
      "Custom SLA & uptime guarantee",
      "Advanced API access",
      "Multi-app management",
      "Custom contract terms",
      "White-label creator portal",
    ],
  },
];

const faqs = [
  {
    q: "How does the platform fee work?",
    a: "Komisi takes a percentage of the affiliate-driven revenue that flows through the platform. On Free it's 20%, Growth is 10%, and Scale is 0%. You only pay when affiliates generate revenue for you.",
  },
  {
    q: "Can I switch plans anytime?",
    a: "Yes. Upgrade or downgrade at any time. When upgrading, you get immediate access to new features. When downgrading, changes take effect at the end of your billing cycle.",
  },
  {
    q: "Is there a free trial for Growth?",
    a: "Yes — Growth comes with a 14-day free trial. No credit card required to start. You'll have full access to all Growth features during the trial period.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards via Stripe. For Scale plans, we also support invoicing and wire transfers.",
  },
  {
    q: "What happens if I exceed plan limits?",
    a: "On Free, you'll be prompted to upgrade once you hit 50 affiliates. Growth and Scale have no affiliate limits — you can scale without worrying about caps.",
  },
  {
    q: "Do you offer a discount for annual billing?",
    a: "Yes — annual billing saves you 20%. Growth drops to $79/mo and Scale to $319/mo when billed annually.",
  },
];

const Pricing = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [billingAnnual, setBillingAnnual] = useState(false);

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.price === "$0") return "$0";
    if (billingAnnual) {
      if (plan.name === "Growth") return "$79";
      if (plan.name === "Scale") return "$319";
    }
    return plan.price;
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── NAVBAR (light mode, solid) ── */}
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
            <span className="text-lg tracking-tight font-normal" style={{ color: "#0a0010" }}>komisi</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <Link
                key={l}
                to={l === "Pricing" ? "/pricing" : `/#${l.toLowerCase()}`}
                className="text-sm transition-colors"
                style={{ color: l === "Pricing" ? "#7C3AED" : "#374151" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = "#0a0010"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = l === "Pricing" ? "#7C3AED" : "#374151"; }}
              >
                {l}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <span className="text-sm cursor-pointer" style={{ color: "#374151" }}>Login</span>
            </Link>
            <Link to="/signup">
              <Button size="sm" style={{ backgroundColor: "#7C3AED", color: "#FFFFFF" }} className="hover:opacity-90">
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
              className="md:hidden bg-background border-b border-border p-4 space-y-2 overflow-hidden"
            >
              {navLinks.map(l => (
                <Link key={l} to={l === "Pricing" ? "/pricing" : `/#${l.toLowerCase()}`} className="block text-sm py-2 text-text-secondary">{l}</Link>
              ))}
              <Link to="/login"><Button variant="secondary" className="w-full mt-2">Login</Button></Link>
              <Link to="/signup"><Button className="w-full" style={{ backgroundColor: "#7C3AED", color: "#FFFFFF" }}>Get Started</Button></Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-4 px-6" style={{ background: "#F5F0FF" }}>
        <div className="max-w-[800px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-6"
              style={{ color: "#7C3AED", border: "1px solid rgba(124,58,237,0.2)", backgroundColor: "rgba(124,58,237,0.06)" }}
            >
              ✦ Simple, transparent pricing
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: "#0a0010" }}
          >
            Start free. Scale as you grow.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg mb-8"
            style={{ color: "#6B7280" }}
          >
            No setup fees. No hidden costs. Only pay platform commission when your affiliates generate revenue.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-3 p-1 rounded-full mb-12"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <button
              onClick={() => setBillingAnnual(false)}
              className="px-5 py-2 text-sm font-medium rounded-full transition-all duration-200"
              style={{
                backgroundColor: !billingAnnual ? "#7C3AED" : "transparent",
                color: !billingAnnual ? "#FFFFFF" : "#6B7280",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingAnnual(true)}
              className="px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-2"
              style={{
                backgroundColor: billingAnnual ? "#7C3AED" : "transparent",
                color: billingAnnual ? "#FFFFFF" : "#6B7280",
              }}
            >
              Annual
              <span
                className="text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: billingAnnual ? "rgba(255,255,255,0.2)" : "rgba(124,58,237,0.1)",
                  color: billingAnnual ? "#FFFFFF" : "#7C3AED",
                }}
              >
                Save 20%
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="pb-24 px-6 -mt-2" style={{ background: "#F5F0FF" }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="relative flex flex-col rounded-2xl p-8"
              style={{
                backgroundColor: "#FFFFFF",
                border: plan.popular ? "2px solid #7C3AED" : "1px solid rgba(0,0,0,0.08)",
                boxShadow: plan.popular
                  ? "0 8px 32px rgba(124,58,237,0.15), 0 2px 8px rgba(0,0,0,0.05)"
                  : "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
              }}
            >
              {plan.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-4 py-1 rounded-full"
                  style={{ backgroundColor: "#7C3AED", color: "#FFFFFF" }}
                >
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: plan.popular ? "rgba(124,58,237,0.1)" : "rgba(0,0,0,0.04)",
                    color: plan.popular ? "#7C3AED" : "#374151",
                  }}
                >
                  {plan.icon}
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "#0a0010" }}>{plan.name}</h3>
              </div>

              <div className="mb-1 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight" style={{ color: "#0a0010" }}>
                  {getPrice(plan)}
                </span>
                <span className="text-sm" style={{ color: "#9CA3AF" }}>{plan.period}</span>
              </div>

              <div
                className="text-xs font-medium mb-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-md w-fit"
                style={{
                  backgroundColor: plan.commission === "0% platform fee" ? "rgba(74,222,128,0.1)" : "rgba(124,58,237,0.06)",
                  color: plan.commission === "0% platform fee" ? "#16a34a" : "#7C3AED",
                }}
              >
                {plan.commission}
              </div>

              <p className="text-sm mb-6" style={{ color: "#6B7280", lineHeight: 1.6 }}>
                {plan.description}
              </p>

              <Link to={plan.name === "Scale" ? "/demo" : "/signup"} className="mb-8">
                <Button
                  className="w-full h-11"
                  style={{
                    backgroundColor: plan.popular ? "#7C3AED" : "transparent",
                    color: plan.popular ? "#FFFFFF" : "#0a0010",
                    border: plan.popular ? "none" : "1px solid rgba(0,0,0,0.15)",
                  }}
                >
                  {plan.cta} <ArrowRight size={14} />
                </Button>
              </Link>

              <div className="space-y-3 flex-1">
                {plan.features.map((f, fi) => (
                  <div key={fi} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: plan.popular ? "#7C3AED" : "#9CA3AF" }}
                    />
                    <span className="text-sm" style={{ color: "#374151" }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3" style={{ color: "#0a0010" }}>
              Compare plans in detail
            </h2>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Everything you need to know, side by side.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-x-auto rounded-xl"
            style={{ border: "1px solid rgba(0,0,0,0.08)" }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: "#FAFAFA" }}>
                  <th className="text-left py-4 px-6 font-medium" style={{ color: "#6B7280" }}>Feature</th>
                  <th className="text-center py-4 px-6 font-medium" style={{ color: "#6B7280" }}>Free</th>
                  <th className="text-center py-4 px-6 font-medium" style={{ color: "#7C3AED" }}>Growth</th>
                  <th className="text-center py-4 px-6 font-medium" style={{ color: "#6B7280" }}>Scale</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Platform commission", "20%", "10%", "0%"],
                  ["Affiliates", "50", "Unlimited", "Unlimited"],
                  ["Team members", "1", "5", "Unlimited"],
                  ["Attribution SDK", "Basic", "Advanced", "Advanced"],
                  ["Deep links", "—", "✓", "✓"],
                  ["Automated payouts", "—", "✓", "✓"],
                  ["Fraud detection", "—", "✓", "✓"],
                  ["Real-time analytics", "Basic", "Full", "Full"],
                  ["Creator marketplace", "—", "✓", "✓"],
                  ["Webhook integrations", "—", "✓", "✓"],
                  ["Custom branding", "—", "✓", "White-label"],
                  ["SSO / SAML", "—", "—", "✓"],
                  ["Dedicated support", "Community", "Priority email", "Account manager"],
                  ["SLA guarantee", "—", "—", "Custom"],
                  ["API access", "Basic", "Standard", "Advanced"],
                ].map(([feature, free, growth, scale], ri) => (
                  <tr key={ri} style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    <td className="py-3.5 px-6 font-medium" style={{ color: "#374151" }}>{feature}</td>
                    {[free, growth, scale].map((val, ci) => (
                      <td key={ci} className="text-center py-3.5 px-6" style={{ color: val === "✓" ? "#7C3AED" : val === "—" ? "#D1D5DB" : "#374151" }}>
                        {val === "✓" ? <Check size={16} className="inline" style={{ color: "#7C3AED" }} /> : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6" style={{ background: "#F5F0FF" }}>
        <div className="max-w-[720px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3" style={{ color: "#0a0010" }}>
              Frequently asked questions
            </h2>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Can't find what you're looking for?{" "}
              <a href="#" style={{ color: "#7C3AED" }} className="hover:underline">Chat with us</a>.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-xl p-6 cursor-pointer"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <summary
                  className="text-sm font-semibold list-none flex items-center justify-between"
                  style={{ color: "#0a0010" }}
                >
                  {faq.q}
                  <span className="ml-4 text-lg transition-transform group-open:rotate-45" style={{ color: "#7C3AED" }}>+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {faq.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-[640px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: "#0a0010" }}>
              Ready to grow with affiliates?
            </h2>
            <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
              Start free today — upgrade when you're ready.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="h-12 px-8" style={{ backgroundColor: "#7C3AED", color: "#FFFFFF" }}>
                  Get Started Free <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="secondary" size="lg" className="h-12 px-8">
                  Book a Demo
                </Button>
              </Link>
            </div>
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
                    <li key={l.label}><Link to={l.href} className="text-xs text-white/40 hover:text-white transition-colors">{l.label}</Link></li>
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

export default Pricing;
