// Brand footer — quiet: Archivo wordmark, hairline top, plain links. Every
// section link is absolute-from-root (/#tl-…) so it works from nested pages.
// The blurb stays one line: the capability list belongs in Services, and the
// service column below already carries the links.
import { ADDRESS_LINE, BOOKING_URL, COMPANY_LINKEDIN, CONTACT_EMAIL, FOUNDERS, PHONE_DISPLAY, PHONE_E164 } from "../lib/site";

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";

const SERVICES = [
  { label: "Lead generation & funnels", href: "/services/lead-generation" },
  { label: "AI follow-up & appointment booking", href: "/services/ai-appointment-booking" },
  { label: "AI voice agents", href: "/services/ai-voice-agents" },
  { label: "Custom CRM & business automation", href: "/services/custom-crm" },
  { label: "Scheduling & fulfillment coordination", href: "/services/scheduling-and-operations" },
  { label: "Invoicing, payments & payroll workflows", href: "/services/invoicing-payments-payroll" },
];

const COMPANY = [
  { label: "Services", href: "/#tl-services" },
  { label: "Custom CRM", href: "/#tl-crm" },
  { label: "Case studies", href: "/#tl-projects" },
  { label: "Solar lead engine", href: "/work/solar-lead-engine" },
  { label: "Meat processing platform", href: "/work/meat-processing-platform" },
  { label: "Process", href: "/#tl-process" },
  { label: "FAQ", href: "/#tl-faq" },
  { label: "Team", href: "/#tl-team" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer id="tl-footer" className="font-body w-full bg-page text-ink">
      <div className="nt-hairline" />
      <div className="mx-auto w-full max-w-[1280px] px-6 py-14 sm:px-10 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* brand */}
          <div className="max-w-[27rem]">
            <span className="text-[1.25rem] font-extrabold tracking-tight text-ink" style={{ fontFamily: DISPLAY }}>
              Tracerlabs
            </span>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/55">
              AI growth &amp; operations. We generate leads and connect the systems that
              turn them into delivered, invoiced work. Tracerlabs provides AI automation
              and marketing services to businesses across Texas.
            </p>
            {/* Same name/address/phone the structured data publishes — keep
                these in step via app/lib/site.ts, never hard-code them. */}
            <address className="mt-4 not-italic text-[0.85rem] leading-relaxed text-ink/45">
              {ADDRESS_LINE}
            </address>
          </div>

          <nav aria-label="Services" className="flex flex-col gap-3">
            <span className="text-[0.85rem] font-semibold text-ink/45" style={{ fontFamily: DISPLAY }}>Services</span>
            {SERVICES.map((l) => (
              <a key={l.href} href={l.href} className="text-[0.92rem] text-ink/60 transition-colors hover:text-ink">{l.label}</a>
            ))}
          </nav>

          <nav aria-label="Company" className="flex flex-col gap-3">
            <span className="text-[0.85rem] font-semibold text-ink/45" style={{ fontFamily: DISPLAY }}>Company</span>
            {COMPANY.map((l) => (
              <a key={l.href} href={l.href} className="text-[0.92rem] text-ink/60 transition-colors hover:text-ink">{l.label}</a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="text-[0.85rem] font-semibold text-ink/45" style={{ fontFamily: DISPLAY }}>Contact</span>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-track="book_call_click" data-track-location="footer" className="text-[0.92rem] text-ink/60 transition-colors hover:text-ink">
              Book a discovery call
            </a>
            <a href={`tel:${PHONE_E164}`} className="text-[0.92rem] text-ink/60 transition-colors hover:text-ink">{PHONE_DISPLAY}</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[0.92rem] text-ink/60 transition-colors hover:text-ink">{CONTACT_EMAIL}</a>
            {COMPANY_LINKEDIN && (
              <a href={COMPANY_LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-[0.92rem] text-ink/60 transition-colors hover:text-ink">
                Tracerlabs on LinkedIn
              </a>
            )}
            {FOUNDERS.map((f) => (
              <a key={f.name} href={f.linkedin} target="_blank" rel="noopener noreferrer" className="text-[0.92rem] text-ink/60 transition-colors hover:text-ink">
                {f.name} on LinkedIn
              </a>
            ))}
          </div>
        </div>

        {/* ghost wordmark */}
        <div aria-hidden className="pointer-events-none select-none overflow-hidden">
          <div className="-mb-[0.34em] mt-10 text-center text-[clamp(4rem,13vw,11rem)] font-extrabold leading-none tracking-tight text-ink/[0.05]" style={{ fontFamily: DISPLAY }}>
            TRACERLABS
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8rem] text-ink/40">© 2026 Tracerlabs. All rights reserved.</p>
          <p className="text-[0.8rem] text-ink/35">Results in our case studies are specific to each client and are not a guarantee.</p>
        </div>
      </div>
    </footer>
  );
}
