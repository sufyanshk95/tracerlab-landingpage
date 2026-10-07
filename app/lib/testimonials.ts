// ─────────────────────────────────────────────────────────────────────────────
// Client video testimonials.
//
// THREE REAL CLIENT RECORDINGS (owner-supplied 2026-09-24), encoded for the
// web in /public/assets/testimonials/ and all PUBLISHED as of 2026-09-25.
//
// Attribution is ROLE + TITLE ONLY: the owner does not publish client or
// company names AS TEXT anywhere — copy, labels, filenames, slugs, alt text or
// structured data — so `name` and `company` are internal reference and must
// never be rendered. A name visible inside the footage itself is acceptable. `TestimonialVideo` is deliberately handed a
// narrowed prop type so they cannot reach the RSC payload either.
//
// ⚠️ ANONYMITY IS LABEL-DEEP ONLY — do not describe these as anonymous.
// Audited 2026-09-24 against the actual frames:
//   • All three show the speaker's face, full frame, clearly identifiable.
//   • mortgage-originator: the client's FULL NAME is burned into the footage as
//     an on-screen title card over roughly the first 0–3 s. ACCEPTED by the
//     owner (2026-10-06): a name shown inside the footage is fine. The rule is
//     about TEXT — no client or company name in any copy, label, filename,
//     slug, alt text or structured data. Do not re-edit the footage over this,
//     and do not treat the on-screen name as a reason to publish the name in
//     text anywhere else. (The poster still comes from a later, name-free
//     frame; that is incidental, not a requirement.)
//   • meat-processing-ceo: filmed on the client's premises — building, yard and
//     vehicles are visible, which locates the business.
//   • Asset filenames used to carry the client and company names and appeared
//     ~10× each in the shipped HTML (Next/Image srcset). Renamed 2026-09-24 to
//     role-based names; never name these files after a person or company.
//
// ⚠️ None has a caption track or transcript — each carries burned-in on-screen
// captions, which is NOT the same thing and gives a screen-reader or sound-off
// visitor nothing. Published on the owner's call; add the .vtt and transcript
// when available. No transcription tool exists on this machine (no ffmpeg, no
// whisper; macOS on-device Speech is blocked by TCC), so these must come from
// the owner or a transcription service. Never transcribe by reading the
// burned-in captions off sampled frames, and never write one from memory.
//
// ⚠️ /public/assets/testimonials/ is UNTRACKED in git. Until it is committed,
// a deploy ships this section with 404ing posters and videos.
//
// TO ADD ANOTHER:
//   1. Put the file in /public/assets/testimonials/ (mp4, H.264 + AAC) under a
//      role-based, non-identifying filename, with a poster frame (jpg) and a
//      WebVTT captions file.
//   2. Add an entry with the client's real name, role and company, a title in
//      their own terms, and the transcript that matches the recording.
//   3. Flip `published: true`.
//
// The other videos in /public/assets are NOT testimonials — a product demo
// (the meat-processing platform), two of our own product reels and an AI ad experiment.
// Never promote one of those into this list.
//
// Never fabricate a name, role, quote, caption or transcript, and never promote
// a demo or reel into this list. `quote` must be lifted verbatim from the
// recording. `transcript` is required for a published entry — if the footage
// exists but the transcript does not, leave `published: false` and report the
// missing material rather than inventing it.
// ─────────────────────────────────────────────────────────────────────────────

export type Testimonial = {
  id: string;
  /** Path under /public. Role-based filename only — never a person or company. */
  video: string;
  /** Poster frame shown before playback — the only media fetched on page load.
   *  Pick a frame with no name card, logo or other identifying overlay. */
  poster: string;
  /** WebVTT captions. Omit only if the recording genuinely has none yet. */
  captions?: string;
  /** Plain-text transcript, matching the recording word for word. */
  transcript?: string;
  /** Kept for internal reference ONLY — never rendered. The owner does not
   *  publish client or company names on these cards; attribution is the role. */
  name: string;
  company: string;
  /** The only attribution shown publicly, alongside the title. Role AND
   *  industry, so it says something concrete without naming anyone. */
  role: string;
  /** Short, accurate description of their experience, in their terms. */
  title: string;
  /** Verbatim quote from the recording. Optional. */
  quote?: string;
  /** Intrinsic aspect ratio, so space is reserved before the poster loads. */
  aspect?: string;
  /** Related case study, when one exists. */
  caseStudy?: { label: string; href: string };
  /** Only `true` entries ever render publicly. */
  published: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "meat-processing-ceo",
    // Source: copy_8003AA97…MOV (owner-supplied 2026-09-24) — the edited cut
    // with b-roll, which replaced the raw interview export at the owner's
    // request. 2:12, encoded to 540x960 H.264 + mono AAC.
    video: "/assets/testimonials/meat-processing-ceo.mp4",
    poster: "/assets/testimonials/meat-processing-ceo-poster.jpg",
    // No caption track or transcript — the recording carries burned-in
    // on-screen captions only. Owner's call (2026-09-24) to publish without one.
    name: "Ahmed",
    role: "CEO, meat processing company",
    company: "", // deliberately omitted at the owner's request
    title: "Full business automation and marketing for a meat processing company",
    aspect: "9 / 16",
    // Case-study link removed with the names: it would identify the client.
    published: true,
  },
  {
    id: "mortgage-originator",
    // Source: copy_37BA21E8…MOV (owner-supplied 2026-09-24), 0:46.
    // ⚠️ The client's name is burned into roughly the first 0–3 s of this cut.
    video: "/assets/testimonials/mortgage-originator.mp4",
    poster: "/assets/testimonials/mortgage-originator-poster.jpg",
    // No caption track or transcript — burned-in on-screen captions only.
    // Name/company are internal reference and never rendered; role and title
    // are the published attribution.
    name: "Gavin Berg",
    role: "Mortgage loan originator",
    company: "",
    title: "AI marketing for mortgage brokers",
    aspect: "9 / 16",
    published: true,
  },
  {
    id: "business-funding-ceo",
    video: "/assets/testimonials/business-funding-ceo.mp4",
    poster: "/assets/testimonials/business-funding-ceo-poster.jpg",
    // No caption track or transcript — burned-in on-screen captions only.
    name: "",
    // Industry per the owner (2026-09-24): a Texas business funding company.
    role: "CEO, business funding company",
    company: "Lone Star Capital Solutions",
    title: "AI marketing for business funding company",
    aspect: "9 / 16",
    published: true,
  },
];

export const PUBLISHED_TESTIMONIALS = TESTIMONIALS.filter((t) => t.published);

// Layout preview for local development ONLY — never rendered in a production
// build (see Testimonials.tsx). Deliberately uses placeholder names so it can
// never be mistaken for a real client, and no video source at all.
export const SAMPLE_TESTIMONIAL: Testimonial = {
  id: "sample-layout",
  video: "",
  poster: "",
  name: "[Client name]",
  role: "[Role]",
  company: "[Company]",
  title: "[Short description of what changed for them]",
  quote: "[Verbatim quote from the recording]",
  transcript: "[Transcript matching the recording]",
  aspect: "16 / 9",
  published: false,
};
