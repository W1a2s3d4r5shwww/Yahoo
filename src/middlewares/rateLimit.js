import rateLimit from 'express-rate-limit';
import { CONFIG } from '../config/config.js';

export const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: CONFIG.RATE_LIMIT,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Try again later.'
  }
});
