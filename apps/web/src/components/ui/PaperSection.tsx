import React from 'react';

interface PaperSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  bg?: 'cream' | 'white' | 'dark';
  tornTop?: 'cream' | 'dark' | 'none';
  tornBottom?: 'cream' | 'dark' | 'none';
  overlap?: boolean;
}

const CreamTornTopPath = 'M0,12 L1200,12 L1200,8 L1182,10 L1164,4 L1146,8 L1128,6 L1110,10 L1092,4 L1074,8 L1056,6 L1038,10 L1020,4 L1002,8 L984,6 L966,10 L948,4 L930,8 L912,6 L894,10 L876,4 L858,8 L840,6 L822,10 L804,4 L786,8 L768,6 L750,10 L732,4 L714,8 L696,6 L678,10 L660,4 L642,8 L624,6 L606,10 L588,4 L570,8 L552,6 L534,10 L516,4 L498,8 L480,6 L462,10 L444,4 L426,8 L408,6 L390,10 L372,4 L354,8 L336,6 M336,6 L318,10 L300,4 L282,8 L264,6 L246,10 L228,4 L210,8 L192,6 L174,10 L156,4 L138,8 L120,6 L102,10 L84,4 L66,8 L48,6 L30,10 L12,4 L0,8 Z';
const CreamTornBottomPath = 'M0,0 L1200,0 L1200,4 L1182,2 L1164,8 L1146,4 L1128,6 L1110,2 L1092,8 L1074,4 L1056,6 L1038,2 L1020,8 L1002,4 L984,6 L966,2 L948,8 L930,4 L912,6 L894,2 L876,8 L858,4 L840,6 L822,2 L804,8 L786,4 L768,6 L750,2 L732,8 L714,4 L696,6 L678,2 L660,8 L642,4 L624,6 L606,2 L588,8 L570,4 L552,6 L534,2 L516,8 L498,4 L480,6 L462,2 L444,8 L426,4 L408,6 L390,2 L372,8 L354,4 L336,6 M336,6 L318,2 L300,8 L282,4 L264,6 L246,2 L228,8 L210,4 L192,6 L174,2 L156,8 L138,4 L120,6 L102,2 L84,8 L66,4 L48,6 L30,2 L12,8 L0,4 Z';

export const PaperSection = React.forwardRef<HTMLDivElement, PaperSectionProps>(
  ({ className = '', bg = 'cream', tornTop = 'none', tornBottom = 'none', overlap = false, children, ...props }, ref) => {
    const bgClasses = {
      cream: 'bg-background text-text-primary',
      white: 'bg-surface text-text-primary border-y border-border',
      dark: 'bg-paper-dark text-background-secondary',
    };

    const overlapClasses = overlap ? '-mt-6 relative z-10' : 'relative';

    const renderTornTop = () => {
      if (tornTop === 'none') return null;
      const colorClass = tornTop === 'cream' ? 'text-background' : 'text-paper-dark';
      return (
        <div className={`absolute top-0 left-0 right-0 h-4 overflow-hidden -translate-y-[95%] z-20 pointer-events-none ${colorClass}`}>
          <svg viewBox="0 0 1200 12" preserveAspectRatio="none" className="w-full h-full fill-current">
            <path d={CreamTornTopPath} />
          </svg>
        </div>
      );
    };

    const renderTornBottom = () => {
      if (tornBottom === 'none') return null;
      const colorClass = tornBottom === 'cream' ? 'text-background' : 'text-paper-dark';
      return (
        <div className={`absolute bottom-0 left-0 right-0 h-4 overflow-hidden translate-y-[95%] z-20 pointer-events-none ${colorClass}`}>
          <svg viewBox="0 0 1200 12" preserveAspectRatio="none" className="w-full h-full fill-current">
            <path d={CreamTornBottomPath} />
          </svg>
        </div>
      );
    };

    return (
      <section
        ref={ref}
        className={`${bgClasses[bg]} ${overlapClasses} py-16 md:py-24 ${className}`}
        {...props}
      >
        {renderTornTop()}
        <div className="container-desktop relative">
          {children}
        </div>
        {renderTornBottom()}
      </section>
    );
  }
);

PaperSection.displayName = 'PaperSection';
