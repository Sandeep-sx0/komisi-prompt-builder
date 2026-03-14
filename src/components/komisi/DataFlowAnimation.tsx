import React, { useState, useEffect } from "react";
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
    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative"
    style={{ background: bg }}
    animate={glowControls}
  >
    <img src={src} alt="" className="w-7 h-7 object-contain" />
  </motion.div>
);

export const DataFlowAnimation: React.FC = () => {
  const leftDot = useAnimationControls();
  const rightDot = useAnimationControls();
  const komisiGlow = useAnimationControls();

  useEffect(() => {
    const run = async () => {
      while (true) {
        // Both dots travel inward simultaneously
        await Promise.all([
          leftDot.start({
            left: ["0%", "calc(100% + 4px)"],
            transition: { duration: 1.2, ease: "easeIn" },
          }),
          rightDot.start({
            right: ["0%", "calc(100% + 4px)"],
            transition: { duration: 1.2, ease: "easeIn" },
          }),
        ]);

        // Komisi pulses on arrival
        await komisiGlow.start({
          boxShadow: [
            "0 0 0px rgba(100,130,255,0)",
            "0 0 20px rgba(100,130,255,0.5)",
            "0 0 0px rgba(100,130,255,0)",
          ],
          scale: [1, 1.08, 1],
          transition: { duration: 0.6, ease: "easeOut" },
        });

        // Brief pause before restart
        await new Promise((r) => setTimeout(r, 600));

        // Reset dots instantly
        leftDot.set({ left: "0%" });
        rightDot.set({ right: "0%" });
      }
    };
    run();
  }, [leftDot, rightDot, komisiGlow]);

  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="flex items-center w-full max-w-[320px]">
        {/* RevenueCat */}
        <LogoNode src="/logos/revenuecat.svg" bg="rgba(242,90,90,0.1)" />

        {/* Left line: RC → Komisi */}
        <div className="flex-1 relative h-[2px] mx-1">
          <div className="absolute inset-0 bg-border rounded-full" />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(242,90,90,0.8) 0%, rgba(242,90,90,0) 70%)",
            }}
            animate={leftDot}
          />
        </div>

        {/* Komisi hub */}
        <LogoNode
          src="/logos/komisi.svg"
          bg="rgba(0,0,0,0.06)"
          glowControls={komisiGlow}
        />

        {/* Right line: Adapty → Komisi */}
        <div className="flex-1 relative h-[2px] mx-1">
          <div className="absolute inset-0 bg-border rounded-full" />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(152,64,255,0.8) 0%, rgba(152,64,255,0) 70%)",
            }}
            animate={rightDot}
          />
        </div>

        {/* Adapty */}
        <LogoNode src="/logos/adapty.svg" bg="rgba(152,64,255,0.1)" />
      </div>
    </div>
  );
};
