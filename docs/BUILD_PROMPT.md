# Pinnacle Baseball: Rebuild Brief

> **How to use this:** This is the master prompt for rebuilding pinnacle-baseball.com. Every coding session works from it. The verbatim content of the current site is in `docs/current-site-content.md`, and that file is the source of truth for facts. Do not invent stats, names, colleges, prices or quotes. Anything marked **[NEEDS INPUT]** waits on the owner.

---

## 0. Role and goal

You're a senior creative developer and a brand designer on the same project, building at Awwwards/FWA level. You're rebuilding the website for **Pinnacle Baseball Academy**, a private baseball training academy in Spotsylvania, Virginia, founded in 2013 by Chris Stowe, a former first-round MLB draft pick.

The current site is a 2023 WordPress template ("Baseball Club Pro"). It has the template's red accent, stretched 768px images, a copyright stuck on 2023, success-story cards that link to `#`, and a lead form that only asks for name and phone. The academy's story is far stronger than the site makes it look.

**The goal is a site that does two things at once:**
1. **Wins awards.** It should have a distinctive visual idea, cinematic motion and finish in every detail. It should never look like a template.
2. **Converts parents.** A parent on a phone in a parking lot should go from "who is this?" to "lesson requested" in under 60 seconds.

If those two goals conflict, conversion wins. Motion supports the story. It never gets between a parent and the Book button.

---

## 1. The creative concept: "Find Your Peak"

The whole site rests on one line Chris already wrote:

> *"I believe every player has a peak ability, unfortunately most players never find it. My job will always be to place the players that I work with on the right path, so they can find their true ability and peak."*

The name is **Pinnacle**, and the promise is **your peak**. Every design decision comes back to the idea of **ascent**: a path that climbs, numbers that climb, a player who climbs from 8U lessons to a college roster.

**Visual metaphor: the tunnel.** The facility photo (`850_5988.jpg`) is a one-point-perspective shot down a batting tunnel. The pitching mound sits in the foreground and the Pinnacle logo hangs at the vanishing point. That photo is the brand: the work happens in the tunnel, and the peak sits at the end of it. The hero is built around it.

**Tone of voice:** Confident, direct, coach-like and warm. Short sentences. Talk to parents and players, not to "clients". Keep Chris's "EVERY player has something to GAIN" energy, but don't use all caps in body copy.

---

## 2. Brand system

### Color
The real brand comes from the logo and the facility, **not** the template red. Define these as CSS custom properties / Tailwind tokens:

| Token | Hex | Use |
|---|---|---|
| `--navy-950` | `#000c20` | Deepest backgrounds, Velocity365 base |
| `--navy-900` | `#001840` | Primary brand navy (from the logo) |
| `--carolina` | `#4b9cd3` | Brand accent (logo fill), links, highlights |
| `--carolina-200` | `#bcdcf0` | Tints, hover states |
| `--chalk` | `#f6f5f0` | Light backgrounds (foul-line chalk, warmer than white) |
| `--clay` | `#b5452c` | Hot accent, used sparingly: infield clay from the mound turf, ties to the Velocity365 fire |
| `--turf` | `#1f5a3d` | Rare deep accent from the facility turf |
| `--ink` | `#0b0f17` | Body text on light |

Check every text/background pair against WCAG 2.2 AA (4.5:1 body, 3:1 large). Carolina on chalk fails for body text, so use it only for large display text or decoration.

### Typography
- **Display:** a condensed athletic face with varsity character that echoes the arched serif "PINNACLE" logo without copying it. Shortlist: *Big Shoulders Display*, *Saira Extra Condensed*, *Bebas Neue Pro*-like alternatives. Pick one and set it huge (clamp up to about 14vw) with tight tracking.
- **Body:** a clean, highly legible grotesk. Shortlist: *Manrope*, *Inter Tight*, *Geist*.
- **Numerals and stats:** a tabular mono or scoreboard face (*JetBrains Mono*, *IBM Plex Mono* or *Geist Mono*) for every stat line, counter and the baseball card.
- Self-host through `next/font`. Load at most 2 families plus 1 mono. No FOUT, no layout shift.

