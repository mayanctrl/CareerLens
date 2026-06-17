import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => res.json({ success: true, message: 'Roadmaps API' }));
router.post('/', (req, res) => res.json({ success: true, message: 'Create Roadmap' }));
router.put('/steps/:id', (req, res) => res.json({ success: true, message: 'Update Roadmap Step' }));
router.get('/:id', (req, res) => res.json({ success: true, message: 'Get Roadmap Details' }));

export default router;
