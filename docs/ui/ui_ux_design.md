# PragyaOS: Master UI/UX Design & Product Experience Blueprint

**Product Name:** PragyaOS  
**Type:** Modern Learning Experience Platform (LXP)  
**Author:** Antigravity (SaaS Product Design & UI/UX Architecture Group)  
**Status:** Under Review (Feedback Requested)

---

## Part 1: Design Philosophy

### Brand Personality
PragyaOS is positioned at the intersection of **intellectual rigor** and **fluid digital tools**. Unlike traditional LMSs which feel administrative and bureaucratic, PragyaOS has a personality defined as:
*   **Intuitive & Flow-State Driven:** Adapts dynamically to user actions, keeping them focused.
*   **Minimalist but High-Fidelity:** Employs precise typography, ample negative space, and curated accent colors.
*   **Empowering & Sophisticated:** Treats learning as a craft, making users feel they are building a career, not just checking boxes.

### Visual Language
The design system draws inspiration from leading SaaS platforms (e.g., Stripe, Linear, Vercel). The aesthetic is characterized by **clean layouts, crisp borders, dark mode optimization, subtle gradients, and glassmorphism**.
*   **Borders:** $1px$ solid gray lines acting as strict grids, replacing heavy drop shadows.
*   **Contrast:** Rich dark backgrounds paired with sharp foreground panels to establish visual hierarchy.

### Design Principles
1.  **Content is the Hero:** Eliminate visual noise. The course player, builder, and dashboards focus attention entirely on the primary task.
2.  **Context Over Navigation:** Bring actions to the user instead of redirecting them. Utilize modals, command palettes, and responsive side sheets.
3.  **Predictable Consistency:** Every interactive element must behave identically across Student, Instructor, and Admin workspaces.
4.  **Immersive Transitions:** Micro-interactions and transition animations must feel immediate ($<200ms$), using ease-out cubic-bezier configurations.

### Product Emotion
*   **Focus:** A sense of entering "deep work" mode when launching a course.
*   **Achievement:** Interactive reward loops (progress rings, milestone badges) that feel rewarding without being distracting.
*   **Confidence:** Instructors feel professional pride when building courses; students feel a sense of structured progress.

### User Experience Philosophy
The platform respects the learner's attention. Interactions are designed to minimize cognitive load by organizing complex workflows into progressive disclosures. Search is accessible globally, and settings are localized to reduce menu navigation.

### Accessibility Philosophy (A11Y)
PragyaOS targets **WCAG 2.2 Level AA compliance**:
*   **Contrast:** Text elements meet a minimum contrast ratio of 4.5:1 (7:1 for headers).
*   **Keyboard Navigation:** All interactive elements feature visible focus rings and support fully keyboard-driven navigation (focus management, escape key escapes, trap focus in modals).
*   **Screen Readers:** Use semantic HTML5 landmarks (`<nav>`, `<main>`, `<aside>`) coupled with explicit `aria-*` tags.

### Motion Philosophy
All animations use hardware-accelerated CSS properties (`transform`, `opacity`).
*   **Sizing/Slowing:** Layout shifts are avoided. Popovers scale slightly on entry (`scale(0.95) -> scale(1.0)`).
*   **Duration:** UI state transitions run between $120ms$ and $250ms$ to maintain responsiveness.

---

## Part 2: Design System (Tokens & Variables)

### Color System

#### Dark Theme
*   **Primary:** Indigo `#6366F1` (Accents, active items)
*   **Secondary:** Slate `#64748B` (Secondary text, helper states)
*   **Accent:** Violet-Glow `#8B5CF6` (Special tags, call-to-actions)
*   **Success:** Emerald `#10B981` (Completed, paid status)
*   **Warning:** Amber `#F59E0B` (Pending, warning labels)
*   **Danger:** Rose `#F43F5E` (Error, delete, failed status)
*   **Info:** Sky `#0EA5E9` (System alerts, reminders)
*   **Background (Canvas):** Dark `#030712` (Base page color)
*   **Surface Base (Low):** Neutral `#0B0F19` (Dashboard cards, sidebar backgrounds)
*   **Surface Elevate (High):** Slate-Panel `#1F2937` (Dropdowns, modals, popovers)
*   **Borders:** Obsidian-Border `#1F2937` (Fine division lines)

