"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { classes } from "@/data/classes";
import { contactMethods, experienceLevels, preferredTimes, validateLead, type Lead, type LeadErrors, type LeadResult } from "./schema";
import { sendLead } from "./client";
import { track } from "@/lib/analytics";
export function LeadForm({ initialClass }: { initialClass?: string }) {
  const [errors, setErrors] = useState<LeadErrors>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [emailRequired, setEmailRequired] = useState(false);
  const started = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  function focusError(next: LeadErrors) { requestAnimationFrame(() => { const field = formRef.current?.elements.namedItem(Object.keys(next)[0]) as HTMLElement | null; field?.focus(); }); }
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending) return;
    const { data, errors: nextErrors } = validateLead(Object.fromEntries(new FormData(event.currentTarget)));
    setErrors(nextErrors); setResult(null);
    if (Object.keys(nextErrors).length) { focusError(nextErrors); return; }
    setPending(true);
    try {
      const response = await sendLead(data); setResult(response);
      if (response.errors) { setErrors(response.errors); focusError(response.errors); }
      else requestAnimationFrame(() => resultRef.current?.focus());
      if (response.ok) track(response.mode === "demo" ? "form_demo" : "form_submit", { class: data.classId });
    } catch { setResult({ ok: false, message: "Something interrupted your request. Your form is still here—please try again." }); requestAnimationFrame(() => resultRef.current?.focus()); }
    finally { setPending(false); }
  }
  const fieldProps = (name: keyof Lead) => ({ id: name, name, "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `${name}-error` : undefined });
  const error = (name: keyof Lead) => errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  if (result?.ok) return <div className="form-result" tabIndex={-1} ref={resultRef} role="status"><CheckCircle2 size={40} strokeWidth={1.4} /><h2>{result.mode === "demo" ? "Preview complete." : "Your request is in."}</h2><p>{result.message}</p><button className="button" onClick={() => { setResult(null); setEmailRequired(false); started.current = false; requestAnimationFrame(() => formRef.current?.querySelector("input")?.focus()); }}>Back to form<ArrowUpRight size={17} aria-hidden="true" /></button><Link className="text-link" href="/classes">Explore our classes</Link></div>;
  return <form ref={formRef} className="lead-form" onSubmit={submit} noValidate onFocus={() => { if (!started.current) { started.current = true; track("form_start"); } }}>
    <div className="form-heading"><h2>Your first step starts here.</h2><p>Tell us a little about yourself. Fields marked * are required.</p></div>
    <div className="demo-notice"><strong>Booking preview</strong><p>This form is a demonstration. Details are not saved or sent. Please use sample information; no class will be booked.</p></div>
    <div className="form-grid"><div className="field full"><label htmlFor="name">Full name *</label><input {...fieldProps("name")} autoComplete="name" placeholder="Your full name" maxLength={100} required />{error("name")}</div>
    <div className="field"><label htmlFor="phone">Phone number *</label><input {...fieldProps("phone")} type="tel" autoComplete="tel" placeholder="Include your country code" maxLength={30} required />{error("phone")}</div>
    <div className="field"><label htmlFor="email">Email {emailRequired ? "*" : "(optional)"}</label><input {...fieldProps("email")} type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required={emailRequired} />{error("email")}</div>
    <div className="field"><label htmlFor="contactMethod">Preferred contact method *</label><select {...fieldProps("contactMethod")} defaultValue="" required onChange={event => setEmailRequired(event.target.value === "Email")}><option value="" disabled>Select a method</option>{contactMethods.map(value => <option key={value}>{value}</option>)}</select>{error("contactMethod")}</div>
    <div className="field"><label htmlFor="experience">Pilates experience *</label><select {...fieldProps("experience")} defaultValue="" required><option value="" disabled>Select your experience</option>{experienceLevels.map(value => <option key={value}>{value}</option>)}</select>{error("experience")}</div>
    <div className="field"><label htmlFor="classId">Preferred class *</label><select {...fieldProps("classId")} defaultValue={classes.some(item => item.id === initialClass) ? initialClass : ""} required><option value="" disabled>What interests you?</option>{classes.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}<option value="unsure">Help me choose</option></select>{error("classId")}</div>
    <div className="field"><label htmlFor="preferredTime">Preferred time *</label><select {...fieldProps("preferredTime")} defaultValue="" required><option value="" disabled>Select a time</option>{preferredTimes.map(value => <option key={value}>{value}</option>)}</select>{error("preferredTime")}</div>
    <div className="field full"><label htmlFor="message">Anything you’d like us to know? <span>(optional)</span></label><textarea {...fieldProps("message")} rows={4} maxLength={1000} placeholder="Questions, preferences, or what brings you to Pilates. Please leave out sensitive health information." />{error("message")}</div></div>
    <p className="form-privacy">Read our <Link href="/privacy">privacy notice</Link>. An inquiry is not a confirmed booking.</p>
    {result && <div ref={resultRef} tabIndex={-1} className="form-error" role="alert">{result.message}</div>}
    <button className="button submit-button" type="submit" disabled={pending}>{pending ? <><LoaderCircle className="spinner" size={18} aria-hidden="true" />Checking your request…</> : <>Preview trial request<ArrowUpRight size={18} aria-hidden="true" /></>}</button>
    <p className="form-footnote">No payment. No booking commitment. Just a first step.</p>
  </form>;
}
