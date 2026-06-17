import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => res.json({ success: true, message: 'Insights API' }));
router.get('/trending', (req, res) => res.json({ success: true, message: 'Trending Insights API' }));
router.get('/:id', (req, res) => res.json({ success: true, message: 'Insight Details API' }));

export default router;
