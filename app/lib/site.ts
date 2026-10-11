// Single source of truth for the site's identity. The live host 308-redirects
// tracerlabs.io → www.tracerlabs.io (Vercel), so every canonical, sitemap entry,
// Open Graph URL and JSON-LD @id must use the www host — a non-www canonical
// would point search engines at a redirect.
export const SITE_URL = "https://www.tracerlabs.io";
export const SITE_NAME = "Tracerlabs";

// Direct booking destination (Cal.com). NEXT_PUBLIC_CAL_BOOKING_LINK binds at
// build time in Vercel; the literal is the fallback used by every CTA.
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_CAL_BOOKING_LINK || "https://cal.com/team/tracerlabs/discovery-call";

export const CONTACT_EMAIL = "jarvis@tracerlabs.io";

// Verified business contact details (owner-supplied 2026-09-23). Single source
// of truth: the footer renders these and the structured data emits the same
// values, so the name/address/phone stay consistent wherever they appear.
export const PHONE_E164 = "+18665760554";
export const PHONE_DISPLAY = "(866) 576-0554";
// ⚠️ This is a MAILING address — Formation at The Star, a coworking space.
// Nobody is staffed there and visitors cannot be received, so it must never be
// presented as a visitable office: no LocalBusiness schema, no opening hours,
// no "drop in" copy. See the note in app/components/JsonLd.tsx.
export const ADDRESS = {
  street: "5 Cowboys Way",
  locality: "Frisco",
  region: "TX",
  postalCode: "75034",
  country: "US",
} as const;
/** Confirmed by the owner 2026-09-23: 24 June 2022. */
export const FOUNDING_DATE = "2022-06-24";

/** Public profiles that belong to the business. Add a URL here ONLY once the
 *  owner has confirmed it is theirs — a wrong entry ties the company to someone
 *  else's listing. Emitted as Organization.sameAs. */
export const SAME_AS: string[] = [
  // Confirmed by the owner, 2026-09-23.
  "https://www.linkedin.com/company/tracerlabs-llc",
];

/** Google Business Profile. The owner confirms a profile EXISTS (2026-09-23)
 *  but has not supplied its URL, and guessing one would attach the business to
 *  a listing nobody verified. Paste the profile's own share link
 *  (https://maps.app.goo.gl/… or https://g.page/…) and it joins SAME_AS. */
export const GOOGLE_BUSINESS_PROFILE_URL = "";

/** Every verified profile URL, for the Organization schema. */
export const ALL_PROFILES = [...SAME_AS, ...(GOOGLE_BUSINESS_PROFILE_URL ? [GOOGLE_BUSINESS_PROFILE_URL] : [])];

/** The company LinkedIn page, for the footer link (undefined until confirmed). */
export const COMPANY_LINKEDIN = SAME_AS.find((u) => u.includes("linkedin.com/company"));
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region} ${ADDRESS.postalCode}`;

export const FOUNDERS = [
  {
    name: "Sufyan Sheikh",
    role: "Co-founder — sales & marketing",
    linkedin: "https://www.linkedin.com/in/sufyan-sheikh-b258a7141/",
  },
  {
    name: "Subaiyal Sheikh",
    role: "Co-founder — engineering",
    linkedin: "https://www.linkedin.com/in/subaiyalshk/",
  },
] as const;

export const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
