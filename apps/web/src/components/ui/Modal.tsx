import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  // Prevent body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1c1917]/50 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Container Sheet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16, rotate: -0.5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`relative bg-surface border border-border p-6 shadow-paper-floating rounded-paper max-w-lg w-full z-50 paper-grid ${className}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-divider pb-3 mb-4">
              {title ? (
                <h3 className="text-h3 font-heading text-text-primary font-bold">
                  {title}
                </h3>
              ) : (
                <div />
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-text-muted hover:text-text-primary cursor-pointer p-1 transition-colors rounded-sm hover:bg-background-secondary"
                aria-label="close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="font-body text-body text-text-secondary leading-relaxed">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
