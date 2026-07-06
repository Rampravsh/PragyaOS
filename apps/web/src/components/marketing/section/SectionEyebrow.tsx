/**
 * section/SectionEyebrow.tsx
 *
 * Section eyebrow label that is rendered above headings.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import { EditorialCaption } from "../shared/Typography";

export interface SectionEyebrowProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

const alignStyles = {
  left: "text-left block",
  center: "text-center block",
  right: "text-right block",
};

export const SectionEyebrow: React.FC<SectionEyebrowProps> = ({
  children,
  align = "center",
  className,
}) => {
  return (
    <span className={cn("block mb-[var(--spacing-2)]", alignStyles[align])}>
      <EditorialCaption className={className}>
        {children}
      </EditorialCaption>
    </span>
  );
};

export default SectionEyebrow;
