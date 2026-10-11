"use client";

import { useEffect } from "react";
import { track, type TrackEvent } from "../lib/track";

// One delegated click listener for every element carrying `data-track`
// (booking links, CTA buttons). Keeps the server components free of client
// handlers: add `data-track="book_call_click"` to a link and it's measured.
export default function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const name = el.dataset.track as TrackEvent | undefined;
      if (!name) return;
      track(name, { location: el.dataset.trackLocation || "", href: (el as HTMLAnchorElement).href || "" });
    };
    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
