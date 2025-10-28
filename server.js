import dotenv from 'dotenv';
dotenv.config();

import app from './src/app.js';
import { CONFIG } from './src/config/config.js';
import { logger } from './src/middlewares/logger.js';

app.listen(CONFIG.PORT, () => {
  logger.info(` Server running at http://localhost:${CONFIG.PORT} [${CONFIG.NODE_ENV}]`);
});
