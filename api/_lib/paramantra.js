const PARAMANTRA_URL = "https://cloud.paramantra.com/paramantra/api/data/new/format/json";

function readJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

/**
 * Shared handler for Paramantra lead-capture endpoints. Each route (enquiry, contact, ...)
 * has its own API key and default channel_id, since Paramantra segments leads by channel.
 */
export function createParamantraHandler({
  apiKeyEnvVar,
  defaultChannelId,
  defaultSubject = "Lead from Website",
  appNameEnvVar = "PARAMANTRA_APP_NAME",
  defaultAppName = "rpECF",
}) {
  return async function handler(req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).json({ ok: false, error: "Method not allowed" });
      return;
    }

    const apiKey = process.env[apiKeyEnvVar];
    const appName = process.env[appNameEnvVar] || defaultAppName;
    const repId = process.env.PARAMANTRA_REP_ID || "vinod@globaledifice.in";

    if (!apiKey) {
      console.error(`${apiKeyEnvVar} is not configured`);
      res.status(500).json({ ok: false, error: "Server is not configured for this form" });
      return;
    }

    let body;
    try {
      body = await readJsonBody(req);
    } catch {
      res.status(400).json({ ok: false, error: "Invalid request body" });
      return;
    }

    const {
      firstName,
      lastName = "",
      email,
      phone,
      message = "",
      project = "",
      channelId = defaultChannelId,
      subject = defaultSubject,
      utm = {},
    } = body || {};

    if (
      typeof firstName !== "string" ||
      !firstName.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof phone !== "string" ||
      !phone.trim()
    ) {
      res.status(400).json({ ok: false, error: "Name, email, and phone are required" });
      return;
    }

    const formData = new FormData();
    formData.set("rep_id", repId);
    formData.set("channel_id", channelId);
    formData.set("subject", subject);
    formData.set("f_name", firstName.trim());
    formData.set("l_name", lastName.trim());
    formData.set("email", email.trim());
    formData.set("phonefax", phone.trim());
    formData.set("notes", message.trim());
    formData.set("project", project.trim());
    formData.set("alert_client", "0");
    formData.set("alert_rep", "0");

    const utmFields = {
      USOURCE: utm.source,
      UMEDIUM: utm.medium,
      utm_campaign: utm.campaign,
      utm_ad_group: utm.adGroup,
      utm_term: utm.term,
      utm_device: utm.device,
      utm_gclid: utm.gclid,
      utm_placement: utm.placement,
      utm_ad_name: utm.adName,
    };

    for (const [key, value] of Object.entries(utmFields)) {
      if (typeof value === "string" && value) {
        formData.set(key, value);
      }
    }

    try {
      const authHeader = `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;

      const upstream = await fetch(PARAMANTRA_URL, {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey,
          "ACTION-ON": appName,
          Authorization: authHeader,
        },
        body: formData,
      });

      const rawText = await upstream.text();
      let parsed;
      try {
        parsed = JSON.parse(rawText);
      } catch {
        parsed = { raw: rawText };
      }

      if (!upstream.ok) {
        console.error("Paramantra upstream error", upstream.status, rawText);
        res.status(502).json({ ok: false, error: "CRM rejected the request", details: parsed });
        return;
      }

      res.status(200).json({ ok: true, data: parsed });
    } catch (err) {
      console.error("Failed to reach Paramantra", err);
      res.status(502).json({ ok: false, error: "Could not reach the CRM. Please try again." });
    }
  };
}
