import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'glass text-[#DBE1FF]',
        style: {
          background: 'rgba(28, 37, 65, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid #3A506B',
          color: '#DBE1FF',
          padding: '16px',
          borderRadius: '12px',
        },
        success: {
          icon: <CheckCircle className="text-[#6FFFE9] w-5 h-5" />,
          style: {
            borderLeft: '4px solid #6FFFE9',
          },
        },
        error: {
          icon: <XCircle className="text-[#FFB4AB] w-5 h-5" />,
          style: {
            borderLeft: '4px solid #EF4444',
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
    icon: <Info className="text-[#5BC0BE] w-5 h-5" />,
    style: { borderLeft: '4px solid #5BC0BE' }
  }),
  warning: (message) => toast(message, {
    icon: <AlertTriangle className="text-[#F59E0B] w-5 h-5" />,
    style: { borderLeft: '4px solid #F59E0B' }
  }),
};

export default ToastProvider;
