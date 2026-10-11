import Link from "next/link";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import { BOOKING_URL } from "../lib/site";

// Slim content-page header (Telemetry redesign) — logo, one quiet link, theme
// toggle, one CTA, hairline. Used on case-study pages; becomes the basis for
// the site-wide nav restyle. Shares <Button> so CTA styling stays consistent.
export default function CaseHeader({
  linkLabel = "All work",
  linkHref = "/#tl-projects",
  ctaLabel = "Book a discovery call",
  ctaHref = BOOKING_URL,
}: {
  linkLabel?: string;
  linkHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-ink/10 bg-page/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1060px] items-center justify-between gap-4 px-6 sm:px-10">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80" aria-label="Tracerlabs home">
          {/* The source PNG is 300x300: the pill sits at roughly y 78-188 and the
              "THINK IT BUILD IT" tagline at y 215-230. We crop to the pill only
              (tagline removed at the owner's request) and scale it: the image
              renders 104px tall (0.347x), so the crop window is 38px tall with
              the image pulled up 27px and left 5px. Keep the four numbers in
              step — they are one crop, not independent tweaks. */}
          <span className="relative block h-[38px] w-[6.2rem] shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-dark.png" alt="Tracerlabs" data-logo="dark" className="absolute -left-[5px] -top-[27px] h-[104px] w-auto max-w-none" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-light.png" alt="Tracerlabs" data-logo="light" className="absolute -left-[5px] -top-[27px] h-[104px] w-auto max-w-none" />
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={linkHref}
            className="hidden text-[0.92rem] font-medium text-ink/55 transition-colors hover:text-ink sm:block"
            style={{ fontFamily: "var(--font-archivo), system-ui, sans-serif" }}
          >
            {linkLabel}
          </Link>
          <ThemeToggle />
          <Button href={ctaHref} external={ctaHref.startsWith("http")} variant="primary" size="sm" data-track="book_call_click" data-track-location="page-header">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </header>
  );
}
