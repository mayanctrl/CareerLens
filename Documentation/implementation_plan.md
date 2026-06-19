# CareerLens Frontend Rebuild — Implementation Plan

Complete frontend rebuild to match the approved Google Stitch design while preserving all existing backend integration.

---

## Stitch Design Analysis

The Stitch project (ID: `4909951926260255820`) contains **5 screens**:

| Screen | Title | Resolution |
|--------|-------|------------|
| Dashboard - Overview | Main dashboard with bento grid layout | 2560×2048 |
| CareerLens - Home | Landing/marketing page | 2560×6010 |
| Career Roadmap | Roadmap view with timeline | 2560×3546 |
| Resume Analyzer | Resume review & scoring | 2560×3290 |
| Skill Profile | Skill gap analysis view | 2560×3022 |

### Design System Extracted from Stitch

**Color Palette (Material 3 dark theme)**:
- `background`: `#001526` (deepest navy)
- `surface`: `#001526`
- `surface-container-low`: `#071d2e`
- `surface-container`: `#0c2133`
- `surface-container-high`: `#182c3d`
- `surface-container-highest`: `#233649`
- `surface-variant`: `#233649`
- `primary`: `#55e0d2` (teal)
- `primary-container`: `#2ec4b6`
- `secondary`: `#ffb86b` (warm amber)
- `secondary-container`: `#ed9000`
- `tertiary`: `#ffbbb8` (coral)
- `on-surface`: `#d0e5fc` (primary text)
- `on-surface-variant`: `#bbcac6` (secondary text)
- `outline`: `#859491`
- `outline-variant`: `#3c4947`
- `error`: `#ffb4ab`

**Typography**:
- Headlines: `Plus Jakarta Sans` (600-800 weight)
- Labels: `Geist` (500-600 weight)
- Body: `Inter` (400 weight)
- Display: `48px/56px`, Headline LG: `32px/40px`, Headline MD: `24px/32px`
- Body LG: `18px/28px`, Body MD: `16px/24px`
- Label MD: `14px/20px`, Label SM: `12px/16px`

**Key Visual Patterns**:
- `glass-panel`: `backdrop-filter: blur(12px); background: rgba(12,33,51,0.7); border: 1px solid rgba(253,255,252,0.08)`
- Sidebar: 280px fixed, `surface-container-low` background
- Active nav: `text-primary bg-primary/10 border-l-2 border-primary`
- Cards: `glass-panel rounded-2xl` with subtle borders
- Readiness Score: Large SVG circular gauge
- Bento Grid: 12-column layout with `lg:col-span-5` / `lg:col-span-7` splits
- Opportunity cards: colored top accent bar, company logos, match percentage
- Mobile: bottom navigation bar

---

## Current State Audit

### What Exists and Works
- **Backend**: 14 route files under `server/src/routes/` covering all domains
- **Auth**: Supabase auth via `AuthContext.jsx` — fully functional
- **API layer**: Axios instance with token interceptor in `lib/api.js`
- **Supabase client**: `lib/supabase.js`
- **Database**: 20 tables in schema.sql
- **Build system**: Vite + Tailwind v4 + `@` alias

### What Exists but Needs Rebuild (Frontend)
- 8 common components (Button, Card, Input, Badge, Loader, ProgressBar, Tabs, Toast)
- 3 layout components (DashboardLayout, Sidebar, TopNav)
- 5 dashboard pages (Dashboard, Assessment, Recommendations, Roadmap, Projects)
- 5 public pages (Landing, Login, Register, ForgotPassword, 404)
- 7 placeholder pages (Skills, Resources, Resume, Interview, Progress, Achievements, Insights, Settings, Notifications, Profile)

### API Endpoint Inventory (DO NOT MODIFY)

| Route Base | Endpoints |
|-----------|-----------|
| `/api/auth` | POST register, login, logout, forgot-password |
| `/api/profile` | GET /, PUT /, POST /avatar |
| `/api/assessment` | POST /, GET /, GET /history |
| `/api/recommendations` | GET /, GET /:id, POST /generate |
| `/api/skills` | GET /, GET /user, POST /user, PUT /user/:id, DELETE /user/:id |
| `/api/roadmap` | GET /, POST /, PUT /steps/:id, GET /:id |
| `/api/resources` | GET /, GET /categories, GET /:id |
| `/api/projects` | GET /, GET /user, POST /user, PUT /user/:id, GET /:id |
| `/api/resume` | GET /, POST /, PUT /:id, DELETE /:id |
| `/api/interview` | GET /questions, POST /submit, GET /progress, GET /categories |
| `/api/progress` | GET /, GET /dashboard, PUT /goals |
| `/api/notifications` | GET /, PUT /read, PUT /read-all, DELETE /:id |
| `/api/insights` | GET /, GET /trending, GET /:id |
| `/api/settings` | GET /, PUT / |

