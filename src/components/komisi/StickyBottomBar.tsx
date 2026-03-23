import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export const StickyBottomBar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{
            height: 64,
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center justify-between max-w-[1200px] mx-auto px-6 h-full">
            <span className="hidden md:block text-[13px] font-normal" style={{ color: "rgba(0,0,0,0.45)" }}>
              Free for your first 5 affiliates.
            </span>
            <span className="hidden md:block text-[14px] font-medium text-foreground">
              Start your affiliate program today.
            </span>
            <div className="flex items-center justify-center w-full md:w-auto gap-4">
              <a
                href="/signup"
                className="bg-foreground text-background px-5 py-2.5 text-[13px] font-medium inline-flex items-center gap-1 hover:opacity-90 transition-opacity"
              >
                Get Started Free →
              </a>
              <a
                href="#"
                className="hidden md:inline text-[13px] transition-colors"
                style={{ color: "rgba(0,0,0,0.45)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#000")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(0,0,0,0.45)")}
              >
                Book a Demo
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
