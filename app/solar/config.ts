// ─────────────────────────────────────────────────────────────────────────────
// Solar funnel content config.
//
// Items marked `placeholder` are NOT rendered (2026-09-22): the page is live, so
// only verified figures show. Fill a placeholder with a real, approved value and
// drop the flag to render it. The client is anonymized ("a Texas solar company")
// per the site-wide copy rule — no client is named on the site.
// ─────────────────────────────────────────────────────────────────────────────

/** Where every CTA sends the visitor. Swap for a solar-specific Calendly/booking link. */
export const BOOKING_URL = "https://dealflow.tracerlabs.io/lead-intake";

/** Headline proof stats — the same client as /work/solar-lead-engine (advertising
 *  ran 1 Apr – 22 Sep 2026). Leads and closed deals are owner-reported; the rate is
 *  calculated. Recorded booking counts (420 / 578) are NOT used here: the owner
 *  states they include duplicates and reschedules. Placeholders are hidden. */
export const PROOF_STATS: { value: string; label: string; placeholder?: boolean }[] = [
  { value: "124", label: "Deals closed from 817 leads" },
  { value: "15.2%", label: "Lead-to-sale conversion" },
  { value: "158 of 397", label: "Initially unbooked leads converted by AI follow-up" },
  { value: "24/7", label: "AI agent booking around the clock" },
];

/** A real, approved quote from the client owner goes here. Hidden while `placeholder` is set. */
export const TESTIMONIAL = {
  quote: "",
  name: "Owner",
  company: "A Texas solar company",
  placeholder: true,
};

/** Onboarding scarcity line near the final CTA. Adjust to your real capacity. */
export const SCARCITY = "We onboard a limited number of solar installers each month.";
