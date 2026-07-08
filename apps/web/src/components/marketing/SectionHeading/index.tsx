import { SectionHeading as UISectionHeading } from '@/components/ui/SectionHeading';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, alignment = 'left', className = '' }: SectionHeadingProps) {
  return (
    <UISectionHeading
      label={eyebrow}
      title={title}
      description={description}
      align={alignment}
      className={className}
    />
  );
}
