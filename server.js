const path = require("path");
const express = require("express");
require("dotenv").config();

const sendEmailHandler = require("./api/send-email");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
  console.log(`Auto Élite server running on http://localhost:${PORT}`);
});
