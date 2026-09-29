import type { MetadataRoute } from "next";
import { site } from "@/config/site";
export default function robots(): MetadataRoute.Robots { return process.env.NEXT_PUBLIC_SITE_URL ? { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: new URL("/sitemap.xml", site.url).toString() } : { rules: { userAgent: "*", disallow: "/" } }; }
