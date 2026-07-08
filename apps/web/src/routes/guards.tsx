import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface GuardProps {
  children?: React.ReactNode;
}

/**
 * AuthGuard - Allows access only to authenticated users.
 * Placeholder implementation: currently always allows access.
 */
export function AuthGuard({ children }: GuardProps) {
  const isAuthenticated = true; // Placeholder for future auth hook/state

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

/**
 * GuestGuard - Allows access only to unauthenticated guests (e.g. login/register pages).
 * Placeholder implementation: currently always allows access.
 */
export function GuestGuard({ children }: GuardProps) {
  const isAuthenticated = false; // Placeholder for future auth hook/state

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
