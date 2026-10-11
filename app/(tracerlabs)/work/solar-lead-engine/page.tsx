import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../../../components/Footer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import CaseHeader from "../../../components/CaseHeader";
import SolarFollowUp from "../../../components/SolarFollowUp";
import {
  AD_SPEND_DISPLAY,
  AD_WINDOW,
  BOOKING_RECORDS,
  CALC_PROFIT,
  COST_PER_CLOSED_DEAL,
  COST_PER_LEAD,
  EST_REVENUE_SHORT,
  EST_ROAS,
  LEAD_TO_SALE,
  PROFIT_METHOD,
  REVENUE_METHOD,
  SOLAR,
  money,
} from "../../../lib/solarResults";
import { CaseStudyJsonLd } from "../../../components/JsonLd";
import { SITE_URL } from "../../../lib/site";

// Case study: the solar lead engine (client anonymized). Pilot page for the
// "Telemetry" redesign: data is the hero, chrome is quiet. Headings in Archivo
// (Duborics stays in the logo only), no scroll-reveal gating (content visible
// by default), the brand gradient appears exactly once (the hero number), and
// results render as real figures — including an actual chart of the monthly
// 2026-09-24 — figures rebuilt around CLOSED DEALS (supersedes the booking-led
// version). All inputs and derived values come from app/lib/solarResults.ts,
// which is unit-tested; never type a solar figure by hand here.
//
// Sources, kept distinct on the page:
//   • advertising spend + window — supplied Meta Ads Manager screenshot;
//   • leads, closed deals, the 158/397 follow-up cohort, revenue and profit
//     per deal — owner-reported;
//   • every rate, ratio and total — calculated from those inputs.
//
// WITHHELD until booking records are deduplicated (the owner states the 420 and
// 578 counts include duplicates and reschedules): 70.7% overall lead-to-booking,
// 51.4% direct funnel rate, $85.69 per unique booked appointment, 37.6%
// additional-appointment lift, 239 remaining unbooked leads, and any diagram
// that partitions all 817 leads. The recorded counts appear ONLY in the
// methodology section, labelled as recorded booking counts.
//
// Also NOT comparable: a separate screenshot's 374 Meta-attributed scheduled
// appointments. Different attribution basis — do not substitute one for the other.

