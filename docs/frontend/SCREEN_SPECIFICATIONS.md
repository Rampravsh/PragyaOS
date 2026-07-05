# PragyaOS Screen Specifications Directory

**Product Name:** PragyaOS  
**Category:** Enterprise Learning Experience Platform (LXP)  
**Author:** Antigravity (Principal Product Designer & UX Architect)  
**Status:** Approved (v1.0 Production Blueprint)

This document is the single source of truth for all product screens, layouts, interactions, data dependencies, and state boundaries across the PragyaOS frontend. It bridges Design (Figma, Google Stitch), Engineering (React 19 implementations), QA verification, and AI-assisted generation prompts.

---

# Part 1: Core Layout Schematics

All product screens inherit from one of four structural layout shells, defined in `@/layouts`:

```
┌────────────────────────────────────────────────────────────────────────┐
│                              MARKETING SHELL                           │
│  [Top Header: Editorial Nav]                                           │
│  [Wide Asymmetrical Hero Layout - Serif Typography]                    │
│  [Dynamic organic scroll elements & layered panels]                    │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│                              WORKSPACE SHELL                           │
│  [Top Bar: Command Palette & Notifications Indicator]                  │
│  ├─────────────┬──────────────────────────────────────────────────────┤│
│  │ Collapsible │ Workspace Fluid View Grid (100% width)               ││
│  │ Sidebar Nav │ Dense Tables / Form Builders                         ││
│  └─────────────┴──────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────────────┘
```

1.  **MarketingLayout (Ellipsus-inspired)**: Large serif typography (`font-serif`), double vertical padding scales (`py-20`), cream paper backgrounds, and organic asymmetrical grids.
2.  **WorkspaceLayout (Linear/Stripe-inspired)**: Strict sans typography (`font-sans`), tight grid margins (`gap-4`), collapsing sidebars, and full-width container views.
3.  **AuthLayout**: Centered minimal grids for credential entries.
4.  **StudioLayout**: Multi-panel split grid layouts (Navigator, Editor, Inspector) optimized for course design.

---

# Part 2: Category A — Marketing Experience

The Marketing Experience is public-facing. It uses `MarketingLayout`, has full SEO optimization, and focuses on branding, discovery, and conversion.

## 1. Landing Screen
*   **Screen Purpose**: Introduce PragyaOS value proposition and drive student/organization leads conversion.
*   **Primary User**: Anonymous visitor, prospective student, enterprise buyer.
*   **Business Objective**: Convert visitors to registered users (leads generation) and build brand authority.
*   **Entry Points**: Direct URL (`/`), search engine landing, marketing campaigns.
*   **Exit Points**: Registration (`/auth/register`), catalog search (`/catalog`), pricing page (`/pricing`).
*   **Required Permissions**: None (Public).
*   **Navigation Context**: Root level page. Marketing Layout global nav.
*   **Layout & Grid**: `MarketingLayout`. 12-column editorial grid. Asymmetric spacing alignment.
*   **Responsive Behaviour**: Double-column layouts stack vertically at `< md` (768px). Padding shrinks from `py-20` to `py-10` on mobile.
*   **Primary Components**: Editorial Hero Header, Interactive Features Carousel, Pinned Testimonials Grid, Conversion Call-to-Action.
*   **Secondary Components**: Newsletter signup field, Trust logo grid.
*   **Data Sources**: Static content, catalog preview API.
*   **Backend APIs**: `GET /courses` (popular items preview).
*   **State Management**:
    - *TanStack Query*: `queryKeys.courses.list({ limit: 3 })`.
    - *Redux*: None.
*   **Loading State**: Initial structural skeletal frames for preview cards.
*   **Empty State**: Not applicable.
*   **Error State**: Render inline alert message on catalog preview grid; preserve hero sections.
*   **Offline Behaviour**: Render cached page shell via service workers. Action buttons display disabled state.
*   **Success States**: Success toast notification on newsletter registration.
*   **Keyboard Navigation**: Tab key focus moves from logo -> nav links -> Hero CTA -> features -> footer.
*   **Accessibility Requirements**: 100% semantic structures (e.g. outline headings sequence `h1` to `h3`). Alt tags active on brand illustrations. Contrast ratio >= 4.5:1.
*   **Analytics Events**: `landing_viewed`, `hero_cta_clicked`, `newsletter_submitted`.
*   **SEO Requirements**: `title`: "PragyaOS - Enterprise Learning Experience Platform", `meta-description` present, open-graph metadata tags compiled.
*   **Animations**: Hero text slide-up slide on page load. Spring-loaded hover expansions on CTAs.
*   **Micro Interactions**: CTA hover grows background shape, text shifts +2px inline.
*   **Future Expansion**: Interactive quiz to match visitors to course paths.
*   **Dependencies**: `framer-motion` for transitions.

## 2. Features Screen
*   **Screen Purpose**: Showcase the interactive classroom, curriculum builder, and credentials capabilities.
*   **Primary User**: Enterprise buyers and instructors comparing platforms.
*   **Business Objective**: Highlight technical superiority and convert prospects.
*   **Entry Points**: Marketing nav `/features`.
*   **Exit Points**: Catalog search, contact form.
*   **Required Permissions**: None (Public).
*   **Navigation Context**: Marketing root navigation group.
*   **Layout**: `MarketingLayout` with offset columns. Pinned scroll sections.
*   **Grid**: 12-column laptop/desktop grid, stacks to single column on mobile.
*   **Responsive Behaviour**: Interactive feature tabs convert to mobile cards layout at `< md`.
*   **Primary Components**: Interactive builder demo widget, feature description grid blocks.
*   **Secondary Components**: Video demonstration player overlay.
*   **Data Sources**: Static JSON configs.
*   **Backend APIs**: None.
*   **State Management**: Local component state for active feature tabs.
*   **Loading State**: Not applicable.
*   **Empty State**: Not applicable.
*   **Error State**: Standard Error Boundary.
*   **Offline Behaviour**: Render fully from local bundles cache.
*   **Success States**: None.
*   **Keyboard Navigation**: Arrow keys scroll feature tabs. Enter key opens video overlay.
*   **Accessibility Requirements**: Tab controls use `role="tab"` and `aria-selected` properties.
*   **Analytics Events**: `features_viewed`, `video_play_clicked`.
*   **SEO Requirements**: Title: "Product Features - PragyaOS". Targeted keywords inside headings.
*   **Animations**: Scroll-bound panel transitions. Fade-in on feature shifts.
*   **Micro Interactions**: Tabs apply primary outline focus rings.
*   **Future Expansion**: Embed live sandboxed classroom sample.
*   **Dependencies**: `@pragyaos/theme` (spacing tokens).

## 3. Course Catalog Screen
*   **Screen Purpose**: Provide advanced search filters and catalog categories for course discovery.
*   **Primary User**: Prospective students, registered learners.
*   **Business Objective**: Drive course registrations and purchases.
*   **Entry Points**: Nav link `/catalog`, query parameters from hero searches.
*   **Exit Points**: Course detail view (`/courses/:id`), category links.
*   **Required Permissions**: None (Public).
*   **Navigation Context**: Marketing catalog shell.
*   **Layout**: Left filter column (3 cols), right courses results grid (9 cols).
*   **Grid**: 12-column editorial grid. Stacks to full-width filter drawer on mobile.
*   **Responsive Behaviour**: Filter panel collapses into floating bottom trigger drawer on mobile screens.
*   **Primary Components**: Paginated results card grid, dynamic filter sidebar (categories, difficulty, pricing), search input bar.
*   **Secondary Components**: Active filter tag rows, sort selector dropdown.
*   **Data Sources**: Backend Search Index.
*   **Backend APIs**: `GET /search` with filtering parameters.
*   **State Management**:
    - *TanStack Query*: `useQuery` mapped to query parameters state.
    - *Redux*: Persistent catalog layout preferences (grid vs list view).
*   **Loading State**: Grid skeleton loaders mimicking card outlines.
*   **Empty State**: Render "No courses found" panel with "Clear all filters" CTA.
*   **Error State**: Informative error page containing a retry request action link.
*   **Offline Behaviour**: Renders search results from memory cache. Displays offline toast warning.
*   **Success States**: Update page URL query state on input changes.
*   **Keyboard Navigation**: Tab key navigates search bar -> filters -> course cards in order.
*   **Accessibility Requirements**: Filter inputs mapped to semantic label text. Active cards use clean link tags.
*   **Analytics Events**: `catalog_searched`, `filter_changed`, `sort_changed`.
*   **SEO Requirements**: Dynamic title: "Browse Courses - PragyaOS". Meta robots configure `noindex` on advanced filter parameters combinations.
*   **Animations**: Snappy transition shifts on filter collapse. Fade-in on new cards page insertion.
*   **Micro Interactions**: Hovering course card scales thumbnail image.
*   **Future Expansion**: Personalization engine suggesting courses based on user profile.
*   **Dependencies**: `@pragyaos/icons` (Search, Filter, Book).

