import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  // Parallax speed modifier: positive for faster/delayed, negative for reverse scroll
  speed?: number;
  className?: string;
}

/**
 * ParallaxWrapper applies a vertical translation offset to its child based on page scroll coordinates.
 * Disables automatically when user accessibility prefers reduced motion.
 */
export function ParallaxWrapper({
  children,
  speed = 0.15, // Matches the theme's editorialLayout.parallaxSpeedFactor (0.15)
  className,
}: ParallaxWrapperProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track viewport relative scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Transform offset bounds using speed factors
  // Translates start (bottom entry) to end (top exit)
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={containerRef} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export default ParallaxWrapper;
