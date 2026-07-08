import { Section, Container } from '@/components/layout';
import { MarketingHero, TeamGrid } from '@/components/marketing';

export default function AboutPage() {
  const values = [
    { title: 'Human & Creative', desc: 'Learning is a creative act. We build spaces that honor the human aspects of curiosity.' },
    { title: 'TACTILE SIMPLICITY', desc: 'We value notebook rulings, papers overlays, and physical-feeling tools over generic grids.' },
    { title: 'STUDY INTEGRITY', desc: 'No quick growth hacks. We focus on deep work, active assignments, and verifiable skills.' },
  ];

  const team = [
    { name: 'Dr. Kabir Verma', role: 'Founder & Coordination Lead', bio: 'Former cognitive science researcher and design enthusiast passionate about rebuilding active learning spaces.' },
    { name: 'Meera Sen', role: 'Engineering Coordinator', bio: 'Systems engineer specialized in real-time collaborative editors and low-latency workspace bindings.' },
    { name: 'Aditya Rao', role: 'Design Lead', bio: 'Print media designer focused on editorial layout grids and typography hierarchies.' },
  ];

  return (
    <>
      <MarketingHero
        tag="About Us"
        title="We are here to rebuild the digital"
        italicTitle="study room."
        desc="PragyaOS is designed by cognitive researchers, editorial typographers, and systems programmers who believe learning interfaces should feel human."
      />

      {/* Values grid */}
      <Section bg="white" spacing="md" className="border-b border-border select-none">
        <Container width="desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {values.map((val, idx) => (
              <div key={idx} className="space-y-3.5">
                <span className="text-[10px] font-bold text-accent-gold bg-accent-gold/10 border border-accent-gold/20 px-2.5 py-0.5 rounded-sm uppercase tracking-wider block w-max">
                  Value {idx + 1}
                </span>
                <h4 className="text-body-lg font-heading font-extrabold text-text-primary leading-none">
                  {val.title}
                </h4>
                <p className="text-small text-text-muted leading-relaxed font-body">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section bg="cream" spacing="md" className="border-b border-border text-left">
        <Container width="content">
          <h3 className="text-h2 font-heading text-text-primary font-bold text-center mb-12">Our Story Timeline</h3>
          <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-divider">
            <div className="relative pl-10 space-y-1">
              <div className="absolute left-[11px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent-gold border-2 border-surface" />
              <span className="text-caption font-bold text-accent-gold">2024</span>
              <h4 className="text-body-lg font-heading font-extrabold text-text-primary">Cognitive Design Beginnings</h4>
              <p className="text-small text-text-muted font-body leading-relaxed max-w-xl">
                Cabined in a small study space, we drew up the first notebook wireframe sketches, seeking an editorial alternative to corporate SaaS structures.
              </p>
            </div>
            <div className="relative pl-10 space-y-1">
              <div className="absolute left-[11px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent-blue border-2 border-surface" />
              <span className="text-caption font-bold text-accent-blue">2025</span>
              <h4 className="text-body-lg font-heading font-extrabold text-text-primary">Vite Layout Engine Rollout</h4>
              <p className="text-small text-text-muted font-body leading-relaxed max-w-xl">
                We completed the foundational styling system, validating fluid container overlays, vector doodles, and paper stacks configurations.
              </p>
            </div>
            <div className="relative pl-10 space-y-1">
              <div className="absolute left-[11px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent-purple border-2 border-surface" />
              <span className="text-caption font-bold text-accent-purple">2026</span>
              <h4 className="text-body-lg font-heading font-extrabold text-text-primary">Public Marketing Launch</h4>
              <p className="text-small text-text-muted font-body leading-relaxed max-w-xl">
                Released the Phase 4 Marketing website, allowing educators and teams to configure their workspaces.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team grid */}
      <Section bg="white" spacing="md">
        <Container width="desktop">
          <h3 className="text-h2 font-heading text-text-primary font-bold text-center mb-12">The Coordination Team</h3>
          <TeamGrid members={team} />
        </Container>
      </Section>
    </>
  );
}
