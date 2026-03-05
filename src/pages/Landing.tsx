import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  const stagger = (index: number) => ({
    className: cn(
      "transition-all duration-700 ease-out",
      loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    ),
    style: { transitionDelay: `${index * 80}ms` },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* ── NAV ── */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-1.5">
              <Sparkles size={18} className="text-foreground" />
              <span className="text-lg font-bold text-foreground tracking-tight">
                Komisi
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {["Product", "Pricing", "Docs", "Marketplace"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">
                Get Started <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-card border-b border-border p-4 space-y-2 animate-fade-in">
            {["Product", "Pricing", "Docs", "Marketplace"].map((l) => (
              <a
                key={l}
                href="#"
                className="block text-sm py-2 text-muted-foreground"
              >
                {l}
              </a>
            ))}
            <Link to="/login">
              <Button variant="secondary" className="w-full mt-2">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="pt-40 pb-32 px-6 noise-texture">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div {...stagger(0)}>
            <div className="inline-flex items-center gap-2 border border-border px-4 py-1.5 mb-8">
              <span className="text-sm">Now with AI fraud detection</span>
              <Sparkles size={14} className="text-foreground" />
            </div>
          </div>

          {/* Headline */}
          <div {...stagger(1)}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground leading-[1.08] mb-6">
              The affiliate platform mobile apps have been waiting for.
            </h1>
          </div>

          {/* Sub-headline */}
          <div {...stagger(2)}>
            <p className="text-lg text-muted-foreground max-w-[600px] mx-auto mb-10">
              Attribution that survives the App Store. Commissions that pay
              themselves. Creators who actually convert.
            </p>
          </div>

          {/* CTAs */}
          <div {...stagger(3)}>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="hover:scale-[1.03] transition-transform duration-200"
                >
                  Get Started Free <ArrowRight size={16} />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="secondary" size="lg">
                  See How It Works
                </Button>
              </a>
            </div>
          </div>

          {/* Social proof */}
          <div {...stagger(4)}>
            <p className="text-sm text-muted-foreground mt-8">
              Trusted by 200+ indie app developers · No credit card required
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
