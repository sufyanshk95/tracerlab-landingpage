import type { ServiceContent } from "../../../components/service/ServicePage";
import { SITE_URL } from "../../../lib/site";

const content: ServiceContent = {
  slug: "scheduling-and-operations",
  eyebrow: "Coordinate operations",
  title: "Scheduling systems and fulfillment coordination built around your SOPs",
  metaDescription:
    "Scheduling systems for the work after the sale, project and task coordination, meeting workflows and task delegation — built around your standard operating procedures and connected to your CRM.",
  intro:
    "Booking a sales appointment and scheduling the work to deliver the service are different problems. This is the second one: capacity, slots, boards, tasks and the customer updates that go with them — built around how your operation actually runs.",
  who: [
    "Operations with real capacity limits — processing slots, crews, rooms, machines — that get overbooked or under-used.",
    "Teams tracking jobs on a whiteboard, a group chat or memory, and fielding 'where is my order?' calls.",
    "Owners who want fulfillment work, meetings and delegated tasks visible in one place without becoming the switchboard.",
  ],
  problem: {
    heading: "Wasted slots and status calls",
    body: [
      "Processing capacity is the whole business at a meat-processing farm: there are only so many slots in a week. People booked one and never showed; the slot produced nothing. Once an animal was dropped off, the only way to know its status was to call — and someone had to stop working to answer.",
      "The pattern repeats in home services and med spas: the sales appointment gets booked, then the job itself is coordinated by hand.",
    ],
  },
  implement: [
    { name: "Fulfillment scheduling", detail: "A calendar for the work itself, separate from sales bookings, with owner-controlled capacity: blocked days and per-day caps (the farm sets, for example, 500 chickens on a Wednesday and 1,200 on a Friday)." },
    { name: "Deposit-gated slots", detail: "Where it fits your business, a slot is only reserved once a deposit is paid, so no-shows stop costing capacity." },
    { name: "Project and task boards", detail: "Stage-based boards your staff move work through (Dropped Off → Processing → Ready → Picked Up at the farm), with tasks delegated to the right person at each stage." },
    { name: "Customer status updates", detail: "Every stage move can text the customer automatically; the 'ready for pickup' message arrives with the invoice and a sign-in link." },
    { name: "Meeting and task-delegation automation", detail: "Agendas, notes and follow-up tasks created from meetings and assigned in the same system. We run this internally through our own agents; client scope is set on the call." },
    { name: "Self-serve rescheduling", detail: "Customers move their own slot from a portal instead of calling." },
  ],
  connects: [
    { to: "AI follow-up & booking", how: "A booked sales appointment becomes a job record once the customer says yes; the job is then scheduled here.", href: "/services/ai-appointment-booking" },
    { to: "AI voice agents", how: "The receptionist answers status questions from the same board your staff update.", href: "/services/ai-voice-agents" },
    { to: "Invoicing, payments & payroll", how: "Completing a stage can generate the invoice from the job data; hours and job records feed payroll preparation.", href: "/services/invoicing-payments-payroll" },
    { to: "Custom CRM", how: "Schedules and boards are views of the CRM's records, not a separate tool.", href: "/services/custom-crm" },
  ],
  evidence: [
    {
      kind: "demo",
      title: "Meat processing: booking, capacity, processing board and notifications",
      body: "The working platform: farmers book their own slots with the cut sheet built in, the owner controls capacity from an admin calendar, staff move orders across a board that texts the customer at each stage. Shown in the demo video on the home page.",
      href: "/work/meat-processing-platform#status",
      linkLabel: "Read the case study",
    },
    {
      kind: "measured",
      title: "Deposit gate: 20 of 20 first-week bookings paid up front",
      body: "Measured from the booking platform and Square in the first week of paid campaigns at the farm.",
      href: "/work/meat-processing-platform#no-shows",
      linkLabel: "See the deposit gate",
    },
  ],
  human: [
    "The physical work — processing, installs, treatments — is done by your staff. The system schedules, tracks and notifies.",
    "Staff move jobs between stages; the system does not guess where a job is.",
    "Capacity rules, blocked days and exceptions are set by the owner.",
  ],
  faq: [
    { q: "Is this the same as appointment booking?", a: "No. Appointment booking puts a prospect on a sales calendar. This schedules the fulfillment work after the sale, on a separate calendar with capacity rules." },
    { q: "Can customers change their own slot?", a: "Yes, from a portal — the farm's customers reschedule their own bookings without a call." },
    { q: "What if my process has more stages than a kanban board?", a: "Boards are built from your SOP; stages, tasks and notifications are whatever your process needs." },
  ],
  related: [
    { label: "Custom CRM & business automation", href: "/services/custom-crm" },
    { label: "Invoicing, payments & payroll workflows", href: "/services/invoicing-payments-payroll" },
    { label: "Meat processing case study", href: "/work/meat-processing-platform" },
  ],
  ld: {
    name: "Scheduling and fulfillment coordination",
    description: "Scheduling systems with capacity control, project and task boards, meeting workflows, task delegation and customer status updates built around client SOPs.",
    url: `${SITE_URL}/services/scheduling-and-operations`,
  },
};
export default content;
