import api from '../lib/api';

export const interviewService = {
  getQuestions: (params) => api.get('/interview/questions', { params }),
  submitAnswer: (data) => api.post('/interview/submit', data),
  getProgress: () => api.get('/interview/progress'),
  getCategories: () => api.get('/interview/categories')
};

export default interviewService;
