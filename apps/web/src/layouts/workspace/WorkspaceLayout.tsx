import { Outlet } from 'react-router';
import WorkspaceSidebar from '@/layouts/workspace/WorkspaceSidebar';
import WorkspaceTopbar from '@/layouts/workspace/WorkspaceTopbar';

/**
 * WorkspaceLayout — Production shell for all internal workspace pages.
 *
 * Structure:
 *   ├── WorkspaceSidebar  (dark, sticky, full-height, w-[--size-sidebar-workspace])
 *   └── flex-col main
 *       ├── WorkspaceTopbar  (sticky, h-[--size-header-workspace], glass on scroll)
 *       └── <main>           (scrollable content outlet)
 *
 * Consumes layout sizing tokens from @pragyaos/theme:
 *   --size-sidebar-workspace: 16rem
 *   --size-header-workspace:  3.5rem
 */
export function WorkspaceLayout(): React.JSX.Element {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-normal ease-in-out">
      {/* Sticky sidebar — always dark, anchored left */}
      <WorkspaceSidebar />

      {/* Main column — topbar + scrollable content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <WorkspaceTopbar />

        {/* Page content outlet */}
        <main
          id="workspace-main"
          tabIndex={-1}
          className="flex-1 overflow-y-auto focus:outline-none"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default WorkspaceLayout;
