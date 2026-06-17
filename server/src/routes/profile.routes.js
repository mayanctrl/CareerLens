import express from 'express';
import * as profileController from '../controllers/profileController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { updateProfileSchema } from '../validators/profile.validator.js';

const router = express.Router();

router.use(requireAuth); // Protect all profile routes

router.get('/', profileController.getProfile);
router.put('/', validate(updateProfileSchema), profileController.updateProfile);
router.post('/avatar', profileController.updateAvatar);

export default router;