## 4. Course Detail Screen
*   **Screen Purpose**: Provide details, curriculum blueprints, student feedback, and checkouts CTAs for a course.
*   **Primary User**: Learner evaluating a specific course.
*   **Business Objective**: Drive course checkout enrollment conversion.
*   **Entry Points**: Catalog cards click (`/courses/:slug`).
*   **Exit Points**: Checkout portal, catalog index.
*   **Required Permissions**: None (Public).
*   **Navigation Context**: Direct routing.
*   **Layout**: Split asymmetric columns. Left main layout (curriculum, description), right floating sticky card (price, checkout).
*   **Grid**: 12-column layout. Desktop: 8 cols main, 4 cols pricing cards.
*   **Responsive Behaviour**: Right pricing card moves to fixed action bar docked at mobile viewport bottom.
*   **Primary Components**: Course curriculum accordion, pricing purchase block, instructor bio profile.
*   **Secondary Components**: Reviews grid list, certificate preview mock.
*   **Data Sources**: Course database entries.
*   **Backend APIs**: `GET /courses/slug/{slug}`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.courses.detail(slug)`.
*   **Loading State**: Detailed layout placeholder skeletons matching page grids.
*   **Empty State**: Render 404 page if course slug is invalid.
*   **Error State**: Standard layout fallback page.
*   **Offline Behaviour**: Render cached data. Disable purchase button with warning indicator.
*   **Success States**: None.
*   **Keyboard Navigation**: Accordion headers expand using Space/Enter keys.
*   **Accessibility Requirements**: Tab panel navigation on curriculum modules. Contrast compliance on titles.
*   **Analytics Events**: `course_viewed`, `checkout_initiated`.
*   **SEO Requirements**: Schema.json Course markup generated dynamically for Google rich snippets.
*   **Animations**: Collapsible accordion transitions.
*   **Micro Interactions**: Floating card sticks smoothly to layout top bounds.
*   **Future Expansion**: Auto-preview of lessons inside the page.
*   **Dependencies**: `@pragyaos/types` (Course interface).

## 5. Pricing Screen
*   **Screen Purpose**: Detail individual membership plans and enterprise team bundles.
*   **Primary User**: Student, team administrator.
*   **Business Objective**: Convert users to premium subscriptions.
*   **Entry Points**: Navbar `/pricing`.
*   **Exit Points**: Checkout page.
*   **Required Permissions**: None (Public).
*   **Layout**: Grid cards side-by-side with comparison matrices.
*   **Grid**: 3-column pricing layouts, stacking to single-column grid on mobile viewports.
*   **Responsive Behaviour**: Comparison table converts to details collapse panels on mobile.
*   **Primary Components**: Pricing tier cards (Basic, Pro, Enterprise), Comparison matrix table.
*   **Secondary Components**: Monthly/yearly pricing toggle.
*   **Data Sources**: Static metadata config.
*   **Backend APIs**: None.
*   **State Management**: Local React state (billing interval state).
*   **Loading State**: Not applicable.
*   **Empty State**: Not applicable.
*   **Error State**: Standard Error boundary.
*   **Offline Behaviour**: Render static layouts from bundle.
*   **Success States**: Billing toggle flips cleanly.
*   **Keyboard Navigation**: Tab index targets plan options sequentially.
*   **Accessibility Requirements**: Screen-readers read pricing levels clearly using aria tables formats.
*   **Analytics Events**: `pricing_plan_toggled`, `pricing_cta_selected`.
*   **SEO Requirements**: Title: "Membership Pricing Plans - PragyaOS".
*   **Animations**: Cards pop up on page entry.
*   **Micro Interactions**: Toggle shifts handle indicators.
*   **Future Expansion**: Direct enterprise seat calculator slider.
*   **Dependencies**: `@pragyaos/theme`.

## 6. Organizations Screen
*   **Screen Purpose**: Introduce multi-tenant structures and seat management for corporate clients.
*   **Primary User**: Corporate training lead, HR coordinator.
*   **Business Objective**: Generate B2B enterprise leads.
*   **Entry Points**: Nav link `/organizations`.
*   **Exit Points**: Contact form popup.
*   **Required Permissions**: None.
*   **Layout**: Narrative brand layout.
*   **Grid**: Alternating content block layouts.
*   **Responsive Behaviour**: Alternating grids align horizontally on mobile.
*   **Primary Components**: Enterprise features display blocks, Lead intake form.
*   **Secondary Components**: Case studies carousel.
*   **Data Sources**: Static content.
*   **Backend APIs**: `POST /inquiries` (B2B leads intake).
*   **State Management**: React Hook Form with Zod schema validation.
*   **Loading State**: Button loader during lead submission.
*   **Empty State**: Not applicable.
*   **Error State**: Inline form alerts.
*   **Offline Behaviour**: Disable form submit; save input fields in local draft.
*   **Success States**: Success modal on form submission.
*   **Keyboard Navigation**: Focus moves logically through B2B intake form fields.
*   **Accessibility Requirements**: Inputs verify aria-required states.
*   **Analytics Events**: `b2b_inquiry_submitted`.
*   **SEO Requirements**: Title: "Enterprise LXP Solutions - PragyaOS".
*   **Animations**: Parallax scrolling panels.
*   **Micro Interactions**: Standard focus rings on form fields.
*   **Future Expansion**: Real-time quote compiler.
*   **Dependencies**: `zod`.

## 7. About Screen
*   **Screen Purpose**: Present product vision, team, and company history.
*   **Primary User**: General public, recruits.
*   **Business Objective**: Establish brand trust.
*   **Entry Points**: Footer links `/about`.
*   **Exit Points**: Blog link.
*   **Required Permissions**: None.
*   **Layout**: Asymmetrical narrative.
*   **Grid**: 12-column editorial.
*   **Responsive Behaviour**: Section layout grids adjust margins vertically.
*   **Primary Components**: Story timeline component, Team grid.
*   **Secondary Components**: Vision statement card block.
*   **Data Sources**: Static configs.
*   **Backend APIs**: None.
*   **State Management**: None.
*   **Loading State**: None.
*   **Empty State**: None.
*   **Error State**: Standard boundary.
*   **Offline Behaviour**: Render from cache.
*   **Success States**: None.
*   **Keyboard Navigation**: Tab navigation across footer.
*   **Accessibility Requirements**: Contrast compliance on timeline elements.
*   **Analytics Events**: `about_viewed`.
*   **SEO Requirements**: Title: "Our Story & Vision - PragyaOS".
*   **Animations**: Image fades on scroll.
*   **Micro Interactions**: None.
*   **Future Expansion**: Interactive company growth timeline.
*   **Dependencies**: `@pragyaos/theme`.

## 8. Blog Screen
*   **Screen Purpose**: List company updates, case studies, and educational research.
*   **Primary User**: Prospective students, engineering developers.
*   **Business Objective**: Drive organic content search traffic.
*   **Entry Points**: Footer/header link `/blog`.
*   **Exit Points**: Catalog search, specific articles page.
*   **Required Permissions**: None.
*   **Layout**: Grid card list.
*   **Grid**: 12-column grid. Laptop: 4 columns.
*   **Responsive Behaviour**: Cards rearrange to single column list.
*   **Primary Components**: Featured post hero header, Latest posts grid.
*   **Secondary Components**: Tag filtering rows.
*   **Data Sources**: Content API database.
*   **Backend APIs**: `GET /blog/posts`.
*   **State Management**: TanStack Query article paging index.
*   **Loading State**: Pulsing skeleton elements.
*   **Empty State**: Render "No posts found".
*   **Error State**: Content loading failure page.
*   **Offline Behaviour**: Renders article drafts matching cached session.
*   **Success States**: None.
*   **Keyboard Navigation**: Card layouts target links cleanly.
*   **Accessibility Requirements**: Contrast validation on author details text.
*   **Analytics Events**: `blog_home_viewed`.
*   **SEO Requirements**: Title: "LXP Learning Blog - PragyaOS". Structured article listings meta data.
*   **Animations**: Card rise fades on entry.
*   **Micro Interactions**: Scale shifts on hovering tags.
*   **Future Expansion**: Newsletter integration.
*   **Dependencies**: `@pragyaos/types`.

## 9. Contact Screen
*   **Screen Purpose**: Intake customer complaints, technical bugs, and sales questions.
*   **Primary User**: Registered user, anonymous visitor.
*   **Business Objective**: Assist conversion, resolve support queries.
*   **Entry Points**: Nav links `/contact`.
*   **Exit Points**: Help center, main catalog.
*   **Required Permissions**: None.
*   **Layout**: Split panel grid. Left: Contact info; Right: Help input form.
*   **Grid**: 12-column. 6 cols contact detail, 6 cols input form.
*   **Responsive Behaviour**: Form sits above contact links at mobile widths.
*   **Primary Components**: Dynamic contact form.
*   **Secondary Components**: Location coordinates maps widgets.
*   **Data Sources**: Local input state.
*   **Backend APIs**: `POST /inquiries`.
*   **State Management**: React Hook Form validation rules.
*   **Loading State**: Activity spinners inside buttons.
*   **Empty State**: Not applicable.
*   **Error State**: Standard input error outlines.
*   **Offline Behaviour**: Action buttons disabled. Save local draft state.
*   **Success States**: Toast alerts on form receipt.
*   **Keyboard Navigation**: Tab key targets form inputs in linear top-down flow.
*   **Accessibility Requirements**: Labels point to target elements using specific IDs.
*   **Analytics Events**: `contact_submitted`.
*   **SEO Requirements**: Title: "Support Contact - PragyaOS".
*   **Animations**: Spring transitions.
*   **Micro Interactions**: Button click spring reaction.
*   **Future Expansion**: Live chat widget support.
*   **Dependencies**: `zod`.

## 10. FAQ Screen
*   **Screen Purpose**: List solutions for billing, credential verification, and course builder questions.
*   **Primary User**: Learners, potential buyers.
*   **Business Objective**: Reduce customer support ticket burden.
*   **Entry Points**: footer nav `/faq`.
*   **Exit Points**: Contact page.
*   **Required Permissions**: None.
*   **Layout**: Center column accordions.
*   **Grid**: Single centered column grid.
*   **Responsive Behaviour**: Padding adjustments.
*   **Primary Components**: Category accordion lists.
*   **Secondary Components**: Help center link CTA.
*   **Data Sources**: Static JSON FAQs.
*   **Backend APIs**: None.
*   **State Management**: Accordion active index states.
*   **Loading State**: None.
*   **Empty State**: None.
*   **Error State**: Standard boundary.
*   **Offline Behaviour**: Available fully from cached bundles.
*   **Success States**: None.
*   **Keyboard Navigation**: Tab expands headers. Arrow keys navigate items.
*   **Accessibility Requirements**: Accordions configure standard ARIA expanded properties.
*   **Analytics Events**: `faq_expanded`.
*   **SEO Requirements**: FAQ Page Schema metadata.
*   **Animations**: Slide expand curves.
*   **Micro Interactions**: Icon rotation markers on active accordion tabs.
*   **Future Expansion**: Full-text FAQ search input panel.
*   **Dependencies**: `@pragyaos/ui` (Accordion).

---

# Part 3: Category B — Authentication Experience

The Authentication Experience utilizes the centered `AuthLayout`. It requires HTTPS TLS 1.3 encryption and validates user credentials before routing to the workspace areas.

```
┌─────────────────────────────────────────────────────────┐
│                       AUTH SHELL                        │
│                                                         │
│                ┌───────────────────────┐                │
│                │ PragyaOS Logo         │                │
│                ├───────────────────────┤                │
│                │ Login Form            │                │
│                │ [Email Input]         │                │
│                │ [Password Input]      │                │
│                │                       │                │
│                │ [ Primary Submit ]    │                │
│                └───────────────────────┘                │
└─────────────────────────────────────────────────────────┘
```

## 11. Login Screen
*   **Screen Purpose**: Authenticate user profile credentials and mount session storage keys.
*   **Primary User**: Registered learner, instructor, administrator.
*   **Business Objective**: Protect user data, entry gate to workspace environments.
*   **Entry Points**: Workspace links, direct URL `/auth/login`.
*   **Exit Points**: Student portal `/portal/dashboard`, password reset page.
*   **Required Permissions**: None.
*   **Layout**: `AuthLayout`. Single centered dialog pane.
*   **Grid**: Centered grid card layout.
*   **Responsive Behaviour**: Card spreads to take full screen at mobile widths.
*   **Primary Components**: Email credentials form.
*   **Secondary Components**: Social authorization providers (OAuth), register link options.
*   **Data Sources**: User inputs.
*   **Backend APIs**: `POST /auth/login`.
*   **State Management**:
    - *Redux*: Stores active session username and tokens.
*   **Loading State**: Submit buttons apply busy load states. Form fields disable.
*   **Empty State**: Not applicable.
*   **Error State**: Form-wide login error banners (e.g. invalid credentials match warnings).
*   **Offline Behaviour**: Login button disabled. Warning banner notes connection requirements.
*   **Success States**: Save JWT to browser storage and redirect to portal.
*   **Keyboard Navigation**: Linear tab-stops. Enter key submits credentials form.
*   **Accessibility Requirements**: Focus rings active. Inputs define auto-complete values.
*   **Analytics Events**: `login_attempted`, `login_successful`, `login_failed`.
*   **SEO Requirements**: `noindex` configured to prevent search engine caching.
*   **Animations**: Soft card pop.
*   **Micro Interactions**: Spring tactile click on login action buttons.
*   **Future Expansion**: Biometric lock support.
*   **Dependencies**: `zod`.

## 12. Register Screen
*   **Screen Purpose**: Create fresh user profile directories.
*   **Primary User**: Potential learner.
*   **Business Objective**: Expand user registrations.
*   **Entry Points**: Auth links `/auth/register`.
*   **Exit Points**: Login, Verification page.
*   **Required Permissions**: None.
*   **Layout**: Centered card.
*   **Grid**: Centered single column.
*   **Responsive Behaviour**: Form adapts layout sizes.
*   **Primary Components**: Extended registrations inputs (email, name, passwords validation).
*   **Secondary Components**: OAuth options, Login redirect.
*   **Data Sources**: User parameters input.
*   **Backend APIs**: `POST /auth/register`.
*   **State Management**: local inputs validation.
*   **Loading State**: Button loading spinners.
*   **Empty State**: Not applicable.
*   **Error State**: Validation alerts (e.g., password criteria validation failures).
*   **Offline Behaviour**: Action blocked.
*   **Success States**: Account creation success redirect to email verification screen.
*   **Keyboard Navigation**: Standard tab flows.
*   **Accessibility Requirements**: Inputs map clean labels, matching error instructions dynamically.
*   **Analytics Events**: `registration_completed`.
*   **SEO Requirements**: `noindex` tags active.
*   **Animations**: Soft fade shifts.
*   **Micro Interactions**: Tactile spring triggers.
*   **Future Expansion**: Role option select cards on profile setups.
*   **Dependencies**: `@pragyaos/utils` (password checks).

## 13. Forgot Password Screen
*   **Screen Purpose**: Initiate recovery flows for accounts with forgotten password keys.
*   **Primary User**: Locked out user.
*   **Business Objective**: Support self-service user recovery.
*   **Entry Points**: Login link options `/auth/forgot-password`.
*   **Exit Points**: Recovery confirmation page.
*   **Required Permissions**: None.
*   **Layout**: Centered minimal block.
*   **Grid**: Centered single column.
*   **Responsive Behaviour**: Adjusts margins.
*   **Primary Components**: Recovery email address field.
*   **Secondary Components**: Return options back to login page.
*   **Data Sources**: Input parameters.
*   **Backend APIs**: `POST /auth/forgot-password`.
*   **State Management**: React Hook Form.
*   **Loading State**: Buttons loading indicator state.
*   **Empty State**: Not applicable.
*   **Error State**: Validation failure messages.
*   **Offline Behaviour**: Submission blocked.
*   **Success States**: Render recovery email dispatch confirmation screen.
*   **Keyboard Navigation**: Linear flow.
*   **Accessibility Requirements**: Clear visual focus guides.
*   **Analytics Events**: `recovery_initiated`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Transition pop.
*   **Micro Interactions**: None.
*   **Future Expansion**: recovery via registered SMS numbers.
*   **Dependencies**: `@pragyaos/ui`.

## 14. Reset Password Screen
*   **Screen Purpose**: Save updated password parameters via temporary hash keys.
*   **Primary User**: Recovering user.
*   **Business Objective**: Ensure secure recovery verification pipelines.
*   **Entry Points**: Dispatch mail link (`/auth/reset-password?token=...`).
*   **Exit Points**: Login screen.
*   **Required Permissions**: None.
*   **Layout**: Centered card form.
*   **Grid**: Centered column form.
*   **Responsive Behaviour**: Form adjusts heights.
*   **Primary Components**: Password update inputs panel.
*   **Secondary Components**: Back links options.
*   **Data Sources**: Input variables.
*   **Backend APIs**: `POST /auth/reset-password`.
*   **State Management**: Local hook form validations.
*   **Loading State**: Button loaders active.
*   **Empty State**: Not applicable.
*   **Error State**: Validation failure states, expired link hash warnings.
*   **Offline Behaviour**: Form submits blocked.
*   **Success States**: Redirect page confirmation showing redirect counter.
*   **Keyboard Navigation**: Tab controls target elements.
*   **Accessibility Requirements**: Focus rings on recovery fields.
*   **Analytics Events**: `password_reset_completed`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Slide-in transitions.
*   **Micro Interactions**: Button click springs.
*   **Future Expansion**: Auto-login on success reset.
*   **Dependencies**: `zod`.

## 15. Email Verification Screen
*   **Screen Purpose**: Verify that registration emails match active domains.
*   **Primary User**: Newly registered student.
*   **Business Objective**: Prevent spam registrations.
*   **Entry Points**: Register redirect, email verification link.
*   **Exit Points**: Portal dashboard.
*   **Required Permissions**: None.
*   **Layout**: Centered card.
*   **Grid**: Centered single column.
*   **Responsive Behaviour**: Adjusts margins.
*   **Primary Components**: OTP code entry fields (6-digit block), resend code CTA.
*   **Secondary Components**: Back to login.
*   **Data Sources**: Local inputs.
*   **Backend APIs**: `POST /auth/verify-email`.
*   **State Management**: TanStack Query code submit mutation.
*   **Loading State**: Code field displays disabled state on submit.
*   **Empty State**: Not applicable.
*   **Error State**: Inline verification error notification text.
*   **Offline Behaviour**: Submission blocked.
*   **Success States**: Redirect to workspace portal.
*   **Keyboard Navigation**: Auto-focus shifts to the next OTP input block.
*   **Accessibility Requirements**: OTP inputs read sequentially by screen readers.
*   **Analytics Events**: `email_verified`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Soft entry.
*   **Micro Interactions**: Number slot input scaling transitions.
*   **Future Expansion**: Auto-reading SMS code triggers.
*   **Dependencies**: `@pragyaos/hooks` (OTP input listeners).

## 16. Two-Factor Authentication Screen
*   **Screen Purpose**: Verify MFA/2FA codes for accounts with advanced settings enabled.
*   **Primary User**: Multi-factor authenticated users.
*   **Business Objective**: Secure accounts against brute-force attacks.
*   **Entry Points**: Login redirect route.
*   **Exit Points**: Workspace portal.
*   **Required Permissions**: None.
*   **Layout**: Centered minimal pane.
*   **Grid**: Centered column.
*   **Responsive Behaviour**: Adjusts margin.
*   **Primary Components**: MFA OTP token input field.
*   **Secondary Components**: Emergency recovery code options link.
*   **Data Sources**: Input variables.
*   **Backend APIs**: `POST /auth/verify-2fa`.
*   **State Management**: Local inputs.
*   **Loading State**: Code field disabled on verification trigger.
*   **Empty State**: Not applicable.
*   **Error State**: Invalid code alert banner.
*   **Offline Behaviour**: Block verification actions.
*   **Success States**: Redirect to dashboard layout.
*   **Keyboard Navigation**: Auto-focus shifts matching input digits.
*   **Accessibility Requirements**: High-visibility focus indicators.
*   **Analytics Events**: `mfa_verified`, `mfa_failed`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Slide-in transitions.
*   **Micro Interactions**: Standard focus rings.
*   **Future Expansion**: Hardware security keys (WebAuthn) support.
*   **Dependencies**: `@pragyaos/ui`.

## 17. Invitation Acceptance Screen
*   **Screen Purpose**: Handle workspace portal invite entries for enterprise team seats.
*   **Primary User**: Corporate learner, group student.
*   **Business Objective**: Onboard B2B corporate learners.
*   **Entry Points**: Direct invitation email URLs (`/auth/accept-invite?token=...`).
*   **Exit Points**: Password initialization form, login page.
*   **Required Permissions**: None.
*   **Layout**: Centered workspace details pane.
*   **Grid**: Centered single column.
*   **Responsive Behaviour**: Form scales.
*   **Primary Components**: Invitation details panel (displays inviting organization and seat roles), password creation form.
*   **Secondary Components**: Decline invite option link.
*   **Data Sources**: Invitation DB records.
*   **Backend APIs**: `GET /invitations/{id}`, `POST /invitations/{id}/accept`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.invitations.detail(id)`.
*   **Loading State**: Skeletal details overlay.
*   **Empty State**: Invalid link error page.
*   **Error State**: Invalid token error page.
*   **Offline Behaviour**: Actions disabled.
*   **Success States**: Redirect to organization student portal.
*   **Keyboard Navigation**: Tab key navigates form input fields in logical sequence.
*   **Accessibility Requirements**: Dynamic screen-reader updates on password complexity checks.
*   **Analytics Events**: `invitation_accepted`, `invitation_declined`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Panel transitions.
*   **Micro Interactions**: Submit button clicks scale spring.
*   **Future Expansion**: Auto-fill name properties from invitation credentials metadata.
*   **Dependencies**: `@pragyaos/types`.

