// Provider-agnostic event tracking. The site currently ships NO analytics
// provider (Hotjar was removed for scroll jank; nothing replaced it), so this
// adapter forwards to whichever tag the owner installs later — GTM's dataLayer,
// gtag, Meta Pixel, or Vercel Web Analytics' `va` — without touching call
// sites again. Every call is a no-op until one of those globals exists.
//
// Events fired by the site:
//   book_call_click       — a direct-booking (Cal.com) link was clicked
//   ai_demo_start         — the in-browser voice agent demo was started
//   contact_submit        — a lead form was submitted successfully
// A booking-link click is NOT a completed appointment; confirmed bookings made
// through the voice agent are logged server-side in /api/book.
export type TrackEvent = "book_call_click" | "ai_demo_start" | "contact_submit";

type Win = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  va?: (...args: unknown[]) => void;
};

export function track(event: TrackEvent, props: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  try {
    w.dataLayer?.push({ event, ...props });
    w.gtag?.("event", event, props);
    if (event === "contact_submit") w.fbq?.("track", "Lead");
    else w.fbq?.("trackCustom", event, props);
    w.va?.("event", { name: event, data: props });
  } catch {
    /* analytics must never break the page */
  }
}
