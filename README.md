# Sushi Pilates

A mobile-first Pilates brand and inquiry website for Kathmandu. Built with Next.js 16.3.6 (App Router), React, TypeScript, Tailwind CSS 4, Lucide, next/image, and next/font. No CMS, UI framework runtime, database, or analytics vendor is required.

## Run

```sh
npm install
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm start
```

Google fonts are downloaded at build time and self-hosted by Next.js. The build needs access to Google Fonts. `npm run dev` serves http://localhost:3000 (or the next available port).

## Routes

- `/` — introduction, benefits, instructor, classes, trial CTA, social placeholders
- `/about` — instructor and teaching approach
- `/classes` — class interest cards, availability, FAQ
- `/contact?class=beginner|group|private` — inquiry form with preselected class
- `/privacy`, `/terms` — clearly labeled draft notices
- `POST /api/leads` — JSON validation and demonstration submission
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image` — search and sharing assets

## Edit content

| File | Purpose |
| --- | --- |
| `config/site.ts` | Name, location, CTA, phone, email, WhatsApp, instructor biography and image paths |
| `data/classes.ts` | Typed classes: descriptions, level, duration, schedule, availability, optional price |
| `data/socials.ts` | TikTok, Instagram, Facebook, YouTube URLs, social cards, real testimonials |
| `public/images/` | Five original local SVG illustrations, intentionally used as photographic placeholders |
| `app/globals.css` | Shared color, spacing, radius, typography tokens and responsive layout |
| `app/layout.tsx` | DM Sans and Cormorant Garamond via next/font, shared shell |

Replace the hero and instructor assets with genuine, consented photography by adding files under `public/images` and changing paths and alt text in `config/site.ts`. Class and social image paths live in their data files. The instructor image is deliberately botanical, not an invented portrait. Remove portrait “coming soon” captions in the home/about pages when replacing it. Add verified biography details to `site.instructor.journey`; no qualifications have been invented.

Empty social URLs and contact details do not generate fake links. Set `site.whatsapp` to the real international number using digits only to enable the prominent WhatsApp action on Contact. Add approved testimonials to the empty array to render the reusable section.

## Form contract and development mode

**This version never saves or sends inquiries.** The form explicitly requests sample details. A valid submission returns `200 { ok: true, mode: "demo", message: "...not saved or sent..." }`. This is validation success, not booking success. No personal information is logged or included in analytics.

Flow: `LeadForm` → `features/leads/client.ts` → `POST /api/leads` → shared schema validation → `features/leads/service.ts` → visible result.

The JSON payload has `name`, `phone`, `email`, `contactMethod`, `experience`, `classId`, `preferredTime`, and `message`. Options are exported from `features/leads/schema.ts`. The API validates independently of the browser, limits body size to 16 KiB, and returns 400 for malformed JSON, 415 for wrong media type, 422 with field errors for invalid values, 413 for oversized requests, and 503 for unexpected processing failures. The client preserves input on network failure and times out after 15 seconds.

To enable live leads:

1. Replace `submitLead` with durable persistence and optional email/CRM notification. Only return `mode: "live"` after durable acceptance; propagate service failures.
2. Update the form’s preview notice, submission label, and confirmation text together. No reservation should be described as confirmed until it is actually agreed.
3. Add deployment-appropriate rate limiting/abuse protection and an idempotency strategy for live writes. No process-memory rate limiter is presented as reliable across serverless instances.
4. Complete the privacy and terms notices, retention policy, business contacts, real class details, and required consent with the business owner.
5. Add integration tests for the chosen persistence provider, notifications, duplicate retries, and failures.

The small feature/service boundary can serve future native clients through the same versioned API. No future user/payment/membership entities have been implemented.

## SEO and publishing

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real public origin when ready to index. Without it, the site explicitly disallows indexing and returns an empty sitemap to avoid inventing a domain. With it, canonical URLs, sitemap URLs, Open Graph URLs, and local business JSON-LD use that origin. Privacy/terms placeholders remain noindex. JSON-LD uses only the supplied city/country, with no invented street address, hours, reviews, or prices.

The generated Open Graph image contains the supplied cover artwork and location. Responsive local images reserve layout space; the hero preloads and below-the-fold images lazy-load. Content pages are server components; JavaScript is limited to navigation, form behavior, and analytics hooks. No third-party embeds load.

## Analytics

`lib/analytics.ts` exports `track` and `setAnalyticsAdapter`. No provider or cookie is active. Connect a consent-aware adapter once requirements are established. Events cover page views, trial/contact/social clicks, class interest, form starts, true submissions, and a separate `form_demo` event. Only non-personal context is passed.

## Scope

V1 is a brand and lead-inquiry website. Accounts, payments, subscriptions, scheduling, videos, dashboards, and mobile clients are intentionally deferred. Shared UI lives in `components`, business logic in `features`, editorial configuration in `config`/`data`, utilities in `lib`, and routing in `app`.

## Verification completed

- ESLint, TypeScript, and optimized production build pass.
- All six pages checked at 360, 390, 768, 1024, and 1440px: no horizontal overflow, missing form labels, missing image alt attributes, broken images, duplicate H1s, or framework error overlays.
- Desktop, tablet, and mobile screenshots inspected; mobile menu opens, navigates, and closes on Escape with focus restored.
- Class links preselect the correct inquiry option. Required fields and conditional email validation focus the first invalid field.
- Valid sample submission reaches the API and renders the explicit demo result. Loading disables the submit button. Simulated network failure preserves form values and supports a successful retry.
- API checked for valid requests (200), invalid fields (422), malformed JSON (400), wrong content type (415), and oversized bodies (413).
- Metadata verified on all pages: branded title, description, canonical URL, Open Graph image, Twitter card, and preview noindex. Sitemap, robots, OG image, icons, and custom 404 respond correctly.
- No browser JavaScript errors observed. These are functional checks, not a claim of measured production Core Web Vitals or a full accessibility audit.

## Brand artwork

The supplied artwork lives at `public/images/logo.png` and `public/images/cover.png`.
`site.brand` in `config/site.ts` is the shared source for these paths. `components/brand.tsx`
renders the logo in the global header/footer and the complete 3:1 cover on Home and About.
The original images are preserved; next/image provides appropriately sized web variants.
The browser icon, Apple home-screen icon, and Open Graph image are rendered from these
same originals at build time. Replacing the files and rebuilding updates all placements.
