'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  strength?: number;
  range?: number;
}

const Magnetic = React.forwardRef<HTMLDivElement, MagneticProps>(
  ({ children, className, strength = 0.3, range = 100, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < range) {
        x.set(dx * strength);
        y.set(dy * strength);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={containerRef}
        className={cn('inline-block', className)}
        style={{ x, y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

Magnetic.displayName = 'Magnetic';

export { Magnetic };
