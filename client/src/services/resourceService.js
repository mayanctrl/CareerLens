import api from '../lib/api';

export const resourceService = {
  getResources: () => api.get('/resources'),
  getCategories: () => api.get('/resources/categories'),
  getResourceById: (id) => api.get(`/resources/${id}`)
};

export default resourceService;
