/**
 * shared/Buttons.tsx
 *
 * Marketing Button Component Library.
 * Reusable marketing button variants using Design System Tokens.
 */

import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@pragyaos/utils";
import type { MarketingButtonProps } from "./types";

// Base styles shared by all buttons
const baseButtonStyles =
  "inline-flex items-center justify-center font-sans font-medium rounded-[var(--radius-sm)] transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:opacity-[var(--opacity-disabled)] disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";

const sizeStyles = {
  sm: "px-[var(--spacing-3)] py-[var(--spacing-1.5)] text-[var(--text-xs)]",
  md: "px-[var(--spacing-5)] py-[var(--spacing-2.5)] text-[var(--text-sm)]",
  lg: "px-[var(--spacing-8)] py-[var(--spacing-4)] text-[var(--text-base)]",
};

const variantStyles = {
  primary:
    "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-[var(--opacity-hover)]",
  secondary:
    "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--secondary)]",
  ghost:
    "bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]",
  text:
    "p-0 bg-transparent text-[var(--foreground)] hover:text-[var(--muted-foreground)] active:scale-100 rounded-none relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-current after:transition-transform after:duration-[var(--duration-fast)] after:ease-[var(--ease-out)] hover:after:scale-x-0",
};

export const MarketingButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MarketingButtonProps
>(({ className, variant = "primary", size = "md", href, external, children, ...props }, ref) => {
  const isLink = !!href;
  const classes = cn(
    baseButtonStyles,
    variant !== "text" && sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (isLink) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        to={href}
        className={classes}
        ref={ref as React.Ref<any>}
        {...(props as any)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      ref={ref as React.Ref<HTMLButtonElement>}
      type={props.type || "button"}
      {...props}
    >
      {children}
    </button>
  );
});

MarketingButton.displayName = "MarketingButton";

// ─── HELPER WRAPPERS FOR EXPLICIT NAMING ───────────────────────────────────────────

export const MarketingPrimaryButton = forwardRef<any, Omit<MarketingButtonProps, "variant">>((props, ref) => (
  <MarketingButton {...props} variant="primary" ref={ref} />
));
MarketingPrimaryButton.displayName = "MarketingPrimaryButton";

export const MarketingSecondaryButton = forwardRef<any, Omit<MarketingButtonProps, "variant">>((props, ref) => (
  <MarketingButton {...props} variant="secondary" ref={ref} />
));
MarketingSecondaryButton.displayName = "MarketingSecondaryButton";

export const MarketingGhostButton = forwardRef<any, Omit<MarketingButtonProps, "variant">>((props, ref) => (
  <MarketingButton {...props} variant="ghost" ref={ref} />
));
MarketingGhostButton.displayName = "MarketingGhostButton";

export const MarketingTextButton = forwardRef<any, Omit<MarketingButtonProps, "variant">>((props, ref) => (
  <MarketingButton {...props} variant="text" ref={ref} />
));
MarketingTextButton.displayName = "MarketingTextButton";
