// Services — organized around the customer lifecycle, not a taxonomy of
// deliverables: attract → convert → coordinate → bill & pay → oversee. Each
// stage names what we implement, links to its service page, and carries only
// figures that trace to a client's ad account or production system.
// This section is the PRIMARY location for the complete capability list; the
// hero and footer deliberately summarise instead of repeating it.
//
// ⚠️ This section says WHAT WE OFFER. It must not also narrate how the stages
// connect — that is the CRM demonstration's only job. Two step-lists have
// already been removed for duplicating it: "What a connected engagement looks
// like" (2026-09-25) and the five-stage ServiceFlow overview (2026-09-26).
// Do not add a third. Process stays separate: that is how a CLIENT works with
// us (discovery → launch), not how their customer moves through their business.
import type { CSSProperties } from "react";
import Image from "next/image";
import Card from "./Card";

type Stage = {
  n: string;
  title: string;
  lead: string;
  items: string[];
  human: string;
  href: string;
  cta: string;
  icon: React.ReactNode;
  // Optional flush illustration at the card's top (fal.ai, Night Telemetry
  // palette) — the lead-gen card carries the funnel render, as before.
  img?: string;
};

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";
const ACCENT = "var(--tl-accent-text)";
const iconCls = "h-6 w-6";
const svg = (d: React.ReactNode) => (
  <svg className={iconCls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d}
  </svg>
);

