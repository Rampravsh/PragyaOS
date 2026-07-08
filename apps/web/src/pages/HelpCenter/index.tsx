import { Section, Container } from '@/components/layout';
import { MarketingHero, FAQAccordion } from '@/components/marketing';
import { PaperCard, Button } from '@/components/ui';
import { BookOpen, CreditCard, Search, User } from 'lucide-react';

export default function HelpCenterPage() {
  const categories = [
    { label: 'Account Settings', desc: 'Manage study usernames, profiles, and SSO logins.', icon: <User className="w-5 h-5 text-accent-gold" /> },
    { label: 'Study Editors', desc: 'Guide to lined horizontal notebooks and grid bindings.', icon: <BookOpen className="w-5 h-5 text-accent-blue" /> },
    { label: 'Workspace Billing', desc: 'Plans subscriptions, education discount queries, and Stripe receipts.', icon: <CreditCard className="w-5 h-5 text-success" /> },
  ];

  const popularQuestions = [
    { q: 'How do I invite study group peers?', a: 'Go to your workspace settings dashboard, click Collaborative Rooms, and copy your invite token link to share with classmates.' },
    { q: 'Where are my certified credentials?', a: 'Upon completing all course requirements and passing assignments, your badge is loaded in your Certificates page ready to share on LinkedIn.' },
    { q: 'Is there a limit on notes?', a: 'No. PragyaOS supports unlimited notes. You can write as many page notebook layouts as you need even on Free Space accounts.' },
  ];

  return (
    <>
      <MarketingHero
        tag="Help Center"
        title="We are here to support your"
        italicTitle="learning path."
        desc="Search documentation, browse account settings guides, or connect with our support coordinators directly."
      />

      {/* Mock Search Section */}
      <Section bg="white" spacing="none" className="py-8 border-b border-border select-none">
        <Container width="content">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search help topics, keywords, errors..."
              readOnly
              className="bg-background border border-border px-4 py-3 pl-11 rounded-paper text-body font-body shadow-button placeholder-text-muted/65 focus:outline-none w-full cursor-pointer hover:border-accent-gold/45"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          </div>
        </Container>
      </Section>

      {/* Categories */}
      <Section bg="white" spacing="md" className="border-b border-border select-none">
        <Container width="desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {categories.map((cat, idx) => (
              <PaperCard key={idx} variant="plain" className="p-6 space-y-4 border border-border bg-surface">
                <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center">
                  {cat.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-body font-heading font-extrabold text-text-primary leading-none">{cat.label}</h4>
                  <p className="text-small text-text-muted leading-relaxed font-body">{cat.desc}</p>
                </div>
              </PaperCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* Popular questions */}
      <Section bg="cream" spacing="md" className="border-b border-border">
        <Container width="content">
          <h3 className="text-h2 font-heading text-text-primary font-bold text-center mb-10">Popular Questions</h3>
          <FAQAccordion items={popularQuestions} />
        </Container>
      </Section>

      {/* Support CTA */}
      <Section bg="white" spacing="md">
        <Container width="content" className="text-center space-y-4">
          <h3 className="text-h2 font-heading text-text-primary font-bold">Still need coordinate support?</h3>
          <p className="text-body text-text-secondary font-body max-w-sm mx-auto">
            Our study coordinators are happy to assist. Write down a message and we will respond.
          </p>
          <Button variant="primary" size="lg" onClick={() => (window.location.href = '/contact')}>
            Contact Support &rarr;
          </Button>
        </Container>
      </Section>
    </>
  );
}
