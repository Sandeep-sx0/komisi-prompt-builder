'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface ShineProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  repeat?: number;
}

const Shine = React.forwardRef<HTMLDivElement, ShineProps>(
  ({ children, className, duration = 1.5, delay = 0, repeat = Infinity, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn('relative inline-block overflow-hidden', className)}
        {...props}
      >
        {children}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% center', '-200% center'] }}
          transition={{
            duration,
            delay,
            repeat,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    );
  }
);

Shine.displayName = 'Shine';

export { Shine };
