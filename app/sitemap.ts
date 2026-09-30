import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

// Every indexable page, on the canonical www host. Proposal decks (/gnrg,
// /solrite, /insurance) and the internal SOP are noindex and deliberately absent.
const LAST = new Date("2026-09-22");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST,
    changeFrequency,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/services/lead-generation", 0.9),
    page("/services/ai-appointment-booking", 0.9),
    page("/services/ai-voice-agents", 0.9),
    page("/services/custom-crm", 0.9),
    page("/services/scheduling-and-operations", 0.8),
    page("/services/invoicing-payments-payroll", 0.8),
    page("/work/solar-lead-engine", 0.9),
    page("/work/meat-processing-platform", 0.9),
    page("/growth-audit", 0.6),
    page("/solar", 0.6),
  ];
}
