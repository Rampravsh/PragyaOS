import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavigationItem } from '../Navigation';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: { label: string; to: string }[];
}

export function MobileMenu({ isOpen, onClose, items }: MobileMenuProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1c1917]/40 backdrop-blur-xs"
          />

          {/* Drawer sheet container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background border-l border-border p-6 flex flex-col space-y-6 shadow-paper-floating z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Header / Dismiss Button */}
            <div className="flex justify-between items-center border-b border-divider pb-4">
              <span className="font-heading text-h3 font-bold text-text-primary">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-text-muted hover:text-text-primary cursor-pointer p-1.5 transition-colors"
                aria-label="close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Nav Links list */}
            <nav className="flex flex-col space-y-4">
              {items.map((item, idx) => (
                <NavigationItem
                  key={idx}
                  to={item.to}
                  onClick={onClose}
                  className="text-body-lg block py-2 px-1"
                >
                  {item.label}
                </NavigationItem>
              ))}
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
