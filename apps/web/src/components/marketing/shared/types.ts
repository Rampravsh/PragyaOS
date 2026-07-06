/**
 * shared/types.ts
 *
 * Shared TypeScript definitions and interfaces for the PragyaOS Marketing Component Library.
 */

import React from "react";

// ─── UTILITY TYPES ─────────────────────────────────────────────────────────────

export interface BaseComponentProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

// ─── BUTTONS ──────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost" | "text";
export type ButtonSize = "sm" | "md" | "lg";

export interface MarketingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string; // If provided, renders an <a> anchor instead of <button>
  external?: boolean;
}

// ─── BADGES ───────────────────────────────────────────────────────────────────

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "featured" | "new";

export interface EditorialBadgeProps extends BaseComponentProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  interactive?: boolean;
}

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────

export type HeadlineLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadlineSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

export interface EditorialHeadlineProps extends BaseComponentProps {
  children: React.ReactNode;
  level?: HeadlineLevel;
  size?: HeadlineSize;
  serif?: boolean;
  align?: "left" | "center" | "right";
}

export interface EditorialParagraphProps extends BaseComponentProps {
  children: React.ReactNode;
  lead?: boolean;
  align?: "left" | "center" | "right" | "justify";
}

// ─── LAYOUTS ──────────────────────────────────────────────────────────────────

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

// ─── CARDS ────────────────────────────────────────────────────────────────────

export interface EditorialCardProps extends BaseComponentProps {
  children: React.ReactNode;
  hoverEffect?: "none" | "lift" | "glow" | "zoom";
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "cream" | "light" | "dark" | "transparent";
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface FeatureCardProps extends BaseComponentProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  badgeText?: string;
  actionText?: string;
  actionHref?: string;
}

export interface CoursePreviewCardProps extends BaseComponentProps {
  title: string;
  description?: string;
  category?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  duration?: string;
  rating?: number;
  reviewsCount?: number;
  price?: number;
  originalPrice?: number;
  thumbnailUrl?: string;
  authorName?: string;
  authorAvatarUrl?: string;
  actionHref?: string;
}