---

# Part 4: Category C — Student Workspace

The Student Workspace utilizes `WorkspaceLayout`. It uses dense productivity designs and is optimized for learning efficiency and progress tracking.

```
┌─────────────────────────────────────────────────────────┐
│                    STUDENT DASHBOARD                    │
├─────────────────────────────────────────────────────────┤
│ Continue Learning Panel (usePlaybackTracker details)     │
│ [ Course Card ]  [ Course Card ]  [ Course Card ]       │
├────────────────────────────┬────────────────────────────┤
│ Progress Stats Graph       │ Unread Notifications Alert │
│ (Monospace numbers)        │ (Paginated inline panel)   │
└────────────────────────────┴────────────────────────────┘
```

## 18. Dashboard Screen
*   **Screen Purpose**: Core student entry point. Lists active courses, learning statistics, and upcoming assignments.
*   **Primary User**: Student learner.
*   **Business Objective**: Retain learning habits and increase course completion rates.
*   **Entry Points**: Login redirect, route `/portal/dashboard`.
*   **Exit Points**: Course player, user profiles settings.
*   **Required Permissions**: `requireAuth` + `role === 'STUDENT'`.
*   **Layout**: `WorkspaceLayout` containing sidebar.
*   **Grid**: 12-column layout. Desktop: 8 cols main content, 4 cols notifications panel.
*   **Responsive Behaviour**: Sidebar collapses on tablet viewports. Right panel stacks below grid content.
*   **Primary Components**: Continue Learning widget, Active courses grid, Progress charts.
*   **Secondary Components**: Recommendations carousel, Certificate unlocks notifications.
*   **Data Sources**: Learning Engine API.
*   **Backend APIs**: `GET /learning-engine/continue`, `GET /courses/my`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.courses.my()`.
    - *Redux*: Workspace navigation state.
*   **Loading State**: Cards skeletons, stats placeholders pulsing loaders.
*   **Empty State**: "No courses enrolled" placeholder card with catalog route buttons.
*   **Error State**: Dashboard load failure warnings block, with retry trigger handles.
*   **Offline Behaviour**: Render cached dashboard stats. Disable actions, show offline warning ribbon.
*   **Success States**: Interactive states update dynamically.
*   **Keyboard Navigation**: Tab key maps cleanly through grids. Keyboard shortcuts active for quick navigation.
*   **Accessibility Requirements**: Charts render descriptions using raw tables labels. Keyboard navigation targets controls explicitly.
*   **Analytics Events**: `student_dashboard_viewed`, `course_resume_clicked`.
*   **SEO Requirements**: Locked behind auth shell (`noindex`).
*   **Animations**: Fade-in route entry animations.
*   **Micro Interactions**: Floating card transforms on focus and hover.
*   **Future Expansion**: Gamification streak dashboard widget.
*   **Dependencies**: `@pragyaos/theme` (zIndex layers).

## 19. Continue Learning Screen
*   **Screen Purpose**: List resume history and detail last visited curriculum checkpoints.
*   **Primary User**: Active learner resuming a course.
*   **Business Objective**: Reduce friction between learning sessions.
*   **Entry Points**: Dashboard link, route `/portal/continue`.
*   **Exit Points**: Course player.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Sidebar layout.
*   **Grid**: 12-column results list.
*   **Responsive Behaviour**: Grid transforms to single column list at mobile widths.
*   **Primary Components**: Learning session list cards (with duration and progress percentages).
*   **Secondary Components**: Recommended next lessons panel.
*   **Data Sources**: Learning history APIs.
*   **Backend APIs**: `GET /learning-engine/continue`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.learningEngine.continue()`.
*   **Loading State**: Pulsing skeleton elements.
*   **Empty State**: "No learning sessions started" graphic.
*   **Error State**: Standard loader fail screen.
*   **Offline Behaviour**: Cached history rendering. Action buttons disabled.
*   **Success States**: Dynamic list renders.
*   **Keyboard Navigation**: Tab key selects sessions cleanly.
*   **Accessibility Requirements**: Focus outline indicators on learning cards.
*   **Analytics Events**: `continue_learning_viewed`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Slide shifts.
*   **Micro Interactions**: Play button scales on hover.
*   **Future Expansion**: Calendar scheduling reminders.
*   **Dependencies**: `@pragyaos/icons`.

