import React from "react";
import { Outlet, useLocation } from "react-router";
import SkipToContent from "@/layouts/marketing/SkipToContent";
import AnnouncementBar from "@/layouts/marketing/AnnouncementBar";
import MarketingHeader from "@/layouts/marketing/MarketingHeader";
import MarketingFooter from "@/layouts/marketing/MarketingFooter";

/**
 * MarketingLayout: Parent shell wrapping public-facing page routes.
 * Composes: SkipToContent -> AnnouncementBar -> MarketingHeader -> Main Outlet -> MarketingFooter.
 */
export function MarketingLayout(): React.JSX.Element {
  const { pathname } = useLocation();
  const authPaths = ["/login", "/register", "/forgot-password", "/verify-email", "/reset-password"];
  const isAuthPage = authPaths.includes(pathname);

  if (isAuthPage) {
    return (
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        <Outlet />
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-normal ease-in-out">
      {/* 1. Skip Link for keyboard navigation accessibility */}
      <SkipToContent />

      {/* 2. Dismissible Notification strip */}
      <AnnouncementBar />

      {/* 3. Sticky navigation header */}
      <MarketingHeader />

      {/* 4. Main content viewport slot */}
      {/* tabIndex={-1} is required to safely receive keyboard focus from skip link */}
      <main id="main-content" className="flex-1 flex flex-col focus:outline-none" tabIndex={-1}>
        <Outlet />
      </main>

      {/* 5. Master navigation footer */}
      <MarketingFooter />
    </div>
  );
}

export default MarketingLayout;
