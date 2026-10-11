"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CREW, CUSTOMER, FOLLOW_THROUGH, INVOICE, JOB, SUPPLIER, STAGES, TASKS, money, stageIndex } from "../lib/crmDemo";

// The CRM demonstration: one customer and one job followed through six stages
// inside a persistent frame (summary bar → navigator → workspace → activity
// feed), so the visitor watches records connect rather than reading a list.
//
// EVERYTHING IS FICTIONAL and no control performs a real action — see
// app/lib/crmDemo.ts.
//
// Accessibility: the navigator is a real tablist (arrow keys, Home/End,
// aria-selected), only the active panel is mounted so no hidden control can
// take focus, and the per-stage sentence lives in the navigator — which is
// server-rendered — so the explanation survives with JS off. Panel entrance
// uses an `animate-` class, which the global reduced-motion rule disables, and
// the walkthrough never starts on its own.
const PLAY_MS = 4200;

const ACCENT = "var(--tl-accent-text)";
const DISPLAY = "var(--font-archivo), system-ui, sans-serif";

function Chip({ tone = "muted", children }: { tone?: "accent" | "pink" | "muted" | "good"; children: React.ReactNode }) {
  const color = tone === "accent" ? ACCENT : tone === "pink" ? "#e7028d" : tone === "good" ? ACCENT : "var(--tl-ink)";
  return (
    <span
      className="bv-6 inline-flex shrink-0 items-center gap-1.5 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide"
      style={{ color, backgroundColor: "color-mix(in oklab, var(--tl-ink) 7%, transparent)" }}
    >
      {tone !== "muted" && <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />}
      {children}
    </span>
  );
}

function Panel({ label, children, note }: { label: string; children: React.ReactNode; note?: string }) {
  return (
    <div className="bv-6 border border-ink/10 bg-ink/[0.03] p-3.5">
      <div className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink/40">{label}</div>
      <div className="mt-2.5">{children}</div>
      {note && <p className="mt-3 border-t border-ink/10 pt-2.5 text-[0.72rem] leading-snug text-ink/45">{note}</p>}
    </div>
  );
}

function Row({ k, v, tone }: { k: string; v: string; tone?: "accent" | "pink" | "muted" | "good" }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 py-1 text-[0.8rem]">
      <span className="text-ink/50">{k}</span>
      {tone ? <Chip tone={tone}>{v}</Chip> : <span className="font-medium text-ink/85">{v}</span>}
    </div>
  );
}

// Where each status begins, looked up by id. "Paid" must never appear before
// the payment stage, and "Complete" not before the work is done.
const AT_BOOKING = stageIndex("booking");
const AT_APPROVED = stageIndex("scheduled");
const AT_COMPLETE = stageIndex("tasks");
const AT_PAID = stageIndex("payment");

/** The customer/job summary that stays put across every stage. */
function Summary({ stage }: { stage: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-ink/10 px-4 py-3">
      <span
        aria-hidden
        className="bv-6 grid h-9 w-9 shrink-0 place-items-center text-[0.72rem] font-bold text-white"
        style={{ fontFamily: DISPLAY, background: "linear-gradient(135deg, #e7028d, #056afc)" }}
      >
        {CUSTOMER.initials}
      </span>
      <span className="min-w-0">
        <span className="block text-[0.9rem] font-bold leading-tight text-ink" style={{ fontFamily: DISPLAY }}>
          {CUSTOMER.name}
        </span>
        <span className="block text-[0.72rem] text-ink/45">
          {CUSTOMER.service} · {CUSTOMER.area}
        </span>
      </span>
      <span className="ml-auto flex flex-wrap items-center gap-1.5">
        <Chip tone="muted">{stage === 0 ? CUSTOMER.ref : JOB.ref}</Chip>
        {stage >= AT_BOOKING && (
          <Chip tone="accent">
            {stage >= AT_COMPLETE ? "Work complete" : stage >= AT_APPROVED ? "Approved" : "Appointment booked"}
          </Chip>
        )}
        {stage >= AT_PAID && <Chip tone="good">Paid</Chip>}
      </span>
    </div>
  );
}

