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
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
          onRemove={handleRemoveNotification}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
