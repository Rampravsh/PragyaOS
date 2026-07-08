import { Section, Container } from '@/components/layout';
import { MarketingHero, CareersGrid } from '@/components/marketing';
import { Check } from 'lucide-react';

export default function CareersPage() {
  const benefits = [
    'Work anywhere (Distributed study spaces coordination)',
    'Learning stipend ($1,200 annually for books and courses)',
    'Premium setup (Home desk equipment support)',
    'Healthcare coverage (Comprehensive physical and mental care)',
  ];

  const positions = [
    { title: 'Frontend Engineer (React 19 / Vite)', dept: 'Engineering', loc: 'San Francisco, CA' },
    { title: 'Cognitive Product Designer', dept: 'Design', loc: 'Remote' },
    { title: 'Support Coordinator', dept: 'Operations', loc: 'Bengaluru, KA' },
  ];

  return (
    <>
      <MarketingHero
        tag="Careers"
        title="Help us build the digital"
        italicTitle="school desk."
        desc="Join a small, focused coordination team of cognitive designers, compiler specialists, and educators dedicated to quiet, premium tools."
      />

      {/* Benefits Section */}
      <Section bg="white" spacing="md" className="border-b border-border select-none text-left">
        <Container width="content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h3 className="text-h2 font-heading font-extrabold text-text-primary">Benefits & Support</h3>
              <p className="text-body text-text-secondary leading-relaxed font-body">
                We believe in healthy, calm, and distraction-free work. We care about setting up premium desk structures and continuous learning.
              </p>
            </div>
            <ul className="space-y-3.5">
              {benefits.map((ben, idx) => (
                <li key={idx} className="flex items-center space-x-3 text-small text-text-primary font-body font-semibold">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-success" />
                  </div>
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Positions Section */}
      <Section bg="cream" spacing="md">
        <Container width="content">
          <h3 className="text-h2 font-heading text-text-primary font-bold text-center mb-8">Open Positions</h3>
          <CareersGrid roles={positions} />
        </Container>
      </Section>
    </>
  );
}
