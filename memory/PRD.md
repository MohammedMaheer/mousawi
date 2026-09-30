# Almousawi Trading Co. LLC — Homepage

## Original problem statement
Premium, innovative, client-facing homepage for Almousawi Trading Co. LLC (est. 1974, UAE engineering/industrial solutions). Royal blue/cyan/white/navy identity, custom hero, heritage, industries, solutions, engineering ecosystem, why-us, projects, partners sections, working contact form. Must not look AI-generated or template-based.

## Architecture
- React 19 + CRA frontend (`/app/frontend`), FastAPI backend (`/app/backend`), MongoDB via MONGO_URL.
- `App.js` — single-page structure (header, hero, heritage, industries, capabilities, ecosystem, projects, partners, CTA, coverage, footer, modals).
- `Globe.js` — Three.js interactive coverage globe (dot-matrix sphere, graticule, HQ→territory arcs with travelling pulses, drag-rotate, raycast node picking, HTML label overlay synced to selection).
- CSS layered files: AppFixed, AppEnhancements, AppPolish, AppUltra, AppGlobe, AppFilm, AppCaseFix, AppTerritory (latest, ecosystem + globe + hero wave overrides).
- Backend: `POST /api/contact` (save enquiry), `GET /api/contact`, `GET /api/` health.

## User personas
- Industrial client decision-makers (energy, marine, infrastructure) in the UAE evaluating an engineering partner.

## Implemented (latest first)
- 2026-09-30: Three.js 3D globe in Coverage section — verified locations (Abu Dhabi HQ, Ruwais/Al Dhafra, Dubai, Sharjah & N. Emirates, Offshore/Arabian Gulf) plotted from real lat/lng with cartographic spread amplification for readability; selectable nodes (globe click, label click, or list) sync with a capability detail panel that links into case-study modals; drag-to-rotate + auto-rotate; node labels hide on far side.
- 2026-09-30: Ecosystem section redesigned — 7 stages (Client requirement → Lifecycle support) with consistent Lucide line icons, descriptions, connected glowing spine, control-room image card, sticky intro; dense premium layout.
- 2026-09-30: Hero reference wave image replaced with pure SVG/CSS wave strokes in brand colours (#234dbf/#155cff/#46dce5/#3f7cff) — no embedded theme picture.
- 2026-09-30: Mobile fixes — hero crosshair/coordinates hidden ≤900px; coverage grid min-content overflow fixed (min-width:0 + width:100%/max-width on globe stage).
- Earlier: full homepage (hero film layer fallback, capability tabs, case-study scroll-story modals, partner logo panels, contact form with success state + MongoDB save, real client logos).

## Known notes
- Hero video MP4 was never used (external URLs 403); CSS/SVG film + wave layer is the intended visual.
- Node positions on globe are geographically real but spacing-amplified for legibility.

## Backlog
- P1: Premium hero video layer (needs a reliable hosted industrial MP4 or uploaded asset).
- P2: Consolidate layered CSS files; split App.js into components.
- P2: Real case-study content/images from the client.

## Test credentials
None — public site, contact form is unauthenticated.
