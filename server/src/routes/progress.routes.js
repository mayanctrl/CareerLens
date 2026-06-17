import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => res.json({ success: true, message: 'Progress API' }));
router.get('/dashboard', (req, res) => res.json({ success: true, message: 'Dashboard Stats API' }));
router.put('/goals', (req, res) => res.json({ success: true, message: 'Update Goals API' }));

export default router;
