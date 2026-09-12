export type EnquiryPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  message?: string;
  project?: string;
  channelId?: string;
  subject?: string;
};

export type EnquiryResult = { ok: true } | { ok: false; error: string };

async function postToLeadEndpoint(
  endpoint: string,
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      return { ok: false, error: data?.error || "Something went wrong. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}

/** The site-wide "Enquire Now" popup. */
export function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  return postToLeadEndpoint("/api/enquiry", payload);
}

/** "Get In Touch" / "Contact Us" forms on the home, contact, location, and project pages. */
export function submitContactForm(payload: EnquiryPayload): Promise<EnquiryResult> {
  return postToLeadEndpoint("/api/contact", payload);
}