---

## User Review Required

> [!IMPORTANT]
> **Stitch coverage is 5 of 25+ pages.** The Stitch design only covers: Home/Landing, Dashboard, Skill Profile, Career Roadmap, and Resume Analyzer. For the remaining ~20 pages (Login, Register, Assessment, Recommendations, Projects, Interview, Progress, Achievements, Settings, Notifications, Profile, Help, 404, etc.), I will design them to be **pixel-perfect consistent** with the Stitch design system — same colors, typography, spacing, glass panels, bento grid patterns — but the exact layout will be an extrapolation. Is this acceptable?

> [!IMPORTANT]
> **Color Discrepancy.** Your request specifies a color palette with `#F8FAFC` background and `#FFFFFF` cards (light theme), but the Stitch design uses a dark Material 3 theme (`#001526` background). The existing codebase also uses a dark theme. I will follow the **Stitch design (dark theme)** as the source of truth, adapting the provided colors as semantic accents. Please confirm.

> [!WARNING]
> **Font change.** The current codebase uses `Geist` as the primary headline font. The Stitch design uses `Plus Jakarta Sans` for headlines, `Geist` for labels, and `Inter` for body text. I will align to the Stitch fonts.

> [!IMPORTANT]
> **Many backend routes are stubs.** Routes like roadmap, skills, resources, projects, resume, interview, progress, notifications, insights, and settings return placeholder JSON (`{ success: true, message: '...' }`). The frontend will call these endpoints and handle the responses gracefully (empty states, skeleton loading), but the data won't be real until the backend controllers are implemented.

---

## Open Questions

1. **Help page**: There's no `/help` route on the backend. Should I create a static FAQ/help page, or skip it?
2. **Mock Interview page**: The backend has `/api/interview/questions` and `/api/interview/submit`. Should Mock Interview be a separate page or a sub-feature of Interview Prep?
3. **Career Details page**: No specific `/api/recommendations/:id` details endpoint exists beyond the basic GET. Should Career Details be a modal/dialog on the Recommendations page or a full page?

---

## Proposed Changes

The rebuild is organized into **8 phases**, executed incrementally. Each phase is verified before moving to the next.

---

### Phase 1: Foundation & Design System

Update the design tokens, global styles, and fonts to match the Stitch design system exactly.

#### [MODIFY] [index.css](file:///c:/Users/Mayan/Projects/CareerLens/client/src/index.css)
- Replace all `@theme` color tokens with the Stitch M3 palette
- Add `Plus Jakarta Sans` font import and update font families
- Update glass-panel, scrollbar, and utility classes to match Stitch
- Add new `glow-teal`, `glow-orange` utility classes from Stitch

#### [DELETE] [App.css](file:///c:/Users/Mayan/Projects/CareerLens/client/src/App.css)
- Legacy boilerplate styles not used by any component

#### [MODIFY] [index.html](file:///c:/Users/Mayan/Projects/CareerLens/client/index.html)
- Update Google Fonts link to include `Plus Jakarta Sans`
- Update meta tags and title

---

### Phase 2: Layout Shell (Sidebar + TopNav + DashboardLayout)

Rebuild the shell components to match the Stitch dashboard structure.

#### [MODIFY] [Sidebar.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/layout/Sidebar.jsx)
- Match Stitch sidebar: `surface-container-low` background, logo with `primary-container` icon
- Active state: `bg-primary/10 border-l-2 border-primary` (not rounded pill)
- Add "Premium Plan" upgrade card at the bottom per Stitch design
- Add Support and Sign Out links at bottom
- Nav items updated to match Stitch naming (e.g., "Skill Profile", "Job Matches", "Career Roadmaps")
- Add mobile bottom navigation bar

#### [MODIFY] [TopNav.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/layout/TopNav.jsx)
- Match Stitch header: search bar with icon, horizontal tab links (Dashboard/Matches/Applications)
- Add theme toggle button, notifications button
- User profile with avatar image, name, and role text
- `h-16` height, `background/80 backdrop-blur-md` glass effect

