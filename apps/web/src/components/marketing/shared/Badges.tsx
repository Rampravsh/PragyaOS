/**
 * shared/Badges.tsx
 *
 * Marketing Badges Component Library.
 * Fully styled pill and status indicator badges conforming to layout and color tokens.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import { Sparkle, TinyStar } from "@pragyaos/assets";
import type { EditorialBadgeProps } from "./types";

const variantStyles = {
  default: "bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)]",
  success: "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/50",
  warning: "bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50",
  error: "bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-900/50",
  info: "bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-900/50",
  featured: "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 border border-transparent",
  new: "bg-stone-100 text-stone-900 dark:bg-stone-900 dark:text-stone-100 border border-[var(--border)]",
};

export const EditorialBadge: React.FC<EditorialBadgeProps> = ({
  children,
  variant = "default",
  className,
  id,
  style,
  interactive = false,
}) => {
  return (
    <span
      id={id}
      style={style}
      className={cn(
        "inline-flex items-center gap-[var(--spacing-1.5)] px-[var(--spacing-3)] py-[var(--spacing-1)] rounded-full text-[var(--text-xs)] font-sans font-semibold tracking-wider uppercase select-none transition-all duration-[var(--duration-fast)]",
        interactive && "hover:opacity-[var(--opacity-hover)] cursor-pointer",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<Omit<EditorialBadgeProps, "variant"> & { type: "success" | "warning" | "error" | "info" }> = ({
  type,
  children,
  ...props
}) => {
  return (
    <EditorialBadge {...props} variant={type}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </EditorialBadge>
  );
};

export const NewBadge: React.FC<Omit<EditorialBadgeProps, "variant" | "children">> = (props) => {
  return (
    <EditorialBadge {...props} variant="new" className={cn("pl-[var(--spacing-2)]", props.className)}>
      <Sparkle className="w-3 h-3 animate-pulse" color="currentColor" strokeWidth={2} />
      <span>New</span>
    </EditorialBadge>
  );
};

export const FeaturedBadge: React.FC<Omit<EditorialBadgeProps, "variant" | "children">> = (props) => {
  return (
    <EditorialBadge {...props} variant="featured" className={cn("pl-[var(--spacing-2)]", props.className)}>
      <TinyStar className="w-3 h-3" color="currentColor" strokeWidth={2} />
      <span>Featured</span>
    </EditorialBadge>
  );
};
