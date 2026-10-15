# Pinnacle Baseball Academy

The website for [Pinnacle Baseball Academy](https://pinnacle-baseball.com), a private baseball training academy in Spotsylvania, Virginia. It replaces the 2023 WordPress site.

The creative direction and requirements are in [`docs/BUILD_PROMPT.md`](docs/BUILD_PROMPT.md). Everything the owner still needs to provide is in [`docs/OWNER_INPUTS.md`](docs/OWNER_INPUTS.md).

## Stack

- **Next.js 16** (App Router, Cache Components, Turbopack). All pages prerender as static HTML.
- **Tailwind CSS v4**, with brand tokens defined in `app/globals.css`.
- **Motion** for scroll-driven and interactive animation.
- **Zod** server action for lesson requests, delivered by **Resend** email and/or a webhook.
- **Vercel** hosting, Analytics and Speed Insights.

> Next.js 16 differs from older versions in places. The version-matched docs ship in `node_modules/next/dist/docs/`; see `AGENTS.md`.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional locally: without it, requests are logged to the console
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build and server |
| `npm run check` | TypeScript and ESLint |
| `npm run a11y [url]` | axe-core scan of every page at 375px and 1440px (needs a running server) |
| `npm run shots <dir> [url] [paths...]` | Full-page screenshots at 375, 768 and 1440 |
| `node scripts/scrollshots.mjs <dir> <url> <width>` | Viewport screenshots down the page, to review scroll scenes |

The screenshot and accessibility scripts use Playwright. Set `CHROME=/path/to/chrome` if Chromium isn't at `/opt/pw-browsers/chromium`.

## Editing content

All copy and facts live in typed files in `content/`. Components never hard-code business details.

| File | Contains |
| --- | --- |
| `content/site.ts` | Name, phone, address, hours, socials, navigation |
| `content/programs.ts` | The four training programs, plus upcoming camps |
| `content/coach.ts` | Chris Stowe's stats, bio, honors and quotes, plus additional staff |
| `content/alumni.ts` | Testimonials, alumni destinations, program results |
| `content/velocity.ts` | Velocity365 |
| `content/lesson.ts` | Options in the lesson request form |

A value of `null` (or an empty list) means "waiting on the owner": the block that uses it is hidden rather than shown with placeholder text. Facts come from the original site (`docs/current-site-content.md`). Don't add stats, schools or quotes that the academy hasn't confirmed.

## Lesson requests

`app/contact/actions.ts` validates every request with the same Zod schema the form uses (`lib/lesson-schema.ts`). It rejects honeypot submissions and rate-limits by IP (per instance), then delivers through:

- **Email**: set `RESEND_API_KEY`, `LESSON_TO_EMAIL` and optionally `LESSON_FROM_EMAIL` (must be on a domain verified in Resend).
- **Webhook**: set `LEAD_WEBHOOK_URL` to receive each request as JSON (n8n, Zapier, a Google Sheet).

A request succeeds if at least one channel delivers. In production with neither configured, the form tells visitors to call instead of silently dropping requests. In development, requests are logged to the console.

Analytics events: `lesson_quickstart`, `lesson_step`, `lesson_submitted` (Vercel Analytics).

## SEO

- URLs keep the old WordPress shape (trailing slashes, `/training/#indv-lessons` and the other anchors). Old WordPress endpoints redirect in `next.config.ts`.
- JSON-LD: `SportsActivityLocation`/`LocalBusiness` and `WebSite` site-wide, `Person` on Staff, a `Service` per program on Training, and breadcrumbs on every page (`lib/schema.ts`).
- `sitemap.xml`, `robots.txt`, web manifest, and per-page Open Graph images (`lib/og.tsx`).

## Design notes

- One locked dark theme. The palette comes from the logo: sky `#91b3e0` and indigo `#2a2e6b` on night navy. `fire` belongs to the Velocity365 sub-brand only.
- Type: Big Shoulders (display), Geist (body), Geist Mono (stats). The display face has a size-adjusted Arial fallback so the font swap causes no layout shift.
- Scroll-linked Motion transforms always span the full 0 to 1 input range. Motion accelerates them with ScrollTimeline, and a partial range snaps back to the base value at the end.
- Above-the-fold entrance animations are CSS (`animate-rise`, `animate-lift`), so they start at first paint rather than after hydration.
- Every animation respects `prefers-reduced-motion` (`components/hooks/useReducedMotion.ts`, which is hydration-safe).

## Deploying

1. Import the repo into Vercel (framework preset: Next.js, no build settings needed).
2. Add the environment variables from `.env.example`.
3. Point `pinnacle-baseball.com` at Vercel. Keep the old site reachable until the new one is approved.
4. After DNS cutover, submit `https://pinnacle-baseball.com/sitemap.xml` in Google Search Console and update the website link on the Google Business Profile if it changed.
