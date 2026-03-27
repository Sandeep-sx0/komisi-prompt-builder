import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";

const CYCLE = 22000;

const creators = [
  { name: "Emma Davis", avatar: "/avatars/user-1.jpg", amount: 124.50 },
  { name: "James Lee", avatar: "/avatars/user-2.jpg", amount: 89.20 },
  { name: "Sofia Martinez", avatar: "/avatars/user-3.jpg", amount: 156.80 },
  { name: "Alex Rivera", avatar: "/avatars/user-4.jpg", amount: 97.50 },
];

const PayoutsAnimation = () => {
  const [showCard, setShowCard] = useState(false);
  const [showRows, setShowRows] = useState(false);
  const [paidRows, setPaidRows] = useState<boolean[]>([false, false, false, false]);
  const [processing, setProcessing] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [remaining, setRemaining] = useState(468.00);
  const [successWash, setSuccessWash] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const t = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
      return id;
    };

    const run = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      startRef.current = Date.now();
      setShowCard(false); setShowRows(false);
      setPaidRows([false, false, false, false]);
      setProcessing(false); setAllDone(false);
      setRemaining(468.00); setSuccessWash(false);
      setProgress(0);

      t(() => setShowCard(true), 300);
      t(() => setShowRows(true), 1500);
      t(() => setProcessing(true), 3000);

      const amounts = [124.50, 89.20, 156.80, 97.50];
      const payTimes = [4000, 6500, 9000, 11500];
      let runningTotal = 468.00;

      payTimes.forEach((pt, i) => {
        t(() => {
          setPaidRows(prev => { const n = [...prev]; n[i] = true; return n; });
          runningTotal -= amounts[i];
          const newTotal = Math.max(0, Math.round(runningTotal * 100) / 100);
          setRemaining(newTotal);
        }, pt);
      });

      t(() => { setProcessing(false); setAllDone(true); }, 14000);
      t(() => setSuccessWash(true), 14200);
      t(() => setSuccessWash(false), 15200);
      t(() => {
        setAllDone(false);
        setPaidRows([false, false, false, false]);
        setRemaining(468.00);
      }, 19000);
      t(() => { setShowCard(false); setShowRows(false); }, 20500);
    };

    run();
    const interval = setInterval(run, CYCLE);
    const pInterval = setInterval(() => {
      setProgress(Math.min((Date.now() - startRef.current) / CYCLE, 1));
    }, 30);

    return () => {
      timersRef.current.forEach(clearTimeout);
      clearInterval(interval);
      clearInterval(pInterval);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#111111", borderRadius: "16px", height: "380px" }}
    >
      <AnimatePresence>
        {showCard && (
          <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }} className="absolute inset-0 flex flex-col items-center justify-center p-5">
            <AnimatePresence mode="wait">
              {processing && (
                <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }} className="text-xs flex items-center gap-2 mb-3" style={{ color: "#9CA3AF" }}>
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block">◌</motion.span>
                  Komisi processing payouts automatically...
                </motion.div>
              )}
              {allDone && (
                <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }} className="text-xs flex items-center gap-2 mb-3" style={{ color: "#4ADE80" }}>
                  ✔ All payouts processed · $468.00 sent
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full max-w-[360px] overflow-hidden"
              style={{
                backgroundColor: "#FFFFFF", borderRadius: "12px",
                boxShadow: successWash ? "0 0 0 2px rgba(74,222,128,0.2), inset 0 0 40px rgba(74,222,128,0.04)" : "none",
                transition: "box-shadow 800ms ease-in-out",
              }}>
              <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: "1px solid #F3F4F6" }}>
                <span className="text-sm" style={{ color: "#111111", fontWeight: 400 }}>Upcoming Payouts</span>
                <span className="text-[10px]" style={{ color: "#9CA3AF" }}>Mar 15</span>
              </div>

              <AnimatePresence>
                {showRows && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                    {creators.map((creator, i) => (
                      <div key={creator.name} className="flex items-center justify-between px-5 py-3"
                        style={{
                          borderBottom: "1px solid #F3F4F6",
                          backgroundColor: paidRows[i] ? "rgba(74,222,128,0.04)" : "transparent",
                          transition: "background-color 600ms ease-in-out",
                        }}>
                        <div className="flex items-center gap-3">
                          <img src={creator.avatar} alt={creator.name} className="w-7 h-7 object-cover" style={{ borderRadius: "50%" }} loading="lazy" />
                          <span className="text-xs" style={{ color: "#111111" }}>{creator.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs" style={{ color: "#111111" }}>${creator.amount.toFixed(2)}</span>
                          <AnimatePresence mode="wait">
                            {paidRows[i] ? (
                              <motion.span key="paid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }} className="text-[10px] px-2 py-0.5"
                                style={{ backgroundColor: "#4ADE80", color: "#FFFFFF", borderRadius: "4px" }}>Paid ✔</motion.span>
                            ) : (
                              <motion.span key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }} className="text-[10px] px-2 py-0.5"
                                style={{ color: "#9CA3AF", border: "1px solid #E5E7EB", borderRadius: "4px" }}>Pending</motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between px-5 py-3">
                <span className="text-xs" style={{ color: "#111111", fontWeight: 400 }}>
                  Total: $<CountingNumber key={remaining} number={remaining} decimalPlaces={2} inView transition={{ stiffness: 80, damping: 25 }} />
                </span>
                <AnimatePresence mode="wait">
                  {allDone ? (
                    <motion.span key="completed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
                      className="text-[10px] px-3 py-1.5" style={{ color: "#4ADE80", backgroundColor: "rgba(74,222,128,0.1)", borderRadius: "6px" }}>Completed</motion.span>
                  ) : (
                    <motion.span key="process" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }} className="text-[10px] px-3 py-1.5"
                      style={{ backgroundColor: "#000000", color: "#FFFFFF", borderRadius: "6px" }}>Process All Payouts</motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
        <div className="h-full" style={{ backgroundColor: "#4ADE80", width: `${progress * 100}%`, transition: "width 30ms linear" }} />
      </div>
    </div>
  );
};

export default PayoutsAnimation;
