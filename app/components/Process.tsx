// Implementation process — five steps, as run on every engagement. Step 5 is
// explicitly "where included in the engagement": monitoring is not implied to
// be a standing commitment on every project.
import type { CSSProperties } from "react";
import Card from "./Card";

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";

export const PROCESS_STEPS = [
  {
    t: "Map the client's SOPs and current systems",
    d: "We document how work actually moves through your business today — who does what, in which tool, and where it stalls.",
  },
  {
    t: "Define automation scope and human responsibilities",
    d: "Together we decide which steps become automated administrative work and which stay with people: approvals, physical fulfillment, judgment calls.",
  },
  {
    t: "Build and connect workflows",
    d: "Funnels, agents, schedules, boards, invoicing and the CRM that ties them together — built around the scope from step 2.",
  },
  {
    t: "Test and launch",
    d: "Every workflow is run end to end with your team on real cases before it goes live.",
  },
  {
    t: "Monitor and improve where included in the engagement",
    d: "For engagements that include it, we watch the numbers — cost per booking, response times, no-shows — and adjust.",
  },
];

export default function Process() {
  return (
    <section id="tl-process" style={{ containIntrinsicSize: "auto 900px" }} className="cv-auto font-body relative isolate w-full overflow-clip bg-page text-ink">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10"><div className="nt-hairline" /></div>
      <div className="cv-fade mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 sm:py-28">
        <div className="nt-px max-w-[44rem]" style={{ "--px": "8px" } as CSSProperties}>
          <span aria-hidden className="nt-kicker" />
          <p className="text-[0.98rem] text-ink/50">How an engagement runs</p>
          <h2 className="mt-4 text-[clamp(2.1rem,4.6vw,3.3rem)] font-extrabold leading-[1.06] tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
            Implementation process
          </h2>
          <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-[1.7] text-ink/60">
            The same five steps whether you start with lead generation or with operations.
            Scope, timeline and pricing are set on the discovery call once we understand your processes.
          </p>
        </div>
        <ol className="mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.t} className="h-full">
              <Card bevel={10} depth={i % 2 ? 20 : 10} className="h-full" contentClassName="h-full p-5 pt-6">
                <span aria-hidden className="nt-ghost-num" style={{ fontFamily: DISPLAY, fontSize: "3.2rem" }}>{i + 1}</span>
                <h3 className="mt-1 text-[1.02rem] font-bold leading-tight tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
                  {s.t}
                </h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-ink/55">{s.d}</p>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
