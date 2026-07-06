/**
 * shared/Decorations.tsx
 *
 * Reusable marketing decoration wrappers.
 * Integrates direct vector designs from @pragyaos/assets and wraps them with:
 * - Layout positions and constraints
 * - Hover or scroll-linked micro-animations
 * - HSL themed stroke settings
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import {
  FloatingScribble,
  PageDivider,
  OrganicDivider,
  EdgeDoodles,
  CornerDoodles,
  Sparkle,
  BurstStar,
  HandDotGrid,
  EditorialGrid
} from "@pragyaos/assets";

interface DecorationProps {
  className?: string;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  animate?: boolean;
}

export const ScribbleOrnament: React.FC<DecorationProps> = ({
  className,
  color = "currentColor",
  opacity = 0.4,
  strokeWidth = 1.5,
  animate = true,
}) => {
  return (
    <FloatingScribble
      className={cn(
        "pointer-events-none transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)]",
        animate && "animate-[bounce_6s_infinite_ease-in-out]",
        className
      )}
      color={color}
      opacity={opacity}
      strokeWidth={strokeWidth}
    />
  );
};

export const SparkleOrnament: React.FC<DecorationProps> = ({
  className,
  color = "currentColor",
  opacity = 0.6,
  strokeWidth = 1.5,
  animate = true,
}) => {
  return (
    <Sparkle
      className={cn(
        "pointer-events-none transition-transform duration-[var(--duration-slow)]",
        animate && "animate-spin [animation-duration:12s]",
        className
      )}
      color={color}
      opacity={opacity}
      strokeWidth={strokeWidth}
    />
  );
};

export const BurstOrnament: React.FC<DecorationProps> = ({
  className,
  color = "currentColor",
  opacity = 0.5,
  strokeWidth = 1.2,
}) => {
  return (
    <BurstStar
      className={cn("pointer-events-none", className)}
      color={color}
      opacity={opacity}
      strokeWidth={strokeWidth}
    />
  );
};

export const SectionDividerLine: React.FC<{ organic?: boolean; className?: string; color?: string }> = ({
  organic = true,
  className,
  color = "currentColor",
}) => {
  if (organic) {
    return (
      <OrganicDivider
        className={cn("w-full h-auto text-[var(--border)] leading-[0]", className)}
        color={color}
        opacity={0.8}
        strokeWidth={1}
      />
    );
  }
  return (
    <PageDivider
      className={cn("w-full h-auto text-[var(--border)] leading-[0]", className)}
      color={color}
      opacity={0.8}
    />
  );
};

export const GridPatternBackground: React.FC<{ className?: string; dots?: boolean }> = ({
  className,
  dots = false,
}) => {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden z-0 select-none", className)}>
      {dots ? (
        <HandDotGrid className="w-full h-full opacity-[0.03] text-[var(--foreground)]" color="currentColor" />
      ) : (
        <EditorialGrid className="w-full h-full opacity-[0.03] text-[var(--foreground)]" color="currentColor" />
      )}
    </div>
  );
};

export const FrameDoodles: React.FC<{ className?: string; edges?: boolean }> = ({
  className,
  edges = false,
}) => {
  return (
    <div className={cn("absolute inset-0 pointer-events-none z-0", className)}>
      {edges ? (
        <EdgeDoodles className="w-full h-full opacity-[0.08] text-[var(--foreground)]" color="currentColor" />
      ) : (
        <CornerDoodles className="w-full h-full opacity-[0.08] text-[var(--foreground)]" color="currentColor" />
      )}
    </div>
  );
};
