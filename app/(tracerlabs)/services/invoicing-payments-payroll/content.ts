import type { ServiceContent } from "../../../components/service/ServicePage";
import { SITE_URL } from "../../../lib/site";

const content: ServiceContent = {
  slug: "invoicing-payments-payroll",
  eyebrow: "Manage billing & payroll",
  title: "Invoicing, payment collection and payroll workflows connected to your CRM",
  metaDescription:
    "Invoice creation from job data, invoice delivery by text and email, deposit and payment collection through Square or Stripe, and payroll preparation workflows — connected to a custom CRM. Disbursement and tax filing stay with your providers.",
  intro:
    "Invoices generated from the work that was actually recorded, delivered with a payment link, reconciled against what was paid — and payroll runs prepared from the same hours and job data. The money-moving and tax-filing parts stay with your payment processor, payroll provider and accountant.",
  who: [
    "Businesses still typing invoices from paper sheets or memory, hours a week.",
    "Operations that lose slots or jobs to no-shows and want deposits collected before work is reserved.",
    "Owners preparing payroll from timesheets and job notes scattered across tools.",
  ],
  problem: {
    heading: "Manual invoicing and no financial overview",
    body: [
      "At a meat-processing farm invoicing was manual — hours of it — and financial visibility was whatever could be reconstructed from paper, memory and the bank statement. Customers had no way to see an invoice or change a booking without another phone call.",
      "Payroll preparation has the same shape: the data exists in job records and schedules, but someone re-keys it every cycle.",
    ],
  },
  implement: [
    { name: "Invoice creation", detail: "Invoices generated from the job data the system already holds — priced by your rate card, editable line by line when reality differs." },
    { name: "Invoice delivery", detail: "Sent by text and email with a payment link; at the farm the 'ready for pickup' text carries the invoice and a one-tap sign-in to the customer's account." },
    { name: "Deposit and payment collection", detail: "Square and Stripe in production. Deposits can gate a booking: the card is authorized first and captured once the booking lands, with an hourly reconciliation job that flags any charge without a booking." },
    { name: "Revenue overview", detail: "Invoices and payments flow into the owner's dashboard with a live revenue view." },
    { name: "Payroll workflows", detail: "Hours, jobs and rates prepared from the same records into the format your payroll provider needs, with approval before anything is submitted. Preparation only — see 'what stays with people'." },
  ],
  connects: [
    { to: "Scheduling & operations", how: "Completing a stage on the board can generate the invoice; the deposit gate protects the fulfillment calendar.", href: "/services/scheduling-and-operations" },
    { to: "Custom CRM", how: "Invoices, payments and payroll preparation are records in the CRM, visible in the owner overview.", href: "/services/custom-crm" },
    { to: "AI voice & text agents", how: "Customers asking about a balance or an invoice can be answered from the same records.", href: "/services/ai-voice-agents" },
  ],
  evidence: [
    {
      kind: "demo",
      title: "Meat processing: automated invoicing, deposits and the customer portal",
      body: "Invoices generated from cut-sheet data, delivered with the ready-for-pickup text, a customer portal for invoices and rescheduling, and a Square deposit gate — all in production and shown in the case study and demo video.",
      href: "/work/meat-processing-platform#back-office",
      linkLabel: "Read the back-office section",
    },
    {
      kind: "measured",
      title: "100% of first-week bookings arrived with the deposit paid",
      body: "20 of 20 bookings in the first week of paid ads at the farm, measured from the booking platform and Square.",
      href: "/work/meat-processing-platform#no-shows",
      linkLabel: "See the deposit gate",
    },
    {
      kind: "illustrative",
      title: "Payroll workflows",
      body: "We do not yet have a published client case study for payroll preparation. The capability is described as scoped, not as a measured result: data preparation and approval inside the CRM, with disbursement handled by your payroll provider.",
    },
  ],
  human: [
    "Payroll disbursement, tax withholding and filing, and accounting remain with you, your payroll provider and your accountant. We prepare data; we do not pay people or file taxes.",
    "Every payroll run and every invoice edit is approved by a person before it goes out.",
    "Refunds, disputes and pricing exceptions are decisions, surfaced to the owner.",
  ],
  faq: [
    { q: "Does a customer payment trigger payroll?", a: "No. Payroll is a connected administrative workflow on its own cadence, prepared from hours and job data. Customer payments reconcile against invoices; they do not run payroll." },
    { q: "Do you handle payroll taxes or compliance?", a: "No. We prepare the data for your payroll provider. Tax withholding, filing and compliance stay with that provider and your accountant." },
    { q: "Which payment processors?", a: "Square and Stripe are in production. Others are scoped per engagement." },
    { q: "Can customers pay a deposit before the work is scheduled?", a: "Yes — that is how the farm's slots work: no deposit, no slot." },
  ],
  related: [
    { label: "Custom CRM & business automation", href: "/services/custom-crm" },
    { label: "Scheduling & fulfillment coordination", href: "/services/scheduling-and-operations" },
    { label: "Meat processing case study", href: "/work/meat-processing-platform" },
  ],
  ld: {
    name: "Invoicing, payment and payroll workflows",
    description: "Invoice creation and delivery, deposit and payment collection through Square or Stripe, and payroll preparation workflows connected to the client's CRM.",
    url: `${SITE_URL}/services/invoicing-payments-payroll`,
  },
};
export default content;
