import type { ServiceContent } from "../../../components/service/ServicePage";
import { SITE_URL } from "../../../lib/site";

const content: ServiceContent = {
  slug: "ai-voice-agents",
  eyebrow: "Convert inquiries",
  title: "Inbound AI voice agents that answer calls and schedule appointments",
  metaDescription:
    "Inbound AI voice agents that pick up every call, answer routine questions from your records, and book appointments on your calendar — with every call logged for your team. Try the working demo on our site.",
  intro:
    "An inbound voice agent answers the phone when your team cannot: it handles the routine questions, looks up the caller's record where it has one, and books the appointment. Everything it says and does is logged. You can try one on this site — it is the same kind of agent we build for clients.",
  who: [
    "Service businesses whose phone rings while everyone is on a job, on the floor or after hours.",
    "Businesses that already run an AI text agent and want callers handled with the same qualification and booking rules.",
    "Owners who want every call transcribed and visible, not lost to voicemail.",
  ],
  problem: {
    heading: "The phone is the front desk, and nobody is at the desk",
    body: [
      "At a meat-processing farm the phone was the order form, the status line and the filing cabinet. Every 'is my order ready?' meant someone stopped processing, found out, and called back. That is administrative work a system can do; the processing is not.",
      "For sales inquiries the cost is different: a caller who reaches voicemail rarely calls back, and the appointment goes elsewhere.",
    ],
  },
  implement: [
    { name: "Inbound voice agent", detail: "Answers calls in a natural voice, follows your script, and books the appointment into your calendar during the call." },
    { name: "Record lookup", detail: "Where the agent has access to your CRM or order data, it answers status questions from live records — as the farm's receptionist does for order status." },
    { name: "Qualification and booking", detail: "The same criteria and calendar rules as the AI text agent, so a caller and a texter end up with the same kind of appointment." },
    { name: "Transcripts and notifications", detail: "Every call is transcribed; call details and the recording link are sent to your team after the call. Our own demo agent texts and emails both founders after each conversation." },
    { name: "Routing to people", detail: "Anything outside the script — complaints, exceptions, decisions — is routed to a person with the context attached." },
  ],
  connects: [
    { to: "AI follow-up & booking", how: "Shares qualification rules and the booking calendar with the text agent.", href: "/services/ai-appointment-booking" },
    { to: "Custom CRM", how: "Calls, transcripts and bookings are recorded against the customer's record.", href: "/services/custom-crm" },
    { to: "Scheduling & operations", how: "For existing customers, the agent reads status from the same board your staff update.", href: "/services/scheduling-and-operations" },
  ],
  evidence: [
    {
      kind: "demo",
      title: "Try our discovery-call agent",
      body: "The voice agent on our home page runs a short discovery conversation in your browser and can book a call on our calendar through Cal.com. It is a working demonstration built on Retell; the booking is real, so only complete it if you want the call.",
      href: "/#contact",
      linkLabel: "Go to the demo",
    },
    {
      kind: "demo",
      title: "A meat-processing farm's AI receptionist",
      body: "When customers still call the farm, an AI receptionist answers, looks up the live order status from the processing board, and handles routine questions. Part of the platform described in the case study.",
      href: "/work/meat-processing-platform#status",
      linkLabel: "Read the case study",
    },
    {
      kind: "illustrative",
      title: "An insurance agency scenario",
      body: "An example of the same pattern for existing-customer support: the agent verifies the caller, texts an ID card or policy document, reads back billing, takes a first notice of loss, and routes anything complex to the right department. It is a scenario, not a client result.",
    },
  ],
  human: [
    "You define what the agent may answer and what it must route to a person.",
    "Your team handles complaints, exceptions and anything requiring judgment; the agent hands over with the transcript.",
    "Call recording and consent notices are set up with you before launch.",
  ],
  faq: [
    { q: "Does the agent sound like a robot?", a: "Try the demo on our home page and judge for yourself. It uses a natural voice and follows a script you approve." },
    { q: "What happens when it does not know the answer?", a: "It says so, takes a message or books a callback, and routes the call to a person with the transcript." },
    { q: "Can it take orders or payments?", a: "It can book appointments and look up records. Payments are collected through links and deposits in the invoicing workflow, not read over the phone." },
    { q: "Is every call recorded?", a: "Calls handled by the agent are transcribed and can be recorded; the consent notice is agreed with you before launch." },
  ],
  related: [
    { label: "AI follow-up & appointment booking", href: "/services/ai-appointment-booking" },
    { label: "Custom CRM & business automation", href: "/services/custom-crm" },
    { label: "Meat processing case study", href: "/work/meat-processing-platform" },
  ],
  ld: {
    name: "AI voice agents",
    description: "Inbound AI voice agents that answer calls, look up records, book appointments and log transcripts for the team.",
    url: `${SITE_URL}/services/ai-voice-agents`,
  },
};
export default content;
