# 1064 Euro-Fish Trading Website

Premium procurement-ready website for 1064 Euro-Fish Trading.

## Implemented

- Premium homepage with buyer proof pack, product positioning, ordering process, and expanded inquiry flow.
- Milkfish fry sourcing page: `public/milkfish.html`.
- Imported flowers page: `public/flowers.html`.
- Company profile page: `public/profile.html`.
- Procurement document checklist: `public/documents.html`.
- Local inquiry dashboard: `public/admin.html` and `public/admin.js`.
- Inquiry normalization module: `api/inquiries.js`.
- Asset replacement guide: `public/assets-guide.md`.
- Firebase Hosting configuration: `firebase.json`.
- Audit report: `AUDIT.md`.

## Local preview

Because this is a static Firebase Hosting site, no build step is required.

Run the Firebase Hosting emulator with `npm run serve`, or open `public/index.html` directly in a browser.

## Launch notes

Real photos and verified accreditation details still need to be supplied by the business. The inquiry form saves local browser entries and attempts to submit to the API path; a real backend must be connected before relying on centralized lead capture.
