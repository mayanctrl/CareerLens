import api from '../lib/api';

export const notificationService = {
  getNotifications: () => api.get('/notifications'),
  markAsRead: (data) => api.put('/notifications/read', data),
  markAllRead: () => api.put('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`)
};

export default notificationService;
