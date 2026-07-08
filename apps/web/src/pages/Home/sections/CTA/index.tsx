import { Check } from 'lucide-react';
import { Section, Container } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { DoodleStar, DoodleUnderline } from '@/components/ui/Doodles';

export default function CTASection() {
  const checklists = [
    'No credit card required',
    '14-day free trial',
    'Cancel anytime',
  ];

  return (
    <Section bg="cream" spacing="lg" className="relative overflow-hidden select-none border-b border-border">
      {/* Decorative stars */}
      <div className="absolute left-10 top-10 opacity-30 select-none pointer-events-none">
        <DoodleStar className="w-12 h-12 text-accent-gold" />
      </div>

      <Container width="content">
        <div className="bg-surface border border-border rounded-paper shadow-card p-10 md:p-14 relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Headline */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-display-lg font-heading text-text-primary leading-tight font-extrabold">
                Your journey <br />
                <span className="relative inline-block font-bold">
                  starts here.
                  <DoodleUnderline className="absolute bottom-0 left-0 w-full text-accent-gold/80" />
                </span>
              </h2>
              <p className="text-body text-text-secondary leading-relaxed font-body">
                Join PragyaOS today and take the first step towards your goals. Set up your custom study room in seconds.
              </p>
            </div>

            {/* Right Buttons & Checkmarks */}
            <div className="lg:col-span-6 space-y-6 lg:pl-6">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => (window.location.href = '/register')}
              >
                Get Started for Free &rarr;
              </Button>

              <ul className="space-y-3 pt-2">
                {checklists.map((check, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-small text-text-secondary font-body">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-success" />
                    </div>
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
}
