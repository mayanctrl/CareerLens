import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'glass-panel text-on-surface font-label text-label-md',
        style: {
          background: 'rgba(12, 33, 51, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(253, 255, 252, 0.08)',
          color: '#d0e5fc',
          padding: '14px 18px',
          borderRadius: '16px',
        },
        success: {
          icon: <CheckCircle className="text-primary w-5 h-5 shrink-0" />,
          style: {
            borderLeft: '4px solid #55e0d2',
          },
        },
        error: {
          icon: <XCircle className="text-error w-5 h-5 shrink-0" />,
          style: {
            borderLeft: '4px solid #ffb4ab',
          },
        },
      }}
    />
  );
};

export const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast(message, {
    icon: <Info className="text-primary w-5 h-5 shrink-0" />,
    style: { borderLeft: '4px solid #55e0d2' }
  }),
  warning: (message) => toast(message, {
    icon: <AlertTriangle className="text-secondary w-5 h-5 shrink-0" />,
    style: { borderLeft: '4px solid #ffb86b' }
  }),
};

export default ToastProvider;
