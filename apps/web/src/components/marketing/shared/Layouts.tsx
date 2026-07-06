/**
 * shared/Layouts.tsx
 *
 * Marketing Layout Primitives.
 * Multi-column grids and structural layouts with token-driven gutters.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import type { SplitLayoutProps, CenteredLayoutProps, FeatureGridProps } from "./types";

const gapStyles = {
  none: "gap-0",
  sm: "gap-[var(--spacing-4)]",
  md: "gap-[var(--spacing-6)] lg:gap-[var(--spacing-8)]",
  lg: "gap-[var(--spacing-10)] lg:gap-[var(--spacing-16)]",
};

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  children,
  ratio = "1:1",
  align = "center",
  gap = "md",
  reverseOnMobile = false,
  className,
  id,
}) => {
  const ratioClasses = {
    "1:1": "grid-cols-1 lg:grid-cols-2",
    "1:2": "grid-cols-1 lg:grid-cols-[1fr_2fr]",
    "2:1": "grid-cols-1 lg:grid-cols-[2fr_1fr]",
    "3:2": "grid-cols-1 lg:grid-cols-[3fr_2fr]",
    "2:3": "grid-cols-1 lg:grid-cols-[2fr_3fr]",
  };

  const alignStyles = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  return (
    <div
      id={id}
      className={cn(
        "grid w-full",
        ratioClasses[ratio],
        alignStyles[align],
        gapStyles[gap],
        reverseOnMobile && "[&>*:first-child]:order-2 lg:[&>*:first-child]:order-none",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CenteredLayout: React.FC<CenteredLayoutProps> = ({
  children,
  maxWidth = "md",
  className,
  id,
}) => {
  const maxWidthClasses = {
    sm: "max-w-[var(--container-narrow)]", // 768px
    md: "max-w-[var(--container-editorial)]", // 1200px
    lg: "max-w-[var(--container-wide)]", // 1440px
    none: "max-w-none",
  };

  return (
    <div
      id={id}
      className={cn(
        "w-full mx-auto flex flex-col items-center text-center px-[var(--grid-mobile-margin)] md:px-[var(--grid-tablet-margin)] lg:px-[var(--grid-desktop-margin)]",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  children,
  columns = 3,
  gap = "md",
  className,
  id,
}) => {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      id={id}
      className={cn("grid w-full", colClasses[columns], gapStyles[gap], className)}
    >
      {children}
    </div>
  );
};

export const LogoGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[var(--spacing-4)] md:gap-[var(--spacing-6)] items-center justify-center w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export const StatisticsGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-6)] lg:gap-[var(--spacing-8)] w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export const EditorialStack: React.FC<{
  children: React.ReactNode;
  gap?: "sm" | "md" | "lg";
  className?: string;
}> = ({ children, gap = "md", className }) => {
  const gapClasses = {
    sm: "space-y-[var(--spacing-3)]",
    md: "space-y-[var(--spacing-4)] md:space-y-[var(--spacing-6)]",
    lg: "space-y-[var(--spacing-8)] md:space-y-[var(--spacing-12)]",
  };

  return <div className={cn("flex flex-col w-full", gapClasses[gap], className)}>{children}</div>;
};

export const ContentCluster: React.FC<{
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}> = ({ eyebrow, heading, description, actions, align = "left", className }) => {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <div className={cn("flex flex-col max-w-2xl", alignClass[align], className)}>
      {eyebrow && <div className="mb-[var(--spacing-3)]">{eyebrow}</div>}
      <div className="mb-[var(--spacing-4)] md:mb-[var(--spacing-5)]">{heading}</div>
      {description && <div className="mb-[var(--spacing-6)] md:mb-[var(--spacing-8)]">{description}</div>}
      {actions && <div className="flex flex-wrap gap-[var(--spacing-3)]">{actions}</div>}
    </div>
  );
};
