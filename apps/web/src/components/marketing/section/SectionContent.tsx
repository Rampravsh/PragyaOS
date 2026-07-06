/**
 * section/SectionContent.tsx
 *
 * Inner content slot container for section layout.
 */

import React from "react";
import { cn } from "@pragyaos/utils";

export interface SectionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionContent: React.FC<SectionContentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("relative z-10 w-full", className)}>
      {children}
    </div>
  );
};

export default SectionContent;
