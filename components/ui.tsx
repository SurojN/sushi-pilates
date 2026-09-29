import Link from "next/link";
import { ArrowUpRight, ArrowRight, Flower2 } from "lucide-react";
import { site } from "@/config/site";
export function TrialButton({ label = site.trialLabel, light = false, source = "website" }: { label?: string; light?: boolean; source?: string }) {
  return <Link className={`button ${light ? "button-light" : ""}`} href="/contact" data-event="book_trial_click" data-source={source}>{label}<ArrowUpRight size={18} aria-hidden="true" /></Link>;
}
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="text-link" href={href}>{children}<ArrowRight size={17} aria-hidden="true" /></Link>;
}
export function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{children}</p>; }
export function TrialSection() {
  return <section className="trial-section"><div className="container trial-inner"><Flower2 size={46} strokeWidth={1} aria-hidden="true" /><div><Eyebrow>ONE SMALL STEP FOR YOURSELF</Eyebrow><h2>Ready to start moving?</h2><p>You don’t need to be flexible. You just need a place to begin.</p></div><TrialButton light source="final-cta" /></div></section>;
}
