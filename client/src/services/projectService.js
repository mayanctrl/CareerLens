import api from '../lib/api';

export const projectService = {
  getProjects: () => api.get('/projects'),
  getUserProjects: () => api.get('/projects/user'),
  addUserProject: (data) => api.post('/projects/user', data),
  updateUserProject: (id, data) => api.put(`/projects/user/${id}`, data),
  getProjectById: (id) => api.get(`/projects/${id}`)
};

export default projectService;
