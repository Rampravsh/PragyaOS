import { GraduationCap, Presentation, Building2, Compass } from 'lucide-react';
import { Section, Container, SectionHeader, SectionBody, SectionDivider } from '@/components/layout';
import { PaperCard } from '@/components/ui';

export default function AudienceSection() {
  const audiences = [
    {
      title: 'Students',
      desc: 'Master skills, clear doubts, and build real knowledge.',
      icon: <GraduationCap className="w-6 h-6 text-accent-gold" />,
    },
    {
      title: 'Instructors',
      desc: 'Create impactful courses and reach more learners.',
      icon: <Presentation className="w-6 h-6 text-accent-blue" />,
    },
    {
      title: 'Organizations',
      desc: 'Train teams and build a culture of continuous learning.',
      icon: <Building2 className="w-6 h-6 text-accent-purple" />,
    },
    {
      title: 'Lifelong Learners',
      desc: 'Explore new interests and grow every day.',
      icon: <Compass className="w-6 h-6 text-success" />,
    },
  ];

  return (
    <Section bg="cream" spacing="md" className="border-b border-border select-none">
      <Container width="desktop">
        <SectionHeader align="center" className="mb-14">
          <span className="text-caption font-semibold tracking-wider text-accent-gold uppercase font-body">
            User Workspace
          </span>
          <h2 className="text-display-lg font-heading text-text-primary leading-tight font-extrabold mt-2">
            Designed for every kind of learner
          </h2>
        </SectionHeader>

        <SectionBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((aud, idx) => (
              <PaperCard
                key={idx}
                variant="grid"
                className="p-6 flex flex-col justify-between h-56 hover:shadow-card hover:-translate-y-1 transition-all border border-border text-left"
              >
                <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center">
                  {aud.icon}
                </div>
                <div className="space-y-2 mt-6">
                  <h3 className="text-body-lg font-heading font-extrabold text-text-primary leading-none">
                    {aud.title}
                  </h3>
                  <p className="text-small text-text-muted leading-relaxed font-body">
                    {aud.desc}
                  </p>
                </div>
              </PaperCard>
            ))}
          </div>
        </SectionBody>

        <SectionDivider className="mt-16" />
      </Container>
    </Section>
  );
}
