import { Section, Container } from '@/components/layout';
import { MarketingHero, ResourceCard } from '@/components/marketing';

export default function ResourcesPage() {
  const materials = [
    { title: 'Notebook study handbook', type: 'guide', size: '2.4 MB', desc: 'Best practices for setting up handwritten structures in digital workspaces.' },
    { title: 'Vite layout composition rules', type: 'template', size: '840 KB', desc: 'Vite configurations for custom themes, variables, and typography scale.' },
    { title: 'Oxford learning study metrics', type: 'case study', size: '4.1 MB', desc: 'Academic study measuring active hours improvements with tactile editors.' },
    { title: 'Interactive AI companion query checklist', type: 'guide', size: '1.2 MB', desc: 'Guide to asking clear conceptual follow-ups for cognitive indexing.' },
  ];

  return (
    <>
      <MarketingHero
        tag="Resources"
        title="Tactile materials, guides, and"
        italicTitle="handbooks."
        desc="Explore our collection of learning guidelines, cognitive papers, and template configurations ready for workspace setups."
      />
      <Section bg="white" spacing="md">
        <Container width="desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {materials.map((res, idx) => (
              <ResourceCard
                key={idx}
                title={res.title}
                type={res.type}
                size={res.size}
                desc={res.desc}
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
