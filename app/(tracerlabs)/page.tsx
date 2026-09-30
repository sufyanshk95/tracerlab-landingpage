import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Evidence from "../components/Evidence";
import TechBar from "../components/TechBar";
import Services from "../components/Services";
import CrmOverview from "../components/CrmOverview";
import Testimonials from "../components/Testimonials";
import Projects from "../components/Projects";
import Process from "../components/Process";
import Faq, { HOME_FAQ } from "../components/Faq";
import Team from "../components/Team";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import StickyCtaBar from "../components/StickyCtaBar";
import { BOOKING_URL } from "../lib/site";

// Home page order — each section has ONE job, and nothing repeats another's:
//   Hero            the offer
//   Evidence        selected results (credibility)
//   TechBar         tools we build with
//   Services        what you can buy — the complete capability list lives HERE
//   CrmOverview     how the system works, demonstrated on one job
//   Testimonials    clients in their own words (renders only when published)
//   Projects        detailed project evidence
//   Process         how an engagement runs
//   Faq             remaining buying questions
//   Team / Cta      who you'd work with, then the next step
// <main id="content"> keeps its id for legacy references.
export default function Home() {
  return (
    <>
      <JsonLd faq={HOME_FAQ} />
      <Nav />
      <Hero />
      <main id="content">
        <Evidence />
        <TechBar />
        <Services />
        <CrmOverview />
        <Testimonials />
        <Projects />
        <Process />
        <Faq />
        <Team />
        <Cta />
        <StickyCtaBar
          heroId="tl-hero"
          ctaId="tl-cta"
          /* The CRM walkthrough's controls and the testimonial players both sit
             near the bottom edge, where this bar floats — it stands down over
             both. */
          yieldToIds={["tl-crm", "tl-testimonials"]}
          message="Find the bottlenecks in your lead flow, scheduling and billing"
          buttonLabel="Book a discovery call"
          buttonHref={BOOKING_URL}
        />
        <Footer />
      </main>
    </>
  );
}
