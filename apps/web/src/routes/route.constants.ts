export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  VERIFY_EMAIL: "/verify-email",
  RESET_PASSWORD: "/reset-password",
  PORTAL: "/portal",
  STUDIO: "/studio",
  ADMIN: "/admin",
  COURSE_DETAILS: "/courses/:slug",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
