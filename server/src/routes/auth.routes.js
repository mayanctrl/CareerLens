import express from 'express';
import * as authController from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';
import { registerSchema, loginSchema, resetPasswordSchema } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', validate(resetPasswordSchema), authController.forgotPassword);

export default router;