## 20. My Courses Screen
*   **Screen Purpose**: Paginated catalog of all courses active, completed, or archived by the student.
*   **Primary User**: Learner.
*   **Business Objective**: Track student course progress history.
*   **Entry Points**: Workspace sidebar, `/portal/my-courses`.
*   **Exit Points**: Course Player, Catalog search.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Workspace layout, main listing container.
*   **Grid**: 12-column card layouts.
*   **Responsive Behaviour**: Columns adjust width based on screen width.
*   **Primary Components**: Active courses list, Completed courses folder panel.
*   **Secondary Components**: Sorting selector tabs.
*   **Data Sources**: Enrolled courses database.
*   **Backend APIs**: `GET /courses/my`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.courses.my()`.
*   **Loading State**: Skeletal grid lists.
*   **Empty State**: "No active courses found" panel showing CTA button catalog link.
*   **Error State**: Error alert overlay.
*   **Offline Behaviour**: Cached data loads.
*   **Success States**: Card grid renders.
*   **Keyboard Navigation**: Tab targets card items.
*   **Accessibility Requirements**: Dynamic text scaling on progress badges.
*   **Analytics Events**: `my_courses_viewed`, `course_tab_toggled`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Card rise fades.
*   **Micro Interactions**: Scale changes on card hover.
*   **Future Expansion**: Group filter sharing capabilities.
*   **Dependencies**: `@pragyaos/types`.

## 21. Course Player Screen
*   **Screen Purpose**: Immersive student player viewport displaying lesson tracks.
*   **Primary User**: Student.
*   **Business Objective**: Provide distraction-free lesson delivery.
*   **Entry Points**: Course list click, `/portal/classroom/:courseId`.
*   **Exit Points**: Student Dashboard.
*   **Required Permissions**: `requireAuth` + `role === 'STUDENT'`.
*   **Layout**: Split panel layout. Left side video/document player (9 cols), right side lesson navigation sidebar (3 cols).
*   **Grid**: 12-column full screen viewport.
*   **Responsive Behaviour**: Sidebar transforms to collapsible slide-out drawer on tablet and mobile viewports.
*   **Primary Components**: Immersive media player pane, Lesson modules list explorer.
*   **Secondary Components**: Playback controls panel, Active progress bar scrubber.
*   **Data Sources**: Learning content details database.
*   **Backend APIs**: `GET /courses/{id}`, `GET /learning-engine/enrollments/{id}/continue`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.courses.detail(id)`.
    - *Redux*: Player states configurations (play, volume, settings).
*   **Loading State**: Center screen pulsing player placeholder frames.
*   **Empty State**: "No lessons available in module" placeholder.
*   **Error State**: Player failure display showing reload request CTA.
*   **Offline Behaviour**: Video playback disabled. Local text documents display matching offline warnings.
*   **Success States**: Dynamic progress sync updates.
*   **Keyboard Navigation**: Spacebar toggles play/pause, Left/Right arrow keys scrub playback timeline.
*   **Accessibility Requirements**: Video controls support screen readers. Player inputs configure strict label indicators.
*   **Analytics Events**: `player_playback_started`, `player_playback_completed`, `scrub_scrubbed`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Collapse transitions on panel toggle.
*   **Micro Interactions**: Hover timeline progress bar scales.
*   **Future Expansion**: Subtitles selector options panel.
*   **Dependencies**: `@pragyaos/hooks` (media controllers).

## 22. Lesson Screen
*   **Screen Purpose**: Render specific lesson content forms (markdown text, code challenges, audio, file downloads).
*   **Primary User**: Learner.
*   **Business Objective**: Deliver course curriculum content.
*   **Entry Points**: Course Player nav.
*   **Exit Points**: Next lesson.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Classroom view container space.
*   **Grid**: Centered content column, reading layout.
*   **Responsive Behaviour**: Typography sizes adjust dynamically using clamp tokens.
*   **Primary Components**: Markdown article rendering block, Code challenge code editor, Complete action button CTA.
*   **Secondary Components**: Downloadable resources bar, Author comments zone.
*   **Data Sources**: Lesson DB records.
*   **Backend APIs**: `GET /learning-units/{id}`, `POST /learning-engine/enrollments/{enrollmentId}/progress`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.lessons.detail(id)`.
*   **Loading State**: Text content skeleton layout blocks.
*   **Empty State**: "Lesson not initialized" page.
*   **Error State**: Standard failure warning.
*   **Offline Behaviour**: Text views cached display active. Submissions locked.
*   **Success States**: Success popups on code challenge correct submission.
*   **Keyboard Navigation**: Standard editor overrides. Submit shortcut handles.
*   **Accessibility Requirements**: Screen-readers navigate Markdown headers in logical order. Code blocks configure aria tags.
*   **Analytics Events**: `lesson_completed`, `challenge_submitted`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Fade-in transitions.
*   **Micro Interactions**: Code challenge run button shows loader.
*   **Future Expansion**: AI explanations overlay.
*   **Dependencies**: `zod`.

## 23. Notes Screen
*   **Screen Purpose**: Manage student personal notes mapped to specific lesson timestamps.
*   **Primary User**: Student.
*   **Business Objective**: Boost learning efficiency.
*   **Entry Points**: Player panel sidebar tabs.
*   **Exit Points**: Active lesson navigation.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Drawer sidebar.
*   **Grid**: Single column content list.
*   **Responsive Behaviour**: Width adjusts dynamically.
*   **Primary Components**: Note creation input, Paginated notes feed.
*   **Secondary Components**: Filter by course dropdown.
*   **Data Sources**: Notes DB tables.
*   **Backend APIs**: `GET /notes`, `POST /notes`.
*   **State Management**: Local hook form validations.
*   **Loading State**: List skeleton.
*   **Empty State**: "No notes captured yet" panel.
*   **Error State**: Save failures validation messages.
*   **Offline Behaviour**: Notes entries save to local draft state, syncs on recovery.
*   **Success States**: Success toast on note creation.
*   **Keyboard Navigation**: Tab navigates notes timeline.
*   **Accessibility Requirements**: Focus outline indicators.
*   **Analytics Events**: `note_created`, `note_deleted`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Drawer entry slide.
*   **Micro Interactions**: Text input expansion on focus.
*   **Future Expansion**: Export note cards as PDF blocks.
*   **Dependencies**: `@pragyaos/ui` (Textarea).

## 24. Bookmarks Screen
*   **Screen Purpose**: List page locations and timelines saved by the user.
*   **Primary User**: Learner.
*   **Business Objective**: Fast retrieval of key curriculum lessons.
*   **Entry Points**: Dashboard sidebar, `/portal/bookmarks`.
*   **Exit Points**: Target bookmarked lessons.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Cards feed.
*   **Grid**: 12-column card layout.
*   **Responsive Behaviour**: Grid adapts columns size.
*   **Primary Components**: Bookmark list cards, Category filters.
*   **Secondary Components**: Search input.
*   **Data Sources**: Bookmarks API.
*   **Backend APIs**: `GET /bookmarks`, `POST /bookmarks`.
*   **State Management**: TanStack query list.
*   **Loading State**: Skeletons lists.
*   **Empty State**: "No bookmarks captured yet".
*   **Error State**: Standard failures block.
*   **Offline Behaviour**: Renders cached bookmarked list. Action buttons disabled.
*   **Success States**: Bookmark tag toggles color immediately.
*   **Keyboard Navigation**: Tab selects bookmarks. Enter key triggers navigation redirect.
*   **Accessibility Requirements**: Screen-readers parse bookmark tags correctly.
*   **Analytics Events**: `bookmark_clicked`, `bookmark_deleted`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Slide updates.
*   **Micro Interactions**: Icon hover color changes.
*   **Future Expansion**: Share bookmark groups.
*   **Dependencies**: `@pragyaos/icons`.

## 25. Certificates Screen
*   **Screen Purpose**: List and showcase verified certificates issued to the user.
*   **Primary User**: Graduated learner.
*   **Business Objective**: Drive social sharing conversions.
*   **Entry Points**: Sidebar link, `/portal/certificates`.
*   **Exit Points**: PDF print view page.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Grid listing.
*   **Grid**: 12-column grid. Laptop: 4 columns.
*   **Responsive Behaviour**: Grid elements scale down on mobile screens.
*   **Primary Components**: Certificate cards grid (displays title, date, hash), Share tools sidebar.
*   **Secondary Components**: Certificate templates previews.
*   **Data Sources**: Credentials API database.
*   **Backend APIs**: `GET /credentials/my`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.credentials.my()`.
*   **Loading State**: Skeletons card structures.
*   **Empty State**: "No certificates earned yet" graphic panel.
*   **Error State**: Error banners.
*   **Offline Behaviour**: Cache display active. Sharing options disabled.
*   **Success States**: None.
*   **Keyboard Navigation**: Tab targets items.
*   **Accessibility Requirements**: Alt text on certificate graphics elements.
*   **Analytics Events**: `certificate_shared`, `certificate_downloaded`.
*   **SEO Requirements**: `noindex` (User list dashboard). Note: public credential validation page is indexed.
*   **Animations**: Spring scaling card animations.
*   **Micro Interactions**: Share buttons bounce on click.
*   **Future Expansion**: Auto-share to LinkedIn.
*   **Dependencies**: `@pragyaos/types`.

