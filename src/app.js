import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { limiter } from './middlewares/rateLimit.js';
import { securityHeaders } from './middlewares/security.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './middlewares/logger.js';
import { whitelist } from './config/whitelist.js';
import { CONFIG } from './config/config.js';
import indexRouter from './routes/index.js';
import healthRouter from './routes/health.js';

const app = express();

// Core Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
if (CONFIG.ENABLE_COMPRESSION) app.use(compression());
app.use(helmet());
app.use(limiter);
app.use(securityHeaders);

// Logging
if (CONFIG.ENABLE_LOGGING) app.use(morgan('combined', { stream: logger.stream }));

// CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`❌ Blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

// Routes
app.use('/', indexRouter);
app.use('/health', healthRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not Found' });
});

// Error Handler
app.use(errorHandler);

export default app;
