function extractErrorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (data.message) return data.message;
  if (data.error?.message) return data.error.message;
  if (Array.isArray(data) && data[0]?.message) return data[0].message;
  return JSON.stringify(data);
}

async function sendWithResend({ apiKey, from, toEmail, subject, text, html }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [toEmail],
      subject,
      text,
      html,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(extractErrorMessage(data, "Resend rejected the request."));
  }

  return data.id || null;
}

async function sendWithBrevo({ apiKey, senderEmail, senderName, toEmail, subject, text, html }) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: toEmail }],
      subject,
      textContent: text,
      htmlContent: html,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(extractErrorMessage(data, "Brevo rejected the request."));
  }

  return data.messageId || null;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const toEmail = payload.to;
    const subject = payload.subject;
    const text = payload.text;
    const html = payload.html;

    if (!toEmail || !subject || !text) {
      return res.status(400).json({ ok: false, error: "Missing to, subject or text" });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM;
    const brevoApiKey = process.env.BREVO_API_KEY;
    const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;
    const brevoSenderName = process.env.BREVO_SENDER_NAME || "Auto Elite";

    if (resendApiKey && resendFrom) {
      const messageId = await sendWithResend({
        apiKey: resendApiKey,
        from: resendFrom,
        toEmail,
        subject,
        text,
        html: html || undefined,
      });
      return res.status(200).json({ ok: true, provider: "resend", messageId });
    }

    if (resendApiKey && !resendFrom) {
      return res.status(500).json({
        ok: false,
        error: "RESEND_API_KEY is set but RESEND_FROM is missing.",
      });
    }

    if (brevoApiKey && brevoSenderEmail) {
      const messageId = await sendWithBrevo({
        apiKey: brevoApiKey,
        senderEmail: brevoSenderEmail,
        senderName: brevoSenderName,
        toEmail,
        subject,
        text,
        html: html || undefined,
      });
      return res.status(200).json({ ok: true, provider: "brevo", messageId });
    }

    return res.status(500).json({
      ok: false,
      error: "Missing provider config. Set RESEND_API_KEY+RESEND_FROM or BREVO_API_KEY+BREVO_SENDER_EMAIL.",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: error.message || "Unexpected error while sending email",
    });
  }
};
