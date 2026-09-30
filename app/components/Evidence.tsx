// Client evidence — the second block on the page, directly under the offer.
// Each figure carries a short scope + source note; nothing here is a projection.
// Portfolio-wide advertising cost sits OUTSIDE the solar grouping (the owner
// reports it across home services, meat processing and med spa accounts); the
// solar and meat-processing figures link to their case studies.
//
// ⚠️ Sources are deliberately generic ("the clients' ad accounts"): which ad
// platform the portfolio figure covers is NOT documented anywhere in this repo,
// so naming Meta here would be unsupported specificity.
import type { CSSProperties } from "react";
import Card from "./Card";
import { AD_WINDOW, FOLLOW_UP_RATE, LEAD_TO_SALE, SOLAR } from "../lib/solarResults";

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";
const ACCENT = "var(--tl-accent-text)";

type Figure = {
  value: string;
  label: string;
  scope: string;
  source: string;
  href?: string;
  linkLabel?: string;
};

const FIGURES: Figure[] = [
  {
    value: "$40–$52",
    label: "per booked appointment",
    scope: "Average advertising cost per booking across our home services, meat processing, and med spa accounts.",
    source: "The clients' ad accounts and booking calendars, counting campaigns we run.",
  },
  {
    value: String(SOLAR.closedDeals),
    label: "closed deals",
    scope: `A Texas solar company: ${SOLAR.closedDeals} deals closed from ${SOLAR.totalLeads} leads — a ${LEAD_TO_SALE}% lead-to-sale rate. Advertising ran ${AD_WINDOW}; the client's sales team closed the deals.`,
    source: "Leads and closed deals owner-reported; the rate is calculated.",
    href: "/work/solar-lead-engine",
    linkLabel: "Solar case study",
  },
  {
    value: `${FOLLOW_UP_RATE}%`,
    label: "of initially unbooked leads converted",
    scope: `Same solar client: AI text follow-up converted ${SOLAR.followUpConverted} of the ${SOLAR.initiallyUnbooked} leads that did not book through the funnel initially.`,
    source: "Owner-reported follow-up cohort; the rate is calculated.",
    href: "/work/solar-lead-engine#speed",
    linkLabel: "See the cohort",
  },
  {
    value: "20",
    label: "paid bookings in week one",
    scope: "A meat-processing farm in New York — the first week of paid ads, with every booking deposit-paid.",
    source: "The farm's booking platform and Square.",
    href: "/work/meat-processing-platform",
    linkLabel: "Meat processing case study",
  },
];

export default function Evidence() {
  return (
    <section id="tl-evidence" aria-labelledby="tl-evidence-h" className="font-body relative isolate w-full overflow-clip bg-page text-ink">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10"><div className="nt-hairline" /></div>
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="nt-px max-w-[44rem]" style={{ "--px": "8px" } as CSSProperties}>
          <span aria-hidden className="nt-kicker" />
          <p className="text-[0.98rem] text-ink/50">Client evidence</p>
          <h2 id="tl-evidence-h" className="mt-4 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-[1.08] tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
            Results from client systems.
          </h2>
          <p className="mt-4 max-w-[40rem] text-[1.02rem] leading-[1.7] text-ink/60">
            Numbers from the ad accounts and production systems we run, with the
            period and source for each.
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {FIGURES.map((f, i) => (
            <Card key={f.label} depth={i % 2 ? 22 : 12} className="h-full" contentClassName="h-full p-6">
              <div className="flex h-full flex-col">
                <dt className="sr-only">{f.label}</dt>
                <dd className="m-0">
                  <span className="nt-figure block text-[1.9rem] font-extrabold leading-none tracking-tight" style={{ fontFamily: DISPLAY, color: ACCENT }}>
                    {f.value}
                  </span>
                  <span className="mt-1.5 block text-[0.95rem] font-semibold text-ink/85" style={{ fontFamily: DISPLAY }}>
                    {f.label}
                  </span>
                  <span className="mt-3 block text-[0.88rem] leading-[1.6] text-ink/60">{f.scope}</span>
                  <span className="mt-3 block text-[0.78rem] leading-snug text-ink/40">Source: {f.source}</span>
                </dd>
                {f.href && (
                  <a
                    href={f.href}
                    className="mt-auto inline-block pt-4 text-[0.88rem] font-semibold text-ink/75 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/60"
                  >
                    {f.linkLabel} →
                  </a>
                )}
              </div>
            </Card>
          ))}
        </dl>

        <p className="mt-8 max-w-[52rem] text-[0.9rem] leading-relaxed text-ink/50">
          We work in <strong className="font-semibold text-ink/70">solar</strong>,{" "}
          <strong className="font-semibold text-ink/70">meat processing</strong>,{" "}
          <strong className="font-semibold text-ink/70">home services</strong> and{" "}
          <strong className="font-semibold text-ink/70">med spas</strong>. Clients are
          anonymized. Results are specific to each client and are not a guarantee.
        </p>
      </div>
    </section>
  );
}
