import * as assessmentService from '../services/assessmentService.js';
import * as recommendationService from '../services/recommendationService.js';

export const submitAssessment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const assessmentData = req.body;
    
    // 1. Save assessment
    const savedAssessment = await assessmentService.submitAssessment(userId, assessmentData);
    
    // 2. Generate recommendations automatically based on new assessment
    const recommendations = await recommendationService.generateRecommendations(userId, savedAssessment);

    res.status(201).json({
      success: true,
      message: 'Assessment submitted and recommendations generated',
      data: {
          assessment: savedAssessment,
          recommendations
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getLatestAssessment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const assessment = await assessmentService.getLatestAssessment(userId);

    res.status(200).json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAssessmentHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const history = await assessmentService.getAssessmentHistory(userId);
        
        res.status(200).json({
            success: true,
            data: history
        })
    } catch(error) {
        next(error);
    }
}
