import React, { useState } from 'react';
import { Link } from 'react-router';
import { useScrollY } from '@pragyaos/hooks';
import { MenuIcon, CloseIcon, LogoIcon } from '@pragyaos/icons';
import { cn } from '@pragyaos/utils';
import MarketingNavigation from '@/layouts/marketing/MarketingNavigation';
import MobileNavigation from '@/layouts/marketing/MobileNavigation';
import ThemeToggle from '@/layouts/marketing/ThemeToggle';

/**
 * MarketingHeader: Sticky header matching the approved design.
 * Feather logo | PragyaOS wordmark | Center nav | Theme toggle | Log in | Get Started
 * Frosted glass on scroll.
 */
export function MarketingHeader(): React.JSX.Element {
  const scrollY = useScrollY();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isScrolled = scrollY > 20;

  return (
    <header
      className={cn(
        'sticky top-0 left-0 right-0 z-[1000] w-full transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-200/60 shadow-sm py-3'
          : 'bg-[#FAF7F2] border-b border-stone-200/50 py-3'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">

        {/* Left: Logo + Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[#1C1917] dark:text-[#f5f5f4] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          aria-label="PragyaOS Homepage"
        >
          <LogoIcon size={22} className="text-[#1C1917] dark:text-[#f5f5f4]" />
          <span className="font-sans font-bold text-base tracking-tight">
            PragyaOS
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <MarketingNavigation />

        {/* Right: Theme toggle + Log in + Get Started */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            to="/login"
            className="hidden sm:inline-flex items-center px-3 py-1.5 text-sm font-sans font-medium text-[#1C1917]/80 hover:text-[#1C1917] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            Log in
          </Link>

          <Link
            to="/login"
            className="hidden sm:inline-flex items-center px-4 py-2 bg-[#1C1917] hover:bg-black text-white text-sm font-sans font-semibold rounded-md transition-all duration-200 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Get Started
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-[#1C1917] hover:text-[#1C1917]/70 p-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-menu-drawer"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      <MobileNavigation
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </header>
  );
}

export default MarketingHeader;
