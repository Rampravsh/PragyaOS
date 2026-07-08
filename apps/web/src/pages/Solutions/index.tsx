import { useState } from 'react';
import { GraduationCap, Presentation, Building2, Check } from 'lucide-react';
import { Section, Container } from '@/components/layout';
import { MarketingHero } from '@/components/marketing';
import { PaperCard, Button } from '@/components/ui';

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState<'students' | 'instructors' | 'organizations'>('students');

  const content = {
    students: {
      tag: "For Learners",
      title: "Master concepts, make notebook studies, and progress.",
      desc: "PragyaOS gives students a physical-styled notebook workspace. Annotate notes, ask the AI companion questions, and complete study targets without generic dashboard distraction.",
      points: ["Structured notebook lined editor", "24/7 AI tutor study companion", "Personalized learning paths"],
    },
    instructors: {
      tag: "For Educators",
      title: "Publish interactive courses, review works, and guide.",
      desc: "Tools built for teachers. Create structured assignments, review notebook submissions, and foster discussion spaces that students love.",
      points: ["Drag-and-drop course path editor", "Rich feedback annotations systems", "Classrooms discussion forums"],
    },
    organizations: {
      tag: "For Teams & Enterprises",
      title: "Train developers, upskill workers, and build culture.",
      desc: "Customize onboarding paths, manage team completions, and coordinate group projects under corporate study bounds.",
      points: ["Custom organization branding", "Secure SSO access integrations", "Detailed metrics analytics"],
    },
  };

  return (
    <>
      <MarketingHero
        tag="Solutions"
        title="Tactile workspaces designed for"
        italicTitle="every study setup."
        desc="Whether you are an independent student, an online teacher, or an enterprise team, PragyaOS has a coordinate space for you."
      />

      <Section bg="white" spacing="md" className="border-b border-border select-none">
        <Container width="desktop">
          {/* Tab selector buttons */}
          <div className="flex justify-center border-b border-divider pb-4 mb-12 gap-2">
            <Button
              variant={activeTab === 'students' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('students')}
              className="flex items-center space-x-2"
            >
              <GraduationCap className="w-4.5 h-4.5" />
              <span>Students</span>
            </Button>
            <Button
              variant={activeTab === 'instructors' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('instructors')}
              className="flex items-center space-x-2"
            >
              <Presentation className="w-4.5 h-4.5" />
              <span>Instructors</span>
            </Button>
            <Button
              variant={activeTab === 'organizations' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('organizations')}
              className="flex items-center space-x-2"
            >
              <Building2 className="w-4.5 h-4.5" />
              <span>Organizations</span>
            </Button>
          </div>

          {/* Active Tab Panel */}
          <div className="max-w-4xl mx-auto text-left">
            <PaperCard variant="notebook" stack className="p-8 md:p-12 space-y-6">
              <span className="text-caption font-semibold tracking-wider text-accent-gold uppercase font-body block">
                {content[activeTab].tag}
              </span>
              <h3 className="text-h2 font-heading font-extrabold text-text-primary leading-tight">
                {content[activeTab].title}
              </h3>
              <p className="text-body text-text-secondary leading-relaxed font-body">
                {content[activeTab].desc}
              </p>
              
              <ul className="space-y-3.5 pt-4">
                {content[activeTab].points.map((point, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-small text-text-primary font-body font-semibold">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-success" />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </PaperCard>
          </div>

        </Container>
      </Section>
    </>
  );
}
