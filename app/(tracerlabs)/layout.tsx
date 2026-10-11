import type { Metadata } from "next";
// Tailwind (no-preflight) + the componentized hero styles + legacy coexistence rules.
// Scoped to the main Tracerlabs site so it never touches standalone pages like /solar.
import "../globals.css";
import { Archivo, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import ScrollProgress from "../components/ScrollProgress";
import Analytics from "../components/Analytics";
import { SITE_URL } from "../lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

// "Telemetry" redesign display face — heavy grotesque for headings and buttons.
// Duborics remains only in the logo lockup. Rolled out incrementally: pages opt
// in via var(--font-archivo) until --font-display flips over site-wide.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const duborics = localFont({
  src: "../../public/fonts/DuboricsRegular.woff2",
  variable: "--font-duborics",
  display: "swap",
  weight: "400",
});

const TITLE = "AI Marketing, Custom CRM & Business Automation | Tracerlabs";
const DESCRIPTION =
  "Tracerlabs connects lead generation, AI follow-up, scheduling, operations, invoicing, payments, and payroll through custom CRMs built around your SOPs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Tracerlabs",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  icons: {
    icon: "/assets/favicon.ico",
    apple: "/assets/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Tracerlabs",
    locale: "en_US",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function TracerlabsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The next/font CSS vars (--font-jakarta/--font-duborics) are defined ON this wrapper by the
  // .variable classes. Redefine the Tailwind font tokens HERE too (not in globals @theme, which
  // is declared on :root — an ancestor that can't see these descendant vars) so var(--font-*)
  // resolves to the self-hosted fonts and inherits into every #tl-* section.
  return (
    <div
      className={`${jakarta.variable} ${duborics.variable} ${archivo.variable}`}
      style={
        {
          "--font-display": 'var(--font-duborics), "Plus Jakarta Sans", sans-serif',
          "--font-body": 'var(--font-jakarta), system-ui, sans-serif',
        } as React.CSSProperties
      }
    >
      <ScrollProgress />
      <Analytics />
      {children}
      {/* film grain over everything, dark mode only (globals .nt-grain) */}
      <div aria-hidden className="nt-grain" />
    </div>
  );
}
