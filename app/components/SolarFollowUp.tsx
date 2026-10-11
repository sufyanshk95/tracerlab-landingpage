// The AI follow-up result, drawn from app/lib/solarResults.ts.
//
// ⚠️ This is deliberately NOT a partition of all 817 leads. The recorded
// booking counts (420 direct, 578 combined) are not deduplicated, so any
// diagram that splits the whole lead population into booked/unbooked groups
// would present duplicate-containing counts as unique leads. This shows only
// the one cohort the owner defined in lead terms: of the 397 leads that did
// not book through the funnel initially, AI text follow-up converted 158.
//
// Every number is written out in HTML beside the bar, so the figure reads the
// same to a screen reader, with images off, or in a text-only crawl.
//
// Only the converted share is drawn. The remainder (397 − 158) is deliberately
// NOT shown: that count is on the withheld list until booking records are
// deduplicated, so the bar shows the published conversion and nothing derived
// from an un-reconciled subtraction.
import { FOLLOW_UP_RATE, FOLLOW_UP_SOURCE, SOLAR } from "../lib/solarResults";

const DISPLAY = "var(--font-archivo), system-ui, sans-serif";

export default function SolarFollowUp() {
  return (
    <figure className="m-0 mt-8 max-w-[42rem]">
      <div className="border border-ink/12 bg-surface/40 p-5 sm:p-6">
        <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink/40">
          The follow-up cohort
        </div>
        <div className="mt-2 text-[1.02rem] leading-[1.6] text-ink/75">
          <span className="font-bold text-ink" style={{ fontFamily: DISPLAY }}>
            {SOLAR.initiallyUnbooked} leads
          </span>{" "}
          did not book through the funnel initially. AI text follow-up worked that group.
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-[0.95rem] font-semibold text-ink" style={{ fontFamily: DISPLAY }}>
              <span className="tabular-nums">{SOLAR.followUpConverted}</span> converted into bookings
            </span>
            <span className="text-[0.82rem] text-ink/55">
              {FOLLOW_UP_RATE}% of the {SOLAR.initiallyUnbooked}
            </span>
          </div>
          <div className="mt-1.5 h-2.5 w-full bg-ink/[0.07]">
            <div className="h-full" style={{ width: `${FOLLOW_UP_RATE}%`, backgroundColor: "#e7028d" }} />
          </div>
        </div>

      </div>
      <figcaption className="mt-3 text-[0.85rem] leading-relaxed text-ink/50">
        {FOLLOW_UP_SOURCE} The client&rsquo;s sales team ran the consultations and closed the deals.
      </figcaption>
    </figure>
  );
}
