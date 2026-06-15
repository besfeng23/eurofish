# 1064 Euro-Fish Trades Production Launch Runbook

This runbook defines the minimum launch checklist for the Euro-Fish Trades buyer website.

## 1. Deployment verification

- Production URL: https://eurofishtrades.vercel.app/
- Production branch: `main`
- Confirm Vercel production deployment uses the latest GitHub commit.
- View page source and search for:
  - `1064 Euro-Fish Trading`
  - `Replace with`
  - `Add current validity`
  - `Inquiry dashboard`
  - `Admin shell`
- All of the above should return zero public matches.

## 2. Brand and contact verification

- Brand must be exactly: `1064 Euro-Fish Trades`.
- Phone/Viber must be monitored before launch.
- Replace Gmail with domain email when DNS/email hosting is ready.
- Recommended public email aliases:
  - `sales@eurofishtrades.com`
  - `inquiries@eurofishtrades.com`
  - `joevy@eurofishtrades.com`

## 3. Lead capture verification

Before launch, test these paths on mobile and desktop:

- Request fry availability.
- Request flower catalog.
- Request buyer documents.
- Sticky quote CTA.
- Phone tap.
- Email fallback.
- Form fields: company, buyer type, interest, quantity, urgency, target date, destination, message.

Minimum accepted result:

- Inquiry is saved locally.
- Email fallback opens with complete inquiry details.
- If backend is connected, inquiry also reaches the chosen database/CRM.

## 4. Backend launch target

Recommended minimum backend before serious paid traffic:

- Lead database: Supabase, Airtable, Firebase, or CRM.
- Email notification to Euro-Fish.
- Buyer auto-reply confirming receipt.
- Spam protection.
- Lead statuses:
  - New
  - Contacted
  - Quoted
  - Waiting for buyer
  - Closed
  - Spam

## 5. SEO launch checklist

- Sitemap must use the production domain: `https://eurofishtrades.vercel.app/sitemap.xml` or final custom domain.
- Submit sitemap to Google Search Console.
- Install Vercel Analytics, GA4, or Plausible.
- Track:
  - form submit
  - phone click
  - email click
  - document request
  - company profile click
  - buyer path button click

## 6. Trust and proof checklist

Do not publish unsupported claims. Avoid:

- No. 1
- largest
- leading
- exclusive
- guaranteed stock
- guaranteed availability

Proof assets to prepare:

- Real product/handling photos.
- Principal or team photo.
- Office or coordination desk photo.
- Redacted business documents.
- Redacted BFAR/BPI-related proof if applicable.
- Sample quotation or document checklist.

## 7. Public route review

Verify these routes are public and buyer-ready:

- `/`
- `/company-profile/`
- `/procurement-documents/`
- `/trust-center.html`
- `/buyer-seo-index.html`
- `/milkfish-fry-importer-philippines/`
- `/milkfish-fry-supplier-philippines.html`
- `/bangus-fry-supplier-luzon.html`
- `/aquaculture-procurement-philippines.html`
- `/imported-flowers-philippines/`
- `/imported-flowers-supplier-philippines.html`
- `/wholesale-flowers-metro-manila.html`
- `/flower-importer-philippines.html`

Protect, remove, or redirect:

- `/admin`
- `/admin/`
- `/admin.html`

## 8. Go/no-go decision

### Go

Launch only if:

- Live deployment is current.
- No public placeholders remain.
- Contact details are monitored.
- Inquiry fallback works.
- Sitemap is correct.
- Admin/internal pages are not exposed.

### No-go

Do not launch paid outreach or ads if:

- The site still shows old brand names.
- Public placeholders remain.
- Form or email fallback fails.
- Admin pages are publicly linked.
- Document claims are unsupported or unredacted.
