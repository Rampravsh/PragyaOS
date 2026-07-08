import {
  Hero,
  LearningJourney,
  FeatureGrid,
  FAQ,
  CTA,
  Stats,
  FeatureHighlight,
} from '@/components/marketing';
import {
  DoodleStar,
  DoodlePaperPlane,
  DoodleLeaves,
} from '@/components/ui/Doodles';
import {
  Brain,
  BookOpen,
  Sparkles,
  LineChart,
  Users,
  Award,
  PenTool,
  Zap,
  Globe,
  CheckCircle,
  TrendingUp,
  Cpu,
} from 'lucide-react';
import { PaperCard } from '@/components/ui/PaperCard';

export default function FeaturesPage() {
  
  // Custom JSX/SVG illustration for the Features Hero section
  const HeroWorkspaceIllustration = (
    <div className="relative w-full max-w-md select-none">
      {/* Translucent adhesive tape on top */}
      <div className="absolute top-[-10px] left-[35%] w-20 h-6 bg-[#fcf6e8]/80 border-y border-dashed border-stone-300 rotate-[-2deg] backdrop-blur-[0.5px] z-20 shadow-sm" />
      
      <PaperCard
        variant="notebook"
        className="p-6 bg-surface border border-border/80 shadow-[0_8px_25px_rgba(0,0,0,0.03)] rotate-[1deg] relative text-left"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2 border-b border-divider pb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="text-[10px] font-mono text-text-muted pl-2">workspace_coords.log</span>
          </div>

          <div className="space-y-3">
            <div className="h-6 w-32 bg-stone-100 rounded-sm flex items-center px-2">
              <span className="text-[10px] font-bold text-accent-gold uppercase font-body">Study Room 04</span>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="h-3 w-40 bg-stone-200 rounded-sm" />
              <div className="h-3 w-48 bg-stone-100 rounded-sm" />
              <div className="h-3 w-36 bg-stone-100/80 rounded-sm" />
            </div>

            {/* Mock Chat bubbles represent active companion assistance */}
            <div className="bg-[#fcfbf7] border border-amber-200/50 rounded-paper p-3 mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Brain className="w-3.5 h-3.5 text-accent-blue" />
                <span className="text-[10px] font-bold text-text-primary">AI Companion</span>
              </div>
              <p className="text-[11px] text-text-secondary leading-normal italic font-body">
                "We mapped this concept to 3 practice coordinate blocks. Ready to test?"
              </p>
            </div>
          </div>
        </div>
      </PaperCard>
    </div>
  );

  // Custom timeline comparison illustration for learning experience section
  const ExperienceIllustration = (
    <div className="relative w-full max-w-sm select-none text-left">
      <PaperCard variant="plain" className="p-6 border border-border bg-surface shadow-button rotate-[-1.5deg] space-y-4">
        <h4 className="text-small font-heading font-extrabold text-accent-gold uppercase tracking-wider">
          Passive vs Active Path
        </h4>
        <div className="space-y-3 pt-2">
          {/* Passive line */}
          <div className="p-3 border border-red-100 bg-red-50/50 rounded-sm">
            <span className="text-[10px] font-bold text-red-700 block">STATIC METHOD</span>
            <p className="text-[11px] text-red-900/80 font-body">
              Infinite tabs open. PDF slides scanning. Unstructured coordinate bookmarks.
            </p>
          </div>
          {/* Active line */}
          <div className="p-3 border border-emerald-100 bg-emerald-50/50 rounded-sm">
            <span className="text-[10px] font-bold text-emerald-700 block">PRAGYAOS METHOD</span>
            <p className="text-[11px] text-emerald-900/80 font-body">
              Interactive guides. Integrated companion quizzes. Certified accomplishments log.
            </p>
          </div>
        </div>
      </PaperCard>
    </div>
  );

  // Custom timeline steps for the Learning Experience
  const experienceSteps = [
    {
      number: '01',
      label: 'Interactive Timeline',
      description: 'Courses lay out coordinates sequentially, avoiding flat tables and tables listings.',
      icon: <BookOpen className="w-4 h-4 text-accent-gold" />,
    },
    {
      number: '02',
      label: 'Integrated Notebook',
      description: 'Take down personal annotations immediately adjacent to course logs.',
      icon: <PenTool className="w-4 h-4 text-accent-blue" />,
    },
    {
      number: '03',
      label: 'Instant Checks',
      description: 'Assess comprehension dynamically with checkpoints managed by the companion.',
      icon: <Sparkles className="w-4 h-4 text-accent-purple" />,
    },
  ];

  // Core Features grid database
  const coreFeatures = [
    {
      title: 'AI Tutor Support',
      description: 'Your own assistant providing definitions and summary notes on command.',
      icon: <Brain className="w-5 h-5 text-accent-gold" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Personalized Study Roads',
      description: 'Dynamic timelines adjust speed and review checkpoints automatically.',
      icon: <TrendingUp className="w-5 h-5 text-accent-blue" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Active Notebook',
      description: 'Lined notes pages overlay margins with custom coordinate bookmarks.',
      icon: <PenTool className="w-5 h-5 text-accent-purple" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Interactive Lessons',
      description: 'Simulations and exercises embedded directly in course timelines.',
      icon: <BookOpen className="w-5 h-5 text-success" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Smart Assessments',
      description: 'Comprehensive reviews testing coordinate levels to evaluate skills.',
      icon: <CheckCircle className="w-5 h-5 text-accent-gold" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Path Analytics',
      description: 'Visualize time allocations across active study cards grids.',
      icon: <LineChart className="w-5 h-5 text-accent-blue" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Group Study Rooms',
      description: 'Peer coordination coordinates allowing group assignments sharing.',
      icon: <Users className="w-5 h-5 text-accent-purple" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Instructor Panel',
      description: 'Coordinate guides creation, monitor student metrics, and issue verification badges.',
      icon: <Award className="w-5 h-5 text-success" />,
      variant: 'outlined' as const,
    },
  ];

  // Custom split mock illustration representing AI capabilities
  const AiCompanionSidebarIllustration = (
    <div className="relative w-full max-w-sm select-none text-left">
      <PaperCard variant="notebook" className="p-5 bg-surface border border-border/80 shadow-button space-y-4">
        <div className="flex items-center space-x-2 border-b border-divider pb-2.5 text-caption font-bold text-accent-gold uppercase font-body">
          <Brain className="w-4 h-4 text-accent-gold" />
          <span>Active Assistant</span>
        </div>
        <div className="space-y-3 font-body text-small">
          <div className="p-3 bg-stone-50 border border-stone-200 rounded-sm">
            <span className="text-[10px] font-bold text-stone-500 uppercase">User Query</span>
            <p className="text-[11px] text-text-primary pt-1 leading-normal italic">
              "Explain the relationship between coordinates path and metrics logs."
            </p>
          </div>
          <div className="p-3 bg-amber-50/50 border border-amber-200/50 rounded-sm space-y-1">
            <span className="text-[10px] font-bold text-amber-800 uppercase">AI Answer</span>
            <p className="text-[11px] text-stone-800 leading-normal font-medium">
              Coordinates path represents the sequence of study rooms. Metrics logs track progress.
            </p>
          </div>
        </div>
      </PaperCard>
    </div>
  );

  // Student Roadmap Timeline Steps
  const studentRoadmapSteps = [
    {
      number: '01',
      label: 'Discover paths',
      description: 'Search templates logs and customize rooms aligned with your interests.',
      icon: <BookOpen className="w-4 h-4 text-accent-gold" />,
    },
    {
      number: '02',
      label: 'Active Study',
      description: 'Execute notes annotations and coordinate reviews with the companion.',
      icon: <Brain className="w-4 h-4 text-accent-blue" />,
    },
    {
      number: '03',
      label: 'Practice blocks',
      description: 'Verify skills directly inside interactive solution sandboxes.',
      icon: <PenTool className="w-4 h-4 text-accent-purple" />,
    },
    {
      number: '04',
      label: 'Review guides',
      description: 'Consult coordinate checkpoint guidelines before advancing steps.',
      icon: <Sparkles className="w-4 h-4 text-success" />,
    },
    {
      number: '05',
      label: 'Earn badges',
      description: 'Acquire verifiable certifications logs after passing final metrics.',
      icon: <Award className="w-4 h-4 text-accent-gold" />,
    },
    {
      number: '06',
      label: 'Share credentials',
      description: 'Forward progress profiles to peers and potential recruiters.',
      icon: <Users className="w-4 h-4 text-accent-blue" />,
    },
  ];

  // Custom Course Builder illustration for Instructor experience
  const CourseBuilderIllustration = (
    <div className="relative w-full max-w-sm select-none text-left">
      <PaperCard variant="notebook" className="p-5 bg-surface border border-border/80 shadow-button rotate-[1.5deg] space-y-4">
        <span className="text-caption font-bold text-accent-blue uppercase font-body block border-b border-divider pb-2">
          Workspace Course Planner
        </span>
        <div className="space-y-2 pt-1 font-body text-[11px] font-semibold text-text-secondary">
          <div className="flex items-center space-x-3 p-2 bg-[#fcfbf9] border border-border rounded-sm">
            <div className="w-4 h-4 bg-accent-blue/15 text-accent-blue rounded-full flex items-center justify-center text-[10px]">1</div>
            <span>Unit 01: Core Workspace Layouts</span>
          </div>
          <div className="flex items-center space-x-3 p-2 bg-[#fcfbf9] border border-border rounded-sm">
            <div className="w-4 h-4 bg-accent-blue/15 text-accent-blue rounded-full flex items-center justify-center text-[10px]">2</div>
            <span>Unit 02: Coordinate Metrics Blocks</span>
          </div>
          <div className="flex items-center space-x-3 p-2 bg-stone-50 border border-dashed border-stone-300 rounded-sm italic text-stone-400">
            <span>+ Insert new lesson block</span>
          </div>
        </div>
      </PaperCard>
    </div>
  );

  // Custom User Roster illustration for Organization experience
  const RosterIllustration = (
    <div className="relative w-full max-w-sm select-none text-left">
      <PaperCard variant="plain" className="p-5 bg-surface border border-border/80 shadow-button rotate-[-1deg] space-y-4">
        <span className="text-caption font-bold text-accent-purple uppercase font-body block border-b border-divider pb-2">
          Roster Logs & Audits
        </span>
        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-center text-[11px] font-body">
            <span className="text-text-primary font-semibold">Devon Lane (Product Coord)</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">COMPLIANT</span>
          </div>
          <div className="flex justify-between items-center text-[11px] font-body">
            <span className="text-text-primary font-semibold">Esther Howard (Admin Lead)</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">COMPLIANT</span>
          </div>
          <div className="flex justify-between items-center text-[11px] font-body">
            <span className="text-text-primary font-semibold">Bessie Cooper (Marketing Coord)</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-sm">PENDING AUDIT</span>
          </div>
        </div>
      </PaperCard>
    </div>
  );

  // Platform Benefits Grid
  const platformBenefits = [
    {
      title: 'High Speed Loading',
      description: 'Timeline coordinates load instantly without lag, maintaining focus.',
      icon: <Zap className="w-5 h-5 text-accent-gold" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Maximum Flexibility',
      description: 'Switch between notebooks layouts, dark showcases, and standard sheets.',
      icon: <BookOpen className="w-5 h-5 text-accent-blue" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Full Accessibility',
      description: 'Screen reader supports and keyboard navigability bindings throughout.',
      icon: <Globe className="w-5 h-5 text-accent-purple" />,
      variant: 'outlined' as const,
    },
    {
      title: 'Synchronized Collaboration',
      description: 'Work synchronously with classmates inside common review rooms.',
      icon: <Users className="w-5 h-5 text-success" />,
      variant: 'outlined' as const,
    },
    {
      title: 'AI-First Workflow',
      description: 'Smart companion integration enables instant summaries and prompts assistance.',
      icon: <Cpu className="w-5 h-5 text-accent-gold" />,
      variant: 'outlined' as const,
    },
  ];

  // Statistics counters
  const statsItems = [
    { value: '98%', label: 'Active course completion rate', icon: <CheckCircle className="w-6 h-6 text-accent-gold" /> },
    { value: '50K+', label: 'Verified coordinate badges issued', icon: <Award className="w-6 h-6 text-accent-blue" /> },
    { value: '250+', label: 'Partner universities and teams', icon: <Users className="w-6 h-6 text-accent-purple" /> },
    { value: '2.5X', label: 'Improvement in student reviews', icon: <TrendingUp className="w-6 h-6 text-success" /> },
  ];

  // FAQ accordion list
  const faqItems = [
    {
      q: "Can I customize features access levels for team workspaces?",
      a: "Yes! Organization admins can activate/deactivate specific sections, control user access roles (Students, Instructors, Admins), and download compliance report logs easily.",
    },
    {
      q: "How does the AI Companion fetch notes and summaries?",
      a: "The AI companion queries your active notebook annotations and current coordinate slide logs to formulate tailored summaries and answers dynamically.",
    },
    {
      q: "What credentials verification standards are used?",
      a: "PragyaOS issues cryptographically verifiable digital credentials logs which can be published directly to public registries and profile pages.",
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      
      {/* 1. FEATURES HERO */}
      <Hero
        title="Handcrafted features built for meaningful studies."
        subtitle="PragyaOS bundles active tools inside a clean journal workspace. No chaotic SaaS charts, just premium learning tools to help you go further."
        primaryAction={{
          label: 'Get Started for Free &rarr;',
          onClick: () => (window.location.href = '/register'),
        }}
        secondaryAction={{
          label: 'Request a Demo',
          onClick: () => (window.location.href = '/contact'),
        }}
        illustration={HeroWorkspaceIllustration}
        badges={['Capabilities']}
        paperVariant="hero"
        backgroundVariant="cream"
        topDecoration={<DoodlePaperPlane className="absolute right-12 top-10 opacity-30 select-none pointer-events-none" />}
      />

      {/* 2. LEARNING EXPERIENCE EXPLAINER */}
      <LearningJourney
        steps={experienceSteps}
        title="Transforming the study experience"
        eyebrow="The Experience"
        description="Shift from passive scrolling to active practice inside customizable workspace environments."
        paperVariant="plain"
        backgroundVariant="cream"
        overlap={true}
        topDecoration={ExperienceIllustration}
      />

      {/* 3. CORE FEATURES GRID */}
      <FeatureGrid
        items={coreFeatures}
        columns={4}
        title="Everything you need in one space"
        eyebrow="Features Overview"
        description="Every feature is designed to fit the tactile notebook aesthetic, making learning feel structured and clean."
        paperVariant="notebook"
        backgroundVariant="white"
        overlap={true}
        topDecoration={<DoodleStar className="absolute left-8 top-8 opacity-25" />}
      />

      {/* 4. AI EXPERIENCE HIGHLIGHT */}
      <FeatureHighlight
        title="Intelligent Companion guidance"
        description="A specialized side panel active inside every notebook study room. Get coordinates definitions, generate summary notes, and construct checks on demand."
        features={[
          "Smart glossary suggestions mapped to timeline logs.",
          "Adaptive summaries based on handwritten annotations.",
          "Zero-prompt instant quiz generation."
        ]}
        illustration={AiCompanionSidebarIllustration}
        align="left"
        paperVariant="dark-showcase"
        backgroundVariant="dark"
        overlap={true}
      />

      {/* 5. STUDENT ROADMAP JOURNEY */}
      <LearningJourney
        steps={studentRoadmapSteps}
        title="The complete learner coordinates path"
        eyebrow="Student Experience"
        description="Grow your portfolio seamlessly from initial concept search to verifiable accomplishments certificates."
        paperVariant="plain"
        backgroundVariant="cream"
        overlap={true}
        topDecoration={<DoodleLeaves className="absolute right-8 top-8 opacity-30" />}
      />

      {/* 6. INSTRUCTOR EXPERIENCE */}
      <FeatureHighlight
        title="Design course paths with confidence"
        description="Build premium curriculum roadmaps using our modular drag-and-drop course planner blocks. Set guidelines assignments, verify checklists, and analyze roster progress."
        features={[
          "Plan sequential timeline units in seconds.",
          "Construct interactive coordinate assessments.",
          "Approve certified credentials logs."
        ]}
        illustration={CourseBuilderIllustration}
        align="right"
        paperVariant="plain"
        backgroundVariant="white"
        overlap={true}
      />

      {/* 7. ORGANIZATION EXPERIENCE */}
      <FeatureHighlight
        title="Enterprise-grade training compliance"
        description="Manage secure roster groups workspaces, review user audits reports, and track team compliance metrics directly inside the organization dashboard."
        features={[
          "Construct private team curricula.",
          "Automate progress analytics logs.",
          "Compliance audits and secure verification logs."
        ]}
        illustration={RosterIllustration}
        align="left"
        paperVariant="plain"
        backgroundVariant="cream"
        overlap={true}
      />

      {/* 8. PLATFORM BENEFITS */}
      <FeatureGrid
        items={platformBenefits}
        columns={3}
        title="Platform design benefits"
        eyebrow="The Platform"
        description="We focus on speed, style coordinates, and accessibility to make PragyaOS coordinates your main home."
        paperVariant="notebook"
        backgroundVariant="white"
        overlap={true}
      />

      {/* 9. STATISTICS */}
      <Stats
        items={statsItems}
        title="Proven coordinate metrics logs"
        description="Our learners demonstrate enhanced comprehension speeds and verified outcomes."
        paperVariant="plain"
        backgroundVariant="cream"
        overlap={true}
      />

      {/* 10. FAQ ACCORDION */}
      <FAQ
        items={faqItems}
        title="FAQ Overview"
        description="Learn more about coordinates capabilities, templates, and integration options."
        paperVariant="plain"
        backgroundVariant="white"
        overlap={true}
      />

      {/* 11. CTA BANNER */}
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