#### [MODIFY] [DashboardLayout.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/layout/DashboardLayout.jsx)
- Update content area padding to match Stitch (`p-margin-mobile md:p-margin-desktop`)
- Add mobile bottom nav conditionally

---

### Phase 3: Common Components Rebuild

Rebuild all reusable components to match Stitch design tokens.

#### [MODIFY] [Button.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Button.jsx)
- Primary: `bg-primary text-on-primary` with `glow-teal` and `active:scale-95`
- Secondary: `bg-primary/10 text-primary hover:bg-primary hover:text-on-primary`
- Ghost: transparent with hover
- Add `rounded-lg` default (Stitch uses `rounded-lg` not `rounded-sm`)

#### [MODIFY] [Card.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Card.jsx)
- Default: `glass-panel rounded-2xl` matching Stitch
- Add colored top accent bar variant
- Add `hover:border-primary transition-all` interaction

#### [MODIFY] [Input.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Input.jsx)
- Match Stitch: `bg-surface-container-low border-outline-variant/20 rounded-lg`
- Focus: `border-primary ring-1 ring-primary`

#### [MODIFY] [Badge.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Badge.jsx)
- Pill style: `px-3 py-1 rounded-full text-[12px]` per Stitch skill tags

#### [MODIFY] [ProgressBar.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/ProgressBar.jsx)
- Match Stitch: `h-2 bg-surface-variant rounded-full` track, `bg-primary` fill

#### [MODIFY] [Loader.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Loader.jsx)
- Add skeleton variant for loading states

#### [MODIFY] [Toast.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Toast.jsx)
- Update colors to match Stitch palette

#### [MODIFY] [Tabs.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Tabs.jsx)
- Match Stitch tab style

#### [NEW] [Select.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Select.jsx)
- Dropdown select matching Stitch design

#### [NEW] [Modal.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Modal.jsx)
- Dialog/modal with glass overlay

#### [NEW] [Avatar.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Avatar.jsx)
- User avatar with fallback initials

#### [NEW] [Tooltip.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Tooltip.jsx)
- Hover tooltip

#### [NEW] [Skeleton.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Skeleton.jsx)
- Loading skeleton with shimmer animation

#### [NEW] [EmptyState.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/EmptyState.jsx)
- Reusable empty state with icon, title, description, and CTA

#### [NEW] [Breadcrumb.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/common/Breadcrumb.jsx)
- Navigation breadcrumb

#### [NEW] [ProgressRing.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/components/charts/ProgressRing.jsx)
- SVG circular gauge matching the Stitch readiness score widget (the large circular gauge)

---

### Phase 4: Public Pages

Rebuild the 5 public-facing pages.

#### [MODIFY] [LandingPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/public/LandingPage.jsx)
- Full rebuild to match Stitch "CareerLens - Home" screen
- Hero with gradient text, CTA buttons
- Feature grid sections
- Animated statistics
- Footer with links

#### [MODIFY] [LoginPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/public/LoginPage.jsx)
- Match Stitch design system (colors, glass panels, typography)
- Keep existing Supabase auth integration

#### [MODIFY] [RegisterPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/public/RegisterPage.jsx)
- Match Stitch design, keep auth integration

#### [MODIFY] [ForgotPasswordPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/public/ForgotPasswordPage.jsx)
- Match Stitch design

#### [MODIFY] [NotFoundPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/public/NotFoundPage.jsx)
- Match Stitch design

---

### Phase 5: Dashboard Page

The core experience — rebuild to match Stitch "Dashboard - Overview" exactly.

#### [MODIFY] [DashboardPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/DashboardPage.jsx)
- Welcome header: `font-display-lg` with personalized greeting
- Bento grid layout: 12-column grid
- **Readiness Score**: Large SVG circular gauge (col-span-5) with breakdown bars
- **Skill Gap Analysis**: 3-column grid (Current/Missing/Priority skills) (col-span-7)
- **AI Career Insights**: 3 cards (Top Role Match, Dream Company, Next Skill)
- **Curated Opportunities**: 4-column card grid with colored accent bars
- Wire to `/api/progress/dashboard`, `/api/skills/user`, `/api/recommendations`

---

### Phase 6: Feature Pages (Core)

Rebuild pages that have Stitch designs + complete remaining feature pages.

#### [MODIFY] [AssessmentPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/AssessmentPage.jsx)
- Rebuild with Stitch design system, connect to `/api/assessment`

#### [MODIFY] [RecommendationsPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/RecommendationsPage.jsx)
- Rebuild, connect to `/api/recommendations`

