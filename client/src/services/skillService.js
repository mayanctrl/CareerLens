import api from '../lib/api';

export const skillService = {
  getSkills: () => api.get('/skills'),
  getUserSkills: () => api.get('/skills/user'),
  addUserSkill: (data) => api.post('/skills/user', data),
  updateUserSkill: (id, data) => api.put(`/skills/user/${id}`, data),
  deleteUserSkill: (id) => api.delete(`/skills/user/${id}`)
};

export default skillService;
