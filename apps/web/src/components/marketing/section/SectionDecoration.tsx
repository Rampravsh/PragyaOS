/**
 * section/SectionDecoration.tsx
 *
 * Positioned ornamental elements for public sections.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import { ScribbleOrnament, SparkleOrnament, BurstOrnament } from "../shared/Decorations";

export type DecorationType = "scribble" | "sparkle" | "burst";

export interface SectionDecorationProps {
  type?: DecorationType;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-left" | "center-right";
  color?: string;
  opacity?: number;
  animate?: boolean;
  className?: string;
}

const positionStyles = {
  "top-left": "absolute top-[var(--spacing-8)] left-[var(--spacing-8)]",
  "top-right": "absolute top-[var(--spacing-8)] right-[var(--spacing-8)]",
  "bottom-left": "absolute bottom-[var(--spacing-8)] left-[var(--spacing-8)]",
  "bottom-right": "absolute bottom-[var(--spacing-8)] right-[var(--spacing-8)]",
  "center-left": "absolute top-1/2 left-[var(--spacing-6)] -translate-y-1/2",
  "center-right": "absolute top-1/2 right-[var(--spacing-6)] -translate-y-1/2",
};

export const SectionDecoration: React.FC<SectionDecorationProps> = ({
  type = "scribble",
  position = "top-right",
  color,
  opacity,
  animate = true,
  className,
}) => {
  const commonProps = {
    color,
    opacity,
    animate,
    className: cn(positionStyles[position], className),
  };

  if (type === "sparkle") {
    return <SparkleOrnament {...commonProps} />;
  }

  if (type === "burst") {
    return <BurstOrnament {...commonProps} />;
  }

  return <ScribbleOrnament {...commonProps} />;
};

export default SectionDecoration;
