import { ReactNode } from 'react';
import { Outlet } from 'react-router';

interface RequireAuthProps {
  children?: ReactNode;
}

/**
 * RequireAuth Guard Placeholder.
 * Currently forwards children/Outlet. In Prompt 005, this will implement token checks and redirection.
 */
export function RequireAuth({ children }: RequireAuthProps): React.JSX.Element {
  return children ? <>{children}</> : <Outlet />;
}

export default RequireAuth;
