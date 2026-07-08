import { useState } from 'react';
import { Section, Container } from '@/components/layout';
import { MarketingHero, BlogCard } from '@/components/marketing';
import { Button, QuoteBlock } from '@/components/ui';
import { ArrowLeft, Clock, Search, User } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  desc: string;
  content: string[];
}

export default function BlogPage() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Design' | 'Cognitive' | 'Updates'>('All');

  const articles: Article[] = [
    {
      id: 'tactile-editors',
      title: 'The architectural choice for tactile editors',
      category: 'Design',
      author: 'Kabir Verma',
      date: 'July 5, 2026',
      desc: 'Why digital learning interfaces should mimic paper notebooks and how we built the stacked sheets shadow rules in CSS.',
      content: [
        'Introduction: Most modern learning portals look like generic database tables. We set out to change that by analyzing physical textbooks, journals, and lined notebooks.',
        'The Cognitive Connection: Drawing and reading on structured papers provides tactile anchors that aid memory. Lined margin dividers prevent horizontal visual drift.',
        'CSS Variable Layout: Stacking sheets is handled by offset box shadows. Radial dot grids are constructed in CSS to scale smoothly on responsive grids.',
        'Conclusion: Premium journal layouts are not just aesthetic choices. They define cognitive engagement bounds.',
      ],
    },
    {
      id: 'ai-companions',
      title: 'Cognitive indexing with AI study companions',
      category: 'Cognitive',
      author: 'Kabir Verma',
      date: 'June 28, 2026',
      desc: 'Integrating artificial intelligence within note editors to clear doubts without disrupting reading focus.',
      content: [
        'Introduction: Popups and chat sidebars disrupt the reading state. We wanted to design inline query loops directly on notes margins.',
        'Margin Query Mechanics: Highlight any word inside your study notebook to summon the companion definition block.',
        'Prompt Tuning: The AI assistant is constrained to provide brief, conceptually structured answers rather than generic paragraphs.',
      ],
    },
    {
      id: 'vite-variable-compiling',
      title: 'Tailwind CSS v4 variable compiling guidelines',
      category: 'Updates',
      author: 'Meera Sen',
      date: 'June 15, 2026',
      desc: 'Vite compilation metrics, dependency bundle optimization, and lazy load routes setup in React 19.',
      content: [
        'Vite configuration: Tailwind v4 shifts configurations into CSS stylesheets. This reduces JS compilation payloads.',
        'React 19 Typescript checking: Structuring barrel export loops prevents circular references and compiles 2x faster.',
      ],
    },
  ];

  const selectedPost = articles.find((a) => a.id === selectedPostId);

  const filteredArticles = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories: ('All' | 'Design' | 'Cognitive' | 'Updates')[] = ['All', 'Design', 'Cognitive', 'Updates'];

  if (selectedPost) {
    return (
      <article className="min-h-screen bg-background text-text-primary font-body text-left select-none">
        {/* Top Progress bar */}
        <div className="bg-[#f4efe6] border-b border-border py-4.5 px-6 flex justify-between items-center sticky top-16 z-30 select-none">
          <button
            type="button"
            onClick={() => setSelectedPostId(null)}
            className="flex items-center space-x-2 text-text-primary hover:text-accent-gold font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to articles</span>
          </button>
          <div className="flex items-center space-x-4 text-caption text-text-muted">
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> 7 min read</span>
            <span className="bg-accent-gold/10 text-accent-gold px-2 py-0.5 rounded-sm uppercase font-bold text-[10px]">
              {selectedPost.category}
            </span>
          </div>
        </div>

        {/* Editorial container */}
        <Container width="desktop" className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Table of contents left */}
            <div className="hidden lg:block lg:col-span-3 space-y-4 pt-2">
              <span className="text-caption font-bold text-text-primary uppercase tracking-widest block">
                Article Outline
              </span>
              <ul className="space-y-2 border-l border-divider pl-4 text-small text-text-secondary">
                <li className="font-semibold text-accent-gold">1. Introduction</li>
                <li className="hover:text-text-primary transition-colors cursor-pointer">2. Cognitive mechanics</li>
                <li className="hover:text-text-primary transition-colors cursor-pointer">3. Design variable specifications</li>
                <li className="hover:text-text-primary transition-colors cursor-pointer">4. Summaries conclusions</li>
              </ul>
            </div>

            {/* Content center */}
            <div className="lg:col-span-6 space-y-8">
              <h1 className="text-display-lg font-heading text-text-primary leading-tight font-extrabold">
                {selectedPost.title}
              </h1>

              <div className="space-y-6 text-body-lg text-text-secondary leading-relaxed font-body">
                {selectedPost.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Quote Block from Phase 1 */}
              <QuoteBlock
                quote="Designing online notebooks requires respect for cognitive anchors. Visual texture matters as much as code performance."
                authorName="Kabir Verma"
                authorTitle="Design Lead"
              />
            </div>

            {/* Author card right */}
            <div className="lg:col-span-3 space-y-6 pt-2">
              <div className="border border-border bg-surface p-5 rounded-paper shadow-button text-left">
                <span className="text-caption font-bold text-text-primary uppercase tracking-widest block mb-4">
                  Author Profile
                </span>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-accent-gold/15 text-accent-gold font-bold flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-small font-heading font-extrabold text-text-primary leading-none">{selectedPost.author}</h4>
                    <span className="text-[10px] text-text-muted font-body mt-0.5 block">Writer & Founder</span>
                  </div>
                </div>
                <p className="text-caption text-text-muted leading-relaxed font-body">
                  Cabinet design lead dedicated to cognitive learning interfaces and layout variables.
                </p>
              </div>
            </div>

          </div>
        </Container>

        {/* Related Articles */}
        <Section bg="cream" spacing="md" className="border-t border-border">
          <Container width="desktop">
            <h3 className="text-h2 font-heading text-text-primary font-bold text-center mb-10">Read next</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {articles.filter((a) => a.id !== selectedPost.id).slice(0, 2).map((art, idx) => (
                <BlogCard
                  key={idx}
                  to={`/blog#${art.id}`}
                  title={art.title}
                  category={art.category}
                  author={art.author}
                  date={art.date}
                  desc={art.desc}
                />
              ))}
            </div>
          </Container>
        </Section>
      </article>
    );
  }

  return (
    <>
      <MarketingHero
        tag="Blog"
        title="Notes, guidelines, and design"
        italicTitle="specifications."
        desc="Read regular essays written by our coordinators detailing system engineering, cognitive learning paths, and typography layouts."
      />

      <Section bg="white" spacing="md">
        <Container width="desktop">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-b border-divider pb-6 mb-10 gap-4 select-none">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant={activeCategory === cat ? 'primary' : 'outline'}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            {/* Search mockup */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background border border-border px-3 py-1.5 pl-8 rounded-paper text-small font-body shadow-button placeholder-text-muted/65 focus:outline-none w-full"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            </div>
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredArticles.map((art, idx) => (
              <div key={idx} onClick={() => setSelectedPostId(art.id)}>
                <BlogCard
                  to="#"
                  title={art.title}
                  category={art.category}
                  author={art.author}
                  date={art.date}
                  desc={art.desc}
                />
              </div>
            ))}
            {filteredArticles.length === 0 && (
              <div className="col-span-3 py-16 text-center text-text-muted italic text-caption border border-divider rounded-paper">
                No articles matches search query coordinates.
              </div>
            )}
          </div>

        </Container>
      </Section>
    </>
  );
}