#### Light Theme
*   **Primary:** Indigo `#4F46E5`
*   **Secondary:** Slate `#475569`
*   **Accent:** Violet `#7C3AED`
*   **Success:** Emerald `#059669`
*   **Warning:** Amber `#D97706`
*   **Danger:** Rose `#E11D48`
*   **Info:** Sky `#0284C7`
*   **Background (Canvas):** Light `#F8FAFC` (Base page color)
*   **Surface Base:** Off-White `#FFFFFF`
*   **Surface Elevate:** Gray-Panel `#F1F5F9`
*   **Borders:** Slate-Border `#E2E8F0`

### Typography

*   **Primary Font Family:** `Inter`, system-ui, sans-serif
*   **Display Font Family (Headers):** `Outfit`, system-ui, sans-serif

#### Heading Scale
*   `h1` (Display Title): `3.5rem (56px)` / Leading `1.2` / Weight `800`
*   `h2` (Page Header): `2.25rem (36px)` / Leading `1.25` / Weight `700`
*   `h3` (Section Header): `1.5rem (24px)` / Leading `1.3` / Weight `600`
*   `h4` (Subsection Header): `1.25rem (20px)` / Leading `1.4` / Weight `600`

#### Body Scale
*   `body-large`: `1.125rem (18px)` / Leading `1.5` / Weight `400`
*   `body-base`: `1rem (16px)` / Leading `1.5` / Weight `400`
*   `body-small` (Captions): `0.875rem (14px)` / Leading `1.4` / Weight `500`
*   `body-tiny` (Secondary Details): `0.75rem (12px)` / Leading `1.4` / Weight `500`

### Spacing System (Based on 8px grid)
*   `space-1`: `4px`
*   `space-2`: `8px`
*   `space-3`: `12px`
*   `space-4`: `16px` (Standard component padding)
*   `space-6`: `24px` (Card padding, inner page layouts)
*   `space-8`: `32px` (Page boundaries)
*   `space-12`: `48px`
*   `space-16`: `64px`

### Radius System
*   `radius-xs`: `4px` (Small badges, checkbox components)
*   `radius-sm`: `8px` (Inputs, buttons, tabs)
*   `radius-md`: `12px` (Cards, inner panels)
*   `radius-lg`: `16px` (Modals, popovers, dashboard panels)
*   `radius-full`: `9999px` (Avatars, pill badges)

### Shadow & Elevation System (Dark Mode Optimization)
*   Instead of standard shadows, which can appear muddy in dark mode, we use **glowing borders** and **semi-opaque borders** to define elevation.
*   `level-0` (Canvas): Flat. No shadow. Border: `1px solid var(--border-color)`.
*   `level-1` (Card): Box shadow: `0 1px 3px rgba(0,0,0,0.4)`. Border: `1px solid var(--border-color)`.
*   `level-2` (Dropdown/Popover): Box shadow: `0 4px 6px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)`.
*   `level-3` (Modal): Box shadow: `0 20px 25px -5px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)`.

### Grid System
*   **Desktop:** 12-column responsive layout, Max-width `1280px` (`space-8` page margins, `space-6` gutters).
*   **Tablet:** 8-column layout, `space-6` page margins, `space-4` gutters.
*   **Mobile:** 4-column layout, `space-4` page margins, `space-4` gutters.

### Icon System
*   **Library:** Lucide Icons (styled with consistent strokes).
*   **Sizing Rules:**
    *   Inline text actions: `16px` (stroke weight `2px`).
    *   Dashboard navigation: `20px` (stroke weight `2px`).
    *   Card headers: `24px` (stroke weight `1.5px`).

### Glassmorphism Rules
*   **Usage:** Only used for floating interfaces (header bars, command palettes, sidebars).
*   **Values:** Background color `rgba(11, 15, 25, 0.7)`, Backdrop filter `blur(12px)`, Border `1px solid rgba(255, 255, 255, 0.06)`.

### Gradient Rules
Gradients are used sparingly to highlight primary features:
*   **Accent Gradient:** `linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)` (Buttons, active accents).
*   **Text Gradient:** `linear-gradient(to right, #FFFFFF, #94A3B8)` (Large Display Headers).

