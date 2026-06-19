import api from '../lib/api';

export const progressService = {
  getProgress: () => api.get('/progress'),
  getDashboardStats: () => api.get('/progress/dashboard'),
  updateGoals: (data) => api.put('/progress/goals', data)
};

export default progressService;
