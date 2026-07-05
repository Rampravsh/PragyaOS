/**
 * EditorialGrid
 * apps/web/src/layouts/marketing/EditorialGrid.tsx
 *
 * CSS Grid component conforming to the design tokens for the editorial experience:
 * - Desktop: 12 columns, gutter: 1.5rem (var(--grid-desktop-gutter))
 * - Tablet: 8 columns, gutter: 1rem (var(--grid-tablet-gutter))
 * - Mobile: 4 columns, gutter: 1rem (var(--grid-mobile-gutter))
 *
 * No hardcoded dimensions. Everything derives from layout tokens.
 */

import React from "react";
import type { EditorialGridProps } from "./types";
import { cn } from "@pragyaos/utils";

const gapStyles = {
  none: "gap-0",
  sm: "gap-[var(--spacing-2)]", // 8px
  md: "gap-[var(--spacing-4)]", // 16px
  lg: "gap-[var(--spacing-8)]", // 32px
};

export const EditorialGrid: React.FC<EditorialGridProps> = ({
  children,
  className,
  gap,
}) => {
  return (
    <div
      className={cn(
        "grid w-full",
        // Mobile layout
        "grid-cols-[repeat(var(--grid-mobile-columns),minmax(0,1fr))]",
        // Tablet layout
        "md:grid-cols-[repeat(var(--grid-tablet-columns),minmax(0,1fr))]",
        // Desktop layout
        "lg:grid-cols-[repeat(var(--grid-desktop-columns),minmax(0,1fr))]",
        // Gutter tokens per breakpoint (or override gap)
        gap
          ? gapStyles[gap]
          : "gap-[var(--grid-mobile-gutter)] md:gap-[var(--grid-tablet-gutter)] lg:gap-[var(--grid-desktop-gutter)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default EditorialGrid;
