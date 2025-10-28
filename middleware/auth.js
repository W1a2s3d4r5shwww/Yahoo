// middleware/auth.js
import { config } from "../config/env.js";

export const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  const ip = req.ip;

  // IPチェック
  if (config.allowedIPs.length && !config.allowedIPs.includes(ip)) {
    return res.status(403).json({ error: "IP not allowed" });
  }

  // トークンチェック
  if (config.apiKey && token !== config.apiKey) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  next();
};
