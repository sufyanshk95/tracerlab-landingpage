// Shared layout for /services/*. One data object per page answers the same
// buyer questions in the same order: who it's for → the problem → what we
// implement → how it connects → evidence → what needs people → next step.
// Evidence entries carry a `kind` chip so measured outcomes, working demos and
// illustrative scenarios are never confused — the chip does the labelling, so
// the prose does not need to explain the scheme.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import CaseHeader from "../CaseHeader";
import Footer from "../Footer";
import Card from "../Card";
import Button from "../Button";
import { ServiceJsonLd, type FaqItem, type ServiceLd } from "../JsonLd";
import { BOOKING_URL, SITE_URL } from "../../lib/site";

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";
const ACCENT = "var(--tl-accent-text)";

export type EvidenceKind = "measured" | "demo" | "illustrative";

export type ServiceContent = {
  slug: string;
  title: string; // <title> + <h1>
  eyebrow: string;
  metaDescription: string;
  intro: string;
  who: string[];
  problem: { heading: string; body: string[] };
  implement: { name: string; detail: string }[];
  connects: { to: string; how: string; href?: string }[];
  evidence: { kind: EvidenceKind; title: string; body: string; href?: string; linkLabel?: string }[];
  human: string[];
  faq: FaqItem[];
  related: { label: string; href: string }[];
  ld: ServiceLd;
};

export function serviceMetadata(c: ServiceContent): Metadata {
  const url = `${SITE_URL}/services/${c.slug}`;
  return {
    title: c.title,
    description: c.metaDescription,
    alternates: { canonical: `/services/${c.slug}` },
    openGraph: { type: "website", url, siteName: "Tracerlabs", locale: "en_US", title: `${c.title} | Tracerlabs`, description: c.metaDescription },
    twitter: { card: "summary_large_image", title: `${c.title} | Tracerlabs`, description: c.metaDescription },
  };
}

const KIND_LABEL: Record<EvidenceKind, string> = {
  measured: "Measured outcome",
  demo: "Working demonstration",
  illustrative: "Illustrative scenario",
};

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
      {children}
    </h2>
  );
}

const SECTIONS = [
  ["who", "Who it's for"],
  ["problem", "The problem"],
  ["implement", "What we implement"],
  ["connects", "How it connects"],
  ["evidence", "Evidence"],
  ["people", "What your team does"],
  ["faq", "FAQ"],
  ["next", "Next step"],
] as const;

