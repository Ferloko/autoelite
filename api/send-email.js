function extractErrorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (data.message) return data.message;
  if (data.error?.message) return data.error.message;
  if (Array.isArray(data) && data[0]?.message) return data[0].message;
  return JSON.stringify(data);
}

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeFields(fields) {
  if (!Array.isArray(fields)) return [];
  return fields
    .map((item) => ({
      label: normalizeText(item?.label),
      value: normalizeText(item?.value),
    }))
    .filter((item) => item.label && item.value);
}

function buildEmailText(intro, fields) {
  return [
    "Hola Auto Élite,",
    "",
    intro,
    "",
    ...fields.map((item) => `${item.label}: ${item.value}`),
    "",
    "Enviado desde el sitio web.",
  ].join("\n");
}

function buildEmailHtml(intro, fields) {
  const rows = fields
    .map((item) => `<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:#1a1a1a;"><strong>${escapeHtml(item.label)}:</strong> ${escapeHtml(item.value)}</p>`)
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0;padding:0;background:#0c0c0e;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" style="border-collapse:collapse;background:radial-gradient(circle at top,#1a1a20 0%,#0c0c0e 65%);padding:30px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="640" style="border-collapse:collapse;max-width:640px;width:100%;background:#ffffff;border:1px solid #232327;border-radius:14px;overflow:hidden;">
              <tr>
                <td style="background:linear-gradient(120deg,#0f0f0f 0%,#19191d 100%);padding:24px 28px 30px;border-bottom:1px solid rgba(255,255,255,.08);">
                  <p style="margin:0;font-size:14px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#ffffff;">Auto Élite</p>
                  <p style="margin:8px 0 0;font-size:11px;color:#c8a96e;letter-spacing:.08em;text-transform:uppercase;">Concesionario Premium</p>
                  <h2 style="margin:20px 0 0;font-size:26px;line-height:1.2;letter-spacing:-.02em;color:#ffffff;max-width:420px;">Confirmacion de solicitud recibida</h2>
                  <p style="margin:10px 0 0;font-size:13px;color:rgba(255,255,255,.62);max-width:460px;line-height:1.6;">Gracias por elegir una experiencia premium. Estamos preparando una propuesta personalizada para usted.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:30px 28px 22px;line-height:1.65;">
                  <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">Estimado/a cliente,</p>
                  <p style="margin:0 0 14px;font-size:14px;color:#3f3f46;">${escapeHtml(intro)}</p>
                  <div style="margin:22px 0;background:linear-gradient(180deg,#fcfcfd 0%,#f6f6f8 100%);border:1px solid #ececf1;border-left:4px solid #c8a96e;border-radius:10px;padding:16px;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#6b6b6b;">Resumen de solicitud</p>
                    ${rows}
                  </div>
                  <p style="margin:18px 0 0;font-size:14px;color:#3f3f46;">Atentamente,<br /><strong>Equipo Comercial Auto Élite</strong></p>
                </td>
              </tr>
              <tr>
                <td style="border-top:1px solid #ececf1;padding:16px 28px 22px;background:#fafafc;">
                  <p style="margin:0;font-size:11px;line-height:1.6;color:#7a7a83;">Auto Élite | +1 (809) 000-0000 | info@autoelite.com<br />Av. Principal 100, Santo Domingo</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
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
    const toEmail = process.env.CONTACT_EMAIL;
    const subject = normalizeText(payload.subject);
    const intro = normalizeText(payload.intro);
    const fields = sanitizeFields(payload.fields);
    const text = buildEmailText(intro, fields);
    const html = buildEmailHtml(intro, fields);

    if (!toEmail) {
      return res.status(500).json({
        ok: false,
        error: "Missing CONTACT_EMAIL in server configuration.",
      });
    }

    if (!subject || !intro || !fields.length) {
      return res.status(400).json({
        ok: false,
        error: "Missing subject, intro or fields in request body.",
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM;
    const brevoApiKey = process.env.BREVO_API_KEY;
    const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;
    const brevoSenderName = process.env.BREVO_SENDER_NAME || "Auto Élite";

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
