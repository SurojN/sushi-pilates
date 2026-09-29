import type { Lead, LeadResult } from "./schema";
export async function sendLead(lead: Lead): Promise<LeadResult> {
  const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead), signal: AbortSignal.timeout(15_000) });
  const result = await response.json() as LeadResult;
  if (!response.ok && !result.message) throw new Error("Submission failed");
  return result;
}
