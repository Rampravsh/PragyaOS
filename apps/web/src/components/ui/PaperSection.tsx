import React from 'react';

export interface PaperSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'plain' | 'notebook' | 'dark-showcase' | 'sticky-note' | 'paper-stack' | 'hero';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'cream' | 'white' | 'dark';
  bg?: 'cream' | 'white' | 'dark'; // Backward compatibility
  overlap?: boolean;
  decoration?: React.ReactNode;
  divider?: 'none' | 'torn-top' | 'torn-bottom' | 'both';
  tornTop?: 'cream' | 'dark' | 'none'; // Backward compatibility
  tornBottom?: 'cream' | 'dark' | 'none'; // Backward compatibility
}

const CreamTornTopPath = 'M0,12 L1200,12 L1200,8 L1182,10 L1164,4 L1146,8 L1128,6 L1110,10 L1092,4 L1074,8 L1056,6 L1038,10 L1020,4 L1002,8 L984,6 L966,10 L948,4 L930,8 L912,6 L894,10 L876,4 L858,8 L840,6 L822,10 L804,4 L786,8 L768,6 L750,10 L732,4 L714,8 L696,6 L678,10 L660,4 L642,8 L624,6 L606,10 L588,4 L570,8 L552,6 L534,10 L516,4 L498,8 L480,6 L462,10 L444,4 L426,8 L408,6 L390,10 L372,4 L354,8 L336,6 M336,6 L318,10 L300,4 L282,8 L264,6 L246,10 L228,4 L210,8 L192,6 L174,10 L156,4 L138,8 L120,6 L102,10 L84,4 L66,8 L48,6 L30,10 L12,4 L0,8 Z';
const CreamTornBottomPath = 'M0,0 L1200,0 L1200,4 L1182,2 L1164,8 L1146,4 L1128,6 L1110,2 L1092,8 L1074,4 L1056,6 L1038,2 L1020,8 L1002,4 L984,6 L966,2 L948,8 L930,4 L912,6 L894,2 L876,8 L858,4 L840,6 L822,2 L804,8 L786,4 L768,6 L750,2 L732,8 L714,4 L696,6 L678,2 L660,8 L642,4 L624,6 L606,2 L588,8 L570,4 L552,6 L534,2 L516,8 L498,4 L480,6 L462,2 L444,8 L426,4 L408,6 L390,2 L372,8 L354,4 L336,6 M336,6 L318,2 L300,8 L282,4 L264,6 L246,2 L228,8 L210,4 L192,6 L174,2 L156,8 L138,4 L120,6 L102,2 L84,8 L66,4 L48,6 L30,2 L12,8 L0,4 Z';

export const PaperSection = React.forwardRef<HTMLDivElement, PaperSectionProps>(
  (
    {
      className = '',
      variant = 'plain',
      padding = 'md',
      background,
      bg,
      overlap = false,
      decoration,
      divider = 'none',
      tornTop,
      tornBottom,
      children,
      ...props
    },
    ref
  ) => {
    // Resolve props for backward compatibility
    const activeBackground = background || bg || 'cream';
    const activeTornTop = tornTop || (divider === 'torn-top' || divider === 'both' ? activeBackground : 'none');
    const activeTornBottom = tornBottom || (divider === 'torn-bottom' || divider === 'both' ? activeBackground : 'none');

    // Map background colors
    const bgClasses = {
      cream: 'bg-background text-text-primary',
      white: 'bg-surface text-text-primary border-y border-border/80',
      dark: 'bg-paper-dark text-background-secondary',
    };

    // Map padding sizes
    const paddingClasses = {
      none: 'py-0',
      sm: 'py-8 md:py-12',
      md: 'py-16 md:py-24',
      lg: 'py-28 md:py-36',
    };

    // Variant classes and overlays
    const variantClasses = {
      plain: '',
      notebook: 'paper-notebook relative after:absolute after:left-[8%] after:top-0 after:bottom-0 after:w-px after:bg-red-200/60',
      'dark-showcase': 'bg-paper-dark text-background-secondary paper-grid relative',
      'sticky-note': 'bg-amber-50/95 text-stone-900 border border-amber-200/65 shadow-button rotate-[-0.5deg]',
      'paper-stack': 'bg-surface shadow-[0_4px_10px_rgba(0,0,0,0.03),0_15px_30px_rgba(0,0,0,0.04)] border border-border relative before:absolute before:inset-0 before:bg-surface before:border before:border-border before:rotate-[-1.5deg] before:-z-10 after:absolute after:inset-0 after:bg-surface after:border after:border-border after:rotate-[1deg] after:-z-20',
      hero: 'py-28 md:py-36 relative overflow-hidden select-none border-b border-border/60',
    };

    // Natural overlap scrolling margins
    const overlapClasses = overlap ? '-mt-12 md:-mt-20 z-10 shadow-card relative' : 'relative';

    // Final background override for variants with forced color styles
    let finalBg = bgClasses[activeBackground];
    if (variant === 'dark-showcase') finalBg = bgClasses.dark;
    if (variant === 'sticky-note') finalBg = '';
    if (variant === 'paper-stack') finalBg = '';

    const renderTornTop = () => {
      if (activeTornTop === 'none') return null;
      const colorClass = activeTornTop === 'cream' ? 'text-background' : 'text-paper-dark';
      return (
        <div className={`absolute top-0 left-0 right-0 h-4 overflow-hidden -translate-y-[90%] z-20 pointer-events-none ${colorClass}`}>
          <svg viewBox="0 0 1200 12" preserveAspectRatio="none" className="w-full h-full fill-current">
            <path d={CreamTornTopPath} />
          </svg>
        </div>
      );
    };

    const renderTornBottom = () => {
      if (activeTornBottom === 'none') return null;
      const colorClass = activeTornBottom === 'cream' ? 'text-background' : 'text-paper-dark';
      return (
        <div className={`absolute bottom-0 left-0 right-0 h-4 overflow-hidden translate-y-[90%] z-20 pointer-events-none ${colorClass}`}>
          <svg viewBox="0 0 1200 12" preserveAspectRatio="none" className="w-full h-full fill-current">
            <path d={CreamTornBottomPath} />
          </svg>
        </div>
      );
    };

    return (
      <section
        ref={ref}
        className={`w-full transition-shadow duration-300 ${finalBg} ${paddingClasses[padding]} ${variantClasses[variant]} ${overlapClasses} ${className}`}
        {...props}
      >
        {renderTornTop()}
        {decoration && <div className="absolute inset-0 pointer-events-none z-0">{decoration}</div>}
        <div className="container-desktop relative z-10">
          {children}
        </div>
        {renderTornBottom()}
      </section>
    );
  }
);

PaperSection.displayName = 'PaperSection';
