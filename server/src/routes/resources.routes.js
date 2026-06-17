import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => res.json({ success: true, message: 'Resources API' }));
router.get('/categories', (req, res) => res.json({ success: true, message: 'Resource Categories API' }));
router.get('/:id', (req, res) => res.json({ success: true, message: 'Resource Details API' }));

export default router;