### Transition & Hover Rules
*   **Focus Ring:** `0 0 0 2px var(--canvas-bg), 0 0 0 4px var(--primary-color)`.
*   **Default Button Hover:** Background moves up by `-1px` on the Y-axis. Background color transitions smoothly over `150ms`.

### Screen State Rules
*   **Skeleton Loader:** Gradient pulse moving left to right from `#1F2937` to `#374151` and back to `#1F2937` over `1.5s`.
*   **Empty State Layout:** Uses a custom grayed-out icon outline, centered secondary text, and a single primary action button.

---

## Part 3: Information Architecture

```
                    ┌────────────────────────┐
                    │     Public Website     │
                    └───────────┬────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│ Landing Page │        │ Course Cat.  │        │ Pricing Page │
└──────────────┘        └──────────────┘        └──────────────┘
                                │ (Authenticates)
                                ▼
                    ┌────────────────────────┐
                    │      Workspace         │
                    └───────────┬────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        ▼                       ▼                       ▼
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│ Student Port │        │ Instructor WS│        │ Admin Dash.  │
└──────────────┘        └──────────────┘        └──────────────┘
```

### Public Domain Pages
*   **Landing Page (`/`):** Connects visitors to the platform's value proposition. Features interactive course previews and animated testimonials.
*   **Course Catalog (`/courses`):** Public search and filtering interface for the course collection.
*   **Course Details (`/courses/:slug`):** Informational page for course details, syllabus, pricing, instructor bios, and customer reviews.
*   **Pricing (`/pricing`):** Detailed breakdown of membership levels, single-purchase pricing, and enterprise subscription models.

### Authentication Space
*   **Login (`/auth/login`), Sign Up (`/auth/register`), Password Retrieval (`/auth/recover`):** Secure access points. Bypasses standard navigation layouts to maintain a distraction-free signup funnel.

### Student Workspace (Secure Portal)
*   **Dashboard (`/dashboard`):** Overview of active courses, current learning streaks, progress metrics, and upcoming deadlines.
*   **Course Player (`/learn/:courseSlug/lesson/:lessonId`):** The primary focus-mode learning environment, with sidebar navigation and adjacent tabs for notes, bookmarks, and exercises.
*   **Certificates Space (`/certificates`):** Secure verification directory showing all earned credentials.

### Instructor Workspace (Secure Portal)
*   **Instructor Dashboard (`/instructor/dashboard`):** Real-time analytics overview (revenue, student registrations, course engagement).
*   **Course Builder (`/instructor/courses`):** Interface for adding chapters, lessons, quizzes, and resources. Includes draft and publishing workflow controls.

### Operations Space (Admin/Super Admin Dashboards)
*   **Admin Console (`/admin`):** Moderation dashboard for course reviews, payout management, user account status, and platform audit trail reviews.

---

