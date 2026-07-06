import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@pragyaos/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "text";
export type ButtonSize = "sm" | "md" | "lg";

export interface MarketingButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
}

const baseButtonStyles =
  "inline-flex items-center justify-center font-sans font-medium rounded-sm transition-all duration-fast ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-disabled disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-hover",
  secondary:
    "bg-transparent text-foreground border border-border hover:bg-secondary",
  ghost:
    "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
  text:
    "p-0 bg-transparent text-foreground hover:text-muted-foreground active:scale-100 rounded-none relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-current after:transition-transform after:duration-fast after:ease-out hover:after:scale-x-0",
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

export const MarketingPrimaryButton = forwardRef<HTMLButtonElement, Omit<MarketingButtonProps, "variant">>((props, ref) => (
  <MarketingButton {...props} variant="primary" ref={ref} />
));
MarketingPrimaryButton.displayName = "MarketingPrimaryButton";

export const MarketingSecondaryButton = forwardRef<HTMLButtonElement, Omit<MarketingButtonProps, "variant">>((props, ref) => (
  <MarketingButton {...props} variant="secondary" ref={ref} />
));
MarketingSecondaryButton.displayName = "MarketingSecondaryButton";

export const MarketingGhostButton = forwardRef<HTMLButtonElement, Omit<MarketingButtonProps, "variant">>((props, ref) => (
  <MarketingButton {...props} variant="ghost" ref={ref} />
));
MarketingGhostButton.displayName = "MarketingGhostButton";

export const MarketingTextButton = forwardRef<HTMLButtonElement, Omit<MarketingButtonProps, "variant">>((props, ref) => (
  <MarketingButton {...props} variant="text" ref={ref} />
));
MarketingTextButton.displayName = "MarketingTextButton";
