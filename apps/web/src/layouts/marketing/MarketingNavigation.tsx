import React, { useState, useRef } from 'react';
import { cn } from '@pragyaos/utils';
import { AnimatedNavLink, AnimatedNavButton } from '@/components/marketing/shared/AnimatedNavLink';

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  color: string;
  circleColor: string;
}

export const MARKETING_NAV_ITEMS: NavItem[] = [
  { label: 'Courses', href: '/courses', color: '#059669', circleColor: '#059669' },
  { label: 'For Instructors', href: '/instructors', color: '#D97706', circleColor: '#D97706' },
  { label: 'Features', href: '/features', color: '#2563EB', circleColor: '#2563EB' },
  { label: 'Pricing', href: '/pricing', color: '#7C3AED', circleColor: '#7C3AED' },
  { label: 'Resources', href: '/resources', hasDropdown: true, color: '#A97E3E', circleColor: '#A97E3E' },
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
                  <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-stone-200 rounded-lg shadow-lg py-1.5 z-50">
                    {['Documentation', 'Help Center', 'Blog', 'Community'].map((r) => (
                      <a
                        key={r}
                        href={`/resources/${r.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-[#1C1917]/70 hover:text-[#1C1917] hover:bg-stone-50 transition-colors"
                      >
                        {r}
                      </a>
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