## Part 4: Navigation Systems

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  [Logo]   Catalog   My Courses   Pricing  │   [Search]  [Notif]  [User Menu] │
├──────────────────────────────────────────────────────────────────────────────┤
│  [Sidebar] Dashboard                      │  Breadcrumbs > Module 1          │
│            Analytics                      ├──────────────────────────────────┤
│            Course Builder                 │                                  │
│            Settings                       │  Main Working Canvas             │
```

### Navigation Architecture
*   **Visitor Navigation:** Fixed topbar with glassmorphism styling. Links to the catalog, pricing, and login. Includes a primary button for registration.
*   **Dashboard Navigation (Student/Instructor/Admin):** Left-hand sidebar for application-wide routing, and a clean topbar for contextual tools (breadcrumbs, global search, notifications, profile menu).
*   **The Focus Navigation (Course Player):** A minimalist header containing only a exit button (`<- back to dashboard`), the course title, a progress bar, and a sharing menu.

### Command Palette & Quick Actions
*   **Shortcut:** Activated by pressing `Cmd + K` or `Ctrl + K`.
*   **UX Role:** Provides a global search and navigation overlay. Allows users to jump between lessons, search courses, toggle dark mode, or open settings without clicking through menus.

### Notification Drawer
*   **Layout:** A right-side panel that slides out smoothly over the content.
*   **Functionality:** Groups notifications by category (Announcements, Grades, Certificates) and features quick buttons to mark notifications as read or archive them.

---

## Part 5: Product Page Designs

### 1. Landing Page
*   **Purpose:** Inform visitors and convert them into registered students.
*   **Layout:** Hero section with text gradients, followed by a live interactive mock player preview, interactive catalog categories, pricing tables, and a secure CTA footer.
*   **Key Transitions:** Elements fade in and slide up smoothly as the user scrolls.

### 2. Course Catalog (Marketplace)
*   **Purpose:** Search and discovery interface for the course catalog.
*   **Layout:** Two-column design. Left column: collapsible sidebar for filters (Level, Price, Topic, Rating). Right column: grid of course cards with skeletal loading placeholders.
*   **Micro-interactions:** Hovering over a course card scales it slightly (`scale(1.02)`) and reveals a quick preview button.

### 3. Course Detail Page
*   **Purpose:** Product details and purchase conversion.
*   **Layout:** Split layout. Left column (60%): Course overview, syllabus accordion, instructor profiles, and reviews list. Right column (40%): Sticky checkout card with video teaser player.

### 4. Student Dashboard
*   **Purpose:** The launchpad for active learners.
*   **Layout:** Three-column layout. Left (20%): Main navigation. Center (60%): Active courses grid, progression timeline, and learning streak calendar. Right (20%): Contextual widgets (upcoming assignments, discussion updates).

### 5. Course Player (The Focus Canvas)
*   **Purpose:** Immersive, distraction-free learning environment.
*   **Layout:** Split design. Left panel (70%): High-performance video player with tabs below for notes, resources, and discussion. Right panel (30%): Collapsible curriculum drawer showing current progress.

### 6. Instructor Dashboard
*   **Purpose:** Operations and metrics overview for instructors.
*   **Layout:** Metrics banner (Total Revenue, Active Students, Average Rating) followed by a tabs container switching between active courses management tables and interactive performance charts.

### 7. Course Builder
*   **Purpose:** Structuring course curriculum.
*   **Layout:** Two-column tree structure. Left: Drag-and-drop course outline (Sections and Lessons). Right: Detailed editing panel for the selected lesson (supporting resource attachments, text descriptions, and video uploads).

### 8. Assessments & Quiz Runner
*   **Purpose:** Test knowledge acquisition.
*   **Layout:** Distraction-free single-question layout with a persistent timer, question indicator panel on the left, and navigation buttons at the bottom.

### 9. Admin Dashboard
*   **Purpose:** Platform management for operations teams.
*   **Layout:** Three-column dashboard containing queues for pending course reviews, flags for user moderation, and platform-wide performance charts.

---

## Part 6: Component Inventory

```
Buttons                  Inputs                   Dropdowns
┌──────────────┐         ┌──────────────────────┐ ┌──────────────────────┐
│  [Primary]   │         │ Label                │ │ Select Option    [v] │
│  [Secondary] │         │ ├──────────────────┤ │ ├──────────────────┤ │
│  [Ghost]     │         │ │ Placeholder      │ │ │ Option A         │ │
└──────────────┘         └─┴──────────────────┴─┘ └─┴──────────────────┴─┘

Progress Bars            Badges                   Tabs
┌──────────────────────┐ ┌────────┐               ┌──────┐┌──────┐┌──────┐
│████████░░░░░░░░ 50%  │ │ Active │               │Tab A ││Tab B ││Tab C │
└──────────────────────┘ └────────┘               └──────┘└──────┘└──────┘
```

### Standard Interaction Specifications
*   **Primary Button:** Uses the brand's solid gradient color. Hover state: Opacity changes to `0.9` and position shifts on the Y-axis by `-1px`. Focus state: Focus ring with a $4px$ offset. Active state: Scale shifts to `0.98`.
*   **TextInput Fields:** Background uses `var(--surface-base)` with an Obsidian-border. Hover: Border color shifts to Slate-Border. Focus: Border color shifts to Primary, accompanied by a glowing shadow ring.
*   **Standard Cards:** Low elevation background with rounded corners (`radius-md`). Border: `1px solid var(--border-color)`.

---

## Part 7: Course Player Experience

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [<- Back]  Course: Advanced Systems Architecture        [55% Done]  [Share]  │
├──────────────────────────────────────────────────────┬───────────────────────┤
│                                                      │  Syllabus             │
│                 [ Video Player ]                     │  ┌──────────────────┐ │
│                                                      │  │ [x] 1. Intro     │ │
│                 (16:9 Aspect Ratio)                  │  │ [>] 2. Models    │ │
│                                                      │  │ [ ] 3. Scaling   │ │
├──────────────────────────────────────────────────────┤  └──────────────────┘ │
│  Tabs: Notes | Bookmarks | Resources | Discussions   │                       │
└──────────────────────────────────────────────────────┴───────────────────────┘
```

