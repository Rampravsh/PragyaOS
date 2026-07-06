import React from 'react';
import { NavLink } from 'react-router';
import { cn } from '@pragyaos/utils';

export interface NavItem {
  label: string;
  href: string;
}

export const MARKETING_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

/**
 * MarketingNavigation: Desktop horizontal navigation list.
 * Displays simple, premium text links with subtle interaction highlights.
 */
export function MarketingNavigation(): React.JSX.Element {
  return (
    <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
      <ul className="flex items-center gap-6 list-none m-0 p-0">
        {MARKETING_NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'text-xs font-sans font-medium tracking-wide uppercase transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
                  isActive
                    ? 'text-foreground font-semibold border-b border-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MarketingNavigation;
