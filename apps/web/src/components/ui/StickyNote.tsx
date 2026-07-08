import React from 'react';

interface StickyNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'yellow' | 'green' | 'blue';
  decor?: 'tape' | 'pin' | 'none';
  rotate?: 'left' | 'right' | 'none' | number;
}

export const StickyNote = React.forwardRef<HTMLDivElement, StickyNoteProps>(
  ({ className = '', color = 'yellow', decor = 'tape', rotate = 'right', children, ...props }, ref) => {
    const colorClasses = {
      yellow: 'bg-[#fef9c3] text-[#451a03] border border-[#fef08a]',
      green: 'bg-[#dcfce7] text-[#064e3b] border border-[#bbf7d0]',
      blue: 'bg-[#e0f2fe] text-[#0c4a6e] border border-[#bae6fd]',
    };

    const rotationStyle = () => {
      if (typeof rotate === 'number') {
        return { transform: `rotate(${rotate}deg)` };
      }
      if (rotate === 'left') {
        return { transform: 'rotate(-2deg)' };
      }
      if (rotate === 'right') {
        return { transform: 'rotate(2deg)' };
      }
      return {};
    };

    const decorClasses = {
      none: '',
      tape: 'decor-tape',
      pin: 'decor-pin',
    };

    const baseClasses = 'p-6 rounded-sm shadow-sticky-note relative font-body text-body';
    const finalClasses = `${baseClasses} ${colorClasses[color]} ${decorClasses[decor]} ${className}`;

    return (
      <div
        ref={ref}
        style={rotationStyle()}
        className={finalClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

StickyNote.displayName = 'StickyNote';
