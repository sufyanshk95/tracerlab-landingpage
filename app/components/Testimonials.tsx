// "Hear from our clients" — client video testimonials.
//
// Renders NOTHING in production until app/lib/testimonials.ts has at least one
// published entry, so the site never shows empty cards, placeholder people or
// "coming soon" filler. In development only, it shows a clearly-marked sample
// of the layout so the section can be styled before real footage arrives.
//
// Loading: only poster images are fetched with the page. Each <video> carries
// preload="none" and no src until the visitor presses play, so no testimonial
// footage downloads on first render. The media box reserves its aspect ratio up
// front, so posters and videos swap in without shifting the page.
//
// Playback: native controls, no autoplay, no sound until the visitor starts it.
// There is no carousel and no auto-rotation — a plain responsive grid, so
// keyboard and screen-reader users get the same thing everyone else does.
import type { CSSProperties } from "react";
import Card from "./Card";
import TestimonialVideo from "./TestimonialVideo";
import { PUBLISHED_TESTIMONIALS, SAMPLE_TESTIMONIAL, TESTIMONIALS, type Testimonial } from "../lib/testimonials";

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";

// `preview` = a development-only render of an entry that is not published, so
// the missing fields are shown as explicit gaps rather than blank space.
function TestimonialCard({ t, preview = false }: { t: Testimonial; preview?: boolean }) {
  const todo = (v: string, label: string) =>
    v ? <>{v}</> : <span className="text-ink/35">[{label} needed]</span>;
  return (
    <article className="h-full">
      <Card bevel={14} depth={preview ? 0 : 16} className="h-full" contentClassName="h-full">
        <div className="px-5 pt-5">
          <TestimonialVideo t={{ video: t.video, poster: t.poster, captions: t.captions, aspect: t.aspect, role: t.role }} />
        </div>
        <div className="flex flex-1 flex-col p-5 pt-4">
          <h3 className="text-[1.1rem] font-bold leading-snug tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
            {todo(t.title, "title")}
          </h3>
          {t.quote && (
            <blockquote className="mt-3 border-l-2 border-ink/15 pl-4 text-[0.95rem] leading-[1.65] text-ink/70">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
          )}
          {/* Attribution is ROLE ONLY — the owner does not publish client
              names or company names on these cards (2026-09-25). `name` and
              `company` stay in the data for internal reference; never render them. */}
          <p className="mt-4 text-[0.9rem] font-semibold text-ink/70">{todo(t.role, "role")}</p>
          {t.transcript && (
            <details className="group mt-4 border-t border-ink/10 pt-3">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-[0.85rem] font-semibold text-ink/65 transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
                <svg className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-open:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="m9 6 6 6-6 6" />
                </svg>
                Read the transcript
              </summary>
              <p className="mt-3 whitespace-pre-line text-[0.88rem] leading-[1.7] text-ink/60">{t.transcript}</p>
            </details>
          )}
          {t.caseStudy && (
            <a
              href={t.caseStudy.href}
              className="mt-auto inline-block pt-5 text-[0.9rem] font-semibold text-ink/75 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/60"
            >
              {t.caseStudy.label} →
            </a>
          )}
        </div>
      </Card>
    </article>
  );
}

export default function Testimonials() {
  const published = PUBLISHED_TESTIMONIALS;
  // NODE_ENV is statically replaced at build time, so the staged entries below
  // cannot reach a production bundle.
  const isDev = process.env.NODE_ENV !== "production";
  // Production shows published entries only. Dev also shows whatever is staged
  // but not yet published, marked as such, so encodes and posters stay
  // reviewable after the first testimonial goes live.
  const staged = isDev ? TESTIMONIALS.filter((t) => !t.published) : [];
  const sample = isDev && TESTIMONIALS.length === 0 ? [SAMPLE_TESTIMONIAL] : [];
  const unpublished = [...staged, ...sample];
  if (published.length === 0 && unpublished.length === 0) return null;

  return (
    <section
      id="tl-testimonials"
      aria-labelledby="tl-testimonials-h"
      style={{ containIntrinsicSize: "auto 900px" }}
      className="cv-auto font-body relative isolate w-full overflow-clip bg-page text-ink"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10"><div className="nt-hairline" /></div>
      <div className="cv-fade mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 sm:py-28">
        <div className="nt-px max-w-[44rem]" style={{ "--px": "8px" } as CSSProperties}>
          <span aria-hidden className="nt-kicker" />
          <p className="text-[0.98rem] text-ink/50">In their words</p>
          <h2 id="tl-testimonials-h" className="mt-4 text-[clamp(2.1rem,4.6vw,3.3rem)] font-extrabold leading-[1.06] tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
            Hear from our clients.
          </h2>
          <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-[1.7] text-ink/60">
            Business owners share what changed after working with Tracerlabs.
          </p>
        </div>

        {published.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {published.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </div>
        )}

        {unpublished.length > 0 && (
          <>
            <p className="mt-10 border border-dashed border-ink/25 bg-ink/[0.03] px-4 py-3 text-[0.85rem] leading-relaxed text-ink/60">
              <strong className="font-semibold text-ink/80">Development preview — not published.</strong>{" "}
              These never render in a production build. Fill the TODO fields in{" "}
              <code className="text-ink/75">app/lib/testimonials.ts</code> and set{" "}
              <code className="text-ink/75">published: true</code> to put one live.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {unpublished.map((t) => (
                <TestimonialCard key={t.id} t={t} preview />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
