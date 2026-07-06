/**
 * shared/Typography.tsx
 *
 * Marketing Typography Component Library.
 * Implements headers, paragraphs, inline highlights, and blockquotes with layout token properties.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import { HighlightScribble, UnderlineShort } from "@pragyaos/assets";
import type { EditorialHeadlineProps, EditorialParagraphProps } from "./types";

const sizeStyles = {
  xs: "text-[var(--text-xs)]",
  sm: "text-[var(--text-sm)]",
  base: "text-[var(--text-base)]",
  md: "text-[var(--text-base)]",
  lg: "text-[var(--text-lg)]",
  xl: "text-[var(--text-xl)]",
  "2xl": "text-[var(--text-2xl)]",
  "3xl": "text-[var(--text-3xl)]",
  "4xl": "text-[var(--text-4xl)]",
  "5xl": "text-[var(--text-5xl)]",
};

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export const EditorialHeadline: React.FC<EditorialHeadlineProps> = ({
  children,
  level = 2,
  size,
  serif = true,
  align = "left",
  className,
  id,
}) => {
  const Tag = `h${level}` as React.ElementType;
  
  // Default sizes per level
  const defaultSizeMap: Record<number, keyof typeof sizeStyles> = {
    1: "5xl",
    2: "4xl",
    3: "3xl",
    4: "2xl",
    5: "xl",
    6: "lg",
  };
  const activeSize = size || defaultSizeMap[level];

  return (
    <Tag
      id={id}
      className={cn(
        "font-light tracking-tight leading-tight m-0 text-[var(--foreground)]",
        serif ? "font-serif" : "font-sans font-medium",
        sizeStyles[activeSize],
        alignStyles[align],
        className
      )}
    >
      {children}
    </Tag>
  );
};

export const EditorialTitle: React.FC<Omit<EditorialHeadlineProps, "level">> = (props) => {
  return <EditorialHeadline {...props} level={3} serif={false} className={cn("font-semibold tracking-wide uppercase", props.className)} />;
};

export const EditorialParagraph: React.FC<EditorialParagraphProps> = ({
  children,
  lead = false,
  align = "left",
  className,
  id,
}) => {
  return (
    <p
      id={id}
      className={cn(
        "font-sans leading-relaxed text-[var(--muted-foreground)] m-0",
        lead ? "text-[var(--text-lg)] font-light" : "text-[var(--text-base)]",
        alignStyles[align],
        className
      )}
    >
      {children}
    </p>
  );
};

export const EditorialCaption: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <span
      className={cn(
        "font-sans text-[var(--text-xs)] uppercase tracking-wider text-[var(--muted-foreground)]/80 font-medium",
        className
      )}
    >
      {children}
    </span>
  );
};

export const EditorialQuote: React.FC<{
  quote: string;
  author: string;
  title?: string;
  className?: string;
}> = ({ quote, author, title, className }) => {
  return (
    <blockquote className={cn("m-0 pl-[var(--spacing-6)] border-l-2 border-[var(--border)]", className)}>
      <p className="font-serif italic text-[var(--text-xl)] font-light text-[var(--foreground)] leading-relaxed mb-[var(--spacing-3)]">
        “{quote}”
      </p>
      <footer className="font-sans text-[var(--text-sm)]">
        <strong className="text-[var(--foreground)] font-semibold">{author}</strong>
        {title && <span className="text-[var(--muted-foreground)]">, {title}</span>}
      </footer>
    </blockquote>
  );
};

export const EditorialHighlight: React.FC<{
  children: React.ReactNode;
  decoration?: "scribble" | "underline" | "none";
  color?: string;
  className?: string;
}> = ({ children, decoration = "scribble", color = "currentColor", className }) => {
  return (
    <span className={cn("relative inline-block px-1", className)}>
      <span className="relative z-10">{children}</span>
      {decoration === "scribble" && (
        <HighlightScribble
          className="absolute -bottom-1.5 left-0 w-full h-[18px] text-[var(--primary)]/30 pointer-events-none z-0"
          color={color}
          strokeWidth={1.5}
        />
      )}
      {decoration === "underline" && (
        <UnderlineShort
          className="absolute -bottom-1 left-0 w-full h-2 text-[var(--primary)]/40 pointer-events-none z-0"
          color={color}
          strokeWidth={2}
        />
      )}
    </span>
  );
};
