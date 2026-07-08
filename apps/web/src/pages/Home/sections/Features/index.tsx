import { BookOpen, Users, LineChart, Award } from 'lucide-react';
import { Section, Container, SectionDivider } from '@/components/layout';
import { PaperCard } from '@/components/ui';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Engaging Content',
      desc: 'Learn with videos, notes, quizzes & more.',
      icon: <BookOpen className="w-6 h-6 text-accent-gold" />,
      color: 'bg-amber-100 border-amber-200 text-amber-900',
    },
    {
      title: 'Learn Together',
      desc: 'Connect, discuss & grow with a community.',
      icon: <Users className="w-6 h-6 text-accent-blue" />,
      color: 'bg-sky-100 border-sky-200 text-sky-900',
    },
    {
      title: 'Track Progress',
      desc: 'See your progress and stay motivated.',
      icon: <LineChart className="w-6 h-6 text-accent-purple" />,
      color: 'bg-purple-100 border-purple-200 text-purple-900',
    },
    {
      title: 'Earn & Achieve',
      desc: 'Get certificates and celebrate milestones.',
      icon: <Award className="w-6 h-6 text-success" />,
      color: 'bg-emerald-100 border-emerald-200 text-emerald-900',
    },
  ];

  return (
    <Section id="features" bg="white" spacing="md" className="border-b border-border select-none">
      <Container width="desktop">
        {/* Editorial Heading Column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-5 space-y-3.5 text-left">
            <span className="text-caption font-semibold tracking-wider text-accent-gold uppercase font-body">
              More than courses
            </span>
            <h2 className="text-display-lg font-heading text-text-primary leading-tight font-extrabold">
              A better way <br />to learn.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-8 text-left">
            <p className="text-body-lg text-text-secondary leading-relaxed font-body">
              PragyaOS brings everything you need for meaningful learning in one beautiful platform. We replace disjointed tools with a unified notebook experience.
            </p>
          </div>
        </div>

        {/* Feature Grid Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <PaperCard
              key={idx}
              variant="plain"
              className="p-6 flex flex-col justify-between h-56 hover:shadow-card hover:-translate-y-1 transition-all border border-border bg-surface text-left"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${feat.color}`}>
                {feat.icon}
              </div>
              <div className="space-y-2 mt-6">
                <h3 className="text-body-lg font-heading font-extrabold text-text-primary leading-none">
                  {feat.title}
                </h3>
                <p className="text-small text-text-muted leading-relaxed font-body">
                  {feat.desc}
                </p>
              </div>
            </PaperCard>
          ))}
        </div>

        <SectionDivider className="mt-16" />
      </Container>
    </Section>
  );
}
