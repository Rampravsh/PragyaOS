import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface AnnouncementBarProps {
  message: string;
  ctaText?: string;
  ctaHref?: string;
  sticky?: boolean;
  icon?: React.ReactNode;
  tag?: string;
  onDismiss?: () => void;
}

export function AnnouncementBar({
  message,
  ctaText,
  ctaHref,
  sticky = true,
  icon,
  tag = 'NEW',
  onDismiss,
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  const positionClass = sticky ? 'sticky top-0 z-50' : 'relative';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="banner"
          initial={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`w-full bg-paper-dark text-background-secondary flex justify-between items-center text-caption font-body overflow-hidden border-b border-stone-850 select-none ${positionClass}`}
        >
          <div className="flex-1 flex items-center justify-center space-x-3 text-center py-2.5 px-4 flex-wrap gap-2 sm:gap-0">
            {icon && <span className="inline-flex shrink-0">{icon}</span>}
            {tag && (
              <span className="bg-background-secondary text-paper-dark text-[10px] font-bold px-1.5 py-0.5 rounded-sm shrink-0">
                {tag}
              </span>
            )}
            <span className="font-medium text-stone-200">{message}</span>
            {ctaText && (
              <a
                href={ctaHref || '#'}
                className="text-white hover:text-accent-gold underline underline-offset-2 font-semibold ml-1 inline-flex items-center shrink-0"
              >
                {ctaText} &rarr;
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-stone-400 hover:text-white cursor-pointer p-2.5 mr-2 transition-colors shrink-0"
            aria-label="dismiss banner"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
