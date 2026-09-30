// Case studies — two tiers. Client work sits in SPOTLIGHT panels; our own
// products and experiments stay quiet editorial rows beneath.
//
// These cards explain the PROBLEM and the SYSTEM we delivered. The headline
// numbers live in Evidence.tsx (selected results) and the full breakdown lives
// in the case studies themselves — repeating the same stat block in all three
// places is what this section deliberately stops doing. One outcome line per
// card, then a link.
import type { CSSProperties } from "react";
import Image from "next/image";
import ProjectVideo from "./ProjectVideo";
import Button from "./Button";
import Card from "./Card";
import { AD_WINDOW, FOLLOW_UP_RATE, LEAD_TO_SALE, SOLAR } from "../lib/solarResults";

type Media =
  | { kind: "video"; src: string; poster: string; fit?: "cover" | "contain"; label: string }
  | { kind: "image"; src: string; alt: string; fit?: "cover" | "contain" }
  | { kind: "panel" };

type CaseStudy = {
  id: string;
  client: string;
  title: string;
  blurb: string;
  /** One outcome line — the detail belongs in the case study. */
  outcome: string;
  tech: string;
  href: string;
  media: Media;
};

type Product = {
  id: string;
  client: string;
  title: string;
  blurb: string;
  metrics: string[];
  tech: string;
  link: { label: string; href: string; external?: boolean };
  media: Media;
};

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";
const ACCENT = "var(--tl-accent-text)";

type Kind = "measured" | "demo";

const CASE_STUDIES: (CaseStudy & { period: string; kind: Kind })[] = [
  {
    id: "solar",
    client: "A Texas solar company · solar",
    title: "A lead engine that books solar consultations",
    blurb:
      "A verified-leads funnel paired with an AI text agent that works the leads the funnel did not close, plus a confirmation agent that reminds and reschedules. The client's sales team runs the consultations and closes the deals.",
    outcome: `${SOLAR.closedDeals} closed deals from ${SOLAR.totalLeads} leads — a ${LEAD_TO_SALE}% lead-to-sale rate.`,
    period: `Advertising ran ${AD_WINDOW}. Leads and closed deals are owner-reported; AI follow-up converted ${FOLLOW_UP_RATE}% of initially unbooked leads. The client's sales team closed the deals.`,
    kind: "measured",
    tech: "Next.js, Retell, Twilio, GoHighLevel",
    href: "/work/solar-lead-engine",
    media: {
      kind: "video",
      src: "/assets/solar-funnel.mp4",
      poster: "/assets/solar-funnel-poster.jpg",
      fit: "cover",
      label: "Demo reel of the solar lead-generation funnel and AI booking agent.",
    },
  },
  {
    id: "meatops",
    client: "Meat processing company · New York",
    title: "The platform that runs a meat processing company's bookings, floor and invoicing",
    blurb:
      "A farm that ran on phone calls and paper now takes bookings online with the cut sheet built in, collects deposits through Square, moves orders across a staff processing board that texts customers at each stage, and generates invoices from the same data. The family still does the processing.",
    outcome: "20 paid bookings in the first week of ads, every one deposit-paid.",
    period: "First week of paid campaigns. Source: the farm's booking platform, Square and the ad account.",
    kind: "measured",
    tech: "Next.js, Supabase, Square, Meta Ads",
    href: "/work/meat-processing-platform",
    media: {
      kind: "video",
      src: "/assets/meatproc-demo.mp4",
      poster: "/assets/meatproc-demo-poster.jpg",
      fit: "cover",
      label: "Demo video of the meat processing booking and operations platform.",
    },
  },
];

