import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => res.json({ success: true, message: 'Notifications API' }));
router.put('/read', (req, res) => res.json({ success: true, message: 'Mark Notification Read' }));
router.put('/read-all', (req, res) => res.json({ success: true, message: 'Mark All Notifications Read' }));
router.delete('/:id', (req, res) => res.json({ success: true, message: 'Delete Notification' }));

export default router;
