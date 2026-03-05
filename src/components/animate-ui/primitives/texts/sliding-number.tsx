'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface SlidingNumberProps extends React.ComponentPropsWithoutRef<'span'> {
  number: number;
  prefix?: string;
  suffix?: string;
}

const SlidingDigit = ({ digit, className }: { digit: string; className?: string }) => (
  <span className={cn('relative inline-block overflow-hidden', className)} style={{ width: '0.6em' }}>
    <AnimatePresence mode="popLayout">
      <motion.span
        key={digit}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: '-100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.4 }}
        className="inline-block"
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  </span>
);

const SlidingNumber = React.forwardRef<HTMLSpanElement, SlidingNumberProps>(
  ({ number, prefix = '', suffix = '', className, ...props }, ref) => {
    const digits = useMemo(() => String(number).split(''), [number]);

    return (
      <span ref={ref} className={cn('inline-flex items-baseline', className)} {...props}>
        {prefix && <span>{prefix}</span>}
        {digits.map((d, i) => (
          d === '.' || d === ',' ? (
            <span key={`sep-${i}`}>{d}</span>
          ) : (
            <SlidingDigit key={`pos-${digits.length - i}`} digit={d} />
          )
        ))}
        {suffix && <span>{suffix}</span>}
      </span>
    );
  }
);

SlidingNumber.displayName = 'SlidingNumber';

export { SlidingNumber };
