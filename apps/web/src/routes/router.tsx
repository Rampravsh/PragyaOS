import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthGuard, GuestGuard } from './guards';
import { MarketingLayout, BlankLayout, AuthLayout } from '@/layouts';

// Lazy load placeholder pages
const HomePage = React.lazy(() => import('@/pages/Home'));
const LoginPage = React.lazy(() => import('@/pages/Login'));
const RegisterPage = React.lazy(() => import('@/pages/Register'));
const DashboardPage = React.lazy(() => import('@/pages/Dashboard'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFound'));
const ServerErrorPage = React.lazy(() => import('@/pages/ServerError'));
const DesignSystemPage = React.lazy(() => import('@/pages/DesignSystem'));
const LayoutPreviewPage = React.lazy(() => import('@/pages/LayoutPreview'));

// Lazy load marketing pages
const FeaturesPage = React.lazy(() => import('@/pages/Features'));
const SolutionsPage = React.lazy(() => import('@/pages/Solutions'));
const PricingPage = React.lazy(() => import('@/pages/Pricing'));
const AboutPage = React.lazy(() => import('@/pages/About'));
const ResourcesPage = React.lazy(() => import('@/pages/Resources'));
const BlogPage = React.lazy(() => import('@/pages/Blog'));
const DocumentationPage = React.lazy(() => import('@/pages/Documentation'));
const HelpCenterPage = React.lazy(() => import('@/pages/HelpCenter'));
const ContactPage = React.lazy(() => import('@/pages/Contact'));
const CareersPage = React.lazy(() => import('@/pages/Careers'));
const FAQPage = React.lazy(() => import('@/pages/FAQ'));

// Lazy load legal pages
const PrivacyPage = React.lazy(() => import('@/pages/Legal').then(m => ({ default: m.PrivacyPage })));
const TermsPage = React.lazy(() => import('@/pages/Legal').then(m => ({ default: m.TermsPage })));
const CookiesPage = React.lazy(() => import('@/pages/Legal').then(m => ({ default: m.CookiesPage })));

// Lazy load auth & recovery pages
const ForgotPasswordPage = React.lazy(() => import('@/pages/auth/PasswordRecovery').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = React.lazy(() => import('@/pages/auth/PasswordRecovery').then(m => ({ default: m.ResetPasswordPage })));

// Lazy load verification pages
const VerifyEmailPage = React.lazy(() => import('@/pages/auth/VerificationFlow').then(m => ({ default: m.VerifyEmailPage })));
const MagicLinkPage = React.lazy(() => import('@/pages/auth/VerificationFlow').then(m => ({ default: m.MagicLinkPage })));
const TwoFactorPage = React.lazy(() => import('@/pages/auth/VerificationFlow').then(m => ({ default: m.TwoFactorPage })));

// Lazy load session states
const SessionExpiredPage = React.lazy(() => import('@/pages/auth/SessionState').then(m => ({ default: m.SessionExpiredPage })));
const LoggedOutPage = React.lazy(() => import('@/pages/auth/SessionState').then(m => ({ default: m.LoggedOutPage })));
const UnauthorizedPage = React.lazy(() => import('@/pages/auth/SessionState').then(m => ({ default: m.UnauthorizedPage })));

// Lazy load profile onboarding
const IdentityCompletionPage = React.lazy(() => import('@/pages/identity/IdentityCompletion'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketingLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'features',
        element: <FeaturesPage />,
      },
      {
        path: 'solutions',
        element: <SolutionsPage />,
      },
      {
        path: 'pricing',
        element: <PricingPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'resources',
        element: <ResourcesPage />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'docs',
        element: <DocumentationPage />,
      },
      {
        path: 'help',
        element: <HelpCenterPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'careers',
        element: <CareersPage />,
      },
      {
        path: 'faq',
        element: <FAQPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'security',
        element: <CookiesPage />,
      },
    ],
  },
  {
    path: '/design-system',
    element: <DesignSystemPage />,
  },
  {
    path: '/layout-preview',
    element: <LayoutPreviewPage />,
  },
  {
    element: <GuestGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
          {
            path: 'auth/forgot-password',
            element: <ForgotPasswordPage />,
          },
          {
            path: 'auth/reset-password',
            element: <ResetPasswordPage />,
          },
          {
            path: 'auth/verify-email',
            element: <VerifyEmailPage />,
          },
          {
            path: 'auth/magic-link',
            element: <MagicLinkPage />,
          },
          {
            path: 'auth/2fa',
            element: <TwoFactorPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'identity/complete-profile',
            element: <IdentityCompletionPage />,
          },
        ],
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      {
        path: 'not-found',
        element: <NotFoundPage />,
      },
      {
        path: 'server-error',
        element: <ServerErrorPage />,
      },
      {
        path: 'auth/session-expired',
        element: <SessionExpiredPage />,
      },
      {
        path: 'auth/logged-out',
        element: <LoggedOutPage />,
      },
      {
        path: 'auth/unauthorized',
        element: <UnauthorizedPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
]);
