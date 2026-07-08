import React from 'react';
import { Outlet, useLocation, useMatches } from 'react-router-dom';
import { AnnouncementBar, Header, Footer, CtaBanner, PageTransition } from '@/components/layout';

export interface MarketingLayoutProps {
  children?: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  const location = useLocation();
  const matches = useMatches();

  // Retrieve route handle properties
  const currentMatch = matches[matches.length - 1];
  const handle = (currentMatch?.handle as any) || {};
  
  // By default, show CTA banner on all sub-pages, hide it on homepage or opt-out routes
  const isHomepage = location.pathname === '/';
  const showCta = handle.showCtaBanner !== false && !isHomepage;

  const content = children || <Outlet />;

  return (
    <div className="app-wrapper bg-background text-text-primary flex flex-col min-h-screen">
      <AnnouncementBar
        message="Introducing PragyaOS Workspace — Plan, create and teach better, together."
        ctaText="Explore now"
        ctaHref="/docs"
        tag="NEW"
      />
      <Header />
      <main className="flex-grow flex flex-col">
        <PageTransition>
          {content}
        </PageTransition>
      </main>
      {showCta && <CtaBanner />}
      <Footer />
    </div>
  );
}
