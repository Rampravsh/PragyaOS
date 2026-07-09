import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollY } from '@pragyaos/hooks';
import { MenuIcon, CloseIcon, LogoIcon, ChevronDownIcon } from '@pragyaos/icons';
import { cn } from '@pragyaos/utils';
import MarketingNavigation from '@/layouts/marketing/MarketingNavigation';
import MobileNavigation from '@/layouts/marketing/MobileNavigation';
import ThemeToggle from '@/layouts/marketing/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes/route.constants';

function HeaderProfileChip(): React.JSX.Element {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return <></>;

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  const fullName = `${user.firstName} ${user.lastName}`;
  const roleDisplay = user.role === 'super_admin' ? 'Super Admin' : user.role.charAt(0).toUpperCase() + user.role.slice(1);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-1.5 p-1 rounded-full border border-stone-200/50 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-700 bg-background/50 hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="w-7 h-7 rounded-full bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white text-xs font-bold font-sans shrink-0">
          {initials}
        </div>
        <span className="text-[11px] font-sans font-semibold text-stone-700 dark:text-stone-300 hidden md:inline-block px-1">
          {user.firstName}
        </span>
        <ChevronDownIcon size={12} className={cn("text-stone-500 dark:text-stone-400 mr-1 hidden md:inline-block transition-transform duration-normal", menuOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 rounded-xl border border-stone-200/60 dark:border-stone-800 bg-white dark:bg-stone-950 text-stone-900 dark:text-white shadow-lg p-1 z-2000 flex flex-col gap-0.5"
          >
            <div className="px-2.5 py-2 border-b border-stone-100 dark:border-stone-900 mb-1">
              <p className="text-xs font-bold font-sans truncate text-foreground leading-tight">{fullName}</p>
              <p className="text-[10px] text-muted-foreground font-sans truncate leading-normal">{user.email}</p>
              <span className="inline-block text-[9px] font-sans font-semibold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-1.5 py-0.5 rounded-sm mt-1">
                {roleDisplay}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-2.5 py-2 text-[11px] font-semibold font-sans text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors duration-fast text-left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Log out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * MarketingHeader: Sticky header matching the approved design.
 * Feather logo | PragyaOS wordmark | Center nav | Theme toggle | Log in | Get Started
 * Frosted glass on scroll.
 */
export function MarketingHeader(): React.JSX.Element {
  const scrollY = useScrollY();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isScrolled = scrollY > 20;
  const { user } = useAuth();

  const getDashboardRoute = () => {
    if (!user) return ROUTES.LOGIN;
    if (user.role === 'student') return ROUTES.PORTAL;
    if (['instructor'].includes(user.role)) return ROUTES.STUDIO;
    return ROUTES.ADMIN;
  };

  return (
    <header
      className={cn(
        'sticky top-0 left-0 right-0 z-1000 w-full transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-background/75 backdrop-blur-lg border-b border-stone-200/40 dark:border-stone-800/40 shadow-sm py-3'
          : 'bg-background/80 backdrop-blur-md border-b border-stone-200/30 dark:border-stone-900/30 py-3'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">

        {/* Left: Logo + Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[#1C1917] dark:text-stone-100 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          aria-label="PragyaOS Homepage"
        >
          <LogoIcon size={22} className="text-[#1C1917] dark:text-stone-100" />
          <span className="font-serif font-bold text-lg md:text-xl tracking-tight text-[#1C1917] dark:text-white">
            PragyaOS
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <MarketingNavigation />

        {/* Right: Theme toggle + Log in + Get Started */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to={getDashboardRoute()}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:hover:bg-stone-100 dark:text-stone-950 text-xs font-sans font-semibold rounded-md transition-all duration-200 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span>Workspace</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </Link>
              <HeaderProfileChip />
            </div>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="hidden sm:inline-flex items-center px-3.5 py-1.5 border border-[#1C1917]/25 hover:border-[#1C1917] hover:bg-[#1C1917]/5 dark:border-white/20 dark:hover:border-white/40 dark:hover:bg-white/5 text-xs font-sans font-medium text-[#1C1917] dark:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
              >
                Log in
              </Link>

              <Link
                to={ROUTES.REGISTER}
                className="hidden sm:inline-flex items-center px-3.5 py-1.5 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:hover:bg-stone-100 dark:text-stone-950 text-xs font-sans font-semibold rounded-md transition-all duration-200 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-[#1C1917] hover:text-[#1C1917]/70 dark:text-stone-300 dark:hover:text-white p-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
