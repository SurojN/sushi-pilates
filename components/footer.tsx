import Link from "next/link";
import { BrandLogo } from "./brand";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { socials } from "@/data/socials";
export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-main"><div><Link href="/" className="brand-link footer-brand-link" aria-label="Sushi Pilates home"><BrandLogo footer /></Link><p>Mindful movement.<br />A stronger everyday you.</p><span className="location-dot">{site.location}</span></div><div><h3>Explore</h3>{site.navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div><div><h3>Let’s connect</h3><Link href="/contact" data-event="contact_click">Get in touch <ArrowUpRight size={14} aria-hidden="true" /></Link>{socials.filter(item => item.url).map(item => <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" data-event="social_click" data-source={item.name}>{item.name}<ArrowUpRight size={14} aria-hidden="true" /></a>)}{!socials.some(item => item.url) && <p>Social channels coming soon.<br />A little movement is on its way.</p>}</div><div className="footer-note"><span className="little-star">✳</span><p>Make a little<br /><em>space for yourself.</em></p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Sushi Pilates</span><div><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms</Link></div><span>Rooted in Kathmandu. Made for you.</span></div></div></footer>;
}
