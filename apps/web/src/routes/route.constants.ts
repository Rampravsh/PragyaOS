export const ROUTES = {
  HOME: "/",
  INSTRUCTORS: "/instructors",
  FEATURES: "/features",
  FEATURE_AI_LEARNING: "/features/ai-learning",
  FEATURE_LEARNING_EXPERIENCE: "/features/learning-experience",
  FEATURE_TEACHING_TOOLS: "/features/teaching-tools",
  FEATURE_ORGANIZATION: "/features/organization",
  FEATURE_COMMUNITY: "/features/community",
  PRICING: "/pricing",
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
