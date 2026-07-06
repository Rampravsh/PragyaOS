import { ReactNode } from 'react';
import { RoutePath } from '@/routes/route.constants';

export interface RouteMeta {
  requiresAuth?: boolean;
  guestOnly?: boolean;
  roles?: string[];
  title?: string;
}

export interface RouteDefinition {
  path: RoutePath;
  element: ReactNode;
  meta?: RouteMeta;
}
