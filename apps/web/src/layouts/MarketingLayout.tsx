/**
 * MarketingLayout
 * apps/web/src/layouts/MarketingLayout.tsx
 *
 * Core layout shell for all public marketing pages of PragyaOS.
 * Provides the persistent shell including header, skip-to-content accessibility anchor,
 * main slot, footer, and ambient background doodles/grids.
 *
 * Usage:
 *   import MarketingLayout from "@layouts/MarketingLayout";
 *   
 *   export default function LandingPage() {
 *     return (
 *       <MarketingLayout>
 *         <HeroSection />
 *       </MarketingLayout>
 *     );
 *   }
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import { CornerDoodles, TinyCrossPattern } from "@pragyaos/assets";
import MarketingHeader from "./marketing/MarketingHeader";
import MarketingFooter from "./marketing/MarketingFooter";
import type { NavItem, FooterColumn } from "./marketing/types";

// Standard navigation items for the PragyaOS public pages
const defaultNavItems: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Course Catalog", href: "/catalog" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export interface MarketingLayoutProps {
  children: React.ReactNode;
  navItems?: NavItem[];
  footerColumns?: FooterColumn[];
  dark?: boolean;
  className?: string;
}

export const MarketingLayout: React.FC<MarketingLayoutProps> = ({
  children,
  navItems = defaultNavItems,
  footerColumns,
  dark = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col relative selection:bg-[var(--foreground)] selection:text-[var(--background)]",
        dark ? "dark bg-[var(--paper-dark)] text-[var(--stone-100)]" : "bg-[var(--background)] text-[var(--foreground)]",
        className
      )}
    >
      {/* Skip-to-content accessibility link */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Background ambient decorations (Grid and Corner Doodles) */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden z-[var(--z-base)]"
        aria-hidden="true"
      >
        {/* Subtle cross pattern overlay */}
        <TinyCrossPattern
          className="absolute inset-0 opacity-[0.03] text-[var(--foreground)]"
          color="currentColor"
        />

        {/* Ambient Corner Doodles (Ellipsus-inspired imperfect white/black pen strokes) */}
        <CornerDoodles
          className="absolute top-0 left-0 w-[200px] h-[200px] opacity-[0.08] text-[var(--foreground)]"
          color="currentColor"
        />
        <CornerDoodles
          className="absolute top-0 right-0 w-[200px] h-[200px] opacity-[0.08] text-[var(--foreground)] rotate-90"
          color="currentColor"
        />
      </div>

      {/* Sticky Header Nav */}
      <MarketingHeader items={navItems} />

      {/* Primary Main Content */}
      <main
        id="main-content"
        className="flex-grow relative z-10 focus:outline-none"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* Persistent Footer */}
      <MarketingFooter columns={footerColumns} />
    </div>
  );
};

export default MarketingLayout;
export * from "./marketing/types";
export { MarketingContainer } from "./marketing/MarketingContainer";
export { MarketingSection } from "./marketing/MarketingSection";
export { EditorialGrid } from "./marketing/EditorialGrid";
export { MarketingHeader } from "./marketing/MarketingHeader";
export { MarketingNavigation } from "./marketing/MarketingNavigation";
export { MobileNav } from "./marketing/MobileNav";
export { MarketingFooter } from "./marketing/MarketingFooter";
export { defaultFooterColumns } from "./marketing/MarketingFooter";
export { ResponsiveNavigation } from "./marketing/ResponsiveNavigation";
