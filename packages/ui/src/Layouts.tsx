import React from "react";
import { cn } from "@pragyaos/utils";

export interface BaseComponentProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export interface SplitLayoutProps extends BaseComponentProps {
  children: React.ReactNode;
  ratio?: "1:1" | "1:2" | "2:1" | "3:2" | "2:3";
  align?: "start" | "center" | "end" | "stretch";
  gap?: "sm" | "md" | "lg" | "none";
  reverseOnMobile?: boolean;
}

export interface CenteredLayoutProps extends BaseComponentProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "none";
}

export interface FeatureGridProps extends BaseComponentProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg" | "none";
}

const gapStyles = {
  none: "gap-0",
  sm: "gap-4",
  md: "gap-6 lg:gap-8",
  lg: "gap-10 lg:gap-16",
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
    sm: "max-w-[768px]", 
    md: "max-w-[1200px]", 
    lg: "max-w-[1440px]", 
    none: "max-w-none",
  };

  return (
    <div
      id={id}
      className={cn(
        "w-full mx-auto flex flex-col items-center text-center px-4 md:px-6 lg:px-8",
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
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 items-center justify-center w-full",
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
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full",
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
    sm: "space-y-3",
    md: "space-y-4 md:space-y-6",
    lg: "space-y-8 md:space-y-12",
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
      {eyebrow && <div className="mb-3">{eyebrow}</div>}
      <div className="mb-4 md:mb-5">{heading}</div>
      {description && <div className="mb-6 md:mb-8">{description}</div>}
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
};
