/**
 * Mirrors website form submissions into the Google Sheet (see google-apps-script/).
 *
 * The CRM stays the system of record for enquiry and contact leads; this is an
 * extra copy, plus the only storage for the careers and channel partner forms.
 * Failures are swallowed so a Sheets outage can never block a submission.
 */

export type SheetForm = "enquiry" | "contact" | "career" | "channel-partner";

const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL as string | undefined;
const SHARED_TOKEN = import.meta.env.VITE_SHEETS_TOKEN as string | undefined;

export function isSheetsConfigured() {
  return Boolean(WEBHOOK_URL);
}

export async function saveToSheet(
  form: SheetForm,
  data: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> {
  if (!WEBHOOK_URL) {
    return { ok: false, error: "Sheets webhook is not configured" };
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      // text/plain keeps this a "simple" request, so the browser skips the
      // CORS preflight that Apps Script web apps do not answer.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        form,
        token: SHARED_TOKEN ?? "",
        page: typeof window === "undefined" ? "" : window.location.pathname,
        data,
      }),
    });

    if (!response.ok) {
      return { ok: false, error: `Sheets responded with ${response.status}` };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Could not reach the Google Sheet" };
  }
}
