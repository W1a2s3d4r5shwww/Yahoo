// server.js
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { limiter } from "./middleware/rateLimiter.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import routes from "./routes/index.js";
import { corsOptions } from "./config/security.js";
import { logger } from "./config/logger.js";

const app = express();

// セキュリティ・解析
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan("combined", { stream: logger.stream }));
app.use(limiter);

// ルート
app.use("/", routes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// グローバルエラー
app.use(globalErrorHandler);

export default app;
