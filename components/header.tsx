"use client";
import Link from "next/link";
import { BrandLogo } from "./brand";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="site-header" onKeyDown={event => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } }}>
    <div className="container header-inner"><Link className="brand-link" href="/" aria-label="Sushi Pilates home" onClick={() => setOpen(false)}><BrandLogo /></Link>
    <nav aria-label="Main navigation" className="desktop-nav">{site.navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav>
    <div className="header-actions"><Link className="button header-cta" href="/contact" data-event="book_trial_click" data-source="header" onClick={() => setOpen(false)}>Book a Trial<ArrowUpRight size={16} aria-hidden="true" /></Link><button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div>
    <nav id="mobile-nav" aria-label="Mobile navigation" className="mobile-nav" hidden={!open}>{site.navigation.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</nav>
  </header>;
}
