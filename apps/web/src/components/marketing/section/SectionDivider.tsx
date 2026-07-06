/**
 * section/SectionDivider.tsx
 *
 * Graphical divider wrapper for section boundaries.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import { SectionDividerLine } from "../shared/Decorations";

export interface SectionDividerProps {
  organic?: boolean;
  className?: string;
  color?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  organic = true,
  className,
  color,
}) => {
  return (
    <div className={cn("w-full overflow-hidden leading-[0] select-none", className)}>
      <SectionDividerLine organic={organic} color={color} />
    </div>
  );
};

export default SectionDivider;
