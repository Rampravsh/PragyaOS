import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthGuard, GuestGuard } from './guards';
import { MarketingLayout } from '@/layouts';

// Lazy load placeholder pages
const HomePage = React.lazy(() => import('@/pages/Home'));
const LoginPage = React.lazy(() => import('@/pages/Login'));
const RegisterPage = React.lazy(() => import('@/pages/Register'));
const DashboardPage = React.lazy(() => import('@/pages/Dashboard'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFound'));
const DesignSystemPage = React.lazy(() => import('@/pages/DesignSystem'));
const LayoutPreviewPage = React.lazy(() => import('@/pages/LayoutPreview'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketingLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
    path: 'not-found',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to="/not-found" replace />,
  },
]);
