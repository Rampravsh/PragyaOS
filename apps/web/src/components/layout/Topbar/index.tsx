
export interface TopbarProps {
  onToggleSidebar?: () => void;
  title?: string;
  className?: string;
}

export function Topbar({ onToggleSidebar, title = 'Dashboard', className = '' }: TopbarProps) {
  return (
    <header
      className={`h-16 bg-surface border-b border-border px-6 flex justify-between items-center z-30 shadow-navigation ${className}`}
    >
      <div className="flex items-center space-x-3">
        {/* Toggle Sidebar mobile drawer button */}
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden text-text-primary hover:text-accent-gold cursor-pointer p-1.5 transition-colors"
            aria-label="Toggle Navigation Panel"
          >
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          </button>
        )}
        {/* Breadcrumb Workspace Title */}
        <h2 className="font-heading text-h3 text-text-primary font-bold">
          {title}
        </h2>
      </div>

      {/* Right widgets */}
      <div className="flex items-center space-x-4">
        {/* Mock search box */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search workspace..."
            readOnly
            className="bg-background border border-border px-3 py-1.5 pl-8 rounded-paper text-small font-body shadow-button placeholder-text-muted/65 focus:outline-none w-48 cursor-pointer hover:border-accent-gold/45"
          />
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Action icons mockup */}
        <button
          type="button"
          className="text-text-muted hover:text-text-primary cursor-pointer p-1.5 transition-colors"
          aria-label="View Help"
        >
          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        <button
          type="button"
          className="text-text-muted hover:text-text-primary cursor-pointer p-1.5 transition-colors relative"
          aria-label="View Notifications"
        >
          <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-gold" />
        </button>
      </div>
    </header>
  );
}
