// Closing CTA — the conversion moment. Primary action: book the discovery
// call DIRECTLY on the calendar (Cal.com). The in-browser voice agent is an
// optional demonstration of the kind of agent we build; it books the same
// call. Server component: reads env to decide whether voice is provisioned.
import type { CSSProperties } from "react";
import VoiceWidget from "./VoiceWidget";
import Button from "./Button";
import Card from "./Card";
import { BOOKING_URL, CONTACT_EMAIL } from "../lib/site";

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";

const STEPS = [
  { n: "1", t: "Book the call", d: "Pick a time on our calendar. It's a discovery call, not a pitch." },
  { n: "2", t: "We map your processes", d: "How leads, bookings, scheduling and billing move through your business today, and where they leak." },
  { n: "3", t: "You get a scoped plan", d: "Which stage to start with, what stays with your people, and what we'd build first." },
];

export default function Cta() {
  const voiceEnabled = Boolean(process.env.RETELL_API_KEY && process.env.RETELL_AGENT_ID);

  return (
    <section id="tl-cta" style={{ containIntrinsicSize: "auto 1300px" }} className="cv-auto font-body relative isolate w-full overflow-clip bg-page text-ink">
      <div
        aria-hidden
        className="nt-px-bg pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[46vw] w-[58vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle closest-side, var(--nt-ambient-pink) 0%, var(--nt-ambient-blue) 55%, transparent 100%)", "--px": "-80px" } as CSSProperties}
      />
      {/* the scene returns — closing bookend to the hero's grid floor */}
      <div aria-hidden className="nt-horizon -z-10" />
      <div aria-hidden className="nt-gridfloor -z-10" />

      {/* scroll anchor for #contact links (hero CTA, nav, nested pages) */}
      <div id="contact" aria-hidden />

      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10"><div className="nt-hairline" /></div>
      <div className="cv-fade mx-auto flex w-full max-w-[820px] flex-col items-center px-6 py-20 text-center sm:px-10 sm:py-28 lg:py-36">
        <span aria-hidden className="nt-kicker" style={{ marginLeft: "auto", marginRight: "auto" }} />
        <h2 className="max-w-[18ch] text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
          Book a discovery call.
        </h2>
        <p className="mt-5 max-w-[36rem] text-[1.05rem] leading-[1.7] text-ink/60">
          A free call where we understand how your business runs and uncover the
          bottlenecks — in lead flow, follow-up, scheduling or billing — before
          recommending anything.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3">
          <Button href={BOOKING_URL} external variant="primary" size="lg" data-track="book_call_click" data-track-location="cta">
            Book a discovery call
          </Button>
          <p className="text-[0.88rem] text-ink/50">
            Or email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-ink/75 underline decoration-ink/25 underline-offset-4 hover:text-ink">
              {CONTACT_EMAIL}
            </a>
            . We reply within a day.
          </p>
        </div>

        {/* Optional demonstration: the voice agent books the same call. Always
            rendered — when Retell isn't provisioned the widget degrades to its
            own booking fallback with a note, so the section never silently
            disappears because an env var lapsed. */}
        <div className="mt-16 w-full border-t border-ink/10 pt-12">
          <p className="text-[0.9rem] font-semibold text-ink/45" style={{ fontFamily: DISPLAY }}>
            Optional: try one of our AI voice agents
          </p>
          <p className="mx-auto mt-2 max-w-[34rem] text-[0.95rem] leading-relaxed text-ink/55">
            This is a working demonstration of the inbound voice agents we build. It runs
            a two-minute discovery conversation in your browser and can book the same call
            on our calendar. Microphone access is required; nothing is recorded until you start it.
          </p>
          <div className="relative mt-10">
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-[64px] -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/10" />
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-[64px] -z-10 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/[0.06]" />
            <VoiceWidget voiceEnabled={voiceEnabled} calcomUrl={BOOKING_URL} />
          </div>
        </div>

        {/* What happens next — three steps on one thread */}
        <p className="mt-16 self-start text-[0.9rem] font-semibold text-ink/45" style={{ fontFamily: DISPLAY }}>
          What happens next
        </p>
        <div className="relative mt-5 w-full">
          <div aria-hidden className="nt-hairline absolute left-0 right-0 top-[2.6rem] hidden sm:block" />
          <ol className="grid w-full list-none grid-cols-1 gap-4 p-0 text-left sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.n}>
                <Card bevel={10} depth={i === 1 ? 18 : 10} className="h-full" contentClassName="p-5 pt-6">
                  <span aria-hidden className="nt-ghost-num" style={{ fontFamily: DISPLAY, fontSize: "3.2rem" }}>{s.n}</span>
                  <h3 className="mt-1 text-[1.05rem] font-bold leading-tight tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>{s.t}</h3>
                  <p className="mt-2 max-w-[16rem] text-[0.88rem] leading-relaxed text-ink/55">{s.d}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
