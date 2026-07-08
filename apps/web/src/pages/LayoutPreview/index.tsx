import { useState } from 'react';
import {
  Container,
  Section,
  SectionHeader,
  SectionBody,
  PaperLayer,
  PaperStack,
  NotebookSection,
  StickySection,
  Header,
  Footer,
  Sidebar,
  Topbar,
} from '@/components/layout';
import { Button, DoodleStar } from '@/components/ui';
import { LayoutDashboard, BookOpen, Settings } from 'lucide-react';

export default function LayoutPreviewPage() {
  const [activeFrame, setActiveFrame] = useState<'marketing' | 'auth' | 'workspace' | 'primitives'>('marketing');

  const sidebarMockItems = [
    { label: 'Dashboard', to: '/layout-preview#dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Courses', to: '/layout-preview#courses', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Settings', to: '/layout-preview#settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col font-body">
      {/* Visual Header Controls */}
      <div className="bg-[#f4efe6] border-b border-border py-4 px-6 sticky top-0 z-50 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
        <span className="font-heading text-h3 font-bold flex items-center">
          🛠️ Layout Engine Showcase <span className="ml-2 text-[10px] font-body uppercase border border-accent-gold/45 px-1.5 py-0.5 rounded-paper text-accent-gold font-semibold bg-surface">Phase 2</span>
        </span>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={activeFrame === 'marketing' ? 'primary' : 'outline'}
            onClick={() => setActiveFrame('marketing')}
          >
            Marketing Shell
          </Button>
          <Button
            size="sm"
            variant={activeFrame === 'auth' ? 'primary' : 'outline'}
            onClick={() => setActiveFrame('auth')}
          >
            Auth Split Shell
          </Button>
          <Button
            size="sm"
            variant={activeFrame === 'workspace' ? 'primary' : 'outline'}
            onClick={() => setActiveFrame('workspace')}
          >
            Workspace Shell
          </Button>
          <Button
            size="sm"
            variant={activeFrame === 'primitives' ? 'primary' : 'outline'}
            onClick={() => setActiveFrame('primitives')}
          >
            Engine Primitives
          </Button>
        </div>
      </div>

      {/* Frame Renderer */}
      <div className="flex-1 flex flex-col">
        {activeFrame === 'marketing' && (
          <div className="border-4 border-dashed border-accent-gold/30 rounded-lg m-4 overflow-hidden shadow-paper-floating flex flex-col min-h-[600px]">
            <Header transparent={false} />
            <main className="flex-grow">
              <Section bg="cream" spacing="md" dividerBottom="dark">
                <SectionHeader align="center">
                  <span className="text-caption font-semibold tracking-wider text-accent-gold uppercase font-body">Marketing Frame Outlet</span>
                  <h1 className="text-hero font-heading font-extrabold mt-2">Section with Cream Background</h1>
                </SectionHeader>
                <SectionBody>
                  <Container width="content" className="text-center">
                    <p className="text-body text-text-secondary leading-relaxed max-w-lg mx-auto">
                      This represents the marketing layout outlet area. Notice the header above and the announcement bar/footer. Below this section is a dark showcase section overlapping with a torn border.
                    </p>
                  </Container>
                </SectionBody>
              </Section>

              <Section bg="dark" spacing="md" overlap dividerBottom="cream">
                <SectionHeader align="center">
                  <h2 className="text-h1 font-heading text-background font-bold mt-2">Section with Dark Background</h2>
                </SectionHeader>
                <SectionBody>
                  <Container width="reading" className="text-center">
                    <p className="text-body text-text-muted leading-relaxed max-w-lg mx-auto">
                      This represents a physical dark sheet of paper overlayed on top of the cream section with a jagged torn-paper border divider.
                    </p>
                  </Container>
                </SectionBody>
              </Section>

              <Section bg="white" spacing="md">
                <SectionHeader align="center">
                  <h2 className="text-h1 font-heading text-text-primary font-bold mt-2">Section with White Background</h2>
                </SectionHeader>
                <SectionBody>
                  <Container width="content" className="text-center">
                    <p className="text-body text-text-secondary leading-relaxed max-w-lg mx-auto">
                      A flat white card layer section. Excellent for displaying data lists, tables, or courses.
                    </p>
                  </Container>
                </SectionBody>
              </Section>
            </main>
            <Footer />
          </div>
        )}

        {activeFrame === 'auth' && (
          <div className="border-4 border-dashed border-accent-gold/30 rounded-lg m-4 overflow-hidden shadow-paper-floating flex min-h-[600px] bg-background">
            {/* Split Left Illustration board */}
            <div className="w-1/2 bg-[#faf9f6] border-r border-border p-12 flex flex-col justify-between relative overflow-hidden paper-grid">
              <span className="font-heading text-h3 font-bold">PragyaOS</span>
              <div className="space-y-4 max-w-xs">
                <h3 className="text-h2 font-heading font-extrabold">Keep learning. <br/>Keep growing.</h3>
                <p className="text-small text-text-secondary leading-relaxed">
                  Lined notebooks, interactive codes, and responsive tutors.
                </p>
              </div>
              <p className="text-caption text-text-muted font-semibold uppercase">illustration panel</p>
              <div className="absolute right-6 top-16 opacity-30">
                <DoodleStar className="w-12 h-12 text-accent-gold" />
              </div>
            </div>
            {/* Split Right Content area */}
            <div className="w-1/2 flex items-center justify-center p-12">
              <div className="w-full max-w-xs text-center space-y-4">
                <span className="text-caption font-semibold tracking-wider text-accent-gold uppercase font-body">Form Outlet Block</span>
                <h4 className="text-h3 font-heading font-bold">Sign in to Space</h4>
                <div className="p-6 border border-border bg-surface shadow-card rounded-paper flex items-center justify-center min-h-[160px] text-caption text-text-muted italic">
                  [Place Login or Register forms inside this content outlet]
                </div>
              </div>
            </div>
          </div>
        )}

        {activeFrame === 'workspace' && (
          <div className="border-4 border-dashed border-accent-gold/30 rounded-lg m-4 overflow-hidden shadow-paper-floating flex min-h-[600px] bg-background">
            <Sidebar items={sidebarMockItems} />
            <div className="flex-1 flex flex-col min-w-0 bg-background">
              <Topbar title="Layout Dashboard" />
              <div className="flex-grow p-6">
                <div className="border border-divider border-dashed p-10 bg-surface rounded-paper text-center italic text-caption text-text-muted">
                  [Place workspace analytics, dashboards, or study editors inside this scrolling outlet]
                </div>
              </div>
            </div>
          </div>
        )}

        {activeFrame === 'primitives' && (
          <Container width="desktop" className="py-8 space-y-12">
            {/* Containers Width Check */}
            <div>
              <h3 className="text-h3 font-heading font-bold mb-4 border-b border-divider pb-2">1. Container System Widths</h3>
              <div className="space-y-4">
                <div className="bg-background-secondary border border-border p-3 rounded-paper text-caption font-semibold">
                  <Container width="desktop" className="bg-surface border border-divider py-1.5 text-center">Desktop Container (max-w-7xl)</Container>
                </div>
                <div className="bg-background-secondary border border-border p-3 rounded-paper text-caption font-semibold">
                  <Container width="content" className="bg-surface border border-divider py-1.5 text-center">Content Container (max-w-5xl)</Container>
                </div>
                <div className="bg-background-secondary border border-border p-3 rounded-paper text-caption font-semibold">
                  <Container width="reading" className="bg-surface border border-divider py-1.5 text-center">Reading Container (max-w-2xl)</Container>
                </div>
                <div className="bg-background-secondary border border-border p-3 rounded-paper text-caption font-semibold">
                  <Container width="narrow" className="bg-surface border border-divider py-1.5 text-center">Narrow Container (max-w-md)</Container>
                </div>
              </div>
            </div>

            {/* Paper Layers and Notebook Binder */}
            <div>
              <h3 className="text-h3 font-heading font-bold mb-4 border-b border-divider pb-2">2. Paper Layer Engine Primitives</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Spiral binder */}
                <div className="space-y-2">
                  <span className="text-caption font-semibold text-text-muted font-body">NotebookSection (Spiral bound card)</span>
                  <NotebookSection variant="lined" className="min-h-[160px] flex flex-col justify-between">
                    <p className="font-heading text-h3 text-text-primary">Ruled Page</p>
                    <p className="text-caption text-text-muted">Includes margin coil graphic binder.</p>
                  </NotebookSection>
                </div>

                {/* Sticky Section */}
                <div className="space-y-2">
                  <span className="text-caption font-semibold text-text-muted font-body">StickySection (Pinned card sheet)</span>
                  <StickySection color="green" decor="pin" className="min-h-[160px] flex flex-col justify-between">
                    <p className="font-heading text-h4 font-bold text-success">Push Pin Sheet</p>
                    <p className="text-caption text-text-muted leading-relaxed">Pinned layout section sheet.</p>
                  </StickySection>
                </div>

                {/* Stacks */}
                <div className="space-y-2">
                  <span className="text-caption font-semibold text-text-muted font-body">PaperStack (Stacked sheets cards)</span>
                  <PaperStack layers={3}>
                    <PaperLayer variant="grid" className="min-h-[160px] flex flex-col justify-between">
                      <p className="font-heading text-h3 text-text-primary">Stacked Grid</p>
                      <p className="text-caption text-text-muted">Uses offset layers underneath.</p>
                    </PaperLayer>
                  </PaperStack>
                </div>

                {/* Plain floating */}
                <div className="space-y-2">
                  <span className="text-caption font-semibold text-text-muted font-body">PaperLayer (Floating variant shadow)</span>
                  <PaperLayer variant="plain" shadow="floating" className="min-h-[160px] flex flex-col justify-between">
                    <p className="font-heading text-h3 text-text-primary">Floating Sheet</p>
                    <p className="text-caption text-text-muted">Deep shadow to represent floating sheets above backing.</p>
                  </PaperLayer>
                </div>
              </div>
            </div>
          </Container>
        )}
      </div>
    </div>
  );
}
