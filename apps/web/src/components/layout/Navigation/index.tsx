import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, Link, LinkProps } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export interface NavigationItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * NavigationItem - Custom NavLink wrapping routing highlights
 */
export const NavigationItem = React.forwardRef<HTMLAnchorElement, NavigationItemProps>(
  ({ to, children, onClick, className = '' }, ref) => {
    return (
      <NavLink
        ref={ref}
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          `relative font-body text-navigation font-semibold text-text-primary hover:text-accent-gold transition-colors py-1.5 px-0.5 group cursor-pointer ${
            isActive ? 'text-accent-gold' : ''
          } ${className}`
        }
      >
        {({ isActive }) => (
          <>
            {children}
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-accent-gold transform origin-left transition-transform duration-200 ease-out ${
                isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </>
        )}
      </NavLink>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

/**
 * NavigationGroup - Organizes links under a header label
 */
export interface NavigationGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function NavigationGroup({ label, children, className = '' }: NavigationGroupProps) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <span className="text-caption font-semibold tracking-wider text-text-muted uppercase px-3">
        {label}
      </span>
      <div className="flex flex-col space-y-1">
        {children}
      </div>
    </div>
  );
}

/**
 * NavigationDropdown - A keyboard-accessible nested menu
 */
export interface NavigationDropdownProps {
  label: string;
  items: { label: string; to: string }[];
  className?: string;
}

export function NavigationDropdown({ label, items, className = '' }: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown when location route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle keyboard esc close
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const isChildActive = items.some(item => location.pathname === item.to);

  return (
    <div
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      className={`relative inline-block ${className}`}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center space-x-1 font-body text-navigation font-semibold text-text-primary hover:text-accent-gold transition-colors py-1.5 px-0.5 cursor-pointer ${
          isChildActive ? 'text-accent-gold' : ''
        }`}
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-48 bg-surface border border-border rounded-paper shadow-dropdown z-50 p-1.5"
            role="menu"
          >
            {items.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.to}
                role="menuitem"
                className={({ isActive }) =>
                  `block px-3 py-2 text-small font-semibold rounded-paper font-body transition-colors ${
                    isActive
                      ? 'bg-background text-accent-gold'
                      : 'text-text-primary hover:bg-background-secondary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface FooterLinkProps extends LinkProps {
  className?: string;
}

export const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={`font-body text-small text-text-muted hover:text-background-secondary transition-colors cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

FooterLink.displayName = 'FooterLink';
