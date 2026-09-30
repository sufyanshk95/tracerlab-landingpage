@AGENTS.md

# Tracerlabs landing page

Marketing site for **Tracerlabs** (AI growth & operations: lead generation + connected AI
systems managed through a custom CRM) — live at **www.tracerlabs.io**. The canonical host is
**www** (the apex 308s to it); every URL constant comes from `app/lib/site.ts` (`SITE_URL`,
`BOOKING_URL`, founders). Never hard-code `https://tracerlabs.io`.
Next.js 16 (App Router, route group `app/(tracerlabs)/`), React 19, Tailwind v4.
Originally a legacy static HTML/CSS/JS site; now **fully migrated to React components**.

## Run / build / ship
- `PORT=3100 npm run dev` — dev server (this project conventionally runs on **3100**).
- `npm run build` — production build. **Never run `next build` while `next dev` is running**
  on this project (they share `.next/` → "Cannot find module './XXX.js'"). Stop dev first.
- **Deploy:** push to `main` → Vercel auto-deploys to production (www.tracerlabs.io).
  Branch `v2` = the old static site, kept as a rollback. Prod env vars live in Vercel’s
  Production scope and bind at **build time** (a new push is needed after changing them).
- `npm test` — unit tests (tsx + node:test): hero-film file selection + the solar figure identities
  (`app/components/*.test.ts` and `app/lib/*.test.ts`).
- `cd video && npm test` for the film's pure logic.
- **No ffmpeg/brew on this machine.** Testimonial encodes were produced with a throwaway Swift
  AVFoundation transcoder (AVAssetReader → AVAssetWriter, explicit H.264 bitrate + scaling) —
  540×960, ~500–700 kbps, mono AAC 64k, faststart. Re-encode the same way, or install ffmpeg
  and use the repo recipe.

## Page structure (2026-09-24)
`<Nav> <Hero> <main id="content">{ <Evidence> <TechBar> <Services> <CrmOverview> <Testimonials>
<Projects> <Process> <Faq> <Team> <Cta> <StickyCtaBar> <Footer> }</main>`.
Section ids: `tl-hero tl-evidence tl-services tl-crm tl-testimonials tl-projects tl-process
tl-faq tl-team tl-cta` + `#contact`. Nested pages link as `/#tl-…` (absolute-from-root).

**⚠️ Each section has ONE job — check before adding copy.** Primary locations:
| Idea | Lives in |
|---|---|
| Complete capability list | `Services` (hero + footer summarise, never repeat it) |
| Headline numbers | `Evidence` (selected results) |
| Problem + delivered system | `Projects` cards — ONE outcome line, no stat block |
| Full breakdown + methodology | the case-study pages |
| How the stages connect | `CrmOverview`, demonstrated on one job |
| Payroll cadence | `CrmOverview` note + the FAQ |
| General human responsibilities | FAQ "What stays with my team?" (service pages keep only their own exceptions) |
| Built around your SOPs | positioning (hero/Services intro), then shown by example |
A new FAQ must answer something the section above it did not; `HOME_FAQ` feeds the FAQPage
JSON-LD, so visible copy and structured data stay in step automatically.

Components (`app/components/`):
- **Hero** — copy-only, centered, plain server HTML with a CSS stagger (`animate-rise`).
  Eyebrow "AI growth & operations", headline "Generate demand. Automate operations. Run it all in
  one place.", primary CTA = direct Cal.com booking (`BOOKING_URL`), secondary → `#tl-projects`.
  **Hero film = OPT-IN** (2026-09-23): the page is fully usable without it. Nothing is
  requested, and no element exists over the page, until the visitor presses **"Watch
  introduction"** beside the CTAs; `HeroFilm` then mounts a fixed full-screen dialog
  (`.nt-film-stage`, z-100) containing the film. Every exit unmounts it and returns focus to the
  trigger: `ended`, Close, Escape, `error`/`stalled`/`abort`, no playback within 6 s, or a
  currentTime watchdog after 4 s of no progress — failure degrades to "the page you already had".
  Sound starts ON (the press is the gesture browsers require); the speaker chip toggles it.
  `heroFilmPolicy.ts` is now only file selection (orientation × theme) — there is no autoplay
  decision left to make, so reduced-motion/Save-Data need no veto. Film source: `video/src/hero/`;
  re-encode with `bash scripts/encode-hero.sh`.
  ⚠️ Hero copy is plain server HTML and must never be gated on JS, hydration or media again.
