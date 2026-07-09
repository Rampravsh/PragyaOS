import React, { useState, useMemo } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UnderlineShort,
  UnderlineLong,
  DoubleUnderline,
  TripleUnderline,
  HighlightCircle,
  HighlightOval,
  HighlightDoubleCircle,
  ImperfectCircle,
  RoughCircle,
  BrushCircle,
  OpenCircle
} from '@pragyaos/assets';
import { cn } from '@pragyaos/utils';

// Premium accent colors matching the editorial tone
export const ACCENT_COLORS = [
  '#059669', // Emerald
  '#D97706', // Amber
  '#2563EB', // Blue
  '#7C3AED', // Purple
  '#A97E3E', // Gold
  '#0D9488', // Teal
  '#BE185D', // Rose
];

/** Returns a random premium accent color from the palette */
export function getRandomAccentColor(): string {
  const index = Math.floor(Math.random() * ACCENT_COLORS.length);
  return ACCENT_COLORS[index];
}

const UNDERLINE_COMPONENTS = {
  short: UnderlineShort,
  long: UnderlineLong,
  double: DoubleUnderline,
  triple: TripleUnderline,
};

const CIRCLE_COMPONENTS = {
  circle: HighlightCircle,
  oval: HighlightOval,
  'double-circle': HighlightDoubleCircle,
  imperfect: ImperfectCircle,
  rough: RoughCircle,
  brush: BrushCircle,
  open: OpenCircle,
};

export type UnderlineVariant = keyof typeof UNDERLINE_COMPONENTS | 'random';
export type CircleVariant = keyof typeof CIRCLE_COMPONENTS | 'random';

export interface AnimatedNavLinkProps extends Omit<NavLinkProps, 'children'> {
  children: React.ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  underlineColor?: string;
  circleColor?: string;
  underlineVariant?: UnderlineVariant;
  circleVariant?: CircleVariant;
}

/**
 * AnimatedNavLink: Standard NavLink with hand-drawn hover underline and active circle annotations.
 * Selects accent colors and doodle shapes randomly if not specified, keeping them stable per instance.
 */
export function AnimatedNavLink({
  children,
  to,
  className = '',
  activeClassName = 'text-[#1C1917] font-semibold dark:text-white',
  inactiveClassName = 'text-[#1C1917]/70 hover:text-[#1C1917] dark:text-stone-400 dark:hover:text-stone-200',
  underlineColor,
  circleColor,
  underlineVariant = 'short',
  circleVariant = 'oval',
  ...props
}: AnimatedNavLinkProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const customIsActive = useMemo(() => {
    if (typeof to === 'string') {
      try {
        const toUrl = new URL(to, 'http://localhost');
        const pathMatch = location.pathname === toUrl.pathname;
        if (!pathMatch) return false;

        const toParams = new URLSearchParams(toUrl.search);
        const locParams = new URLSearchParams(location.search);

        if (toUrl.search) {
          for (const [key, val] of toParams.entries()) {
            if (locParams.get(key) !== val) return false;
          }
          return true;
        }

        return !location.search;
      } catch (e) {
        return null;
      }
    }
    return null;
  }, [to, location]);

  // Pick colors stably on render mount
  const selectedUnderlineColor = useMemo(() => underlineColor || getRandomAccentColor(), [underlineColor]);
  const selectedCircleColor = useMemo(() => circleColor || getRandomAccentColor(), [circleColor]);

  // Pick underline component stably
  const SelectedUnderline = useMemo(() => {
    if (underlineVariant === 'random') {
      const keys = Object.keys(UNDERLINE_COMPONENTS) as Array<keyof typeof UNDERLINE_COMPONENTS>;
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return UNDERLINE_COMPONENTS[randomKey];
    }
    return UNDERLINE_COMPONENTS[underlineVariant] || UnderlineShort;
  }, [underlineVariant]);

  // Pick circle component stably
  const SelectedCircle = useMemo(() => {
    if (circleVariant === 'random') {
      const keys = Object.keys(CIRCLE_COMPONENTS) as Array<keyof typeof CIRCLE_COMPONENTS>;
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return CIRCLE_COMPONENTS[randomKey];
    }
    return CIRCLE_COMPONENTS[circleVariant] || HighlightOval;
  }, [circleVariant]);

  return (
    <NavLink
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={({ isActive: routerIsActive }) => {
        const isActive = customIsActive !== null ? customIsActive : routerIsActive;
        return cn(
          'relative px-4 py-2 text-[13px] font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm block',
          isActive ? activeClassName : inactiveClassName,
          className
        );
      }}
      {...props}
    >
      {({ isActive: routerIsActive }) => {
        const isActive = customIsActive !== null ? customIsActive : routerIsActive;
        return (
          <span className="relative z-10 block">
            {children}

          {/* Underline on Hover (not active) */}
          <AnimatePresence>
            {isHovered && !isActive && (
              <motion.div
                className="absolute -bottom-1.5 left-0 right-0 h-2 flex justify-center pointer-events-none z-0"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.85 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{ originX: 0.5 }}
              >
                <SelectedUnderline
                  color={selectedUnderlineColor}
                  strokeWidth={2.2}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Circle/Oval around when active */}
          {isActive && (
            <motion.div
              className="absolute -inset-x-3 -inset-y-1.5 pointer-events-none z-[-1] flex items-center justify-center"
              initial={{ scale: 0.88, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 0.75, rotate: 1 }}
              transition={{ duration: 0.35, ease: 'backOut' }}
            >
              <SelectedCircle
                color={selectedCircleColor}
                strokeWidth={2}
                className="w-full h-full object-contain"
              />
            </motion.div>
          )}
        </span>
      ); }}
    </NavLink>
  );
}

