import React from "react";
import { motion } from "motion/react";

const LogoNode = ({
  src,
  bg,
  glow,
}: {
  src: string;
  bg: string;
  glow?: boolean;
}) => (
  <motion.div
    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 relative"
    style={{ background: bg }}
    animate={glow ? { boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 16px rgba(100,100,255,0.3)", "0 0 0px rgba(0,0,0,0)"] } : undefined}
    transition={glow ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : undefined}
  >
    <img src={src} alt="" className="w-7 h-7 object-contain" />
  </motion.div>
);

const FlowLine = ({ delay = 0 }: { delay?: number }) => (
  <div className="flex-1 relative h-[2px] mx-1">
    {/* Static line */}
    <div className="absolute inset-0 bg-border rounded-full" />
    {/* Flowing pulse */}
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(100,130,255,0.8) 0%, rgba(100,130,255,0) 70%)",
      }}
      animate={{ left: ["-8px", "calc(100% + 8px)"] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        repeatDelay: 0.5,
      }}
    />
  </div>
);

export const DataFlowAnimation: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div className="flex items-center w-full max-w-[320px]">
        <LogoNode src="/logos/revenuecat.svg" bg="rgba(242,90,90,0.1)" />
        <FlowLine delay={0} />
        <LogoNode src="/logos/komisi.svg" bg="rgba(0,0,0,0.06)" glow />
        <FlowLine delay={0.9} />
        <LogoNode src="/logos/adapty.svg" bg="rgba(152,64,255,0.1)" />
      </div>
    </div>
  );
};
