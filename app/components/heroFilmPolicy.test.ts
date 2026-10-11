import { test } from "node:test";
import assert from "node:assert/strict";
import { pickSource } from "./heroFilmPolicy";

test("picks the file by orientation and theme", () => {
  assert.equal(pickSource(false, "dark"), "/hero/loop-16x9.mp4");
  assert.equal(pickSource(true, "dark"), "/hero/loop-9x16.mp4");
  assert.equal(pickSource(false, "light"), "/hero/loop-16x9-light.mp4");
  assert.equal(pickSource(true, "light"), "/hero/loop-9x16-light.mp4");
});

test("every orientation × theme maps to a file that ships in public/hero", () => {
  const shipped = new Set([
    "/hero/loop-16x9.mp4",
    "/hero/loop-9x16.mp4",
    "/hero/loop-16x9-light.mp4",
    "/hero/loop-9x16-light.mp4",
  ]);
  for (const portrait of [true, false]) {
    for (const theme of ["dark", "light"] as const) {
      assert.ok(shipped.has(pickSource(portrait, theme)), `${portrait}/${theme}`);
    }
  }
});