export const metadata: Metadata = {
  title: "Case Study: A Solar Lead Engine — 124 Closed Deals from 817 Leads",
  description:
    "A connected advertising, funnel and AI follow-up system supported 124 closed deals from 817 owner-reported leads for a Texas solar company. AI text follow-up converted 158 of 397 initially unbooked leads into bookings; the client's sales team closed the deals.",
  alternates: { canonical: "/work/solar-lead-engine" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/work/solar-lead-engine`,
    siteName: "Tracerlabs",
    locale: "en_US",
    title: "Case Study: A Solar Lead Engine | Tracerlabs",
    description:
      "124 closed deals from 817 solar leads. AI text follow-up converted 158 of 397 initially unbooked leads into bookings; the client's sales team closed the deals.",
  },
};

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";
const SECTIONS = [
  { id: "visibility", n: "1", nav: "Flying blind" },
  { id: "lead-quality", n: "2", nav: "Fake numbers" },
  { id: "speed", n: "3", nav: "Cold leads" },
  { id: "show-rate", n: "4", nav: "No-shows" },
  { id: "revenue", n: "5", nav: "Revenue impact" },
  { id: "scope", n: "6", nav: "Sources & limits" },
] as const;

function RunIn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="text-[1.04rem] leading-[1.75] text-ink/62">
      <strong className="font-semibold text-ink">{label} — </strong>
      {children}
    </p>
  );
}

function Result({
  figure,
  children,
  chart,
}: {
  figure: string;
  children: React.ReactNode;
  chart?: React.ReactNode;
}) {
  return (
    <div className="mt-7 border-l-2 pl-6" style={{ borderColor: "var(--tl-accent-text)" }}>
      <div
        className="nt-figure text-[2.1rem] font-bold leading-none tracking-tight"
        style={{ fontFamily: DISPLAY, color: "var(--tl-accent-text)" }}
      >
        {figure}
      </div>
      <p className="mt-3 max-w-[38rem] text-[1.02rem] leading-[1.7] text-ink/70">{children}</p>
      {chart && <div className="mt-6 max-w-[36rem] text-ink">{chart}</div>}
    </div>
  );
}

function Scenario({
  id,
  n,
  title,
  img,
  children,
}: {
  id: string;
  n: string;
  title: string;
  // Decorative scenario illustration (fal.ai, Night Telemetry palette) —
  // rendered in a dark media window like the homepage cards, aria-hidden.
  img?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-ink/10 py-12 sm:py-14">
      <h2
        className="text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-tight text-ink"
        style={{ fontFamily: DISPLAY }}
      >
        <span className="mr-3 text-ink/30">{n}</span>
        {title}
      </h2>
      {img && (
        <div aria-hidden className="relative mt-6 aspect-[21/9] w-full max-w-[42rem] overflow-hidden bg-[#07090d]">
          <Image src={img} alt="" fill sizes="(max-width: 700px) 100vw, 42rem" className="object-cover" loading="lazy" />
        </div>
      )}
      <div className="mt-5 flex max-w-[42rem] flex-col gap-4">{children}</div>
    </section>
  );
}

export default function SolarCaseStudy() {
  return (
    <div>
      <CaseStudyJsonLd
        slug="solar-lead-engine"
        name="Case study: a solar lead engine"
        headline={`Case study: a solar lead engine — ${SOLAR.closedDeals} closed deals from ${SOLAR.totalLeads} leads`}
        description="How a connected advertising, funnel and AI follow-up system supported closed deals for a residential solar company, with the sources and limits of every figure."
        about="Lead generation and AI appointment booking for a residential solar company in Texas"
        dateModified="2026-09-25"
      />
      <CaseHeader />
      <main className="font-body w-full bg-page text-ink">
        {/* Header */}
        <header className="mx-auto w-full max-w-[1060px] px-6 pt-16 sm:px-10 sm:pt-20">
          <p className="text-[0.95rem] text-ink/50">Case study — solar, Texas · measured outcomes</p>
          <h1
            className="mt-4 max-w-[17ch] text-[clamp(2.1rem,5vw,3.4rem)] font-extrabold leading-[1.06] tracking-tight text-ink"
            style={{ fontFamily: DISPLAY }}
          >
            {SOLAR.closedDeals} closed deals from {SOLAR.totalLeads} solar leads.
          </h1>
          <p className="mt-6 max-w-[44rem] text-[1.12rem] leading-[1.7] text-ink/60">
            A connected advertising, funnel, and AI follow-up system supported{" "}
            {SOLAR.closedDeals} closed deals from {SOLAR.totalLeads} leads. AI text
            follow-up converted {SOLAR.followUpConverted} of {SOLAR.initiallyUnbooked}{" "}
            initially unbooked leads into bookings, while the client&rsquo;s sales team
            handled consultations and closed the deals.
          </p>

          {/* Hero figures — the page's single gradient moment */}
          <div className="mt-12 flex flex-wrap items-end gap-x-12 gap-y-8 border-y border-ink/10 py-8">
            <div>
              <div
                className="bg-gradient-to-r from-brand-pink to-brand-blue bg-clip-text text-[clamp(4rem,9vw,6.5rem)] font-extrabold leading-none tracking-tight text-transparent"
                style={{ fontFamily: DISPLAY }}
              >
                {SOLAR.closedDeals}
              </div>
              <div className="mt-2 text-[1rem] text-ink/60">closed deals (owner-reported)</div>
            </div>
            <dl className="flex flex-wrap gap-x-10 gap-y-5 pb-1">
              {[
                [String(SOLAR.totalLeads), "leads (owner-reported)"],
                [String(SOLAR.followUpConverted), "initially unbooked leads converted through AI follow-up"],
                [`${LEAD_TO_SALE}%`, "lead-to-sale conversion (calculated)"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="text-[1.6rem] font-bold tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
                      {v}
                    </span>
                    <span className="mt-1 block max-w-[13rem] text-[0.88rem] leading-snug text-ink/55">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>


          <p className="mt-5 max-w-[44rem] text-[0.85rem] leading-relaxed text-ink/45">
            Lead and sales figures are owner-reported; advertising spend and its reporting
            window come from the client&rsquo;s Meta Ads Manager. Rates are calculated from
            those inputs. Closed deals were produced by the whole system — advertising,
            funnel, follow-up and the client&rsquo;s sales team — not by the AI agent alone.
          </p>
        </header>

        {/* Body: sticky index + content */}
        <div className="mx-auto grid w-full max-w-[1060px] grid-cols-1 gap-x-14 px-6 pb-8 pt-4 sm:px-10 lg:grid-cols-[180px_1fr]">
          <nav aria-label="Case study sections" className="hidden lg:block">
            <ol className="sticky top-28 flex list-none flex-col gap-3 p-0 pt-14">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="group flex items-baseline gap-2.5 text-[0.92rem] text-ink/50 transition-colors hover:text-ink"
                  >
                    <span className="text-[0.8rem] text-ink/30 group-hover:text-ink/50">{s.n}</span>
                    {s.nav}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0 pt-2">
            <Scenario id="visibility" n="1" title="Flying blind" img="/assets/work-solar-visibility.jpg">
              <RunIn label="The problem">
                You can&apos;t fix a funnel you can&apos;t see. The ad platform reported
                clicks, the CRM showed leads, and nothing explained the gap between
                them. Which step lost people? Why? Nobody could say — so every
                &ldquo;optimization&rdquo; would have been a guess.
              </RunIn>
              <RunIn label="What we did">
                Before changing anything, we built an analytics dashboard and started
                logging everything: every page view, every funnel step, every
                drop-off and disqualification reason, tied back to ad spend. The
                first thing the data exposed: nearly half of paid clicks never even
                landed — one April week bought 223 clicks and only 116 landing
                views. People clicked the ad and gave up before the page finished
                loading. So the first fix wasn&apos;t copy or targeting. It was a
                page-speed rebuild: first paint cut from 5.5s to 0.8s, Lighthouse
                score from 55 to 80.
              </RunIn>
              <Result figure="5.5s → 0.8s">
                First paint after the rebuild. The click-to-land drop-off is gone —
                landings now track ad clicks one-for-one instead of losing half.
                Every fix below was found the same way: measure first, then solve
                the problem the data actually shows.
              </Result>
            </Scenario>

            <Scenario id="lead-quality" n="2" title="Fake numbers" img="/assets/work-solar-verify.jpg">
              <RunIn label="The problem">
                Meta delivered volume, but the sales reps kept coming back with the
                same report: &ldquo;the number doesn&apos;t work&rdquo;, &ldquo;wrong
                number&rdquo;. We measured it before fixing it — across every lead
                number from a 14-day window, roughly 1 in 5 wasn&apos;t a real mobile
                phone: invalid numbers, landlines, and burner VoIP numbers. Five of
                them were literally Google Voice.
              </RunIn>
              <RunIn label="What we did">
                A simple two-layer phone gate, inline on the contact form: a carrier
                line-type screen that rejects burners and landlines before a single
                SMS is spent, then a 6-digit SMS code the lead types back. A number
                that never verifies never becomes a lead — not in the CRM, not in an
                admin text, nowhere.
              </RunIn>
              <Result figure="1 in 5 → 0">
                Unverified numbers reaching the CRM. New leads must complete SMS
                verification before entering the CRM — the wrong-number call reports
                stopped, and the ad account optimizes on verified submissions rather
                than fake form fills.
              </Result>
            </Scenario>

            <Scenario id="speed" n="3" title="Cold leads" img="/assets/work-solar-speed.jpg">
              <RunIn label="The problem">
                Solar leads decay by the hour. Leads waited hours — sometimes days —
                for a callback, and by then they&apos;d filled out three
                competitors&apos; forms. Hundreds of leads never booked a time through
                the funnel itself.
              </RunIn>
              <RunIn label="What we did">
                An AI texting agent that opens the conversation within about two
                minutes of the form submit — it answers first questions, coordinates
                a time, and books the consultation straight into the sales calendar,
                around the clock. No lead sits in an inbox waiting for the office to
                open.
              </RunIn>
              <Result figure="The leads the funnel had already lost">
                Instead of writing those leads off, the agent reopened the conversation:
                it answered their first questions, found a time that worked and booked it
                straight into the sales calendar. The client&rsquo;s sales team ran the
                consultations that followed.
              </Result>
              <SolarFollowUp />
            </Scenario>

            <Scenario id="show-rate" n="4" title="No-shows" img="/assets/work-solar-shows.jpg">
              <RunIn label="The problem">
                People book in good faith, then life happens — plans change, work
                runs late, and a sales rep burns an hour on someone who was never
                going to pick up. Every unattended slot is ad spend and rep time
                that produced nothing.
              </RunIn>
              <RunIn label="What we did">
                A confirmation agent that reminds every prospect before their
                appointment — and when something has changed, reschedules them right
                there in the chat. The rep&apos;s slot gets freed and rebooked
                instead of silently wasted.
              </RunIn>
              <Result figure="Reminders and self-serve rescheduling">
                Every prospect is reminded before their appointment, and a change of
                plan becomes a reschedule in the same thread instead of an empty slot.
                We publish no attendance or show-rate figure for this engagement:
                attendance needs its own records, and a booking that was not marked
                as a no-show is not evidence that someone attended.
              </Result>
            </Scenario>

            {/* Closing */}
            <section className="border-t border-ink/10 py-12 sm:py-14">
              <h2
                className="text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-tight text-ink"
                style={{ fontFamily: DISPLAY }}
              >
                One system, from ad click to closed deal
              </h2>
              <p className="mt-5 max-w-[42rem] text-[1.04rem] leading-[1.75] text-ink/62">
                {SOLAR.totalLeads} leads — every recent one SMS-verified — produced{" "}
                {SOLAR.closedDeals} closed deals, a {LEAD_TO_SALE}% lead-to-sale rate. The ads,
                the funnel, the verification gate, the texting agent and the confirmation agent
                run as one system, and the client&rsquo;s sales team closed the business: verified
                leads make the ads smarter, fast follow-up catches the leads the funnel missed,
                and reminders protect the slots that get booked.
              </p>
            </section>

            {/* Estimated revenue impact */}
            <section id="revenue" className="scroll-mt-28 border-t border-ink/10 py-12 sm:py-14">
              <h2
                className="text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-tight text-ink"
                style={{ fontFamily: DISPLAY }}
              >
                <span className="mr-3 text-ink/30">5</span>
                Estimated revenue impact
              </h2>
              <dl className="mt-7 flex max-w-[42rem] flex-wrap gap-x-10 gap-y-6 border-l-2 pl-6" style={{ borderColor: "var(--tl-accent-text)" }}>
                {[
                  [EST_REVENUE_SHORT, "estimated revenue"],
                  [`${EST_ROAS}×`, "estimated ROAS"],
                  [`$${COST_PER_CLOSED_DEAL}`, "advertising cost per closed deal"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="sr-only">{l}</dt>
                    <dd>
                      <span
                        className="nt-figure block text-[2.1rem] font-bold leading-none tracking-tight"
                        style={{ fontFamily: DISPLAY, color: "var(--tl-accent-text)" }}
                      >
                        {v}
                      </span>
                      <span className="mt-2 block max-w-[13rem] text-[0.9rem] leading-snug text-ink/60">{l}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 max-w-[42rem] text-[0.92rem] leading-[1.7] text-ink/50">
                {REVENUE_METHOD}
              </p>
            </section>

            {/* Profit — kept separate from revenue and ROAS */}
            <section className="border-t border-ink/10 py-12 sm:py-14">
              <h2
                className="text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-tight text-ink"
                style={{ fontFamily: DISPLAY }}
              >
                Calculated profit after advertising
              </h2>
              <div className="mt-7 max-w-[42rem] border-l-2 pl-6" style={{ borderColor: "var(--tl-accent-text)" }}>
                <div
                  className="nt-figure text-[2.1rem] font-bold leading-none tracking-tight"
                  style={{ fontFamily: DISPLAY, color: "var(--tl-accent-text)" }}
                >
                  {money(CALC_PROFIT)}
                </div>
                <p className="mt-3 text-[1rem] leading-[1.7] text-ink/70">calculated profit after advertising</p>
              </div>
              <p className="mt-6 max-w-[42rem] text-[0.92rem] leading-[1.7] text-ink/50">{PROFIT_METHOD}</p>
            </section>

            {/* Scope, definitions, people, limitations */}
            <section id="scope" className="scroll-mt-28 border-t border-ink/10 py-12 sm:py-14">
              <h2
                className="text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-tight text-ink"
                style={{ fontFamily: DISPLAY }}
              >
                <span className="mr-3 text-ink/30">6</span>
                Sources, definitions and limits
              </h2>
              <dl className="mt-6 flex max-w-[42rem] flex-col gap-5">
                {[
                  ["Advertising spend", `${AD_SPEND_DISPLAY} over ${AD_WINDOW}, from the client's Meta Ads Manager. The owner confirms this spend covers the ${SOLAR.totalLeads}-lead population — ${"$"}${COST_PER_LEAD} per lead.`],
                  ["Owner-reported", `Leads (${SOLAR.totalLeads}), closed deals (${SOLAR.closedDeals}), the follow-up cohort (${SOLAR.followUpConverted} of ${SOLAR.initiallyUnbooked}), and averages of $30,000 revenue and $7,000 profit per closed deal. Not independently reconciled.`],
                  ["Calculated", "Every rate and total here — lead-to-sale, follow-up conversion, cost per lead and per closed deal, estimated revenue, ROAS and profit — is derived from the inputs above."],
                  ["Estimates", "Revenue and profit are calculated from average deal value, not reconciled transaction totals. ROAS compares revenue with advertising spend and does not measure profit. Results are specific to this client, market and offer, and are not a guarantee."],
                  ["Recorded booking counts", `The funnel recorded ${BOOKING_RECORDS.direct} direct bookings and ${BOOKING_RECORDS.combined} combined booking records. These may include duplicates and reschedules, so they are not presented as unique appointments or unique booked leads, and no rate or cost figure here uses them as a denominator.`],
                  ["Attribution", "A separate campaign view in Meta shows 374 Meta-attributed scheduled appointments — a different attribution basis from the combined funnel and CRM records, and not directly comparable with them."],
                  ["Not established", "Attendance or show rates; whether the reported revenue is contracted or collected; whether every closed deal fell inside the advertising reporting window; and deduplicated booking totals."],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-1 gap-1 sm:grid-cols-[12rem_1fr] sm:gap-4">
                    <dt className="text-[0.95rem] font-semibold text-ink" style={{ fontFamily: DISPLAY }}>{k}</dt>
                    <dd className="m-0 text-[0.98rem] leading-[1.7] text-ink/62">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[0.92rem] text-ink/50">
                Related services:{" "}
                <a href="/services/lead-generation" className="font-semibold text-ink/70 underline decoration-ink/25 underline-offset-4 hover:text-ink">lead generation &amp; funnels</a>
                {" · "}
                <a href="/services/ai-appointment-booking" className="font-semibold text-ink/70 underline decoration-ink/25 underline-offset-4 hover:text-ink">AI follow-up &amp; appointment booking</a>
              </p>
            </section>

            {/* CTA — the page's one chamfered panel */}
            <section className="pb-20">
              <Card bevel={16} contentClassName="items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                <div>
                  <h2
                    className="text-[1.4rem] font-bold leading-tight tracking-tight text-ink"
                    style={{ fontFamily: DISPLAY }}
                  >
                    Have the same problems?
                  </h2>
                  <p className="mt-2 max-w-[30rem] text-[0.95rem] text-ink/55">
                    Fake numbers, cold leads, and no-shows are measurable and
                    fixable. Start with a discovery call.
                  </p>
                </div>
                <Button href="/#contact" variant="primary">
                  Book a discovery call
                </Button>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
