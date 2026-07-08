import { Button, PaperCard, StickyNote, AvatarGroup, Avatar } from '@/components/ui';
import { DoodleStar, DoodlePaperPlane, DoodleLeaves, DoodleUnderline } from '@/components/ui/Doodles';
import { Section, Container } from '@/components/layout';
import { BookOpen, Edit3, Layers, Trophy } from 'lucide-react';

export default function HeroSection() {
  const steps = [
    {
      num: '01',
      title: 'Learn',
      desc: 'Understand concepts that truly matter.',
      icon: <BookOpen className="w-5 h-5 text-accent-gold" />,
    },
    {
      num: '02',
      title: 'Practice',
      desc: 'Strengthen your skills with real practice.',
      icon: <Edit3 className="w-5 h-5 text-accent-blue" />,
    },
    {
      num: '03',
      title: 'Build',
      desc: 'Apply your knowledge and create with confidence.',
      icon: <Layers className="w-5 h-5 text-accent-purple" />,
    },
    {
      num: '04',
      title: 'Achieve',
      desc: 'Earn recognition. Grow your future. Inspire others.',
      icon: <Trophy className="w-5 h-5 text-success" />,
    },
  ];

  return (
    <Section bg="cream" spacing="lg" className="relative overflow-hidden pt-20 pb-28 border-b border-border select-none">
      {/* Decorative Floating plane top right */}
      <div className="absolute right-12 top-10 opacity-30 select-none pointer-events-none">
        <DoodlePaperPlane className="w-24 h-24 text-text-muted rotate-[15deg]" />
      </div>

      <Container width="desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-caption font-semibold tracking-wider text-accent-gold uppercase font-body">
                The journey matters
              </span>
              <h1 className="text-display-xl font-heading text-text-primary leading-tight font-extrabold">
                Every learner <br />has a path.{' '}
                <span className="relative inline-block text-accent-gold font-bold italic">
                  We help you <br />go further.
                  <DoodleUnderline className="absolute bottom-0 left-0 w-full text-accent-gold/75" />
                </span>
              </h1>
              <p className="text-body-lg text-text-secondary leading-relaxed max-w-xl font-body">
                PragyaOS is your space to learn, practice, build and grow. From your first lesson to your greatest achievement—we're with you at every step.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary" size="lg" onClick={() => (window.location.href = '/register')}>
                Start Your Journey &rarr;
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Courses
              </Button>
            </div>

            {/* Reviews */}
            <div className="flex items-center space-x-4 pt-4 border-t border-divider max-w-md">
              <AvatarGroup>
                <Avatar fallback="JD" />
                <Avatar fallback="AV" />
                <Avatar fallback="NK" />
                <Avatar fallback="RV" />
              </AvatarGroup>
              <div className="flex flex-col justify-center">
                <div className="flex space-x-0.5 text-accent-gold">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4.5 h-4.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-caption font-semibold text-text-secondary font-body mt-1">
                  Trusted by 50,000+ learners worldwide
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Path & Cards */}
          <div className="lg:col-span-6 relative">
            {/* Background path line connector */}
            <div className="absolute inset-0 select-none pointer-events-none hidden sm:block">
              <svg className="w-full h-full text-divider" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6">
                <path d="M120,90 Q220,100 240,240 T380,390" />
              </svg>
            </div>

            {/* Steps grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              {steps.map((step, idx) => (
                <PaperCard
                  key={idx}
                  variant={idx % 2 === 0 ? 'notebook' : 'grid'}
                  className="p-6 h-44 flex flex-col justify-between hover:shadow-card transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-h3 font-heading font-extrabold text-text-muted">{step.num}</span>
                    <div className="w-8 h-8 rounded-full bg-background-secondary border border-border flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-body font-heading font-bold text-text-primary">{step.title}</h4>
                    <p className="text-small text-text-muted leading-tight">{step.desc}</p>
                  </div>
                </PaperCard>
              ))}
            </div>

            {/* Pinned Sticky note bottom right */}
            <div className="absolute -right-6 -bottom-16 rotate-6 w-44 hidden md:block z-20">
              <StickyNote color="yellow" decor="pin">
                <p className="text-caption font-body font-semibold italic text-amber-900 leading-tight">
                  "Small steps today. Bright future tomorrow." ❤️
                </p>
              </StickyNote>
            </div>

            {/* Floating leaf on bottom left */}
            <div className="absolute -left-10 -bottom-12 opacity-35 select-none pointer-events-none">
              <DoodleLeaves className="w-16 h-16 text-success rotate-[45deg]" />
            </div>
            {/* Stars top left of the grid */}
            <div className="absolute -left-4 -top-8 opacity-40 select-none pointer-events-none">
              <DoodleStar className="w-8 h-8 text-accent-gold" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
