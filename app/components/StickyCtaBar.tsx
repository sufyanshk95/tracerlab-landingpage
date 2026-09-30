"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Button from "./Button";

// Persistent conversion bar: slides in once the hero scrolls away, and gets out of the
// way again when the reader reaches the real CTA section (or dismisses it).
// Per-page wiring via props: which sections gate visibility, and what the bar says/links to.
//
// `yieldToIds` names sections the bar must NOT sit over — the interactive CRM
// demonstration and the testimonial players, whose controls live near the
// bottom edge where the bar floats. It stands down while any of them is on
// screen OR while keyboard focus is inside one, then comes back afterwards —
// unless the visitor dismissed it, which is permanent for the session. The bar
// is `position: fixed`, so none of this moves page content.
export default function StickyCtaBar({
  heroId,
  ctaId,
  yieldToIds = [],
  message,
  buttonLabel = "Book a Demo",
  buttonHref,
}: {
  heroId: string;
  ctaId: string;
  yieldToIds?: string[];
  message: string;
  buttonLabel?: string;
  buttonHref: string;
}) {
  const reduced = useReducedMotion();
  const [pastHero, setPastHero] = useState(false);
  const [nearCta, setNearCta] = useState(false);
  const [overYieldZone, setOverYieldZone] = useState(false);
  const [focusInYieldZone, setFocusInYieldZone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    const cta = document.getElementById(ctaId);
    if (!hero || !cta) return;
    const heroObs = new IntersectionObserver(([e]) => setPastHero(!e.isIntersecting), { threshold: 0.05 });
    const ctaObs = new IntersectionObserver(([e]) => setNearCta(e.isIntersecting), { threshold: 0.1 });
    heroObs.observe(hero);
    ctaObs.observe(cta);
    return () => {
      heroObs.disconnect();
      ctaObs.disconnect();
    };
  }, [heroId, ctaId]);

  // Stand down over the sections that must stay unobstructed. Tracked as a set
  // because several can be on screen at once on a tall viewport.
  const yieldKey = yieldToIds.join(",");
  useEffect(() => {
    const ids = yieldKey ? yieldKey.split(",") : [];
    const nodes = ids.map((id) => document.getElementById(id)).filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    const visible = new Set<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setOverYieldZone(visible.size > 0);
      },
      // Any sliver counts: the bar overlaps the bottom of the viewport, so a
      // partially-visible panel is exactly the case that gets covered.
      { threshold: 0 },
    );
    nodes.forEach((n) => obs.observe(n));

    // Keyboard users can tab into a section that is only partly scrolled into
    // view; keep the bar away while focus is inside one.
    const onFocus = () => {
      const el = document.activeElement;
      setFocusInYieldZone(Boolean(el && nodes.some((n) => n.contains(el))));
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onFocus);
    return () => {
      obs.disconnect();
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onFocus);
    };
  }, [yieldKey]);

  const show = pastHero && !nearCta && !dismissed && !overYieldZone && !focusInYieldZone;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 56 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 56 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6"
        >
          <div className="pointer-events-auto border border-ink/15 bg-page/95 shadow-[var(--nt-underglow)] backdrop-blur-sm">
            <div className="flex items-center gap-3 py-2.5 pl-4 pr-2.5 sm:gap-5 sm:pl-5">
              <span
                className="hidden text-[0.9rem] font-semibold text-ink/75 sm:block"
                style={{ fontFamily: "var(--font-archivo), system-ui, sans-serif" }}
              >
                {message}
              </span>
              <Button href={buttonHref} external={buttonHref.startsWith("http")} variant="primary" size="sm" data-track="book_call_click" data-track-location="sticky-bar">{buttonLabel}</Button>
              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
                className="flex h-8 w-8 items-center justify-center text-ink/40 transition-colors hover:bg-ink/[0.08] hover:text-ink"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
