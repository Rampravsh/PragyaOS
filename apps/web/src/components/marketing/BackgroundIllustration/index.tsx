
export interface BackgroundIllustrationProps {
  variant?: 'dots' | 'grid' | 'notebook' | 'doodle';
  className?: string;
}

export function BackgroundIllustration({ variant = 'dots', className = '' }: BackgroundIllustrationProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none -z-10 ${className}`}>
      {variant === 'dots' && (
        <div className="w-full h-full opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      )}
      {variant === 'grid' && (
        <div className="w-full h-full opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:24px_24px]" />
      )}
      {variant === 'notebook' && (
        <div className="w-full h-full opacity-[0.04] bg-[linear-gradient(#000_1px,transparent_1px)] [background-size:28px_28px]" />
      )}
    </div>
  );
}