#### [NEW] [SkillsPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/SkillsPage.jsx)
- Match Stitch "Skill Profile" screen exactly
- Connect to `/api/skills` and `/api/skills/user`

#### [MODIFY] [RoadmapPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/RoadmapPage.jsx)
- Match Stitch "Career Roadmap" screen exactly
- Connect to `/api/roadmap`

#### [NEW] [ResourcesPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/ResourcesPage.jsx)
- Resource library with categories and filters
- Connect to `/api/resources`

#### [MODIFY] [ProjectsPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/ProjectsPage.jsx)
- Rebuild with Stitch design, connect to `/api/projects`

#### [NEW] [ProjectDetailPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/ProjectDetailPage.jsx)
- Project detail view, connect to `/api/projects/:id`

---

### Phase 7: Advanced Pages

Build the remaining dashboard pages using the Stitch design system.

#### [NEW] [ResumePage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/ResumePage.jsx)
- Match Stitch "Resume Analyzer" screen
- Connect to `/api/resume`

#### [NEW] [InterviewPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/InterviewPage.jsx)
- Interview prep with question categories
- Connect to `/api/interview`

#### [NEW] [ProgressPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/ProgressPage.jsx)
- Progress tracker with charts
- Connect to `/api/progress`

#### [NEW] [AchievementsPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/AchievementsPage.jsx)
- Achievement badges grid

#### [NEW] [InsightsPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/InsightsPage.jsx)
- Career insights with trending data
- Connect to `/api/insights`

#### [NEW] [NotificationsPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/NotificationsPage.jsx)
- Notification list
- Connect to `/api/notifications`

#### [NEW] [ProfilePage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/ProfilePage.jsx)
- User profile with edit capability
- Connect to `/api/profile`

#### [NEW] [SettingsPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/SettingsPage.jsx)
- Settings with sections
- Connect to `/api/settings`

#### [NEW] [HelpPage.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/pages/dashboard/HelpPage.jsx)
- Static FAQ/help page

---

### Phase 8: Services, Routing, Polish & Verification

#### [NEW] Service layer — `client/src/services/`
Create API service modules that wrap the `api` instance:

| File | Endpoints Covered |
|------|-------------------|
| `authService.js` | `/api/auth/*` |
| `profileService.js` | `/api/profile/*` |
| `assessmentService.js` | `/api/assessment/*` |
| `recommendationService.js` | `/api/recommendations/*` |
| `skillService.js` | `/api/skills/*` |
| `roadmapService.js` | `/api/roadmap/*` |
| `resourceService.js` | `/api/resources/*` |
| `projectService.js` | `/api/projects/*` |
| `resumeService.js` | `/api/resume/*` |
| `interviewService.js` | `/api/interview/*` |
| `progressService.js` | `/api/progress/*` |
| `notificationService.js` | `/api/notifications/*` |
| `insightService.js` | `/api/insights/*` |
| `settingsService.js` | `/api/settings/*` |

#### [MODIFY] [App.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/App.jsx)
- Remove `PlaceholderPage` component
- Add all new page lazy imports
- Add new routes: `/skills`, `/resources`, `/projects/:id`, `/resume`, `/interview`, `/progress`, `/achievements`, `/insights`, `/notifications`, `/profile`, `/settings`, `/help`

#### [MODIFY] [AuthContext.jsx](file:///c:/Users/Mayan/Projects/CareerLens/client/src/contexts/AuthContext.jsx)
- Add `signOut` function (currently missing but referenced in Sidebar)
- Add profile data fetching

#### Animations
- Add Framer Motion `AnimatePresence` for page transitions
- Sidebar open/close with spring animation
- Card mount animations (stagger)
- Button press: `active:scale-95`

#### Responsive
- Sidebar → drawer on mobile with overlay
- Mobile bottom nav bar (per Stitch)
- Bento grid → stacked on mobile
- Charts resize via container queries

---

## Verification Plan

### Automated Tests
```bash
npm run build    # Ensure production build succeeds
npm run lint     # Ensure no ESLint errors
npm run dev      # Ensure dev server starts without errors
```

### Manual Verification
- Every route renders without errors
- Navigation between all pages works seamlessly
- Responsive layouts work at 320px, 768px, 1024px, 1440px, 2560px
- Auth flow works (login, register, logout, protected routes)
- API calls fire correctly to backend endpoints
- Skeleton loading states show during data fetching
- Empty states show when no data
- 404 page renders for unknown routes
- No console errors in browser
- All Stitch-designed pages match the design screenshots
