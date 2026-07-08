import { useState } from 'react';
import { Section, Container } from '@/components/layout';
import { DocumentationSidebar } from '@/components/marketing';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

export default function DocumentationPage() {
  const [activePath, setActivePath] = useState('overview');

  const topics = [
    {
      category: 'Getting Started',
      articles: [
        { label: 'Overview', path: 'overview' },
        { label: 'System Requirements', path: 'requirements' },
        { label: 'Folder Mappings', path: 'folders' },
      ],
    },
    {
      category: 'Editor Guide',
      articles: [
        { label: 'Lined Notebook Paper', path: 'paper' },
        { label: 'AI companion tutoring', path: 'companion' },
        { label: 'Coil bindings details', path: 'bindings' },
      ],
    },
  ];

  const contentMap: Record<string, { title: string; desc: string; sections: { h4: string; body: string }[] }> = {
    overview: {
      title: 'Platform Overview',
      desc: 'PragyaOS is a premium, distraction-free study coordinate workspace designed to make learning active and human.',
      sections: [
        { h4: 'Tactile Notebook Core', body: 'We replace chaotic SaaS dashboards with structured journal sheets mimicking physical binders and notebooks. Radial dot grids and lined horizontal rules provide anchor lines for reading and drafting.' },
        { h4: 'Isolated Pages Routing', body: 'Pages compose layout primitives cleanly under Marketing, Auth, and Workspace shells. Sub-routes nest inside `<Outlet />` tags wrapped in entry motion fades.' },
      ],
    },
    requirements: {
      title: 'System Requirements',
      desc: 'PragyaOS is built using modern React 19 and Vite configurations compiled to static assets.',
      sections: [
        { h4: 'Vite Compilation Environment', body: 'Requires Node.js 18 or above, and standard package managers like pnpm. Tailwind CSS v4 variables are aggregated into globals.css.' },
        { h4: 'Browser Compatibility', body: 'Supports all modern browsers with viewport rendering capabilities. Utilizes hardware acceleration for Framer Motion scroll indicators.' },
      ],
    },
    folders: {
      title: 'Folder Mappings',
      desc: 'PragyaOS structures codebase dependencies inside self-contained modules.',
      sections: [
        { h4: 'Clean Architecture Mappings', body: 'All assets reside in apps/web/src/. Primitives occupy components/ui/, layout structures occupy components/layout/, and layouts templates reside in layouts/.' },
      ],
    },
    paper: {
      title: 'Lined Notebook Paper Configuration',
      desc: 'Configuring custom lined and grid paper textures.',
      sections: [
        { h4: 'Lined Ruling Rules', body: 'Lined notebook papers use horizontal background lines mapped with red margins. Shadows are applied to simulate 3D offset layered stacked paper cards.' },
      ],
    },
    companion: {
      title: 'AI Companion Tutoring',
      desc: 'Activating inline companion tutoring query margins.',
      sections: [
        { h4: 'Concept Highlight queries', body: 'Students can click or highlight words inside study sheets to retrieve structured definitions and coordinates directly in note borders.' },
      ],
    },
    bindings: {
      title: 'Coil Bindings & Tape details',
      desc: 'Adding handcrafted notebook coil binders and tapes to layout wrappers.',
      sections: [
        { h4: 'Spiral Coil Vectors', body: 'Spiral binder loops can be enabled on NotebookSections by passing the variant lined or grid prop. It automatically adds the coil doodle.' },
      ],
    },
  };

  const currentDoc = contentMap[activePath] || contentMap.overview;

  // Flatten articles for prev/next helper
  const allArticles = topics.flatMap(t => t.articles);
  const currentIndex = allArticles.findIndex(a => a.path === activePath);
  const prevDoc = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextDoc = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <Section bg="white" spacing="none" className="min-h-screen border-b border-border select-none">
      <Container width="desktop" className="flex py-12">
        {/* Left Doc Sidebar */}
        <DocumentationSidebar
          topics={topics}
          activePath={activePath}
          onSelect={(path) => setActivePath(path)}
        />

        {/* Right Content area */}
        <main className="flex-1 pl-10 text-left space-y-8 max-w-2xl font-body">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-caption text-text-muted">
              <BookOpen className="w-4 h-4 text-accent-gold" />
              <span>Developer Reference</span>
              <span>&middot;</span>
              <span>Updated June 2026</span>
            </div>
            <h1 className="text-display-lg font-heading font-extrabold text-text-primary leading-tight">
              {currentDoc.title}
            </h1>
            <p className="text-body-lg text-text-secondary leading-relaxed font-body border-b border-divider pb-6">
              {currentDoc.desc}
            </p>
          </div>

          <div className="space-y-8">
            {currentDoc.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-body-lg font-heading font-extrabold text-text-primary">
                  {sec.h4}
                </h4>
                <p className="text-small text-text-secondary leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          {/* Navigation controls previous / next */}
          <div className="flex justify-between items-center pt-8 border-t border-divider select-none mt-12 gap-4">
            {prevDoc ? (
              <button
                type="button"
                onClick={() => setActivePath(prevDoc.path)}
                className="flex items-center space-x-2 text-small font-semibold text-text-primary hover:text-accent-gold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
                <span>{prevDoc.label}</span>
              </button>
            ) : (
              <div />
            )}

            {nextDoc ? (
              <button
                type="button"
                onClick={() => setActivePath(nextDoc.path)}
                className="flex items-center space-x-2 text-small font-semibold text-text-primary hover:text-accent-gold transition-colors cursor-pointer"
              >
                <span>{nextDoc.label}</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            ) : (
              <div />
            )}
          </div>
        </main>
      </Container>
    </Section>
  );
}
