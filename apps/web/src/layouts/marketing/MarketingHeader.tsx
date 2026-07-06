import React, { useState } from 'react';
import { Link } from 'react-router';
import { useScrollY } from '@pragyaos/hooks';
import { MenuIcon } from '@pragyaos/icons';
import { PrimaryButton } from '@/components/marketing/shared/Button';
import MarketingNavigation from '@/layouts/marketing/MarketingNavigation';
import MobileNavigation from '@/layouts/marketing/MobileNavigation';
import ThemeToggle from '@/layouts/marketing/ThemeToggle';
import { cn } from '@pragyaos/utils';

/**
 * MarketingHeader: Responsive sticky header wrapping the navigation.
 * Transitions from transparent to a frosted glass background on scroll.
 */
export function MarketingHeader(): React.JSX.Element {
  const scrollY = useScrollY();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Transition glass surface when scroll surpasses 20px
  const isScrolled = scrollY > 20;

  return (
    <header
      className={cn(
        'sticky top-0 left-0 right-0 z-[1000] w-full transition-all duration-normal ease-in-out border-b',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-border/80 shadow-sm py-3'
          : 'bg-transparent border-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Branding Identity */}
        <Link
          to="/"
          className="text-base font-sans font-bold tracking-wider uppercase text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          aria-label="PragyaOS Homepage"
        >
          PragyaOS
        </Link>

        {/* Center: Desktop Navigation Bar */}
        <MarketingNavigation />

        {/* Right: Controls & CTAs */}
        <div className="flex items-center gap-3">
          {/* Theme toggling controls */}
          <ThemeToggle />

          {/* Core Sign In Action */}
          <PrimaryButton
            href="/login"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Sign In
          </PrimaryButton>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden text-foreground hover:text-muted-foreground p-1.5 border border-border/80 hover:border-foreground/40 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Open navigation menu"
            aria-controls="mobile-menu-drawer"
            aria-expanded={isMobileOpen}
          >
            <MenuIcon size={18} />
          </button>
        </div>
      </div>

      {/* Accessible Mobile navigation drawer drawer */}
      <MobileNavigation
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </header>
  );
}

export default MarketingHeader;
