import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { KomisiLogo } from "@/components/komisi/KomisiLogo";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Download, DollarSign, Shield, TrendingUp, Check,
  ArrowRight, Menu, X, Twitter, Github, Linkedin,
} from "lucide-react";

/* ── Scroll-reveal hook ── */
const useReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
};

/* ── Data ── */
const bentoCards = [
  { title: "Track Installs", desc: "Attribute every install to the creator who drove it. iOS + Android. No IDFA needed.", icon: Download, gradient: "from-[hsl(217,91%,20%)] to-[hsl(217,91%,12%)]" },
  { title: "Reward Creators", desc: "Automated commissions on subscriptions and IAP. Paid via Stripe Connect.", icon: DollarSign, gradient: "from-[hsl(330,60%,22%)] to-[hsl(330,60%,14%)]" },
  { title: "Detect Fraud", desc: "AI catches fake installs and attribution hijacking before you pay.", icon: Shield, gradient: "from-[hsl(258,50%,22%)] to-[hsl(258,50%,14%)]" },
  { title: "Grow Revenue", desc: "AI matches your app with the right creators and optimizes commission rates.", icon: TrendingUp, gradient: "from-[hsl(38,50%,20%)] to-[hsl(160,50%,14%)]" },
];

const pricingPlans = [
  { name: "Free", price: "$0", yearly: "$0", features: ["5 affiliates", "1 app", "20% platform commission", "Basic dashboard", "Community support"], cta: "Get Started — Free →", primary: false },
  { name: "Growth", price: "$49", yearly: "$39", features: ["25 affiliates, 3 apps", "10% platform commission", "AI fraud detection", "RevenueCat + Adapty", "Stripe Connect payouts", "Email support"], cta: "Start Growth Plan →", primary: true, popular: true },
  { name: "Scale", price: "$149", yearly: "$119", features: ["Unlimited affiliates & apps", "0% platform commission", "Full API access", "Content tracking", "Priority support", "Custom webhooks"], cta: "Start Scale Plan →", primary: false },
];

const testimonials = [
  { quote: "We replaced $3,000/month in paid ads with Komisi affiliates. Our CAC dropped 60% in three months.", name: "Sarah Chen", title: "Head of Growth, MindfulApp", wc: "watercolor-pink" },
  { quote: "Komisi found us 15 affiliates in our first week. Revenue from creator referrals is now 30% of our MRR.", name: "Alex Rivera", title: "Founder, FocusTimer", wc: "watercolor-blue" },
  { quote: "The AI fraud detection alone saved us $2,000 in fake installs last month.", name: "Priya Patel", title: "CTO, DailyYoga", wc: "watercolor-green" },
  { quote: "Setting up took 5 minutes. The RevenueCat integration worked out of the box.", name: "David Park", title: "Indie Developer, SleepWell", wc: "watercolor-purple" },
  { quote: "Our best performing channel is now creator referrals, thanks to Komisi.", name: "Maria Santos", title: "Growth Lead, LangMaster", wc: "watercolor-yellow" },
  { quote: "Komisi's dashboard gives us real-time visibility into which creators drive revenue.", name: "Jake Wilson", title: "Co-founder, CodeSnap", wc: "watercolor-mixed" },
];

