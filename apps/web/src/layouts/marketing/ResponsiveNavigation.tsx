/**
 * ResponsiveNavigation
 * apps/web/src/layouts/marketing/ResponsiveNavigation.tsx
 *
 * A high-level component that dynamically switches between MarketingNavigation (desktop)
 * and the MobileNav drawer toggle (hamburger trigger) based on breakpoint matches.
 */

import React, { useState } from "react";
import { useMediaQuery } from "@pragyaos/hooks";
import MarketingNavigation from "./MarketingNavigation";
import MobileNav from "./MobileNav";
import type { NavItem } from "./types";

interface ResponsiveNavigationProps {
  items: NavItem[];
}

export const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({
  items,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop view (handled internally via hidden CSS on mobile) */}
      <MarketingNavigation items={items} className="hidden md:flex" />

      {/* Mobile view trigger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-[var(--spacing-2)] rounded-[var(--radius-sm)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          aria-expanded={isMobileMenuOpen}
          aria-label="Open main navigation menu"
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
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>

        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          items={items}
        />
      </div>
    </>
  );
};

export default ResponsiveNavigation;
