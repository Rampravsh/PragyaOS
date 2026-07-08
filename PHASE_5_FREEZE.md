# PragyaOS Frontend — Phase 5 Freeze Specification

This document details the identity layers, authentication screens, context providers, and validation hooks configured for PragyaOS.

---

## 1. Authentication Service & Context Mappings

- **Mock API Service** ([auth.ts](file:///g:/PragyaOS/apps/web/src/services/auth.ts)): Simulates network latencies. Manages credentials using `localStorage` triggers.
- **AuthProvider Context** ([AuthContext.tsx](file:///g:/PragyaOS/apps/web/src/context/AuthContext.tsx)): Distributes loading, credentials, session indicators, and methods globally.
- **App Guard Wraps** ([guards.tsx](file:///g:/PragyaOS/apps/web/src/routes/guards.tsx)): Controls route entry by querying `useAuth()`. Renders `<PageLoader />` during session evaluation.

---

## 2. Reusable Auth UI Component Catalog

Created in [components/auth/index.tsx](file:///g:/PragyaOS/apps/web/src/components/auth/index.tsx):
- `AuthCard`: Lined journal notebook wrapper with red pushpin layout decoration.
- `AuthHeader` & `AuthFooter`: Descriptive title templates.
- `AuthDivider` & `SocialLoginButtons`: Layout partitions and Google/GitHub login templates.
- `PasswordStrength`: Displays password security progress colors.
- `OTPInput`: Numeric digits slot values.
- `ErrorMessage` & `SuccessMessage`: Response notices.

---

## 3. Validation Guidelines

Forms utilize `React Hook Form` and `Zod` schemas:
- **Email checking**: Enforces email string formatting bounds.
- **Passwords checking**: Enforces min 6 characters length.
- **Visual styling**: Displays error boundaries inline below active inputs. Never shows raw stack traces.

---

## 4. Onboarding Complete Flow

Onboarding completion resides inside [IdentityCompletion.tsx](file:///g:/PragyaOS/apps/web/src/pages/identity/IdentityCompletion.tsx):
- Step 1: preferred study name and markdown bio.
- Step 2: role selections (Student, Instructor, Organization, Support). Role parameters collect attributes without hardcoded permission blocks.
- Step 3: Avatar configurations color choices.
- Step 4: completion success screen redirecting to `/dashboard`.

---

## 5. Router Configurations

Routes are lazy loaded and bound under guards in [router.tsx](file:///g:/PragyaOS/apps/web/src/routes/router.tsx):
- `/login` / `/register` -> wrapped inside `GuestGuard` + `AuthLayout`.
- `/identity/complete-profile` -> wrapped inside `AuthGuard` + `AuthLayout`.
- `/auth/verify-email`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/magic-link`, `/auth/2fa` -> inside `GuestGuard` + `AuthLayout`.
- `/auth/session-expired`, `/auth/logged-out`, `/auth/unauthorized` -> public under `BlankLayout`.

---

## 6. Future Integration Points

- **Authentication endpoints**: Replace the `authService` mock promises with actual Axios HTTP queries to your authentication backend endpoints.
- **SSO redirect bindings**: Map the magic link and SSO redirect functions inside `/auth/magic-link` to handle token query params from the auth server.
