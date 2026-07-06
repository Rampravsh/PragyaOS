import { Outlet } from 'react-router';

/**
 * MarketingLayout structural composition.
 * Layout outline for marketing public pages (Home, Landing, Discovery catalog).
 * Composes: Header placeholder -> Main Content -> Footer placeholder.
 * Strict: No styling or theme-local visual properties.
 */
export function MarketingLayout(): React.JSX.Element {
  return (
    <div className="marketing-layout">
      {/* Header Placeholder */}
      <header className="marketing-header-placeholder">
        <nav>
          <span>PragyaOS Marketing Nav</span>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="marketing-main-content">
        <Outlet />
      </main>

      {/* Footer Placeholder */}
      <footer className="marketing-footer-placeholder">
        <span>&copy; PragyaOS Marketing Footer</span>
      </footer>
    </div>
  );
}

export default MarketingLayout;
