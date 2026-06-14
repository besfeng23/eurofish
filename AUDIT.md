# Eurofish live-site audit

Audit date: 2026-06-14

Live URL reviewed: https://eurofish.web.app

## Executive verdict

The current site has a useful content foundation: it clearly states the business as a BFAR/BPI-accredited importer, explains the two core lines of business, and exposes direct contact channels. The problem is not that the site is empty. The problem is trust architecture: some claims sound big but are not supported on-page, several metrics render as `0`, the navigation is inconsistent, and the public tone sometimes creates unnecessary legal/commercial risk.

The code in this repository replaces the fragile-looking landing page with a cleaner static Firebase-ready site focused on credibility, inquiry conversion, compliance language, and mobile usability.

## What was working

- Clear business category: aquaculture plus imported flowers.
- Strong hero position: accredited importer and supply-chain partner.
- Direct contact details are visible.
- The page has a logical section structure: home, milkfish fry, flowers, company profile, contact.

## Critical issues found

### 1. Broken or misleading proof metrics

The live page displays `0` for “Fry Imported Annually” and `0` for “Luzon Market Share.” That destroys credibility. A buyer will not think “data loading issue.” They will think the company is either careless or exaggerating.

Fix applied:
- Removed fake/empty counters.
- Replaced them with trust cards focused on real operational strengths: direct inquiry, compliance-first process, cold-chain handoff, and document readiness.

### 2. Risky claims without on-page evidence

The live copy claims “Entry No. 1 on the NCR List of BFAR-Accredited Commercial Importers,” “Regulatory Oligopoly,” and estimated market control. Those may be true internally, but without a document link or date, they are dangerous on a public sales page.

Fix applied:
- Reduced risky dominance language.
- Preserved the compliance positioning.
- Added “documentation available upon request” style language that is stronger for procurement and safer legally.

### 3. Stale accreditation wording

The page says accreditation was secured in 2025 and also says © 2026. That is a trust gap. If the business is currently accredited, the page should say current. If the latest available documents are from 2025, say that plainly.

Fix applied:
- Reworded the compliance area to avoid implying an unverified active 2026 accreditation.
- Added a reminder in README to update status after latest BFAR/BPI verification.

### 4. Navigation inconsistency

The live page uses both “Company Profile” and “About Us” for the same section. Small mismatch, but it signals low polish.

Fix applied:
- Standardized the navigation labels.
- Added accessible mobile navigation with `aria-expanded`.

### 5. Generic inquiry flow

The current form fields appear visually, but there is no obvious backend or submission handling.

Fix applied:
- Added a no-backend mailto inquiry flow.
- The form creates a structured inquiry email to `joevyrosario@gmail.com`.
- Added direct Viber/phone and email CTAs for buyers who do not want to fill out a form.

### 6. Accessibility and mobile polish

The live page has semantic content, but a production business site needs visible focus states, strong contrast, real labels, accessible buttons, and reduced-motion handling.

Fix applied:
- Added semantic landmarks and skip link.
- Added visible focus states.
- Added responsive layout and touch-friendly controls.
- Added reduced-motion CSS handling.
- Added proper labels and autocomplete hints.

## Recommended next improvements

1. Add scanned/linked BFAR and BPI accreditation documents or at least document numbers and validity dates.
2. Add a downloadable PDF company profile for buyers and government/procurement partners.
3. Add real product availability logic: “Available now,” “Next shipment,” “Pre-order.”
4. Add backend inquiry capture using Firebase Functions, Firestore, or a form provider.
5. Add real photos from operations, packing, cold-chain handoff, fry handling, and flower inventory.
6. Add Search Console and Analytics after deployment.
7. Replace public Gmail with a domain email such as `sales@eurofish.ph` once a domain is secured.
