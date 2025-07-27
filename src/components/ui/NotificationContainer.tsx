'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { removeNotification } from '@/store/slices/uiSlice';
import NotificationToast from './NotificationToast';

const NotificationContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.ui.notifications);

  const handleRemoveNotification = (id: string) => {
    dispatch(removeNotification(id));
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      {/* Show only the most recent notification to avoid stacking */}
      {notifications.length > 0 && (
        <div className="animate-in slide-in-from-right-full duration-300">
          <NotificationToast
            notification={notifications[notifications.length - 1]}
            onRemove={handleRemoveNotification}
          />
        </div>
      )}
    </div>
  );
};

export default NotificationContainer;
