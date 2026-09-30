# Almousawi Trading Co. LLC Homepage

## Original problem statement
Design and build a premium, innovative, client-facing homepage for Almousawi Trading Co. LLC, established 1974, a UAE-based engineering and industrial solutions company. The homepage must feel high-end, technically sophisticated, trustworthy, established, engineering-focused, and visually memorable, with the Almousawi logo/eagle motif, royal/electric blue and cyan visual language, custom engineering hero, heritage, industries, capabilities, ecosystem, projects, partners, contact CTA, footer, responsive behavior, and restrained premium motion.

## Architecture decisions
- React single-page marketing site with anchored sections and reusable interaction patterns.
- FastAPI `/api/contact` endpoint persists enquiries in MongoDB using the existing environment configuration.
- External image URLs are used for selected industrial project imagery and the two provided brand assets are used directly.
- CSS motion layer includes reduced-motion support, blueprint grid movement, wave drift, node pulses, entrance reveals, and interaction transitions.

## Implemented
- Premium sticky navigation with mobile menu and Partners/Careers anchors.
- Full logo treatment using the uploaded Almousawi logo and uploaded blue wave visual.
- Animated engineering hero with blueprint grid, energy wave composition, coordinates, trust metrics, and high-contrast CTAs.
- Heritage timeline, industry rail, interactive capability tabs, seven-stage engineering ecosystem visualization, projects, partners, CTA, and detailed footer.
- Contact modal with valid/invalid submission handling, success state, error toast, and responsive form.
- Responsive layout verified at desktop and 390px mobile widths with no horizontal overflow.
- Larger typography scale across navigation, body copy, industry cards, capability details, project cards, and footer.
- Verified client showcase using official marks sourced from Almousawi's public client page, with category labels and hover color reveal.
- Three immersive case-study modals with sourced imagery, outcomes, systems involved, close controls, and contact CTA handoff.
- Current-site relationship panels for ADNOC, TotalEnergies, Borouge, Dubai Airports, and Petrofac with category context, support explanation, and official source links.
- Scroll-linked case-study stage diagrams with desktop and mobile scroll depth, animated rings, stage activation, and engineering lifecycle storytelling.
- Premium density/motion pass with tighter section rhythm, technical overlays, 3D perspective hover motion, orbit animations, animated grids, project affordances, and layered section surfaces.
- Animated UAE-to-global coverage section with sector switching for Oil & Gas, Marine, Power, and Industrial, plus globe routes, HQ node, global supplier network label, and current-site service context.
- Hero film-style engineering layer built as a reliable CSS motion treatment over sourced industrial imagery after the external MP4 host returned 403; no broken media requests remain.

## Prioritized backlog
- P0: None.
- P1: Connect enquiry notifications to the company email workflow.
- P1: Replace prototype project imagery and partner wordmarks with approved company assets.
- P2: Add dedicated URL-based case-study detail pages behind the current immersive modal views.
