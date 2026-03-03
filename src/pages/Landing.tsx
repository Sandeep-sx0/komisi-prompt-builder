import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { KomisiLogo } from "@/components/komisi/KomisiLogo";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Download, DollarSign, Shield, TrendingUp, Check,
  ArrowRight, ChevronDown, Menu, X,
} from "lucide-react";

const testimonials = [
  { quote: "We replaced $3,000/month in paid ads with Komisi affiliates. Our CAC dropped 60% in three months.", name: "Sarah Chen", title: "Head of Growth, MindfulApp", wc: "watercolor-pink" },
  { quote: "Komisi found us 15 affiliates in our first week. Revenue from creator referrals is now 30% of our MRR.", name: "Alex Rivera", title: "Founder, FocusTimer", wc: "watercolor-blue" },
  { quote: "The AI fraud detection alone saved us $2,000 in fake installs last month.", name: "Priya Patel", title: "CTO, DailyYoga", wc: "watercolor-green" },
  { quote: "Setting up took 5 minutes. The RevenueCat integration worked out of the box.", name: "David Park", title: "Indie Developer, SleepWell", wc: "watercolor-purple" },
  { quote: "Our best performing channel is now creator referrals, thanks to Komisi.", name: "Maria Santos", title: "Growth Lead, LangMaster", wc: "watercolor-yellow" },
  { quote: "Komisi's dashboard gives us real-time visibility into which creators drive revenue.", name: "Jake Wilson", title: "Co-founder, CodeSnap", wc: "watercolor-mixed" },
];

const bentoCards = [
  { title: "Track Installs", desc: "Attribute every install to the creator who drove it. iOS + Android. No IDFA needed.", icon: Download, wc: "watercolor-blue" },
  { title: "Reward Creators", desc: "Automated commissions on in-app purchases and subscriptions. Paid via Stripe.", icon: DollarSign, wc: "watercolor-pink" },
  { title: "Detect Fraud", desc: "AI catches fake installs, self-referrals, and attribution hijacking before you pay.", icon: Shield, wc: "watercolor-purple" },
  { title: "Grow Revenue", desc: "AI matches your app with the right creators and optimizes commission rates.", icon: TrendingUp, wc: "watercolor-green" },
];

