"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Testimonial } from "../lib/testimonials";

// ⚠️ Only the fields this client leaf actually needs. Passing the whole
// Testimonial would serialise `name` and `company` into the RSC payload — so
// the client's name would sit in the page source even though nothing renders
// it, which is exactly what the owner asked to avoid.
type Media = Pick<Testimonial, "video" | "poster" | "captions" | "aspect" | "role">;

// The media box for one testimonial. Nothing but the poster is fetched until
// the visitor presses play: the <video> has no src and preload="none" until
// then, so a page with several testimonials still downloads no footage.
//
// After the press it becomes a normal <video controls>: visible controls, the
// visitor's own volume, no autoplay loop, no hijacked scroll. The wrapper
// reserves the intrinsic aspect ratio so swapping poster → video shifts nothing.
// Cap the media box by HEIGHT, then derive its width from the clip's own
// aspect ratio. Clamping height while the box stays full-width would leave the
// box a different shape from the footage, and object-cover would crop the sides
// off a portrait video — so the width is what gets constrained.
const MAX_MEDIA_HEIGHT_REM = 21;

// Every mounted player registers here so starting one pauses the rest. A
// module-level set is enough (they only ever render together in one section),
// and hanging it off the `play` EVENT rather than our button means playback
// started from the native controls is covered too.
const players = new Set<HTMLVideoElement>();

function boxSize(aspect: string) {
  const [w, h] = aspect.split("/").map((n) => parseFloat(n.trim()));
  if (!w || !h) return { aspectRatio: aspect, maxWidth: "100%" };
  return { aspectRatio: aspect, maxWidth: `${(MAX_MEDIA_HEIGHT_REM * w) / h}rem` };
}

export default function TestimonialVideo({ t }: { t: Media }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  // Only ever set from a real media error on a source we actually requested.
  // An untouched player has no src and is NOT broken — never label it as such.
  const [failed, setFailed] = useState(false);
  const size = boxSize(t.aspect || "16 / 9");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    players.add(el);
    return () => {
      players.delete(el);
    };
  }, []);

  const attempt = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.play()
      .then(() => setFailed(false))
      .catch((err: DOMException) => {
        // An interrupted play() — the visitor hit pause, or another testimonial
        // took over — is not a failure. Only surface real ones.
        if (err?.name !== "AbortError") setFailed(true);
      });
  }, []);

  // The press sets `started`, which puts the src on the element; this effect
  // runs on the very next commit, when that src is in the DOM. Deliberately an
  // effect and not requestAnimationFrame: rAF does not fire in a background
  // tab, which would leave a press queued and the video silently stuck.
  // Focus moves to the video because the button that had it is unmounting, and
  // the native controls are what should receive the keyboard next.
  useEffect(() => {
    if (!started) return;
    ref.current?.focus();
    attempt();
  }, [started, attempt]);

  const start = () => {
    setFailed(false);
    setStarted(true);
  };

  const retry = () => {
    setFailed(false);
    const el = ref.current;
    if (!el) return;
    // Re-request the source rather than replaying the errored one.
    el.load();
    el.focus();
    attempt();
  };

  return (
    <div className="relative mx-auto w-full overflow-clip bg-[#07090d]" style={size}>
      {!t.poster ? (
        <div className="absolute inset-0 grid place-items-center text-[0.8rem] text-ink/35">
          Poster frame
        </div>
      ) : (
        !started && (
          <Image
            src={t.poster}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 24rem"
            className="object-cover"
            loading="lazy"
          />
        )
      )}

      <video
        ref={ref}
        controls={started}
        preload="none"
        playsInline
        // Only once started: before that the Next/Image above is the poster, and
        // setting this too would fetch the same frame a second time.
        poster={started ? t.poster || undefined : undefined}
        src={started && t.video ? t.video : undefined}
        onPlay={() => {
          for (const p of players) if (p !== ref.current && !p.paused) p.pause();
        }}
        onError={() => {
          // Ignore the error the element fires while it has no source.
          if (started) setFailed(true);
        }}
        className={`absolute inset-0 h-full w-full object-cover ${started ? "" : "pointer-events-none opacity-0"}`}
      >
        {t.captions && <track kind="captions" src={t.captions} srcLang="en" label="English" default />}
      </video>

      {!started && (
        <button
          type="button"
          onClick={start}
          disabled={!t.video}
          // Role only — the label must not leak the client's name either. No
          // article, so acronyms ("CEO") and long titles both read correctly.
          aria-label={`Play the video testimonial${t.role ? ` — ${t.role}` : ""}`}
          className="group/play absolute inset-0 grid place-items-center outline-none disabled:cursor-default"
        >
          <span
            aria-hidden
            className="bv-9 flex h-14 w-14 items-center justify-center bg-page/85 text-ink shadow-[var(--nt-underglow)] transition-transform duration-300 group-hover/play:scale-105 group-focus-visible/play:ring-2 group-focus-visible/play:ring-brand-blue"
          >
            <svg className="ml-0.5 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5L8 5.5Z" />
            </svg>
          </span>
        </button>
      )}

      {failed && (
        <div
          role="alert"
          className="absolute inset-0 grid place-items-center bg-page/92 px-5 text-center"
        >
          <div>
            <p className="text-[0.9rem] font-semibold text-ink/80">This video didn&rsquo;t load.</p>
            <p className="mt-1 text-[0.8rem] leading-relaxed text-ink/55">
              Check your connection, then try again.
            </p>
            <button
              type="button"
              onClick={retry}
              aria-label={`Try loading the video testimonial again${t.role ? ` — ${t.role}` : ""}`}
              className="bv-6 mt-3 inline-flex items-center gap-1.5 bg-ink/10 px-3.5 py-2 text-[0.82rem] font-semibold text-ink/85 transition-colors hover:bg-ink/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <path d="M21 3v6h-6" />
              </svg>
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
