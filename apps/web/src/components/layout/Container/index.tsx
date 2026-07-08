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
