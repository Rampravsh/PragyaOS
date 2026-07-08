import React from 'react';

interface DoodleProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Hand-drawn Star Doodle
 */
export function DoodleStar({ className = 'text-accent-gold', ...props }: DoodleProps) {
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
 * Hand-drawn Paper Plane
 */
export function DoodlePaperPlane({ className = 'text-text-muted', ...props }: DoodleProps) {
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
 * Hand-drawn Leaves
 */
export function DoodleLeaves({ className = 'text-text-muted', ...props }: DoodleProps) {
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
 * Hand-drawn Underline Highlight
 */
export function DoodleUnderline({ className = 'text-accent-gold', ...props }: DoodleProps) {
  return (
    <svg
      width="120"
      height="12"
      viewBox="0 0 120 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      preserveAspectRatio="none"
      {...props}
    >
      <path d="M3 8C25 6.5 50 4 80 5.5C95 6 108 8 117 9.5 M10 10C35 8.5 70 7 110 8" />
    </svg>
  );
}

/**
 * Hand-drawn Arrow Doodle
 */
export function DoodleArrow({ className = 'text-text-muted', ...props }: DoodleProps) {
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
 * Handwritten spiral binder notebook coil
 */
export function DoodleCoil({ className = 'text-text-muted', ...props }: DoodleProps) {
  return (
    <svg
      width="16"
      height="48"
      viewBox="0 0 16 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      {...props}
    >
      <path d="M2 4 C10 4, 14 8, 14 12 C14 16, 6 18, 2 18 M2 20 C10 20, 14 24, 14 28 C14 32, 6 34, 2 34 M2 36 C10 36, 14 40, 14 44 C14 48, 6 50, 2 50" />
    </svg>
  );
}

/**
 * Hand-drawn Sketch Line divider
 */
export function DoodleSketchLine({ className = 'text-divider', ...props }: DoodleProps) {
  return (
    <svg
      width="200"
      height="8"
      viewBox="0 0 200 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={className}
      preserveAspectRatio="none"
      {...props}
    >
      <path d="M2 4 C40 2.5, 90 5.5, 140 3 C168 1.5, 185 3, 198 4" />
    </svg>
  );
}
