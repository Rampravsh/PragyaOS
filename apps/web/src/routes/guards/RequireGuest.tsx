import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes/route.constants';

interface RequireGuestProps {
  children?: ReactNode;
}

/**
 * RequireGuest Guard.
 * Prevents authenticated users from visiting guest-only auth forms.
 */
export function RequireGuest({ children }: RequireGuestProps): React.JSX.Element {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground font-sans text-sm">
        Loading session...
      </div>
    );
  }

  if (user) {
    return <Navigate to={ROUTES.PORTAL} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default RequireGuest;
