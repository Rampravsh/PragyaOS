import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: 'desktop' | 'content' | 'reading' | 'narrow' | 'full' | 'fluid';
  clean?: boolean; // If true, removes baseline padding
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = '', width = 'desktop', clean = false, children, ...props }, ref) => {
    const widthClasses = {
      desktop: 'max-w-7xl', // 1280px / 1200px equivalent
      content: 'max-w-5xl', // 1024px / 1000px equivalent
      reading: 'max-w-2xl leading-relaxed', // 672px / 680px equivalent
      narrow: 'max-w-md',   // 448px / 480px equivalent
      full: 'max-w-full',
      fluid: 'max-w-[100%]',
    };

    const paddingClass = clean ? '' : 'px-4 sm:px-6 lg:px-8';
    const centerClass = width !== 'full' ? 'mx-auto' : '';

    return (
      <div
        ref={ref}
        className={`${widthClasses[width]} ${paddingClass} ${centerClass} w-full ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

/**
 * WideContainer - 1200px max width container
 */
export function WideContainer({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Container width="desktop" className={className} {...props}>
      {children}
    </Container>
  );
}

/**
 * ContentContainer - 1000px max width container
 */
export function ContentContainer({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Container width="content" className={className} {...props}>
      {children}
    </Container>
  );
}

/**
 * ReadingContainer - 680px max width container
 */
export function ReadingContainer({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Container width="reading" className={className} {...props}>
      {children}
    </Container>
  );
}

/**
 * HeroContainer - fluid layout container
 */
export function HeroContainer({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Container width="fluid" className={className} {...props}>
      {children}
    </Container>
  );
}
