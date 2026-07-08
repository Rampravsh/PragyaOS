import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'gold' | 'green' | 'blue' | 'purple';
  pill?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'primary', pill = false, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center font-body font-semibold tracking-wider uppercase px-2 py-0.5 text-caption border';
    
    const variantClasses = {
      primary: 'bg-background-secondary text-text-primary border-border',
      gold: 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]',
      green: 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]',
      blue: 'bg-[#e0f2fe] text-[#075985] border-[#bae6fd]',
      purple: 'bg-[#f3e8ff] text-[#6b21a8] border-[#e9d5ff]',
    };

    const pillClass = pill ? 'rounded-pill' : 'rounded-paper';

    return (
      <span
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${pillClass} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'gold' | 'green' | 'blue' | 'purple';
  onRemove?: () => void;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className = '', variant = 'primary', onRemove, children, ...props }, ref) => {
    const indicatorColors = {
      primary: 'bg-text-muted',
      gold: 'bg-accent-gold',
      green: 'bg-success',
      blue: 'bg-info',
      purple: 'bg-accent-purple',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center font-body text-small px-3 py-1 rounded-pill bg-surface text-text-primary border border-border shadow-button ${className}`}
        {...props}
      >
        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${indicatorColors[variant]}`} />
        <span className="font-medium">{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1.5 hover:text-danger cursor-pointer transition-colors text-body font-bold line-height-none"
            aria-label="remove tag"
          >
            &times;
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
