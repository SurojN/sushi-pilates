import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = "Sushi Pilates — Strong body. Calm mind. Better movement. Kathmandu, Nepal.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const cover = await readFile(join(process.cwd(), "public", site.brand.cover), "base64");
  return new ImageResponse(
    <div style={{ background: "#faf5ee", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#294b3c" }}>
      <div style={{ fontSize: 22, letterSpacing: 5, marginBottom: 32 }}>MINDFUL MOVEMENT. EVERYDAY STRENGTH.</div>
      {/* ImageResponse requires a plain image element. Preserve the complete 3:1 artwork. */}
      <img src={`data:image/png;base64,${cover}`} width={1200} height={400} alt="Sushi Pilates" />
      <div style={{ fontSize: 22, letterSpacing: 3, marginTop: 32 }}>{site.location}</div>
    </div>,
    size,
  );
}
