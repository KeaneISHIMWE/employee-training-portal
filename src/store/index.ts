import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import coursesReducer from './slices/coursesSlice';
import enrollmentReducer from './slices/enrollmentSlice';
import uiReducer from './slices/uiSlice';
import { RootState } from '@/types';

// Configure the store
export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    enrollment: enrollmentReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state - removed since we're now using strings
        ignoredPaths: [],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

// Selectors
export const selectCourses = (state: AppRootState) => state.courses.courses;
export const selectFilteredCourses = (state: AppRootState) => state.courses.filteredCourses;
export const selectCoursesLoading = (state: AppRootState) => state.courses.loading;
export const selectCoursesError = (state: AppRootState) => state.courses.error;
export const selectSearchQuery = (state: AppRootState) => state.courses.searchQuery;
export const selectSelectedCategory = (state: AppRootState) => state.courses.selectedCategory;

export const selectEnrolledCourses = (state: AppRootState) => state.enrollment.enrolledCourses;
export const selectEnrollmentLoading = (state: AppRootState) => state.enrollment.loading;
export const selectEnrollmentError = (state: AppRootState) => state.enrollment.error;

export const selectUISearchQuery = (state: AppRootState) => state.ui.searchQuery;
export const selectUISelectedCategory = (state: AppRootState) => state.ui.selectedCategory;
export const selectUILoading = (state: AppRootState) => state.ui.isLoading;
export const selectNotifications = (state: AppRootState) => state.ui.notifications;

// Combined selectors
export const selectCourseById = (courseId: string) => (state: AppRootState) =>
  state.courses.courses.find(course => course.id === courseId);

export const selectIsEnrolled = (courseId: string) => (state: AppRootState) =>
  state.enrollment.enrolledCourses.includes(courseId);

export const selectEnrolledCoursesData = (state: AppRootState) => {
  const enrolledIds = state.enrollment.enrolledCourses;
  return state.courses.courses.filter(course => enrolledIds.includes(course.id));
};

export const selectCourseCategories = (state: AppRootState) => {
  const categories = state.courses.courses.map(course => course.category);
  return Array.from(new Set(categories)).sort();
};

export const selectCourseLevels = (state: AppRootState) => {
  const levels = state.courses.courses.map(course => course.level);
  return Array.from(new Set(levels)).sort();
};

export const selectCourseInstructors = (state: AppRootState) => {
  const instructors = state.courses.courses.map(course => course.instructor);
  return Array.from(new Set(instructors)).sort();
};

export default store;
