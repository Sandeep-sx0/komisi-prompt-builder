import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Target, Shield, BarChart2, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";
import FraudDetectionAnimation from "@/components/komisi/FraudDetectionAnimation";
import PayoutsAnimation from "@/components/komisi/PayoutsAnimation";

/* ── Accordion items data ── */
const features = [
  {
    icon: Target,
    label: "Attribute every install without IDFA or cookies.",
    description: "Privacy-safe fingerprint matching on iOS. Play Install Referrer on Android. 0.60–0.95 confidence scoring. No ATT prompt.",
  },
  {
    icon: Shield,
    label: "AI fraud detection that protects your program automatically.",
    description: "Every conversion scored in real time. Komisi flags IP clusters, velocity anomalies, and emulator installs before they cost you money.",
  },
  {
    icon: BarChart2,
    label: "Know exactly which creator drove every install and subscription.",
    description: "Real-time analytics by creator, campaign, platform, and content. Install volume, trial starts, conversions, and revenue attributed.",
  },
  {
    icon: Zap,
    label: "Pay every creator automatically. No invoices, no chasing.",
    description: "Creators connect Stripe during onboarding. Komisi calculates commissions against net revenue and queues payouts automatically.",
  },
];

/* ── Attribution Terminal Visual ── */
const AttributionVisual = () => {
  const [phase, setPhase] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const delays = [800, 1200, 800, 800, 800];
    let current = 0;

    const advance = () => {
      if (current < 5) {
        current++;
        setPhase(current);
        timerRef.current = setTimeout(advance, delays[current] || 800);
      } else {
        timerRef.current = setTimeout(() => {
          current = 0;
          setPhase(0);
          timerRef.current = setTimeout(advance, 600);
        }, 2000);
      }
    };

    timerRef.current = setTimeout(advance, 600);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const lines = [
    { text: "KomisiSDK.resolve()", color: "#c0caf5" },
    { text: "> Checking fingerprint...", color: "#9CA3AF" },
    { text: "> ✓ Match found", color: "#4ADE80" },
    { text: "> Confidence score: 0.94", color: "#F59E0B" },
    { text: "> ✓ Attributed to @sarah_creates", color: "#4ADE80" },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#F8F8F8", backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
      <div style={{ width: 420, backgroundColor: "#0D1117", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
          <span className="ml-2 text-[10px] font-mono" style={{ color: "#565f89" }}>terminal</span>
        </div>
        <div className="px-5 py-4 font-mono text-sm leading-7">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: phase > i ? 1 : 0, y: phase > i ? 0 : 4 }}
              transition={{ duration: 0.3 }}
              style={{ color: line.color }}
            >
              {line.text}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Analytics Visual ── */
const AnalyticsVisual = () => {
  const rows = [
    { handle: "@sarahcreates", platform: "TikTok", installs: 234, revenue: 2100 },
    { handle: "@techreviewer", platform: "YouTube", installs: 89, revenue: 445 },
    { handle: "@dailyapps", platform: "Instagram", installs: 56, revenue: 340 },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#F8F8F8", backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
      <div style={{ width: 520, backgroundColor: "#FFFFFF", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #F3F4F6" }}>
          <span className="text-sm font-medium" style={{ color: "#111111" }}>Creator Performance</span>
          <span className="text-[10px]" style={{ color: "#9CA3AF" }}>Last 30 days</span>
        </div>
        <div className="grid grid-cols-4 px-6 py-2.5" style={{ borderBottom: "1px solid #F3F4F6" }}>
          {["CREATOR", "PLATFORM", "INSTALLS", "REVENUE"].map(h => (
            <span key={h} className="text-[10px] uppercase tracking-wider" style={{ color: "#9CA3AF" }}>{h}</span>
          ))}
        </div>
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-4 px-6 py-3 items-center" style={{ borderBottom: i < rows.length - 1 ? "1px solid #F3F4F6" : "none" }}>
            <span className="text-xs" style={{ color: "#111111" }}>{row.handle}</span>
            <span className="text-xs" style={{ color: "#6B7280" }}>{row.platform}</span>
            <span className="text-xs" style={{ color: "#111111" }}>
              <CountingNumber number={row.installs} inView inViewOnce transition={{ stiffness: 60, damping: 30 }} />
            </span>
            <span className="text-xs" style={{ color: "#111111" }}>
              $<CountingNumber number={row.revenue} inView inViewOnce transition={{ stiffness: 60, damping: 30 }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Fraud Visual wrapper ── */
const FraudVisual = () => (
  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#F8F8F8", backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
    <div style={{ width: "100%", maxWidth: 520 }}>
      <FraudDetectionAnimation />
    </div>
  </div>
);

/* ── Payouts Visual wrapper ── */
const PayoutsVisual = () => (
  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#F8F8F8", backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
    <div style={{ width: "100%", maxWidth: 520 }}>
      <PayoutsAnimation />
    </div>
  </div>
);

const visuals = [AttributionVisual, FraudVisual, AnalyticsVisual, PayoutsVisual];

/* ── Main Component ── */
const StickyFeatureScroll: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const [activeStep, setActiveStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const step = Math.min(3, Math.floor(v * 4));
    const progress = (v * 4) % 1;
    setActiveStep(step);
    setStepProgress(step === 3 && v >= 0.99 ? 1 : progress);
  });

  const ActiveVisual = visuals[activeStep];

  return (
    <>
      {/* 400vh scroll container */}
      <div ref={sectionRef} style={{ height: "400vh", position: "relative" }}>
        {/* Sticky viewport */}
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", backgroundColor: "#FFFFFF", overflow: "hidden" }}>

          {/* ── Left Panel ── */}
          <div style={{ width: "38%", height: "100vh", display: "flex", flexDirection: "column", padding: "56px 48px", position: "relative" }}>
            {/* Top area */}
            <div style={{ flexGrow: 1 }}>
              {/* Badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] uppercase tracking-[0.15em] px-2.5 py-1" style={{ color: "#000000", backgroundColor: "#E0F2FE", borderRadius: 4 }}>
                  ■ FEATURES
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl font-medium tracking-tight leading-tight mb-12" style={{ color: "#000000" }}>
                Everything your affiliate program needs.
              </h2>

              {/* Accordion */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {features.map((feat, i) => {
                  const isActive = activeStep === i;
                  const Icon = feat.icon;

                  return (
                    <div key={i} style={{ borderTop: i === 0 ? "1px solid rgba(0,0,0,0.08)" : "none", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                      {/* Icon + Label */}
                      <div className="flex items-start gap-3 py-4" style={{ cursor: "default" }}>
                        <Icon size={16} style={{ color: isActive ? "#000000" : "rgba(0,0,0,0.25)", marginTop: 2, flexShrink: 0, transition: "color 0.3s" }} />
                        <span className="text-sm leading-snug" style={{ color: isActive ? "#000000" : "rgba(0,0,0,0.3)", transition: "color 0.3s" }}>
                          {feat.label}
                        </span>
                      </div>

                      {/* Description — active only */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="text-xs leading-relaxed pb-4 pl-7" style={{ color: "rgba(0,0,0,0.55)" }}>
                              {feat.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Progress underline */}
                      <div style={{ height: 2, backgroundColor: "rgba(0,0,0,0.06)", position: "relative" }}>
                        {isActive && (
                          <motion.div
                            style={{
                              height: "100%",
                              backgroundColor: "#D97757",
                              width: `${stepProgress * 100}%`,
                              transition: "width 50ms linear",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom CTA */}
            <div style={{ paddingTop: 32 }}>
              <Link to="/signup">
                <Button size="lg" className="h-12 px-8 border-none" style={{ backgroundColor: "#000000", color: "#FFFFFF", fontWeight: 500 }}>
                  Try Komisi → 
                </Button>
              </Link>
            </div>
          </div>

          {/* ── Right Panel ── */}
          <div style={{ width: "62%", height: "100vh", position: "relative", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ position: "absolute", inset: 0 }}
              >
                <ActiveVisual />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Testimonial strip below ── */}
      <section style={{ backgroundColor: "#000000", padding: "64px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Sarah Chen", role: "Founder, MindfulApp", avatar: "/avatars/user-1.jpg", quote: "We replaced $3,000/month in paid ads with Komisi affiliates. Our CAC dropped 60% in three months." },
            { name: "David Park", role: "Developer, FocusTimer", avatar: "/avatars/user-2.jpg", quote: "Setup took less time than writing this testimonial. The RevenueCat integration worked out of the box." },
            { name: "Marcus Lee", role: "Growth, CalorieSnap", avatar: "/avatars/user-3.jpg", quote: "I can finally see which creator drove which subscription. That data alone is worth the price." },
            { name: "Priya Nair", role: "Founder, MindfulApp", avatar: "/avatars/user-4.jpg", quote: "Automated payouts saved me hours every month. Creators love getting paid on time." },
          ].map((t, i) => (
            <div key={i} style={{ padding: 24, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 0 }}>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>{t.name}</p>
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default StickyFeatureScroll;
