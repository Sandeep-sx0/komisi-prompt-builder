import React, { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "motion/react";

const LogoNode = ({
  src,
  bg,
  glowControls,
}: {
  src: string;
  bg: string;
  glowControls?: ReturnType<typeof useAnimationControls>;
}) => (
  <motion.div
    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative z-10"
    style={{ background: bg }}
    animate={glowControls}
  >
    <img src={src} alt="" className="w-7 h-7 object-contain" />
  </motion.div>
);

export const DataFlowAnimation: React.FC = () => {
  const komisiGlow = useAnimationControls();
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

    // Use raw CSS animations via refs for reliable dot movement
    const run = async () => {
      while (mountedRef.current) {
        const leftEl = leftRef.current;
        const rightEl = rightRef.current;
        if (!leftEl || !rightEl) {
          await wait(100);
          continue;
        }

        // Reset dots to starting positions
        leftEl.style.transition = "none";
        leftEl.style.left = "0px";
        leftEl.style.opacity = "1";
        rightEl.style.transition = "none";
        rightEl.style.right = "0px";
        rightEl.style.opacity = "1";

        // Force reflow
        leftEl.offsetHeight;

        // Animate dots inward
        leftEl.style.transition = "left 1.4s linear, opacity 0.2s ease";
        leftEl.style.left = "calc(100% - 6px)";
        rightEl.style.transition = "right 1.4s linear, opacity 0.2s ease";
        rightEl.style.right = "calc(100% - 6px)";

        await wait(1400);
        if (!mountedRef.current) break;

        // Hide dots as they arrive
        leftEl.style.opacity = "0";
        rightEl.style.opacity = "0";

        // Komisi glow pulse
        await komisiGlow.start({
          boxShadow: [
            "0 0 0px rgba(100,130,255,0)",
            "0 0 20px rgba(100,130,255,0.5)",
            "0 0 0px rgba(100,130,255,0)",
          ],
          scale: [1, 1.08, 1],
          transition: { duration: 0.5, ease: "easeOut" },
        });

        await wait(200);
      }
    };

    run();

    return () => {
      mountedRef.current = false;
      komisiGlow.stop();
    };
  }, [komisiGlow]);

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="flex items-center w-full max-w-[320px]">
        <LogoNode src="/logos/revenuecat.svg" bg="rgba(242,90,90,0.1)" />

        {/* Left line: RC → Komisi */}
        <div className="flex-1 relative h-[2px] mx-1 overflow-visible">
          <div className="absolute inset-0 bg-border rounded-full" />
          <div
            ref={leftRef}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(242,90,90,0.9) 0%, rgba(242,90,90,0) 70%)",
              left: "0px",
            }}
          />
        </div>

        <LogoNode src="/logos/komisi.svg" bg="rgba(0,0,0,0.06)" glowControls={komisiGlow} />

        {/* Right line: Adapty → Komisi */}
        <div className="flex-1 relative h-[2px] mx-1 overflow-visible">
          <div className="absolute inset-0 bg-border rounded-full" />
          <div
            ref={rightRef}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(152,64,255,0.9) 0%, rgba(152,64,255,0) 70%)",
              right: "0px",
            }}
          />
        </div>

        <LogoNode src="/logos/adapty.svg" bg="rgba(152,64,255,0.1)" />
      </div>
    </div>
  );
};
