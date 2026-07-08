import React from 'react';

interface DecorationProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * PaperPlane - Tilted handdrawn flyer
 */
export function PaperPlane({ className = 'text-text-muted', ...props }: DecorationProps) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M6 24 L34 8 L24 32 L19 23 Z M19 23 L26 16 M19 23 L14 27 L11 23 M14 27 L14 31 L17 28" />
    </svg>
  );
}

/**
 * Star - Sparkle marker
 */
export function Star({ className = 'text-accent-gold', ...props }: DecorationProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 2C12.3 6.8 15.2 9.7 20 10C15.2 10.3 12.3 13.2 12 18C11.7 13.2 8.8 10.3 4 10C8.8 9.7 11.7 6.8 12 2Z" />
    </svg>
  );
}

/**
 * Leaves - Decorative leaf foliage
 */
export function Leaves({ className = 'text-text-muted', ...props }: DecorationProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M8 24C12 20 14 14 24 8C20 14 14 16 8 24Z M14 17C16 16.5 18 15.5 20 14 M11 20C12.5 19.5 14.5 18.5 16 17" />
    </svg>
  );
}

/**
 * Arrow - Direction indicator
 */
export function Arrow({ className = 'text-text-muted', ...props }: DecorationProps) {
  return (
    <svg
      width="48"
      height="32"
      viewBox="0 0 48 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M6 10 C16 4, 30 6, 40 18 M32 16 L40 18 L38 10" />
    </svg>
  );
}

/**
 * BrushMark - Handdrawn swipe doodle
 */
export function BrushMark({ className = 'text-accent-gold/25', ...props }: DecorationProps) {
  return (
    <svg
      width="120"
      height="20"
      viewBox="0 0 120 20"
      fill="currentColor"
      className={className}
      preserveAspectRatio="none"
      {...props}
    >
      <path d="M3 15c20-2.5 45-4.5 80-3 15 .5 30 2 34 3.5.5-2-.5-5-5-7C90 5.5 50 6.5 10 9c-5 .5-7 2.5-7 6z" />
    </svg>
  );
}

/**
 * PaperClip - Decorative paper clip mockup
 */
export function PaperClip({ className = 'text-stone-400', ...props }: DecorationProps) {
  return (
    <svg
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className={`rotate-[15deg] filter drop-shadow-sm ${className}`}
      {...props}
    >
      <path d="M12 4v22a6 6 0 01-12 0V10a9 9 0 0118 0v16a3 3 0 01-6 0V10" />
    </svg>
  );
}

/**
 * MaskingTape - Semi-transparent adhesive tape
 */
export function MaskingTape({ className = 'text-[#fbf0db]/55', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`w-28 h-7 bg-current border-y border-dashed border-stone-300/40 rotate-[-5deg] backdrop-blur-[1px] opacity-75 shadow-sm ${className}`}
      {...props}
    />
  );
}

/**
 * PushPin - Tilted red pin marker
 */
export function PushPin({ className = 'text-red-600', ...props }: DecorationProps) {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="currentColor"
      className={`filter drop-shadow-md rotate-12 ${className}`}
      {...props}
    >
      <path d="M10 0a3 3 0 013 3v2h2v3a1 1 0 01-1 1h-8a1 1 0 01-1-1V5h2V3a3 3 0 013-3z M4 9h12l-2 11h-8z M10 20v4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * HandwrittenNote - Small yellow lined card tilted with a handwritten quote
 */
export function HandwrittenNote({
  text = 'Keep studying, keep growing!',
  className = '',
  ...props
}: {
  text?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-4 bg-[#fdfaf2] border border-amber-200/60 rounded-sm shadow-button rotate-3 max-w-[160px] font-heading text-caption font-bold italic text-amber-900 leading-relaxed text-center ${className}`}
      {...props}
    >
      {text}
    </div>
  );
}
