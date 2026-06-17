import express from 'express';
import * as recommendationController from '../controllers/recommendationController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { generateRecommendationSchema } from '../validators/recommendation.validator.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', recommendationController.getRecommendations);
router.get('/:id', recommendationController.getRecommendationById);
router.post('/generate', validate(generateRecommendationSchema), recommendationController.generateRecommendations);

export default router;
