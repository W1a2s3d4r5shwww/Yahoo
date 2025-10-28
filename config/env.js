// config/env.js
import dotenv from "dotenv";
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY || "",
  allowedIPs: (process.env.ALLOWED_IPS || "").split(",").filter(Boolean),
};
