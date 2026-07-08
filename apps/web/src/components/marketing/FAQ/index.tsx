import React, { useState } from 'react';
import { PaperSection, PaperSectionProps } from '@/components/ui/PaperSection';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '../SectionHeading';
import { HelpCircle } from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
  topDecoration?: React.ReactNode;
  bottomDecoration?: React.ReactNode;
  paperVariant?: PaperSectionProps['variant'];
  backgroundVariant?: PaperSectionProps['background'];
  overlap?: boolean;
}

export function FAQ({
  items,
  title = 'Frequently asked questions',
  description,
  topDecoration,
  bottomDecoration,
  paperVariant = 'plain',
  backgroundVariant = 'white',
  overlap = false,
}: FAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <PaperSection
      variant={paperVariant}
      background={backgroundVariant}
      decoration={topDecoration || bottomDecoration}
      overlap={overlap}
      padding="md"
    >
      <Container width="content" className="space-y-10">
        {title && (
          <SectionHeading
            title={title}
            description={description}
            alignment="center"
            className="mx-auto mb-10"
          />
        )}
        <div className="space-y-4 max-w-2xl mx-auto select-none text-left">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-border rounded-paper bg-surface overflow-hidden transition-shadow shadow-button hover:border-accent-gold/45"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-4.5 px-6 flex justify-between items-center text-body font-heading font-extrabold text-text-primary focus:outline-none cursor-pointer"
                >
                  <span>{item.q}</span>
                  <HelpCircle
                    className={`w-5 h-5 text-text-muted transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-accent-gold' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pb-4.5 px-6 border-t border-divider pt-3.5 text-small text-text-secondary leading-relaxed font-body">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </PaperSection>
  );
}