- **Evidence** ("Results from client systems.") — figures with a short scope + source per card:
  portfolio $40–$52 per booked appointment OUTSIDE the solar grouping; solar 124 closed deals
  (15.2% lead-to-sale) and 39.8% of initially unbooked leads converted; meat processing 20 first-week
  bookings. `ProofWall` / `TelemetryPanel` / `MachinePanel` are retired-on-disk; keep in sync.
- **TechBar** — logo marquee labelled "Technologies we build with" (tools, not clients).
- **Services** — 5 lifecycle stages (attract / convert / coordinate / bill & payroll / oversee),
  each with a "People:" line and a link to its `/services/*` page. ⚠️ The "What a connected
  engagement looks like" 8-step block was REMOVED 2026-09-25 — the customer workflow lives only
  in the CRM demonstration. Do not reintroduce a step list here.
- **CrmOverview** — "Your business, in one place." The home page's ONE customer-workflow
  demonstration: a server shell + `CrmDemo` (client) driving six stages — inquiry → AI follow-up
  → job scheduled → tasks → invoice → payment — inside a persistent frame (summary bar,
  tablist navigator, workspace, activity feed). Sample data is in `app/lib/crmDemo.ts` and is
  ENTIRELY FICTIONAL (label: "Interactive example · sample data"); line items must keep summing
  to `INVOICE.total`. Nothing performs a real action. Accessibility contract: real tablist
  (arrow keys / Home / End / roving tabindex), only the active panel mounted, each stage's
  sentence rendered in the navigator so the explanation survives with JS off, entrance uses an
  `animate-` class so reduced-motion disables it, and the walkthrough NEVER autostarts. Payroll
  appears once in the final overview — never triggered by a customer payment.
  **Section roles:** Services = what we build · CrmOverview = how it connects · Process = how a
  CLIENT works with us (discovery → launch). Never repeat the customer workflow in Process.
- **Testimonials** ("Hear from our clients") — `app/lib/testimonials.ts` is the content store
  (video, poster, captions, transcript, name, role, company, title, quote, caseStudy,
  `published`). **Attribution is ROLE + INDUSTRY ONLY** — the owner does not publish client or
  company names on these cards (2026-09-25); `name`/`company` stay in the data for internal
  reference and must never be rendered, and a case-study link that would identify the client was
  removed for the same reason. `TestimonialVideo` takes a NARROWED prop type (`Media`) precisely
  so `name`/`company` cannot reach the RSC payload — never widen it to the full `Testimonial`.
  **All three recordings are PUBLISHED** (owner-supplied 2026-09-24), encoded to 540×960 H.264 +
  mono AAC, faststart, in `/public/assets/testimonials/`.
  ⚠️ **ANONYMITY IS LABEL-DEEP ONLY — never call these anonymous.** Audited 2026-09-24: all three
  show the speaker's face full-frame; the mortgage clip has the client's **full name burned into
  the first ~0–3 s** (the poster was re-cut from t=5 s to avoid it, but playing still reveals it);
  the meat-processing clip is filmed on the client's premises. Asset filenames previously carried
  client/company names and appeared ~10× each in the shipped HTML via Next/Image srcset — they are
  now **role-based**, and must never be named after a person or company again.
  ⚠️ **None has a `.vtt` or transcript** — each carries burned-in on-screen captions, which is NOT
  a caption track and gives a screen-reader or sound-off visitor nothing. There is no transcription
  tool on this machine (no ffmpeg/whisper; macOS on-device Speech is blocked by TCC), so these must
  come from the owner or a service. Never transcribe from sampled frames or from memory.
  ⚠️ **`/public/assets/testimonials/` is UNTRACKED in git** — until it is committed, a deploy ships
  this section with 404ing posters and videos.
  The other `/public/assets` videos are product demos and our own reels and must never be promoted
  into this list. With no published entries the section renders `null` in production; dev previews
  staged entries with their gaps marked (`NODE_ENV !== "production"`).
  **Player contract** (`TestimonialVideo.tsx`): no carousel, no autoplay; poster only until the
  visitor presses play, `preload="none"`, no `src` until then, aspect ratio reserved, native
  controls, `<track kind="captions">` when the recording has one, transcript in a `<details>`.
  Only ONE testimonial plays at a time — enforced on the `play` EVENT (a module-level registry),
  so the native controls are covered too, not just our button. A real media error shows a
  `role="alert"` panel with a **Try again** button; an untouched player has no `src` and must
  NEVER be labelled broken. Start/retry run in a commit-time `useEffect`, **not**
  `requestAnimationFrame` — rAF does not fire in a background tab and would strand the press.
  Focus moves to the `<video>` when the trigger unmounts. Add `VideoObject` JSON-LD only for real
  published videos with verified metadata.
