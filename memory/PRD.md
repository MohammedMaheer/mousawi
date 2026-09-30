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

## Prioritized backlog
- P0: None.
- P1: Connect enquiry notifications to the company email workflow.
- P1: Replace prototype project imagery and partner wordmarks with approved company assets.
- P2: Add dedicated case-study detail pages behind the project cards.
