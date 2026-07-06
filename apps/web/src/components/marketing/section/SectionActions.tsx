/**
 * section/SectionActions.tsx
 *
 * Layout wrapper for actions (CTAs/buttons) inside a section.
 */

import React from "react";
import { cn } from "@pragyaos/utils";

export interface SectionActionsProps {
  children: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

const alignStyles = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

export const SectionActions: React.FC<SectionActionsProps> = ({
  children,
  align = "center",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-[var(--spacing-4)] mt-[var(--spacing-8)] md:mt-[var(--spacing-10)]",
        alignStyles[align],
        className
      )}
    >
      {children}
    </div>
  );
};

export default SectionActions;
