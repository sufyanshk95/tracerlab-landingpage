// Structured data. Pure static data, no interactivity; the `<` escape blocks
// XSS in the JSON string. Every @id and URL uses the canonical production host
// (SITE_URL) — never a localhost URL, even in development.
//
// ONE organization entity for the whole site, at ORG_ID. The full definition is
// emitted once (home page); every other page emits ORG_REF — the same @id with
// only identity fields — so each page's graph resolves on its own without a
// second, possibly contradictory, definition of the business.
//
// RULES (deliberate omissions, do not "fix" them):
//   • No aggregateRating, review, award, or superlative of any kind.
//   • `sameAs` only when a profile URL is actually verified (see site.ts) —
//     never a guessed or searched-for listing.
//   • ⚠️ TYPE IS `Organization` AND MUST STAY THAT WAY. Do not "upgrade" it to
//     LocalBusiness / ProfessionalService for local rich results: the postal
//     address is a coworking space (Formation at The Star) with no staff on
//     site, and those types assert a place customers can visit. For the same
//     reason there is no `openingHours`, `geo` or `hasMap` here.
//     The postal address and telephone ARE verified (owner-supplied) and come
//     from app/lib/site.ts, which the footer renders too, so the published
//     name/address/phone match everywhere.
//   • No financial property anywhere: case-study revenue and ROAS are
//     average-based estimates whose qualifying context cannot travel inside a
//     schema value, and the booking records are not deduplicated.
//   • No client identity that isn't already public on the page. The solar
//     client is anonymized in the markup exactly as it is in the copy.
//   • No VideoObject for the published testimonial: it has no verified upload
//     date, and inventing one is not an option.
import { SITE_URL, CONTACT_EMAIL, FOUNDERS, PHONE_E164, ADDRESS, FOUNDING_DATE, ALL_PROFILES } from "../lib/site";

export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Texas is the stated coverage; the United States is kept because the work is
 *  genuinely not Texas-only (the meat-processing engagement is in New York). */
const AREA_SERVED = [
  { "@type": "State", name: "Texas" },
  { "@type": "Country", name: "United States" },
];

const ORGANIZATION = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Tracerlabs",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo-light.png`,
  image: `${SITE_URL}/assets/Tracer.png`,
  description:
    "Tracerlabs is an AI automation and marketing agency serving businesses across Texas. We generate leads and connect sales, scheduling, operations, invoicing, and payment workflows through custom CRM systems built around each company's SOPs.",
  email: CONTACT_EMAIL,
  telephone: PHONE_E164,
  foundingDate: FOUNDING_DATE,
  ...(ALL_PROFILES.length ? { sameAs: ALL_PROFILES } : {}),
  areaServed: AREA_SERVED,
  // Mailing address only — a coworking space, not a staffed office (see
  // site.ts). Serving Texas is not a branch network either: do not add further
  // locations without a verified address for each.
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.locality,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
  },
  founder: FOUNDERS.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role, sameAs: f.linkedin })),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT_EMAIL,
    telephone: PHONE_E164,
    areaServed: AREA_SERVED,
    url: `${SITE_URL}/#contact`,
  },
  knowsAbout: [
    "Lead generation",
    "Paid advertising funnels and ad creatives",
    "AI text agents for appointment booking",
    "AI voice agents",
    "Custom CRM development",
    "Business process automation",
    "Scheduling and fulfillment coordination",
    "Invoicing and payment collection workflows",
  ],
};

/** Identity-only reference, for pages that are not the home page. */
const ORG_REF = { "@type": "Organization", "@id": ORG_ID, name: "Tracerlabs", url: SITE_URL };

const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Tracerlabs",
  inLanguage: "en-US",
  publisher: { "@id": ORG_ID },
};

const webPage = (url: string, name: string, description: string) => ({
  "@type": "WebPage",
  "@id": `${url}#webpage`,
  url,
  name,
  description,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  inLanguage: "en-US",
});

/** Only used where the visible navigation really has this hierarchy: the nav
 *  links "Services" → /#tl-services and "Case studies" → /#tl-projects, and
 *  each page is reached from that section. */