// Panels are selected by stage ID, never by array index, so the walkthrough can
// be reordered in crmDemo.ts without silently showing the wrong screen.
function Workspace({ id }: { id: string }) {
  if (id === "inquiry")
    return (
      <Panel label="New lead">
        <div className="text-[0.95rem] font-bold text-ink" style={{ fontFamily: DISPLAY }}>{CUSTOMER.name}</div>
        <div className="mt-2 border-t border-ink/10 pt-1">
          <Row k="Service requested" v={CUSTOMER.service} />
          <Row k="Source" v={CUSTOMER.source} />
          <Row k="Status" v="New" tone="pink" />
        </div>
      </Panel>
    );

  if (id === "booking")
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <Panel label="AI text agent · example conversation">
          <div className="flex flex-col gap-1.5">
            {[
              { who: "ai", text: "Hi Dana — this is Ridgeline Air. Want us to take a look at the AC?" },
              { who: "them", text: "Yes please, sooner the better." },
              { who: "ai", text: "I can do Thu 2:00 PM or Fri 10:00 AM for a free estimate." },
              { who: "them", text: "Thursday works." },
            ].map((m, i) => (
              <span
                key={i}
                className={`bv-6 max-w-[88%] px-2.5 py-1.5 text-[0.75rem] leading-snug ${
                  m.who === "ai" ? "self-end bg-ink/[0.07] text-ink/80" : "self-start bg-brand-pink/15 text-ink/80"
                }`}
              >
                {m.text}
              </span>
            ))}
          </div>
        </Panel>
        <Panel label="Customer record" note="An example exchange. Not every inquiry books — unanswered leads stay in follow-up.">
          <Row k="Sales appointment" v={JOB.appointment} tone="accent" />
          <Row k="Calendar" v="Sales — not the work schedule" />
          <Row k="Status" v="Appointment booked" tone="accent" />
        </Panel>
      </div>
    );

  if (id === "scheduled")
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <Panel label="After the estimate visit">
          <Row k="Quote" v={money(INVOICE.total)} />
          <Row k="Customer approves the job" v="Approved" tone="accent" />
          <div className="mt-2 flex items-center gap-2 border-t border-ink/10 pt-2 text-[0.72rem] text-ink/45">
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            creates the job
          </div>
        </Panel>
        <Panel label="Fulfillment calendar" note="A separate calendar from the sales appointment — this one carries your crew capacity. Who fills the slot is decided next.">
          <div className="text-[0.95rem] font-bold text-ink" style={{ fontFamily: DISPLAY }}>{JOB.ref}</div>
          <div className="mt-1 text-[0.78rem] text-ink/60">{JOB.title}</div>
          <div className="mt-2 border-t border-ink/10 pt-1">
            <Row k="Work slot" v={JOB.workSlot} tone="accent" />
            <Row k="Crew" v="Not yet assigned" />
          </div>
        </Panel>
      </div>
    );

  if (id === "team")
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <Panel label="Scheduling · crew match" note="Matched on skills and availability. Your staff do the work — the system only coordinates it.">
          <Row k="Crew" v={`${CREW.name} · ${CREW.size}`} tone="accent" />
          <Row k="Skills" v={CREW.skill} />
          <Row k="Work slot" v={JOB.workSlot} />
        </Panel>
        <Panel label="Customer notified">
          <span className="bv-6 block max-w-[92%] bg-ink/[0.07] px-2.5 py-1.5 text-[0.75rem] leading-snug text-ink/80">
            You&rsquo;re booked in for the {CREW.notified} — {JOB.ref}. We&rsquo;ll text when the crew is on the way.
          </span>
          <div className="mt-2 border-t border-ink/10 pt-1">
            <Row k="Triggered by" v="Crew assignment" />
            <Row k="Sent" v="Text message" tone="accent" />
          </div>
        </Panel>
      </div>
    );

  if (id === "suppliers")
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <Panel label={`Purchase order ${SUPPLIER.po}`}>
          <Row k="Supplier" v={SUPPLIER.name} />
          <Row k="Item" v={SUPPLIER.item} />
          <Row k="Status" v={SUPPLIER.status} tone="accent" />
        </Panel>
        <Panel label="Tracked against the job" note="Raised from what the job already records — no second system to keep in step.">
          <Row k="Job" v={JOB.ref} />
          <Row k="Crew" v={CREW.name} />
          <Row k="Parts" v="On order" tone="pink" />
        </Panel>
      </div>
    );

  if (id === "tasks")
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <Panel label={`Project board · ${JOB.ref}`} note="Your crew does the physical work. The system records each step and notifies the customer.">
          <ul className="flex list-none flex-col gap-1.5 p-0">
            {TASKS.map((t) => (
              <li key={t.name} className="bv-6 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 bg-ink/[0.04] px-2.5 py-1.5 text-[0.78rem]">
                <span className="text-ink/80">{t.name}</span>
                <span className="flex items-center gap-2">
                  <span className="text-[0.68rem] text-ink/40">{t.owner}</span>
                  <Chip tone="accent">{t.state}</Chip>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel label="Customer notification">
          <span className="bv-6 block max-w-[92%] bg-ink/[0.07] px-2.5 py-1.5 text-[0.75rem] leading-snug text-ink/80">
            All finished on {JOB.ref} — thanks for having us. Your invoice will follow shortly.
          </span>
          <div className="mt-2 border-t border-ink/10 pt-1">
            <Row k="Triggered by" v="Final task signed off" />
            <Row k="Job status" v="Complete" tone="accent" />
          </div>
        </Panel>
      </div>
    );

  if (id === "invoice")
    return (
      <Panel label={`Invoice ${INVOICE.ref} · from ${JOB.ref}`}>
        <ul className="flex list-none flex-col gap-0 p-0">
          {INVOICE.lines.map((l) => (
            <li key={l.label} className="flex items-baseline justify-between gap-3 border-b border-ink/10 py-1.5 text-[0.8rem]">
              <span className="text-ink/65">{l.label}</span>
              <span className="tabular-nums font-medium text-ink/85">{money(l.amount)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2.5 flex items-baseline justify-between gap-3">
          <span className="text-[0.85rem] font-bold text-ink" style={{ fontFamily: DISPLAY }}>Total</span>
          <span className="nt-figure text-[1.15rem] font-bold tabular-nums" style={{ fontFamily: DISPLAY, color: ACCENT }}>
            {money(INVOICE.total)}
          </span>
        </div>
        <div className="mt-2 border-t border-ink/10 pt-1">
          <Row k="Delivery" v={INVOICE.delivery} tone="accent" />
          <Row k="Status" v="Awaiting payment" tone="pink" />
        </div>
      </Panel>
    );

  if (id === "payment")
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <Panel label={`Invoice ${INVOICE.ref}`}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="nt-figure text-[1.35rem] font-bold tabular-nums" style={{ fontFamily: DISPLAY, color: ACCENT }}>
              {money(INVOICE.total)}
            </span>
            <Chip tone="good">Paid</Chip>
          </div>
          <div className="mt-2 border-t border-ink/10 pt-1">
            <Row k="Method" v={INVOICE.payment} />
            <Row k="Balance" v={money(0)} />
          </div>
        </Panel>
        <Panel label="Against the job">
          <Row k="Job" v={`${JOB.ref} · complete`} tone="accent" />
          <Row k="Invoice" v={`${INVOICE.ref} · paid`} tone="good" />
          <Row k="Next" v="Review & referral" tone="accent" />
        </Panel>
      </div>
    );

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Panel label="After fulfilment" note="Requests only — no review or rating is shown here until a customer actually leaves one.">
        <Row k="Review request" v={FOLLOW_THROUGH.review} tone="accent" />
        <Row k="Referral" v={FOLLOW_THROUGH.referral} tone="accent" />
        <Row k="Sent via" v="Text and email" />
      </Panel>
      <Panel
        label="Owner's overview"
        note="Payroll follows its own schedule using the relevant job and hours records — a customer payment does not trigger it."
      >
        <Row k="Customer" v={CUSTOMER.name} />
        <Row k="Job" v={`${JOB.ref} · complete`} tone="accent" />
        <Row k="Crew" v={CREW.name} />
        <Row k="Tasks" v={`${TASKS.length} recorded`} />
        <Row k="Invoice" v={`${INVOICE.ref} · paid`} tone="good" />
        <Row k="Parts" v={`${SUPPLIER.po} · ${SUPPLIER.name}`} />
        <Row k="Payroll" v="Next run — Friday" />
      </Panel>
    </div>
  );
}

export default function CrmDemo() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const last = STAGES.length - 1;

  const go = useCallback((i: number) => setStage(Math.max(0, Math.min(last, i))), [last]);

  // Walkthrough — only ever started by the visitor, and it stops at the end.
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setStage((s) => {
        if (s >= last) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, PLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, last]);

  // Standard tablist keyboard model.
  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: stage + 1, ArrowDown: stage + 1,
      ArrowLeft: stage - 1, ArrowUp: stage - 1,
      Home: 0, End: last,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = Math.max(0, Math.min(last, next));
    setPlaying(false);
    setStage(i);
    tabsRef.current[i]?.focus();
  };

  const current = STAGES[stage];

  return (
    <div className="mt-10">
      <div className="nt-cardframe">
        <div className="border border-ink/12 bg-surface/40">
          {/* Frame header */}
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-ink/10 px-4 py-2.5">
            <span className="text-[0.8rem] font-bold tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
              Your CRM
            </span>
            <span className="bv-6 bg-ink/[0.06] px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ink/55">
              Interactive example · sample data
            </span>
          </div>

          <Summary stage={stage} />

          <div className="grid grid-cols-1 lg:grid-cols-[15rem_1fr]">
            {/* Stage navigator — every stage's sentence is here, so the whole
                explanation is in the HTML whether or not JS runs. */}
            <div
              role="tablist"
              aria-label="CRM demonstration stages"
              aria-orientation="vertical"
              onKeyDown={onKey}
              className="flex gap-1.5 overflow-visible border-b border-ink/10 p-3 max-lg:grid max-lg:grid-cols-2 lg:flex-col lg:border-b-0 lg:border-r"
            >
              {STAGES.map((s, i) => {
                const active = i === stage;
                return (
                  <button
                    key={s.id}
                    ref={(el) => { tabsRef.current[i] = el; }}
                    type="button"
                    role="tab"
                    id={`crm-tab-${s.id}`}
                    aria-selected={active}
                    aria-controls={`crm-panel-${s.id}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => { setPlaying(false); go(i); }}
                    className={`bv-6 flex w-full items-start gap-2.5 px-2.5 py-2 text-left transition-colors ${
                      active ? "bg-ink/[0.08] text-ink" : "text-ink/55 hover:bg-ink/[0.04] hover:text-ink/80"
                    }`}
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 shrink-0 text-[0.68rem] font-bold tabular-nums"
                      style={{ fontFamily: DISPLAY, color: active ? ACCENT : "color-mix(in oklab, var(--tl-ink) 35%, transparent)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.82rem] font-semibold leading-snug" style={{ fontFamily: DISPLAY }}>
                        {s.nav}
                      </span>
                      {/* Only the active stage expands. With nine stages, showing
                          every sentence made the navigator ~870px against a ~300px
                          panel. The sentence still renders in the server HTML for
                          whichever stage is selected, and the panel repeats it. */}
                      <span className={`mt-0.5 block text-[0.72rem] leading-snug text-ink/45 ${active ? "" : "hidden"}`}>
                        {s.line}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Workspace — only the active panel is mounted, so nothing hidden
                can take focus. min-height keeps the frame from jumping. */}
            <div
              role="tabpanel"
              id={`crm-panel-${current.id}`}
              aria-labelledby={`crm-tab-${current.id}`}
              tabIndex={0}
              className="min-h-[21rem] p-3.5 sm:min-h-[22rem]"
            >
              <h3 className="text-[1rem] font-bold tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
                {current.title}
              </h3>
              <p className="mt-1 max-w-[46rem] text-[0.85rem] leading-snug text-ink/60">{current.line}</p>
              <div key={current.id} className="animate-rise mt-3.5">
                <Workspace id={current.id} />
              </div>
            </div>
          </div>

          {/* Activity feed */}
          <div className="flex items-center gap-2.5 border-t border-ink/10 px-4 py-2.5">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ACCENT }} />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-ink/35">Latest</span>
            <span aria-live="polite" className="min-w-0 truncate text-[0.78rem] text-ink/65">
              {current.feed}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => { setPlaying(false); go(stage - 1); }}
          disabled={stage === 0}
          className="bv-6 px-3 py-2 text-[0.82rem] font-semibold text-ink/70 transition-colors hover:bg-ink/[0.06] hover:text-ink disabled:opacity-35 disabled:hover:bg-transparent"
          style={{ fontFamily: DISPLAY }}
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={() => { setPlaying(false); go(stage + 1); }}
          disabled={stage === last}
          className="bv-6 px-3 py-2 text-[0.82rem] font-semibold text-ink/70 transition-colors hover:bg-ink/[0.06] hover:text-ink disabled:opacity-35 disabled:hover:bg-transparent"
          style={{ fontFamily: DISPLAY }}
        >
          Next →
        </button>
        <button
          type="button"
          onClick={() => { if (!playing && stage === last) setStage(0); setPlaying((p) => !p); }}
          aria-pressed={playing}
          className="bv-6 flex items-center gap-2 px-3 py-2 text-[0.82rem] font-semibold text-ink/70 transition-colors hover:bg-ink/[0.06] hover:text-ink"
          style={{ fontFamily: DISPLAY }}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            {playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5.5v13l11-6.5L8 5.5Z" />}
          </svg>
          {playing ? "Pause" : "Play walkthrough"}
        </button>
        <span className="ml-auto text-[0.75rem] tabular-nums text-ink/40">
          {stage + 1} / {STAGES.length}
        </span>
      </div>
    </div>
  );
}
