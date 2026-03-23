import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const CYCLE = 20000;

const rows = [
  { ip: "203.45.1.x", time: "14:01" },
  { ip: "178.22.8.x", time: "14:02" },
  { ip: "91.134.5.x", time: "14:03" },
  { ip: "192.168.1.x", time: "14:04" },
  { ip: "192.168.1.x", time: "14:05" },
];

const FraudDetectionAnimation = () => {
  const [visibleRows, setVisibleRows] = useState(0);
  const [flaggedRows, setFlaggedRows] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanHighlight, setScanHighlight] = useState(false);
  const [anomalyDetected, setAnomalyDetected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertPulse, setAlertPulse] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const run = () => {
      startRef.current = Date.now();
      setVisibleRows(0); setFlaggedRows(false); setScanning(false);
      setScanHighlight(false); setAnomalyDetected(false); setShowAlert(false);
      setAlertPulse(false); setProgress(0);

      for (let i = 0; i < 5; i++) {
        setTimeout(() => setVisibleRows(i + 1), i * 1000 + 400);
      }
      setTimeout(() => setScanHighlight(true), 6000);
      setTimeout(() => setFlaggedRows(true), 7500);
      setTimeout(() => setScanning(true), 8000);
      setTimeout(() => { setScanning(false); setAnomalyDetected(true); }, 10000);
      setTimeout(() => { setAnomalyDetected(false); setShowAlert(true); setAlertPulse(true); }, 12000);
      setTimeout(() => setAlertPulse(false), 13000);
      setTimeout(() => {
        setShowAlert(false); setVisibleRows(0); setFlaggedRows(false); setScanHighlight(false);
      }, 17000);
    };

    run();
    const interval = setInterval(run, CYCLE);
    const pInterval = setInterval(() => {
      setProgress(Math.min((Date.now() - startRef.current) / CYCLE, 1));
    }, 30);
    return () => { clearInterval(interval); clearInterval(pInterval); };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#111111", borderRadius: "16px", height: "380px" }}
    >
      <AnimatePresence>
        {visibleRows > 0 && (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center p-6"
          >
            <div
              className="w-full max-w-[360px] overflow-hidden"
              style={{ backgroundColor: "#000000", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-sm text-white" style={{ fontWeight: 400 }}>Live Install Feed</span>
                <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "#4ADE80" }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full opacity-75" style={{ backgroundColor: "#4ADE80", borderRadius: "50%" }} />
                    <span className="relative inline-flex h-2 w-2" style={{ backgroundColor: "#4ADE80", borderRadius: "50%" }} />
                  </span>
                  Live
                </span>
              </div>

              <div className="grid grid-cols-3 px-4 py-2 text-[10px] uppercase tracking-wider" style={{ color: "#6B7280", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <span>IP Address</span>
                <span>Time</span>
                <span className="text-right">Status</span>
              </div>

              <div>
                {rows.map((row, i) => {
                  const isFlagged = flaggedRows && i >= 3;
                  const isHighlighted = scanHighlight && i >= 3;
                  return (
                    <AnimatePresence key={i}>
                      {i < visibleRows && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="grid grid-cols-3 px-4 py-2.5 font-mono text-[11px]"
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                            backgroundColor: isHighlighted ? "rgba(245, 158, 11, 0.08)" : "transparent",
                            transition: "background-color 800ms ease-in-out",
                          }}
                        >
                          <span className="text-white/80">{row.ip}</span>
                          <span style={{ color: "#6B7280" }}>{row.time}</span>
                          <span className="text-right">
                            <AnimatePresence mode="wait">
                              {isFlagged ? (
                                <motion.span key="flagged" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} style={{ color: "#F59E0B" }}>
                                  ⚠ flagged
                                </motion.span>
                              ) : (
                                <motion.span key="clean" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} style={{ color: "#4ADE80" }}>
                                  ✔ clean
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {scanning && (
                  <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="px-4 py-3 flex items-center gap-2 text-xs"
                    style={{ color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block">◌</motion.span>
                    AI scoring pattern... 47 installs · Same IP range
                  </motion.div>
                )}
                {anomalyDetected && (
                  <motion.div key="anomaly" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="px-4 py-3 flex items-center gap-2 text-xs"
                    style={{ color: "#F59E0B", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    ⚠ Anomaly detected — confidence 94%
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAlert && (
          <motion.div key="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(30, 10, 60, 0.85)" }}>
            <div className="w-full max-w-[340px] shadow-2xl" style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", overflow: "hidden" }}>
              <div className="p-5"
                style={{
                  borderLeft: `4px solid #F59E0B`,
                  animation: alertPulse ? "alertPulse 1s ease-in-out" : "none",
                }}>
                <div className="flex items-center gap-2 mb-5">
                  <span style={{ color: "#F59E0B" }}>⚠</span>
                  <span className="text-sm" style={{ color: "#111827", fontWeight: 400 }}>Fraud Alert Detected</span>
                </div>
                <div className="space-y-3 mb-5">
                  {[
                    { label: "Installs", value: "47" },
                    { label: "Pattern", value: "Same IP range" },
                    { label: "Timeframe", value: "2 hours" },
                  ].map((d) => (
                    <div key={d.label} className="flex justify-between text-xs">
                      <span style={{ color: "#6B7280" }}>{d.label}</span>
                      <span style={{ color: "#111827" }}>{d.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 py-2 text-xs text-center" style={{ color: "#111827", border: "1px solid #E5E7EB", borderRadius: "8px" }}>Review Details</div>
                  <div className="flex-1 py-2 text-xs text-center" style={{ color: "#6B7280" }}>Dismiss</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
        <div className="h-full" style={{ backgroundColor: "#F59E0B", width: `${progress * 100}%`, transition: "width 30ms linear" }} />
      </div>

      <style>{`
        @keyframes alertPulse {
          0% { border-left-color: #F59E0B; }
          40% { border-left-color: rgba(245, 158, 11, 0.4); }
          100% { border-left-color: #F59E0B; }
        }
      `}</style>
    </div>
  );
};

export default FraudDetectionAnimation;
