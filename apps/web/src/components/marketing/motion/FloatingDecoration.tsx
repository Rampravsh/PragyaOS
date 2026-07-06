import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@pragyaos/utils';

interface FloatingDecorationProps {
  children: React.ReactNode;
  duration?: number; // float cycle duration in seconds
  yOffset?: number; // y drift boundary in pixels
  className?: string;
}

/**
 * FloatingDecoration loops a slow vertical drift (sinusoidal float).
 * Disables automatically when reduced motion is preferred.
 */
export function FloatingDecoration({
  children,
  duration = 6,
  yOffset = 12,
  className,
}: FloatingDecorationProps): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{
        y: [0, yOffset, 0, -yOffset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
}

export default FloatingDecoration;
