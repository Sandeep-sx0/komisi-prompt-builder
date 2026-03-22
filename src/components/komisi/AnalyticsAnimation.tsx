import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";

const CYCLE = 20000;

const columns = ["Creator", "Platform", "Installs", "Revenue", "Commission"];

const platformLogos: Record<string, string> = {
  TikTok: "https://img.logo.dev/tiktok.com?token=pk_UqhvkqwoTO2Dv0eZ3bWXoA&format=webp&size=128",
  YouTube: "https://img.logo.dev/youtube.com?token=pk_UqhvkqwoTO2Dv0eZ3bWXoA&format=webp&size=128",
  Instagram: "https://img.logo.dev/instagram.com?token=pk_UqhvkqwoTO2Dv0eZ3bWXoA&format=webp&size=128",
};

const dataRows = [
  { creator: "@sarah_creates", platform: "TikTok", installs: 234, revenue: 2100, commission: 630 },
  { creator: "@techreview", platform: "YouTube", installs: 89, revenue: 445, commission: 89 },
  { creator: "@dailyapps", platform: "Instagram", installs: 56, revenue: 340, commission: 85 },
];

const lateRow = { creator: "@fitnessapp", platform: "Instagram", installs: 12, revenue: 89, commission: 22 };

const AnalyticsAnimation = () => {
  const [showCard, setShowCard] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [visibleCols, setVisibleCols] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);
  const [rowCounters, setRowCounters] = useState<boolean[]>([false, false, false, false]);
  const [spotlight, setSpotlight] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showRow4, setShowRow4] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const run = () => {
      startRef.current = Date.now();
      setShowCard(false); setShowHeaders(false); setVisibleCols(0);
      setVisibleRows(0); setRowCounters([false, false, false, false]);
      setSpotlight(false); setShowTooltip(false); setShowBadge(false);
      setShowRow4(false); setIsLive(false); setProgress(0);

      setTimeout(() => setShowCard(true), 300);
      setTimeout(() => setShowHeaders(true), 800);
      for (let i = 0; i < 5; i++) {
        setTimeout(() => setVisibleCols(i + 1), 1200 + i * 300);
      }
      setTimeout(() => { setVisibleRows(1); setRowCounters(p => { const n = [...p]; n[0] = true; return n; }); }, 2000);
      setTimeout(() => { setVisibleRows(2); setRowCounters(p => { const n = [...p]; n[1] = true; return n; }); }, 3500);
      setTimeout(() => { setVisibleRows(3); setRowCounters(p => { const n = [...p]; n[2] = true; return n; }); }, 5000);
      setTimeout(() => setSpotlight(true), 8000);
      setTimeout(() => setShowBadge(true), 8500);
      setTimeout(() => setShowTooltip(true), 9000);
      setTimeout(() => setShowTooltip(false), 13000);
      setTimeout(() => { setShowRow4(true); setRowCounters(p => { const n = [...p]; n[3] = true; return n; }); }, 14000);
      setTimeout(() => setIsLive(true), 14500);
      setTimeout(() => {
        setShowCard(false); setSpotlight(false); setShowBadge(false);
        setShowRow4(false); setIsLive(false);
      }, 18000);
    };

    run();
    const interval = setInterval(run, CYCLE);
    const pInterval = setInterval(() => {
      setProgress(Math.min((Date.now() - startRef.current) / CYCLE, 1));
    }, 30);
    return () => { clearInterval(interval); clearInterval(pInterval); };
  }, []);

  const allRows = [...dataRows, ...(showRow4 ? [lateRow] : [])];

  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#111827", borderRadius: "16px", height: "380px" }}
    >
      <AnimatePresence>
        {showCard && (
          <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }} className="absolute inset-0 flex items-center justify-center p-5">
            <div className="w-full max-w-[380px] overflow-hidden" style={{ backgroundColor: "#FFFFFF", borderRadius: "12px" }}>
              <AnimatePresence>
                {showHeaders && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                    <div className="flex items-center justify-between px-5 pt-5 pb-3">
                      <span className="text-sm" style={{ color: "#111827", fontWeight: 400 }}>Creator Performance</span>
                      <span className="text-[10px] px-2 py-1 flex items-center gap-1.5" style={{ color: "#6B7280", border: "1px solid #E5E7EB", borderRadius: "6px" }}>
                        <AnimatePresence mode="wait">
                          {isLive ? (
                            <motion.span key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
                              Live
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full opacity-75" style={{ backgroundColor: "#4ADE80", borderRadius: "50%" }} />
                                <span className="relative inline-flex h-1.5 w-1.5" style={{ backgroundColor: "#4ADE80", borderRadius: "50%" }} />
                              </span>
                            </motion.span>
                          ) : (
                            <motion.span key="30d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Last 30 days ▾</motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </div>
                    <div className="h-px mx-5" style={{ backgroundColor: "#E5E7EB" }} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="px-5 py-2.5 text-[9px] uppercase tracking-wider" style={{ color: "#9CA3AF", display: "grid", gridTemplateColumns: "minmax(160px, 1fr) minmax(120px, 1fr) 1fr 1fr 1fr" }}>
                {columns.map((col, i) => (
                  <AnimatePresence key={col}>
                    {i < visibleCols && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                        className={i >= 2 ? "text-right" : ""}>{col}</motion.span>
                    )}
                  </AnimatePresence>
                ))}
              </div>

              <div>
                {allRows.map((row, i) => {
                  const isVisible = i < 3 ? i < visibleRows : showRow4;
                  const isSpotlit = spotlight && i === 0;
                  return (
                    <AnimatePresence key={row.creator}>
                      {isVisible && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="px-5 py-2.5 text-[11px] items-center"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "minmax(160px, 1fr) minmax(120px, 1fr) 1fr 1fr 1fr",
                            borderTop: "1px solid #F3F4F6",
                            backgroundColor: isSpotlit ? "rgba(8,145,178,0.06)" : "transparent",
                            transition: "background-color 800ms ease-in-out",
                          }}>
                          <span className="flex items-center gap-1 min-w-0" style={{ color: "#111827" }}>
                            <span className="truncate">{row.creator}</span>
                            <AnimatePresence>
                              {isSpotlit && showBadge && (
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                  transition={{ duration: 0.5 }} className="text-[8px] px-1.5 py-0.5 whitespace-nowrap flex-shrink-0"
                                  style={{ backgroundColor: "#0891B2", color: "#FFFFFF", borderRadius: "4px" }}>🏆 Top</motion.span>
                              )}
                            </AnimatePresence>
                          </span>
                          <span className="flex items-center">
                            <img src={platformLogos[row.platform]} alt={row.platform} width={24} height={24} style={{ borderRadius: "6px", objectFit: "cover" }} />
                          </span>
                          <span className="text-right" style={{ color: "#111827" }}>
                            {rowCounters[i] ? <CountingNumber number={row.installs} decimalPlaces={0} inView transition={{ stiffness: 80, damping: 20 }} /> : "0"}
                          </span>
                          <span className="text-right" style={{ color: "#111827" }}>
                            {rowCounters[i] ? <CountingNumber number={row.revenue} prefix="$" decimalPlaces={0} inView transition={{ stiffness: 80, damping: 20 }} /> : "$0"}
                          </span>
                          <span className="text-right" style={{ color: "#111827" }}>
                            {rowCounters[i] ? <CountingNumber number={row.commission} prefix="$" decimalPlaces={0} inView transition={{ stiffness: 80, damping: 20 }} /> : "$0"}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  );
                })}
              </div>
            </div>

            <AnimatePresence>
              {showTooltip && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-3 text-xs text-white max-w-[260px] text-center"
                  style={{ backgroundColor: "#111827", borderRadius: "8px", border: "1px solid rgba(8,145,178,0.2)" }}>
                  ✦ @sarah_creates drove 62% of total revenue this month
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
        <div className="h-full" style={{ backgroundColor: "#3B82F6", width: `${progress * 100}%`, transition: "width 30ms linear" }} />
      </div>
    </div>
  );
};

export default AnalyticsAnimation;
