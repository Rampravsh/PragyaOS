/**
 * MobileNav
 * apps/web/src/layouts/marketing/MobileNav.tsx
 *
 * Mobile overlay navigation drawer component.
 * Features:
 * - Animated slide-in from right/top using framer-motion.
 * - Closes on Escape press or clicking outside (using useClickOutside).
 * - Proper accessibility attributes (aria-modal, role="dialog").
 * - Follows design tokens for motion, spacing, and colors.
 */

import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "@pragyaos/hooks";
import { cn } from "@pragyaos/utils";
import type { NavItem } from "./types";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  
  // Close on outside click
  const clickOutsideRef = useClickOutside<HTMLDivElement>(onClose);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close drawer on path change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-[var(--z-modal-backdrop)]"
            aria-hidden="true"
          />

          {/* Drawer container */}
          <motion.div
            ref={clickOutsideRef as React.RefObject<HTMLDivElement>}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[320px] bg-[var(--card)] border-l border-[var(--border)] shadow-[var(--shadow-2xl)] z-[var(--z-modal)] p-[var(--spacing-6)] flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex justify-between items-center mb-[var(--spacing-8)]">
                <span className="font-serif text-[var(--text-lg)] tracking-tight">Menu</span>
                <button
                  onClick={onClose}
                  className="p-[var(--spacing-2)] rounded-[var(--radius-sm)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Navigation items list */}
              <nav aria-label="Mobile Main Navigation">
                <ul className="flex flex-col gap-[var(--spacing-4)] list-none p-0 m-0">
                  {items.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <li key={item.href}>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-[var(--spacing-2)] text-[var(--text-lg)] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            to={item.href}
                            className={cn(
                              "block py-[var(--spacing-2)] text-[var(--text-lg)] font-medium transition-colors",
                              isActive
                                ? "text-[var(--foreground)] border-l-2 border-[var(--foreground)] pl-[var(--spacing-2)]"
                                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                            )}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* CTAs at drawer bottom */}
            <div className="flex flex-col gap-[var(--spacing-3)] pt-[var(--spacing-6)] border-t border-[var(--border)]">
              <Link
                to="/login"
                className="w-full text-center py-[var(--spacing-3)] text-[var(--text-sm)] font-medium rounded-[var(--radius-sm)] border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-[var(--spacing-3)] text-[var(--text-sm)] font-medium bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius-sm)] hover:opacity-[var(--opacity-hover)] transition-opacity"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
