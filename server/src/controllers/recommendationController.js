import * as recommendationService from '../services/recommendationService.js';
import * as assessmentService from '../services/assessmentService.js';
import { AppError } from '../middleware/errorHandler.js';

export const getRecommendations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const recommendations = await recommendationService.getRecommendations(userId);
    
    res.status(200).json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecommendationById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;
        
        const recommendation = await recommendationService.getRecommendationById(id, userId);
        
        res.status(200).json({
            success: true,
            data: recommendation
        })
    } catch(error) {
        next(error);
    }
}

export const generateRecommendations = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // Optionally pass specific assessment ID
        
        const latestAssessment = await assessmentService.getLatestAssessment(userId);
        
        if(!latestAssessment) {
            return next(new AppError('No assessment found. Please complete an assessment first.', 400));
        }

        const recommendations = await recommendationService.generateRecommendations(userId, latestAssessment);

        res.status(200).json({
            success: true,
            message: 'Recommendations generated successfully',
            data: recommendations
        })
    } catch(error) {
        next(error);
    }
}