export const STAGES: Stage[] = [
  {
    n: "1",
    title: "Attract customers",
    lead: "Paid traffic, tracked from the ad click through to the booked appointment.",
    items: [
      "Funnels and landing pages built to convert",
      "Ad creatives and lead-generation campaigns (Meta, Google)",
      "AI GTM engineering — conversion tracking wired from ad to CRM (pixel, CAPI, attribution), AI-generated creatives and copy variants, and AI-run outreach sequences",
      "Social media management automation — drafting, scheduling and publishing from one queue",
    ],
    human: "Offer, budget and brand decisions stay yours.",
    href: "/services/lead-generation",
    cta: "Lead generation & funnels",
    img: "/assets/leadgen-funnel.jpg",
    icon: svg(<><path d="M3 17l5-5 3.5 3.5L20 8" /><path d="M15 8h5v5" /></>),
  },
  {
    n: "2",
    title: "Convert inquiries",
    lead: "Respond to inquiries in minutes and help qualified prospects book an appointment.",
    items: [
      "AI text agents that reply, qualify and book appointments",
      "Inbound AI voice agents that answer calls and schedule",
      "Qualification against your criteria before a slot is offered",
      "Text and email reminders, with self-serve rescheduling",
    ],
    human: "Your team runs the appointment and closes the sale.",
    href: "/services/ai-appointment-booking",
    cta: "AI follow-up & booking",
    icon: svg(<path d="M13 2 4.5 13.5H11L9.5 22 18 10.5h-6.5L13 2Z" />),
  },
  {
    n: "3",
    title: "Coordinate operations",
    lead: "Once a customer says yes, the work to deliver gets scheduled and tracked.",
    items: [
      "Scheduling systems for the fulfillment work — separate from sales bookings",
      "Project boards and task delegation built around your SOPs",
      "Meeting workflows: agendas, notes and follow-up tasks",
      "Customer status updates triggered by stage changes",
    ],
    human: "The work itself and the quality calls stay with your staff.",
    href: "/services/scheduling-and-operations",
    cta: "Scheduling & operations",
    icon: svg(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /><path d="M8.5 15.5l2.5 2.5 4.5-5" /></>),
  },
  {
    n: "4",
    title: "Manage billing & payroll",
    lead: "Invoices generated from the work that was actually recorded, and paid without a phone call.",
    items: [
      "Invoice creation from job data, editable line by line",
      "Invoice delivery by text and email with a payment link",
      "Payment and deposit collection (Square, Stripe)",
      "Payroll workflows running on the same job and hours data",
    ],
    human: "Accounting, tax filing and final sign-off stay with you and your accountant.",
    href: "/services/invoicing-payments-payroll",
    cta: "Invoicing, payments & payroll",
    icon: svg(<><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 14h4" /></>),
  },
  {
    n: "5",
    title: "Oversee everything",
    lead: "A custom CRM that connects the stages above and shows you the whole business.",
    items: [
      "Leads, appointments, schedules, projects, tasks, invoices, payments and payroll in one interface",
      "Approvals and exceptions surfaced to the right person",
      "Built around how your company already operates — not a template",
    ],
    human: "You make the decisions; the CRM makes them visible.",
    href: "/services/custom-crm",
    cta: "Custom CRM & automation",
    icon: svg(<><rect x="2.5" y="4" width="14" height="11" rx="1.5" /><path d="M2.5 12.5h14M7 19h6M9.5 15.5v3.5" /><rect x="17.5" y="9" width="4.5" height="9" rx="1.2" /></>),
  },
];


// One stage. Deliberately compact — tighter padding and type than the rest of
// the site's cards, because five of them sit side by side as a pipeline.
// `connect` draws the hairline + arrow to the next stage. Only the lg
// breakpoint lays these out 3-up, so connectors show there and the caller
// suppresses them at the end of each row.
function StageCard({ s, depth, connect = false }: { s: Stage; depth: number; connect?: boolean }) {
  return (
    <div className="relative h-full">
      <Card depth={depth} className="h-full" contentClassName="h-full">
        {/* Slim banner: at 16/9 this one image forced its whole grid row
            ~270px taller than the cards beside it. */}
        {s.img && (
          <div className="nt-px-window relative aspect-[21/8] w-full overflow-clip bg-[#07090d]">
            <Image
              src={s.img}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 640px) 100vw, 22rem"
              className="object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="bv-6 grid h-7 w-7 shrink-0 place-items-center text-[0.72rem] font-bold tabular-nums"
              style={{ fontFamily: DISPLAY, color: ACCENT, backgroundColor: "color-mix(in oklab, var(--tl-ink) 7%, transparent)" }}
            >
              {s.n}
            </span>
            <span aria-hidden style={{ color: ACCENT }}>{s.icon}</span>
          </div>
          <h3 className="mt-3.5 text-[1.05rem] font-bold leading-tight tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
            {s.title}
          </h3>
          <p className="mt-2 text-[0.86rem] leading-[1.55] text-ink/60">{s.lead}</p>
          <ul className="mt-3.5 flex list-none flex-col gap-1.5 p-0">
            {s.items.map((h) => (
              <li key={h} className="flex items-start gap-2 text-[0.8rem] leading-snug text-ink/70">
                <svg className="mt-[3px] h-3 w-3 shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                  <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {h}
              </li>
            ))}
          </ul>
          <p className="mt-3.5 border-t border-ink/10 pt-3 text-[0.76rem] leading-snug text-ink/45">
            <span className="font-semibold text-ink/60">People:</span> {s.human}
          </p>
          <a
            href={s.href}
            className="mt-auto inline-block pt-4 text-[0.84rem] font-semibold text-ink/75 underline decoration-ink/25 underline-offset-4 transition-colors after:absolute after:inset-0 after:content-[''] hover:text-ink hover:decoration-ink/60"
          >
            {s.cta} →
          </a>
        </div>
      </Card>

      {/* Connector to the next stage — decorative, xl only (the one breakpoint
          where all five cards share a row). */}
      {connect && (
        <span aria-hidden className="pointer-events-none absolute -right-5 top-[2.6rem] hidden w-5 items-center lg:flex">
          <span className="h-px flex-1" style={{ background: "color-mix(in oklab, var(--tl-ink) 22%, transparent)" }} />
          <svg className="h-2.5 w-2.5 shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: "color-mix(in oklab, var(--tl-ink) 32%, transparent)" }}>
            <path d="M3 2.5 7 6l-4 3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </div>
  );
}

export default function Services() {
  return (
    <section id="tl-services" style={{ containIntrinsicSize: "auto 2400px" }} className="cv-auto font-body relative isolate w-full overflow-clip bg-page text-ink">
      <div
        aria-hidden
        className="nt-px-bg pointer-events-none absolute -right-[10%] top-[16%] -z-10 h-[42vw] w-[42vw] rounded-full"
        style={{ background: "radial-gradient(circle closest-side, var(--nt-ambient-blue) 0%, transparent 100%)", "--px": "-110px" } as CSSProperties}
      />
      <div
        aria-hidden
        className="nt-px-bg pointer-events-none absolute -left-[12%] bottom-[6%] -z-10 h-[38vw] w-[38vw] rounded-full"
        style={{ background: "radial-gradient(circle closest-side, var(--nt-ambient-pink) 0%, transparent 100%)", "--px": "-90px" } as CSSProperties}
      />
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10"><div className="nt-hairline" /></div>
      <div className="cv-fade mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 sm:py-28 lg:py-32">
        <div className="nt-px max-w-[46rem]" style={{ "--px": "8px" } as CSSProperties}>
          <span aria-hidden className="nt-kicker" />
          <p className="text-[0.98rem] text-ink/50">What we build</p>
          <h2 className="mt-4 text-[clamp(2.1rem,4.6vw,3.3rem)] font-extrabold leading-[1.06] tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
            Connected services, one per stage of the customer lifecycle.
          </h2>
          <p className="mt-5 max-w-[42rem] text-[1.05rem] leading-[1.7] text-ink/60">
            Start with one service or connect the full workflow. We build around your
            processes, with your team overseeing approvals and delivery.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {STAGES.map((s, i) => (
            <StageCard
              key={s.n}
              s={s}
              depth={i % 2 ? 22 : 12}
              /* 3-up at lg: no arrow off the end of a row, or off the last card. */
              connect={i % 3 !== 2 && i < STAGES.length - 1}
            />
          ))}
        </div>

        <p className="mt-12 text-[0.98rem] text-ink/55">
          Not sure which stage to start with?{" "}
          <a href="#contact" className="font-semibold text-ink/80 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/60">
            Book a discovery call
          </a>{" "}
          and we&rsquo;ll map it with you.
        </p>
      </div>
    </section>
  );
}