### Texture and detail language
- Stitch lines: a subtle red-stitch SVG motif from a baseball's seams, used as section dividers and on hover underlines.
- Chalk lines: thin foul-line rules and batter's-box corner marks framing images.
- Grain: a very light film-grain overlay on dark sections, for an analog stadium feel.
- Scoreboard: stats render in a scoreboard / back-of-baseball-card style.
- Logo: use the existing logo (`PBA1.png` and `PBA2.png`). **[NEEDS INPUT]** an SVG or high-res vector of the logo. If none exists, do a careful vector trace of the home-plate "P" mark for the favicon and nav.

### Sub-brand: Velocity365
Velocity365 has its own logo: a black background, a fire-trailed speedometer, a red pitcher, the tagline "Build. Maintain. Develop." It gets its **own dark, high-energy section and page** (navy-950 and black, clay/fire accent, Carolina gauge). It should feel like stepping into a performance lab, but it stays clearly part of the Pinnacle family.

---

## 3. Signature moments (the award-winning layer)

Build these five carefully. Everything else stays clean and fast.

1. **Hero: "Down the Tunnel."** The tunnel photo fills the screen. On scroll, the camera pushes in toward the Pinnacle logo at the vanishing point (scale plus a slight parallax between layers if the photo is split into foreground mound, netting and back wall). The headline **"Find your peak."** reveals line by line, with a subhead of the academy's one-line pitch and two CTAs: **Book a Lesson** (primary) and **See Programs**. If the owner supplies video, a muted looping clip of a bullpen session replaces the still. With reduced motion: a static image, no push-in.

2. **The Proof Bar: "The Climb."** A scoreboard strip with counters that tick up when scrolled into view:
   `200+ college players` · `3 State Players of the Year` · `100% college opportunity since 2017` · `Est. 2013` · `1st-round MLB pick, head instructor`.
   Use exactly these facts, from the About page.

3. **The Head Instructor card.** Chris Stowe is presented as a **flippable baseball card** (3D flip on hover or tap, keyboard accessible). The front has his photo, name, "RHP" and "Montreal Expos, 1st Round, #37 (1997)". The back is the stat line in scoreboard mono: Age 18, 6'3", 175, K/IP 345/250, W/L 33-4, ERA 0.94, plus 3 HS no-hitters and 2 Legion perfect games. Next to it goes the Expos scout quote from Mark Leavitt in large display type.

4. **Velocity365: "The Gauge."** A dark section where an SVG speedometer (matching the sub-brand logo) sweeps from 0 toward the red zone, scrubbed by scroll. Copy reveals the three pillars **Build. Maintain. Develop.** with ember particles as a light canvas effect that turns off when reduced motion is set.

5. **The Pipeline (alumni).** The six alumni testimonials are reworked into a horizontal "climb" of player cards (photo, name, quote excerpt, and where they went **[NEEDS INPUT]**). Each card expands into the full quote. This replaces the broken "Success Stories" cards that link to `#`.

Motion rules: use **Motion (Framer Motion)** for UI and reveals, and **GSAP ScrollTrigger** only if scroll-scrubbing needs it. Optionally use Lenis for smooth scroll, but never hijack native scroll on touch devices. Respect `prefers-reduced-motion` everywhere. No animation may delay LCP or block interaction.

---

## 4. Information architecture

Keep the existing URL slugs for SEO continuity, and add pages where the content justifies them.

| Route | Purpose | Notes |
|---|---|---|
| `/` | Home | Hero, Proof Bar, Programs, Head Instructor card, Velocity365 teaser, Pipeline, Facility glimpse, Book CTA |
| `/about/` | Story and philosophy | Founding story (2013), philosophy, Chris's "peak" quote, "Building your future one lesson at a time" |
| `/training/` | Programs hub | Keep the anchors `#indv-lessons`, `#small-group` and `#team-training`, and add `#camps-clinics` |
| `/velocity365/` | **New.** Arm strength and health program page | **[NEEDS INPUT]** program details, age groups, schedule, price |
| `/staff/` | Coaches | Chris's full bio and card. Add **Coach Josh** (named in Seneca Gregory's testimonial) **[NEEDS INPUT]** bio and photo |
| `/alumni/` | **New.** The Pipeline | Full testimonials, college commitments, State POY honors |
| `/facility/` | **New** (or a section of About) | Photo tour of the tunnels, mound and turf, plus address and map |
| `/contact/` | Book and contact | The multi-step lesson request (see §5), address, phone, map, hours |

