// routes/proxy.js
import express from "express";
import fetch from "node-fetch";
import { verifyAuth } from "../middleware/auth.js";
import { logger } from "../config/logger.js";

const router = express.Router();

router.post("/", verifyAuth, async (req, res, next) => {
  try {
    const { url, method = "GET", headers = {}, body } = req.body;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    const response = await fetch(url, {
      method,
      headers,
      body: method !== "GET" && body ? JSON.stringify(body) : undefined,
    });

    const data = await response.text();
    logger.info(`Proxied ${method} ${url} -> ${response.status}`);

    res.status(response.status).send(data);
  } catch (err) {
    next(err);
  }
});

export default router;
