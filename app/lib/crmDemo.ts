// ─────────────────────────────────────────────────────────────────────────────
// Sample data for the CRM demonstration on the home page.
//
// ⚠️ ENTIRELY FICTIONAL. This is a product demonstration, not a live dashboard:
// no real customer, job, invoice or payment is represented, nothing here is
// connected to any system, and the UI performs NO external action — it does not
// send messages, create appointments, issue invoices, take payments or run
// payroll. The section labels itself "Interactive example · sample data".
//
// One customer and one job run through all six stages, so the story stays
// consistent: the lead card becomes the customer record, the booked slot shows
// up in that record, the job appears on the calendar and the board, the
// completed job produces the invoice, and the payment settles that same
// invoice in the overview. Keep every figure below internally consistent —
// the line items must sum to INVOICE.total.
// ─────────────────────────────────────────────────────────────────────────────

export const CUSTOMER = {
  name: "Dana Whitfield",
  initials: "DW",
  area: "Maple Ridge",
  service: "AC not cooling",
  source: "Website form",
  ref: "LEAD-2288",
};

export const JOB = {
  ref: "JOB-2041",
  title: "Condenser fan motor replacement",
  /** The SALES appointment — an estimate visit, booked by the AI agent. */
  appointment: "Thu 2:00 PM · estimate visit",
  /** The FULFILLMENT work — a different calendar from the sales appointment,
   *  with its own capacity rules. The crew that fills this slot is assigned at
   *  a later stage (see CREW), so do not name technicians here. */
  workSlot: "Fri 9:00–12:00",
};

export const TASKS = [
  { name: "Confirm part in stock", owner: "Ops", state: "Done" as const },
  { name: "Replace condenser fan motor", owner: "Field crew", state: "Done" as const },
  { name: "Test system and sign off", owner: "Field crew", state: "Done" as const },
];

export const INVOICE = {
  ref: "INV-1088",
  lines: [
    { label: "Service call & diagnostic", amount: 95 },
    { label: "Condenser fan motor (part)", amount: 310 },
    { label: "Labour — 2.5 hrs", amount: 300 },
  ],
  total: 705,
  delivery: "Sent by text and email",
  payment: "Card ending 4417",
};

/** Stage 7: the scheduling system matches the job to a crew that can do it.
 *  Distinct from JOB.workSlot, which is the slot itself — this is who fills it. */
export const CREW = {
  name: "Crew B",
  size: "2 technicians",
  skill: "HVAC · condenser units",
  notified: "Fri 9:00–12:00 window",
};

/** Stage 8: parts the job needs, ordered against the same job record. */
export const SUPPLIER = {
  name: "Northline Parts",
  po: "PO-3312",
  item: "Condenser fan motor",
  status: "Confirmed · ships Thu",
};

/** Stage 9. NOTE: the demo shows requests being SENT — never a received
 *  rating, star count or quote. Inventing customer feedback would be a
 *  fabricated testimonial. */
export const FOLLOW_THROUGH = {
  review: "Request sent · awaiting response",
  referral: "Referral link shared",
};

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export type Stage = {
  id: string;
  nav: string;
  title: string;
  /** One sentence: what changed. Rendered in the navigator, so it is in the
   *  server HTML for every stage — the explanation never depends on JS. */
  line: string;
  /** The single line the activity feed shows for this stage. */
  feed: string;
};

export const STAGES: Stage[] = [
  {
    id: "inquiry",
    nav: "Inquiry received",
    title: "Inquiry received",
    line: "A website form submission arrives and becomes a lead record in the CRM.",
    feed: `${CUSTOMER.ref} created from ${CUSTOMER.source.toLowerCase()}`,
  },
  {
    id: "booking",
    nav: "AI follow-up",
    title: "AI follow-up and sales appointment booked",
    line: "An AI text agent replies, offers times, and books the sales appointment — an estimate visit — onto the sales calendar.",
    feed: `Sales appointment booked — ${JOB.appointment}`,
  },
  {
    id: "scheduled",
    nav: "Job approved",
    title: "Customer approves the job and work is scheduled",
    line: "After the estimate the customer approves the quote, and the work takes a slot on the fulfillment calendar — not the sales one.",
    feed: `${JOB.ref} scheduled — ${JOB.workSlot}`,
  },
  {
    id: "team",
    nav: "Team assigned",
    title: "Team assigned",
    line: "Scheduling matches the job to a crew who can do it, and the customer is told when to expect them.",
    feed: `${CREW.name} assigned — customer notified of the ${CREW.notified}`,
  },
  {
    id: "suppliers",
    nav: "Suppliers coordinated",
    title: "Suppliers coordinated",
    line: "The parts the job needs are ordered from the supplier and tracked against the same job record.",
    feed: `${SUPPLIER.po} raised with ${SUPPLIER.name} — ${SUPPLIER.status}`,
  },
  {
    id: "tasks",
    nav: "Work completed",
    title: "Work tracked and completed",
    line: "The crew does the work on site; the board records each step and texts the customer as it changes.",
    feed: `${JOB.ref} complete — customer notified`,
  },
  {
    id: "invoice",
    nav: "Invoice sent",
    title: "Invoice sent",
    line: "The completed job produces the invoice, priced from what was actually recorded.",
    feed: `${INVOICE.ref} sent — ${money(INVOICE.total)}`,
  },
  {
    id: "payment",
    nav: "Payment recorded",
    title: "Payment recorded",
    line: "Payment settles the same invoice against the job.",
    feed: `${INVOICE.ref} paid — ${money(INVOICE.total)}`,
  },
  {
    id: "follow-through",
    nav: "Review & referral",
    title: "Review and referral follow-up",
    line: "Once the job is fulfilled, review and referral requests go out, and the overview closes the loop.",
    feed: "Review and referral requests sent",
  },
];

/** Look a stage up by id. Panels and status badges key off THIS, never a bare
 *  array index — reordering the walkthrough then cannot desynchronise them. */
export const stageIndex = (id: string) => STAGES.findIndex((s) => s.id === id);

