import type { MetadataRoute } from "next";
import { site } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!process.env.NEXT_PUBLIC_SITE_URL) return [];
  return ["/", "/about", "/classes", "/contact"].map(path => ({ url: new URL(path, site.url).toString(), changeFrequency: "monthly", priority: path === "/" ? 1 : 0.8 }));
}
