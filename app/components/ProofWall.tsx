// Proof wall — the Precocity-style credibility strip: one client, one number,
// nothing else. RETIRED / unmounted — superseded by Evidence.tsx (which adds
// scope + source per figure). Figures kept in sync with Evidence so nothing
// stale ships if this is ever remounted.
const DISPLAY = "var(--font-archivo), system-ui, sans-serif";

const PROOF = [
  { v: "$40–$52", l: "advertising cost per booked appointment", who: "Home services, meat processing & med spa accounts" },
  { v: "124", l: "solar deals closed from 817 leads (15.2%)", who: "A Texas solar company — owner-reported" },
  { v: "39.8%", l: "of initially unbooked leads converted by AI follow-up (158 of 397)", who: "Same client — owner-reported cohort" },
  { v: "20", l: "paid bookings in week one, deposits paid", who: "Meat processing" },
];

export default function ProofWall() {
  return (
    <section className="font-body w-full bg-page text-ink">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10">
        <div className="nt-hairline" />
        <dl className="grid grid-cols-2 gap-x-8 gap-y-8 py-12 sm:py-14 lg:grid-cols-4">
          {PROOF.map((p, i) => (
            <div key={p.l} className={i > 0 ? "lg:border-l lg:border-ink/10 lg:pl-8" : ""}>
              <dt className="text-[0.82rem] text-ink/45">{p.who}</dt>
              <dd className="mt-2">
                <span
                  className="block text-[2.2rem] font-extrabold leading-none tracking-tight text-ink"
                  style={{ fontFamily: DISPLAY }}
                >
                  {p.v}
                </span>
                <span className="mt-1.5 block text-[0.9rem] leading-snug text-ink/55">{p.l}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
