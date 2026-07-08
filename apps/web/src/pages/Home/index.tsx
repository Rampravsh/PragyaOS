import {
  Hero,
  TrustedBy,
  FeatureGrid,
  LearningJourney,
  AIShowcase,
  Testimonials,
  FAQ,
  CTA,
  AudienceCard,
} from '@/components/marketing';
import {
  DoodleStar,
  DoodlePaperPlane,
  DoodleLeaves,
} from '@/components/ui/Doodles';
import {
  BookOpen,
  Users,
  BarChart3,
  Trophy,
  GraduationCap,
  Presentation,
  Building,
  Sparkles,
} from 'lucide-react';
import { PaperCard } from '@/components/ui/PaperCard';
import { Avatar, AvatarGroup } from '@/components/ui/Avatar';

export default function HomePage() {
  // Timeline steps for the Hero illustration sheet
  const steps = [
    {
      num: '01',
      title: 'Learn',
      desc: 'Understand concepts that truly matter.',
      icon: <BookOpen className="w-4 h-4 text-accent-gold" />,
    },
    {
      num: '02',
      title: 'Practice',
      desc: 'Strengthen your skills with real practice.',
      icon: <Sparkles className="w-4 h-4 text-accent-blue" />,
    },
    {
      num: '03',
      title: 'Build',
      desc: 'Apply your knowledge and create with confidence.',
      icon: <Users className="w-4 h-4 text-accent-purple" />,
    },
    {
      num: '04',
      title: 'Achieve',
      desc: 'Earn recognition. Grow your future. Inspire others.',
      icon: <Trophy className="w-4 h-4 text-success" />,
    },
  ];

  // Right-side illustration container mapping the timeline steps notebook card stack
  const HeroIllustration = (
    <div className="relative w-full max-w-lg select-none">
      {/* Tape on top */}
      <div className="absolute top-[-10px] left-[45%] w-24 h-6 bg-[#fcf6e8]/80 border-y border-dashed border-stone-300 rotate-[-1deg] backdrop-blur-[0.5px] z-20 shadow-sm" />
      
      <PaperCard
        variant="notebook"
        className="p-8 pb-10 bg-surface border border-border/80 shadow-[0_8px_25px_rgba(0,0,0,0.04)] rotate-[1.5deg] relative"
      >
        {/* Binder coil ring loops on the right margin */}
        <div className="absolute right-[-8px] top-[10%] bottom-[10%] flex flex-col justify-between pointer-events-none opacity-35 z-20">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-4 h-5 border-2 border-stone-400 rounded-full bg-stone-300/40" />
          ))}
        </div>

        <div className="space-y-6">
          {/* Handwritten comments */}
          <div className="flex justify-between items-center text-caption font-heading font-extrabold italic text-stone-400">
            <span>Keep learning, keep growing...</span>
            <span className="text-right">The Journey Matters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10 pt-4">
            {steps.map((st, idx) => (
              <div key={idx} className="p-4 border border-border/60 bg-[#fdfdfb] rounded-sm shadow-sm space-y-2 hover:shadow-button transition-shadow">
                <div className="flex justify-between items-center">
                  <span className="text-caption font-heading font-extrabold text-accent-gold/45">{st.num}</span>
                  {st.icon}
                </div>
                <h4 className="text-small font-heading font-extrabold text-text-primary">{st.title}</h4>
                <p className="text-[11px] text-text-secondary leading-normal font-body">{st.desc}</p>
              </div>
            ))}
          </div>

          {/* Connectors / Doodles inside the sheet */}
          <div className="text-center font-heading font-extrabold italic text-amber-800 text-small pt-4">
            You've got this!
          </div>
        </div>
      </PaperCard>
    </div>
  );

  // Left-bottom reviews summary row
  const HeroBadgesAndProof = (
    <div className="flex items-center space-x-4 pt-4 border-t border-divider max-w-md select-none">
      <AvatarGroup>
        <Avatar fallback="AS" />
        <Avatar fallback="RV" />
        <Avatar fallback="NK" />
        <Avatar fallback="JD" />
      </AvatarGroup>
      <span className="text-caption font-semibold text-text-secondary font-body">
        Trusted by 50,000+ learners and educators worldwide
      </span>
    </div>
  );

  // Features list for the main feature grid
  const featureItems = [
    {
      title: 'Engaging Content',
      description: 'Learn with videos, notes, quizzes & more.',
      icon: <BookOpen className="w-5 h-5 text-accent-gold" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Learn Together',
      description: 'Connect, discuss & grow with a community.',
      icon: <Users className="w-5 h-5 text-accent-purple" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Track Progress',
      description: 'See your progress and stay motivated.',
      icon: <BarChart3 className="w-5 h-5 text-accent-blue" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Earn & Achieve',
      description: 'Get certificates and celebrate milestones.',
      icon: <Trophy className="w-5 h-5 text-success" />,
      variant: 'outlined' as const,
    },
  ];

  // Timeline list for learning journey section
  const journeySteps = [
    {
      number: '01',
      label: 'Understand concepts',
      description: 'Deep dive into essential learning topics with our coordinate guide rooms.',
      icon: <BookOpen className="w-4 h-4 text-accent-gold" />,
    },
    {
      number: '02',
      label: 'Interactive Practice',
      description: 'Complete hands-on assignments and review solutions coordinates.',
      icon: <Sparkles className="w-4 h-4 text-accent-blue" />,
    },
    {
      number: '03',
      label: 'Build projects',
      description: 'Apply your notes to concrete templates and share your progress.',
      icon: <Users className="w-4 h-4 text-accent-purple" />,
    },
    {
      number: '04',
      label: 'Gain recognition',
      description: 'Earn certified course badges and grow your portfolio.',
      icon: <Trophy className="w-4 h-4 text-success" />,
    },
  ];

  // Audience items grid inside the dark showcase
  const AudienceIllustration = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-8">
      <AudienceCard
        title="Students"
        description="Master skills, clear doubts, and build real knowledge."
        icon={<GraduationCap className="w-5 h-5 text-accent-gold" />}
        benefits={['Personalized study rooms', 'Self-paced progress cards', 'Peer Q&A boards']}
        variant="student"
      />
      <AudienceCard
        title="Instructors"
        description="Create impactful courses and reach more learners."
        icon={<Presentation className="w-5 h-5 text-accent-blue" />}
        benefits={['Notebook builder templates', 'Direct session coordinates', 'Resource sharing sheets']}
        variant="instructor"
      />
      <AudienceCard
        title="Organizations"
        description="Train teams and build a culture of continuous learning."
        icon={<Building className="w-5 h-5 text-accent-purple" />}
        benefits={['Workspace admin dashboards', 'Custom curriculum sheets', 'Advanced audit logs']}
        variant="organization"
      />
      <AudienceCard
        title="Lifelong Learners"
        description="Explore new interests and grow every single day."
        icon={<Sparkles className="w-5 h-5 text-success" />}
        benefits={['Unrestricted course logs', 'Micro-assignment cards', 'Community circles access']}
        variant="student"
      />
    </div>
  );

  // Testimonials database
  const testimonialItems = [
    {
      quote: "PragyaOS helped me go from confused to confident. The learning experience is just amazing!",
      authorName: "Ananya Sharma",
      authorTitle: "Student",
      avatarFallback: "AS",
    },
    {
      quote: "Finally, a platform that makes teaching online simple, organized, and truly beautiful.",
      authorName: "Rahul Verma",
      authorTitle: "Instructor",
      avatarFallback: "RV",
    },
    {
      quote: "Our team loves how easy it is to learn, track progress, and achieve goals together.",
      authorName: "Neha Kapoor",
      authorTitle: "L&D Manager",
      avatarFallback: "NK",
    },
  ];

  // FAQ items database
  const faqItems = [
    {
      q: "How does PragyaOS coordinate learning paths?",
      a: "PragyaOS maps subjects into distinct study rooms. Learners follow a structured timeline (Learn, Practice, Build, Achieve) that aggregates notes, quizzes, and projects inside a premium notebook workspace.",
    },
    {
      q: "Is there a free trial for instructors and organizations?",
      a: "Yes! Every new workspace begins with a 14-day free trial. You can configure user access, create custom notebooks, and explore all dashboard features without a credit card.",
    },
    {
      q: "Can I customize the paper background and themes?",
      a: "Absolutely. PragyaOS supports dynamic styling including lined notebook papers, dark showcase grids, and standard clean surfaces which you can toggle directly.",
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      
      {/* 1. HERO SECTION */}
      <Hero
        title="Every learner has a path. We help you go further."
        subtitle="PragyaOS is your space to learn, practice, build and grow. From your first lesson to your greatest achievement—we're with you at every step."
        primaryAction={{
          label: 'Start Your Journey &rarr;',
          onClick: () => (window.location.href = '/register'),
        }}
        secondaryAction={{
          label: 'Explore Courses',
          onClick: () => document.getElementById('features-grid-section')?.scrollIntoView({ behavior: 'smooth' }),
        }}
        illustration={HeroIllustration}
        badges={['The journey matters']}
        topDecoration={<DoodlePaperPlane className="absolute right-12 top-10 opacity-30 select-none pointer-events-none" />}
        paperVariant="hero"
        backgroundVariant="cream"
      />

      {/* Render the reviews avatars group directly below the Hero content block using overlap layer placement */}
      <div className="container-desktop relative z-25 -mt-16 mb-8 px-4 lg:px-8">
        {HeroBadgesAndProof}
      </div>

      {/* 2. TRUSTED BY LOGO STRIP */}
      <TrustedBy
        logos={['Stanford University', 'MIT Workspace', 'Harvard Academy', 'Oxford Coords', 'Cambridge Tech']}
        paperVariant="plain"
        backgroundVariant="cream"
      />

      {/* 3. FEATURE GRID SECTION */}
      <div id="features-grid-section">
        <FeatureGrid
          items={featureItems}
          columns={4}
          title="A better way to learn."
          eyebrow="More than courses"
          description="PragyaOS brings everything you need for meaningful learning in one beautiful platform."
          paperVariant="notebook"
          backgroundVariant="white"
          overlap={true}
          topDecoration={<DoodleStar className="absolute left-8 top-8 opacity-25" />}
        />
      </div>

      {/* 4. LEARNING JOURNEY TIMELINE STEPPER */}
      <LearningJourney
        steps={journeySteps}
        title="Coordinate your study path"
        eyebrow="How it works"
        description="Follow a clean roadmap designed to build skills through practice and feedback."
        paperVariant="plain"
        backgroundVariant="cream"
        overlap={true}
        topDecoration={<DoodleLeaves className="absolute right-10 top-12 opacity-35" />}
      />

      {/* 5. AI AUDIENCE SHOWCASE (Dark Showcase) */}
      <AIShowcase
        title="Designed for every kind of learner"
        subtitle="Choose your path and start growing today. PragyaOS matches your goals with tailored study rooms."
        features={[
          "Custom journal templates to capture notes.",
          "Mock API integrations for coding practice.",
          "Peer reviews panels to exchange ideas."
        ]}
        ctaLabel="Explore Solutions &rarr;"
        illustration={AudienceIllustration}
        paperVariant="dark-showcase"
        backgroundVariant="dark"
        overlap={true}
      />

      {/* 6. TESTIMONIALS CAROUSEL */}
      <Testimonials
        items={testimonialItems}
        title="Loved by learners around the world"
        paperVariant="paper-stack"
        backgroundVariant="cream"
        overlap={true}
      />

      {/* 7. FAQ ACCORDION SECTION */}
      <FAQ
        items={faqItems}
        title="Frequently asked questions"
        description="Learn more about PragyaOS workspace features, plans, and templates."
        paperVariant="plain"
        backgroundVariant="white"
        overlap={true}
      />

      {/* 8. CTA SECTION BANNER */}
      <CTA
        heading="Your learning journey"
        italicWord="starts here."
        description="Join PragyaOS today and take the first step towards your goals. Set up your custom study room in seconds."
        buttonText="Get Started for Free &rarr;"
        checklist={['No credit card required', 'Free forever plan available', 'Cancel anytime']}
        illustration={<DoodlePaperPlane className="w-16 h-16 text-accent-gold/40" />}
      />

    </div>
  );
}
