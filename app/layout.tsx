import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { site } from "@/config/site";
import "./globals.css";
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: { default: "Sushi Pilates | Mindful Movement in Kathmandu", template: "%s | Sushi Pilates" },
  description: site.description,
  robots: { index: !!process.env.NEXT_PUBLIC_SITE_URL, follow: !!process.env.NEXT_PUBLIC_SITE_URL },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${serif.variable}`}><body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /><Analytics /></body></html>;
}
