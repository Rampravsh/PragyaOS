import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from '@/routes';

// Compile the permanent browser router configuration
const router = createBrowserRouter(routes);

/**
 * AppRouter mounts the master routing switchboard.
 */
export function AppRouter(): React.JSX.Element {
  return <RouterProvider router={router} />;
}

export default AppRouter;
