// Site nav (Telemetry redesign) — slim sticky bar: logo, quiet Archivo links,
// theme toggle, one Button CTA, hairline underneath. Sits at the top of the
// page (the old "rests at the bottom of the first screen" behavior is retired
// with the redesign). Links default to the home-page sections; pages with
// different anchors pass their own.
import Link from "next/link";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import { BOOKING_URL } from "../lib/site";

// Absolute-from-root anchors so the same nav works on nested pages
// (/services/*, /work/*) as well as on the home page.
const HOME_LINKS = [
  { label: "Services", href: "/#tl-services" },
  { label: "CRM", href: "/#tl-crm" },
  { label: "Case studies", href: "/#tl-projects" },
  { label: "Process", href: "/#tl-process" },
];

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";

export default function Nav({
  links = HOME_LINKS,
  contactHref = BOOKING_URL,
}: {
  links?: { label: string; href: string }[];
  contactHref?: string;
}) {
  const external = contactHref.startsWith("http");
  return (
    <header
      id="tl-nav"
      className="font-body sticky top-0 z-50 w-full bg-page/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-6 sm:px-10">
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

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative text-[0.92rem] font-medium text-ink/55 transition-colors hover:text-ink"
              style={{ fontFamily: DISPLAY }}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-brand-pink to-brand-blue transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <MobileMenu links={links} />
          <ThemeToggle />
          {/* The full label overflows a 375px viewport next to the logo, menu
              and theme toggle, so the smallest screens get the short form. */}
          <Button href={contactHref} external={external} variant="primary" size="sm" data-track="book_call_click" data-track-location="nav">
            <span className="sm:hidden">Book a call</span>
            <span className="hidden sm:inline">Book a discovery call</span>
          </Button>
        </div>
      </div>
      <div aria-hidden className="nt-hairline" />
    </header>
  );
}
