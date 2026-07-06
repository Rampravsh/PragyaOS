import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@pragyaos/utils';

interface FadeInProps {
  children: React.ReactNode;
  duration?: 'fast' | 'normal' | 'slow' | 'delight';
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
}

// Map duration names to seconds
const durationMap = {
  fast: 0.15,
  normal: 0.25,
  slow: 0.45,
  delight: 0.8,
};

/**
 * FadeIn applies a smooth cinematic entrance animation using Framer Motion.
 * Integrates useReducedMotion for accessibility compliance.
 */
export function FadeIn({
  children,
  duration = 'slow',
  delay = 0,
  direction = 'up',
  distance = 16,
  className,
}: FadeInProps): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  // If accessibility settings request reduced motion, run a simple instant show
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: { x: 0, y: 0 },
  };

  const activeOffset = offset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...activeOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: durationMap[duration],
        delay,
        // Standard cinematic easeInOut curve [0.4, 0, 0.2, 1] from theme
        ease: [0.4, 0, 0.2, 1],
      }}
      className={cn('w-full', className)}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
