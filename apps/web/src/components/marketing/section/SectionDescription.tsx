/**
 * section/SectionDescription.tsx
 *
 * Secondary descriptive body text for marketing sections.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import { EditorialParagraph } from "../shared/Typography";

export interface SectionDescriptionProps {
  children: React.ReactNode;
  lead?: boolean;
  align?: "left" | "center" | "right" | "justify";
  className?: string;
}

export const SectionDescription: React.FC<SectionDescriptionProps> = ({
  children,
  lead = true,
  align = "center",
  className,
}) => {
  return (
    <EditorialParagraph
      lead={lead}
      align={align}
      className={cn(
        "max-w-2xl mx-auto mb-[var(--spacing-8)] md:mb-[var(--spacing-12)] text-[var(--muted-foreground)]",
        className
      )}
    >
      {children}
    </EditorialParagraph>
  );
};

export default SectionDescription;
