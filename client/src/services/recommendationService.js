import api from '../lib/api';

export const recommendationService = {
  getRecommendations: () => api.get('/recommendations'),
  getRecommendationDetails: (id) => api.get(`/recommendations/${id}`),
  generateRecommendations: () => api.post('/recommendations/generate')
};

export default recommendationService;
