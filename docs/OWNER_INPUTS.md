# Owner inputs

The site is built and shippable without these. Every item is a `null` or empty value in `content/`, and the page hides that block until it's filled, so nothing shows as "Lorem ipsum" or "TBD". Each item you send makes the site stronger.

## Highest impact

| What | Where it goes | File |
| --- | --- | --- |
| **College or pro destination for each featured alum** (Max Harper, Miles Levere, Seneca Gregory, Carson Bell, Tristan McAlister, Billy Fluharty) | Alumni cards, the full-story dialogs, the Alumni page | `content/alumni.ts` → `destination` |
| **Email address for lesson requests** | Where the booking form delivers (server env var, never shown publicly) | Vercel env `LESSON_TO_EMAIL` |
| **Video of a training session** (10 to 20 seconds, landscape, no audio needed) | Would replace the still photo in the home hero | `components/home/TunnelHero.tsx` |
| **Velocity365 details**: what a session involves, ages, schedule, price | Velocity365 page detail grid | `content/velocity.ts` |

## Also needed

- **Coach Josh**: full name, role, short bio, photo. He's named in Seneca Gregory's testimonial but had no profile on the old site. Set `ready: true` in `content/coach.ts` once filled.
- **Names and years of the 3 State Players of the Year.** Adds a section to the Alumni page. `content/alumni.ts` → `statePlayersOfTheYear`.
- **Pricing**: show exact prices, "starting at", or keep hidden (current). `content/programs.ts` → `price`.
- **Business hours**, if you want them listed and in Google's structured data. `content/site.ts` → `hours`.
- **Realistic response time** for lesson requests (for example, "within 24 hours"). Shown on the form's thank-you screen. `content/site.ts` → `responseTime`.
- **Public email address**, if you want one displayed. `content/site.ts` → `email`.
- **Google Business Profile link.** `content/site.ts` → `googleBusinessUrl`.
- **Upcoming camps or clinics.** `content/programs.ts` → `upcomingEvents`. The page shows a "none scheduled" state until then.

## Please confirm

These were inconsistent on the old site; the new site uses the value in bold.

- Founding year: About said January 2013, Staff said 2012. Using **2013**.
- Small group size: Home said 2 to 5, Training said 2 to 8. Using **2 to 8**.
- Chris's height: the old site says 6'3", his 1997 Bowman card says 6'1". Using **6'3"** (from the site).

## Assets

- **Logo as a vector file** (SVG, AI or EPS). The current logo was traced from the 287px PNG on the old site. The trace is clean, but an original is better.
- **Velocity365 logo as a vector file.** Currently the 500px PNG.
- **Original photos of the alumni.** Several are small crops (400 to 700px wide).

## Launch

- **Domain access**: where pinnacle-baseball.com is registered, so DNS can point to Vercel.
- Whether the WordPress site should stay up during the transition (it can, on a subdomain, until the new site is approved).
