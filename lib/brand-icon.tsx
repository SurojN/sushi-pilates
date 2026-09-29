import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export async function brandIcon(size: number) {
  const logo = await readFile(join(process.cwd(), "public", site.brand.logo), "base64");
  return new ImageResponse(
    // ImageResponse renders plain image elements, not next/image components.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`data:image/png;base64,${logo}`} alt="Sushi Pilates" width={size} height={size} />,
    { width: size, height: size },
  );
}
