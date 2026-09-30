import type { ServiceContent } from "../../../components/service/ServicePage";
import { SITE_URL } from "../../../lib/site";

const content: ServiceContent = {
  slug: "ai-appointment-booking",
  eyebrow: "Convert inquiries",
  title: "AI follow-up and appointment booking: text agents that turn inquiries into booked appointments",
  metaDescription:
    "AI text agents that answer every inquiry within minutes, qualify it against your criteria, book the appointment on your calendar, and send text and email reminders with self-serve rescheduling.",
  intro:
    "An inquiry that waits hours for a reply often goes to a competitor. Our AI text agents open the conversation within a couple of minutes, qualify against your criteria, book the appointment into your calendar and remind the prospect before it happens. Your team runs the appointment.",
  who: [
    "Any business whose leads arrive by form, ad or message and need a booked appointment before a sale — solar, home services, med spas, processors.",
    "Teams that cannot answer every lead in minutes, especially after hours.",
    "Owners who lose appointments to no-shows and want reminders and rescheduling handled automatically.",
  ],
  problem: {
    heading: "Cold leads and empty slots",
    body: [
      "Leads decay by the hour. On one solar account, leads waited hours — sometimes days — for a callback, and around half of them never booked a time through the funnel itself.",
      "And an appointment that is booked but not kept still wastes a rep's hour, which is why a confirmation agent reminds every prospect and turns a change of plan into a reschedule rather than an empty slot. We publish no attendance or show-rate figure: attendance needs its own records.",
    ],
  },
  implement: [
    { name: "AI text agent", detail: "Opens the conversation within minutes of an inquiry, answers first questions from your script, coordinates a time and books it into your calendar, around the clock." },
    { name: "Qualification", detail: "Asks the questions you define — property, timeline, service type — before a slot is offered, so your calendar fills with prospects who match your criteria." },
    { name: "Appointment booking", detail: "Books the sales appointment into your calendar with the lead's details attached. Cal.com and GoHighLevel are both in production on our own systems and client work." },
    { name: "Confirmation and reminders", detail: "Text and email reminders before the appointment; when plans change, the prospect reschedules in the same thread and the slot is freed." },
    { name: "Inbound voice", detail: "For callers rather than texters, an inbound AI voice agent answers and schedules against the same rules — see AI voice agents." },
    { name: "Lead verification upstream", detail: "When we also run the ads, a carrier line-type check plus an SMS code means the agent is only ever texting real, reachable numbers — on the solar engine that removed the roughly 1-in-5 unusable numbers." },
  ],
  connects: [
    { to: "Lead generation", how: "The agent receives verified leads from the funnel, so it is texting real, reachable people.", href: "/services/lead-generation" },
    { to: "AI voice agents", how: "The same qualification and booking rules power inbound calls.", href: "/services/ai-voice-agents" },
    { to: "Custom CRM", how: "Each conversation, qualification answer and booked appointment is recorded against the lead in the CRM.", href: "/services/custom-crm" },
    { to: "Scheduling & operations", how: "Booking the sales appointment is separate from scheduling the fulfillment work, which happens after the customer says yes.", href: "/services/scheduling-and-operations" },
  ],
  evidence: [
    {
      kind: "measured",
      title: "39.8% of initially unbooked leads converted",
      body: "A Texas solar company: of the 397 leads that did not book through the funnel initially, AI text follow-up converted 158 into bookings — the leads the funnel had already lost. Owner-reported for that cohort; the case study explains how the workflow ran.",
      href: "/work/solar-lead-engine#speed",
      linkLabel: "Read the solar case study",
    },
    {
      kind: "demo",
      title: "Customer messaging in production at a meat-processing farm",
      body: "Every stage change on the farm's processing board texts the customer, and the ready-for-pickup message carries their invoice and a one-tap sign-in link.",
      href: "/work/meat-processing-platform#status",
      linkLabel: "See it in the case study",
    },
  ],
  human: [
    "Your team runs the sales appointment and closes. The agent books it; it does not sell.",
    "You define the qualification criteria, the calendar rules and the script the agent works from.",
    "Conversations that need judgment — pricing exceptions, complaints, unusual requests — belong with a person.",
  ],
  faq: [
    { q: "What share of leads does the text agent book?", a: "It depends on the market, the offer and the lead source. On the one client we publish, the agent converted 39.8% of the leads that had not booked through the funnel initially — 158 out of 397. We do not publish a portfolio-wide conversion rate, because the period, sample and denominator differ per account." },
    { q: "Does the agent replace my sales reps?", a: "No. It removes the waiting — the first reply, the back-and-forth to find a time, the reminder — so reps spend their day in appointments rather than chasing a call list." },
    { q: "Which calendar does it book into?", a: "Your existing one where we can connect to it. Cal.com and GoHighLevel are both in production; anything else is scoped on the discovery call." },
    { q: "Can it message existing customers, not just leads?", a: "Yes. The same messaging drives customer status updates — at a meat-processing farm every stage change on the processing board texts the customer, and the ready-for-pickup message carries their invoice." },
  ],
  related: [
    { label: "AI voice agents", href: "/services/ai-voice-agents" },
    { label: "Lead generation & funnels", href: "/services/lead-generation" },
    { label: "Solar case study", href: "/work/solar-lead-engine" },
  ],
  ld: {
    name: "AI follow-up and appointment booking",
    description: "AI text agents that answer inquiries within minutes, qualify, book appointments, and send text and email reminders with self-serve rescheduling.",
    url: `${SITE_URL}/services/ai-appointment-booking`,
  },
};
export default content;
