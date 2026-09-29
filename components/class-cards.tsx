import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, BarChart3 } from "lucide-react";
import { classes } from "@/data/classes";
export function ClassCards({ detailed = false }: { detailed?: boolean }) {
  return <div className="class-grid">{classes.map((item, index) => <article className="class-card" key={item.id}><div className={`class-image class-image-${index}`}><Image src={item.image} alt={item.imageAlt} fill loading={detailed && index === 0 ? "eager" : "lazy"} sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 30vw" /><span className="image-tag">{item.tag}</span></div><div className="class-body"><span className="class-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p><div className="class-detail"><BarChart3 size={14} aria-hidden="true" />{item.level}</div>{detailed && <><div className="class-detail"><Clock3 size={14} aria-hidden="true" />Duration: {item.duration}</div><p className="schedule">{item.schedule} · {item.availability}</p>{item.price && <p>{item.price}</p>}</>}<Link href={`/contact?class=${item.id}`} className="class-link" data-event="class_interest" data-source={item.id}>Explore {index === 2 ? "private sessions" : "this class"}<ArrowUpRight size={18} aria-hidden="true" /></Link></div></article>)}</div>;
}