export default function ServicePage({ c }: { c: ServiceContent }) {
  return (
    <div>
      <ServiceJsonLd service={c.ld} faq={c.faq} />
      <CaseHeader linkLabel="All services" linkHref="/#tl-services" />
      <main className="font-body w-full bg-page text-ink">
        <header className="mx-auto w-full max-w-[1060px] px-6 pt-16 sm:px-10 sm:pt-20">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-ink/50">{c.eyebrow}</p>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(2.1rem,5vw,3.4rem)] font-extrabold leading-[1.06] tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
            {c.title}
          </h1>
          <p className="mt-6 max-w-[44rem] text-[1.12rem] leading-[1.7] text-ink/62">{c.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={BOOKING_URL} external variant="primary" data-track="book_call_click" data-track-location={`service-${c.slug}-top`}>
              Book a discovery call
            </Button>
            <Button href="#evidence" variant="secondary">See the evidence</Button>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-[1060px] grid-cols-1 gap-x-14 px-6 pb-8 pt-10 sm:px-10 lg:grid-cols-[180px_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <ol className="sticky top-28 flex list-none flex-col gap-3 p-0 pt-6">
              {SECTIONS.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-[0.92rem] text-ink/50 transition-colors hover:text-ink">{label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0">
            <section className="border-t border-ink/10 py-10">
              <H2 id="who">Who it&rsquo;s for</H2>
              <ul className="mt-5 flex max-w-[42rem] list-none flex-col gap-2.5 p-0">
                {c.who.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-[1rem] leading-relaxed text-ink/70">
                    <svg className="mt-1.5 h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {w}
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-ink/10 py-10">
              <H2 id="problem">{c.problem.heading}</H2>
              <div className="mt-5 flex max-w-[42rem] flex-col gap-4">
                {c.problem.body.map((p) => (
                  <p key={p} className="text-[1.04rem] leading-[1.75] text-ink/62">{p}</p>
                ))}
              </div>
            </section>

            <section className="border-t border-ink/10 py-10">
              <H2 id="implement">What Tracerlabs implements</H2>
              <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {c.implement.map((it, i) => (
                  <div key={it.name} className="h-full">
                    <Card bevel={12} depth={i % 2 ? 20 : 10} className="h-full" contentClassName="h-full p-5">
                      <dt className="text-[1rem] font-bold text-ink" style={{ fontFamily: DISPLAY }}>{it.name}</dt>
                      <dd className="m-0 mt-2 text-[0.92rem] leading-[1.65] text-ink/60">{it.detail}</dd>
                    </Card>
                  </div>
                ))}
              </dl>
            </section>

            <section className="border-t border-ink/10 py-10">
              <H2 id="connects">How it connects with the rest of the business</H2>
              <ul className="mt-5 flex max-w-[44rem] list-none flex-col gap-3 p-0">
                {c.connects.map((x) => (
                  <li key={x.to} className="grid grid-cols-1 gap-1 border-l-2 border-ink/15 pl-4 sm:grid-cols-[14rem_1fr] sm:gap-4">
                    <span className="text-[0.95rem] font-semibold text-ink" style={{ fontFamily: DISPLAY }}>
                      {x.href ? <a href={x.href} className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink/60">{x.to}</a> : x.to}
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-ink/60">{x.how}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-ink/10 py-10">
              <H2 id="evidence">Evidence</H2>
              <div className="mt-6 grid grid-cols-1 gap-4">
                {c.evidence.map((e, i) => (
                  <Card key={e.title} bevel={12} depth={i % 2 ? 18 : 10} contentClassName="p-5 sm:p-6">
                    <span className="bv-6 inline-flex w-fit items-center gap-1.5 bg-ink/[0.06] px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink/60">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: e.kind === "measured" ? ACCENT : e.kind === "demo" ? "#e7028d" : "var(--tl-ink)" }} />
                      {KIND_LABEL[e.kind]}
                    </span>
                    <h3 className="mt-3 text-[1.1rem] font-bold tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>{e.title}</h3>
                    <p className="mt-2 max-w-[42rem] text-[0.95rem] leading-[1.65] text-ink/62">{e.body}</p>
                    {e.href && (
                      <a href={e.href} className="mt-3 inline-block text-[0.9rem] font-semibold text-ink/75 underline decoration-ink/25 underline-offset-4 hover:text-ink">
                        {e.linkLabel ?? "Read more"} →
                      </a>
                    )}
                  </Card>
                ))}
              </div>
            </section>

            <section className="border-t border-ink/10 py-10">
              <H2 id="people">What your team still does</H2>
              <ul className="mt-5 flex max-w-[42rem] list-none flex-col gap-2.5 p-0">
                {c.human.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-[1rem] leading-relaxed text-ink/70">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section className="border-t border-ink/10 py-10">
              <H2 id="faq">Questions buyers ask</H2>
              <div className="mt-4 flex max-w-[46rem] flex-col">
                {c.faq.map((f) => (
                  <details key={f.q} className="group border-t border-ink/10 last:border-b">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-4 text-left text-[1rem] font-semibold text-ink/85 transition-colors hover:text-ink [&::-webkit-details-marker]:hidden" style={{ fontFamily: DISPLAY }}>
                      <span>{f.q}</span>
                      <svg className="mt-1 h-4 w-4 shrink-0 text-ink/50 transition-transform duration-300 group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M12 5v14M5 12h14" /></svg>
                    </summary>
                    <p className="pb-5 text-[0.96rem] leading-[1.7] text-ink/62">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section id="next" className="scroll-mt-28 pb-20 pt-10">
              <Card bevel={16} contentClassName="items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                <div>
                  <h2 className="text-[1.4rem] font-bold leading-tight tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>Next step: a discovery call</h2>
                  <p className="mt-2 max-w-[30rem] text-[0.95rem] text-ink/55">
                    We map how this part of your business runs today and tell you what we would build first. Scope and pricing follow from that.
                  </p>
                </div>
                <Button href={BOOKING_URL} external variant="primary" data-track="book_call_click" data-track-location={`service-${c.slug}-bottom`}>
                  Book a discovery call
                </Button>
              </Card>
              <p className="mt-6 text-[0.9rem] text-ink/50">
                Related:{" "}
                {c.related.map((r, i) => (
                  <span key={r.href}>
                    <a href={r.href} className="font-semibold text-ink/70 underline decoration-ink/25 underline-offset-4 hover:text-ink">{r.label}</a>
                    {i < c.related.length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
