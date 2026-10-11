import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Tracerlabs — Generate demand. Automate operations. Run it all in one place.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const duborics = await readFile(
    join(process.cwd(), "public/fonts/DuboricsRegular.ttf"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 90,
          background: "#000000",
          color: "#ffffff",
          fontFamily: "Duborics",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#8a8a93" }}>
          TRACERLABS · AI GROWTH & OPERATIONS
        </div>
        <div style={{ display: "flex", fontSize: 74, lineHeight: 1.08, marginTop: 28 }}>
          Generate demand. Automate operations. Run it all in one place.
        </div>
        <div style={{ display: "flex", fontSize: 26, lineHeight: 1.4, marginTop: 30, color: "#b5b5bd", maxWidth: 980 }}>
          Lead generation, AI follow-up, scheduling, invoicing, payments and payroll workflows — managed through a custom CRM built around your SOPs.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Duborics", data: duborics, style: "normal", weight: 400 }],
    },
  );
}
