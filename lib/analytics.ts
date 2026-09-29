export type AnalyticsEvent = "page_view" | "book_trial_click" | "contact_click" | "social_click" | "form_start" | "form_submit" | "form_demo" | "class_interest";
type Properties = Record<string, string>;
type Adapter = (event: AnalyticsEvent, properties: Properties) => void;
let adapter: Adapter | undefined;
// Install a consent-aware provider here. Never pass names, phone numbers, email, or messages.
export function setAnalyticsAdapter(next: Adapter) { adapter = next; }
export function track(event: AnalyticsEvent, properties: Properties = {}) {
  try { adapter?.(event, properties); } catch { /* Analytics must never interrupt booking. */ }
}
