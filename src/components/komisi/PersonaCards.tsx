import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle } from "lucide-react";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";

/* ═══════════════════════════════════════════
   CARD 1 — Developer Terminal Animation
   ═══════════════════════════════════════════ */
const DeveloperVisual = () => {
  const [phase, setPhase] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const codeStr = 'KomisiSDK.configure(apiKey: "YOUR_KEY")';

  useEffect(() => {
    const cycle = () => {
      setPhase(0);
      setTypedChars(0);
      const t1 = setTimeout(() => setPhase(1), 300);
      const t2 = setTimeout(() => setPhase(2), 1100);
      const t3 = setTimeout(() => setPhase(3), 3200);
      const t4 = setTimeout(() => setPhase(4), 4700);
      return [t1, t2, t3, t4];
    };

    let timers = cycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = cycle();
    }, 5500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (phase !== 2) return;
    setTypedChars(0);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTypedChars(i);
      if (i >= codeStr.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [phase]);

  const typed = codeStr.slice(0, typedChars);

  const renderCode = () => {
    const sdk = "KomisiSDK";
    const configure = ".configure(apiKey: ";
    const key = '"YOUR_KEY"';

    if (typed.length <= sdk.length) {
      return <span style={{ color: "#000000" }}>{typed}</span>;
    }
    const rest1 = typed.slice(sdk.length);
    if (rest1.length <= configure.length) {
      return (
        <>
          <span style={{ color: "#000000" }}>{sdk}</span>
          <span style={{ color: "rgba(0,0,0,0.55)" }}>{rest1}</span>
        </>
      );
    }
    const rest2 = rest1.slice(configure.length);
    if (rest2.length <= key.length) {
      return (
        <>
          <span style={{ color: "#000000" }}>{sdk}</span>
          <span style={{ color: "rgba(0,0,0,0.55)" }}>{configure}</span>
          <span style={{ color: "#2E7D32" }}>{rest2}</span>
        </>
      );
    }
    return (
      <>
        <span style={{ color: "#000000" }}>{sdk}</span>
        <span style={{ color: "rgba(0,0,0,0.55)" }}>{configure}</span>
        <span style={{ color: "#2E7D32" }}>{key}</span>
        <span style={{ color: "rgba(0,0,0,0.55)" }}>{rest2.slice(key.length)}</span>
      </>
    );
  };

  return (
    <div className="h-full flex flex-col justify-center px-6 py-5 space-y-3">
      {/* Step 1 */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4 }}
      >
        <span
          className="w-6 h-6 shrink-0 flex items-center justify-center text-[10px]"
          style={{
            backgroundColor: phase >= 1 ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.05)",
            color: "#000000",
            borderRadius: "50%",
          }}
        >
          ①
        </span>
        <span className="text-sm" style={{ color: "rgba(0,0,0,0.55)" }}>
          Configure your app
        </span>
      </motion.div>

      {/* Step 2 */}
      <motion.div
        className="ml-2 p-3"
        style={{ backgroundColor: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)" }}
        initial={{ opacity: 0, x: 20 }}
        animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span
            className="w-6 h-6 shrink-0 flex items-center justify-center text-[10px]"
            style={{
              backgroundColor: phase >= 2 ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.05)",
              color: "#000000",
              borderRadius: "50%",
            }}
          >
            ②
          </span>
          <span className="text-sm" style={{ fontWeight: 400, color: "#000000" }}>
            Install Komisi SDK
          </span>
        </div>
        <pre className="text-[11px] font-mono ml-9 leading-relaxed whitespace-pre-wrap">
          {renderCode()}
          {phase === 2 && typedChars < codeStr.length && (
            <span className="animate-pulse" style={{ color: "#000000" }}>▌</span>
          )}
        </pre>
      </motion.div>

      {/* Step 3 */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4 }}
      >
        <span
          className="w-6 h-6 shrink-0 flex items-center justify-center text-[10px]"
          style={{
            backgroundColor: phase >= 3 ? "rgba(16,185,129,0.2)" : "rgba(0,0,0,0.05)",
            color: phase >= 3 ? "#10B981" : "rgba(0,0,0,0.4)",
            borderRadius: "50%",
          }}
        >
          ③
        </span>
        <span className="text-sm" style={{ color: "rgba(0,0,0,0.55)" }}>
          Attribution active
        </span>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={phase >= 3 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        >
          <CheckCircle size={14} style={{ color: "#10B981" }} />
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   CARD 2 — Growth Teams Bar Chart Animation
   ═══════════════════════════════════════════ */
const barHeights = [25, 35, 30, 45, 55, 42, 65, 82];

const GrowthVisual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [animKey, setAnimKey] = useState(0);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (!inView) return;
    setShowBadge(false);
    const timer = setTimeout(() => setShowBadge(true), 1600);
    const loop = setInterval(() => {
      setAnimKey((k) => k + 1);
      setShowBadge(false);
      setTimeout(() => setShowBadge(true), 1600);
    }, 5000);
    return () => {
      clearTimeout(timer);
      clearInterval(loop);
    };
  }, [inView]);

  return (
    <div ref={ref} className="h-full flex flex-col justify-center px-6 py-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(0,0,0,0.45)" }}>
          Installs
        </span>
        <div className="flex items-center gap-2">
          <span className="text-lg tracking-tight" style={{ fontWeight: 400, color: "#F59E0B" }}>
            {inView ? (
              <CountingNumber
                key={animKey}
                number={56823}
                prefix="$"
                suffix=""
                decimalPlaces={0}
                inView
                transition={{ stiffness: 40, damping: 25 }}
              />
            ) : (
              "$0"
            )}
          </span>
          <motion.span
            className="text-[10px] px-1.5 py-0.5"
            style={{ color: "#10B981", backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid rgba(16,185,129,0.3)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={showBadge ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            +11.4%
          </motion.span>
        </div>
      </div>

      <div className="flex items-end gap-1.5 h-28" style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "1px solid rgba(0,0,0,0.08)", padding: "8px" }}>
        {barHeights.map((h, i) => (
          <div key={`${animKey}-${i}`} className="flex-1 flex flex-col justify-end h-full">
            <motion.div
              className="w-full"
              style={{ backgroundColor: "rgba(0,0,0,0.65)", minHeight: "4px" }}
              initial={{ height: 0 }}
              animate={inView ? { height: `${h}%` } : { height: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-2">
        {["Aug 12", "Aug 19", "Aug 26", "Sep 02", "Sep 09"].map((m) => (
          <span key={m} className="text-[7px]" style={{ color: "rgba(0,0,0,0.4)" }}>
            {m}
          </span>
        ))}
      </div>

      <motion.div
        className="flex gap-3 mt-3"
        initial={{ opacity: 0 }}
        animate={showBadge ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {[
          { c: "rgba(0,0,0,0.7)", l: "Campaign 1" },
          { c: "rgba(0,0,0,0.4)", l: "Campaign 2" },
          { c: "rgba(0,0,0,0.2)", l: "Campaign 3" },
        ].map((d) => (
          <div key={d.l} className="flex items-center gap-1">
            <span className="w-2 h-2" style={{ backgroundColor: d.c, borderRadius: "50%" }} />
            <span className="text-[8px]" style={{ color: "rgba(0,0,0,0.45)" }}>
              {d.l}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   CARD 3 — Creator Floating Parallax Cards
   ═══════════════════════════════════════════ */
const CreatorVisual = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setProgressWidth(0);
    const t = setTimeout(() => setProgressWidth(68), 500);
    const loop = setInterval(() => {
      setProgressWidth(0);
      setTimeout(() => setProgressWidth(68), 500);
    }, 6000);
    return () => {
      clearTimeout(t);
      clearInterval(loop);
    };
  }, [inView]);

  return (
    <div ref={ref} className="h-full flex items-center justify-center p-6 relative overflow-hidden">
      {/* Back card — floating */}
      <motion.div
        className="absolute left-4 top-6 w-[180px] p-4 shadow-md z-0"
        style={{ backgroundColor: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)" }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      >
        <p className="text-[11px] mb-2" style={{ fontWeight: 400, color: "#000000" }}>
          Earn from every install
        </p>
        <div className="w-full h-1.5 overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.08)" }}>
          <motion.div
            className="h-full"
            style={{ backgroundColor: "#10B981" }}
            animate={{ width: `${progressWidth}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <p className="text-[9px] mt-1" style={{ color: "rgba(0,0,0,0.45)" }}>
          68% of monthly goal
        </p>
      </motion.div>

      {/* Front card — floating at different phase */}
      <motion.div
        className="absolute right-4 bottom-6 w-[180px] p-4 shadow-lg z-10"
        style={{ backgroundColor: "rgba(255,255,255,0.75)", border: "1px solid rgba(0,0,0,0.08)" }}
        animate={{ y: [-6, 2, -6] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px]" style={{ color: "rgba(0,0,0,0.55)" }}>
            @creator
          </span>
          <span className="text-[9px] px-1.5 py-0.5 flex items-center gap-1" style={{ color: "#10B981", backgroundColor: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.15)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full opacity-75" style={{ backgroundColor: "#10B981", borderRadius: "50%" }} />
              <span className="relative inline-flex h-2 w-2" style={{ backgroundColor: "#10B981", borderRadius: "50%" }} />
            </span>
            Active
          </span>
        </div>
        <p className="text-xl tracking-tight" style={{ fontWeight: 400, color: "#F59E0B" }}>
          {inView ? (
            <CountingNumber
              number={3562}
              prefix="$"
              suffix=""
              decimalPlaces={0}
              inView
              inViewOnce
              transition={{ stiffness: 40, damping: 25 }}
            />
          ) : (
            "$0"
          )}
        </p>
        <p className="text-[9px] mb-3" style={{ color: "rgba(0,0,0,0.45)" }}>
          earned this month
        </p>
        <div
          className="text-[10px] px-2 py-1 text-center"
          style={{ border: "1px solid rgba(0,0,0,0.12)", color: "#000000" }}
        >
          View Links →
        </div>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   WRAPPER — Card with hover states
   ═══════════════════════════════════════════ */
interface PersonaCardProps {
  children: React.ReactNode;
  label: string;
  chips: string[];
  visual: React.ReactNode;
  backgroundImage: string;
  delay?: number;
}

const PersonaCard = ({ label, chips, visual, backgroundImage, delay = 0 }: PersonaCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className="h-full flex flex-col cursor-default group valley-glow-hover overflow-hidden"
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        transition: "border-color 300ms ease",
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#000000";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.08)";
      }}
    >
      {/* White overlay — watercolor bleeds through softly */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          bottom: "10px",
          left: "10px",
          backgroundColor: "rgba(255,255,255,0.55)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="h-[240px]">
          {visual}
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <p className="text-xl mb-3" style={{ fontWeight: 500, color: "#000000" }}>
            {label}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {chips.map((f) => (
              <span
                key={f}
                className="text-[10px] px-2 py-1"
                style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.1)", color: "#000000" }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════
   EXPORT — Full Section
   ═══════════════════════════════════════════ */
const PersonaCards = () => {
  return (
    <section className="py-24 px-6 dot-grid">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-normal text-foreground tracking-tight leading-tight">
            Built for every person on your team.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <PersonaCard
            label="For Developers →"
            chips={["Lightweight SDK", "No IDFA", "RevenueCat integration", "Privacy-safe"]}
            visual={<DeveloperVisual />}
            backgroundImage="/backgrounds/BG 16.webp"
            delay={0}
          >
            {null}
          </PersonaCard>

          <PersonaCard
            label="For Growth Teams →"
            chips={["Campaign tracking", "Creator analytics", "CAC dashboard", "Commission tiers"]}
            visual={<GrowthVisual />}
            backgroundImage="/backgrounds/BG 3.png"
            delay={0.08}
          >
            {null}
          </PersonaCard>

          <PersonaCard
            label="For Creators →"
            chips={["Tracking links", "Real-time earnings", "Auto payouts", "Content analytics"]}
            visual={<CreatorVisual />}
            backgroundImage="/backgrounds/BG 18.webp"
            delay={0.16}
          >
            {null}
          </PersonaCard>
        </div>
      </div>
    </section>
  );
};

export default PersonaCards;
