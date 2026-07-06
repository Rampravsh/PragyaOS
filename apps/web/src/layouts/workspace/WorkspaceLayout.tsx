import { Outlet } from 'react-router';

/**
 * WorkspaceLayout structural composition.
 * Layout outline for internal dashboards (Student classroom, Instructor studio, Admin workspace).
 * Composes: Sidebar placeholder -> Topbar placeholder -> Content Outlet.
 * Strict: No styling or theme-local visual properties.
 */
export function WorkspaceLayout(): React.JSX.Element {
  return (
    <div className="workspace-layout">
      {/* Sidebar Placeholder */}
      <aside className="workspace-sidebar-placeholder">
        <nav>
          <span>PragyaOS Workspace Sidebar</span>
        </nav>
      </aside>

      <div className="workspace-container">
        {/* Topbar Placeholder */}
        <header className="workspace-topbar-placeholder">
          <span>PragyaOS Workspace Topbar</span>
        </header>

        {/* Content Outlet */}
        <main className="workspace-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default WorkspaceLayout;
