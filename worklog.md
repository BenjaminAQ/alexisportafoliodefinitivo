# Worklog — Alexis Academic Portfolio

Project: Single-page Next.js 16 academic portfolio for Alexis (civil / structural / earthquake engineer).
Constraint: Only `/` route is user-visible. All 13 sections render as anchored sections in one page.
Palette: #00BBD4 (cyan), #5DD6E6 (light cyan), #334E68 (dark blue-gray), #F5FAFF (surface), #98A6B3 (muted), #FFFFFF.
Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code).

---
Task ID: 0
Agent: orchestrator
Task: Bootstrap plan and design system foundation.

Work Log:
- Read full mega-prompt (807 lines) defining the 13 sections and exact content.
- Inspected existing Next.js project: shadcn/ui available, framer-motion, next-themes, react-syntax-highlighter installed.
- Started dev server on port 3000 (PID 1235).
- Decided architecture: single-page app, sections reached by anchor links + smooth scroll. Detail views via Dialog/modal.

Stage Summary:
- All 13 sections will live in src/app/page.tsx composed from section components under src/components/sections.
- Data files will live under src/data/*.ts (typed).
- Design tokens added to globals.css under :root using the exact brand palette.

---
Task ID: 1
Agent: orchestrator
Task: Build and verify the complete Alexis academic portfolio (13 sections).

Work Log:
- Installed design system in globals.css: brand palette (#00BBD4/#5DD6E6/#334E68/#F5FAFF/#98A6B3), light/dark themes, Space Grotesk + Inter + JetBrains Mono fonts, wire-mesh + glow + animation utilities.
- Built core components: Navbar (sticky, backdrop-blur, scroll-spy, mobile drawer, theme toggle), Footer (sticky via mt-auto, sitemap, social icons, copyright), Section primitives, LevelBadge/TechTag/Pill, custom PortfolioIcon set (30+ SVG icons).
- Wrote all content data in src/data/content.ts: 7 expertise areas, 11 projects, 8 tool categories, 12 resource categories, 12 mini-courses, 12 library docs, 11 forum categories, CV sections, contact links.
- Built 13 sections: Hero (animated wire-mesh, 4 CTAs, 4 featured cards), About (mandatory bio + stats), Expertise (7 expandable accordion cards), Projects (filter + detail dialog with all 11 structured fields), Tools (8 categories + modern table + file chips), Resources (search + category/type filters + 12 cards), Courses (12 cards with progress bars + expandable lessons), Library (6 required filters: area/level/type/software/language/date), Forum (11 categories + composer + voting), Teaching (6 cards + sample notes), Research (5 topics + 6 categories), CV (10 sections + 2 download buttons), Contact (5 channels + functional form with sonner toast).
- Verified end-to-end with Agent Browser: HTTP 200, all 13 sections render, 173 interactive buttons, project modal opens, contact form validates + submits + shows success toast, resource filters work, expertise accordion expands, mobile drawer opens with all nav items, sticky footer at bottom with copyright. VLM analysis confirmed polished academic visual design with no layout issues. ESLint passes with zero errors.

Stage Summary:
- Single-page portfolio at / with smooth-scroll anchor navigation across 13 sections.
- All content from the mega-prompt preserved verbatim (hero subtitle, about bio, area descriptions, project abstracts, open-resources statement, teaching philosophy, footer statement).
- Palette and typography strictly follow the brief; no indigo/blue, no sales language, no prices.
- Responsive at 375/768/1440px; sticky footer; reduced-motion respected; skip-link a11y.
- Dev server runs on port 3000 via `node node_modules/next/dist/bin/next dev -p 3000`.

---
Task ID: 2
Agent: orchestrator
Task: Rebuild portfolio with Firebase backend + admin panel (content empty by default, admin-editable).

Work Log:
- Installed firebase@12.16.0 package.
- Created lib/firebase.ts — initializes Firebase app/auth/firestore from NEXT_PUBLIC_FIREBASE_* env vars. Exports isFirebaseConfigured flag; null when not configured.
- Created lib/store.ts — data store abstraction: uses Firestore when configured, localStorage fallback otherwise. API: getSection, setSection, subscribeToSection (live updates via onSnapshot or custom events).
- Created lib/auth.ts — Google auth with @gmail.com restriction. Firebase popup when configured; signInWithEmail mock when not. Both store session (Firebase auth state or localStorage).
- Created lib/content-types.ts — typed SectionData for all 8 editable sections (about, expertise, projects, resources, library, teaching, cv, contact) with DEFAULT_HEADERS and emptySectionData().
- Created components/admin/auth-provider.tsx — React context wrapping auth state (user, loading, signIn, signInWithEmail, signOut).
- Created components/admin/use-section-data.ts — useSectionData hook that loads + subscribes to section data.
- Created components/admin/dynamic-header.tsx — shared DynamicSectionHeader + SectionSkeleton components.
- Created components/admin/empty-state.tsx — "No content yet" empty state with admin CTA.
- Created components/admin/field-schemas.ts — declarative schema for each section's editable fields (text, textarea, stringList, objectList, header types).
- Created components/admin/field-editor.tsx — generic recursive field renderer handling all field types (inputs, textareas, string lists with add/remove, object lists with cards + reorder + delete, nested object lists for project detail sections).
- Created components/admin/section-editor.tsx — loads section data, renders fields via schema, sticky save bar with unsaved indicator, save/reset buttons, toast feedback.
- Created app/admin/page.tsx — full admin panel: login screen (Google popup if Firebase configured, Gmail input if preview mode), dashboard with section sidebar nav, backend status indicator, section editor.
- Deleted 4 section files: forum.tsx, tools.tsx, courses.tsx, research.tsx.
- Rewrote 8 section components (about, expertise, projects, resources, library, teaching, cv, contact) to read from Firestore via useSectionData hook, show header + dynamic content or EmptyState.
- Simplified hero.tsx — kept hero text + CTAs, removed pre-created featured cards and stats.
- Updated NAV_ITEMS (9 items), footer sitemap (3 columns + admin link), page.tsx (removed 4 sections).
- Created .env.local.example with Firebase config template.
- Updated next.config.ts with allowedDevOrigins for preview proxy.
- Wrapped app in AuthProvider in layout.tsx.
- Verified end-to-end with Agent Browser: public page shows 10 sections with 8 empty states; admin login via Gmail input works; bio edit + save shows "Section saved" toast; expertise area add + save works; public page reflects saved content (bio + area visible, empty states reduced from 8 to 6). ESLint passes with zero errors.

Stage Summary:
- Architecture: Next.js 16 + Firebase (client SDK) + Firestore (or localStorage fallback for preview).
- Public page (/) — 9 sections, all empty by default, content loaded from store.
- Admin panel (/admin) — Gmail-only auth, generic schema-driven editor for all 8 sections, live preview on public page after save.
- To enable real Firebase: copy .env.local.example to .env.local, fill in credentials, deploy Firestore security rules (read: all, write: authenticated).
- Preview mode works fully without Firebase creds (data in browser localStorage).

---
Task ID: 3
Agent: orchestrator
Task: Configure real Firebase + whitelist auth + Storage uploads + circular profile image on Home.

Work Log:
- Created .env.local with real Firebase credentials (project: alexisportafolio-8d4a7).
- Updated lib/firebase.ts to also initialize Firebase Storage.
- Rewrote lib/auth.ts with Firestore-based whitelist:
  - After Google sign-in, reads users/{uid} document for role.
  - If doc doesn't exist, auto-creates with role "pending" (so admin can promote later).
  - Only role "admin" granted access; "usuario" and "pending" denied with clear message.
  - Added AccessDeniedError class for clean error handling.
- Updated components/admin/auth-provider.tsx to async-check role via onAuthStateChanged + fetchUserRole; clears user if not admin.
- Created lib/storage.ts with uploadFile() helper: uploads to Firebase Storage (images/ or files/ folder) when configured, data-URL fallback for preview. Includes deleteFile().
- Added "image" and "file" field types to field-schemas.ts.
- Added "home" section to content-types.ts (HomeData: eyebrow, title with {accent} markup, subtitle, profileImage, profileName, profileRole, ctaButtons) + emptySectionData + DEFAULT_HEADERS.
- Added "home" section schema to field-schemas.ts with image field for circular profile photo.
- Updated field-editor.tsx with ImageField (circular preview, upload to Storage, progress bar, replace/remove) and FileField (file upload, link preview, remove). Both pass uid for storage path. Updated ObjectListField and FieldRenderer to thread uid through.
- Updated section-editor.tsx to pass user.uid to FieldRenderer (needed for storage upload paths).
- Rewrote hero.tsx to load HomeData from Firestore: 2-column layout (text + circular profile image), {accent} markup parsing for gradient highlights, CTA buttons from data, circular image with glow ring + name badge. Falls back to letter "A" placeholder when no image.
- Created firestore.rules: users collection (read for authenticated, self-create pending, admin-only update), sections collection (public read, admin-only write), isAdmin() helper.
- Created storage.rules: images/ and files/ folders (public read, admin-only write via Firestore role lookup), isAdmin() helper using firestore.get().
- Verified with Agent Browser: hero shows circular image placeholder with "A" + "Alexis" + "CIVIL ENGINEER" badge; admin login shows "Sign in with Google" + green "Connected to Firebase" indicator. ESLint passes (0 errors).

Stage Summary:
- Firebase fully configured with real credentials (auth + firestore + storage).
- Whitelist system: first Google login creates "pending" user doc; only "admin" role can access panel; "usuario"/"pending" denied.
- Admin can upload images (5MB) and files (25MB) to Firebase Storage via the field editor.
- Home section now has a circular profile image (editable in admin → Home → Profile image).
- Security rules provided in firestore.rules and storage.rules (copy-paste ready).
- To make yourself admin: sign in once (creates pending doc), then in Firebase Console → Firestore → users/{your-uid} → change role from "pending" to "admin".

---
Task ID: 4
Agent: orchestrator
Task: Fix Next.js errors + blank page (sections stuck loading forever).

Work Log:
- Root cause: Firestore calls (getDoc/onSnapshot) were throwing "permission-denied" errors because the security rules weren't published yet in Firebase Console. These errors were unhandled, so the loading promises never resolved and sections stayed on the skeleton state forever.
- Secondary cause: "Component auth has not been registered yet" — the firebase/auth module wasn't properly initialized when getAuth() was called via require() (Turbopack doesn't support require for ESM Firebase SDK).
- Fix 1: Rewrote lib/firebase.ts to use static imports (import { getAuth } etc.) instead of require(), so components register properly. Lazy singleton init on client only; null on server.
- Fix 2: Rewrote lib/store.ts with comprehensive error handling — every Firestore call (getDoc, setDoc, onSnapshot) is wrapped in try/catch. On error, falls back to localStorage (or empty data) so the page always renders.
- Fix 3: Rewrote components/admin/use-section-data.ts with an 8-second timeout via Promise.race. If Firestore doesn't respond (network/rules), resolves with empty data instead of staying on loading=true forever. Also catches all errors and falls back to emptySectionData.
- Fix 4: Updated lib/auth.ts, lib/storage.ts, components/admin/auth-provider.tsx to use getAuthInstance()/getDb()/getStorageInstance() getters (and async variants) instead of static exports, so Firebase services initialize correctly on the client.
- Verified with Agent Browser: public page renders hero with H1 + circular image + 10 sections + 8 empty states + 0 stuck skeletons; admin page shows "Sign in with Google" + "Connected to Firebase"; 0 fresh console errors after clearing; ESLint passes (0 errors).

Stage Summary:
- Page now renders reliably even when Firestore rules aren't published or Firebase is unreachable.
- All Firestore errors are caught and logged as warnings (console.warn), never crashing the UI.
- The remaining "permission-denied" warnings in console will disappear once the Firestore security rules (provided in firestore.rules) are published in Firebase Console.
- To fully fix: copy firestore.rules content into Firebase Console → Firestore → Rules → Publish.
