# 1064 Euro-Fish Trading Website

A clean, fast, mobile-first marketing site for 1064 Euro-Fish Trading: aquaculture imports, ornamental flowers, cold-chain logistics, compliance profile, and direct inquiry capture.

## What this repo contains

- `public/index.html` — production-ready static landing page
- `public/styles.css` — responsive premium visual system
- `public/main.js` — mobile navigation, inquiry mailto workflow, copy-to-clipboard, reveal animation
- `public/site.webmanifest` — basic PWA metadata
- `public/robots.txt` — crawl guidance
- `firebase.json` — Firebase Hosting configuration
- `.firebaserc` — default Firebase project alias
- `AUDIT.md` — live-site audit and improvement plan

## Local preview

Because this is a static Firebase Hosting site, no build step is required.

```bash
npm run serve
```

Or open `public/index.html` directly in a browser.

## Deploy

```bash
npm run deploy
```

## Notes before going live

The live site had strong business positioning, but some copy used claims that should be backed by documents before publication. This repo keeps the accreditation and compliance posture, but makes the language cleaner and less legally risky. Update the accreditation year/status after verifying the latest BFAR/BPI documents.
