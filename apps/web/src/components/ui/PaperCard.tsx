import React from 'react';
import { motion } from 'framer-motion';
import { hoverLift } from '@/utils/motion';

export interface PaperCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'plain' | 'notebook' | 'grid';
  stack?: boolean | 2 | 3;
  interactive?: boolean;
}

export const PaperCard = React.forwardRef<HTMLDivElement, PaperCardProps>(
  ({ className = '', variant = 'plain', stack = false, interactive = false, children, ...props }, ref) => {
    const baseClasses = 'bg-surface text-text-primary border border-border p-6 rounded-paper shadow-card';
    
    const paperClasses = {
      plain: '',
      notebook: 'paper-notebook',
      grid: 'paper-grid',
    };

    const stackClasses = {
      0: '',
      2: 'paper-stack-2',
      3: 'paper-stack-3',
    };

    const stackVal = stack === true ? 2 : stack === false ? 0 : stack;
    const finalClasses = `${baseClasses} ${paperClasses[variant]} ${stackClasses[stackVal as 0 | 2 | 3]} ${className}`;

    if (interactive) {
      return (
        <motion.div
          ref={ref as any}
          variants={hoverLift}
          whileHover="hover"
          className={`${finalClasses} cursor-pointer transition-shadow`}
          {...(props as any)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={finalClasses} {...props}>
        {children}
      </div>
    );
  }
);

PaperCard.displayName = 'PaperCard';

/**
 * Feature Card - A card to highlight key features or sections
 */
interface FeatureCardProps extends Omit<PaperCardProps, 'title'> {
  icon?: React.ReactNode;
  tag?: string;
  title: string;
  description: string;
}

export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ icon, tag, title, description, className = '', ...props }, ref) => {
    return (
      <PaperCard
        ref={ref}
        className={`flex flex-col space-y-3 ${className}`}
        {...props}
      >
        {icon && (
          <div className="w-10 h-10 flex items-center justify-center rounded-paper bg-background-secondary border border-border text-accent-gold shadow-button">
            {icon}
          </div>
        )}
        {tag && (
          <span className="text-caption font-semibold tracking-wider uppercase text-accent-gold">
            {tag}
          </span>
        )}
        <h3 className="text-h3 font-heading text-text-primary font-bold">
          {title}
        </h3>
        <p className="text-small text-text-secondary leading-relaxed">
          {description}
        </p>
      </PaperCard>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

/**
 * Stat Card - Editorial card to show a single key number/metric
 */
interface StatCardProps extends PaperCardProps {
  value: string;
  label: string;
  description?: string;
  indicator?: React.ReactNode;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ value, label, description, indicator, className = '', ...props }, ref) => {
    return (
      <PaperCard
        ref={ref}
        className={`flex flex-col justify-between ${className}`}
        {...props}
      >
        <div className="flex justify-between items-start">
          <span className="text-caption font-semibold uppercase tracking-wider text-text-muted">
            {label}
          </span>
          {indicator}
        </div>
        <div className="my-3">
          <span className="text-display-lg font-heading text-text-primary font-bold">
            {value}
          </span>
        </div>
        {description && (
          <div className="border-t border-divider pt-2 text-caption text-text-secondary">
            {description}
          </div>
        )}
      </PaperCard>
    );
  }
);

StatCard.displayName = 'StatCard';
