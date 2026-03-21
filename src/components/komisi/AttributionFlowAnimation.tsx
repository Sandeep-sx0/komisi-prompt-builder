import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const CYCLE_DURATION = 7000;

/* ── Typing text hook ── */
const useTypingText = (lines: { text: string; color: string }[], active: boolean, charDelay = 40) => {
  const [displayed, setDisplayed] = useState<{ text: string; color: string }[]>([]);

  useEffect(() => {
    if (!active) {
      setDisplayed([]);
      return;
    }

    let cancelled = false;
    const allChars: { lineIdx: number; charIdx: number }[] = [];
    lines.forEach((line, li) => {
      for (let ci = 0; ci < line.text.length; ci++) {
        allChars.push({ lineIdx: li, charIdx: ci });
      }
    });

    let i = 0;
    const built: string[] = lines.map(() => "");

    const tick = () => {
      if (cancelled || i >= allChars.length) return;
      const { lineIdx, charIdx } = allChars[i];
      built[lineIdx] = lines[lineIdx].text.slice(0, charIdx + 1);
      setDisplayed(built.map((t, idx) => ({ text: t, color: lines[idx].color })));
      i++;
      setTimeout(tick, charDelay);
    };
    tick();

    return () => { cancelled = true; };
  }, [active]);

  return displayed;
};

const AttributionFlowAnimation = () => {
  const [step, setStep] = useState(0); // 0-5 (0=idle gap)
  const [progress, setProgress] = useState(0);
  const [cursorTap, setCursorTap] = useState(false);
  const [getRingProgress, setGetRingProgress] = useState(0);
  const [installRing, setInstallRing] = useState(0);
  const [showCheck, setShowCheck] = useState(false);
  const startRef = useRef(Date.now());

  // Main cycle
  useEffect(() => {
    const run = () => {
      startRef.current = Date.now();
      setStep(0);
      setProgress(0);
      setCursorTap(false);
      setGetRingProgress(0);
      setInstallRing(0);
      setShowCheck(false);

      // Step timings
      setTimeout(() => setStep(1), 100);        // Creator shares link
      setTimeout(() => setCursorTap(true), 1200);
      setTimeout(() => setStep(2), 1500);        // App Store
      setTimeout(() => setCursorTap(false), 1600);
      setTimeout(() => setCursorTap(true), 2200);
      setTimeout(() => {
        // Download progress
        let p = 0;
        const iv = setInterval(() => {
          p += 16;
          setGetRingProgress(Math.min(p / 600, 1));
          if (p >= 600) clearInterval(iv);
        }, 16);
      }, 2300);
      setTimeout(() => setStep(3), 3000);        // Install complete
      setTimeout(() => {
        let deg = 0;
        const iv = setInterval(() => {
          deg += 6;
          setInstallRing(Math.min(deg, 360));
          if (deg >= 360) {
            clearInterval(iv);
            setShowCheck(true);
          }
        }, 16);
      }, 3100);
      setTimeout(() => setStep(4), 4000);        // SDK fires
      setTimeout(() => setStep(5), 5500);        // Commission queued
    };

    run();
    const interval = setInterval(run, CYCLE_DURATION);

    // Progress bar
    const pInterval = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      setProgress(Math.min(elapsed / CYCLE_DURATION, 1));
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(pInterval);
    };
  }, []);

  // SDK terminal lines
  const terminalLines = [
    { text: "KomisiSDK.resolve()", color: "#FFFFFF" },
    { text: "> Checking fingerprint...", color: "#6A737D" },
    { text: "> ✔ Match found", color: "#4ADE80" },
    { text: "> Confidence score: 0.94", color: "#64B5F6" },
    { text: "> ✔ Attributed to @sarah_creates", color: "#4ADE80" },
  ];
  const typedLines = useTypingText(terminalLines, step === 4, 35);

  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#0C1C28", borderRadius: "16px", height: "380px" }}
    >
      <AnimatePresence mode="wait">
        {/* ── STEP 1: Creator shares link ── */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            <div
              className="w-[260px] p-5 shadow-xl relative"
              style={{ backgroundColor: "#FFFFFF", borderRadius: "16px" }}
            >
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
                  animate={cursorTap ? { scale: [1, 0.7, 1], x: [0, -2, 0] } : {}}
                  transition={{ duration: 0.2 }}
                  className="text-base"
                >
                  👆
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 2: App Store ── */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            <div
              className="w-[260px] p-5 shadow-xl"
              style={{ backgroundColor: "#FFFFFF", borderRadius: "16px" }}
            >
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
                >
                  GET
                </motion.button>
                {getRingProgress > 0 && (
                  <div className="mt-2 w-full h-1 overflow-hidden" style={{ backgroundColor: "rgba(0,122,255,0.15)", borderRadius: "2px" }}>
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: "#007AFF", borderRadius: "2px", width: `${getRingProgress * 100}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 3: Install complete ── */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          >
            <div className="relative w-16 h-16">
              {/* Background circle */}
              <svg className="w-16 h-16" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle
                  cx="32" cy="32" r="28"
                  fill="none"
                  stroke="#4ADE80"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${(installRing / 360) * 175.9} 175.9`}
                  transform="rotate(-90 32 32)"
                  style={{ transition: "stroke-dasharray 16ms linear" }}
                />
              </svg>
              {showCheck && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute inset-0 flex items-center justify-center text-2xl"
                  style={{ color: "#4ADE80" }}
                >
                  ✓
                </motion.div>
              )}
            </div>
            <p className="text-sm text-white">Install complete</p>
          </motion.div>
        )}

        {/* ── STEP 4: SDK fires ── */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-x-4 bottom-6 top-6 flex items-center justify-center"
          >
            <div
              className="w-full max-w-[340px] p-5 font-mono text-[12px] leading-relaxed"
              style={{ backgroundColor: "#0D1117", borderRadius: "12px 12px 0 0", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-1.5 mb-4">
                <span className="w-2.5 h-2.5" style={{ backgroundColor: "#FF5F57", borderRadius: "50%" }} />
                <span className="w-2.5 h-2.5" style={{ backgroundColor: "#FEBC2E", borderRadius: "50%" }} />
                <span className="w-2.5 h-2.5" style={{ backgroundColor: "#28C840", borderRadius: "50%" }} />
              </div>
              <div className="space-y-1">
                {typedLines.map((line, i) => (
                  <p key={i} style={{ color: line.color }}>{line.text}</p>
                ))}
                {typedLines.length < terminalLines.length && (
                  <span className="animate-pulse" style={{ color: "#6A737D" }}>▌</span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── STEP 5: Commission queued ── */}
        {step === 5 && (
          <motion.div
            key="step5"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            <div
              className="w-[280px] p-6 shadow-xl"
              style={{ backgroundColor: "#FFFFFF", borderRadius: "16px" }}
            >
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
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5" style={{ color: "#4ADE80", backgroundColor: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)" }}>
                  ● Queued
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
        <div
          className="h-full"
          style={{
            backgroundColor: "#4ADE80",
            width: `${progress * 100}%`,
            transition: "width 30ms linear",
          }}
        />
      </div>
    </div>
  );
};

export default AttributionFlowAnimation;
