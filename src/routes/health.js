import express from 'express';
import os from 'os';
import { success } from '../utils/response.js';

const router = express.Router();

router.get('/', (req, res) => {
  success(res, 'Healthy', {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: os.cpus()[0].model,
    platform: os.platform()
  });
});

export default router;
