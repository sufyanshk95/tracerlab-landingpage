import type { ServiceContent } from "../../../components/service/ServicePage";
import { SITE_URL } from "../../../lib/site";

const content: ServiceContent = {
  slug: "custom-crm",
  eyebrow: "Oversee everything",
  title: "Custom CRMs and business automation built around your SOPs",
  metaDescription:
    "A custom CRM that connects leads, appointments, schedules, projects, tasks, invoices, payments and payroll workflows in one interface, built around how your company operates. See the working meat-processing platform.",
  intro:
    "Off-the-shelf CRMs make you run your business their way. We build the CRM around your standard operating procedures, then connect the automated workflows — follow-up, booking, scheduling, boards, invoicing — so you oversee the whole business from one place. A meat-processing farm runs on one today.",
  who: [
    "Owners running the business across a phone, a spreadsheet, a calendar app and paper — and paying for the gaps between them.",
    "Businesses with a real process (intake, scheduling, fulfillment, billing) that generic software does not model.",
    "Companies already using our lead generation or booking agents who want the rest of the operation connected.",
  ],
  problem: {
    heading: "The coordination work between systems",
    body: [
      "The expensive part of most service businesses is not the work; it is the coordination around it. Re-asking the customer what they want, checking a calendar, finding out where a job is, typing an invoice from a paper sheet, calling the customer back.",
      "One meat-processing farm's constraint was capacity, not demand: bookings, cut-sheet preferences and status questions all went through a phone call and a piece of paper, and that coordination ate the hours the family needed for processing.",
    ],
  },
  implement: [
    { name: "SOP mapping", detail: "We document how work actually moves through your business — every hand-off, tool and decision — before designing anything. This is step one of every engagement." },
    { name: "The CRM itself", detail: "A web application (Next.js, Supabase/Postgres, hosted on Vercel) with the records your business runs on: customers, inquiries, appointments, jobs, invoices, payments." },
    { name: "Connected workflows", detail: "AI follow-up and booking, scheduling and capacity, processing boards with customer notifications, invoicing and payment collection — each one writing to the same records." },
    { name: "Customer-facing side", detail: "Self-serve booking, a customer portal for invoices and rescheduling, and status texts triggered by stage changes." },
    { name: "Owner overview", detail: "One admin view of the operation. At that farm it includes bookings, the processing board, invoices and a revenue view the owners plan against." },
    { name: "Approvals and exceptions", detail: "Steps that need a decision — pricing exceptions, capacity overrides, refunds — are surfaced to the right person rather than automated." },
  ],
  connects: [
    { to: "Lead generation", how: "Leads and their source campaign land in the CRM, so ad spend can be judged on outcomes.", href: "/services/lead-generation" },
    { to: "AI follow-up & voice", how: "Conversations, qualification answers and bookings are recorded on the customer's record.", href: "/services/ai-appointment-booking" },
    { to: "Scheduling & operations", how: "The fulfillment calendar and the project boards are views of the same data.", href: "/services/scheduling-and-operations" },
    { to: "Invoicing, payments & payroll", how: "Invoices are generated from job records; payments reconcile against them; payroll workflows draw hours and job data from the same place.", href: "/services/invoicing-payments-payroll" },
  ],
  evidence: [
    {
      kind: "demo",
      title: "The meat-processing platform — the working system",
      body: "Online booking with the cut sheet built in, Square deposit gate, owner-controlled capacity, a processing board that texts customers at each stage, an AI receptionist for order status, automated invoicing, a customer portal and an admin dashboard. The demo video on the home page is the real platform.",
      href: "/work/meat-processing-platform",
      linkLabel: "Read the case study",
    },
    {
      kind: "measured",
      title: "20 paid bookings in the first week of ads, all with deposits",
      body: "Measured from the farm's booking platform and Square in the first week of paid campaigns.",
      href: "/work/meat-processing-platform#no-shows",
      linkLabel: "See the deposit gate",
    },
    {
      kind: "illustrative",
      title: "The overview panel on our home page",
      body: "The CRM overview shown on the home page is an illustrative interface with sample data. Real interfaces are scoped per client.",
      href: "/#tl-crm",
      linkLabel: "See the illustration",
    },
  ],
  human: [
    "Physical fulfillment and quality decisions stay with your staff; the system records and routes them.",
    "Pricing exceptions, refunds, capacity overrides and customer disputes are approvals, not automations.",
    "Which systems connect, what syncs automatically and who can see what are decided with you during SOP mapping — we do not claim integrations or access controls before they are scoped.",
  ],
  faq: [
    { q: "Why not HubSpot, GoHighLevel or Jobber?", a: "Sometimes those are the right answer, and we use GoHighLevel on some lead-generation accounts. A custom CRM is for businesses whose process — cut sheets, deposit rules, per-day capacity, multi-stage processing — does not fit a template." },
    { q: "Do I own the software?", a: "Ownership, hosting and support terms are set in the engagement agreement; ask on the discovery call." },
    { q: "Does it integrate with my accounting or payroll software?", a: "Integrations are scoped per engagement. Square and Stripe are in production for payments; invoicing runs inside the CRM. Payroll workflows prepare data for your payroll provider rather than replacing it." },
    { q: "How long does it take?", a: "It depends on scope. The process is the same for every engagement: map SOPs, define scope and human responsibilities, build and connect, test and launch, then monitor where included." },
  ],
  related: [
    { label: "Scheduling & fulfillment coordination", href: "/services/scheduling-and-operations" },
    { label: "Invoicing, payments & payroll workflows", href: "/services/invoicing-payments-payroll" },
    { label: "Meat processing case study", href: "/work/meat-processing-platform" },
  ],
  ld: {
    name: "Custom CRMs and business automation",
    description: "A custom CRM built around the client's SOPs that connects leads, appointments, schedules, projects, tasks, invoices, payments and payroll workflows.",
    url: `${SITE_URL}/services/custom-crm`,
  },
};
export default content;
