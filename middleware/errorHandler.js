// middleware/errorHandler.js
import { logger } from "../config/logger.js";

export const globalErrorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