## 26. Progress Screen
*   **Screen Purpose**: Detail complete student statistics (hours, completion counts, activity logs).
*   **Primary User**: Student.
*   **Business Objective**: Track student user metrics.
*   **Entry Points**: Workspace sidebar, `/portal/progress`.
*   **Exit Points**: Course player.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Analytics panels.
*   **Grid**: 12-column grid. Large chart rows.
*   **Responsive Behaviour**: Charts scale down to narrow grids on mobile.
*   **Primary Components**: Learning metrics tiles, Weekly activity charts.
*   **Secondary Components**: Completed modules logs feed.
*   **Data Sources**: Enrollments API database.
*   **Backend APIs**: `GET /learning-engine/enrollments/{id}/completion`.
*   **State Management**: TanStack query stats.
*   **Loading State**: Card pulsing loaders.
*   **Empty State**: "No progress records found".
*   **Error State**: Chart load failure warning boxes.
*   **Offline Behaviour**: Render cached data.
*   **Success States**: None.
*   **Keyboard Navigation**: Charts focus targets read text tags.
*   **Accessibility Requirements**: Focus outline indicators on grid items.
*   **Analytics Events**: `progress_viewed`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Chart draws fade in.
*   **Micro Interactions**: Tooltip overlays display values on graph hover.
*   **Future Expansion**: Peer-to-peer benchmarking charts.
*   **Dependencies**: `@pragyaos/theme`.

## 27. Notifications Screen
*   **Screen Purpose**: Paginated dashboard inbox listing all system read/unread messages.
*   **Primary User**: Learner.
*   **Business Objective**: Maintain engagement and notify users of critical course status updates.
*   **Entry Points**: Header Bell icon click, `/portal/notifications`.
*   **Exit Points**: Target courses, settings page.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Inbox email style listing layout.
*   **Grid**: Centered single column list.
*   **Responsive Behaviour**: Grid adapts columns widths.
*   **Primary Components**: Notifications feed row, Mark all as read action CTA.
*   **Secondary Components**: Preferences shortcuts drawer link.
*   **Data Sources**: Notifications index.
*   **Backend APIs**: `GET /notifications`, `PATCH /notifications/read-all`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.notifications.all()`.
*   **Loading State**: List skeletal pulse elements.
*   **Empty State**: "Inbox zero" graphic message.
*   **Error State**: Standard fail alerts.
*   **Offline Behaviour**: Cached history rendering. Action buttons disabled.
*   **Success States**: Inbox row turns gray immediately on marked as read.
*   **Keyboard Navigation**: Tab key navigates rows sequentially. Enter key marks row as read and redirects.
*   **Accessibility Requirements**: Aria tags verify read/unread states explicitly.
*   **Analytics Events**: `notification_read`, `all_notifications_marked_read`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Slide updates on row removal.
*   **Micro Interactions**: Toggle indicators.
*   **Future Expansion**: Real-time push configurations.
*   **Dependencies**: `@pragyaos/icons`.

## 28. Search Screen
*   **Screen Purpose**: Execute global search queries across courses, lessons, and community content.
*   **Primary User**: Learner.
*   **Business Objective**: Provide fast search indexing access.
*   **Entry Points**: Workspace search inputs.
*   **Exit Points**: Results paths target.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Results listing container.
*   **Grid**: Centered column.
*   **Responsive Behaviour**: Padding adjustments.
*   **Primary Components**: Search result rows, Filters tag group.
*   **Secondary Components**: Search input query bar.
*   **Data Sources**: Search Index.
*   **Backend APIs**: `GET /search`.
*   **State Management**: TanStack query searches.
*   **Loading State**: Row skeletons lists.
*   **Empty State**: "No matches found" panel.
*   **Error State**: Standard load fail page.
*   **Offline Behaviour**: Actions disabled.
*   **Success States**: URL state updates query parameter.
*   **Keyboard Navigation**: Tab moves down result links sequentially.
*   **Accessibility Requirements**: Dynamic announcements for search count changes.
*   **Analytics Events**: `global_search_executed`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Fades.
*   **Micro Interactions**: Row highlights on hover.
*   **Future Expansion**: Voice search input.
*   **Dependencies**: `zod`.

## 29. Profile Screen
*   **Screen Purpose**: Display public learner profile, completed credentials, and badges.
*   **Primary User**: Public visitor, student.
*   **Business Objective**: Drive social validation and brand expansion.
*   **Entry Points**: User card click, `/portal/profile/:id`.
*   **Exit Points**: Settings edit.
*   **Required Permissions**: None (Public page configuration options).
*   **Layout**: Editorial profile banner header layout.
*   **Grid**: 12-column grid. Desktop: 4 cols card bio, 8 cols credentials feeds.
*   **Responsive Behaviour**: Bio block stacks above credentials content grid.
*   **Primary Components**: User bio header component, Completed credentials card list.
*   **Secondary Components**: Contact options.
*   **Data Sources**: Users profile database.
*   **Backend APIs**: `GET /users/{id}`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.users.detail(id)`.
*   **Loading State**: Profiles skeletons.
*   **Empty State**: Not applicable.
*   **Error State**: "User profile not found" page.
*   **Offline Behaviour**: Cached profile display.
*   **Success States**: None.
*   **Keyboard Navigation**: Tab select links.
*   **Accessibility Requirements**: Verification hashes alt tags.
*   **Analytics Events**: `profile_viewed`.
*   **SEO Requirements**: Title: "Learner [Name] Profile - PragyaOS". User pages indexable option keys.
*   **Animations**: Slide fades.
*   **Micro Interactions**: Scale changes on badge hover.
*   **Future Expansion**: Shared portfolio showcase zones.
*   **Dependencies**: `@pragyaos/types`.

## 30. Settings Screen
*   **Screen Purpose**: Edit profile parameters, billing details, preferences, and password modifications.
*   **Primary User**: Registered user.
*   **Business Objective**: Retain user options setups.
*   **Entry Points**: Header dropdown settings links.
*   **Exit Points**: Portal dashboard.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Left tabs layout (3 cols), right forms container (9 cols).
*   **Grid**: 12-column container.
*   **Responsive Behaviour**: Tabs expand to drop-down selection controls on mobile viewports.
*   **Primary Components**: User details form, Passwords edit inputs, Session termination logs widgets.
*   **Secondary Components**: Theme preferences dropdown, Deactivation button block.
*   **Data Sources**: User settings API databases.
*   **Backend APIs**: `PATCH /users/me`, `POST /users/me/password`, `DELETE /users/me/sessions`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.users.me()`.
    - *Redux*: Theme state updates.
*   **Loading State**: Form buttons display loadings active. Form fields disable on submits.
*   **Empty State**: Not applicable.
*   **Error State**: Standard input validation errors tags.
*   **Offline Behaviour**: Form submits blocked. Save settings changes draft locally.
*   **Success States**: Success toast notification on profile updates.
*   **Keyboard Navigation**: Tab targets form fields. Enter key triggers save forms.
*   **Accessibility Requirements**: Verification of forms accessibility aria validations.
*   **Analytics Events**: `profile_updated`, `password_changed`, `session_terminated`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Panel transitions.
*   **Micro Interactions**: Checkbox indicator toggles.
*   **Future Expansion**: BIND third-party OAuth links options.
*   **Dependencies**: `zod`.

---

# Part 5: Category D — Instructor Studio

The Instructor Studio utilizes `StudioLayout`. It uses dense panel arrays, visual charts, and builders models optimized for fast curriculum design.

```
┌─────────────────────────────────────────────────────────┐
│                    STUDIO WORKSPACE                     │
├─────────────────────────────────────────────────────────┤
│ Left Navigator  │ Center Curriculum Builder │ Right      │
│ (Modules list,  │ (Module drag rows, lesson │ Inspector  │
│  drag handles)  │  inputs panels, save CTA) │ (Configs)  │
└─────────────────┴───────────────────────────┴────────────┘
```

## 31. Studio Dashboard Screen
*   **Screen Purpose**: Display instructor high-level metrics (course sales, active registrations, quality health checks).
*   **Primary User**: Course instructor.
*   **Business Objective**: Support course quality management and track sales stats.
*   **Entry Points**: Workspace redirect, `/studio/dashboard`.
*   **Exit Points**: Course builder, billing settings.
*   **Required Permissions**: `requireAuth` + `role === 'INSTRUCTOR'`.
*   **Layout**: Multi-panel analytical shell.
*   **Grid**: 12-column grids.
*   **Responsive Behaviour**: Grid layout adjusts metrics columns widths.
*   **Primary Components**: Instructor sales chart grid, Quality checklist indicators, Active courses list.
*   **Secondary Components**: Reviews digest panel.
*   **Data Sources**: Instructor Studio API endpoints.
*   **Backend APIs**: `GET /instructor-studio/dashboard`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.instructor.dashboard()`.
*   **Loading State**: Card pulsing skeletons.
*   **Empty State**: "No courses designed yet" graphic showing CTA course creation triggers.
*   **Error State**: Banners with reload options.
*   **Offline Behaviour**: Cached metrics display. Actions disabled.
*   **Success States**: Dynamic state loads.
*   **Keyboard Navigation**: Tab targets workspace cards. Shortcuts toggle panels expansion.
*   **Accessibility Requirements**: Screen-readers parse visual metrics grids correctly.
*   **Analytics Events**: `studio_dashboard_viewed`, `create_course_initiated`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Fade-in entry.
*   **Micro Interactions**: Scale shifts on cards hover.
*   **Future Expansion**: Live student help chat widget.
*   **Dependencies**: `@pragyaos/theme`.

