'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

const Tilt = React.forwardRef<HTMLDivElement, TiltProps>(
  ({ children, className, maxTilt = 8, perspective = 1000, scale = 1.02, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springConfig = { stiffness: 300, damping: 30 };
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
      mouseX.set(0.5);
      mouseY.set(0.5);
    };

    return (
      <motion.div
        ref={containerRef}
        className={cn(className)}
        style={{ perspective, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale }}
        {...(props as any)}
      >
        <motion.div className="h-full" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
          {children}
        </motion.div>
      </motion.div>
    );
  }
);

Tilt.displayName = 'Tilt';

export { Tilt };
