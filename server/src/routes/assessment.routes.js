import express from 'express';
import * as assessmentController from '../controllers/assessmentController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { submitAssessmentSchema } from '../validators/assessment.validator.js';

const router = express.Router();

router.use(requireAuth);

router.post('/', validate(submitAssessmentSchema), assessmentController.submitAssessment);
router.get('/', assessmentController.getLatestAssessment);
router.get('/history', assessmentController.getAssessmentHistory);

export default router;
