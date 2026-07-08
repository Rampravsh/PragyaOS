import React from 'react';
import { SectionHeading } from './SectionHeading';

export interface FeatureBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  tag?: string;
  title: string;
  description: string;
  items?: string[];
  visual?: React.ReactNode;
  reversed?: boolean;
}

export const FeatureBlock = React.forwardRef<HTMLDivElement, FeatureBlockProps>(
  ({ className = '', tag, title, description, items, visual, reversed = false, ...props }, ref) => {
    const layoutDirection = reversed ? 'lg:flex-row-reverse space-x-reverse' : 'lg:flex-row';

    return (
      <div
        ref={ref}
        className={`flex flex-col lg:items-center justify-between gap-12 py-8 ${layoutDirection} ${className}`}
        {...props}
      >
        {/* Text Block */}
        <div className="flex-1 space-y-6">
          <SectionHeading label={tag} title={title} description={description} />
          
          {items && items.length > 0 && (
            <ul className="space-y-3 font-body text-body text-text-secondary">
              {items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-5 h-5 rounded bg-background-secondary border border-border text-accent-gold flex items-center justify-center mr-3 shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Visual / Image Block */}
        {visual && (
          <div className="flex-1 w-full flex items-center justify-center">
            {visual}
          </div>
        )}
      </div>
    );
  }
);

FeatureBlock.displayName = 'FeatureBlock';
