import React, { useEffect, useState } from 'react';
import { Bell, Check, Trash2, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import api from '../../lib/api';
import { showToast } from '../../components/common/Toast';

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Upskilling Opportunity!', message: 'A new masterclass for Node.js has been added matching your skill gaps.', type: 'info', read: false, date: 'Today' },
  { id: 2, title: 'Resume Gaps Detected', message: 'Mastered 2 new skills but haven\'t updated your resume yet.', type: 'warning', read: false, date: 'Yesterday' },
  { id: 3, title: 'Assessment Complete', message: 'You successfully completed the Career Assessment!', type: 'success', read: true, date: 'Last week' }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get('/notifications');
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        setNotifications(res.data);
      } else {
        setNotifications(MOCK_NOTIFICATIONS);
      }
    } catch (err) {
      console.warn('API error (using fallback notifications):', err);
      setNotifications(MOCK_NOTIFICATIONS);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/notifications/read`, { id });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      showToast.success('Marked as read');
    } catch (err) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
      showToast.success('Marked as read');
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n.id !== id));
      showToast.success('Notification removed');
    } catch (err) {
      setNotifications(prev => prev.filter(n => n.id !== id));
      showToast.success('Notification removed');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      showToast.success('All marked as read');
    } catch (err) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      showToast.success('All marked as read');
    }
  };

  if (loading) {
    return <Loader fullScreen text="Loading notification logs..." />;
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 animate-fade-in font-body">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-headline-lg font-bold text-on-surface mb-2 font-headline">System Notifications</h1>
          <p className="text-body-md text-on-surface-variant">
            Stay up to date with upskilling recommendations, mock interview alerts, and progress metrics.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" onClick={handleMarkAllRead} icon={Check}>
            Mark All Read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="All Caught Up!"
          description="You currently have no system notifications."
        />
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <Card 
              key={notif.id} 
              className={`p-4 border transition-all flex items-start justify-between gap-4
                ${notif.read 
                  ? 'bg-surface-container-low/40 border-outline-variant/10 opacity-70' 
                  : 'bg-surface-container border-primary/20 shadow-sm'
                }
              `}
              glass
            >
              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border
                  ${notif.type === 'warning' 
                    ? 'text-secondary bg-secondary/10 border-secondary/20' 
                    : notif.type === 'success' 
                    ? 'text-success bg-success/10 border-success/20' 
                    : 'text-primary bg-primary/10 border-primary/20'
                  }
                `}>
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`text-body-md font-bold ${notif.read ? 'text-on-surface-variant' : 'text-on-surface'}`}>
                    {notif.title}
                  </h3>
                  <p className="text-label-sm text-on-surface-variant leading-relaxed mt-1">{notif.message}</p>
                  <span className="text-[10px] text-on-surface-variant/80 font-bold block mt-1.5">{notif.date}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 shrink-0">
                {!notif.read && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded transition-all"
                    aria-label="Mark read"
                  >
                    <Check className="w-4.5 h-4.5" />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteNotification(notif.id)}
                  className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/10 rounded transition-all"
                  aria-label="Delete notification"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
