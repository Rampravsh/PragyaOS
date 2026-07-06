/**
 * section/SectionHeading.tsx
 *
 * Section header component mapping to typography tokens.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import { EditorialHeadline } from "../shared/Typography";
import type { HeadlineSize, HeadlineLevel } from "../shared/types";

export interface SectionHeadingProps {
  children: React.ReactNode;
  level?: HeadlineLevel;
  size?: HeadlineSize;
  serif?: boolean;
  align?: "left" | "center" | "right";
  className?: string;
  id?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  level = 2,
  size = "4xl",
  serif = true,
  align = "center",
  className,
  id,
}) => {
  return (
    <EditorialHeadline
      level={level}
      size={size}
      serif={serif}
      align={align}
      id={id}
      className={cn("mb-[var(--spacing-4)] md:mb-[var(--spacing-6)]", className)}
    >
      {children}
    </EditorialHeadline>
  );
};

export default SectionHeading;
