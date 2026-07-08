
export interface LogoStripProps {
  logos: string[];
  title?: string;
  className?: string;
}

export function LogoStrip({ logos, title, className = '' }: LogoStripProps) {
  return (
    <div className={`py-6 select-none text-center ${className}`}>
      {title && (
        <span className="text-caption font-semibold tracking-wider text-text-muted uppercase font-body block mb-4">
          {title}
        </span>
      )}
      <div className="flex flex-wrap justify-center items-center gap-8 px-4">
        {logos.map((logo, idx) => (
          <span
            key={idx}
            className="font-heading text-body-lg text-text-muted/50 font-bold hover:text-text-primary transition-colors cursor-default"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
