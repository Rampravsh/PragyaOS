import React, { useState, useRef } from 'react';
import { cn } from '@pragyaos/utils';
import {
  AnimatedNavLink,
  AnimatedNavButton,
  UnderlineVariant,
  CircleVariant
} from '@/components/marketing/shared/AnimatedNavLink';

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  color?: string;
  circleColor?: string;
  underlineVariant?: UnderlineVariant;
  circleVariant?: CircleVariant;
}

export const MARKETING_NAV_ITEMS: NavItem[] = [
  { label: 'Courses', href: '/courses', underlineVariant: 'short', circleVariant: 'random' },
  { label: 'For Instructors', href: '/instructors', underlineVariant: 'double', circleVariant: 'random' },
  { label: 'Features', href: '/features', underlineVariant: 'short', circleVariant: 'random' },
  { label: 'Pricing', href: '/pricing', underlineVariant: 'double', circleVariant: 'random' },
  { label: 'Resources', href: '/resources', hasDropdown: true, underlineVariant: 'short', circleVariant: 'random' },
];

/**
 * MarketingNavigation: Desktop horizontal navigation matching the design.
 * Links: Courses | For Instructors | Features | Pricing | Resources ↓
 */
export function MarketingNavigation(): React.JSX.Element {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLLIElement>(null);

  return (
    <nav className="hidden lg:flex items-center gap-0" aria-label="Main navigation">
      <ul className="flex items-center list-none m-0 p-0">
        {MARKETING_NAV_ITEMS.map((item) => {
          if (item.hasDropdown) {
            return (
              <li key={item.label} ref={resourcesRef} className="relative">
                <AnimatedNavButton
                  isActive={resourcesOpen}
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  onBlur={() => setTimeout(() => setResourcesOpen(false), 150)}
                  underlineColor={item.color}
                  circleColor={item.circleColor}
                  underlineVariant={item.underlineVariant}
                  circleVariant={item.circleVariant}
                  aria-haspopup="true"
                  aria-expanded={resourcesOpen}
                  className="flex items-center"
                >
                  {item.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className={cn('transition-transform duration-150', resourcesOpen ? 'rotate-180' : '')}
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </AnimatedNavButton>
                {resourcesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg shadow-lg py-1.5 z-50">
                    {['Documentation', 'Help Center', 'Blog', 'Community'].map((r) => (
                      <AnimatedNavLink
                        key={r}
                        to={`/resources/${r.toLowerCase()}`}
                        underlineVariant="random"
                        circleVariant="random"
                        className="block px-4 py-2 text-sm font-sans font-medium"
                        activeClassName="text-[#1C1917] dark:text-white font-semibold"
                        inactiveClassName="text-[#1C1917]/70 hover:text-[#1C1917] dark:text-stone-400 dark:hover:text-stone-200"
                      >
                        {r}
                      </AnimatedNavLink>
                    ))}
                  </div>
                )}
              </li>
            );
          }

          return (
            <li key={item.label}>
              <AnimatedNavLink
                to={item.href}
                underlineColor={item.color}
                circleColor={item.circleColor}
                underlineVariant={item.underlineVariant}
                circleVariant={item.circleVariant}
              >
                {item.label}
              </AnimatedNavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MarketingNavigation;

