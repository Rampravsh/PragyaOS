import { ReactNode } from 'react';
import { Outlet } from 'react-router';

interface RequireRoleProps {
  allowedRoles: string[];
  children?: ReactNode;
}

/**
 * RequireRole Guard Placeholder.
 * Currently forwards children/Outlet. In Prompt 005, this will match user permissions and roles.
 */
export function RequireRole({
  allowedRoles,
  children,
}: RequireRoleProps): React.JSX.Element {
  // Suppress unused variable warning until roles are connected
  console.log('[RequireRole Guard Allowed Roles]:', allowedRoles);

  return children ? <>{children}</> : <Outlet />;
}

export default RequireRole;
