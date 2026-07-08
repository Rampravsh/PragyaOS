import { DoodleCoil } from '@/components/ui/Doodles';

export interface DecorativeDividerProps {
  variant?: 'coil' | 'torn' | 'sketch';
  className?: string;
}

export function DecorativeDivider({ variant = 'sketch', className = '' }: DecorativeDividerProps) {
  return (
    <div className={`w-full flex items-center justify-center py-6 select-none ${className}`}>
      {variant === 'sketch' && (
        <svg className="w-40 h-4 text-divider" viewBox="0 0 200 8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 4 C40 2.5, 90 5.5, 140 3 C168 1.5, 185 3, 198 4" strokeLinecap="round" />
        </svg>
      )}
      {variant === 'coil' && (
        <div className="flex space-x-12 opacity-40">
          {[...Array(5)].map((_, i) => (
            <DoodleCoil key={i} className="w-4 h-12" />
          ))}
        </div>
      )}
      {variant === 'torn' && (
        <div className="h-px bg-divider w-full border-t border-dashed" />
      )}
    </div>
  );
}
