import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { limiter } from './middlewares/rateLimit.js';
import { whitelist } from './config/whitelist.js';
import { securityHeaders } from './middlewares/security.js';
import { logger } from './middlewares/logger.js';
import indexRouter from './routes/index.js';
import healthRouter from './routes/health.js';

const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security
app.use(helmet());
app.use(limiter);
app.use(securityHeaders);

// Logging
app.use(morgan('combined', { stream: logger.stream }));

// CORS Whitelist
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
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

export default app;
