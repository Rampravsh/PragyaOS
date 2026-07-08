import { Outlet } from 'react-router-dom';
import { AnnouncementBar, Header, Footer, PageTransition } from '@/components/layout';

export default function MarketingLayout() {
  return (
    <div className="app-wrapper bg-background text-text-primary">
      <AnnouncementBar
        message="Introducing PragyaOS Workspace — Plan, create and teach better, together."
        ctaText="Learn more"
        ctaHref="/docs"
        tag="NEW"
      />
      <Header />
      <main className="flex-grow">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
