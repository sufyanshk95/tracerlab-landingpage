import type { ServiceContent } from "../../../components/service/ServicePage";
import { SITE_URL } from "../../../lib/site";

const content: ServiceContent = {
  slug: "lead-generation",
  eyebrow: "Attract customers",
  title: "Lead generation, funnels and ad creatives for service businesses",
  metaDescription:
    "Paid campaigns, funnels and landing pages, ad creatives and conversion tracking wired from the ad through to your CRM — for solar, home services, meat processing and med spas. $40–$52 average advertising cost per booked appointment across home services, meat processing, and med spa accounts.",
  intro:
    "We run the ads, build the funnel, and wire the tracking so every lead is followed from the click to the booked appointment. Lead generation is where most clients start; it connects directly to the AI follow-up that books the appointment.",
  who: [
    "Solar companies, home-service businesses, med spas and processors that book appointments or slots before doing the work.",
    "Owners who have paid for leads before and could not tell which ones became customers.",
    "Businesses with a closer or a booking calendar ready to receive appointments — we generate the demand, your team runs the appointment.",
  ],
  problem: {
    heading: "Click reports are not customers",
    body: [
      "Ad platforms report clicks and form fills. Businesses need booked appointments. Between the two sit the common problems we investigate: pages that lose half the clicks before they load, fake or unreachable phone numbers, and leads that wait hours for a call back.",
      "On one solar account we measured the first two before changing anything: an April week bought 223 clicks and only 116 landing views, and roughly 1 in 5 lead numbers over a 14-day window was invalid, a landline or a burner. On top of that, around half the leads never booked a time through the funnel itself.",
    ],
  },
  implement: [
    { name: "Funnels and landing pages", detail: "Built for speed and one action. On the solar engine a page-speed rebuild cut first paint from 5.5 s to 0.8 s and removed the click-to-land drop-off." },
    { name: "Ad creatives and campaigns", detail: "Meta and Google campaigns run end to end: creatives (including AI-generated video ads from our Remotion + fal.ai pipeline), targeting, budgets and ongoing optimisation against booked appointments rather than clicks." },
    { name: "Lead verification", detail: "The form screens phone numbers and requires SMS verification before submission — a carrier line-type check that rejects landlines and burner VoIP numbers, then a 6-digit code the lead types back." },
    { name: "AI GTM engineering", detail: "The plumbing behind the funnel: pixel and server-side conversion events (Meta Pixel + CAPI are in production at a meat-processing farm), attribution from ad through to the CRM record, AI-generated copy variants, and AI agents running outreach sequences." },
    { name: "Social media management automation", detail: "Drafting, scheduling and publishing from one queue. We run this on our own channels today; client scope is set on the discovery call." },
    { name: "Reporting you can act on", detail: "A dashboard that logs every page view, funnel step, drop-off and disqualification reason, tied back to ad spend." },
  ],
  connects: [
    { to: "AI follow-up & booking", how: "Every verified lead is handed to an AI text agent within minutes, which qualifies and books the sales appointment.", href: "/services/ai-appointment-booking" },
    { to: "Custom CRM", how: "Leads, their source campaign and their follow-up thread land in the CRM, so the ad account can optimise on real outcomes.", href: "/services/custom-crm" },
    { to: "Scheduling & operations", how: "Once a customer says yes, the operational work is scheduled on a separate calendar from the sales appointment.", href: "/services/scheduling-and-operations" },
  ],
  evidence: [
    {
      kind: "measured",
      title: "$40–$52 advertising cost per booked appointment",
      body: "Average across our home services, meat processing, and med spa accounts — from the clients' ad accounts and booking calendars, counting campaigns we run. A separate portfolio figure, not a solar result.",
    },
    {
      kind: "measured",
      title: "A Texas solar company: 124 closed deals from 817 leads",
      body: "$49,526.68 of advertising, 1 April – 22 September 2026 — $60.62 per lead and $399.41 per closed deal. Leads and closed deals are owner-reported; the client's sales team closed them. The case study carries the full methodology and its limits.",
      href: "/work/solar-lead-engine",
      linkLabel: "Read the solar case study",
    },
  ],
  human: [
    "Offer, pricing and budget decisions are yours — we build and run against them.",
    "Your team runs the sales appointment and closes. We generate the lead and book the slot.",
    "Anything your industry's advertising rules require of you stays your responsibility.",
  ],
  faq: [
    { q: "Is $40–$52 the cost per lead?", a: "No — it is advertising spend divided by appointments booked, not by leads, averaged across our home services, meat processing and med spa accounts. The solar case study reports its own client-specific figures separately ($60.62 per lead and $399.41 per closed deal). Neither is a guarantee for a new account." },
    { q: "Do you run the campaigns, or do I?", a: "We run them end to end — creatives, targeting, budget management and the tracking behind them. Where the account and billing sit is agreed on the discovery call." },
    { q: "Which platforms?", a: "Meta and Google for paid traffic. We build the landing pages and funnels ourselves and wire the tracking through to your CRM, so a lead can be followed from the ad it came from to the appointment it became." },
    { q: "How soon do leads start?", a: "Leads can arrive once the funnel and tracking are live, with the early weeks spent tuning targeting and scripts. We do not promise a volume or a date — that depends on your market, offer and budget." },
  ],
  related: [
    { label: "AI follow-up & appointment booking", href: "/services/ai-appointment-booking" },
    { label: "Solar case study", href: "/work/solar-lead-engine" },
    { label: "Growth Audit for home-service owners", href: "/growth-audit" },
  ],
  ld: {
    name: "Lead generation and funnels",
    description: "Paid ad campaigns, ad creatives, landing pages and funnels, lead verification and conversion tracking wired from ad to CRM.",
    url: `${SITE_URL}/services/lead-generation`,
  },
};
export default content;
