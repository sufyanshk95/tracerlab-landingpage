import { Section, SectionHead } from "./primitives";
import { PROOF_STATS, TESTIMONIAL } from "../config";

export default function Proof() {
  return (
    <Section id="proof" className="border-t border-line/60">
      <SectionHead
        kicker="Proof"
        title="The system behind a Texas solar company's pipeline"
        sub="One solar client gets a consistent flow of verified leads and booked consultations without a door-to-door team. The funnel and AI booking agent handle the follow-up; the client's reps run the consultations. Figures below are that client's, April–September 2026."
      />

      {/* Stat band */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {PROOF_STATS.filter((s) => !s.placeholder).map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-line bg-surface/50 p-6 text-center"
          >
            <p className="font-display text-[2.4rem] font-bold leading-none text-cream">
              <span className="text-gradient">
                {s.value}
              </span>
            </p>
            <p className="mt-2 text-[0.84rem] leading-snug text-sand">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Testimonial — hidden until a real, approved quote is in config */}
      {!TESTIMONIAL.placeholder && (
      <figure className="mt-6 rounded-2xl border border-solar/20 bg-gradient-to-br from-surface to-base-2 p-8 sm:p-10">
        <div className="text-solar" aria-hidden>
          <span className="font-display text-5xl leading-none">&ldquo;</span>
        </div>
        <blockquote
          className={`font-display mt-2 text-[clamp(1.3rem,2.3vw,1.9rem)] font-medium leading-snug ${
            TESTIMONIAL.placeholder ? "text-sand/70 italic" : "text-cream"
          }`}
        >
          {TESTIMONIAL.quote}
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-amber to-ember font-display font-bold text-[#1a0f02]">
            TX
          </span>
          <div>
            <p className="font-semibold text-cream">{TESTIMONIAL.name}</p>
            <p className="text-[0.85rem] text-faint">{TESTIMONIAL.company}</p>
          </div>
        </figcaption>
      </figure>
      )}
      <p className="mt-6 text-center text-[0.85rem] text-faint">
        Full problem → solution → results write-up, with definitions and limits:{" "}
        <a href="/work/solar-lead-engine" className="underline decoration-line underline-offset-4 hover:text-cream">the solar case study</a>.
        Results are one client&apos;s and are not a guarantee.
      </p>
    </Section>
  );
}
