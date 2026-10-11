// Pure decisions for the hero film (spec §3). Kept free of React/DOM so the
// bail-outs are unit-tested; HeroFilm.tsx reads the environment and calls these.
export type FilmTheme = "light" | "dark";
export type FilmEnv = { theme: FilmTheme };

export type FilmSource = "/hero/loop-16x9.mp4" | "/hero/loop-9x16.mp4" | "/hero/loop-16x9-light.mp4" | "/hero/loop-9x16-light.mp4";
export const pickSource = (portrait: boolean, theme: FilmTheme): FilmSource =>
  `/hero/loop-${portrait ? "9x16" : "16x9"}${theme === "light" ? "-light" : ""}.mp4`;

// Nothing here decides WHETHER to load any more: since 2026-09-23 the film is
// opt-in (the visitor presses "Watch introduction"), so no request happens
// until they ask. Motion and data preferences are respected by that design —
// there is no autoplay to suppress. What remains is picking the right file.

export const readFilmEnv = (): FilmEnv => ({
  theme: document.documentElement.dataset.theme === "light" ? "light" : "dark",
});

export const isPortrait = () => window.matchMedia("(orientation: portrait)").matches;
