import api from '../lib/api';

export const roadmapService = {
  getRoadmaps: () => api.get('/roadmap'),
  addRoadmap: (data) => api.post('/roadmap', data),
  updateStep: (id, data) => api.put(`/roadmap/steps/${id}`, data),
  getRoadmapById: (id) => api.get(`/roadmap/${id}`)
};

export default roadmapService;
