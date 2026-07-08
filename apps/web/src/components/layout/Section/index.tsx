import React from 'react';
import { Container, ContainerProps } from '../Container';
import { ScrollReveal } from '../ScrollReveal';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bg?: 'cream' | 'white' | 'dark';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  paper?: 'none' | 'notebook' | 'grid';
  overlap?: boolean;
  dividerTop?: 'cream' | 'dark' | 'none';
  dividerBottom?: 'cream' | 'dark' | 'none';
  reveal?: boolean;
  containerWidth?: ContainerProps['width'];
}

const CreamTornTopPath = 'M0,12 L1200,12 L1200,8 L1182,10 L1164,4 L1146,8 L1128,6 L1110,10 L1092,4 L1074,8 L1056,6 L1038,10 L1020,4 L1002,8 L984,6 L966,10 L948,4 L930,8 L912,6 L894,10 L876,4 L858,8 L840,6 L822,10 L804,4 L786,8 L768,6 L750,10 L732,4 L714,8 L696,6 L678,10 L660,4 L642,8 L624,6 L606,10 L588,4 L570,8 L552,6 L534,10 L516,4 L498,8 L480,6 L462,10 L444,4 L426,8 L408,6 L390,10 L372,4 L354,8 L336,6 M336,6 L318,10 L300,4 L282,8 L264,6 L246,10 L228,4 L210,8 L192,6 L174,10 L156,4 L138,8 L120,6 L102,10 L84,4 L66,8 L48,6 L30,10 L12,4 L0,8 Z';
const CreamTornBottomPath = 'M0,0 L1200,0 L1200,4 L1182,2 L1164,8 L1146,4 L1128,6 L1110,2 L1092,8 L1074,4 L1056,6 L1038,2 L1020,8 L1002,4 L984,6 L966,2 L948,8 L930,4 L912,6 L894,2 L876,8 L858,4 L840,6 L822,2 L804,8 L786,4 L768,6 L750,2 L732,8 L714,4 L696,6 L678,2 L660,8 L642,4 L624,6 L606,2 L588,8 L570,4 L552,6 L534,2 L516,8 L498,4 L480,6 L462,2 L444,8 L426,4 L408,6 L390,2 L372,8 L354,4 L336,6 M336,6 L318,2 L300,8 L282,4 L264,6 L246,2 L228,8 L210,4 L192,6 L174,2 L156,8 L138,4 L120,6 L102,2 L84,8 L66,4 L48,6 L30,2 L12,8 L0,4 Z';

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className = '',
      bg = 'cream',
      spacing = 'md',
      paper = 'none',
      overlap = false,
      dividerTop = 'none',
      dividerBottom = 'none',
      reveal = false,
      containerWidth,
      children,
      ...props
    },
    ref
  ) => {
    const bgClasses = {
      cream: 'bg-background text-text-primary',
      white: 'bg-surface text-text-primary',
      dark: 'bg-paper-dark text-background-secondary',
    };

    const spacingClasses = {
      none: 'py-0',
      sm: 'py-8 md:py-12',
      md: 'py-16 md:py-24',
      lg: 'py-28 md:py-36',
    };

    const paperClasses = {
      none: '',
      notebook: 'paper-notebook',
      grid: 'paper-grid',
    };

    const overlapClasses = overlap ? '-mt-12 relative z-10' : 'relative';
    const finalClasses = `${bgClasses[bg]} ${spacingClasses[spacing]} ${paperClasses[paper]} ${overlapClasses} ${className}`;

    const renderTornTop = () => {
      if (dividerTop === 'none') return null;
      const colorClass = dividerTop === 'cream' ? 'text-background' : 'text-paper-dark';
      return (
        <div className={`absolute top-0 left-0 right-0 h-4 overflow-hidden -translate-y-[90%] z-20 pointer-events-none ${colorClass}`}>
          <svg viewBox="0 0 1200 12" preserveAspectRatio="none" className="w-full h-full fill-current">
            <path d={CreamTornTopPath} />
          </svg>
        </div>
      );
    };

    const renderTornBottom = () => {
      if (dividerBottom === 'none') return null;
      const colorClass = dividerBottom === 'cream' ? 'text-background' : 'text-paper-dark';
      return (
        <div className={`absolute bottom-0 left-0 right-0 h-4 overflow-hidden translate-y-[90%] z-20 pointer-events-none ${colorClass}`}>
          <svg viewBox="0 0 1200 12" preserveAspectRatio="none" className="w-full h-full fill-current">
            <path d={CreamTornBottomPath} />
          </svg>
        </div>
      );
    };

    // Inner element composition
    let content = containerWidth ? (
      <Container width={containerWidth}>{children}</Container>
    ) : (
      children
    );

    if (reveal) {
      content = <ScrollReveal>{content}</ScrollReveal>;
    }

    return (
      <section ref={ref} className={finalClasses} {...props}>
        {renderTornTop()}
        {content}
        {renderTornBottom()}
      </section>
    );
  }
);

Section.displayName = 'Section';

/**
 * Section Header Layout wrapper
 */
export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center';
}

export function SectionHeader({ className = '', align = 'left', children, ...props }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col mb-10 max-w-3xl ${alignClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Section Body layout container
 */
export function SectionBody({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`w-full ${className}`} {...props}>
      {children}
    </div>
  );
}

/**
 * Section Divider doodle separator
 */
export function SectionDivider({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`w-full flex items-center justify-center py-6 select-none ${className}`} {...props}>
      <svg className="w-40 h-4 text-divider" viewBox="0 0 200 8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 4 C40 2.5, 90 5.5, 140 3 C168 1.5, 185 3, 198 4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
