import { Section, Container } from '@/components/layout';
import { MarketingHero, ComparisonTable, FAQAccordion } from '@/components/marketing';
import { Button } from '@/components/ui';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Free Space',
      price: '$0',
      period: 'forever',
      desc: 'Ideal for independent learners starting notes.',
      features: ['Lined notebook editor', '1 active learning path', 'Community QA access'],
      color: 'border-border bg-surface',
      btnVariant: 'outline' as const,
    },
    {
      name: 'Pro Path',
      price: '$12',
      period: 'per month',
      desc: 'Unlock total study tools and AI companion access.',
      features: ['Unlimited learning paths', 'Full AI Companion tutor', 'Badges & Certificates verification', 'Advanced progress analytics'],
      color: 'border-accent-gold/45 bg-[#fefdfa] shadow-card relative',
      btnVariant: 'primary' as const,
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'for teams',
      desc: 'Tailored limits for universities and training centers.',
      features: ['Custom institutional domains', 'SAML SSO integrations', 'Priority teacher support', 'Team workspace insights'],
      color: 'border-border bg-surface',
      btnVariant: 'outline' as const,
    },
  ];

  const specs = [
    { name: 'Notebook Editor', free: true, pro: true, enterprise: true },
    { name: 'Active study paths', free: false, pro: true, enterprise: true },
    { name: 'AI Tutor limits', free: false, pro: true, enterprise: true },
    { name: 'Verified credentials', free: false, pro: true, enterprise: true },
    { name: 'Custom subdomain', free: false, pro: false, enterprise: true },
    { name: 'Priority coordinator support', free: false, pro: false, enterprise: true },
  ];

  const faqs = [
    { q: 'Can I cancel my Pro Path plan anytime?', a: 'Yes! You can cancel, upgrade or downgrade your subscription directly from your workspace billing dashboard with a single click. No phone calls or emails required.' },
    { q: 'Do you offer student or teacher discounts?', a: 'Absolutely. We support education. Verify your institutional email to get 50% off on Pro Path accounts.' },
    { q: 'What payment methods do you support?', a: 'We accept all major credit cards, debit cards, and Apple Pay payments handled securely by Stripe.' },
  ];

  return (
    <>
      <MarketingHero
        tag="Pricing"
        title="Simple, transparent plans for"
        italicTitle="meaningful learning."
        desc="Unlock unlimited study paths and full AI tutoring companion capabilities with zero contracts or complex pricing tiers."
      />

      {/* Cards Section */}
      <Section bg="white" spacing="md" className="border-b border-border select-none">
        <Container width="desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-left">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`border rounded-paper p-8 space-y-6 ${tier.color}`}>
                {tier.popular && (
                  <span className="absolute -top-3 left-6 text-[9px] font-bold text-accent-gold bg-accent-gold/10 border border-accent-gold/20 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                    MOST POPULAR
                  </span>
                )}
                <div>
                  <h4 className="text-body-lg font-heading font-extrabold text-text-primary">{tier.name}</h4>
                  <div className="flex items-baseline mt-2">
                    <span className="text-display-lg font-heading font-extrabold text-text-primary">{tier.price}</span>
                    <span className="text-caption text-text-muted font-body ml-2">/ {tier.period}</span>
                  </div>
                  <p className="text-small text-text-muted mt-2 leading-relaxed font-body">{tier.desc}</p>
                </div>

                <Button variant={tier.btnVariant} className="w-full" onClick={() => (window.location.href = '/register')}>
                  Select Plan
                </Button>

                <ul className="space-y-3.5 pt-4 border-t border-divider">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-3 text-small text-text-secondary font-body">
                      <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison table */}
      <Section bg="cream" spacing="md" className="border-b border-border">
        <Container width="content">
          <h3 className="text-h2 font-heading text-text-primary font-bold text-center mb-8">Compare capabilities</h3>
          <ComparisonTable items={specs} />
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg="white" spacing="md">
        <Container width="content">
          <h3 className="text-h2 font-heading text-text-primary font-bold text-center mb-10">Frequently asked questions</h3>
          <FAQAccordion items={faqs} />
        </Container>
      </Section>
    </>
  );
}
