import { Section, Container } from '@/components/layout';
import { MarketingHero, FAQAccordion } from '@/components/marketing';
import { Search } from 'lucide-react';

export default function FAQPage() {
  const accountFaqs = [
    { q: 'Is there a free trial?', a: 'Yes! Every new account gets 14 days of free Pro Path access coordinates. No credit card is required to sign up.' },
    { q: 'Can I import my Markdown notes?', a: 'Yes. PragyaOS supports full markdown import. Drag and drop any .md folder directly into your workspace to sync pages.' },
  ];

  const AIfaqs = [
    { q: 'How does the AI Companion learn?', a: 'The companion analyzes notes in your workspace to answer conceptual definitions. Your private study files are never used to train global LLM models.' },
    { q: 'What AI model is used?', a: 'PragyaOS utilizes cognitive semantic search indexes alongside Google Gemini models to compile brief inline definitions.' },
  ];

  return (
    <>
      <MarketingHero
        tag="FAQs"
        title="Everything you want to know about"
        italicTitle="PragyaOS."
        desc="Browse frequently asked questions regarding billing plans, markdown imports, and AI companion privacy policies."
      />

      {/* Mock Search Bar */}
      <Section bg="white" spacing="none" className="py-8 border-b border-border select-none">
        <Container width="content">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              readOnly
              className="bg-background border border-border px-4 py-3 pl-11 rounded-paper text-body font-body shadow-button placeholder-text-muted/65 focus:outline-none w-full cursor-pointer hover:border-accent-gold/45"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          </div>
        </Container>
      </Section>

      {/* Account FAQs */}
      <Section bg="white" spacing="md" className="border-b border-border">
        <Container width="content">
          <h3 className="text-h2 font-heading text-text-primary font-bold text-center mb-8">Workspaces & Billing</h3>
          <FAQAccordion items={accountFaqs} />
        </Container>
      </Section>

      {/* AI FAQs */}
      <Section bg="cream" spacing="md">
        <Container width="content">
          <h3 className="text-h2 font-heading text-text-primary font-bold text-center mb-8">AI companion & privacy</h3>
          <FAQAccordion items={AIfaqs} />
        </Container>
      </Section>
    </>
  );
}
