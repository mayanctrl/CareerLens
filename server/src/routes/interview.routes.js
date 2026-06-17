import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/questions', (req, res) => res.json({ success: true, message: 'Interview Questions API' }));
router.post('/submit', (req, res) => res.json({ success: true, message: 'Submit Interview Answer' }));
router.get('/progress', (req, res) => res.json({ success: true, message: 'Interview Progress API' }));
router.get('/categories', (req, res) => res.json({ success: true, message: 'Interview Categories API' }));

export default router;
