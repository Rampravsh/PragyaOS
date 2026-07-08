import React from 'react';
import { CtaBanner } from '@/components/layout/CtaBanner';

export interface CTAProps {
  heading?: string;
  italicWord?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  checklist?: string[];
  illustration?: React.ReactNode;
}

export function CTA({
  heading,
  italicWord,
  description,
  buttonText,
  onButtonClick,
  checklist,
  illustration,
}: CTAProps) {
  return (
    <CtaBanner
      heading={heading}
      italicWord={italicWord}
      description={description}
      buttonText={buttonText}
      onButtonClick={onButtonClick}
      checklist={checklist}
      illustration={illustration}
    />
  );
}
