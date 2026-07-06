/**
 * cards/EditorialCard.tsx
 *
 * Base card component with editorial warm paper backgrounds and interactive transitions.
 */

import React, { forwardRef } from "react";
import { cn } from "@pragyaos/utils";
import type { EditorialCardProps } from "../shared/types";

const paddingStyles = {
  none: "p-0",
  sm: "p-[var(--spacing-4)]", // 16px
  md: "p-[var(--spacing-6)] md:p-[var(--spacing-8)]", // 24px/32px
  lg: "p-[var(--spacing-10)] md:p-[var(--spacing-12)]", // 40px/48px
};

const variantStyles = {
  cream: "bg-[var(--paper-cream)] border border-[var(--border)] text-[var(--foreground)]",
  light: "bg-[var(--paper-light)] border border-[var(--border)] text-[var(--foreground)]",
  dark: "bg-[var(--paper-dark)] border border-stone-800 text-[var(--stone-100)] dark",
  transparent: "bg-transparent border border-transparent text-[var(--foreground)]",
};

const hoverStyles = {
  none: "",
  lift: "hover:-translate-y-1 hover:shadow-[var(--shadow-md)]",
  glow: "hover:border-[var(--ring)] hover:shadow-[var(--shadow-lg)]",
  zoom: "hover:scale-[1.015]",
};

export const EditorialCard = forwardRef<HTMLDivElement, EditorialCardProps>(
  (
    {
      children,
      hoverEffect = "none",
      padding = "md",
      variant = "light",
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const isClickable = !!onClick;

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "rounded-[var(--radius-md)] transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)]",
          isClickable && "cursor-pointer select-none",
          paddingStyles[padding],
          variantStyles[variant],
          hoverStyles[hoverEffect],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EditorialCard.displayName = "EditorialCard";

export default EditorialCard;
