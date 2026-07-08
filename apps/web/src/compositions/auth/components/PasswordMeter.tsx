import React from 'react';
import { cn } from '@pragyaos/utils';

interface PasswordMeterProps {
  value: string;
}

export function PasswordMeter({ value }: PasswordMeterProps): React.JSX.Element | null {
  if (!value) return null;

  // Calculate score (0-4)
  let score = 0;
  if (value.length >= 8) score++; // Length 8+
  if (/[A-Z]/.test(value)) score++; // Has uppercase
  if (/[0-9]/.test(value)) score++; // Has number
  if (/[^A-Za-z0-9]/.test(value)) score++; // Has special character

  // Map score to label & color
  let label = 'Very Weak';
  let colorClass = 'bg-rose-500';
  let widthClass = 'w-1/4';

  if (score === 2) {
    label = 'Weak';
    colorClass = 'bg-rose-400';
    widthClass = 'w-2/4';
  } else if (score === 3) {
    label = 'Medium';
    colorClass = 'bg-amber-500';
    widthClass = 'w-3/4';
  } else if (score === 4) {
    label = 'Strong';
    colorClass = 'bg-success'; // Emerald/Green from design system
    widthClass = 'w-full';
  }

  return (
    <div className="flex flex-col gap-1.5 w-full text-left mt-1.5">
      <div className="flex justify-between items-center text-xs font-sans font-semibold text-stone-500">
        <span>Password strength</span>
        <span className={cn(score === 4 ? 'text-success' : 'text-stone-600')}>{label}</span>
      </div>
      
      {/* Progress track */}
      <div className="h-1.5 w-full rounded-full bg-stone-100 dark:bg-white/10 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-normal ease-out', colorClass, widthClass)}
        />
      </div>
    </div>
  );
}

export default PasswordMeter;
