const path = require("path");
const express = require("express");
require("dotenv").config();

const sendEmailHandler = require("./api/send-email");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const path = req.path.toLowerCase();
  if (
    path.includes(".env") ||
    path.endsWith("package-lock.json") ||
    path.startsWith("/node_modules")
  ) {
    return res.status(404).end();
  }
  next();
});

app.all("/api/send-email", async (req, res) => {
  try {
    await sendEmailHandler(req, res);
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error?.message || "Unexpected server error",
    });
  }
});

app.use(express.static(ROOT_DIR));

app.get("/", (_req, res) => {
  res.sendFile(path.join(ROOT_DIR, "index.html"));
});

function logEmailConfigStatus() {
  if (!process.env.CONTACT_EMAIL) {
    console.warn("[email] Falta CONTACT_EMAIL. Copia .env.example a .env y configúralo.");
    return;
  }
  const hasProvider =
    (process.env.RESEND_API_KEY && process.env.RESEND_FROM) ||
    (process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL);
  if (hasProvider) {
    console.log(`[email] Envío activo → ${process.env.CONTACT_EMAIL}`);
    return;
  }
  if (String(process.env.EMAIL_DEV_LOG || "").trim().toLowerCase() === "true") {
    console.log(`[email] Modo desarrollo (EMAIL_DEV_LOG) → ${process.env.CONTACT_EMAIL}`);
    return;
  }
  console.warn(
    "[email] Sin proveedor (Resend/Brevo). Añade claves en .env o EMAIL_DEV_LOG=true para pruebas."
  );
}

app.listen(PORT, () => {
  console.log(`Auto Élite server running on http://localhost:${PORT}`);
  logEmailConfigStatus();
});
