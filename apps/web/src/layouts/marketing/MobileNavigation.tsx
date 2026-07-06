import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickOutside } from '@pragyaos/hooks';
import { CloseIcon } from '@pragyaos/icons';
import { MARKETING_NAV_ITEMS } from '@/layouts/marketing/MarketingNavigation';
import { cn } from '@pragyaos/utils';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileNavigation: Sliding drawer menu for mobile/tablet screens.
 * Focus traps tabs inside the container and binds Escape key listeners for accessibility.
 * Uses useClickOutside from @pragyaos/hooks.
 */
export function MobileNavigation({
  isOpen,
  onClose,
}: MobileNavigationProps): React.JSX.Element {
  const containerRef = useClickOutside<HTMLDivElement>(onClose);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 1. Escape key listener to close drawer
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 2. Prevent body scroll while mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 3. Simple Focus Trap: loop focus from last element back to Close button
  const handleFocusTrap = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const modal = containerRef.current;
    if (!modal) return;

    const focusables = modal.querySelectorAll(
      'a, button, [tabindex="0"]'
    ) as NodeListOf<HTMLElement>;
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      // Shift + Tab: loop back to end
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      // Tab: loop to start
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[1050] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          onKeyDown={handleFocusTrap}
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Sliding Panel */}
          <motion.div
            ref={containerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 bottom-0 w-72 max-w-full bg-background border-l border-border flex flex-col p-6 shadow-xl"
          >
            {/* Header / Close Row */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-sans font-bold tracking-wide">
                Menu
              </span>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="text-foreground hover:text-muted-foreground p-1 border border-transparent rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Close menu"
                autoFocus
              >
                <CloseIcon size={20} />
              </button>
            </div>

            {/* Navigation Anchor Links */}
            <nav className="flex-1">
              <ul className="flex flex-col gap-4 list-none m-0 p-0">
                {MARKETING_NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.href}
                      onClick={onClose}
                      className={({ isActive }) =>
                        cn(
                          'block text-sm font-sans font-medium tracking-wide uppercase py-2 border-b border-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
                          isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default MobileNavigation;
