import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => res.json({ success: true, message: 'Skills API' }));
router.get('/user', (req, res) => res.json({ success: true, message: 'User Skills API' }));
router.post('/user', (req, res) => res.json({ success: true, message: 'Add User Skill' }));
router.put('/user/:id', (req, res) => res.json({ success: true, message: 'Update User Skill' }));
router.delete('/user/:id', (req, res) => res.json({ success: true, message: 'Delete User Skill' }));

export default router;
