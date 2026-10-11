"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { isPortrait, pickSource, readFilmEnv } from "./heroFilmPolicy";

// The hero film, OPT-IN (2026-09-23): the page is fully usable without it.
// Nothing is requested — and no element exists over the page — until the
// visitor presses "Watch introduction". While idle this component renders
// only the trigger button, so there is no invisible overlay that could
// intercept a click.
//
// On press it mounts a full-screen dialog containing the film. Every exit
// path unmounts that dialog and returns focus to the trigger: the film
// ending, Close, Escape, a media error/stall/abort, no playback within
// START_TIMEOUT_MS, or a watchdog that fires when playback stops progressing.
// Failure therefore degrades to "the page you already had", never to a blank
// screen.
//
// Sound: the film carries a score, and the press is the gesture browsers
// require, so it starts unmuted; the speaker chip toggles it without closing.
const START_TIMEOUT_MS = 6000;
const STALL_TIMEOUT_MS = 4000;

type State = "idle" | "loading" | "playing";

export default function HeroFilm({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<State>("idle");
  const [sound, setSound] = useState(true);

  const close = useCallback(() => {
    setState("idle");
    triggerRef.current?.focus();
  }, []);

  // Playback lifecycle. Runs once the dialog (and therefore the <video>) has
  // mounted, so the element always exists here.
  useEffect(() => {
    if (state === "idle") return;
    const v = videoRef.current;
    if (!v) return;

    let started = false;
    let lastTime = 0;

    const onPlaying = () => {
      started = true;
      setState("playing");
      closeRef.current?.focus();
      lastTime = v.currentTime;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const stall = window.setInterval(() => {
      if (!started || v.paused || v.ended) return;
      if (v.currentTime > lastTime) {
        lastTime = v.currentTime;
        return;
      }
      close(); // playback stopped progressing
    }, STALL_TIMEOUT_MS);
    const startTimer = window.setTimeout(() => {
      if (!started) close(); // slow network: give the page back
    }, START_TIMEOUT_MS);

    v.addEventListener("playing", onPlaying);
    v.addEventListener("ended", close);
    v.addEventListener("error", close);
    v.addEventListener("stalled", close);
    v.addEventListener("abort", close);
    document.addEventListener("keydown", onKey);

    // One file per orientation × theme — this is the first request for it.
    v.src = pickSource(isPortrait(), readFilmEnv().theme);
    v.load();
    v.muted = false;
    setSound(true);
    v.play().catch(() => {
      // Sound refused despite the gesture — try muted before giving up.
      v.muted = true;
      setSound(false);
      v.play().catch(close);
    });

    return () => {
      window.clearInterval(stall);
      window.clearTimeout(startTimer);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("ended", close);
      v.removeEventListener("error", close);
      v.removeEventListener("stalled", close);
      v.removeEventListener("abort", close);
      document.removeEventListener("keydown", onKey);
      v.pause();
    };
  }, [state === "idle", close]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = sound;
    setSound(!sound);
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setState("loading")}
        disabled={state !== "idle"}
        className={`group/film inline-flex shrink-0 items-center gap-2.5 text-[0.95rem] font-semibold text-ink/65 transition-colors hover:text-ink disabled:opacity-60 ${className}`}
        style={{ fontFamily: "var(--font-archivo), system-ui, sans-serif" }}
      >
        <span aria-hidden className="bv-6 flex h-9 w-9 items-center justify-center bg-ink/[0.07] transition-colors group-hover/film:bg-ink/[0.12]">
          {state === "loading" ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/30 border-t-ink/80" />
          ) : (
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5L8 5.5Z" />
            </svg>
          )}
        </span>
        {state === "loading" ? "Loading introduction…" : "Watch introduction"}
      </button>

      {state !== "idle" && (
        <div role="dialog" aria-modal="true" aria-label="Tracerlabs introduction" className="nt-film-stage">
          <video ref={videoRef} aria-hidden muted playsInline className="nt-film-video" />
          <div aria-hidden className="nt-film-scrim" />
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close the introduction"
            className="nt-sound bv-6 absolute bottom-6 left-6 z-10 flex h-10 items-center gap-2 px-3 font-body text-[0.8rem] text-ink/80 transition-colors hover:text-ink sm:bottom-8 sm:left-8"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
            <span>Close</span>
          </button>
          {state === "playing" && (
            <button
              type="button"
              onClick={toggleSound}
              aria-label={sound ? "Turn sound off" : "Turn sound on"}
              aria-pressed={sound}
              className="nt-sound bv-6 absolute bottom-6 right-6 z-10 flex h-10 items-center gap-2 px-3 font-body text-[0.8rem] text-ink/80 transition-colors hover:text-ink sm:bottom-8 sm:right-8"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 10v4h4l5 4V6L8 10H4Z" />
                {sound ? (
                  <>
                    <path d="M16 9.5a3.5 3.5 0 0 1 0 5" />
                    <path d="M18.5 7a7 7 0 0 1 0 10" />
                  </>
                ) : (
                  <path d="m16.5 9.5 4 5m0-5-4 5" />
                )}
              </svg>
              <span>{sound ? "Sound on" : "Sound off"}</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
