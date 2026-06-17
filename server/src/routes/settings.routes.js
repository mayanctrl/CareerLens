import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => res.json({ success: true, message: 'Settings API' }));
router.put('/', (req, res) => res.json({ success: true, message: 'Update Settings' }));

export default router;
