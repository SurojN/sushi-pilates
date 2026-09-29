import { classes } from "@/data/classes";
export const contactMethods = ["Phone", "WhatsApp", "Email"] as const;
export const experienceLevels = ["New to Pilates", "Some experience", "Regular practice"] as const;
export const preferredTimes = ["Morning", "Afternoon", "Evening", "Flexible"] as const;
export type Lead = { name: string; phone: string; email: string; contactMethod: string; experience: string; classId: string; preferredTime: string; message: string };
export type LeadErrors = Partial<Record<keyof Lead, string>>;
export type LeadResult = { ok: boolean; mode?: "demo" | "live"; message: string; errors?: LeadErrors };
export function validateLead(input: unknown): { data: Lead; errors: LeadErrors } {
  const raw = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const read = (key: keyof Lead) => typeof raw[key] === "string" ? raw[key].trim() : "";
  const data: Lead = { name: read("name"), phone: read("phone"), email: read("email"), contactMethod: read("contactMethod"), experience: read("experience"), classId: read("classId"), preferredTime: read("preferredTime"), message: read("message") };
  const errors: LeadErrors = {};
  if (data.name.length < 2 || data.name.length > 100) errors.name = "Enter your full name (2–100 characters).";
  if (!/^[+\d\s().-]+$/.test(data.phone) || data.phone.replace(/\D/g, "").length < 7 || data.phone.replace(/\D/g, "").length > 15 || data.phone.length > 30) errors.phone = "Enter a valid phone number, including your country code if outside Nepal.";
  if ((data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) || data.email.length > 254) errors.email = "Enter a valid email address.";
  if (!contactMethods.some(value => value === data.contactMethod)) errors.contactMethod = "Choose how you’d like to be contacted.";
  if (data.contactMethod === "Email" && !data.email) errors.email = "Add an email address so we can contact you by email.";
  if (!experienceLevels.some(value => value === data.experience)) errors.experience = "Choose your experience level.";
  if (!classes.some(value => value.id === data.classId) && data.classId !== "unsure") errors.classId = "Choose a class, or select ‘Help me choose’.";
  if (!preferredTimes.some(value => value === data.preferredTime)) errors.preferredTime = "Choose a preferred time.";
  if (data.message.length > 1000) errors.message = "Keep your message under 1,000 characters.";
  return { data, errors };
}
