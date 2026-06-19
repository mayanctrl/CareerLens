import api from '../lib/api';

export const assessmentService = {
  submitAssessment: (data) => api.post('/assessment', data),
  getAssessment: () => api.get('/assessment'),
  getAssessmentHistory: () => api.get('/assessment/history')
};

export default assessmentService;
