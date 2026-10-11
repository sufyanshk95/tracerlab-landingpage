import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

// Public marketing pages stay open to every crawler, including AI search
// crawlers (OAI-SearchBot, ClaudeBot, PerplexityBot…). Only the API and the
// internal SOP are disallowed; the proposal decks (/gnrg, /solrite) and the
// SOP already carry a noindex meta tag — a noindex must remain crawlable to be
// honored, so they are NOT disallowed here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/sales-sop"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
