import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ content, children, position = 'top', className = '' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const animDirection = {
    top: { y: 4, x: '-50%' },
    bottom: { y: -4, x: '-50%' },
    left: { x: 4, y: '-50%' },
    right: { x: -4, y: '-50%' },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, ...animDirection[position] }}
            animate={{ opacity: 1, y: position === 'left' || position === 'right' ? '-50%' : 0, x: position === 'left' || position === 'right' ? 0 : '-50%' }}
            exit={{ opacity: 0, ...animDirection[position] }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute ${positionClasses[position]} bg-text-primary text-background border border-text-primary px-2.5 py-1 text-caption font-body font-semibold rounded-paper shadow-button z-50 pointer-events-none whitespace-nowrap ${className}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
