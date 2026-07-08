import { useState } from 'react';
import {
  Button,
  IconButton,
  PaperCard,
  FeatureCard,
  StatCard,
  PaperSection,
  StickyNote,
  Badge,
  Tag,
  Avatar,
  AvatarGroup,
  Input,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Toggle,
  Modal,
  Tooltip,
  NavigationItem,
  FooterLink,
  SectionHeading,
  QuoteBlock,
  FeatureBlock,
  DoodleStar,
  DoodlePaperPlane,
  DoodleLeaves,
  DoodleUnderline,
  DoodleArrow,
  DoodleCoil,
  DoodleSketchLine,
} from '@/components/ui';

export default function DesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxVal, setCheckboxVal] = useState(false);
  const [radioVal, setRadioVal] = useState('one');
  const [toggleVal, setToggleVal] = useState(false);

  return (
    <div className="app-wrapper font-body bg-background text-text-primary">
      {/* Header Banner */}
      <header className="border-b border-divider bg-surface/85 backdrop-blur-md sticky top-0 z-40 py-4 shadow-navigation">
        <div className="container-desktop flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-h2 font-heading font-bold text-text-primary flex items-center">
              📚 PragyaOS <span className="text-accent-gold ml-2 text-small font-body font-semibold border border-accent-gold/30 px-1.5 py-0.5 rounded-paper uppercase">Design System</span>
            </span>
          </div>
          <nav className="flex space-x-6">
            <NavigationItem active href="#colors">Theme</NavigationItem>
            <NavigationItem href="#buttons">Buttons</NavigationItem>
            <NavigationItem href="#inputs">Inputs</NavigationItem>
            <NavigationItem href="#paper">Paper</NavigationItem>
            <NavigationItem href="#doodles">Doodles</NavigationItem>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow">
        {/* Intro Hero Section */}
        <PaperSection bg="cream" tornBottom="cream" className="pt-12 pb-16">
          <div className="max-w-3xl space-y-6">
            <span className="text-caption font-semibold tracking-wider text-accent-gold uppercase font-body">
              Phase 1 Showcase
            </span>
            <h1 className="text-display-xl font-heading font-extrabold text-text-primary leading-none">
              The editorial workspace for <span className="italic font-bold text-accent-gold">meaningful learning.</span>
            </h1>
            <p className="text-body-lg text-text-secondary leading-relaxed max-w-2xl">
              This preview hosts all the primitive UI components, layouts, textures, and shadows compiled for PragyaOS. Every element here is designed to look tactile, physical, warm, and creative.
            </p>
            <div className="flex space-x-4">
              <Button onClick={() => setIsModalOpen(true)} variant="primary">
                Open Lined Modal
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('paper')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Paper Elements
              </Button>
            </div>
          </div>
          <div className="absolute right-12 top-12 hidden lg:block opacity-60">
            <DoodlePaperPlane className="text-accent-gold rotate-[15deg] w-24 h-24" />
          </div>
        </PaperSection>

        {/* Section 1: Colors & Typography */}
        <PaperSection id="colors" bg="white" tornBottom="cream">
          <SectionHeading
            label="Visual Identity"
            title="Colors & Typography"
            description="Our palette centers around rich near-black charcoal tones and warm cream backing. Font hierarchy merges high-contrast Cormorant Garamond headings and readable Manrope body text."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {/* Color Swatches Card */}
            <PaperCard variant="notebook" stack className="space-y-6">
              <h4 className="text-h4 font-heading font-bold pb-2 border-b border-divider">Semantic Colors</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-background border border-border rounded-paper text-caption font-semibold text-text-primary">
                  Cream Background<br/>#FAF6F0
                </div>
                <div className="p-3 bg-background-secondary border border-border rounded-paper text-caption font-semibold text-text-primary">
                  Muted Cream<br/>#F4EFE6
                </div>
                <div className="p-3 bg-surface border border-border rounded-paper text-caption font-semibold text-text-primary shadow-card">
                  Surface White<br/>#FFFFFF
                </div>
                <div className="p-3 bg-paper-dark border border-paper-dark rounded-paper text-caption font-semibold text-background">
                  Dark Charcoal<br/>#18181A
                </div>
                <div className="p-3 bg-accent-gold text-background rounded-paper text-caption font-semibold">
                  Gold Accent<br/>#D97706
                </div>
                <div className="p-3 bg-accent-blue text-background rounded-paper text-caption font-semibold">
                  Blue Accent<br/>#0284C7
                </div>
              </div>
            </PaperCard>

            {/* Typography Spec Card */}
            <PaperCard variant="grid" className="space-y-6">
              <h4 className="text-h4 font-heading font-bold pb-2 border-b border-divider">Typography Scale</h4>
              <div className="space-y-4">
                <div>
                  <span className="text-caption text-text-muted">Display XL (Garamond Bold)</span>
                  <p className="text-display-lg leading-none">AaBbCc 123</p>
                </div>
                <div>
                  <span className="text-caption text-text-muted">Serif Headings (Garamond Bold)</span>
                  <p className="text-h1">Heading 1 Text Example</p>
                </div>
                <div>
                  <span className="text-caption text-text-muted">Sans Body (Manrope Semibold)</span>
                  <p className="text-body font-semibold">The journey matters. We help you go further.</p>
                </div>
                <div>
                  <span className="text-caption text-text-muted">Caption Labels (Manrope Medium)</span>
                  <p className="text-caption tracking-wider uppercase text-accent-gold font-semibold">Instructional label</p>
                </div>
              </div>
            </PaperCard>
          </div>
        </PaperSection>

        {/* Section 2: Buttons & Badges */}
        <PaperSection id="buttons" bg="cream" tornBottom="cream">
          <SectionHeading
            label="Interactive Elements"
            title="Buttons, Badges & Custom Tags"
            description=" Tactile physical buttons that scale on tap, alongside muted tags for labeling content stages."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {/* Buttons spec */}
            <PaperCard className="space-y-6">
              <h4 className="text-h4 font-heading font-bold pb-2 border-b border-divider">Button Actions</h4>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="text">Text Link</Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm" variant="primary">Small</Button>
                <Button size="md" variant="primary">Medium</Button>
                <Button size="lg" variant="primary">Large Action</Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <IconButton variant="outline">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </IconButton>
                <IconButton variant="primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </IconButton>
                <Tooltip content="Tooltip helper text">
                  <Button variant="outline" size="sm">Hover Me for Tooltip</Button>
                </Tooltip>
              </div>
            </PaperCard>

            {/* Badges & Tags spec */}
            <PaperCard className="space-y-6">
              <h4 className="text-h4 font-heading font-bold pb-2 border-b border-divider">Badges & Labels</h4>
              <div className="flex flex-wrap gap-3">
                <Badge variant="primary">Default</Badge>
                <Badge variant="gold">Gold Accent</Badge>
                <Badge variant="green">Success</Badge>
                <Badge variant="blue">Info</Badge>
                <Badge variant="purple">Creative</Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                <Tag variant="primary">Instruction</Tag>
                <Tag variant="gold" onRemove={() => alert('Remove')}>Topic Highlight</Tag>
                <Tag variant="green">Complete</Tag>
                <Tag variant="blue">In Progress</Tag>
              </div>
              <div className="pt-4 border-t border-divider flex items-center space-x-4">
                <span className="text-caption text-text-muted">Avatar Stack:</span>
                <AvatarGroup>
                  <Avatar fallback="JS" />
                  <Avatar fallback="RV" />
                  <Avatar fallback="NK" />
                  <div className="w-8 h-8 rounded-full bg-background-secondary border border-border text-caption flex items-center justify-center font-bold text-text-muted z-10 shadow-button">
                    +12
                  </div>
                </AvatarGroup>
              </div>
            </PaperCard>
          </div>
        </PaperSection>

        {/* Section 3: Inputs */}
        <PaperSection id="inputs" bg="white" tornBottom="cream">
          <SectionHeading
            label="Structured Form Fields"
            title="Form Primitives"
            description="Notebook lined inputs, toggles, custom selects, and checkboxes designed for comfortable typing."
          />

          <div className="max-w-xl mx-auto mt-12">
            <PaperCard variant="notebook" stack className="space-y-6">
              <Input
                label="Full Name"
                placeholder="Ananya Verma"
                helperText="Enter your name exactly as registered."
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="ananya@pragyaos.org"
                error="Invalid email domain format."
              />
              <Select label="Select Your Learning Goal">
                <option value="ui">Learn UI Design Principles</option>
                <option value="code">Learn Full-Stack Engineering</option>
                <option value="ai">Explore Artificial Intelligence</option>
              </Select>
              <Textarea
                label="Study Notes / Bio"
                placeholder="Write down details about your schedule..."
              />
              <div className="space-y-3 pt-3 border-t border-divider">
                <Checkbox
                  label="I agree to follow the learning guidelines"
                  checked={checkboxVal}
                  onChange={(e) => setCheckboxVal(e.target.checked)}
                />
                <Toggle
                  label="Enable Daily Study Reminders"
                  checked={toggleVal}
                  onChange={(e) => setToggleVal(e.target.checked)}
                />
                <div className="flex space-x-6 pt-1">
                  <Radio
                    label="Choice One"
                    name="choice"
                    checked={radioVal === 'one'}
                    onChange={() => setRadioVal('one')}
                  />
                  <Radio
                    label="Choice Two"
                    name="choice"
                    checked={radioVal === 'two'}
                    onChange={() => setRadioVal('two')}
                  />
                </div>
              </div>
            </PaperCard>
          </div>
        </PaperSection>

        {/* Section 4: Paper System */}
        <PaperSection id="paper" bg="cream" tornBottom="dark">
          <SectionHeading
            label="Tactile Sheets"
            title="Paper System & Layers"
            description="Our custom sheets of notebook, grid, and stacked papers. These define the visual layering of every card and section."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Lined Notebook Paper Card */}
            <div className="space-y-2">
              <span className="text-caption font-semibold text-text-muted font-body">Lined Notebook Paper</span>
              <PaperCard variant="notebook" className="h-64 flex flex-col justify-between">
                <p className="font-heading text-h3 text-text-primary leading-loose">Notes & Ideas</p>
                <p className="text-caption text-text-muted">Horizontal ruling with red margin line.</p>
              </PaperCard>
            </div>

            {/* Grid Paper Card */}
            <div className="space-y-2">
              <span className="text-caption font-semibold text-text-muted font-body">Grid Paper Card</span>
              <PaperCard variant="grid" className="h-64 flex flex-col justify-between">
                <p className="font-heading text-h3 text-text-primary">Dotted Structures</p>
                <p className="text-caption text-text-muted">Radial dot grid spacing background.</p>
              </PaperCard>
            </div>

            {/* Stacked Sheet Card */}
            <div className="space-y-2">
              <span className="text-caption font-semibold text-text-muted font-body">Stacked Sheet Cards</span>
              <PaperCard stack={3} className="h-64 flex flex-col justify-between">
                <p className="font-heading text-h3 text-text-primary">Multiple Layers</p>
                <p className="text-caption text-text-muted">Offset sheets underneath using pseudo-borders.</p>
              </PaperCard>
            </div>
          </div>

          {/* Showcase Feature and Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FeatureCard
              title="Tactile Workspaces"
              description="Learn inside a handcrafted notebook container detailing actual line paper rules and pushpins."
              tag="notebook style"
              interactive
            />
            <StatCard
              value="50k+"
              label="Active Learners"
              description="Trusted by over 50,000 students and educators worldwide."
              interactive
            />
          </div>

          {/* Sticky Notes & Pinned Notes Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Yellow Tape Sticky Note */}
            <StickyNote color="yellow" decor="tape">
              <h5 className="font-heading text-h4 font-bold mb-2">Remember!</h5>
              <p className="text-small leading-relaxed">
                "Small steps today. Bright future tomorrow." - Keep learning, keep growing.
              </p>
            </StickyNote>

            {/* Green Pinned Sticky Note */}
            <StickyNote color="green" decor="pin" rotate="left">
              <h5 className="font-heading text-h4 font-bold mb-2">Practice task</h5>
              <p className="text-small leading-relaxed">
                Review CSS variables declarations under Tailwind CSS v4 in styles/foundation config files.
              </p>
            </StickyNote>

            {/* Blue Plain Sticky Note */}
            <StickyNote color="blue" decor="none" rotate={0}>
              <h5 className="font-heading text-h4 font-bold mb-2">Plain Note</h5>
              <p className="text-small leading-relaxed">
                Minimal sticky sheet without top pins or tape markers, perfectly flat.
              </p>
            </StickyNote>
          </div>
        </PaperSection>

        {/* Section 5: Doodles */}
        <PaperSection id="doodles" bg="white" tornBottom="cream">
          <SectionHeading
            label="Editorial Graphics"
            title="Handdrawn Doodles"
            description="Vectors representing handcrafted journal notations. These add human creativity and timeless details."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center text-text-muted">
            <PaperCard variant="grid" className="flex flex-col items-center justify-center p-6 space-y-4">
              <DoodleStar className="text-accent-gold w-10 h-10 animate-pulse" />
              <span className="text-caption font-semibold font-body">DoodleStar</span>
            </PaperCard>

            <PaperCard variant="grid" className="flex flex-col items-center justify-center p-6 space-y-4">
              <DoodlePaperPlane className="text-text-muted w-12 h-12" />
              <span className="text-caption font-semibold font-body">DoodlePaperPlane</span>
            </PaperCard>

            <PaperCard variant="grid" className="flex flex-col items-center justify-center p-6 space-y-4">
              <DoodleLeaves className="text-success w-10 h-10" />
              <span className="text-caption font-semibold font-body">DoodleLeaves</span>
            </PaperCard>

            <PaperCard variant="grid" className="flex flex-col items-center justify-center p-6 space-y-4">
              <DoodleArrow className="text-text-muted w-12 h-8" />
              <span className="text-caption font-semibold font-body">DoodleArrow</span>
            </PaperCard>
          </div>

          <div className="max-w-xl mx-auto mt-12 space-y-8">
            <div className="flex flex-col items-center justify-center">
              <span className="text-caption text-text-muted mb-2">DoodleUnderline (watermark scale):</span>
              <div className="relative">
                <span className="text-h2 font-heading font-bold text-text-primary px-2">Highlight Heading</span>
                <DoodleUnderline className="absolute bottom-0 left-0 w-full text-accent-gold" />
              </div>
            </div>

            <div className="flex justify-between items-center px-6">
              <div className="flex flex-col items-center">
                <span className="text-caption text-text-muted mb-2">Notebook Coil Binding</span>
                <div className="border border-border p-4 bg-surface rounded-paper flex items-center justify-center">
                  <DoodleCoil className="text-text-muted" />
                </div>
              </div>

              <div className="flex flex-col items-center flex-grow ml-8">
                <span className="text-caption text-text-muted mb-2">DoodleSketchLine</span>
                <DoodleSketchLine className="w-full max-w-xs text-text-muted" />
              </div>
            </div>
          </div>
        </PaperSection>

        {/* Section 6: Complex Blocks */}
        <PaperSection id="complex" bg="cream" tornBottom="none" className="pb-24">
          <SectionHeading
            label="Page Construction"
            title="Complex Layout Primitives"
            description="Consolidated page sections mapping customer quotes and structured content modules."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <QuoteBlock
              quote="PragyaOS helped me go from confused to confident. The learning experience is just amazing!"
              authorName="Riya Sharma"
              authorTitle="UI/UX Student"
            />
            <QuoteBlock
              quote="Finally, a platform that makes teaching online simple and beautiful. It feels natural."
              authorName="Rahul Verma"
              authorTitle="Senior Instructor"
            />
          </div>

          <div className="border-t border-divider mt-16 pt-12">
            <FeatureBlock
              tag="Everything in one place"
              title="A platform built for meaningful learning."
              description="Create, organize and share learning experiences that make an impact. Zero friction layout configurations."
              items={[
                'Powerful Course Builder - Easy tools for creators',
                'Smart Analytics - Insights that help you grow',
                'Secured Credentials - Built for teams and enterprises'
              ]}
              visual={
                <PaperCard variant="notebook" stack={3} className="w-full max-w-sm h-64 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <span className="text-display-lg font-heading text-accent-gold font-bold">100%</span>
                    <p className="text-small text-text-secondary">Fully Customized Layout Visuals</p>
                  </div>
                </PaperCard>
              }
            />
          </div>
        </PaperSection>
      </main>

      {/* Lined Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tactile Study Space"
      >
        <div className="space-y-4">
          <p>
            Welcome to the notebook dialog layout. This modal features a radial dot grid background texture and has physical paper drop shadows, ensuring it feels layered above the page context.
          </p>
          <p className="font-heading text-h3 italic text-text-secondary">
            "The journey matters. We help you go further."
          </p>
          <div className="flex justify-end space-x-3 pt-3 border-t border-divider">
            <Button size="sm" variant="outline" onClick={() => setIsModalOpen(false)}>
              Discard
            </Button>
            <Button size="sm" variant="primary" onClick={() => setIsModalOpen(false)}>
              Save Entry
            </Button>
          </div>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="bg-paper-dark text-background-secondary py-12 border-t border-stone-800">
        <div className="container-desktop flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="text-h3 font-heading font-bold text-background">PragyaOS</span>
            <p className="text-small text-text-muted">Empowering learners. Enabling futures.</p>
          </div>
          <div className="flex space-x-6">
            <FooterLink href="#colors">Foundation</FooterLink>
            <FooterLink href="#buttons">Primitives</FooterLink>
            <FooterLink href="#paper">Paper system</FooterLink>
          </div>
          <p className="text-caption text-text-muted">&copy; 2026 PragyaOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
