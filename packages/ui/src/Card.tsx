import React, { forwardRef } from "react";
import { cn } from "@pragyaos/utils";

export interface EditorialCardProps {
  children: React.ReactNode;
  hoverEffect?: "none" | "lift" | "glow" | "zoom";
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "cream" | "light" | "dark" | "transparent";
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const paddingStyles: Record<Required<EditorialCardProps>["padding"], string> = {
  none: "p-0",
  sm: "p-4", // 16px
  md: "p-6 md:p-8", // 24px/32px
  lg: "p-10 md:p-12", // 40px/48px
};

const variantStyles: Record<Required<EditorialCardProps>["variant"], string> = {
  cream: "bg-paper-cream border border-border text-foreground",
  light: "bg-paper-light border border-border text-foreground",
  dark: "bg-paper-dark border border-stone-800 text-stone-100 dark",
  transparent: "bg-transparent border border-transparent text-foreground",
};

const hoverStyles: Record<Required<EditorialCardProps>["hoverEffect"], string> = {
  none: "",
  lift: "hover:-translate-y-1 hover:shadow-md",
  glow: "hover:border-ring hover:shadow-lg",
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
          "rounded-md transition-all duration-normal ease-out",
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
