import React from "react";
import { cn } from "@pragyaos/utils";
import { Sparkle, TinyStar } from "@pragyaos/assets";

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "featured" | "new";

export interface EditorialBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  interactive?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-secondary text-secondary-foreground border border-border",
  success: "bg-success/10 text-success border border-success/20",
  warning: "bg-warning/10 text-warning border border-warning/20",
  error: "bg-destructive/10 text-destructive border border-destructive/20",
  info: "bg-info/10 text-info border border-info/20",
  featured: "bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 border border-transparent",
  new: "bg-stone-100 text-stone-900 dark:bg-stone-900 dark:text-stone-100 border border-border",
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
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wider uppercase select-none transition-all duration-fast",
        interactive && "hover:opacity-hover cursor-pointer",
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
    <EditorialBadge {...props} variant="new" className={cn("pl-2", props.className)}>
      <Sparkle className="w-3 h-3 animate-pulse" color="currentColor" strokeWidth={2} />
      <span>New</span>
    </EditorialBadge>
  );
};

export const FeaturedBadge: React.FC<Omit<EditorialBadgeProps, "variant" | "children">> = (props) => {
  return (
    <EditorialBadge {...props} variant="featured" className={cn("pl-2", props.className)}>
      <TinyStar className="w-3 h-3" color="currentColor" strokeWidth={2} />
      <span>Featured</span>
    </EditorialBadge>
  );
};
