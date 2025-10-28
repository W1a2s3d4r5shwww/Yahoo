// config/security.js
import { WHITELIST } from "./whitelist.js";

export const corsOptions = {
  origin(origin, callback) {
    if (!origin || WHITELIST.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS: Origin not allowed"));
    }
  },
  credentials: true,
};