export interface AnimatedNavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
  underlineColor?: string;
  circleColor?: string;
  underlineVariant?: UnderlineVariant;
  circleVariant?: CircleVariant;
}

/**
 * AnimatedNavButton: Button version of AnimatedNavLink for dropdown buttons and action triggers.
 */
export function AnimatedNavButton({
  children,
  isActive = false,
  className = '',
  activeClassName = 'text-[#1C1917] font-semibold dark:text-white',
  inactiveClassName = 'text-[#1C1917]/70 hover:text-[#1C1917] dark:text-stone-400 dark:hover:text-stone-200',
  underlineColor,
  circleColor,
  underlineVariant = 'short',
  circleVariant = 'oval',
  ...props
}: AnimatedNavButtonProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  // Pick colors stably on render mount
  const selectedUnderlineColor = useMemo(() => underlineColor || getRandomAccentColor(), [underlineColor]);
  const selectedCircleColor = useMemo(() => circleColor || getRandomAccentColor(), [circleColor]);

  // Pick underline component stably
  const SelectedUnderline = useMemo(() => {
    if (underlineVariant === 'random') {
      const keys = Object.keys(UNDERLINE_COMPONENTS) as Array<keyof typeof UNDERLINE_COMPONENTS>;
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return UNDERLINE_COMPONENTS[randomKey];
    }
    return UNDERLINE_COMPONENTS[underlineVariant] || UnderlineShort;
  }, [underlineVariant]);

  // Pick circle component stably
  const SelectedCircle = useMemo(() => {
    if (circleVariant === 'random') {
      const keys = Object.keys(CIRCLE_COMPONENTS) as Array<keyof typeof CIRCLE_COMPONENTS>;
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      return CIRCLE_COMPONENTS[randomKey];
    }
    return CIRCLE_COMPONENTS[circleVariant] || HighlightOval;
  }, [circleVariant]);

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative px-4 py-2 text-[13px] font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm block',
        isActive ? activeClassName : inactiveClassName,
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-1">
        {children}

        {/* Underline on Hover (not active) */}
        <AnimatePresence>
          {isHovered && !isActive && (
            <motion.div
              className="absolute -bottom-1.5 left-0 right-0 h-2 flex justify-center pointer-events-none z-0"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.85 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{ originX: 0.5 }}
            >
              <SelectedUnderline
                color={selectedUnderlineColor}
                strokeWidth={2.2}
                className="w-full h-full object-contain"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circle/Oval around when active */}
        {isActive && (
          <motion.div
            className="absolute -inset-x-3 -inset-y-1.5 pointer-events-none z-[-1] flex items-center justify-center"
            initial={{ scale: 0.88, opacity: 0, rotate: -3 }}
            animate={{ scale: 1, opacity: 0.75, rotate: 1 }}
            transition={{ duration: 0.35, ease: 'backOut' }}
          >
            <SelectedCircle
              color={selectedCircleColor}
              strokeWidth={2}
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
      </span>
    </button>
  );
}
