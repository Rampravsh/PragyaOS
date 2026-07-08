import React, { useState } from 'react';
import { PaperSection, PaperSectionProps } from '@/components/ui/PaperSection';
import { Container } from '@/components/layout/Container';
import { PaperCard } from '@/components/ui/PaperCard';
import { Avatar } from '@/components/ui/Avatar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export interface TestimonialItem {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarSrc?: string;
  avatarFallback?: string;
}

export interface TestimonialsProps {
  items: TestimonialItem[];
  title?: string;
  topDecoration?: React.ReactNode;
  bottomDecoration?: React.ReactNode;
  paperVariant?: PaperSectionProps['variant'];
  backgroundVariant?: PaperSectionProps['background'];
}

export function TestimonialCard({ quote, authorName, authorTitle, avatarSrc, avatarFallback }: TestimonialItem) {
  return (
    <PaperCard variant="plain" className="p-8 text-left space-y-6 max-w-xl mx-auto border border-border/80 bg-surface shadow-button relative">
      {/* Decorative quotes watermark */}
      <span className="absolute top-4 left-4 text-display-xl font-heading text-accent-gold/10 pointer-events-none select-none">
        “
      </span>
      <p className="text-body font-body text-text-secondary leading-relaxed italic relative z-10 pt-4">
        {quote}
      </p>
      <div className="flex items-center space-x-3.5 border-t border-divider pt-4 relative z-10">
        <Avatar src={avatarSrc} fallback={avatarFallback} size="sm" alt={authorName} />
        <div>
          <h4 className="text-small font-semibold text-text-primary font-body">{authorName}</h4>
          <span className="text-caption text-text-muted font-body block">{authorTitle}</span>
        </div>
      </div>
    </PaperCard>
  );
}

export function Testimonials({
  items,
  title = 'Loved by learners around the world',
  topDecoration,
  bottomDecoration,
  paperVariant = 'plain',
  backgroundVariant = 'cream',
}: TestimonialsProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (!items || items.length === 0) return null;

  return (
    <PaperSection
      variant={paperVariant}
      background={backgroundVariant}
      decoration={topDecoration || bottomDecoration}
      padding="md"
    >
      <Container width="desktop" className="space-y-10 select-none text-center">
        {title && (
          <h3 className="text-h2 font-heading text-text-primary font-bold mb-8">
            {title}
          </h3>
        )}

        <div className="relative max-w-2xl mx-auto flex items-center justify-between gap-6">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-accent-gold transition-colors cursor-pointer shrink-0 shadow-button"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Card slide content */}
          <div className="flex-1 overflow-hidden min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <TestimonialCard {...items[activeIdx]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-text-secondary hover:text-accent-gold transition-colors cursor-pointer shrink-0 shadow-button"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center space-x-2.5 pt-4">
          {items.map((_, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  isActive ? 'bg-accent-gold w-6' : 'bg-divider hover:bg-text-muted/40'
                }`}
                aria-label={`Go to testimonial page ${idx + 1}`}
              />
            );
          })}
        </div>
      </Container>
    </PaperSection>
  );
}
