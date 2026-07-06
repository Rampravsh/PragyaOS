/**
 * section/EditorialSection.tsx
 *
 * Reusable composite editorial section component.
 * Wraps content with consistent spacing, responsive grids, and decorative assets.
 */

import React, { forwardRef } from "react";
import { cn } from "@pragyaos/utils";
import { MarketingSection } from "@layouts/MarketingLayout";
import { MarketingContainer } from "@layouts/MarketingLayout";
import type { MarketingSectionVariant } from "@layouts/MarketingLayout";

export interface EditorialSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: MarketingSectionVariant;
  organicDivider?: boolean;
  containerSize?: "editorial" | "wide" | "narrow" | "full";
  paddingY?: "none" | "sm" | "md" | "lg" | "xl";
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  children,
  variant = "default",
  organicDivider = false,
  containerSize = "editorial",
  paddingY = "lg",
  className,
  ...props
}) => {
  return (
    <MarketingSection
      variant={variant}
      organicDivider={organicDivider}
      paddingY={paddingY}
      className={className}
      {...props}
    >
      <MarketingContainer variant={containerSize}>
        {children}
      </MarketingContainer>
    </MarketingSection>
  );
};

EditorialSection.displayName = "EditorialSection";

export default EditorialSection;
