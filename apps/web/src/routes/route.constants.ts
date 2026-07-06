export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PORTAL: '/portal',
  STUDIO: '/studio',
  ADMIN: '/admin',
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
