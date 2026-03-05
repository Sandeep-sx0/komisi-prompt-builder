'use client';

import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useInView, type SpringOptions } from 'motion/react';
import { cn } from '@/lib/utils';

interface CountingNumberProps extends React.ComponentPropsWithoutRef<'span'> {
  number: number;
  fromNumber?: number;
  padStart?: boolean;
  decimalSeparator?: string;
  decimalPlaces?: number;
  transition?: SpringOptions;
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: string;
  prefix?: string;
  suffix?: string;
}

const CountingNumber = React.forwardRef<HTMLSpanElement, CountingNumberProps>(
  (
    {
      number,
      fromNumber = 0,
      decimalPlaces = 0,
      decimalSeparator = '.',
      transition = { stiffness: 90, damping: 50 },
      inView = false,
      inViewOnce = true,
      inViewMargin = '0px',
      prefix = '',
      suffix = '',
      className,
      ...props
    },
    ref
  ) => {
    const spanRef = useRef<HTMLSpanElement>(null);
    const combinedRef = (ref as React.RefObject<HTMLSpanElement>) || spanRef;
    const isInView = useInView(combinedRef, { once: inViewOnce, margin: inViewMargin as any });

    const motionValue = useMotionValue(fromNumber);
    const springValue = useSpring(motionValue, transition);
    const [display, setDisplay] = React.useState(
      `${prefix}${fromNumber.toFixed(decimalPlaces)}${suffix}`
    );

    useEffect(() => {
      if (inView) {
        if (isInView) motionValue.set(number);
      } else {
        motionValue.set(number);
      }
    }, [motionValue, number, inView, isInView]);

    useEffect(() => {
      const unsubscribe = springValue.on('change', (latest) => {
        const formatted = latest.toFixed(decimalPlaces);
        const parts = formatted.split('.');
        const intPart = parts[0];
        const decPart = parts[1];
        const result = decPart ? `${intPart}${decimalSeparator}${decPart}` : intPart;
        setDisplay(`${prefix}${result}${suffix}`);
      });
      return unsubscribe;
    }, [springValue, decimalPlaces, decimalSeparator, prefix, suffix]);

    return (
      <span ref={combinedRef} className={cn(className)} {...props}>
        {display}
      </span>
    );
  }
);

CountingNumber.displayName = 'CountingNumber';

export { CountingNumber };