Global UI:
- **Sticky header** that hides on scroll down and shows on scroll up. It holds the logo, the nav, and a persistent **Book a Lesson** button.
- **Mobile:** a full-screen menu with big type, plus a **sticky bottom bar** with **Call** (`tel:5408419284`) and **Book**.
- **Footer:** address, phone, socials (Facebook, Instagram, X/Twitter, using the live URLs), a small program list, and a copyright year generated from the current date.

---

## 5. Conversion: the lesson request flow

Replace the name-plus-phone form with a **3-step request** that feels like one tap at a time:

1. **Who's training?** Player age (8–10 / 11–13 / 14–18 / 18+) and focus (Pitching / Hitting / Fielding / Velocity365 / Not sure).
2. **What format?** Individual / Small Group (2–8) / Team / Camp or Clinic.
3. **How do we reach you?** Parent name, phone (required), email (optional), preferred days and times (weekday evenings / weekend mornings), and an optional note.

Requirements:
- Server action with **zod** validation, a honeypot field and basic rate limiting.
- Delivery: email to the academy through **Resend** **[NEEDS INPUT: destination email]**, plus an optional webhook (n8n or Google Sheet) set by an env var.
- A success state with a personal touch ("Coach Stowe will reach out within 24 hours", **[NEEDS INPUT]** the real response time) and a "Call now instead" fallback.
- A short version of the form (step 1 only, pre-filling the full flow) is embedded on Home and on every program section.
- Analytics event on every step (Vercel Analytics custom events) so the funnel is measurable.

---

## 6. Content corrections (fix these while migrating)

The live site contradicts itself in a few places. Use the corrected version, and confirm with the owner where noted.

- **Founding year:** About says January 2013, Staff says 2012. Use **2013** and confirm **[NEEDS INPUT]**.
- **Small group size:** Home says 2–5, Training says 2–8. Use **2–8** and confirm **[NEEDS INPUT]**.
- **"As we head into our eleventh year"** is out of date. Rewrite it so it doesn't need yearly edits ("Since 2013").
- **"Running a highly successful travel program for 11 years"**: keep it as history, phrased in the past tense.
- Fix the typos and grammar ("What ever", "pride ourself", "Pinnacles philosophy", "his/her", stray double spaces).
- First person ("I") and third person ("Chris") are mixed. Use **third person** across the site and **first person only inside quotes** from Chris.
- The copyright updates automatically.
- Name the location consistently: "Spotsylvania, VA (Fredericksburg area)". The old copy uses both.

Copy can be tightened and made punchier, but **facts stay exactly as sourced.**

---

## 7. Tech stack and architecture

- **Next.js (latest stable, App Router), TypeScript in strict mode, Tailwind CSS v4.** Static generation wherever possible.
- **Content:** a typed content layer (`/content/*.ts` or MDX) for programs, staff, alumni, testimonials and stats, so the owner's details can be filled in without touching components. Every **[NEEDS INPUT]** item lives in content as a clearly flagged placeholder that renders gracefully (hidden, not "Lorem ipsum") in production.
- **Images:** `next/image` with AVIF/WebP, correct `sizes`, blur placeholders, and explicit dimensions so nothing shifts. **[NEEDS INPUT]** the original full-resolution photos. The live site only serves 768–1024px crops, which won't hold up full-bleed on retina.
- **Hosting:** Vercel. Keep the old WordPress URLs alive with 301 redirects for every changed path (`/feed/` and similar go to `/`).
- **Components:** small, composable, server components by default, and client components only where interaction needs them. No UI kit that looks like a UI kit.
- **Project structure:** `app/`, `components/` (ui / sections / motion), `content/`, `lib/`, `public/`. Keep it boring and readable.

---

## 8. SEO and local search

This is a local business. Being found matters as much as how the site looks.

