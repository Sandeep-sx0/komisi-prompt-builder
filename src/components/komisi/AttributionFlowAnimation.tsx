import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const CYCLE_DURATION = 22000;

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const fadeIn = { duration: 0.6, ease: "easeInOut" as const };
const fadeOut = { duration: 0.4, ease: "easeInOut" as const };

/* ── Line-by-line fade hook ── */
const useFadingLines = (lines: { text: string; color: string }[], active: boolean, delay = 600) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) { setVisibleCount(0); return; }
    let i = 0;
    setVisibleCount(1);
    const iv = setInterval(() => {
      i++;
      if (i >= lines.length) { clearInterval(iv); return; }
      setVisibleCount(i + 1);
    }, delay);
    return () => clearInterval(iv);
  }, [active, lines.length, delay]);

  return visibleCount;
};

const AttributionFlowAnimation = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cursorTap, setCursorTap] = useState(false);
  const [getRingProgress, setGetRingProgress] = useState(0);
  const [installRing, setInstallRing] = useState(0);
  const [showCheck, setShowCheck] = useState(false);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const run = () => {
      startRef.current = Date.now();
      setStep(0); setProgress(0); setCursorTap(false);
      setGetRingProgress(0); setInstallRing(0); setShowCheck(false);

      setTimeout(() => setStep(1), 200);
      setTimeout(() => setCursorTap(true), 2800);
      setTimeout(() => setStep(2), 4000);
      setTimeout(() => setCursorTap(false), 4200);
      setTimeout(() => setCursorTap(true), 5500);
      setTimeout(() => {
        let p = 0;
        const iv = setInterval(() => { p += 16; setGetRingProgress(Math.min(p / 800, 1)); if (p >= 800) clearInterval(iv); }, 16);
      }, 5800);
      setTimeout(() => setStep(3), 7500);
      setTimeout(() => {
        let deg = 0;
        const iv = setInterval(() => { deg += 5.6; setInstallRing(Math.min(deg, 360)); if (deg >= 360) { clearInterval(iv); setShowCheck(true); } }, 16);
      }, 7800);
      setTimeout(() => setStep(4), 10500);
      setTimeout(() => setStep(5), 16000);
    };

    run();
    const interval = setInterval(run, CYCLE_DURATION);
    const pInterval = setInterval(() => {
      setProgress(Math.min((Date.now() - startRef.current) / CYCLE_DURATION, 1));
    }, 30);
    return () => { clearInterval(interval); clearInterval(pInterval); };
  }, []);

  const terminalLines = [
    { text: "KomisiSDK.resolve()", color: "#FFFFFF" },
    { text: "> Checking fingerprint...", color: "#6A737D" },
    { text: "> ✔ Match found", color: "#4ADE80" },
    { text: "> Confidence score: 0.94", color: "#64B5F6" },
    { text: "> ✔ Attributed to @sarah_creates", color: "#4ADE80" },
  ];
  const visibleLineCount = useFadingLines(terminalLines, step === 4, 600);

  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#0C1C28", borderRadius: "16px", height: "380px" }}
    >
      <AnimatePresence mode="wait">
        {/* ── STEP 1: Creator shares link ── */}
        {step === 1 && (
          <motion.div key="s1" {...fade} transition={{ duration: fadeIn.duration, ease: fadeIn.ease }}
            className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-[260px] p-5 shadow-xl" style={{ backgroundColor: "#FFFFFF", borderRadius: "16px" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-black flex items-center justify-center" style={{ borderRadius: "50%" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.8.1V9.01a6.27 6.27 0 0 0-.8-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.77 1.52V6.96a4.85 4.85 0 0 1-1.01-.27z" />
                  </svg>
                </div>
                <span className="text-sm" style={{ color: "#0C1C28", fontWeight: 400 }}>@sarah_creates</span>
              </div>
              <p className="text-xs mb-4" style={{ color: "#6B7280" }}>
                ▶ "Best productivity app 🔥 link in bio"
              </p>
              <div className="flex items-center gap-1 text-xs" style={{ color: "#3B82F6" }}>
                <span>tap link ↗</span>
                <motion.span
                  animate={cursorTap ? { scale: [1, 0.7, 1] } : {}}
                  transition={{ duration: 0.2 }}
                  className="text-base"
                >👆</motion.span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: App Store ── */}
        {step === 2 && (
          <motion.div key="s2" {...fade} transition={{ duration: fadeIn.duration, ease: fadeIn.ease }}
            className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-[260px] p-5 shadow-xl" style={{ backgroundColor: "#FFFFFF", borderRadius: "16px" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12" style={{ borderRadius: "12px", background: "linear-gradient(135deg, #0C1C28, #1E3A5F)" }} />
                <div>
                  <p className="text-sm" style={{ color: "#0C1C28", fontWeight: 400 }}>FocusTimer</p>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]" style={{ color: "#F59E0B" }}>★★★★★</span>
                    <span className="text-[10px]" style={{ color: "#9CA3AF" }}>4.8 (2.4k)</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] mb-4" style={{ color: "#9CA3AF" }}>Productivity · Free</p>
              <div className="relative">
                <motion.button
                  className="w-full py-2 text-xs text-white text-center"
                  style={{ backgroundColor: "#007AFF", borderRadius: "20px", fontWeight: 400 }}
                  animate={cursorTap ? { scale: [1, 0.95, 1] } : {}}
                  transition={{ duration: 0.15 }}
                >GET</motion.button>
                {getRingProgress > 0 && (
                  <div className="mt-2 w-full h-1 overflow-hidden" style={{ backgroundColor: "rgba(0,122,255,0.15)", borderRadius: "2px" }}>
                    <div className="h-full" style={{ backgroundColor: "#007AFF", borderRadius: "2px", width: `${getRingProgress * 100}%`, transition: "width 16ms linear" }} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Install complete ── */}
        {step === 3 && (
          <motion.div key="s3" {...fade} transition={{ duration: fadeIn.duration, ease: fadeIn.ease }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle cx="32" cy="32" r="28" fill="none" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={`${(installRing / 360) * 175.9} 175.9`}
                  transform="rotate(-90 32 32)"
                  style={{ transition: "stroke-dasharray 16ms linear" }} />
              </svg>
              {showCheck && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute inset-0 flex items-center justify-center text-2xl"
                  style={{ color: "#4ADE80" }}>✓</motion.div>
              )}
            </div>
            <p className="text-sm text-white">Install complete</p>
          </motion.div>
        )}

        {/* ── STEP 4: SDK fires ── */}
        {step === 4 && (
          <motion.div key="s4" {...fade} transition={{ duration: fadeIn.duration, ease: fadeIn.ease }}
            className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full max-w-[340px] p-5 font-mono text-[12px] leading-relaxed"
              style={{ backgroundColor: "#0D1117", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-1.5 mb-4">
                <span className="w-2.5 h-2.5" style={{ backgroundColor: "#FF5F57", borderRadius: "50%" }} />
                <span className="w-2.5 h-2.5" style={{ backgroundColor: "#FEBC2E", borderRadius: "50%" }} />
                <span className="w-2.5 h-2.5" style={{ backgroundColor: "#28C840", borderRadius: "50%" }} />
              </div>
              <div className="space-y-1">
                {terminalLines.slice(0, visibleLineCount).map((line, i) => (
                  <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ color: line.color }}>{line.text}</motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 5: Commission queued ── */}
        {step === 5 && (
          <motion.div key="s5" {...fade} transition={{ duration: fadeIn.duration, ease: fadeIn.ease }}
            className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-[280px] p-6 shadow-xl" style={{ backgroundColor: "#FFFFFF", borderRadius: "16px" }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">💰</span>
                <span className="text-sm" style={{ color: "#0C1C28", fontWeight: 400 }}>Commission Queued</span>
                <span className="relative flex h-2 w-2 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full opacity-75" style={{ backgroundColor: "#4ADE80", borderRadius: "50%" }} />
                  <span className="relative inline-flex h-2 w-2" style={{ backgroundColor: "#4ADE80", borderRadius: "50%" }} />
                </span>
              </div>
              <p className="text-xs mb-1" style={{ color: "#6B7280" }}>@sarah_creates</p>
              <p className="text-2xl mb-1" style={{ color: "#0C1C28", fontWeight: 400 }}>$3.00</p>
              <p className="text-[11px] mb-1" style={{ color: "#9CA3AF" }}>Install commission</p>
              <p className="text-[11px] mb-4" style={{ color: "#9CA3AF" }}>Payout: Mar 15</p>
              <span className="text-[10px] px-2 py-0.5" style={{ color: "#4ADE80", backgroundColor: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                ● Queued
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
        <div className="h-full" style={{ backgroundColor: "#4ADE80", width: `${progress * 100}%`, transition: "width 30ms linear" }} />
      </div>
    </div>
  );
};

export default AttributionFlowAnimation;
