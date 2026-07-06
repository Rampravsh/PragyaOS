/**
 * section/SectionBackground.tsx
 *
 * Background layer for marketing sections, adding dots or grids.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import { GridPatternBackground } from "../shared/Decorations";

export interface SectionBackgroundProps {
  dots?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const SectionBackground: React.FC<SectionBackgroundProps> = ({
  dots = false,
  className,
  children,
}) => {
  return (
    <div className={cn("absolute inset-0 z-0 pointer-events-none select-none", className)}>
      <GridPatternBackground dots={dots} />
      {children}
    </div>
  );
};

export default SectionBackground;
