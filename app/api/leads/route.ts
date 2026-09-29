import { validateLead } from "@/features/leads/schema";
import { submitLead } from "@/features/leads/service";
export async function POST(request: Request) {
  const reply = (body: unknown, status: number) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
  if (!request.headers.get("content-type")?.includes("application/json")) return reply({ ok: false, message: "Send this request as JSON." }, 415);
  try {
    // Bound the stream itself; do not rely on a client-supplied Content-Length.
    const reader = request.body?.getReader();
    if (!reader) return reply({ ok: false, message: "Please complete the form." }, 400);
    const chunks: Uint8Array[] = []; let length = 0;
    while (true) {
      const { done, value } = await reader.read(); if (done) break;
      length += value.byteLength;
      if (length > 16_384) { await reader.cancel(); return reply({ ok: false, message: "This request is too large." }, 413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    let input: unknown;
    try { input = JSON.parse(new TextDecoder().decode(bytes)); } catch { return reply({ ok: false, message: "The request could not be read. Please try again." }, 400); }
    const { data, errors } = validateLead(input);
    if (Object.keys(errors).length) return reply({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
    return reply(await submitLead(data), 200);
  } catch { return reply({ ok: false, message: "We couldn’t process your request. Please try again." }, 503); }
}
