import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { socials, socialPosts, testimonials } from "@/data/socials";
import { Eyebrow } from "./ui";
export function SocialSection() {
  return <section className="section social-section"><div className="container"><div className="section-heading"><div><Eyebrow>A LITTLE MOVEMENT, EVERY DAY</Eyebrow><h2>Move with Sushi.</h2></div><p>Off the mat, into your everyday.<br />Movement, moments, and a little inspiration.</p></div><div className="social-grid">{socialPosts.map(post => <article key={post.title} className="social-card"><div className="social-image"><Image src={post.image} alt="" fill sizes="(max-width: 700px) 90vw, 30vw" /><span className="social-status">{post.url ? "Watch now" : "Coming soon"}</span></div><div className="social-caption"><span>{post.category}</span>{post.url ? <a href={post.url} data-event="social_click" data-source={post.title}>{post.title}<ArrowUpRight size={18} /></a> : <h3>{post.title}</h3>}</div></article>)}</div><div className="social-platforms">{socials.map(social => social.url ? <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" data-event="social_click" data-source={social.name}>{social.name}<ArrowUpRight size={15} aria-hidden="true" /></a> : <span key={social.name}>{social.name}<span className="sr-only"> — coming soon</span></span>)}</div></div></section>;
}
export function Testimonials() {
  if (!testimonials.length) return null;
  return <section className="section container"><Eyebrow>FROM OUR COMMUNITY</Eyebrow><h2>In their own words.</h2><div className="class-grid">{testimonials.map(item => <figure key={item.name} className="quote-card"><blockquote>{item.quote}</blockquote><figcaption>{item.name}</figcaption></figure>)}</div></section>;
}