const PRODUCTS: Product[] = [
  {
    id: "canvassing",
    client: "Our product — Offset Canvassing",
    title: "A GIS canvassing app that turns every door into intelligence",
    blurb:
      "A GIS-style map layered with public homeowner data — plus a companion mobile CRM so reps capture intel in the field, track territory, and never knock the same door twice.",
    metrics: ["GIS map with public homeowner data", "Companion mobile CRM"],
    tech: "Next.js, React Native, Google Maps, Supabase",
    link: { label: "See the live page", href: "https://offset-canvassing.vercel.app/", external: true },
    media: {
      kind: "video",
      src: "/assets/offset-canvassing.mp4",
      poster: "/assets/offset-canvassing-poster.jpg",
      // contain: the wide card's media column is exactly 9:16 (bar-less
      // window), so the reel fits pixel-perfect with no crop.
      fit: "contain",
      label: "Demo reel of the Offset Canvassing GIS app and companion mobile CRM for door-to-door teams.",
    },
  },
  {
    id: "fitness",
    client: "Our product — BeastMode",
    title: "An AI coach that builds martial-arts training and meal plans",
    blurb:
      "A cross-platform fitness app where an AI “sensei” generates personalized workouts, nutrition guidance, and grocery lists — kitchen to gym, on iOS, Android, and web.",
    metrics: ["Personalized AI coach", "iOS, Android & web"],
    tech: "Flutter, React, Gemini, Supabase",
    link: { label: "See it live", href: "https://beastmode.tracerlabs.io/", external: true },
    media: {
      kind: "video",
      src: "/assets/reel-beastmode.mp4",
      poster: "/assets/reel-beastmode-poster.jpg",
      fit: "cover",
      label: "Cinematic training reel for the BeastMode AI fitness coach.",
    },
  },
  {
    id: "aivideo",
    client: "Our experiment — AI video ads",
    title: "Cinematic video ads, generated with AI",
    blurb:
      "We script, generate, and render video ads with a Remotion + fal.ai pipeline. The reel below is a demonstration piece, not client work.",
    metrics: ["Scripted, generated and rendered in-house", "Working demonstration below"],
    tech: "Remotion, fal.ai, Next.js",
    link: { label: "Get a reel for your brand", href: "#contact" },
    media: {
      kind: "video",
      src: "/assets/reel-aivideo.mp4",
      poster: "/assets/reel-aivideo-poster.jpg",
      fit: "cover",
      label: "AI-generated cinematic car advertisement reel.",
    },
  },
];

