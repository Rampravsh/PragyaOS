import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthGuard, GuestGuard } from './guards';
import { MarketingLayout, BlankLayout } from '@/layouts';

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
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
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
    ],
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
]);
