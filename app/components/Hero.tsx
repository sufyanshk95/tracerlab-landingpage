// Homepage hero — copy only, centered: the headline IS the hero, staged on
// the grid-floor scene. Every line fades/rises in on a CSS stagger
// (animate-rise).
//
// The film is OPT-IN (2026-09-23): nothing is requested or covered until the
// visitor presses "Watch introduction" beside the CTAs. The headline, nav and
// both CTAs are plain server HTML, usable from the first paint, and every
// failure path in HeroFilm returns the page exactly as it was.
// TelemetryPanel and MachinePanel are kept on disk if a side visual is ever
// wanted back.
import Button from "./Button";
import HeroFilm from "./HeroFilm";
import { BOOKING_URL } from "../lib/site";

export default function Hero() {
  return (
    <section id="tl-hero" className="font-body relative isolate -mt-16 w-full overflow-hidden bg-page text-ink">
      {/* ── Ambient light (one of two on the page — the other sits behind the CTA) */}
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -right-[12%] -top-[18%] -z-10 h-[52vw] w-[52vw] rounded-full"
        style={{ background: "radial-gradient(circle closest-side, var(--nt-ambient-blue) 0%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="animate-drift-slow pointer-events-none absolute -left-[14%] top-[30%] -z-10 h-[44vw] w-[44vw] rounded-full"
        style={{ background: "radial-gradient(circle closest-side, var(--nt-ambient-pink) 0%, transparent 100%)" }}
      />
      {/* Dot grid, hero only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle, var(--tl-dot-grid) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 85% 70% at 50% 38%, #000 30%, transparent 75%)",
        }}
      />
      {/* The scene: a perspective grid floor receding to a glowing horizon,
          with signal pulses shooting along its lines (offsets = 46px columns) */}
      <div aria-hidden className="nt-horizon -z-10" />
      <div aria-hidden className="nt-gridfloor -z-10">
        <span className="nt-pulse" style={{ left: 230, ["--pulse-dur" as string]: "8s", ["--pulse-delay" as string]: "1.2s" }} />
        <span className="nt-pulse" style={{ left: 598, ["--pulse-dur" as string]: "12s", ["--pulse-delay" as string]: "5s" }} />
        <span className="nt-pulse" style={{ left: 1012, ["--pulse-dur" as string]: "10s", ["--pulse-delay" as string]: "0s" }} />
        <span className="nt-pulse nt-pulse-pink" style={{ left: 1380, ["--pulse-dur" as string]: "17s", ["--pulse-delay" as string]: "7.5s" }} />
      </div>

      {/* The section starts UNDER the sticky nav (-mt-16 + pt-16 here) so the film
          can own the whole viewport while the nav is hidden during the intro. */}
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[1280px] items-center justify-center px-6 pb-14 pt-16 sm:px-10 sm:pb-16">
        <div className="flex min-w-0 max-w-[54rem] flex-col items-center text-center">
          <p className="animate-rise text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-ink/55">AI growth &amp; operations</p>
          <h1
            className="animate-rise mt-5 text-[clamp(2rem,min(4.6vw,7vh),3.8rem)] font-normal uppercase leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-duborics), var(--font-archivo), sans-serif", animationDelay: "0.08s" }}
          >
            Generate demand. Automate operations.{" "}
            <span className="nt-sheen">Run it all in one place.</span>
          </h1>
          <p className="animate-rise mt-6 max-w-[42rem] text-[1.1rem] leading-[1.65] text-ink/62" style={{ animationDelay: "0.18s" }}>
            We generate leads and connect your sales, scheduling, operations, and
            payments through AI systems built around your SOPs&mdash;with one custom
            CRM to oversee it all.
          </p>

          <div className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "0.26s" }}>
            <Button href={BOOKING_URL} external variant="primary" size="lg" data-track="book_call_click" data-track-location="hero">
              Book a discovery call
            </Button>
            <Button href="#tl-projects" variant="secondary" size="lg">
              Explore client results
            </Button>
          </div>

          <div className="animate-rise mt-6" style={{ animationDelay: "0.3s" }}>
            <HeroFilm />
          </div>

          <p className="animate-rise mt-9 max-w-[36rem] border-t border-ink/10 pt-5 text-[0.92rem] leading-relaxed text-ink/55" style={{ animationDelay: "0.4s" }}>
            Working with solar companies, a meat-processing farm, home-service
            businesses and med spas.
          </p>
        </div>
      </div>
    </section>
  );
}