// Kanban-style ops board rendering for the meat-processing platform.
function OpsPanel() {
  const STATUS = {
    drop: { label: "Drop-off", color: "#8a8a93", bg: "rgba(138,138,147,0.15)" },
    proc: { label: "Processing", color: "#e7028d", bg: "rgba(231,2,141,0.12)" },
    ready: { label: "Ready", color: "#056afc", bg: "rgba(5,106,252,0.12)" },
  } as const;
  const orders: (keyof typeof STATUS)[] = ["ready", "proc", "proc", "drop", "ready", "drop", "proc"];
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="text-[0.7rem] font-semibold text-white/55" style={{ fontFamily: DISPLAY }}>
          Processing board
        </span>
        <span className="text-[0.6rem] font-medium text-white/30">Today</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { v: "24", l: "Active" },
          { v: "8", l: "Ready" },
          { v: "3", l: "Issues" },
        ].map((s) => (
          <div key={s.l} className="flex flex-col items-center bg-white/[0.045] py-2">
            <span className="text-[0.95rem] font-bold text-white/80">{s.v}</span>
            <span className="text-[0.55rem] text-white/35">{s.l}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
          <div className="h-full w-[68%] rounded-full" style={{ backgroundColor: "#056afc" }} />
        </div>
        <span className="text-[0.55rem] font-semibold text-white/50">68%</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        {orders.map((k, i) => {
          const s = STATUS[k];
          return (
            <div key={i} className="flex items-center gap-2.5 bg-white/[0.04] p-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-white/[0.08]">
                <svg className="h-3.5 w-3.5 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
                <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/10" />
              </div>
              <span
                className="flex shrink-0 items-center gap-1.5 px-2 py-0.5 text-[0.55rem] font-semibold text-white/65"
                style={{ backgroundColor: s.bg }}
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MediaBody({ media }: { media: Media }) {
  return (
    <>
      {media.kind === "video" && (
        <ProjectVideo src={media.src} poster={media.poster} label={media.label} fit={media.fit} />
      )}
      {media.kind === "image" && (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 20rem"
          className={`object-${media.fit === "contain" ? "contain p-6" : "cover"}`}
          loading="lazy"
        />
      )}
      {media.kind === "panel" && <OpsPanel />}
    </>
  );
}

// Product-window media frame: slim chrome bar (dots + label), 9:16 body,
// hover glow. The media reads as a running application, not a picture.
// Media window — a plain dark stage for the reels (the old faux-browser
// chrome bar with dots + label was retired 2026-09-06).
function MediaChrome({
  media,
  aspect = "aspect-[9/16]",
  frameless = false,
  fill = false,
  className = "",
}: {
  media: Media;
  aspect?: string;
  frameless?: boolean;
  // fill: the media body soaks up whatever height the frame is given; the
  // aspect ratio still sizes the body on small screens where the frame has no
  // imposed height. Pair with a className that sets the frame's height
  // ("h-full" in a grid cell, "flex-1" in a flex column).
  fill?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${
        frameless
          ? "overflow-clip bg-[#07090d]"
          : "overflow-clip border border-ink/15 bg-[#07090d] transition-shadow duration-300 hover:shadow-[var(--nt-underglow)]"
      }${fill ? " flex flex-col" : ""} ${className}`}
    >
      {/* nt-px-window: the reel/poster parallaxes behind the frame (overflow-clip,
          not hidden — hidden would become the window's scroll container) */}
      <div className={`nt-px-window relative w-full ${fill ? `${aspect} lg:aspect-auto lg:flex-1` : aspect}`}>
        <MediaBody media={media} />
      </div>
    </div>
  );
}

// Spotlight panel for a client case study — the loud tier.
function KindChip({ kind }: { kind: Kind }) {
  return (
    <span className="bv-6 inline-flex items-center gap-1.5 bg-ink/[0.06] px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink/60">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: kind === "measured" ? ACCENT : "var(--tl-ink)" }} />
      {kind === "measured" ? "Measured outcome" : "Working demonstration"}
    </span>
  );
}

function CaseCard({ cs, mediaRight }: { cs: CaseStudy & { period: string; kind: Kind }; mediaRight: boolean }) {
  return (
    <article id={`work-${cs.id}`} className="scroll-mt-24">
      <Card bevel={16} depth={14} className="lg:min-h-[35rem]" contentClassName="h-full">
      {/* media bleeds flush to the card border (full column height); only the
          copy column carries the padding */}
      <div
        className={`grid h-full grid-cols-1 ${
          mediaRight ? "lg:grid-cols-[1fr_minmax(0,19rem)]" : "lg:grid-cols-[minmax(0,19rem)_1fr]"
        }`}
      >
        <div className={mediaRight ? "lg:order-2" : ""}>
          <MediaChrome media={cs.media} frameless fill className="h-full" />
        </div>
        <div className={`min-w-0 p-6 sm:p-8 lg:p-10 ${mediaRight ? "lg:order-1" : ""}`}>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[0.9rem] text-ink/50">{cs.client}</p>
            <KindChip kind={cs.kind} />
          </div>
          <h3
            className="mt-2 max-w-[24ch] text-[clamp(1.6rem,2.8vw,2.2rem)] font-extrabold leading-[1.12] tracking-tight text-ink"
            style={{ fontFamily: DISPLAY }}
          >
            {cs.title}
          </h3>
          <p className="mt-4 max-w-[40rem] text-[1rem] leading-[1.7] text-ink/60">{cs.blurb}</p>

          <p className="mt-7 border-t border-ink/10 pt-6 text-[1.05rem] font-semibold leading-snug text-ink" style={{ fontFamily: DISPLAY }}>
            {cs.outcome}
          </p>

          <p className="mt-4 max-w-[40rem] text-[0.82rem] leading-relaxed text-ink/45">{cs.period}</p>
          <p className="mt-3 text-[0.82rem] text-ink/40">{cs.tech}</p>

          <div className="relative z-10 mt-6">
            <Button href={cs.href} variant="secondary">
              Read the full case study
            </Button>
          </div>
        </div>
      </div>
      {/* stretched overlay — whole card opens the case study (the visible
          Button carries the accessible name; this is pointer convenience) */}
      <a href={cs.href} aria-hidden tabIndex={-1} className="absolute inset-0" />
      </Card>
    </article>
  );
}

// Product tile. Every card uses the SAME fixed media height, so a portrait
// reel and a landscape one still produce identically-shaped cards — the clip
// is centred in the well (`object-contain` for portrait) rather than the well
// resizing to the clip. That is what keeps the row aligned.
const PRODUCT_MEDIA_H = "h-[13.5rem]";

function ProductCard({ p }: { p: Product }) {
  return (
    <article id={`work-${p.id}`} className="h-full scroll-mt-24">
      <Card bevel={12} depth={24} className="h-full" contentClassName="h-full">
        <div className={`nt-px-window relative w-full shrink-0 overflow-clip bg-[#07090d] ${PRODUCT_MEDIA_H}`}>
          <MediaBody media={p.media} />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[0.85rem] text-ink/50">{p.client}</p>
          <h3
            className="mt-1.5 text-[1.15rem] font-bold leading-[1.25] tracking-tight text-ink"
            style={{ fontFamily: DISPLAY }}
          >
            {p.title}
          </h3>
          <p className="mt-3 text-[0.92rem] leading-[1.65] text-ink/60">{p.blurb}</p>
          <ul className="mt-4 flex list-none flex-col gap-1 p-0">
            {p.metrics.map((m) => (
              <li key={m} className="text-[0.88rem] font-semibold" style={{ color: ACCENT }}>
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-[0.78rem] text-ink/40">{p.tech}</p>
          <a
            href={p.link.href}
            {...(p.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="mt-auto inline-block pt-5 text-[0.92rem] font-semibold text-ink/75 underline decoration-ink/25 underline-offset-4 transition-colors after:absolute after:inset-0 after:content-[''] hover:text-ink hover:decoration-ink/60"
          >
            {p.link.label}
          </a>
        </div>
      </Card>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="tl-projects" style={{ containIntrinsicSize: "auto 3800px" }} className="cv-auto font-body relative isolate w-full overflow-clip bg-page text-ink">
      {/* ambient color field — gives the frosted spotlight panels something to
          blur; parallaxed behind the cards */}
      <div
        aria-hidden
        className="nt-px-bg pointer-events-none absolute -left-[10%] top-[10%] -z-10 h-[44vw] w-[44vw] rounded-full"
        style={{ background: "radial-gradient(circle closest-side, var(--nt-ambient-pink) 0%, transparent 100%)", "--px": "-120px" } as CSSProperties}
      />
      <div
        aria-hidden
        className="nt-px-bg pointer-events-none absolute -right-[12%] top-[42%] -z-10 h-[46vw] w-[46vw] rounded-full"
        style={{ background: "radial-gradient(circle closest-side, var(--nt-ambient-blue) 0%, transparent 100%)", "--px": "-100px" } as CSSProperties}
      />
      {/* scroll anchor: legacy/service links point at #projects (section id is tl-projects) */}
      <div id="projects" aria-hidden />
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10"><div className="nt-hairline" /></div>
      <div className="cv-fade mx-auto w-full max-w-[1280px] px-6 py-20 sm:px-10 sm:py-28 lg:py-36">
        {/* header — leads the cards by a hair */}
        <div className="nt-px max-w-[44rem]" style={{ "--px": "8px" } as CSSProperties}>
          <span aria-hidden className="nt-kicker" />
          <p className="text-[0.98rem] text-ink/50">Case studies</p>
          <h2
            className="mt-4 text-[clamp(2.1rem,4.6vw,3.3rem)] font-extrabold leading-[1.06] tracking-tight text-ink"
            style={{ fontFamily: DISPLAY }}
          >
            See what we&rsquo;ve built.
          </h2>
          <p className="mt-5 max-w-[40rem] text-[1.05rem] leading-[1.7] text-ink/60">
            Two engagements running in production — the problem each business had,
            the system we built, and what it has produced since.
          </p>
        </div>

        {/* Tier 1 — spotlight case studies */}
        <p className="mt-14 text-[0.9rem] font-semibold text-ink/45" style={{ fontFamily: DISPLAY }}>
          Client case studies
        </p>
        <div className="mt-6 flex flex-col gap-8">
          {CASE_STUDIES.map((cs, i) => (
            <CaseCard key={cs.id} cs={cs} mediaRight={i % 2 === 1} />
          ))}
        </div>

        {/* Portfolio strip — breadth beyond the two spotlights, kept quiet */}
        <p className="mt-6 max-w-[52rem] text-[0.9rem] leading-relaxed text-ink/45">
          Also running without a public case study: lead generation and AI booking for
          home-service businesses and med spas — the accounts behind the $40–$52 cost per
          booked appointment above — plus more solar funnels and analytics dashboards.
        </p>

        {/* Tier 2 — products & experiments */}
        <p className="mt-16 text-[0.9rem] font-semibold text-ink/45" style={{ fontFamily: DISPLAY }}>
          Our own products &amp; experiments (not client results)
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {/* section CTA → conversion */}
        <p className="mt-16 text-[0.98rem] text-ink/55">
          Have something like this in mind?{" "}
          <a
            href="#contact"
            className="font-semibold text-ink/80 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/60"
          >
            Tell us what you&apos;re building
          </a>
        </p>
      </div>
    </section>
  );
}
