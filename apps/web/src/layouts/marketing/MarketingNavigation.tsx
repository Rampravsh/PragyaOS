/**
 * MarketingNavigation
 * apps/web/src/layouts/marketing/MarketingNavigation.tsx
 *
 * Primary horizontal navigation links for desktop.
 * Integrates with react-router-dom for pathname matching.
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { NavItem } from "./types";
import { cn } from "@pragyaos/utils";

interface MarketingNavigationProps {
  items: NavItem[];
  className?: string;
}

export const MarketingNavigation: React.FC<MarketingNavigationProps> = ({
  items,
  className,
}) => {
  const location = useLocation();

  return (
    <nav 
      className={cn("hidden md:flex items-center gap-[var(--spacing-6)]", className)}
      aria-label="Main Navigation"
    >
      <ul className="flex items-center gap-[var(--spacing-6)] list-none m-0 p-0">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          const isExternal = item.external;

          return (
            <li key={item.href}>
              {isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-[var(--text-sm)] font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "relative py-[var(--spacing-2)] text-[var(--text-sm)] font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]",
                    isActive
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--foreground)] rounded-full"
                      style={{ content: '""' }}
                    />
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MarketingNavigation;
