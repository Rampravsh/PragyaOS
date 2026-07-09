import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes/route.constants';

interface RequireRoleProps {
  allowedRoles: string[];
  children?: ReactNode;
}

/**
 * RequireRole Guard.
 * Matches current user role against allowed access levels.
 */
export function RequireRole({
  allowedRoles,
  children,
}: RequireRoleProps): React.JSX.Element {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    // If not authorized, fallback safely to student workspace portal
    return <Navigate to={ROUTES.PORTAL} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default RequireRole;
