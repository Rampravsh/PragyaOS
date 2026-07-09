import { lazy, Suspense } from "react";
import { RouteObject } from "react-router";
import { ROUTES } from "@/routes/route.constants";

// Layout Imports
import MarketingLayout from "@/layouts/marketing/MarketingLayout";
import WorkspaceLayout from "@/layouts/workspace/WorkspaceLayout";

// Guard Imports
import RequireAuth from "@/routes/guards/RequireAuth";
import RequireGuest from "@/routes/guards/RequireGuest";
import RequireRole from "@/routes/guards/RequireRole";

// Lazy-loaded pages
const LazyHome = lazy(() => import("@/pages/home"));
const LazyCourseDetails = lazy(() => import("@/pages/courses/detail"));
const LazyInstructors = lazy(() => import("@/pages/instructors"));
const LazyFeatures = lazy(() => import("@/pages/features"));
const LazyFeatureAILearning = lazy(() => import("@/pages/features/ai-learning"));
const LazyFeatureLearningExperience = lazy(() => import("@/pages/features/learning-experience"));
const LazyFeatureTeachingTools = lazy(() => import("@/pages/features/teaching-tools"));
const LazyFeatureOrganization = lazy(() => import("@/pages/features/organization"));
const LazyFeatureCommunity = lazy(() => import("@/pages/features/community"));
const LazyPricing = lazy(() => import("@/pages/pricing"));
const LazyResources = lazy(() => import("@/pages/resources"));
const LazyResourceBlog = lazy(() => import("@/pages/resources/blog"));
const LazyResourceDocumentation = lazy(() => import("@/pages/resources/documentation"));
const LazyResourceHelpCenter = lazy(() => import("@/pages/resources/help-center"));
const LazyResourceCommunity = lazy(() => import("@/pages/resources/community"));
const LazyLogin = lazy(() => import("@/pages/login"));
const LazyRegister = lazy(() => import("@/pages/register"));
const LazyForgotPassword = lazy(() => import("@/pages/forgot-password"));
const LazyVerifyEmail = lazy(() => import("@/pages/verify-email"));
const LazyResetPassword = lazy(() => import("@/pages/reset-password"));
const LazyPortal = lazy(() => import("@/pages/portal"));
const LazyStudio = lazy(() => import("@/pages/studio"));
const LazyAdmin = lazy(() => import("@/pages/admin"));
const LazyAbout = lazy(() => import("@/pages/about"));
const LazyCareers = lazy(() => import("@/pages/careers"));
const LazyContact = lazy(() => import("@/pages/contact"));
const LazyFAQ = lazy(() => import("@/pages/faq"));
const LazyPrivacy = lazy(() => import("@/pages/legal/privacy"));
const LazyTerms = lazy(() => import("@/pages/legal/terms"));
const LazyCookie = lazy(() => import("@/pages/legal/cookie"));
const LazyChangelog = lazy(() => import("@/pages/changelog"));
const LazyStatus = lazy(() => import("@/pages/status"));
const LazyNotFound = lazy(() => import("@/pages/not-found"));

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
      {
        path: ROUTES.INSTRUCTORS,
        element: withSuspense(LazyInstructors),
      },
      {
        path: ROUTES.FEATURES,
        element: withSuspense(LazyFeatures),
      },
      {
        path: ROUTES.FEATURE_AI_LEARNING,
        element: withSuspense(LazyFeatureAILearning),
      },
      {
        path: ROUTES.FEATURE_LEARNING_EXPERIENCE,
        element: withSuspense(LazyFeatureLearningExperience),
      },
      {
        path: ROUTES.FEATURE_TEACHING_TOOLS,
        element: withSuspense(LazyFeatureTeachingTools),
      },
      {
        path: ROUTES.FEATURE_ORGANIZATION,
        element: withSuspense(LazyFeatureOrganization),
      },
      {
        path: ROUTES.FEATURE_COMMUNITY,
        element: withSuspense(LazyFeatureCommunity),
      },
      {
        path: ROUTES.PRICING,
        element: withSuspense(LazyPricing),
      },
      {
        path: ROUTES.RESOURCES,
        element: withSuspense(LazyResources),
      },
      {
        path: ROUTES.RESOURCE_BLOG,
        element: withSuspense(LazyResourceBlog),
      },
      {
        path: ROUTES.RESOURCE_DOCUMENTATION,
        element: withSuspense(LazyResourceDocumentation),
      },
      {
        path: ROUTES.RESOURCE_HELP_CENTER,
        element: withSuspense(LazyResourceHelpCenter),
      },
      {
        path: ROUTES.RESOURCE_COMMUNITY,
        element: withSuspense(LazyResourceCommunity),
      },
      {
        path: ROUTES.COURSE_DETAILS,
        element: withSuspense(LazyCourseDetails),
      },
      {
        path: ROUTES.ABOUT,
        element: withSuspense(LazyAbout),
      },
      {
        path: ROUTES.CAREERS,
        element: withSuspense(LazyCareers),
      },
      {
        path: ROUTES.CONTACT,
        element: withSuspense(LazyContact),
      },
      {
        path: ROUTES.FAQ,
        element: withSuspense(LazyFAQ),
      },
      {
        path: ROUTES.PRIVACY,
        element: withSuspense(LazyPrivacy),
      },
      {
        path: ROUTES.TERMS,
        element: withSuspense(LazyTerms),
      },
      {
        path: ROUTES.COOKIE,
        element: withSuspense(LazyCookie),
      },
      {
        path: ROUTES.CHANGELOG,
        element: withSuspense(LazyChangelog),
      },
      {
        path: ROUTES.STATUS,
        element: withSuspense(LazyStatus),
      },
      {
        path: "*",
        element: withSuspense(LazyNotFound),
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
              <RequireRole allowedRoles={["instructor", "admin"]}>
                {withSuspense(LazyStudio)}
              </RequireRole>
            ),
          },
          // Global administration console (requires 'admin' privilege)
          {
            path: ROUTES.ADMIN,
            element: <RequireRole allowedRoles={["admin"]}>{withSuspense(LazyAdmin)}</RequireRole>,
          },
        ],
      },
    ],
  },
];

export default routes;
