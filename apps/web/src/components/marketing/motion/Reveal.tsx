import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@pragyaos/utils';

interface RevealProps {
  children: React.ReactNode;
  duration?: 'normal' | 'slow' | 'delight';
  delay?: number;
  className?: string;
}

const durationMap = {
  normal: 0.25,
  slow: 0.45,
  delight: 0.8,
};

/**
 * Reveal slides element up from a clipped mask container (overflow-hidden wrapper).
 * Emulates high-editorial magazine headings entrance styles.
 * Integrates useReducedMotion for accessibility compliance.
 */
export function Reveal({
  children,
  duration = 'slow',
  delay = 0,
  className,
}: RevealProps): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn('relative overflow-hidden w-full', className)}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{
          duration: durationMap[duration],
          delay,
          // Premium Spring pop ease curve [0.34, 1.56, 0.64, 1] from theme
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Reveal;
