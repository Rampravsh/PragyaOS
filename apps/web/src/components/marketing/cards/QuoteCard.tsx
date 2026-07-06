/**
 * cards/QuoteCard.tsx
 *
 * Testimonial quote card enclosing user details and testimonials.
 */

import React from "react";
import { cn } from "@pragyaos/utils";
import EditorialCard from "./EditorialCard";
import { EditorialQuote } from "../shared/Typography";

interface QuoteCardProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  className?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  author,
  role,
  company,
  avatarUrl,
  className,
}) => {
  return (
    <EditorialCard
      variant="cream"
      hoverEffect="lift"
      className={cn("flex flex-col justify-between items-start text-left border border-[var(--border)]", className)}
    >
      {/* Quote text wrapper */}
      <EditorialQuote
        quote={quote}
        author={author}
        title={cn(role, company && role && " at ", company)}
        className="border-none pl-0"
      />

      {/* User avatar indicator (optional) */}
      {avatarUrl && (
        <div className="flex items-center gap-[var(--spacing-3)] mt-[var(--spacing-6)]">
          <img
            src={avatarUrl}
            alt={author}
            className="w-10 h-10 rounded-full object-cover border border-[var(--border)]"
            loading="lazy"
          />
          <div className="flex flex-col">
            <span className="text-[var(--text-xs)] font-bold text-[var(--foreground)]">{author}</span>
            {role && (
              <span className="text-[var(--text-xs)] text-[var(--muted-foreground)]">
                {role} {company && `@ ${company}`}
              </span>
            )}
          </div>
        </div>
      )}
    </EditorialCard>
  );
};

export default QuoteCard;
