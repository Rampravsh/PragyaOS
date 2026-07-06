import React from 'react';
import {
  EditorialHeadline,
  EditorialTitle as PrimitiveTitle,
  EditorialParagraph as PrimitiveParagraph,
  EditorialCaption as PrimitiveCaption,
  EditorialQuote as PrimitiveQuote,
  EditorialHighlight as PrimitiveHighlight,
} from '@pragyaos/ui';
import { cn } from '@pragyaos/utils';

// Re-export high-quality highlight helper directly
export const EditorialHighlight = PrimitiveHighlight;

/**
 * EditorialDisplay: Large display h1 heading for marketing page headings.
 * Renders Outfit font weight 300, 5xl text.
 */
export function EditorialDisplay({
  children,
  className,
  id,
  serif = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  serif?: boolean;
}): React.JSX.Element {
  return (
    <EditorialHeadline
      level={1}
      size="5xl"
      serif={serif}
      className={cn('tracking-tight font-light', className)}
      id={id}
    >
      {children}
    </EditorialHeadline>
  );
}

/**
 * EditorialHeading: Standard section h2 heading.
 * Renders 4xl text, font-light.
 */
export function EditorialHeading({
  children,
  className,
  id,
  serif = true,
  level = 2,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  serif?: boolean;
  level?: 2 | 3;
}): React.JSX.Element {
  return (
    <EditorialHeadline
      level={level}
      size={level === 2 ? '4xl' : '3xl'}
      serif={serif}
      className={cn('tracking-tight font-light', className)}
      id={id}
    >
      {children}
    </EditorialHeadline>
  );
}

/**
 * EditorialTitle: Capitalized, tracking-wide sans subheadings.
 */
export function EditorialTitle({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}): React.JSX.Element {
  return (
    <PrimitiveTitle className={className} id={id}>
      {children}
    </PrimitiveTitle>
  );
}

/**
 * EditorialParagraph: Clean copy wrapper, optional lead setting.
 */
export function EditorialParagraph({
  children,
  lead = false,
  align = 'left',
  className,
  id,
}: {
  children: React.ReactNode;
  lead?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
  id?: string;
}): React.JSX.Element {
  return (
    <PrimitiveParagraph lead={lead} align={align} className={className} id={id}>
      {children}
    </PrimitiveParagraph>
  );
}

/**
 * EditorialCaption: Small labels or markers.
 */
export function EditorialCaption({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  return <PrimitiveCaption className={className}>{children}</PrimitiveCaption>;
}

/**
 * EditorialQuote: Blockquote with border-left accent.
 */
export function EditorialQuote({
  quote,
  author,
  title,
  className,
}: {
  quote: string;
  author: string;
  title?: string;
  className?: string;
}): React.JSX.Element {
  return (
    <PrimitiveQuote
      quote={quote}
      author={author}
      title={title}
      className={className}
    />
  );
}