The Course Player is designed as an immersive "learning hub."
*   **Interface Structure:** Split-pane design that scales based on viewport width. The curriculum panel collapses to the right to maximize video space.
*   **Video Controls:** Custom video interface featuring speed adjustment controls (`0.5x` to `2x`), subtitles toggling, volume tracking, bookmark markers on the progress slider, and high-performance playback speed shortcuts.
*   **Notes Integration:** Allows students to type notes directly inline. Notes are automatically tagged with the current video timestamp, enabling users to jump back to that moment by clicking the note.
*   **Keyboard Shortcuts:**
    *   `Spacebar` / `K`: Toggle Play / Pause.
    *   `Right-Arrow` / `Left-Arrow` / `L` / `J`: Skip forward/backward 10 seconds.
    *   `F`: Toggle Fullscreen.
    *   `M`: Toggle Mute.
    *   `N`: Create a new timestamped note.

---

## Part 8: Instructor Experience

The Instructor Experience prioritizes layout clarity and ease of content management.

### Course Outline & Drag-and-Drop Builder
*   **UX Pattern:** Visual drag-and-drop hierarchy. Instructors can drag and drop chapters, lessons, and assignments to reorder them.
*   **Interaction:** Features a split screen. Moving lessons in the list triggers subtle animation transitions to show where the item will be dropped, and automatically recalculates ordering keys in the background.

```
[ Section 1: Introduction ] ──( Drag )──>  [ Drop Area ]
  ├── Lesson 1.1: Welcome
  └── Lesson 1.2: System Overview
```

### Performance & Payout Dashboard
*   **UX Pattern:** Financial details are presented via clear charts. Displays revenue splits, monthly performance comparisons, and payout histories in a clean table layout.

---

## Part 9: Admin Experience

The Admin Experience provides platform operators with the tools to manage reviews, moderation, and settings.

### Course Review Queue
*   **UX Pattern:** A split-screen review interface. The left panel shows the course metadata and syllabus hierarchy. The right panel displays the video lessons player, allowing admins to quickly review content quality before approval.

### User Moderation System
*   **UX Pattern:** Standard user directories table. Admins can view flags on student reviews, suspend user profiles, or toggle permissions via simple toggle switches.

---

## Part 10: Product Roadmap & UI Checklist

### UI Development Milestones

```
Milestone 1: Core System & Design Tokens
├── Establish UI design system tokens (colors, layout margins, fonts)
└── Create layout skeletons, global navbar, and base sidebars
Milestone 2: Authentication & User Accounts Space
├── Design login, signup, password recovery, and onboarding pages
└── Create profile management dashboard and user settings panels
Milestone 3: Learning Spaces (Student Portal)
├── Design student home dashboard, progress tracker, and calendar
└── Create course player layout, note taker, and quiz screen
Milestone 4: Instructor Control Center
├── Design course creation page, section organizer, and editor
└── Create analytics cards, revenue charts, and payout tables
Milestone 5: Operations Console (Admin Workspace)
├── Design pending course review screen, moderator tools
└── Create system configuration dashboards, logs explorer
```

### Product Design Checklist
*   [ ] Dark/Light mode color schemes tested for contrast compliance.
*   [ ] All interactive elements (buttons, inputs) include focus indicators.
*   [ ] Custom screen size layouts optimized for mobile and desktop viewports.
*   [ ] Empty states designed for lists, directories, and dashboards.
*   [ ] Error messages provide clear descriptions and actionable steps.
*   [ ] Command palette workflows mapped to keyboard shortcuts.
*   [ ] All system actions (saving, loading, success states) feature Toast notifications.
