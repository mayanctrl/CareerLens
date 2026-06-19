import api from '../lib/api';

export const insightService = {
  getInsights: () => api.get('/insights'),
  getTrending: () => api.get('/insights/trending'),
  getInsightById: (id) => api.get(`/insights/${id}`)
};

export default insightService;