## 32. Course Builder Screen
*   **Screen Purpose**: Edit course description data, upload marketing media assets, set price targets.
*   **Primary User**: Instructor.
*   **Business Objective**: Define course catalog metadata settings.
*   **Entry Points**: Dashboard click, `/studio/courses/:id/edit`.
*   **Exit Points**: Curriculum builder.
*   **Required Permissions**: `requireAuth` + `role === 'INSTRUCTOR'`.
*   **Layout**: Tab-split configuration panels.
*   **Grid**: 12-column form grids.
*   **Responsive Behaviour**: Form layout stacks vertical.
*   **Primary Components**: Course metadata form fields, Media upload dropzones.
*   **Secondary Components**: Price settings card.
*   **Data Sources**: Course database.
*   **Backend APIs**: `PATCH /courses/{id}`, `POST /media/uploads/url`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.courses.detail(id)`.
    - *Redux*: Form draft backup arrays.
*   **Loading State**: Spinner indicators inside submit CTAs.
*   **Empty State**: Not applicable.
*   **Error State**: Validation failure inline notifications.
*   **Offline Behaviour**: Submissions blocked. Save draft locally.
*   **Success States**: Success toast on course updates.
*   **Keyboard Navigation**: Logical input navigation.
*   **Accessibility Requirements**: Image upload fields include alt tag text descriptions inputs.
*   **Analytics Events**: `course_metadata_updated`, `media_uploaded`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Slide switches.
*   **Micro Interactions**: Dropzone hover outlines shift highlights.
*   **Future Expansion**: AI description auto-generator.
*   **Dependencies**: `zod`.

## 33. Curriculum Builder Screen
*   **Screen Purpose**: Manage visual structures of curriculum modules and lessons (drag-and-drop hierarchy).
*   **Primary User**: Course creator.
*   **Business Objective**: Ensure curriculum planning layout is fast.
*   **Entry Points**: Course builder nav, `/studio/courses/:id/curriculum`.
*   **Exit Points**: Lesson editor.
*   **Required Permissions**: `requireAuth` + `role === 'INSTRUCTOR'`.
*   **Layout**: Left sidebar curriculum tree layout (4 cols), center curriculum designer container (8 cols).
*   **Grid**: Full height split view grid.
*   **Responsive Behaviour**: Tree panel collapses to drawer below laptop sizes.
*   **Primary Components**: Curriculum hierarchy list tree, Module edit modal windows.
*   **Secondary Components**: Drag handles overlays, Reorder action panels.
*   **Data Sources**: Curriculum database.
*   **Backend APIs**: `POST /courses/{courseId}/modules`, `POST /instructor-studio/courses/{courseId}/curriculum/reorder`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.courses.curriculum(id)`.
    - *Redux*: Drag state tracking indicators.
*   **Loading State**: Tree skeleton overlays.
*   **Empty State**: "Curriculum tree empty" panel showing "Create Module" CTA.
*   **Error State**: Reorder failures triggers rollback to previous state.
*   **Offline Behaviour**: Drag reordering disabled. Warnings overlay active.
*   **Success States**: Success toast alert on layout save confirmation.
*   **Keyboard Navigation**: Move hierarchy items using Arrow keys + Space.
*   **Accessibility Requirements**: Strict ARIA drag-and-drop tags updates on focus.
*   **Analytics Events**: `curriculum_reordered`, `module_created`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Dynamic list reordering transition animations.
*   **Micro Interactions**: Drag rows outline scales on drag select.
*   **Future Expansion**: AI course syllabus outline builder.
*   **Dependencies**: `@pragyaos/hooks` (drag events listeners).

## 34. Lesson Editor Screen
*   **Screen Purpose**: Modify specific lesson content (Markdown editors, video upload controls, coding challenges settings).
*   **Primary User**: Instructor.
*   **Business Objective**: Support course content creation.
*   **Entry Points**: Curriculum items click, `/studio/lessons/:id/edit`.
*   **Exit Points**: Curriculum builder page.
*   **Required Permissions**: `requireAuth` + `role === 'INSTRUCTOR'`.
*   **Layout**: Split panel layout. Left side markdown code editor (6 cols), right side real-time render preview pane (6 cols).
*   **Grid**: Full screen dashboard grid.
*   **Responsive Behaviour**: Dual pane changes to tabs layout on tablet and mobile viewports.
*   **Primary Components**: Markdown editor textarea, Live preview renderer.
*   **Secondary Components**: Media link attach input fields.
*   **Data Sources**: Lesson DB records.
*   **Backend APIs**: `PATCH /learning-units/modules/{moduleId}/units/{id}`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.lessons.detail(id)`.
    - *Redux*: Document autosave state cache.
*   **Loading State**: Autosaving status indicator bar.
*   **Empty State**: Not applicable.
*   **Error State**: Standard fail notifications.
*   **Offline Behaviour**: Local storage cache saves editing drafts immediately. Bypasses compile triggers.
*   **Success States**: Save alert confirmation message.
*   **Keyboard Navigation**: Custom Markdown editor shortcuts (e.g. `Ctrl+B` for bold).
*   **Accessibility Requirements**: Text editor accessible via screen-readers, aria-labels verify tabs.
*   **Analytics Events**: `lesson_content_saved`, `autosave_triggered`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Slide panel changes.
*   **Micro Interactions**: Code highlighting changes colour instantly.
*   **Future Expansion**: AI formatting cleanup scripts.
*   **Dependencies**: `zod`.

## 35. Media Library Screen
*   **Screen Purpose**: Paginated index of all media files uploaded by the instructor.
*   **Primary User**: Instructor.
*   **Business Objective**: Fast retrieval and management of assets.
*   **Entry Points**: Dashboard sidebar, `/studio/media`.
*   **Exit Points**: Target media settings page.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Grid card catalog.
*   **Grid**: 12-column grid. Laptop: 4 columns.
*   **Responsive Behaviour**: Scale margins.
*   **Primary Components**: Media file cards grid, Asset upload dropzone overlay.
*   **Secondary Components**: Search input, Type filter tabs.
*   **Data Sources**: Media database index.
*   **Backend APIs**: `GET /media`, `DELETE /media/{id}`.
*   **State Management**: TanStack query list.
*   **Loading State**: Pulsing asset cards.
*   **Empty State**: "No media uploaded yet" placeholder screen.
*   **Error State**: Load failures overlay.
*   **Offline Behaviour**: Upload actions disabled. Display cached assets metadata.
*   **Success States**: Toast alerts on delete actions.
*   **Keyboard Navigation**: Tab key selects files. Enter triggers preview dialog window.
*   **Accessibility Requirements**: Media assets declare specific alternative details metadata.
*   **Analytics Events**: `media_deleted`, `media_previewed`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Grid adjustments transitions.
*   **Micro Interactions**: Upload progress bar indicator scales.
*   **Future Expansion**: Cloud image manipulation editor integration.
*   **Dependencies**: `@pragyaos/icons`.

## 36. Quiz Builder Screen
*   **Screen Purpose**: Create lesson questions, configure option grids, set score metrics thresholds.
*   **Primary User**: Instructor.
*   **Business Objective**: Design curriculum evaluation matrices.
*   **Entry Points**: Curriculum builder links.
*   **Exit Points**: Curriculum builder.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Stacked question card list.
*   **Grid**: Single column container.
*   **Responsive Behaviour**: Form layout adapts margins.
*   **Primary Components**: Question list editor, Option inputs form.
*   **Secondary Components**: Correct key selector checkboxes.
*   **Data Sources**: Quiz DB records.
*   **Backend APIs**: `PATCH /quizzes/{id}`.
*   **State Management**: React Hook Form fields validations mapping.
*   **Loading State**: Button loaders active.
*   **Empty State**: "No questions defined yet" card warning.
*   **Error State**: Standard input validation errors tags.
*   **Offline Behaviour**: Submissions blocked. Save local draft state.
*   **Success States**: Success toast notification on update completion.
*   **Keyboard Navigation**: Linear tab navigation. Enter adds option.
*   **Accessibility Requirements**: Focus outline indicators on selectable inputs.
*   **Analytics Events**: `quiz_modified`, `question_added`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Slide additions.
*   **Micro Interactions**: Correct select indicator switches colors.
*   **Future Expansion**: AI question generator from lesson text files.
*   **Dependencies**: `zod`.

## 37. Assignments Screen
*   **Screen Purpose**: Design homework assignments, configure files download folders, edit grading criteria.
*   **Primary User**: Instructor.
*   **Business Objective**: Define active student validation assignments.
*   **Entry Points**: Curriculum Builder options.
*   **Exit Points**: Curriculum Builder.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Single column details container.
*   **Grid**: Centered column.
*   **Responsive Behaviour**: Padding adjustments.
*   **Primary Components**: Assignment parameters form, Rubric scoring grid lists.
*   **Secondary Components**: Download attachments panel.
*   **Data Sources**: Assignment database.
*   **Backend APIs**: `PATCH /assignments/{id}`.
*   **State Management**: Local inputs forms.
*   **Loading State**: Form loaders active.
*   **Empty State**: Not applicable.
*   **Error State**: Input validations tags.
*   **Offline Behaviour**: Actions disabled.
*   **Success States**: Success toast on details save confirmation.
*   **Keyboard Navigation**: Tab key navigates form input fields in logical sequence.
*   **Accessibility Requirements**: Clear visual guides.
*   **Analytics Events**: `assignment_modified`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Fades.
*   **Micro Interactions**: Buttons scale spring.
*   **Future Expansion**: Plagiarism check automated toggle settings.
*   **Dependencies**: `@pragyaos/ui`.

## 38. Student Analytics Screen
*   **Screen Purpose**: Render student completion cohorts charts, grading timelines, drop-off rates.
*   **Primary User**: Instructor, admin.
*   **Business Objective**: Identify course problems, improve learning outcomes.
*   **Entry Points**: Sidebar link, `/studio/analytics`.
*   **Exit Points**: Studio dashboard.
*   **Required Permissions**: `requireAuth` + `role === 'INSTRUCTOR'`.
*   **Layout**: Dashboard layout with grids.
*   **Grid**: 12-column container. High charts blocks.
*   **Responsive Behaviour**: Responsive charts shrink sizes.
*   **Primary Components**: Cohorts drop-off chart, Grading pending pipeline lists, Course stats metrics.
*   **Secondary Components**: Class roster download button panel.
*   **Data Sources**: Class progress DB records.
*   **Backend APIs**: `GET /instructor-studio/analytics`.
*   **State Management**: TanStack query stats.
*   **Loading State**: Card loading skeleton loaders.
*   **Empty State**: "No student analytics compiled yet" page description.
*   **Error State**: Chart display fail warning panels.
*   **Offline Behaviour**: Cache renders active.
*   **Success States**: None.
*   **Keyboard Navigation**: Interactive graph data segments targetable.
*   **Accessibility Requirements**: Raw table equivalents available for cohort grids charts.
*   **Analytics Events**: `analytics_exported`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Graph drawing lines fades.
*   **Micro Interactions**: Value tooltips on graph hover events.
*   **Future Expansion**: Automated drop-off student email alerts.
*   **Dependencies**: `@pragyaos/theme`.

## 39. Revenue Screen
*   **Screen Purpose**: List payouts history, coupon redemptions logs, active membership splits.
*   **Primary User**: Instructor.
*   **Business Objective**: Payout tracking.
*   **Entry Points**: Sidebar, `/studio/revenue`.
*   **Exit Points**: Bank account link options page.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Multi-panel analytical listing layout.
*   **Grid**: 12-column container.
*   **Responsive Behaviour**: Adjust columns.
*   **Primary Components**: Monthly income charts, Paginated transaction list table, Bank info status panel.
*   **Secondary Components**: Coupon metrics grid.
*   **Data Sources**: Commerce DB records.
*   **Backend APIs**: `GET /instructor-studio/revenue`.
*   **State Management**: TanStack query transaction list.
*   **Loading State**: Skeletons tables loaders.
*   **Empty State**: "No payout records compile yet" screen.
*   **Error State**: Standard error overlay.
*   **Offline Behaviour**: Actions disabled.
*   **Success States**: None.
*   **Keyboard Navigation**: Tab selects row details.
*   **Accessibility Requirements**: Financial lists format tabular data correctly.
*   **Analytics Events**: `payout_statement_downloaded`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Chart renders.
*   **Micro Interactions**: Row focus highlight overlays.
*   **Future Expansion**: Direct Stripe Connect onboarding trigger interface.
*   **Dependencies**: `@pragyaos/utils` (currency utilities).

## 40. Publishing Screen
*   **Screen Purpose**: Run course validation checks checklist, submit course for draft review.
*   **Primary User**: Course creator.
*   **Business Objective**: Ensure courses meet catalog standards before publishing.
*   **Entry Points**: Course builder nav, `/studio/courses/:id/publish`.
*   **Exit Points**: Studio Dashboard.
*   **Required Permissions**: `requireAuth` + `role === 'INSTRUCTOR'`.
*   **Layout**: Split screen. Left checks checklist panel, right publishing actions card.
*   **Grid**: 12-column grid.
*   **Responsive Behaviour**: Form layout stacks vertical.
*   **Primary Components**: Dynamic checks validation dashboard lists, Publish course primary button CTA.
*   **Secondary Components**: Preview course preview URL tokens triggers.
*   **Data Sources**: Curriculum verification metrics.
*   **Backend APIs**: `GET /instructor-studio/courses/{courseId}/checklist`, `POST /instructor-studio/courses/{courseId}/publish`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.courses.checklist(id)`.
*   **Loading State**: Validation checking activity spinners.
*   **Empty State**: Not applicable.
*   **Error State**: Critical validation fail alerts banner block.
*   **Offline Behaviour**: Publish actions blocked. Warning ribbon active.
*   **Success States**: Success popup validation screen on launch.
*   **Keyboard Navigation**: Tab navigates through checklist failure links.
*   **Accessibility Requirements**: Contrast colors check on warning state tags.
*   **Analytics Events**: `course_publish_attempted`, `course_publish_successful`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Check list status indicators slide updates.
*   **Micro Interactions**: Hover changes button highlights.
*   **Future Expansion**: Auto-publish scheduling options.
*   **Dependencies**: `@pragyaos/types`.

