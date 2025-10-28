import express from 'express';
import { success } from '../utils/response.js';
const router = express.Router();

router.get('/', (req, res) => {
  success(res, 'Kaihi API running at full performance');
});

export default router;
