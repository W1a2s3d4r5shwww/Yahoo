// server.js
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import proxyRouter from "./routes/proxy.js";
import { logger } from "./config/logger.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

// セキュリティ強化
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS (動的ホワイトリスト)
const whitelist = (process.env.WHITELIST || "")
  .split(",")
  .map((d) => d.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ログ設定（開発:詳細 / 本番:infoのみ）
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));
}

// ルート
app.use("/api/proxy", proxyRouter);

// ヘルスチェック
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// エラーハンドラ
app.use((err, req, res, next) => {
  logger.error(`${err.message}`);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
