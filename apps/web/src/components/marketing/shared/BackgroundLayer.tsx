import React from 'react';
import { cn } from '@pragyaos/utils';

interface BackgroundLayerProps {
  children?: React.ReactNode;
  variant?: 'cream' | 'light' | 'dark' | 'transparent';
  className?: string;
}

const backgroundFills = {
  cream: 'bg-paper-cream text-stone-900',
  light: 'bg-paper-light text-zinc-900',
  dark: 'bg-paper-dark text-stone-100 dark',
  transparent: 'bg-transparent',
};

/**
 * BackgroundLayer establishes the backdrop layer for editorial page rows.
 * Cascades theme-specific color palettes and supports patterns or dividers.
 */
export function BackgroundLayer({
  children,
  variant = 'light',
  className,
}: BackgroundLayerProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full -z-10 transition-colors duration-normal ease-in-out',
        backgroundFills[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

export default BackgroundLayer;
