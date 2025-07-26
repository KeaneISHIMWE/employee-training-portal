import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState, Notification } from '@/types';

// Initial state
const initialState: UIState = {
  searchQuery: '',
  selectedCategory: '',
  isLoading: false,
  notifications: [],
};

// UI slice
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'createdAt'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    showSuccessNotification: (state, action: PayloadAction<{ title: string; message: string }>) => {
      const notification: Notification = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: 'success',
        title: action.payload.title,
        message: action.payload.message,
        duration: 5000,
        createdAt: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    showErrorNotification: (state, action: PayloadAction<{ title: string; message: string }>) => {
      const notification: Notification = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: 'error',
        title: action.payload.title,
        message: action.payload.message,
        duration: 7000,
        createdAt: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    showInfoNotification: (state, action: PayloadAction<{ title: string; message: string }>) => {
      const notification: Notification = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: 'info',
        title: action.payload.title,
        message: action.payload.message,
        duration: 4000,
        createdAt: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    showWarningNotification: (state, action: PayloadAction<{ title: string; message: string }>) => {
      const notification: Notification = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: 'warning',
        title: action.payload.title,
        message: action.payload.message,
        duration: 6000,
        createdAt: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = '';
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  showSuccessNotification,
  showErrorNotification,
  showInfoNotification,
  showWarningNotification,
  clearFilters,
} = uiSlice.actions;

export default uiSlice.reducer;
