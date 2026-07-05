/**
 * MarketingContainer
 * apps/web/src/layouts/marketing/MarketingContainer.tsx
 *
 * Token-driven max-width container for the Marketing Experience.
 * All width values derive from CSS custom properties injected by index.css
 * which are sourced from @pragyaos/theme container tokens.
 *
 * Variants:
 *   editorial  — 1200px (container.editorial token)  ← default for most content
 *   wide       — 1440px (container.wide)             ← hero sections, full bleeds
 *   narrow     — 768px  (container.narrow)           ← prose, centered text
 *   full       — 100%   (no max-width constraint)    ← edge-to-edge backgrounds
 *
 * Horizontal padding follows the grid margin token per breakpoint:
 *   mobile:  --grid-mobile-margin   (1rem / 16px)
 *   tablet:  --grid-tablet-margin   (1.5rem / 24px)
 *   desktop: --grid-desktop-margin  (2rem / 32px)
 */

import React from "react";
import type { MarketingContainerProps } from "./types";
import { cn } from "@pragyaos/utils";

const variantStyles: Record<string, string> = {
  editorial: "max-w-[var(--container-editorial)]",
  wide:      "max-w-[var(--container-wide)]",
  narrow:    "max-w-[var(--container-narrow)]",
  full:      "max-w-none",
};

export const MarketingContainer: React.FC<MarketingContainerProps> = ({
  children,
  variant = "editorial",
  className,
  as: Tag = "div",
}) => {
  return (
    <Tag
      className={cn(
        // Centering
        "mx-auto w-full",
        // Token-driven max-width
        variantStyles[variant],
        // Token-driven horizontal padding (grid margin per breakpoint)
        "px-[var(--grid-mobile-margin)]",
        "md:px-[var(--grid-tablet-margin)]",
        "lg:px-[var(--grid-desktop-margin)]",
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default MarketingContainer;
