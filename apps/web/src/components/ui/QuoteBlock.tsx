import React from 'react';
import { PaperCard } from './PaperCard';
import { Avatar } from './Avatar';

export interface QuoteBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string;
  authorName: string;
  authorTitle?: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export const QuoteBlock = React.forwardRef<HTMLDivElement, QuoteBlockProps>(
  ({ className = '', quote, authorName, authorTitle, avatarSrc, avatarFallback, ...props }, ref) => {
    return (
      <PaperCard
        ref={ref}
        variant="plain"
        className={`flex flex-col justify-between space-y-6 relative border-divider ${className}`}
        {...props}
      >
        {/* Large quotes watermark */}
        <span className="absolute top-4 left-4 text-display-xl font-heading text-accent-gold/10 pointer-events-none select-none">
          “
        </span>

        <p className="text-body font-body text-text-secondary leading-relaxed italic relative z-10 pt-4">
          {quote}
        </p>

        <div className="flex items-center space-x-3 border-t border-divider pt-4 relative z-10">
          <Avatar src={avatarSrc} fallback={avatarFallback} size="sm" alt={authorName} />
          <div className="flex flex-col">
            <span className="text-small font-semibold text-text-primary font-body">
              {authorName}
            </span>
            {authorTitle && (
              <span className="text-caption text-text-muted font-body">
                {authorTitle}
              </span>
            )}
          </div>
        </div>
      </PaperCard>
    );
  }
);

QuoteBlock.displayName = 'QuoteBlock';
