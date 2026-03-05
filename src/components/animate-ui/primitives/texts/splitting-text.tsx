'use client';

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type SplitType = 'chars' | 'words';

interface SplittingTextProps {
  text: string;
  className?: string;
  type?: SplitType;
  delay?: number;
  stagger?: number;
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: string;
  initial?: Record<string, any>;
  animate?: Record<string, any>;
}

const SplittingText: React.FC<SplittingTextProps> = ({
  text,
  className,
  type = 'chars',
  delay = 0,
  stagger = 0.03,
  inView = false,
  inViewOnce = true,
  inViewMargin = '0px',
  initial = { y: 20, opacity: 0 },
  animate = { y: 0, opacity: 1 },
}) => {
  const parts = type === 'chars' ? text.split('') : text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: initial,
    visible: animate,
  };

  return (
    <motion.span
      className={cn('inline', className)}
      variants={containerVariants}
      initial="hidden"
      {...(inView
        ? { whileInView: 'visible', viewport: { once: inViewOnce, margin: inViewMargin as any } }
        : { animate: 'visible' })}
      aria-label={text}
    >
      {parts.map((part, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          className="inline-block"
          style={{ whiteSpace: type === 'words' ? 'pre' : undefined }}
        >
          {part === ' ' ? '\u00A0' : part}
          {type === 'words' && i < parts.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
};

SplittingText.displayName = 'SplittingText';

export { SplittingText };