- **Projects** — 2 case studies (chip: "Measured outcome") + own products below ("not client
  results"). `ProjectVideo` = click-to-play with sound (no autoplay).
- **Process** (5 steps; step 5 = "where included in the engagement"), **Faq** (`<details>`,
  no JS; `HOME_FAQ` also feeds FAQPage JSON-LD), **Team** (2 founders + Jarvis/Tracy as "AI
  agents we run on ourselves"), **Cta** (direct booking primary; the Retell voice widget is an
  optional, labelled demo — only rendered when Retell env is set), **StickyCtaBar** (stands down over
  `tl-crm` and `tl-testimonials` via its `yieldToIds` prop — it must never float over the CRM
  walkthrough's controls or a video player's control bar), **Footer**
  (services + company + contact columns, founders' LinkedIn).
- **Service pages** `app/(tracerlabs)/services/<slug>/{content.ts,page.tsx}` render through
  `components/service/ServicePage.tsx` — every page answers: who / problem / what we implement /
  how it connects / evidence (each item tagged measured | demo | illustrative) / what needs
  people / FAQ / next step, plus Service + BreadcrumbList + FAQPage JSON-LD.
  Slugs: lead-generation, ai-appointment-booking, ai-voice-agents, custom-crm,
  scheduling-and-operations, invoicing-payments-payroll.
- **Retired routes:** `/agents` → 308 `/services/custom-crm`; `/voice-agents` → 308
  `/services/ai-voice-agents` (both in `next.config.ts`). Their components and
  `public/assets/agents/*` were deleted (they carried unsupported figures).
- **SEO:** `JsonLd.tsx` (Organization with founders, WebSite, Service catalogue, FAQPage);
  `robots.ts` allows everything but `/api/` and `/sales-sop`; `sitemap.ts` lists indexable pages
  only. Proposal decks `/gnrg /solrite /insurance` are noindex and off the sitemap.
- **Analytics:** no provider is installed. `app/lib/track.ts` forwards `book_call_click`,
  `ai_demo_start`, `contact_submit` to dataLayer/gtag/fbq/va IF one appears; `Analytics.tsx` is
  a delegated click listener for `data-track` attributes (Button forwards them). Confirmed
  voice-agent bookings are logged server-side in `/api/book` (`appointment_booked`).
- Shared: **Button** (angular red CTA), **Bevel**, **Eyebrow**, **Card**, **CaseHeader**
  (nested-page header), **MobileMenu** (native `<details>` nav under md).

## ⚠️ Solar figures live in ONE place
`app/lib/solarResults.ts` holds the inputs and DERIVES every rate; `solarResults.test.ts` pins
the published values (15.2 / 39.8 / $60.62 / $399.41 / $3.72M / 75.11× / $868,000) and asserts
advertising spend is never deducted twice. **Never type a solar figure by hand** — import it.

- **Screenshot-reported:** $49,526.68 advertising spend, 1 Apr – 22 Sep 2026 (owner confirms it
  covers the 817-lead population).
- **Owner-reported:** 817 leads · 124 closed deals · 158 of 397 initially unbooked leads
  converted by AI follow-up · $30,000 average revenue and $7,000 average profit per deal
  (profit is ALREADY net of advertising — never subtract the spend again).
- **Calculated:** every rate, ratio and total.

**⚠️ Recorded booking counts (420 direct, 578 combined) are NOT deduplicated** — the owner
states they include duplicates and reschedules. They may appear ONLY in the methodology
section, labelled as recorded booking counts; never as a headline, never as unique
appointments/booked leads, never as a denominator. Therefore WITHHELD until deduplicated:
70.7% overall lead-to-booking · 51.4% direct funnel rate · $85.69 per unique booked appointment
· 37.6% additional-appointment lift · 239 remaining unbooked leads · any diagram partitioning
all 817 leads. The 158/397 cohort is the one exception the owner defined in LEAD terms.

**Not comparable:** a separate screenshot's 374 Meta-attributed scheduled appointments uses a
different attribution basis from the funnel/CRM records. Never substitute one for the other and
never invent an explanation for the gap.

**`RateChart.tsx` stays unmounted** because its denominator, period and sources are
undocumented — NOT because it is arithmetically impossible. Do not claim otherwise.

Revenue/ROAS are average-based estimates: keep "estimated" attached everywhere, keep the
methodology note adjacent, keep profit in its own section, never call ROAS "ROI", and keep all
financial figures out of metadata and structured data (the qualifying context cannot travel).

## ⚠️ Business identity & structured data
`app/lib/site.ts` is the single source of truth for name/address/phone/founding
date; `app/components/JsonLd.tsx` emits it and the footer renders it, so the NAP
matches. Verified: phone `+18665760554`, 5 Cowboys Way, Frisco, TX 75034,
founded 2022-06-24.

- **The address is a COWORKING mailing address** (Formation at The Star) with
  **nobody staffed on site**. The Organization schema therefore stays
  `@type: "Organization"` — never LocalBusiness/ProfessionalService, never
  `openingHours`/`geo`/`hasMap`, and no copy inviting visitors. A Google
  Business Profile at an unstaffed coworking address also risks suspension
  under Google's guidelines — that is the owner's call, not a code change.
- `sameAs` is emitted ONLY when `GOOGLE_BUSINESS_PROFILE_URL` is filled in with
  a real, owner-supplied URL. Never guess or search for a listing.
- `areaServed` = Texas (State) + United States (Country) — the US entry is real
  (the meat-processing engagement is in New York), so do not trim it to Texas alone.
- No `aggregateRating`, review, award, superlative, or financial figure in any
  schema node. No `VideoObject` until a testimonial has a verified upload date.
- Schema.org validator run 2026-09-23 on the Organization and a service page
  graph: 0 errors, 0 warnings. Google Rich Results Test still needs a public
  URL — it cannot reach localhost.

## Copy rules (user-set 2026-09-05, extended 2026-09-23)
- **Never state exact client counts** — vague plurals only ("solar companies", "our solar
  portfolio"). **EVERY client is anonymized — there is no longer a named exception.**
  Harbs Farm was named site-wide by permission until 2026-09-29, when the owner withdrew it:
  the case study moved `/work/harbs-farm` → `/work/meat-processing-platform` (308 in
  `next.config.ts`), its `harbs-*` assets were renamed `meatproc-*`, and the name was removed
  from the six service pages, Evidence, Faq, CrmOverview, Footer, Projects and all JSON-LD.
  Refer to it as "a meat-processing farm" / "the farm". Do not reintroduce the name anywhere,
  including asset filenames, slugs and structured data.
- **Every published number must be defensible**: lead counts/CPL trace to the clients' Meta ad
  accounts (via the meta-ads-official MCP; count only campaigns we ran — Solrite's account has
  ~$21k of pre-engagement history), consults/bookings to production systems.
- **Numbers that are OUT (do not reintroduce):** $11.28M / $6.6M / $5M+ / $10M+ revenue claims ·
  any attendance or show-rate figure, incl. "94% show rate" and the 28-of-487 count (needs its
  own attendance records) · "2×" / "50%" / "roughly doubled" and the monthly 20%→40–58% series ·
  367 consultations / 766 leads / ≈$96 · 178 closed deals, $5.34M, 107.82×, $1.246M, $278.24,
  21.8% · the earlier 30%-close-rate projections ($1.2138M, 24.51×) · the 83% text-agent claim —
  the supported figure is **39.8% of initially unbooked leads** · "10–15 employees", −59%
  savings, 97% accuracy, breakeven month 3, "fully automated company".
- **$40–$52** = "per booked appointment" / "Average advertising cost per booking across our
  home services, meat processing, and med spa accounts." Never CPL, never solar, never a
  guarantee. It is a SEPARATE portfolio metric — never merge it with, or replace it by, a
  solar cost figure.
- **No absolute promises.** "Respond to inquiries in minutes and help qualified prospects book",
  not "every inquiry answered and turned into an appointment". Nothing implies every lead books,
  every process succeeds, or a business runs without people.
- Label everything: measured outcome vs working demonstration vs illustrative scenario / sample
  data — the chips do the labelling, so prose must not re-explain the scheme on every page.
  Payroll: describe the workflow capability; do not claim disbursement, tax filing or compliance,
  and do not invent a preparation-only limitation either. Scope is per engagement.
- **Do not treat existing marketing copy as evidence.** Specificity that no repo artifact or
  owner statement supports (which ad platform a portfolio figure covers, optimisation cadence,
  approval policies, hand-off mechanics) must be removed, not softened.
- CTA framing = **discovery call** (understand the business, uncover bottlenecks) — not
  "build your AI". Primary CTA is the direct Cal.com link; the voice agent is an optional demo.

## ⚠️ Performance rules (hard-won 2026-09-06 — scroll-jank hunt)
The page died by a thousand compositing cuts. Do not reintroduce these:
- **No CSS `filter`/`backdrop-filter` at scale.** Light mode once ran `drop-shadow` filters
  on every Bevel (the light-only scroll lag) and the marquee filtered 18 logos individually.
  Card shadows = `box-shadow` on the UNCLIPPED `.nt-cardframe` (a box-shadow on the Bevel
  itself gets clipped by the chamfer; the soft blur hides the corner mismatch). If a moving
  row needs a filter, put ONE on the container. Page-wide budget: a handful of small,
  non-animated filtered elements (marquee row, grayscale portraits) — audit with
  `[...document.querySelectorAll('*')].filter(e=>getComputedStyle(e).filter!=='none')`.
- **No giant blurred layers.** Ambient glows are plain `radial-gradient(circle closest-side …)`
  divs — the old `blur(120–140px)` filters were redundant and expensive. Same for the horizon.
- **Animate transform/opacity only.** The grid floor scrolls via a `::before` translateY,
  never `background-position` (per-frame repaint).
- **Sticky/fixed elements keep blur ≤ `md`** (nav) / `sm` (CTA bar) — a fixed backdrop-blur
  re-blurs everything under it every scrolled frame.
- **`content-visibility:auto`** on the 4 below-fold sections, masked by `.cv-fade` (a
  TRANSFORM-ONLY slide-up — an opacity keyframe can strand sections invisible when
  animations don't run, e.g. throttled tabs).
- **Scroll parallax = CSS scroll-driven animations only** (`.nt-px` / `.nt-px-bg` /
  `.nt-px-window` in globals.css, `animation-timeline: view()`; `Card depth={px}` opts a card
  in). Zero JS, compositor-only, no-op on older Safari / reduced-motion. Never add a JS scroll
  listener or Motion `useScroll` for this. ⚠️ `view()` binds to the nearest SCROLL CONTAINER and
  `overflow: hidden` counts — the below-fold sections, Bevel's fill and the media windows use
  `overflow-clip`; putting `overflow-hidden` back on any ancestor silently freezes the parallax.
- **No session-replay scripts** (Hotjar/Contentsquare removed — they hook every scroll and
  were the dominant jank after the rendering fixes). Re-add only as a deliberate decision.
- The headline is plain text in the server HTML (SEO / no-JS); its entrance is CSS-only
  (`animate-rise`), so never gate it behind hydration or JS state.

## Design system — "sharp technical dark"
- **Geometry:** chamfered corners everywhere via `clip-path` — `.bv-6`/`.bv-9` utilities (globals)
  for chips/pills, `<Bevel>` for bordered panels. No rounded UI (the logo image is exempt — it’s
  brand identity).
- **Color:** near-black + a white-opacity scale. The dark page is `--tl-page #0c0e13` (a soft
  near-black with a faint blue cast — NOT pure `#000`, which read as "super dark"; changed
  2026-09-22), surface `#14171e`, cards `rgba(21,24,32,0.82)`, and media wells `#07090d` so
  reels/screenshots sit a step BELOW the page. Keep the whole dark scale moving together; the pink→blue gradient is reserved for focal
  accents (one headline word, etc.); brand-red `#e21949` for CTAs; ambient glows are dimmed. The
  CTA mic orb is red metallic; icons are plain ink line SVGs (stroke=currentColor — the old
  embossed metal plates are gone); section accent blue `#056AFC`, pink `#e7028d` used sparingly.
- **Type:** Duborics (`font-display`) for headings/buttons/labels; Plus Jakarta (`font-body`) for body.

## ⚠️ Tailwind v4 — NO preflight (read before adding anything)
`app/globals.css` imports Tailwind’s theme + utilities **unlayered** and **omits preflight**
(preflight would clobber the legacy `public/style.css`, incl. its `* { margin:0 }`). Consequences:
- A base `a { color: inherit; text-decoration: none }` reset lives in globals — without it,
  links get the browser-default underline + blue. Use the `underline` utility if you ever want one.
- **Fonts (updated by the perf work):** the legacy `* { font-family: 'Inter' }` leak is **gone** —
  `public/style.css` was slimmed to just the universal box reset. Brand fonts now come from
  `next/font` on the `(tracerlabs)` wrapper (`--font-display`/`--font-body`). A new top-level
  section just needs to **inherit `font-body`** (place it under a `font-body` container — the home
  page sections and each `/services/*` page do this) and put
  `font-display` on its headings. The old `#tl-*` font-isolation block in globals still exists but
  is now vestigial — **new sections no longer need a `#tl-*` id** to get the right font.

## Legacy JS
`public/legacy/app.js` (`DevForgeSite`) is stripped to **only** initialize `ScreenAnimation`
(the hero canvas, which self-manages resize). AOS, JS smooth-scroll, the nav sticky-toggle,
reveal effects, and the removed stepper/testimonials/modal/iframe are **not** initialized — those
scroll handlers were snapping programmatic scroll + breaking anchor-link nav, and AOS mutated
`<body>` (hydration mismatch). Smooth anchor scrolling is now CSS (`html { scroll-behavior: smooth }`),
with `scroll-margin-top` on the sections so the sticky nav doesn’t cover them.

## Voice agent (CTA)
`/api/retell/web-call` mints a short-lived Retell token; `VoiceWidget` runs the in-browser call;
the agent books via `/api/book` (Cal.com; shared secret in `?s=`). Vercel **Production** env:
`RETELL_API_KEY`, `RETELL_AGENT_ID`, `RETELL_FUNCTION_SECRET`, `CAL_API_KEY`, `CAL_EVENT_TYPE_SLUG`,
`CAL_TEAM_SLUG`, `NEXT_PUBLIC_CAL_BOOKING_LINK`. `scripts/repoint-book-call.mjs` re-points the
agent’s `book_call` URL after a domain change (updates the existing LLM, no new agent).

**Notification pipeline (2026-09-05, audited end-to-end):** the agent's `webhook_url` points at
`/api/retell/webhook?s=…` (same secret). On `call_analyzed` it SMSes both founders
(`NOTIFY_SMS_NUMBERS`, from toll-free `TWILIO_FROM_NUMBER` +18665760554) complete call details +
recording link, and emails the full transcript via Resend (`NOTIFY_EMAILS`, from jarvis@).
Extra prod env: `TWILIO_ACCOUNT_SID/AUTH_TOKEN/FROM_NUMBER`, `NOTIFY_SMS_NUMBERS`,
`NOTIFY_EMAILS`, `RESEND_API_KEY`. Ghost calls (<5s / no transcript) are filtered.
- Retell config lives **out of band** (API-applied, not in repo): post-call analysis fields
  (`caller_name/caller_email/project/timeline/budget/booked_call`) + prompt that collects
  name/email right after the first question. LLM id `llm_b906ca424f062a1dcec7f4e59cc3`.
- Audit/debug pattern: `node --env-file=.env.local -e '…retell-sdk…'` — note `call.list()`
  returns `{items, pagination_key, has_more}`, NOT an array.
- Booking was proven live: POST prod `/api/book?s=…` with `{args:{name,email,preferred_time,timezone}}`
  books a real Cal.com slot (cancel via `POST /v2/bookings/{uid}/cancel`). Cal `/slots` uses
  api-version 2024-09-04 but `/bookings` uses 2024-08-13.