## 41. Course Health Screen
*   **Screen Purpose**: Display curriculum feedback index, video viewing drops hotspots, missing details warnings.
*   **Primary User**: Instructor.
*   **Business Objective**: Optimize course completion ratios.
*   **Entry Points**: Sidebar, `/studio/courses/:id/health`.
*   **Exit Points**: Curriculum builder.
*   **Required Permissions**: `requireAuth`.
*   **Layout**: Analytics panels.
*   **Grid**: 12-column container. High charts blocks.
*   **Responsive Behaviour**: Responsive charts shrink sizes.
*   **Primary Components**: Drop off hot-spot line graphs, Missing resources warnings list panels.
*   **Secondary Components**: Improvement tip card panel.
*   **Data Sources**: Course metrics API endpoints.
*   **Backend APIs**: `GET /instructor-studio/courses/{courseId}/health`.
*   **State Management**: TanStack query metrics.
*   **Loading State**: Skeletal card lines.
*   **Empty State**: "No feedback collected yet".
*   **Error State**: Fail warning page.
*   **Offline Behaviour**: Cache rendering.
*   **Success States**: None.
*   **Keyboard Navigation**: Graphs data points focus targetable.
*   **Accessibility Requirements**: Raw table equivalents available for charts data.
*   **Analytics Events**: `course_health_reviewed`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Chart draws fade.
*   **Micro Interactions**: Value overlays on graphs hover.
*   **Future Expansion**: AI recommendations direct execution triggers.
*   **Dependencies**: `@pragyaos/theme`.

## 42. Certificates Screen
*   **Screen Purpose**: Register certificate layout templates and link templates to courses.
*   **Primary User**: Course instructor, admin.
*   **Business Objective**: Set parameters for course certificates.
*   **Entry Points**: Workspace sidebar option links.
*   **Exit Points**: Template layout editor page.
*   **Required Permissions**: `requireAuth` + `role === 'INSTRUCTOR'`.
*   **Layout**: Details lists layout with grid previews.
*   **Grid**: 12-column grid. Left lists layouts, right template mock view.
*   **Responsive Behaviour**: Previews stack below settings fields.
*   **Primary Components**: Certificate template settings form, Visual preview mock panel.
*   **Secondary Components**: Template selector drop down menus.
*   **Data Sources**: Credentials API database.
*   **Backend APIs**: `POST /credentials/templates`, `PATCH /credentials/templates/{id}`.
*   **State Management**: local inputs form.
*   **Loading State**: Save loading indicators.
*   **Empty State**: Not applicable.
*   **Error State**: Expired edit validation warning banners.
*   **Offline Behaviour**: Submissions disabled. Offline warning active.
*   **Success States**: Success toast on configuration completion.
*   **Keyboard Navigation**: Tab navigates fields in order.
*   **Accessibility Requirements**: Template layouts map high-visibility focus indicators.
*   **Analytics Events**: `certificate_template_created`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Previews slide updates.
*   **Micro Interactions**: Button scale spring active.
*   **Future Expansion**: Visual drag-and-drop template designer.
*   **Dependencies**: `@pragyaos/types`.

---

# Part 6: Category E — Admin Portal

The Admin Portal utilizes the high-security system `WorkspaceLayout`. It uses dense logs matrices and configuration parameters interfaces to manage platform tenants, users, and compliance.

```
┌─────────────────────────────────────────────────────────┐
│                      ADMIN PORTAL                       │
├─────────────────────────────────────────────────────────┤
│ Top Alert Bar: Critical System Failures Indicators      │
├────────────────────────────┬────────────────────────────┤
│ User Management Matrix     │ Tenant Provisioning Panel  │
│ (Search filter bar, custom  │ (Input form fields, Zod    │
│  Zod validation tags)      │  registrations checks)     │
└────────────────────────────┴────────────────────────────┘
```

