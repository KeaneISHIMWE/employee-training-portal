import React, { useEffect } from 'react';
import { Notification } from '@/types';

interface NotificationToastProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onRemove,
}) => {
  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        onRemove(notification.id);
      }, notification.duration);

      return () => clearTimeout(timer);
    }
  }, [notification.id, notification.duration, onRemove]);

  const getTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-white',
          border: 'border-green-400',
          icon: 'text-green-500',
          title: 'text-green-900',
          message: 'text-green-800',
          accent: 'bg-green-500',
        };
      case 'error':
        return {
          bg: 'bg-white',
          border: 'border-red-400',
          icon: 'text-red-500',
          title: 'text-red-900',
          message: 'text-red-800',
          accent: 'bg-red-500',
        };
      case 'warning':
        return {
          bg: 'bg-white',
          border: 'border-yellow-400',
          icon: 'text-yellow-500',
          title: 'text-yellow-900',
          message: 'text-yellow-800',
          accent: 'bg-yellow-500',
        };
      case 'info':
        return {
          bg: 'bg-white',
          border: 'border-blue-400',
          icon: 'text-blue-500',
          title: 'text-blue-900',
          message: 'text-blue-800',
          accent: 'bg-blue-500',
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-400',
          icon: 'text-gray-500',
          title: 'text-gray-900',
          message: 'text-gray-800',
          accent: 'bg-gray-500',
        };
    }
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'info':
        return (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const styles = getTypeStyles(notification.type);

  return (
    <div className={`min-w-96 max-w-md w-full ${styles.bg} ${styles.border} border-2 rounded-lg shadow-xl pointer-events-auto ring-1 ring-black ring-opacity-10 overflow-hidden transform transition-all duration-300 ease-in-out`}>
      {/* Accent bar */}
      <div className={`h-1 ${styles.accent}`}></div>

      <div className="p-4">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${styles.icon}`}>
            {getIcon(notification.type)}
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <p className={`text-base font-semibold ${styles.title}`}>
                {notification.title}
              </p>
              <button
                className={`ml-4 rounded-full p-1 ${styles.message} hover:${styles.title} hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors`}
                onClick={() => onRemove(notification.id)}
              >
                <span className="sr-only">Close</span>
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className={`mt-1 text-sm ${styles.message} pr-8`}>
              {notification.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;
