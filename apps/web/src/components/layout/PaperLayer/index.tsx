import React from 'react';
import { DoodleCoil } from '@/components/ui/Doodles';

export interface PaperLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'plain' | 'notebook' | 'grid';
  shadow?: 'none' | 'small' | 'large' | 'floating' | 'sticky';
  border?: boolean;
}

export const PaperLayer = React.forwardRef<HTMLDivElement, PaperLayerProps>(
  ({ className = '', variant = 'plain', shadow = 'small', border = true, children, ...props }, ref) => {
    const paperClasses = {
      plain: 'bg-surface',
      notebook: 'paper-notebook',
      grid: 'paper-grid',
    };

    const shadowClasses = {
      none: '',
      small: 'shadow-paper',
      large: 'shadow-card',
      floating: 'shadow-paper-floating',
      sticky: 'shadow-sticky-note',
    };

    const borderClass = border ? 'border border-border' : '';
    const finalClasses = `${paperClasses[variant]} ${shadowClasses[shadow]} ${borderClass} rounded-paper p-6 ${className}`;

    return (
      <div ref={ref} className={finalClasses} {...props}>
        {children}
      </div>
    );
  }
);

PaperLayer.displayName = 'PaperLayer';

/**
 * PaperStack - Simulates overlapping sheets of paper
 */
export interface PaperStackProps extends React.HTMLAttributes<HTMLDivElement> {
  layers?: 2 | 3;
}

export const PaperStack = React.forwardRef<HTMLDivElement, PaperStackProps>(
  ({ className = '', layers = 2, children, ...props }, ref) => {
    const stackClass = layers === 3 ? 'paper-stack-3' : 'paper-stack-2';
    return (
      <div ref={ref} className={`${stackClass} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

PaperStack.displayName = 'PaperStack';

/**
 * PaperBackground - Simple layout backdrop with lined notebook paper details
 */
export function PaperBackground({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`paper-notebook min-h-screen w-full ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * PaperSeparator - Cut or jagged separator border
 */
export function PaperSeparator({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`w-full h-2 border-b-2 border-dashed border-divider my-8 ${className}`} {...props} />
  );
}

/**
 * NotebookSection - A layout card that has spiral binding loops at the left edge
 */
export interface NotebookSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'lined' | 'grid' | 'blank';
}

export const NotebookSection = React.forwardRef<HTMLDivElement, NotebookSectionProps>(
  ({ className = '', variant = 'lined', children, ...props }, ref) => {
    const paperVariant = variant === 'lined' ? 'notebook' : variant === 'grid' ? 'grid' : 'plain';
    
    return (
      <div className="relative pl-8 select-none">
        {/* Left spiral coil binding */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col space-y-1 z-10 select-none">
          <DoodleCoil className="text-text-muted/60 h-28" />
          <DoodleCoil className="text-text-muted/60 h-28 hidden sm:block" />
        </div>
        <PaperLayer
          ref={ref}
          variant={paperVariant}
          shadow="large"
          className={`border-l-4 border-l-border/60 ${className}`}
          {...props}
        >
          {children}
        </PaperLayer>
      </div>
    );
  }
);

NotebookSection.displayName = 'NotebookSection';

/**
 * StickySection - A larger content section styled like a sticky note, pinned at the top
 */
export interface StickySectionProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'yellow' | 'green' | 'blue';
  decor?: 'pin' | 'tape' | 'none';
}

export const StickySection = React.forwardRef<HTMLDivElement, StickySectionProps>(
  ({ className = '', color = 'yellow', decor = 'tape', children, ...props }, ref) => {
    const colorClasses = {
      yellow: 'bg-[#fef9c3] text-[#451a03] border border-[#fef08a]',
      green: 'bg-[#dcfce7] text-[#064e3b] border border-[#bbf7d0]',
      blue: 'bg-[#e0f2fe] text-[#0c4a6e] border border-[#bae6fd]',
    };

    const decorClasses = {
      none: '',
      tape: 'decor-tape',
      pin: 'decor-pin',
    };

    return (
      <div
        ref={ref}
        className={`p-8 shadow-sticky-note rounded-sm relative ${colorClasses[color]} ${decorClasses[decor]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StickySection.displayName = 'StickySection';
