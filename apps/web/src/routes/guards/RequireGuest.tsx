import { ReactNode } from 'react';
import { Outlet } from 'react-router';

interface RequireGuestProps {
  children?: ReactNode;
}

/**
 * RequireGuest Guard Placeholder.
 * Currently forwards children/Outlet. In Prompt 005, this will redirect authenticated users back to the dashboard.
 */
export function RequireGuest({ children }: RequireGuestProps): React.JSX.Element {
  return children ? <>{children}</> : <Outlet />;
}

export default RequireGuest;