- Per-page `metadata`: unique titles and descriptions targeting *"baseball lessons Fredericksburg VA"*, *"pitching lessons Spotsylvania"*, *"baseball training academy Virginia"*, *"youth hitting lessons"*.
- **JSON-LD:** `SportsActivityLocation` / `LocalBusiness` (name, address `6862 Old Courthouse Road, Spotsylvania, VA 22551`, phone `(540) 841-9284`, geo, socials, opening hours **[NEEDS INPUT]**), `Person` for Chris Stowe, `Service` per program, `Review` for testimonials, and `BreadcrumbList`.
- Generated `sitemap.xml` and `robots.txt`, a canonical URL on every page, and Open Graph and Twitter images built per page with `next/og` in the brand style.
- Semantic HTML: one `h1` per page, a logical heading order, and descriptive alt text on every photo. The old site uses "Home" as alt text everywhere.
- An embedded map (lazy-loaded, behind a click-to-load facade for performance) and NAP (name, address, phone) consistent with the Google Business Profile **[NEEDS INPUT: GBP link]**.

---

## 9. Quality bar (non-negotiable before anything ships)

**Performance (mobile, slow 4G, Lighthouse):** Performance ≥ 95, LCP < 2.0 s, CLS < 0.05, INP < 200 ms. Initial JS per route stays under about 120 KB gzipped. Lazy-load the Velocity365 canvas and other heavy motion.

**Accessibility:** WCAG 2.2 AA. Full keyboard navigation, visible focus rings in brand style, a skip link, labelled forms with inline errors, the baseball card flip working by keyboard and announced correctly, `prefers-reduced-motion` honored, and touch targets of at least 44px. Run axe and fix everything it finds.

**Responsive:** design mobile-first at 375, then verify at 768, 1024, 1440 and 1920. No horizontal scroll. Display type scales fluidly with `clamp()`.

**Craft checklist:**
- Hover and press states on everything interactive, plus a custom cursor on desktop only if it adds something (for example, a baseball that spins on hover over CTAs).
- Page transitions between routes (a short "wipe" in navy).
- Loading, empty, error and success states designed, not left as defaults.
- Branded 404: "Foul ball." with a link home.
- Favicon set, manifest and theme color.
- No console errors, no hydration warnings, no layout shift on font load.

**Verification loop (every phase):** run the dev server, take Playwright screenshots at 375 / 768 / 1440 for each page, review them critically against this brief, fix what's off, then run Lighthouse and axe. Don't call anything done from code alone.

---

## 10. Build phases

Work in this order and commit at the end of each phase. Each phase ends with the verification loop in §9.

1. **Foundation.** Scaffold the Next.js app, set up tokens (colors, type, spacing), fonts, the base layout, header, mobile menu, footer and sticky mobile bar. Migrate the content from `docs/current-site-content.md` into the typed content layer with the §6 corrections. Download and optimize the existing images.
2. **Home.** All home sections with static layout first, then the five signature moments layered on with motion.
3. **Inner pages.** Training (with the anchors), About, Staff, Velocity365, Alumni, Facility, Contact.
4. **Conversion.** The multi-step lesson request, server action, email delivery, success state and analytics events.
5. **SEO and polish.** Metadata, JSON-LD, sitemap, OG images, redirects, 404, page transitions and the micro-interaction pass.
6. **Hardening.** Performance and accessibility audits, cross-browser checks (Safari iOS especially), and a final screenshot review of every page at every breakpoint.
7. **Launch prep.** Vercel project, env vars, a preview deploy for the owner to review, a DNS cutover plan, and a check that every redirect resolves.

---

## 11. Owner inputs needed ([NEEDS INPUT] checklist)

The build can start without these. Placeholders are built in, and each item makes the site better when it arrives.

- [ ] Logo as SVG or high-res, plus a Velocity365 logo vector
- [ ] Original full-resolution photos, plus any **video** of training sessions (for the hero)
- [ ] **College commitments** for each featured alumnus, and any more alumni with schools
- [ ] Names of the 3 State Players of the Year
- [ ] **Coach Josh**: full name, bio and photo, plus any other staff
- [ ] **Velocity365** details: what a session involves, ages, schedule, pricing
- [ ] Pricing for lessons (show it, show "starting at", or keep it hidden?)
- [ ] Email address for lesson requests, and the realistic response time
- [ ] Business hours
- [ ] Confirm the founding year (2012 or 2013) and small group size (2–5 or 2–8)
- [ ] Google Business Profile link and current review count/rating
- [ ] Domain and DNS access (where pinnacle-baseball.com is registered) and whether WordPress stays up during the transition
- [ ] Any upcoming camps or clinics to list