const breadcrumb = (sectionName: string, sectionHash: string, pageName: string, pageUrl: string) => ({
  "@type": "BreadcrumbList",
  "@id": `${pageUrl}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Tracerlabs", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: sectionName, item: `${SITE_URL}/${sectionHash}` },
    { "@type": "ListItem", position: 3, name: pageName, item: pageUrl },
  ],
});

export type ServiceLd = { name: string; description: string; url: string; serviceType?: string };

export const SERVICES_LD: ServiceLd[] = [
  {
    name: "Lead generation and funnels",
    serviceType: "Lead generation",
    description:
      "Paid ad campaigns on Meta and Google, ad creatives, landing pages and funnels, lead verification, and conversion tracking wired from the ad through to the client's CRM.",
    url: `${SITE_URL}/services/lead-generation`,
  },
  {
    name: "AI follow-up and appointment booking",
    serviceType: "Marketing automation",
    description:
      "AI text agents that answer inquiries within minutes, qualify against the client's criteria, book appointments onto their calendar, and send text and email reminders with self-serve rescheduling.",
    url: `${SITE_URL}/services/ai-appointment-booking`,
  },
  {
    name: "AI voice agents",
    serviceType: "Marketing automation",
    description:
      "Inbound AI voice agents that answer calls, handle routine questions from the client's records, book appointments, and route anything outside their script to a person.",
    url: `${SITE_URL}/services/ai-voice-agents`,
  },
  {
    name: "Custom CRM development and business automation",
    serviceType: "Custom software development",
    description:
      "A custom CRM built around the client's standard operating procedures, connecting leads, appointments, schedules, projects, tasks, invoices, payments and payroll workflows in one interface.",
    url: `${SITE_URL}/services/custom-crm`,
  },
  {
    name: "Scheduling and fulfillment coordination",
    serviceType: "Business process automation",
    description:
      "Scheduling systems with capacity control, project and task boards, task delegation, meeting workflows and automated customer status updates, built around the client's own processes.",
    url: `${SITE_URL}/services/scheduling-and-operations`,
  },
  {
    name: "Invoicing, payment and payroll workflows",
    serviceType: "Business process automation",
    description:
      "Invoice creation from job data, invoice delivery by text and email, deposit and payment collection, and payroll workflows running on the same job and hours records.",
    url: `${SITE_URL}/services/invoicing-payments-payroll`,
  },
];

const serviceNode = (s: ServiceLd) => ({
  "@type": "Service",
  "@id": `${s.url}#service`,
  name: s.name,
  ...(s.serviceType ? { serviceType: s.serviceType } : {}),
  description: s.description,
  url: s.url,
  provider: { "@id": ORG_ID },
  areaServed: AREA_SERVED,
});

export function ldJson(graph: unknown[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

export function LdScript({ graph }: { graph: unknown[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(graph) }} />;
}

export type FaqItem = { q: string; a: string };

export const faqNode = (items: FaqItem[], id: string) => ({
  "@type": "FAQPage",
  "@id": id,
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** Home page: the full organization, the website, this page, the service
 *  catalogue, and the FAQ that is actually visible on it. */
export default function JsonLd({ faq = [] }: { faq?: FaqItem[] }) {
  const graph: unknown[] = [
    ORGANIZATION,
    WEBSITE,
    webPage(
      // trailing slash so the @id is `…/#webpage`, matching every other
      // fragment id on the site (`/#organization`, `/#website`, `/#faq`)
      `${SITE_URL}/`,
      "AI Marketing, Custom CRM & Business Automation | Tracerlabs",
      "Tracerlabs is an AI automation and marketing agency serving businesses across Texas — lead generation plus connected sales, scheduling, operations, invoicing and payment workflows in a custom CRM.",
    ),
    ...SERVICES_LD.map(serviceNode),
  ];
  if (faq.length) graph.push(faqNode(faq, `${SITE_URL}/#faq`));
  return <LdScript graph={graph} />;
}

/** A /services/* page. */
export function ServiceJsonLd({ service, faq = [] }: { service: ServiceLd; faq?: FaqItem[] }) {
  const graph: unknown[] = [
    ORG_REF,
    webPage(service.url, service.name, service.description),
    serviceNode(service),
    breadcrumb("Services", "#tl-services", service.name, service.url),
  ];
  if (faq.length) graph.push(faqNode(faq, `${service.url}#faq`));
  return <LdScript graph={graph} />;
}

/** A /work/* case study. `about` must never name a client the page itself
 *  keeps anonymous, and no result figure belongs in this markup. */
export function CaseStudyJsonLd({
  slug,
  name,
  headline,
  description,
  about,
  dateModified,
}: {
  slug: string;
  name: string;
  headline: string;
  description: string;
  about: string;
  dateModified: string;
}) {
  const url = `${SITE_URL}/work/${slug}`;
  return (
    <LdScript
      graph={[
        ORG_REF,
        webPage(url, name, description),
        {
          "@type": "Article",
          "@id": `${url}#article`,
          headline,
          description,
          url,
          mainEntityOfPage: { "@id": `${url}#webpage` },
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
          dateModified,
          about,
          inLanguage: "en-US",
        },
        breadcrumb("Case studies", "#tl-projects", name, url),
      ]}
    />
  );
}