## 43. Dashboard Screen
*   **Screen Purpose**: Display critical platform metrics (active organizations, server performance logs, error timeline charts).
*   **Primary User**: Platform administrator.
*   **Business Objective**: Monitor platform health and B2B activity.
*   **Entry Points**: Login redirect, `/admin/dashboard`.
*   **Exit Points**: Settings edit view.
*   **Required Permissions**: `requireAuth` + `role === 'ADMIN'`.
*   **Layout**: Admin metrics panel dashboard shell.
*   **Grid**: 12-column.
*   **Responsive Behaviour**: Cards rearrange column sizes.
*   **Primary Components**: Active B2B organizations charts, System health alerts grids, Server logs timeline feed.
*   **Secondary Components**: System configuration summary bar.
*   **Data Sources**: Administration metrics API endpoints.
*   **Backend APIs**: `GET /admin/dashboard`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.admin.dashboard()`.
*   **Loading State**: Skeletons widgets logs loading lines.
*   **Empty State**: Not applicable.
*   **Error State**: Standard fails banners reload options.
*   **Offline Behaviour**: Offline warning ribbon active. Actions disabled.
*   **Success States**: None.
*   **Keyboard Navigation**: Panel blocks navigation shortcuts. Tab targets tables.
*   **Accessibility Requirements**: Tabular structures verify clean labels indicators.
*   **Analytics Events**: `admin_dashboard_viewed`, `system_export_clicked`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Fade-in entry.
*   **Micro Interactions**: Alert tags scale highlight on hover.
*   **Future Expansion**: Integration with external cloud metrics engines.
*   **Dependencies**: `@pragyaos/theme`.

## 44. Users Screen
*   **Screen Purpose**: Manage user accounts, role definitions, and toggle profile deactivations.
*   **Primary User**: Administrator.
*   **Business Objective**: Moderate user access and compliance.
*   **Entry Points**: Sidebar link, `/admin/users`.
*   **Exit Points**: User audits logs.
*   **Required Permissions**: `requireAuth` + `role === 'ADMIN'`.
*   **Layout**: Paginated data grid with filters header.
*   **Grid**: Full width container view.
*   **Responsive Behaviour**: Horizontal tables scroll elements active for small widths.
*   **Primary Components**: User records table, Role selector option dropdown, Account deactivate action CTA.
*   **Secondary Components**: Search input filter bar.
*   **Data Sources**: User directories.
*   **Backend APIs**: `GET /users`, `DELETE /users/{id}`, `POST /users/{id}/reactivate`.
*   **State Management**:
    - *TanStack Query*: `queryKeys.admin.users.list()`.
*   **Loading State**: Table row loading skeletal placeholders.
*   **Empty State**: "No user matches search query".
*   **Error State**: Inline alert.
*   **Offline Behaviour**: Action buttons disabled. Display cached directory.
*   **Success States**: Row highlights red/green immediately on status changes.
*   **Keyboard Navigation**: Tab navigates through table items. Space triggers action buttons.
*   **Accessibility Requirements**: Table rows configure strict `aria-rowindex` mapping.
*   **Analytics Events**: `user_role_updated`, `user_deactivated`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Fade transition.
*   **Micro Interactions**: Row highlights on hover.
*   **Future Expansion**: Batch import users via CSV files.
*   **Dependencies**: `@pragyaos/types`.

## 45. Organizations Screen
*   **Screen Purpose**: Provision B2B tenant workspaces and configure enterprise seats quotas.
*   **Primary User**: Platform admin.
*   **Business Objective**: Manage B2B organizations.
*   **Entry Points**: Sidebar, `/admin/organizations`.
*   **Exit Points**: Organization settings dashboard.
*   **Required Permissions**: `requireAuth` + `role === 'ADMIN'`.
*   **Layout**: Workspace layout, main listing container.
*   **Grid**: 12-column card layouts.
*   **Responsive Behaviour**: Responsive columns sizes.
*   **Primary Components**: Organization card grids, Seat quota creation input forms.
*   **Secondary Components**: Add new organization dialog window CTAs.
*   **Data Sources**: B2B database.
*   **Backend APIs**: `GET /admin/organizations`, `POST /admin/organizations`.
*   **State Management**: Zod input validations templates.
*   **Loading State**: Creation spinner indicator.
*   **Empty State**: "No organizations registered".
*   **Error State**: Form error validations.
*   **Offline Behaviour**: Submissions blocked. Save draft.
*   **Success States**: Success toast notification on organization creation.
*   **Keyboard Navigation**: Tab navigates inputs. Enter submits form details.
*   **Accessibility Requirements**: Focus outline indicators on form fields.
*   **Analytics Events**: `organization_provisioned`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Card fades.
*   **Micro Interactions**: Scaling transform on card hover.
*   **Future Expansion**: Automatic domain SSO bindings setup forms.
*   **Dependencies**: `@pragyaos/types`.

## 46. Roles Screen
*   **Screen Purpose**: Modify platform access roles and link roles to permission arrays.
*   **Primary User**: Administrator.
*   **Business Objective**: Enforce RBAC security policies.
*   **Entry Points**: Sidebar, `/admin/roles`.
*   **Exit Points**: Admin portal settings.
*   **Required Permissions**: `requireAuth` + `role === 'ADMIN'`.
*   **Layout**: Left panel role selector layout, right panel permissions matrix checkbox panel.
*   **Grid**: Full width container layout.
*   **Responsive Behaviour**: Stacks to vertical panels on mobile.
*   **Primary Components**: Role configuration lists, Permission selector grid.
*   **Secondary Components**: Save roles actions bar.
*   **Data Sources**: RBAC mapping.
*   **Backend APIs**: `GET /admin/roles`, `PATCH /admin/roles/{id}`.
*   **State Management**: TanStack query roles details.
*   **Loading State**: Loaders active.
*   **Empty State**: Not applicable.
*   **Error State**: Standard warnings.
*   **Offline Behaviour**: Modifications disabled.
*   **Success States**: Checkbox updates immediately on click.
*   **Keyboard Navigation**: Tab targets roles list. Space keys toggle checks.
*   **Accessibility Requirements**: Checkboxes configure matching label text mappings.
*   **Analytics Events**: `roles_updated`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Transitions.
*   **Micro Interactions**: Switch indicator toggles.
*   **Future Expansion**: Custom workspace role configuration builders.
*   **Dependencies**: `@pragyaos/constants` (system permissions list).

## 47. Permissions Screen
*   **Screen Purpose**: Review systemic permissions mappings and auditing histories.
*   **Primary User**: Administrator.
*   **Business Objective**: Ensure workspace compliance.
*   **Entry Points**: Roles options links, `/admin/permissions`.
*   **Exit Points**: Admin settings.
*   **Required Permissions**: `requireAuth` + `role === 'ADMIN'`.
*   **Layout**: Single column container.
*   **Grid**: Centered column.
*   **Responsive Behaviour**: Padding adjustments.
*   **Primary Components**: Audit log listing feed, Systemic permissions list panel.
*   **Secondary Components**: Download logs button panel.
*   **Data Sources**: Audit DB records.
*   **Backend APIs**: `GET /admin/permissions/audit-logs`.
*   **State Management**: TanStack query pagination records.
*   **Loading State**: List loaders active.
*   **Empty State**: Not applicable.
*   **Error State**: Standard warnings.
*   **Offline Behaviour**: Logs download disabled.
*   **Success States**: None.
*   **Keyboard Navigation**: Tab select logs details.
*   **Accessibility Requirements**: Focus outlines.
*   **Analytics Events**: `audit_logs_downloaded`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Slide updates.
*   **Micro Interactions**: Row hover color highlights.
*   **Future Expansion**: Integration with external auditing engines.
*   **Dependencies**: `@pragyaos/ui`.

## 48. Reports Screen
*   **Screen Purpose**: Generate platform performance audit reports, student growth analytics, financial compliance spreadsheets.
*   **Primary User**: Platform administrator.
*   **Business Objective**: Platform compliance and analytics monitoring.
*   **Entry Points**: Sidebar, `/admin/reports`.
*   **Exit Points**: Dashboard.
*   **Required Permissions**: `requireAuth` + `role === 'ADMIN'`.
*   **Layout**: Analytics panels.
*   **Grid**: 12-column container. High charts blocks.
*   **Responsive Behaviour**: Responsive charts shrink sizes.
*   **Primary Components**: Financial growth charts, Compliance audit lists, System metrics.
*   **Secondary Components**: Reports export options panel.
*   **Data Sources**: Platform DB records.
*   **Backend APIs**: `GET /admin/reports`.
*   **State Management**: TanStack query metrics.
*   **Loading State**: Card loading skeleton loaders.
*   **Empty State**: "No reports compiled yet".
*   **Error State**: Chart display fail warning panels.
*   **Offline Behaviour**: Cache rendering.
*   **Success States**: None.
*   **Keyboard Navigation**: Charts focus targets read text tags.
*   **Accessibility Requirements**: Raw table equivalents available for charts data.
*   **Analytics Events**: `reports_exported`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Chart draws fade.
*   **Micro Interactions**: Value overlays on graphs hover.
*   **Future Expansion**: Automated reports scheduling configurations.
*   **Dependencies**: `@pragyaos/theme`.

## 49. Commerce Screen
*   **Screen Purpose**: Review platform checkout logs, coupon redemption status codes, tax calculations.
*   **Primary User**: Administrator.
*   **Business Objective**: Monitor platform transactions.
*   **Entry Points**: Sidebar, `/admin/commerce`.
*   **Exit Points**: Transaction details page.
*   **Required Permissions**: `requireAuth` + `role === 'ADMIN'`.
*   **Layout**: Paginated data grid with filters header.
*   **Grid**: Full width container view.
*   **Responsive Behaviour**: Horizontal tables scroll elements active for small widths.
*   **Primary Components**: Transaction records table, Refund checkout actions panel, Coupon stats grids.
*   **Secondary Components**: Search input filter bar.
*   **Data Sources**: Transaction DB index.
*   **Backend APIs**: `GET /admin/commerce/transactions`, `POST /admin/commerce/refund`.
*   **State Management**: TanStack query transactions.
*   **Loading State**: Row skeletons lists.
*   **Empty State**: "No transactions match parameters".
*   **Error State**: Fail warnings.
*   **Offline Behaviour**: Actions disabled.
*   **Success States**: Refund button shows success tick immediately on confirm.
*   **Keyboard Navigation**: Tab navigates through table items. Space triggers action buttons.
*   **Accessibility Requirements**: Table rows configure strict `aria-rowindex` mapping.
*   **Analytics Events**: `refund_processed`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Fades.
*   **Micro Interactions**: Row highlights on hover.
*   **Future Expansion**: Direct bank checkout transfers integrations settings.
*   **Dependencies**: `@pragyaos/types`.

## 50. Notifications Screen
*   **Screen Purpose**: Dispatch platform-wide system notification broadcasts.
*   **Primary User**: Administrator.
*   **Business Objective**: Notify all platform users of critical maintenance windows.
*   **Entry Points**: Sidebar, `/admin/notifications`.
*   **Exit Points**: Dashboard.
*   **Required Permissions**: `requireAuth` + `role === 'ADMIN'`.
*   **Layout**: Single column details container.
*   **Grid**: Centered column.
*   **Responsive Behaviour**: Padding adjustments.
*   **Primary Components**: Broadcast creation form, Active broadcast lists.
*   **Secondary Components**: Audience selector dropdowns.
*   **Data Sources**: Broadcast database.
*   **Backend APIs**: `POST /admin/notifications/broadcast`, `GET /admin/notifications/broadcasts`.
*   **State Management**: Zod validations rules form mapping.
*   **Loading State**: Submit loaders active.
*   **Empty State**: "No active broadcasts".
*   **Error State**: Form error validations.
*   **Offline Behaviour**: Actions disabled. Save draft.
*   **Success States**: Success toast alert on broadcast submission.
*   **Keyboard Navigation**: Tab navigates through fields. Enter submits details.
*   **Accessibility Requirements**: Contrast colors check.
*   **Analytics Events**: `broadcast_dispatched`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Checklist update slide.
*   **Micro Interactions**: Buttons scale spring.
*   **Future Expansion**: Direct email campaign sync configurations.
*   **Dependencies**: `zod`.

## 51. Search Screen
*   **Screen Purpose**: Execute high-security search queries across all database records.
*   **Primary User**: Platform administrator.
*   **Business Objective**: Fast moderation retrieval of database details.
*   **Entry Points**: Top bar search bar.
*   **Exit Points**: Specific database view.
*   **Required Permissions**: `requireAuth` + `role === 'ADMIN'`.
*   **Layout**: Search listing dashboard.
*   **Grid**: Centered column.
*   **Responsive Behaviour**: Column layouts.
*   **Primary Components**: Global database search results grid, Category filters header.
*   **Secondary Components**: Audit record link.
*   **Data Sources**: Security Search index database.
*   **Backend APIs**: `GET /search`.
*   **State Management**: TanStack query list.
*   **Loading State**: Skeletons indicators.
*   **Empty State**: "No search results match database logs".
*   **Error State**: Fail warnings.
*   **Offline Behaviour**: Search actions disabled. Offline warning active.
*   **Success States**: Search page compiles metrics count immediately.
*   **Keyboard Navigation**: Tab key targets result lines.
*   **Accessibility Requirements**: ARIA search tags config.
*   **Analytics Events**: `admin_moderation_search_executed`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Card slides.
*   **Micro Interactions**: Highlights on row mouse enter.
*   **Future Expansion**: AI query language search parsing.
*   **Dependencies**: `@pragyaos/icons`.

## 52. Settings Screen
*   **Screen Purpose**: Modify platform system configurations, payment processor credentials, and SSO identity bindings.
*   **Primary User**: Administrator.
*   **Business Objective**: Define active platform configurations.
*   **Entry Points**: Workspace sidebar, `/admin/settings`.
*   **Exit Points**: Dashboard.
*   **Required Permissions**: `requireAuth` + `role === 'ADMIN'`.
*   **Layout**: Left settings sidebar nav (3 cols), right configuration forms (9 cols).
*   **Grid**: 12-column grid.
*   **Responsive Behaviour**: Split layouts stack to single column on small viewports.
*   **Primary Components**: Platform settings form, SSO bindings checklist, Payment processor keys card.
*   **Secondary Components**: System cache purge CTA.
*   **Data Sources**: Configurations database records.
*   **Backend APIs**: `GET /admin/settings`, `PATCH /admin/settings`.
*   **State Management**: local inputs form.
*   **Loading State**: Save loading indicators.
*   **Empty State**: Not applicable.
*   **Error State**: Validation failure warning banners.
*   **Offline Behaviour**: Submissions disabled. Offline warning active.
*   **Success States**: Success toast on configuration completion.
*   **Keyboard Navigation**: Tab navigates fields in order.
*   **Accessibility Requirements**: Form inputs configure strict tab sequences.
*   **Analytics Events**: `system_settings_updated`.
*   **SEO Requirements**: `noindex`.
*   **Animations**: Previews slide updates.
*   **Micro Interactions**: Purge cache button flashes green on completion.
*   **Future Expansion**: Direct API logs inspection portal link.
*   **Dependencies**: `@pragyaos/types`.
