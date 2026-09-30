// Custom CRM — the home page's ONE customer-workflow demonstration. The old
// numbered list + static dashboard, and the duplicate "What a connected
// engagement looks like" block in Services, were both removed 2026-09-25: the
// customer workflow now lives here and nowhere else.
//
// Section roles, so nothing drifts back into duplication:
//   Services → what we build · here → how it connects in practice ·
//   Process  → how a CLIENT works with us (discovery → launch).
//
// The interactive part is a client leaf (CrmDemo); this shell stays a server
// component so the heading, intro and closing copy are always in the HTML. All
// sample data is fictional — see app/lib/crmDemo.ts.
import type { CSSProperties } from "react";
import CrmDemo from "./CrmDemo";

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";

export default function CrmOverview() {
  return (
    <section id="tl-crm" style={{ containIntrinsicSize: "auto 1200px" }} className="cv-auto font-body relative isolate w-full overflow-clip bg-page text-ink">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10"><div className="nt-hairline" /></div>
      <div className="cv-fade mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 sm:py-28">
        <div className="nt-px max-w-[44rem]" style={{ "--px": "8px" } as CSSProperties}>
          <span aria-hidden className="nt-kicker" />
          <p className="text-[0.98rem] text-ink/50">The custom CRM</p>
          <h2 className="mt-4 text-[clamp(2.1rem,4.6vw,3.3rem)] font-extrabold leading-[1.06] tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
            Your business, in one place.
          </h2>
          <p className="mt-5 max-w-[42rem] text-[1.05rem] leading-[1.7] text-ink/60">
            Follow one customer from first inquiry to payment, with every step connected
            in your custom CRM.
          </p>
        </div>

        <CrmDemo />

        <div className="mt-10 flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[1rem] font-semibold text-ink" style={{ fontFamily: DISPLAY }}>
            Built around your workflow, connected through your CRM.
          </p>
          <p className="text-[0.9rem] text-ink/55">
            <a href="/services/custom-crm" className="font-semibold text-ink/75 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/60">
              How we build a custom CRM
            </a>
            <span className="px-2 text-ink/25">·</span>
            <a href="/work/meat-processing-platform" className="font-semibold text-ink/75 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/60">
              See a working platform for a meat-processing farm
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
