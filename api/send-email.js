module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Auto Elite";

  if (!apiKey || !senderEmail) {
    return res.status(500).json({
      ok: false,
      error: "Missing BREVO_API_KEY or BREVO_SENDER_EMAIL in environment",
    });
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const toEmail = payload.to;
    const subject = payload.subject;
    const text = payload.text;

    if (!toEmail || !subject || !text) {
      return res.status(400).json({ ok: false, error: "Missing to, subject or text" });
    }

    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: toEmail }],
        subject,
        textContent: text,
      }),
    });

    const data = await brevoResponse.json();

    if (!brevoResponse.ok) {
      return res.status(400).json({ ok: false, error: data });
    }

    return res.status(200).json({ ok: true, messageId: data.messageId || null });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: "Unexpected error while sending email",
      detail: error.message,
    });
  }
};
