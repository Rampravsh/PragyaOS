import React from 'react';

/**
 * SkipToContent: Accessibility helper link.
 * Allows keyboard users to bypass header navigation links and jump directly to the main content.
 * Styled to slide down and become visible only on keyboard focus.
 */
export function SkipToContent(): React.JSX.Element {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[1100] focus:px-4 focus:py-2.5 focus:bg-primary focus:text-primary-foreground focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-xs font-semibold tracking-wide uppercase transition-all"
    >
      Skip to content
    </a>
  );
}

export default SkipToContent;
