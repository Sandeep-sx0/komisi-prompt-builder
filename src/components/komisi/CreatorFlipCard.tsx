import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Loader2 } from "lucide-react";

type CardState = "default" | "reviewing" | "approved";

const LINK_TEXT = "komisi.io/r/abc123";

export const CreatorFlipCard: React.FC = () => {
  const [state, setState] = useState<CardState>("default");
  const [typedChars, setTypedChars] = useState(0);
  const [showTracking, setShowTracking] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (state === "default") {
      setTypedChars(0);
      setShowTracking(false);
      timer = setTimeout(() => mountedRef.current && setState("reviewing"), 2000);
    } else if (state === "reviewing") {
      timer = setTimeout(() => mountedRef.current && setState("approved"), 1500);
    } else if (state === "approved") {
      timer = setTimeout(() => mountedRef.current && setState("default"), 4000);
    }
    return () => clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    if (state !== "approved") return;
    if (typedChars >= LINK_TEXT.length) {
      const t = setTimeout(() => mountedRef.current && setShowTracking(true), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => mountedRef.current && setTypedChars((p) => p + 1), 45);
    return () => clearTimeout(t);
  }, [state, typedChars]);

  return (
    <div className="w-full max-w-[220px]">
      <div className="border border-border bg-background rounded-lg p-4">
        {/* Profile */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-text-secondary">
            JL
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">@creator</div>
            <div className="text-[10px] text-text-tertiary">12.4K followers</div>
          </div>
        </div>

        {/* Animated bottom area */}
        <AnimatePresence mode="wait">
          {state === "default" && (
            <motion.div
              key="apply"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setState("reviewing")}
                className="w-full bg-foreground text-primary-foreground text-xs font-medium text-center py-2 rounded-md cursor-pointer"
              >
                Apply
              </button>
            </motion.div>
          )}

          {state === "reviewing" && (
            <motion.div
              key="reviewing"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full bg-muted text-text-secondary text-xs font-medium text-center py-2 rounded-md flex items-center justify-center gap-2">
                <Loader2 size={12} className="animate-spin" />
                Reviewing…
              </div>
            </motion.div>
          )}

          {state === "approved" && (
            <motion.div
              key="approved"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden space-y-2"
            >
              <div className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" />
                <span className="text-xs font-medium text-emerald-500">Approved</span>
              </div>
              <div className="bg-muted rounded px-2 py-1.5">
                <span className="text-xs font-mono text-foreground">
                  {LINK_TEXT.slice(0, typedChars)}
                </span>
                <span className="inline-block w-[5px] h-3 bg-foreground/40 align-middle animate-pulse ml-px" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showTracking ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="text-[10px] text-text-tertiary text-center"
              >
                Tracking active
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
