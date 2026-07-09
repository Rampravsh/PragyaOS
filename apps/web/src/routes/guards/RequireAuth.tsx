import { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes/route.constants';

interface RequireAuthProps {
  children?: ReactNode;
}

/**
 * RequireAuth Guard.
 * Validates active session and redirects guest visitors to the login gate.
 */
export function RequireAuth({ children }: RequireAuthProps): React.JSX.Element {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground font-sans text-sm">
        Loading session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default RequireAuth;
