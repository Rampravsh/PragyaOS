import React from 'react';
import { cn } from '@pragyaos/utils';

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.FC<{ size?: number | string; className?: string }>;
  error?: string;
  id: string;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, icon: Icon, error, id, className, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full gap-1.5 text-left">
        <label htmlFor={id} className="text-sm font-sans font-semibold text-stone-700 dark:text-stone-300">
          {label}
        </label>
        
        <div
          className={cn(
            'flex h-12 items-center rounded-xl border px-3 transition-all duration-fast',
            'bg-white dark:bg-white/5',
            error
              ? 'border-rose-500 ring-2 ring-rose-500/10'
              : 'border-stone-200 dark:border-white/10 focus-within:border-[#10B981] focus-within:ring-2 focus-within:ring-[#10B981]/15 dark:focus-within:border-[#10B981]',
            className
          )}
        >
          {Icon && (
            <span className="mr-2.5 text-stone-400 shrink-0" aria-hidden="true">
              <Icon size={18} className="text-stone-400 dark:text-stone-500" />
            </span>
          )}
          
          <input
            id={id}
            ref={ref}
            className="h-full w-full bg-transparent text-sm font-sans text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-600 outline-none border-none"
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...props}
          />
        </div>

        {error && (
          <span id={`${id}-error`} className="text-xs text-rose-500 font-sans mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput';
export default AuthInput;
