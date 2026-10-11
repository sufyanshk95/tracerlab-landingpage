// ─────────────────────────────────────────────────────────────────────────────
// The solar engagement's results — ONE source of truth for every page that
// quotes them. Every rate and total is DERIVED here, never typed by hand, so a
// published string cannot drift from the inputs it claims to describe.
//
// PROVENANCE (2026-09-24, supersedes the 2026-09-23 booking-led figures):
//   • SCREENSHOT-REPORTED (supplied Meta Ads Manager view): advertising spend
//     $49,526.68 over 1 April – 22 September 2026. The owner confirms this
//     spend covers the 817-lead population below.
//   • OWNER-REPORTED: 817 leads, 124 closed deals, 158 of 397 initially
//     unbooked leads converted by AI text follow-up, $30,000 average revenue
//     per closed deal, $7,000 average profit per closed deal (already net of
//     advertising cost).
//   • CALCULATED: every rate, ratio and total below.
//
// ⚠️ RECORDED BOOKING COUNTS (420 direct, 578 combined) are NOT deduplicated —
// the owner states they may include duplicates and reschedules. They may appear
// ONLY in a methodology note, explicitly labelled as recorded booking counts.
// They must never headline, never be presented as unique appointments or unique
// booked leads, and must never be used as a denominator. Consequently these
// stay UNPUBLISHED until records are deduplicated:
//   70.7% overall lead-to-booking · 51.4% direct funnel booking rate ·
//   $85.69 cost per unique booked appointment · 37.6% additional-appointment
//   lift · 239 remaining unique unbooked leads · any full partition diagram.
//
// The 158 are an exception the owner drew explicitly: they are described as
// LEADS CONVERTED, not merely booking events, so 158 / 397 may be published as
// that cohort's booking conversion rate.
//
// A separate supplied screenshot shows 374 Meta-attributed scheduled
// appointments for a single campaign. That is a different attribution basis
// from the combined funnel/CRM records and is NOT comparable — do not swap one
// for the other, and do not invent an explanation for the gap.
// ─────────────────────────────────────────────────────────────────────────────

/** Supplied Meta Ads Manager screenshot. */
export const AD_SPEND = 49526.68;
export const AD_WINDOW = "1 April – 22 September 2026";

/** Owner-reported. */
export const SOLAR = {
  totalLeads: 817,
  closedDeals: 124,
  /** Leads that did not book through the funnel initially. */
  initiallyUnbooked: 397,
  /** Of those, the ones AI text follow-up converted into bookings. */
  followUpConverted: 158,
  revenuePerDeal: 30000,
  /** Already after advertising cost — never subtract AD_SPEND from this again. */
  profitPerDeal: 7000,
} as const;

/** Recorded booking counts. Methodology note ONLY — not deduplicated. */
export const BOOKING_RECORDS = {
  direct: 420,
  combined: 578,
} as const;

const round1 = (n: number) => Math.round(n * 10) / 10;
const round2 = (n: number) => Math.round(n * 100) / 100;

/** 124 / 817 — owner-reported deals over owner-reported leads. */
export const LEAD_TO_SALE = round1((SOLAR.closedDeals / SOLAR.totalLeads) * 100); // 15.2
/** 158 / 397 — booking conversion within the initially-unbooked cohort. */
export const FOLLOW_UP_RATE = round1((SOLAR.followUpConverted / SOLAR.initiallyUnbooked) * 100); // 39.8
/** $49,526.68 / 817. Assumes 817 counts DISTINCT leads (see the report). */
export const COST_PER_LEAD = round2(AD_SPEND / SOLAR.totalLeads); // 60.62
/** $49,526.68 / 124. */
export const COST_PER_CLOSED_DEAL = round2(AD_SPEND / SOLAR.closedDeals); // 399.41
/** 124 × $30,000 — an estimate from an average, not a reconciled total. */
export const EST_REVENUE = SOLAR.closedDeals * SOLAR.revenuePerDeal; // 3,720,000
/** Estimated revenue ÷ advertising spend. Return on ad spend, NOT ROI, NOT profit. */
export const EST_ROAS = round2(EST_REVENUE / AD_SPEND); // 75.11
/** 124 × $7,000. Already net of advertising — do not subtract AD_SPEND again. */
export const CALC_PROFIT = SOLAR.closedDeals * SOLAR.profitPerDeal; // 868,000

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;
export const EST_REVENUE_SHORT = "$3.72M";
export const AD_SPEND_DISPLAY = "$49,526.68";

/** Shown beside the revenue/ROAS figures. */
export const REVENUE_METHOD =
  "Estimated from 124 owner-reported closed deals at $30,000 average revenue per deal, against $49,526.68 in advertising spend for the associated lead campaign. Revenue is calculated from average deal value, not reconciled transaction totals. ROAS compares revenue with advertising spend; it does not measure profit or account for other operating costs.";

/** Shown beside the profit figure. */
export const PROFIT_METHOD =
  "Calculated from 124 owner-reported closed deals and a reported average profit of $7,000 per deal, already after advertising costs. This is an average-based calculation, not a reconciled accounting total.";

/** Shown beside the AI follow-up figure. */
export const FOLLOW_UP_SOURCE =
  "Owner-reported follow-up cohort: the 397 leads that did not book through the funnel initially.";
