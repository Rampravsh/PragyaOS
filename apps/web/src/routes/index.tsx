import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router';
import { ROUTES } from '@/routes/route.constants';

// Layout Imports
import MarketingLayout from '@/layouts/marketing/MarketingLayout';
import WorkspaceLayout from '@/layouts/workspace/WorkspaceLayout';

// Guard Imports
import RequireAuth from '@/routes/guards/RequireAuth';
import RequireGuest from '@/routes/guards/RequireGuest';
import RequireRole from '@/routes/guards/RequireRole';

// Lazy-loaded pages
const LazyHome = lazy(() => import('@/pages/home'));
const LazyLogin = lazy(() => import('@/pages/login'));
const LazyRegister = lazy(() => import('@/pages/register'));
const LazyForgotPassword = lazy(() => import('@/pages/forgot-password'));
const LazyVerifyEmail = lazy(() => import('@/pages/verify-email'));
const LazyResetPassword = lazy(() => import('@/pages/reset-password'));
const LazyPortal = lazy(() => import('@/pages/portal'));
const LazyStudio = lazy(() => import('@/pages/studio'));
const LazyAdmin = lazy(() => import('@/pages/admin'));

// Suspense Helper for lazy components
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

/**
 * Main application routing configuration.
 * Groups routes under layouts (MarketingLayout, WorkspaceLayout)
 * and guards (RequireGuest, RequireAuth, RequireRole).
 */
export const routes: RouteObject[] = [
  // 1. Public Marketing Routes
  {
    element: <MarketingLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: withSuspense(LazyHome),
      },
    ],
  },

  // 2. Guest Authentication Routes
  {
    element: <RequireGuest />,
    children: [
      {
        element: <MarketingLayout />, // Login page resides within the Marketing Frame structure
        children: [
          {
            path: ROUTES.LOGIN,
            element: withSuspense(LazyLogin),
          },
          {
            path: ROUTES.REGISTER,
            element: withSuspense(LazyRegister),
          },
          {
            path: ROUTES.FORGOT_PASSWORD,
            element: withSuspense(LazyForgotPassword),
          },
          {
            path: ROUTES.VERIFY_EMAIL,
            element: withSuspense(LazyVerifyEmail),
          },
          {
            path: ROUTES.RESET_PASSWORD,
            element: withSuspense(LazyResetPassword),
          },
        ],
      },
    ],
  },

  // 3. Authenticated Workspace Routes
  {
    element: <RequireAuth />,
    children: [
      {
        element: <WorkspaceLayout />,
        children: [
          // Student portal dashboard
          {
            path: ROUTES.PORTAL,
            element: withSuspense(LazyPortal),
          },
          // Instructor studio curriculum builder (requires 'instructor' or 'admin' privilege)
          {
            path: ROUTES.STUDIO,
            element: (
              <RequireRole allowedRoles={['instructor', 'admin']}>
                {withSuspense(LazyStudio)}
              </RequireRole>
            ),
          },
          // Global administration console (requires 'admin' privilege)
          {
            path: ROUTES.ADMIN,
            element: (
              <RequireRole allowedRoles={['admin']}>
                {withSuspense(LazyAdmin)}
              </RequireRole>
            ),
          },
        ],
      },
    ],
  },
];

export default routes;