const pricingPlans = [
  { name: "Free", price: "$0", yearly: "$0", features: ["5 affiliates", "1 app", "20% platform commission", "Basic dashboard", "Community support"], cta: "Get Started — Free →", primary: false },
  { name: "Growth", price: "$49", yearly: "$39", features: ["25 affiliates, 3 apps", "10% platform commission", "AI fraud detection", "RevenueCat + Adapty", "Stripe Connect payouts"], cta: "Start Growth Plan →", primary: true, popular: true },
  { name: "Scale", price: "$149", yearly: "$119", features: ["Unlimited affiliates & apps", "0% platform commission", "Full API access", "Priority support", "Custom webhooks"], cta: "Start Scale Plan →", primary: false },
];

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
      {/* Nav */}
      <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-200", scrolled ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent")}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <KomisiLogo size="sm" />
            <div className="hidden md:flex items-center gap-6">
              {["Product", "Pricing", "Docs", "Blog", "Marketplace"].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
            <Link to="/signup"><Button size="sm">Get Started <ArrowRight size={14} /></Button></Link>
          </div>
          <button className="md:hidden text-foreground" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-card border-b border-border p-4 space-y-2">
            {["Product", "Pricing", "Docs"].map(l => <a key={l} href="#" className="block text-sm py-2 text-text-secondary">{l}</a>)}
            <Link to="/login"><Button variant="secondary" className="w-full mt-2">Login</Button></Link>
            <Link to="/signup"><Button className="w-full">Get Started</Button></Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 mb-8">
            <span className="text-chart-blue">◆</span>
            <span className="text-xs uppercase tracking-[0.1em] font-semibold text-text-secondary">Built for Mobile Apps</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground leading-tight mb-6">
            Turn <span className="gradient-ai-text">Creators</span> into Your{"\n"}App's Growth Engine.
          </h1>
          <p className="text-lg text-text-secondary max-w-[560px] mx-auto mb-8">
            The AI-native affiliate platform for mobile apps. Track in-app purchases. Reward creators. Grow on autopilot.
          </p>
          <div className="inline-flex items-center bg-card border border-border rounded-xl p-1.5 shadow-lg max-w-[480px] w-full">
            <input placeholder="Enter your email" className="flex-1 h-10 px-4 text-sm bg-transparent outline-none" />
            <Link to="/signup"><Button>Get Started <ArrowRight size={14} /></Button></Link>
          </div>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex -space-x-2">
              {["SC", "AK", "JL"].map((initials, i) => (
                <div key={i} className={`w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-semibold text-foreground ${["watercolor-pink", "watercolor-blue", "watercolor-green"][i]}`}>{initials}</div>
              ))}
            </div>
            <span className="text-sm text-text-secondary">Join <strong className="text-chart-purple">200+</strong> app developers growing with creators</span>
          </div>
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            {["RevenueCat", "No IDFA", "AI Fraud Detection"].map((pill, i) => (
              <span key={pill} className="bg-background-subtle rounded-full text-xs px-3 py-1 text-text-secondary" style={{ animation: `float 3s ease-in-out ${i * 0.5}s infinite` }}>◆ {pill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Logo bar */}
      <section className="py-12 border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-text-tertiary mb-6">Trusted by indie developers and scaling apps</p>
          <div className="flex items-center justify-center gap-12 opacity-30 flex-wrap">
            {["MindfulApp", "FocusTimer", "DailyYoga", "SleepWell", "CodeSnap", "LangMaster"].map(l => (
              <span key={l} className="text-lg font-bold text-foreground">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* What Komisi Does — Dark */}
      <section className="bg-primary text-primary-foreground py-20 px-6" id="product">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 border border-border/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs uppercase tracking-[0.1em] font-semibold text-text-tertiary">Built for the App Store</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Komisi Does</h2>
            <p className="text-lg text-text-tertiary max-w-[600px] mx-auto">Komisi connects your app with creators who drive real installs and paying subscribers — not just clicks.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {bentoCards.map((card) => (
              <div key={card.title} className="rounded-2xl p-6 relative overflow-hidden aspect-[3/4] flex flex-col justify-between border border-border/20 hover:scale-[1.02] hover:shadow-2xl transition-all group" style={{ background: `radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)` }}>
                <card.icon size={28} className="text-primary-foreground/80" />
                <div>
                  <h3 className="text-lg font-semibold text-primary-foreground mb-1">{card.title}</h3>
                  <p className="text-sm text-primary-foreground/60">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-1.5 mb-6">
              <span className="text-xs uppercase tracking-[0.1em] font-semibold text-text-secondary">Three Steps to Growth</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Install the SDK", desc: "One line of code. Works with Swift, Kotlin, Flutter, React Native.", code: 'Komisi.configure(apiKey: "km_live_...")' },
              { num: "02", title: "Connect RevenueCat", desc: "Plug into your existing subscription infrastructure. Adapty and Stripe too." },
              { num: "03", title: "Launch & Grow", desc: "Invite creators, set commissions, and let Komisi handle attribution and payouts." },
            ].map((step) => (
              <div key={step.num} className="bg-card border border-border rounded-xl p-6 relative">
                <span className="absolute top-4 right-4 text-6xl font-bold text-muted/50">{step.num}</span>
                <h3 className="text-lg font-semibold text-foreground mb-2 mt-8">{step.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{step.desc}</p>
                {step.code && (
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 font-mono text-xs">{step.code}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features — Dark */}
      <section className="bg-primary text-primary-foreground py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by the Komisi <span className="gradient-ai-text">AI Engine</span> ✦</h2>
            <p className="text-base text-primary-foreground/60 max-w-[440px] mb-6">Most platforms just track clicks. Komisi predicts which creators will drive the most revenue, detects fraud in real-time, and optimizes your commission structure automatically.</p>
            <Button variant="secondary" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">Book a demo →</Button>
          </div>
          <div className="w-64 h-64 rounded-2xl border border-border/20 bg-gradient-to-br from-primary-foreground/5 to-transparent flex items-center justify-center" style={{ transform: "perspective(600px) rotateY(-5deg) rotateX(3deg)" }}>
            <span className="text-5xl gradient-ai-text">✦</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Wall of Love</h2>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className={`${t.wc} rounded-xl p-6 mb-4 break-inside-avoid`}>
                <p className="text-base font-medium text-foreground mb-4">"{t.quote}"</p>
                <div><div className="text-sm font-semibold text-foreground">{t.name}</div><div className="text-xs text-text-secondary">{t.title}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
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
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={cn("bg-card border rounded-2xl p-8 relative", plan.popular ? "border-foreground shadow-lg" : "border-border")}>
                {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-ai text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Popular</span>}
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-3 mb-6"><span className="text-3xl font-bold text-foreground">{billing === "monthly" ? plan.price : plan.yearly}</span><span className="text-text-secondary">/mo</span></div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => <li key={f} className="flex items-center gap-2 text-sm text-text-secondary"><Check size={14} className="text-success shrink-0" />{f}</li>)}
                </ul>
                <Link to="/signup"><Button variant={plan.primary ? "default" : "secondary"} className="w-full">{plan.cta}</Button></Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-text-secondary mt-6">Need custom? <a href="#" className="underline hover:text-foreground">Talk to Sales →</a></p>
        </div>
      </section>

      {/* CTA + Footer */}
      <section className="bg-primary text-primary-foreground py-20 px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Ready to grow your app with <span className="gradient-ai-text">creator-powered</span> marketing?</h2>
          <Link to="/signup"><Button variant="secondary" size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 px-8 text-base">Get Started — It's Free <ArrowRight size={16} /></Button></Link>
        </div>
        <footer className="max-w-6xl mx-auto border-t border-border/20 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1"><KomisiLogo size="sm" /></div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Marketplace"] },
              { title: "Resources", links: ["Documentation", "Blog", "Support", "Status"] },
              { title: "Company", links: ["About", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-primary-foreground mb-3">{col.title}</h4>
                <ul className="space-y-2">{col.links.map(l => <li key={l}><a href="#" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">{l}</a></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border/20 pt-6 text-center"><p className="text-xs text-primary-foreground/40">© 2026 Komisi. All rights reserved.</p></div>
        </footer>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

export default Landing;
