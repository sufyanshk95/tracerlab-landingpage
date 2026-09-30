// Buyer FAQs — the questions a section above did NOT already answer. Anything
// that merely restated the hero, the services list or the CTA steps has been
// removed; HOME_FAQ is also the source for the FAQPage JSON-LD, so the
// structured data always matches what is visible.
//
// "What stays with my team?" is the PRIMARY location for the general
// human-responsibility answer; service pages keep only their own exceptions.
// Only verified business information — no pricing, timelines, support
// commitments, ownership terms or data-handling policies.
import type { CSSProperties } from "react";
import type { FaqItem } from "./JsonLd";

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";

export const HOME_FAQ: FaqItem[] = [
  {
    q: "Do I have to buy everything at once?",
    a: "No. Most clients start with one stage — usually lead generation and AI follow-up, or operations software — and connect more stages later. Each engagement is scoped to your processes on the discovery call.",
  },
  {
    q: "What stays with my team?",
    a: "Physical fulfillment, quality decisions, approvals, pricing exceptions and anything the agents are not scripted for. Automation handles the administrative steps between those: follow-ups, bookings, reminders, status updates, invoice generation and record-keeping.",
  },
  {
    q: "What is the difference between booking an appointment and scheduling the work?",
    a: "Booking is the sales appointment — an AI text or voice agent puts a qualified prospect on your calendar. Scheduling is the operational work needed to fulfil the service after the customer says yes, on a separate calendar with its own capacity rules.",
  },
  {
    q: "What is AI GTM engineering?",
    a: "Engineering the go-to-market pipeline with AI and proper plumbing: conversion tracking wired from the ad platform to your CRM (pixel, server-side events, attribution) so campaigns optimise on real outcomes; ad creatives and copy variants generated and tested with AI; and AI agents that run outreach and follow-up sequences. It is the plumbing and tooling behind lead generation, not a separate product.",
  },
  {
    q: "Does payroll run automatically?",
    a: "No. We build payroll workflows that prepare hours and job data from the same records the CRM already holds, so the payroll run is faster and less error-prone. Disbursement, tax filing and accounting remain with you, your payroll provider and your accountant.",
  },
  {
    q: "What results can I expect?",
    a: "It depends on your market, offer and budget, so we publish what happened for specific clients rather than a promise. Each case study states the figures, where they came from and what they do not establish — the solar engagement and the meat-processing platform are both written up in full. Results are not guaranteed.",
  },
  {
    q: "Which industries do you work with?",
    a: "Solar companies, a meat-processing farm, home-service businesses and med spas. The lifecycle model applies to most service businesses that book appointments and fulfil work afterwards.",
  },
];

export default function Faq({ items = HOME_FAQ, id = "tl-faq" }: { items?: FaqItem[]; id?: string }) {
  return (
    <section id={id} style={{ containIntrinsicSize: "auto 900px" }} className="cv-auto font-body relative isolate w-full overflow-clip bg-page text-ink">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10"><div className="nt-hairline" /></div>
      <div className="cv-fade mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16">
        <div className="nt-px" style={{ "--px": "8px" } as CSSProperties}>
          <span aria-hidden className="nt-kicker" />
          <p className="text-[0.98rem] text-ink/50">Questions buyers ask</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-[1.08] tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
            Frequently asked questions
          </h2>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/55">
            Anything not answered here — pricing, timelines, what we would build for you — is worked out on the discovery call.
          </p>
        </div>
        <div className="flex flex-col">
          {items.map((f) => (
            <details key={f.q} className="group border-t border-ink/10 last:border-b">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[1.05rem] font-semibold text-ink/85 transition-colors hover:text-ink [&::-webkit-details-marker]:hidden" style={{ fontFamily: DISPLAY }}>
                <span>{f.q}</span>
                <svg className="mt-1 h-4 w-4 shrink-0 text-ink/50 transition-transform duration-300 group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="max-w-[46rem] pb-6 text-[0.98rem] leading-[1.7] text-ink/62">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
