import { Suspense } from "react";
import { MapPin, MessageCircle, ArrowUpRight, Mail, Phone } from "lucide-react";
import { LeadForm } from "@/features/leads/lead-form";
import { Eyebrow } from "@/components/ui";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Book a Trial & Contact", "Take your first step with Sushi Pilates in Kathmandu. Explore a trial class, share your class preferences, or ask a question.", "/contact");
async function Form({ searchParams }: { searchParams: Promise<{ class?: string }> }) { const params = await searchParams; return <LeadForm initialClass={params.class} />; }
export default function Contact({ searchParams }: { searchParams: Promise<{ class?: string }> }) {
  return <section className="container contact-page"><div className="contact-intro"><Eyebrow>LET’S BEGIN, TOGETHER</Eyebrow><h1>A little curiosity.<br />A <em>new beginning.</em></h1><p>New to Pilates, finding your way back, or just have a question? There’s a place to start.</p><div className="contact-location"><MapPin size={20} strokeWidth={1.4} /><div><h2>{site.location}</h2><p>Class location and times to be confirmed.</p></div></div><div className="contact-direct"><MessageCircle size={26} strokeWidth={1.3} aria-hidden="true" /><h2>Prefer a conversation?</h2><p>{site.whatsapp ? "We’d love to hear from you. Send us a message on WhatsApp." : "Our direct contact details are coming soon as Sushi Pilates takes shape."}</p>{site.whatsapp && <a className="text-link" href={`https://wa.me/${site.whatsapp}`} data-event="contact_click" data-source="whatsapp">Chat on WhatsApp<ArrowUpRight size={18} /></a>}{site.email && <a className="text-link" href={`mailto:${site.email}`} data-event="contact_click"><Mail size={16} />{site.email}</a>}{site.phone && <a className="text-link" href={`tel:${site.phone}`} data-event="contact_click"><Phone size={16} />{site.phone}</a>}</div><p className="contact-signoff">Come as you are.<br /><em>We’ll start from there.</em></p></div><Suspense fallback={<p className="form-loading">Preparing your form…</p>}><Form searchParams={searchParams} /></Suspense></section>;
}
