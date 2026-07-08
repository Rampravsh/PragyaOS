import { Brain, Users, LineChart, Shield, Landmark, Edit } from 'lucide-react';
import { Section, Container } from '@/components/layout';
import { MarketingHero, FeatureGrid } from '@/components/marketing';

export default function FeaturesPage() {
  const capabilities = [
    {
      title: 'Smart Notebook',
      desc: 'Tactile lined papers detailing notes annotations and dividers.',
      icon: <Edit className="w-5 h-5 text-accent-gold" />,
    },
    {
      title: 'AI Companion',
      desc: 'Active study assistant providing definitions and summary notes.',
      icon: <Brain className="w-5 h-5 text-accent-blue" />,
    },
    {
      title: 'Community Rooms',
      desc: 'Connect with study spaces, instructors, and student peers.',
      icon: <Users className="w-5 h-5 text-accent-purple" />,
    },
    {
      title: 'Study Analytics',
      desc: 'Visual chart insights on study paths and time spent.',
      icon: <LineChart className="w-5 h-5 text-success" />,
    },
    {
      title: 'Certificates',
      desc: 'Acquire credentials and verify accomplishments officially.',
      icon: <Shield className="w-5 h-5 text-accent-gold" />,
    },
    {
      title: 'Class collaboration',
      desc: 'Perform synchronized team studies and peer feedback sessions.',
      icon: <Landmark className="w-5 h-5 text-accent-blue" />,
    },
  ];

  return (
    <>
      <MarketingHero
        tag="Capabilities"
        title="Handcrafted features built for"
        italicTitle="meaningful studies."
        desc="PragyaOS bundles active tools inside a clean journal workspace. No chaotic SaaS charts, just premium learning tools."
      />
      <Section bg="white" spacing="md">
        <Container width="desktop">
          <FeatureGrid items={capabilities} title="Everything you need in one space" />
        </Container>
      </Section>
    </>
  );
}
