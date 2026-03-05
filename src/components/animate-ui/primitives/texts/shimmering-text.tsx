'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface ShimmeringTextProps extends HTMLMotionProps<'span'> {
  children: React.ReactNode;
  duration?: number;
  spread?: number;
}

const ShimmeringText = React.forwardRef<HTMLSpanElement, ShimmeringTextProps>(
  ({ children, className, duration = 2, spread = 2, ...props }, ref) => {
    return (
      <motion.span
        ref={ref}
        className={cn('inline-block', className)}
        style={{
          backgroundImage: `linear-gradient(
            90deg,
            currentColor 0%,
            currentColor 40%,
            hsl(var(--primary)) 50%,
            currentColor 60%,
            currentColor 100%
          )`,
          backgroundSize: `${spread * 100}% 100%`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        animate={{
          backgroundPosition: [`${spread * 100}% center`, `-${spread * 100}% center`],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
        {...props}
      >
        {children}
      </motion.span>
    );
  }
);

ShimmeringText.displayName = 'ShimmeringText';

export { ShimmeringText };
