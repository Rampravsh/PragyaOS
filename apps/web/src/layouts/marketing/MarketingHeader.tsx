/**
 * MarketingHeader
 * apps/web/src/layouts/marketing/MarketingHeader.tsx
 *
 * Sticky navigation header for the public marketing layout.
 * Integrates:
 * - Transparency to frosted glass transition based on useScrollY.
 * - Responsive navigation (desktop list vs mobile hamburger trigger).
 * - System icons from @pragyaos/icons.
 * - Layout container and spacing tokens.
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useScrollY, useMediaQuery } from "@pragyaos/hooks";
import { SearchIcon } from "@pragyaos/icons";
import { cn } from "@pragyaos/utils";
import MarketingContainer from "./MarketingContainer";
import MarketingNavigation from "./MarketingNavigation";
import MobileNav from "./MobileNav";
import type { NavItem } from "./types";

interface MarketingHeaderProps {
  items: NavItem[];
}

export const MarketingHeader: React.FC<MarketingHeaderProps> = ({ items }) => {
  const scrollY = useScrollY();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Transition from transparent to frosted glass after scrolling 20px
  const isScrolled = scrollY > 20;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 right-0 w-full z-[var(--z-sticky)] transition-all duration-[var(--duration-normal)] ease-[var(--ease-in-out)]",
          isScrolled
            ? "bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--border)] py-[var(--spacing-3)]"
            : "bg-transparent py-[var(--spacing-5)]"
        )}
      >
        <MarketingContainer variant="wide" className="flex items-center justify-between">
          {/* Logo / Editorial Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-[var(--spacing-2)] text-[var(--foreground)] no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-[var(--radius-sm)]"
            aria-label="PragyaOS home"
          >
            <span className="font-serif text-[var(--text-2xl)] font-semibold tracking-tighter select-none">
              Pragya<span className="font-sans font-light">OS</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <MarketingNavigation items={items} />

          {/* Action CTAs */}
          <div className="flex items-center gap-[var(--spacing-3)] md:gap-[var(--spacing-4)]">
            {/* Search Trigger */}
            <button
              onClick={() => {
                // Future search toggle or shortcut modal
                console.log("Search trigger clicked");
              }}
              className="p-[var(--spacing-2)] rounded-[var(--radius-sm)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              aria-label="Search site (Ctrl+K)"
            >
              <SearchIcon size={20} />
            </button>

            {/* Desktop-only secondary/primary CTAs */}
            <Link
              to="/login"
              className="hidden md:inline-flex items-center py-[var(--spacing-2)] px-[var(--spacing-4)] text-[var(--text-sm)] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] rounded-[var(--radius-sm)]"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="hidden md:inline-flex items-center py-[var(--spacing-2)] px-[var(--spacing-4)] bg-[var(--primary)] text-[var(--primary-foreground)] text-[var(--text-sm)] font-medium rounded-[var(--radius-sm)] hover:opacity-[var(--opacity-hover)] transition-all active:scale-[var(--active-scale)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              style={{ scale: "var(--active-scale, 1)" }}
            >
              Get Started
            </Link>

            {/* Mobile Hamburger Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-[var(--spacing-2)] rounded-[var(--radius-sm)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
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
          </div>
        </MarketingContainer>
      </header>

      {/* Slide-out Mobile Navigation drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        items={items}
      />
    </>
  );
};

export default MarketingHeader;
