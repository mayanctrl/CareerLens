import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => res.json({ success: true, message: 'Resume API' }));
router.post('/', (req, res) => res.json({ success: true, message: 'Create Resume' }));
router.put('/:id', (req, res) => res.json({ success: true, message: 'Update Resume' }));
router.delete('/:id', (req, res) => res.json({ success: true, message: 'Delete Resume' }));

export default router;
