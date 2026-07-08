import React from 'react';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ className = '', label, title, description, align = 'left', ...props }, ref) => {
    const alignmentClasses = {
      left: 'text-left items-start',
      center: 'text-center items-center',
    };

    return (
      <div
        ref={ref}
        className={`flex flex-col space-y-2 max-w-2xl ${alignmentClasses[align]} ${className}`}
        {...props}
      >
        {label && (
          <span className="text-caption font-semibold tracking-widest uppercase text-accent-gold font-body">
            {label}
          </span>
        )}
        <h2 className="text-h1 font-heading text-text-primary font-bold leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-body text-text-secondary leading-relaxed font-body mt-1">
            {description}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = 'SectionHeading';
