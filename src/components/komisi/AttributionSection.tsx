import React, { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion } from "motion/react";
import { Link2, Download, Fingerprint, CircleDollarSign } from "lucide-react";

const IsometricStack3D = lazy(() =>
  import("@/components/komisi/IsometricStack3D").then((m) => ({ default: m.IsometricStack3D }))
);

const steps = [
  {
    step: "STEP 1",
    heading: "Creator shares their link",
    body: "Every creator gets a unique Komisi link. One tap takes the user directly to the App Store or Google Play.",
    side: "left" as const,
    icon: Link2,
  },
  {
    step: "STEP 2",
    heading: "User clicks and installs",
    body: "The user lands in the App Store, installs, and opens the app. The full journey is captured.",
    side: "right" as const,
    icon: Download,
  },
  {
    step: "STEP 3",
    heading: "SDK resolves attribution",
    body: "On first launch, the SDK matches the install to the creator. No IDFA. No ATT prompt. No cookies.",
    side: "left" as const,
    icon: Fingerprint,
  },
  {
    step: "STEP 4",
    heading: "Commission queued automatically",
    body: "RevenueCat or Adapty fires a webhook. Commission is calculated against net revenue and queued for payout.",
    side: "right" as const,
    icon: CircleDollarSign,
  },
];

const StepBlock = ({
  step,
  active,
  align,
}: {
  step: (typeof steps)[0];
  active: boolean;
  align: "left" | "right";
}) => {
  const Icon = step.icon;
  return (
    <div
      className={`flex ${align === "left" ? "lg:flex-row-reverse lg:text-right" : "lg:flex-row"} items-start gap-4`}
      style={{
        transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
        transform: active ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* Connector line + dot */}
      <div
        className={`hidden lg:flex items-center ${align === "left" ? "flex-row-reverse" : "flex-row"} shrink-0`}
        style={{ width: 60 }}
      >
        <div
          className="w-[6px] h-[6px] rounded-full shrink-0"
          style={{
            background: active ? "#FFFFFF" : "#4A4A7A",
            boxShadow: active ? "0 0 8px rgba(167,139,250,0.6)" : "none",
            transition: "all 0.6s ease",
          }}
        />
        <div
          className="flex-1 h-px"
          style={{
            backgroundImage: `repeating-linear-gradient(to ${align === "left" ? "left" : "right"}, ${active ? "rgba(255,255,255,0.4)" : "rgba(74,74,122,0.3)"} 0px, ${active ? "rgba(255,255,255,0.4)" : "rgba(74,74,122,0.3)"} 4px, transparent 4px, transparent 8px)`,
            transition: "all 0.6s ease",
          }}
        />
      </div>

      {/* Text content */}
      <div className="flex-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
          style={{
            background: active ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.03)",
            transition: "background 0.6s ease",
          }}
        >
          <Icon
            size={16}
            style={{
              color: active ? "#A78BFA" : "#4B5563",
              transition: "color 0.6s ease",
            }}
          />
        </div>
        <span
          className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-2"
          style={{
            color: active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.15)",
            transition: "color 0.6s ease",
          }}
        >
          {step.step}
        </span>
        <h4
          className="text-base lg:text-lg font-medium mb-2"
          style={{
            color: active ? "#ffffff" : "#4B5563",
            transition: "color 0.6s ease",
          }}
        >
          {step.heading}
        </h4>
        <p
          className="text-sm leading-relaxed max-w-[280px]"
          style={{
            color: active ? "#D1D5DB" : "#374151",
            transition: "color 0.6s ease",
            ...(align === "left" ? { marginLeft: "auto" } : {}),
          }}
        >
          {step.body}
        </p>
      </div>
    </div>
  );
};

export const AttributionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState(-1);
  const [bgProgress, setBgProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Background: fade from white to dark as section enters
      const enterProgress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.6)));
      setBgProgress(enterProgress);

      // scrolled = how far past the top of the section
      const scrolled = -rect.top;

      // Pre-activation buffer: the diagram must be fully centered on screen
      // before Step 1 activates. The sticky container pins at top:0, so the
      // diagram is centered once we've scrolled ~1vh into the section.
      // With 600vh section height, totalTravel = 500vh.
      // We want ~100vh of dead scroll before activation starts.
      const preBuffer = vh * 1.0;
      // 4 steps, each gets ~100vh of scroll travel
      const stepsZone = vh * 4.0;

      const stepsScrolled = scrolled - preBuffer;

      if (stepsScrolled <= 0 || enterProgress < 0.5) {
        setActiveLayer(-1);
      } else {
        const stepProgress = Math.min(stepsScrolled / stepsZone, 0.9999);
        setActiveLayer(Math.floor(stepProgress * 4));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lerp white → near-black
  const r = Math.round(255 - bgProgress * (255 - 10));
  const g = Math.round(255 - bgProgress * (255 - 10));
  const b = Math.round(255 - bgProgress * (255 - 15));
  const bgColor = `rgb(${r},${g},${b})`;

  const leftSteps = steps.filter((s) => s.side === "left");
  const rightSteps = steps.filter((s) => s.side === "right");

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: bgColor,
        transition: "background-color 0.05s linear",
        minHeight: "600vh",
      }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 min-h-screen flex flex-col justify-center px-4 md:px-6 py-16 lg:py-24 overflow-hidden">
        {/* Header */}
        <motion.div
          className="text-center mb-4 lg:mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 mb-6 lg:mb-8 border border-white/15 font-mono text-xs uppercase tracking-[0.15em] text-white/40">
            HOW ATTRIBUTION WORKS
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white tracking-tight leading-tight">
            Every install attributed.
            <br />
            No IDFA. No ATT prompt.
            <br />
            No guesswork.
          </h2>
        </motion.div>

        {/* Chips */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {["No IDFA", "No ATT prompt", "No cookies", "App Store privacy label: zero impact"].map((t) => (
            <span key={t} className="text-[11px] border border-white/10 text-white/50 px-3 py-1.5 rounded-sm">
              {t}
            </span>
          ))}
        </motion.div>

        {/* Three-column layout */}
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_minmax(400px,520px)_1fr] gap-6 lg:gap-0 items-center">
          {/* Left — Steps 1 & 3 */}
          <div className="flex flex-col justify-between gap-12 lg:gap-24 order-2 lg:order-1">
            {leftSteps.map((s) => {
              const idx = steps.indexOf(s);
              return <StepBlock key={s.step} step={s} active={activeLayer === idx} align="left" />;
            })}
          </div>

          {/* Center — Three.js Canvas */}
          <div className="flex justify-center order-1 lg:order-2 h-[400px] md:h-[500px] lg:h-[600px]">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                </div>
              }
            >
              <IsometricStack3D activeLayer={activeLayer} />
            </Suspense>
          </div>

          {/* Right — Steps 2 & 4 */}
          <div className="flex flex-col justify-between gap-12 lg:gap-24 order-3">
            {rightSteps.map((s) => {
              const idx = steps.indexOf(s);
              return <StepBlock key={s.step} step={s} active={activeLayer === idx} align="right" />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
