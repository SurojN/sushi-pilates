import type { Lead, LeadResult } from "./schema";
// Server-only integration seam: replace this adapter with durable storage + notification.
// Demo mode intentionally does not log, save, or send personal information.
export async function submitLead(lead: Lead): Promise<LeadResult> {
  void lead;
  return { ok: true, mode: "demo", message: "Your form passed validation. This is a preview: your details were not saved or sent, and no class has been booked." };
}
