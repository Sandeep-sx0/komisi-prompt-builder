import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { IsometricStack } from "@/components/komisi/IsometricStack";

const steps = [
  {
    step: "STEP 1",
    heading: "Creator shares their link",
    body: "Every creator gets a unique Komisi link. One tap takes the user directly to the App Store or Google Play.",
    side: "left" as const,
  },
  {
    step: "STEP 2",
    heading: "User clicks and installs",
    body: "The user lands in the App Store, installs, and opens the app. The full journey is captured.",
    side: "right" as const,
  },
  {
    step: "STEP 3",
    heading: "SDK resolves attribution",
    body: "On first launch, the SDK matches the install to the creator. No IDFA. No ATT prompt. No cookies.",
    side: "left" as const,
  },
  {
    step: "STEP 4",
    heading: "Commission queued automatically",
    body: "RevenueCat or Adapty fires a webhook. Commission is calculated against net revenue and queued for payout.",
    side: "right" as const,
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
}) => (
  <div
    className={`${align === "left" ? "lg:text-right" : ""}`}
    style={{
      transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
      transform: active ? "translateY(-4px)" : "translateY(0)",
      opacity: active ? 1 : 0.4,
    }}
  >
    <span
      className="text-[10px] font-mono uppercase tracking-[0.2em] block mb-2"
      style={{
        color: active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
        transition: "color 0.5s ease",
      }}
    >
      {step.step}
    </span>
    <h4
      className="text-base font-normal mb-2"
      style={{
        color: active ? "#ffffff" : "#4B5563",
        transition: "color 0.5s ease",
      }}
    >
      {step.heading}
    </h4>
    <p
      className="text-sm leading-relaxed"
      style={{
        color: active ? "#D1D5DB" : "#4B5563",
        transition: "color 0.5s ease",
      }}
    >
      {step.body}
    </p>
  </div>
);

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

      // Background transition: 0 when section top at viewport bottom, 1 when fully entered
      const enterProgress = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      setBgProgress(enterProgress);

      // Layer activation: divide the section into zones
      const sectionProgress = Math.max(0, Math.min(1, -rect.top / (rect.height - vh)));

      if (sectionProgress <= 0 || enterProgress < 0.5) {
        setActiveLayer(-1);
      } else if (sectionProgress < 0.25) {
        setActiveLayer(0);
      } else if (sectionProgress < 0.5) {
        setActiveLayer(1);
      } else if (sectionProgress < 0.75) {
        setActiveLayer(2);
      } else {
        setActiveLayer(3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Interpolate background color
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
        transition: "background-color 0.1s linear",
        // Make section tall enough for scroll zones
        minHeight: "200vh",
      }}
    >
      {/* Sticky inner content */}
      <div className="sticky top-0 min-h-screen flex flex-col justify-center px-6 py-24 overflow-hidden">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-1.5 mb-8 border border-white/15 font-mono text-xs uppercase tracking-[0.15em] text-white/40">
            HOW ATTRIBUTION WORKS
          </div>
          <h2 className="text-3xl md:text-4xl font-normal text-white tracking-tight leading-tight">
            Every install attributed.
            <br />
            No IDFA. No ATT prompt.
            <br />
            No guesswork.
          </h2>
        </motion.div>

        {/* Chips */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {[
            "No IDFA",
            "No ATT prompt",
            "No cookies",
            "App Store privacy label: zero impact",
          ].map((t) => (
            <span
              key={t}
              className="text-xs border border-white/10 text-white/50 px-3 py-1.5"
            >
              {t}
            </span>
          ))}
        </motion.div>

        {/* 3-column layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6 items-center w-full">
          {/* Left — Steps 1 & 3 */}
          <div className="flex flex-col justify-between gap-16 lg:gap-28">
            {leftSteps.map((s) => {
              const idx = steps.indexOf(s);
              return (
                <StepBlock
                  key={s.step}
                  step={s}
                  active={activeLayer === idx}
                  align="left"
                />
              );
            })}
          </div>

          {/* Center — Stack */}
          <div className="flex justify-center">
            <IsometricStack activeLayer={activeLayer} />
          </div>

          {/* Right — Steps 2 & 4 */}
          <div className="flex flex-col justify-between gap-16 lg:gap-28">
            {rightSteps.map((s) => {
              const idx = steps.indexOf(s);
              return (
                <StepBlock
                  key={s.step}
                  step={s}
                  active={activeLayer === idx}
                  align="right"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
