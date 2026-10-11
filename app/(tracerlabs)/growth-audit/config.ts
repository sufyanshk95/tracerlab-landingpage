// ─────────────────────────────────────────────────────────────────────────────
// Growth Audit funnel content config (/growth-audit).
//
// Paid-traffic landing page: one action (claim the free Growth Audit call).
// Ported from the standalone HTML draft (claude.ai artifact EGKEg6ZJKutkb6zvKkXiei)
// onto the site's components — same copy, same layout, brand tokens from globals.
//
// ⚠️  PLACEHOLDERS: everything marked `placeholder`/REPLACE below ships in a safe
//     fallback state (video shows "coming soon", testimonials section is hidden,
//     legal links point at the homepage). Fill them in and the page picks them up.
// ─────────────────────────────────────────────────────────────────────────────

/** VSL embed URL. Player loads only on tap, so it costs nothing on page speed.
 *  Vimeo:   https://player.vimeo.com/video/VIDEO_ID?autoplay=1
 *  YouTube: https://www.youtube-nocookie.com/embed/VIDEO_ID?autoplay=1&rel=0
 *  Wistia:  https://fast.wistia.net/embed/iframe/VIDEO_ID?autoplay=1
 *  Empty string = no video yet → the tile says "Video coming soon" when tapped. */
export const VSL_EMBED_URL = "";

/** 16:9 poster shown in the VSL tile before play (under 150KB, in /public). Empty = grid backdrop. */
export const VSL_POSTER = "";

export const VSL_TITLE = "Watch: how we turn ad spend into booked appointments";
export const VSL_LENGTH = "3 min";

/** Where the form posts. Same stub pattern as /solar (see app/api/growth-audit-lead). */
export const LEAD_ENDPOINT = "/api/growth-audit-lead";

/** REPLACE with the real policy URLs once they exist. */
export const PRIVACY_URL = "/";
export const TERMS_URL = "/";

export const BUSINESS_TYPES = ["Solar", "HVAC", "Roofing", "Other home service"] as const;
export const AD_SPEND = ["Not running ads yet", "Under $2K", "$2K–$5K", "$5K+"] as const;

/** Headline proof stats. STATISTICS AND THEIR SOURCE NOTE ONLY were updated
 *  (2026-09-23, again 2026-09-24) to match the owner's revised solar figures in
 *  app/lib/solarResults.ts — the page's design, structure, offer and layout are
 *  deliberately untouched. Superseded here: 367 consultations / 766 leads /
 *  ≈$96 / 20%→40–58% monthly, then 578 bookings / 70.7% (recorded booking counts
 *  are not deduplicated, so they are no longer presented as unique conversions). */
export const STATS: { value: string; label: string }[] = [
  { value: "$40–$52", label: "per booked appointment" },
  { value: "124", label: "solar deals closed from 817 leads" },
  { value: "15.2%", label: "lead-to-sale conversion for that client" },
  { value: "158 of 397", label: "initially unbooked leads converted by AI text follow-up" },
];

export const STATS_SOURCE =
  "$40–$52 is the average advertising cost per booking across our home services, meat processing, and med spa accounts — a separate portfolio figure. The solar figures are one client, with advertising running 1 April – 22 September 2026: leads and closed deals are owner-reported and the rates are calculated, and the client's own sales team ran the consultations and closed the deals. Results vary by market and are not a guarantee.";

/** Replace the bracketed text with real customers' words. Entries flagged `placeholder`
 *  are NOT rendered; the whole section is hidden until at least one is real. */
export const TESTIMONIALS: {
  quote: string;
  name: string;
  who: string;
  initials: string;
  placeholder?: boolean;
}[] = [
  {
    quote: "[Customer testimonial goes here. One to three sentences on the result they got, in their own words.]",
    name: "[Customer name]",
    who: "[Title, Company · City]",
    initials: "AB",
    placeholder: true,
  },
  {
    quote: "[Customer testimonial goes here. One to three sentences on the result they got, in their own words.]",
    name: "[Customer name]",
    who: "[Title, Company · City]",
    initials: "CD",
    placeholder: true,
  },
  {
    quote: "[Customer testimonial goes here. One to three sentences on the result they got, in their own words.]",
    name: "[Customer name]",
    who: "[Title, Company · City]",
    initials: "EF",
    placeholder: true,
  },
];

export const TEAM = [
  {
    name: "Sufyan Sheikh",
    role: "Co-founder, sales & marketing",
    bio: "Years of door-to-door and field sales. Runs the ads, offers and follow-up scripts.",
  },
  {
    name: "Subaiyal Sheikh",
    role: "Co-founder, engineering",
    bio: "Full-stack architect who has shipped for Fortune 5 companies. Builds the agents and the CRM.",
  },
];
