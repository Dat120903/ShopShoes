require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const { exec } = require("child_process");

const app = express();

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

const SECRET = "DAT_WEBHOOK_123456";

function verifySignature(req) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return false;

  const expected = "sha256=" +
    crypto.createHmac("sha256", SECRET)
      .update(req.rawBody)
      .digest("hex");

  return signature === expected;
}

function sendTelegram(msg) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  exec(`curl -s "https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}"`);
}

app.post("/webhook", (req, res) => {

  if (!verifySignature(req)) {
    return res.status(401).send("Invalid signature");
  }

  exec("cd /var/www/ShopShoes && git fetch --all && git reset --hard origin/main", (err) => {
    if (err) {
      sendTelegram("❌ Deploy FAIL");
      return res.status(500).send("Deploy error");
    }

    exec("pm2 restart all", () => {
      sendTelegram("🎉 Deploy thành công!");
      res.send("OK");
    });
  });
});

app.listen(9000, () => {});
