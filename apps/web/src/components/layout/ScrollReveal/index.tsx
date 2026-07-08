import React from 'react';
import { motion } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, delay = 0, duration = 0.5, direction = 'up', className = '', ...props }, ref) => {
    const directions = {
      up: { y: 24, x: 0 },
      down: { y: -24, x: 0 },
      left: { x: 24, y: 0 },
      right: { x: -24, y: 0 },
      none: { x: 0, y: 0 },
    };

    return (
      <motion.div
        ref={ref as any}
        initial={{ opacity: 0, ...directions[direction] }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

ScrollReveal.displayName = 'ScrollReveal';