const logoNames = ["MindfulApp", "FocusTimer", "DailyYoga", "SleepWell", "CodeSnap", "LangMaster"];

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [mobileMenu, setMobileMenu] = useState(false);

  const heroReveal = useReveal(0.1);
  const featuresReveal = useReveal();
  const howReveal = useReveal();
  const testimonialsReveal = useReveal();
  const pricingReveal = useReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ── NAV ── */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      )}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="gradient-ai-text text-lg">✦</span>
              <span className="text-lg font-bold text-foreground tracking-tight">komisi</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {["Product", "Pricing", "Docs", "Marketplace"].map(l => (
                <a key={l} href={l === "Pricing" ? "#pricing" : l === "Product" ? "#product" : "#"} className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
            <Link to="/signup"><Button size="sm">Get Started <ArrowRight size={14} /></Button></Link>
          </div>
          <button className="md:hidden text-foreground" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-card border-b border-border p-4 space-y-2 animate-fade-in">
            {["Product", "Pricing", "Docs", "Marketplace"].map(l => (
              <a key={l} href="#" className="block text-sm py-2 text-text-secondary">{l}</a>
            ))}
            <Link to="/login"><Button variant="secondary" className="w-full mt-2">Login</Button></Link>
            <Link to="/signup"><Button className="w-full">Get Started</Button></Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section ref={heroReveal.ref} className="pt-32 pb-24 px-6">
        <div className={cn("max-w-3xl mx-auto text-center transition-all duration-700", heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
          <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 mb-8">
            <span className="text-chart-blue">◆</span>
            <span className="text-xs uppercase tracking-[0.1em] font-semibold text-text-secondary">Built for Mobile Apps</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground leading-[1.1] mb-6">
            Turn <span className="shimmer-text">Creators</span> into Your<br className="hidden sm:block" /> App's Growth Engine.
          </h1>

          <p className="text-lg text-text-secondary max-w-[560px] mx-auto mb-8">
            The AI-native affiliate platform for mobile apps. Track in-app purchases. Reward creators. Grow on autopilot.
          </p>

          <div className="inline-flex items-center bg-card border border-border rounded-xl p-1.5 shadow-lg max-w-[480px] w-full">
            <input placeholder="Enter your email" className="flex-1 h-10 px-4 text-sm bg-transparent outline-none placeholder:text-text-tertiary text-foreground" />
            <Link to="/signup"><Button className="shrink-0">Get Started <ArrowRight size={14} /></Button></Link>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex -space-x-2">
              {["SC", "AK", "JL"].map((initials, i) => (
                <div key={i} className={`w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-semibold text-foreground ${["watercolor-pink", "watercolor-blue", "watercolor-green"][i]}`}>{initials}</div>
              ))}
            </div>
            <span className="text-sm text-text-secondary">Join <strong className="gradient-ai-text">200+</strong> app developers growing with creators</span>
          </div>
        </div>
      </section>

      {/* ── LOGO BAR (Marquee) ── */}
      <section className="py-12 bg-background-subtle border-y border-border overflow-hidden">
        <p className="text-sm text-text-tertiary text-center mb-6">Trusted by indie developers and scaling apps</p>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...logoNames, ...logoNames].map((l, i) => (
              <div key={i} className="w-[120px] h-8 rounded bg-foreground/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-text-tertiary">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT KOMISI DOES (Dark) ── */}
      <section ref={featuresReveal.ref} className="bg-[hsl(222,47%,7%)] text-white py-20 px-6" id="product">
        <div className="max-w-6xl mx-auto">
          <div className={cn("text-center mb-12 transition-all duration-700", featuresReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="text-amber-400">◆</span>
              <span className="text-xs uppercase tracking-[0.1em] font-semibold text-white/40">Built for the App Store</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Komisi Does</h2>
            <p className="text-lg text-white/50 max-w-[600px] mx-auto">Komisi connects your app with creators who drive real installs and paying subscribers — not just clicks.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bentoCards.map((card, i) => (
              <div
                key={card.title}
                className={cn(
                  "rounded-2xl p-6 relative overflow-hidden aspect-[3/4] flex flex-col justify-between border border-white/10 hover:scale-[1.02] hover:border-white/20 transition-all duration-300 cursor-default bg-gradient-to-b",
                  card.gradient,
                  featuresReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: featuresReveal.visible ? `${i * 100}ms` : "0ms" }}
              >
                <card.icon size={28} className="text-white/80" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{card.title}</h3>
                  <p className="text-sm text-white/50">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={howReveal.ref} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className={cn("text-center mb-12 transition-all duration-700", howReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 mb-6">
              <span className="text-chart-blue">◆</span>
              <span className="text-xs uppercase tracking-[0.1em] font-semibold text-text-secondary">Three Steps</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Install the SDK", desc: "One line of code. Works with Swift, Kotlin, Flutter, React Native.", code: 'Komisi.configure(apiKey: "km_live_...")' },
              { num: "02", title: "Connect RevenueCat", desc: "Plug into your subscription infrastructure. Adapty and Stripe too.", integrations: ["RevenueCat", "Adapty", "Stripe"] },
              { num: "03", title: "Launch & Grow", desc: "Invite creators, set commissions, let Komisi handle tracking and payouts.", hasGradient: true },
            ].map((step, i) => (
              <div
                key={step.num}
                className={cn(
                  "bg-card border border-border rounded-2xl p-6 relative overflow-hidden transition-all duration-700",
                  howReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: howReveal.visible ? `${i * 100}ms` : "0ms" }}
              >
                <span className="absolute top-4 right-4 text-7xl font-bold text-muted/40 select-none leading-none">{step.num}</span>
                <h3 className="text-lg font-semibold text-foreground mb-2 mt-10">{step.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{step.desc}</p>
                {step.code && (
                  <div className="bg-[hsl(222,47%,7%)] text-[hsl(210,40%,98%)] rounded-lg p-3 font-mono text-xs">{step.code}</div>
                )}
                {step.integrations && (
                  <div className="flex gap-2 mt-1">
                    {step.integrations.map(int => (
                      <span key={int} className="text-xs bg-background-subtle text-text-secondary rounded-full px-2.5 py-1">{int}</span>
                    ))}
                  </div>
                )}
                {step.hasGradient && (
                  <div className="w-full h-2 rounded-full gradient-ai mt-2 opacity-60" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI FEATURES (Dark) ── */}
      <section className="bg-[hsl(222,47%,7%)] text-white py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powered by the Komisi <span className="shimmer-text">AI Engine</span> ✦
            </h2>
            <p className="text-base text-white/50 max-w-[440px] mb-6">
              Most platforms just track clicks. Komisi predicts which creators will drive the most revenue, detects fraud in real-time, and optimizes your commission structure automatically.
            </p>
            <Button variant="secondary" className="border-white/20 text-white hover:bg-white/10 bg-transparent">Book a demo →</Button>
          </div>
          <div className="w-64 h-64 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center" style={{ transform: "perspective(600px) rotateY(-5deg) rotateX(3deg)" }}>
            <span className="text-5xl shimmer-text">✦</span>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section ref={testimonialsReveal.ref} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={cn("text-center mb-12 transition-all duration-700", testimonialsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Wall of Love</h2>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={cn(
                  `${t.wc} rounded-xl p-6 mb-4 break-inside-avoid transition-all duration-700`,
                  testimonialsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: testimonialsReveal.visible ? `${i * 80}ms` : "0ms" }}
              >
                <p className="text-base font-medium text-foreground mb-4">"{t.quote}"</p>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-text-secondary">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section ref={pricingReveal.ref} className="py-20 px-6" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className={cn("text-center mb-8 transition-all duration-700", pricingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
            <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 mb-6">
              <span className="text-chart-blue">◆</span>
              <span className="text-xs uppercase tracking-[0.1em] font-semibold text-text-secondary">Simple Pricing</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Start Free. Scale as You Grow.</h2>
            <p className="text-lg text-text-secondary">Only pay more when you're earning more.</p>
          </div>
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 bg-background-subtle rounded-full p-1">
              <button onClick={() => setBilling("monthly")} className={cn("h-9 px-4 rounded-full text-sm font-medium transition-all", billing === "monthly" ? "bg-primary text-primary-foreground" : "text-text-secondary")}>Monthly</button>
              <button onClick={() => setBilling("yearly")} className={cn("h-9 px-4 rounded-full text-sm font-medium transition-all", billing === "yearly" ? "bg-primary text-primary-foreground" : "text-text-secondary")}>Yearly — Save 20%</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <div
                key={plan.name}
                className={cn(
                  "bg-card border rounded-2xl p-8 relative hover:-translate-y-1 transition-all duration-300",
                  plan.popular ? "border-foreground shadow-xl" : "border-border",
                  pricingReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: pricingReveal.visible ? `${i * 100}ms` : "0ms" }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-ai text-white text-xs font-semibold px-3 py-1 rounded-full">Popular</span>
                )}
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-3 mb-6">
                  <span className="text-3xl font-bold text-foreground">{billing === "monthly" ? plan.price : plan.yearly}</span>
                  <span className="text-text-secondary">/mo</span>
                </div>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                      <Check size={14} className="text-success shrink-0" />
                      {f.includes("0% platform") ? <strong className="text-foreground">{f}</strong> : f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <Button variant={plan.primary ? "default" : "secondary"} className="w-full">{plan.cta}</Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-text-secondary mt-6">Need custom? <a href="#" className="underline hover:text-foreground transition-colors">Talk to Sales →</a></p>
        </div>
      </section>

      {/* ── CTA + FOOTER (Dark) ── */}
      <section className="bg-[hsl(222,47%,7%)] text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to grow your app with <span className="shimmer-text">creator-powered</span> marketing?
          </h2>
          <Link to="/signup">
            <Button variant="secondary" size="lg" className="bg-white text-[hsl(222,47%,11%)] hover:bg-white/90 h-12 px-8 text-base font-semibold">
              Get Started — It's Free <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <footer className="max-w-6xl mx-auto border-t border-white/10 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="gradient-ai-text text-lg">✦</span>
                <span className="text-lg font-bold text-white tracking-tight">komisi</span>
              </div>
              <p className="text-xs text-white/40">The AI-native affiliate platform for mobile apps.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Marketplace"] },
              { title: "Resources", links: ["Documentation", "Blog", "Support", "Status"] },
              { title: "Company", links: ["About", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30">© 2026 Komisi. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-white/30 hover:text-white transition-colors"><Icon size={16} /></a>
              ))}
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Landing;
