import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy } from "lucide-react";

export const CreatorFlipCard: React.FC = () => {
  const [flipped, setFlipped] = useState(false);

  const flip = useCallback(() => setFlipped(true), []);

  // Auto-play loop
  useEffect(() => {
    if (flipped) {
      const t = setTimeout(() => setFlipped(false), 2500);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setFlipped(true), 3500);
      return () => clearTimeout(t);
    }
  }, [flipped]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-[220px] relative" style={{ perspective: "600px" }}>
        <AnimatePresence mode="wait">
          {!flipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="border border-border bg-background rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-text-secondary">
                  JL
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">@creator</div>
                  <div className="text-[10px] text-text-tertiary">12.4K followers</div>
                </div>
              </div>
              <button
                onClick={flip}
                className="w-full bg-foreground text-primary-foreground text-xs font-medium text-center py-2 rounded-md hover:opacity-90 transition-opacity cursor-pointer"
              >
                Apply
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="border border-border bg-background rounded-lg p-4"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <Check size={14} className="text-emerald-500" />
                <span className="text-xs font-medium text-emerald-500">Approved</span>
              </div>
              <div className="text-[10px] text-text-tertiary mb-1">Link Generated</div>
              <div className="flex items-center gap-2 bg-muted rounded px-2 py-1.5 mb-3">
                <span className="text-xs font-mono text-foreground truncate flex-1">komisi.io/r/abc123</span>
                <Copy size={12} className="text-text-tertiary shrink-0" />
              </div>
              <div className="text-[10px] text-text-tertiary text-center">Tracking active</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
