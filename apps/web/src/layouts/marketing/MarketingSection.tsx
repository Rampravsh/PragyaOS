/**
 * MarketingSection
 * apps/web/src/layouts/marketing/MarketingSection.tsx
 *
 * Section wrapper for layout pages. Standardizes:
 * - Vertical spacing (padding-y) driven by editorialLayout sectionPaddingY
 * - Contextual backgrounds (light cream, muted, dark charcoal)
 * - Transitions and accessibility parameters
 * - Optional organic divider bottom decorations from @pragyaos/assets
 */

import React from "react";
import type { MarketingSectionProps } from "./types";
import { cn } from "@pragyaos/utils";
import { OrganicDivider } from "@pragyaos/assets";

const backgroundStyles = {
  default: "bg-[var(--background)] text-[var(--foreground)]",
  muted: "bg-[var(--muted)] text-[var(--foreground)]",
  dark: "bg-[var(--paper-dark)] text-[var(--stone-100)] dark",
  transparent: "bg-transparent text-[var(--foreground)]",
};

const paddingStyles = {
  none: "py-0",
  sm: "py-[var(--spacing-6)]", // 24px
  md: "py-[var(--spacing-10)]", // 40px
  lg: "py-[var(--editorial-section-padding-y)]", // 80px / 5rem
  xl: "py-[var(--spacing-20)]", // 80px
};

export const MarketingSection: React.FC<MarketingSectionProps> = ({
  children,
  variant = "default",
  organicDivider = false,
  className,
  id,
  paddingY = "lg",
  "aria-label": ariaLabel,
}) => {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative w-full overflow-hidden transition-colors duration-[var(--duration-normal)] ease-[var(--ease-in-out)]",
        backgroundStyles[variant],
        paddingStyles[paddingY],
        className
      )}
    >
      {children}

      {organicDivider && (
        <div 
          className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0] pointer-events-none translate-y-[1px]"
          aria-hidden="true"
        >
          <OrganicDivider 
            className="w-full h-auto text-[var(--background)]"
            color="currentColor"
            opacity={1}
            strokeWidth={1}
          />
        </div>
      )}
    </section>
  );
};

export default MarketingSection;
