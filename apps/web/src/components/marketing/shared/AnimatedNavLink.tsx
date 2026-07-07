import React, { useState } from 'react';
import { NavLink, NavLinkProps } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { UnderlineShort, HighlightOval } from '@pragyaos/assets';
import { cn } from '@pragyaos/utils';

export interface AnimatedNavLinkProps extends Omit<NavLinkProps, 'children'> {
  children: React.ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  underlineColor?: string;
  circleColor?: string;
}

/**
 * AnimatedNavLink: Standard NavLink with hand-drawn hover underline and active circle annotations.
 * Uses Framer Motion for smooth transitions.
 */
export function AnimatedNavLink({
  children,
  to,
  className = '',
  activeClassName = 'text-[#1C1917] font-semibold dark:text-white',
  inactiveClassName = 'text-[#1C1917]/70 hover:text-[#1C1917] dark:text-stone-400 dark:hover:text-stone-200',
  underlineColor = '#A97E3E', // gold / brown accent
  circleColor = '#059669',    // sage green active circle
  ...props
}: AnimatedNavLinkProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={({ isActive }) =>
        cn(
          'relative px-4 py-2 text-[13px] font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm block',
          isActive ? activeClassName : inactiveClassName,
          className
        )
      }
      {...props}
    >
      {({ isActive }) => (
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
                <UnderlineShort
                  color={underlineColor}
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
              <HighlightOval
                color={circleColor}
                strokeWidth={2}
                className="w-full h-full object-contain"
              />
            </motion.div>
          )}
        </span>
      )}
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
  underlineColor = '#A97E3E',
  circleColor = '#059669',
  ...props
}: AnimatedNavButtonProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

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
              <UnderlineShort
                color={underlineColor}
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
            <HighlightOval
              color={circleColor}
              strokeWidth={2}
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
      </span>
    </button>
  );
}
