import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => res.json({ success: true, message: 'Projects API' }));
router.get('/user', (req, res) => res.json({ success: true, message: 'User Projects API' }));
router.post('/user', (req, res) => res.json({ success: true, message: 'Start Project' }));
router.put('/user/:id', (req, res) => res.json({ success: true, message: 'Update User Project' }));
router.get('/:id', (req, res) => res.json({ success: true, message: 'Project Details API' }));

export default router;
