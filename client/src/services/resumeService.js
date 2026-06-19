import api from '../lib/api';

export const resumeService = {
  getResumes: () => api.get('/resume'),
  uploadResume: (formData) => api.post('/resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateResume: (id, data) => api.put(`/resume/${id}`, data),
  deleteResume: (id) => api.delete(`/resume/${id}`)
};

export default resumeService;
