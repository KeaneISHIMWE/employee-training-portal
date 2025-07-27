import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EnrollmentState, Enrollment } from '@/types';

// Async thunks for enrollment operations
export const enrollInCourse = createAsyncThunk(
  'enrollment/enrollInCourse',
  async (courseId: string) => {
    const response = await fetch('/api/enrollment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId }),
    });

    if (!response.ok) {
      throw new Error('Failed to enroll in course');
    }

    const data = await response.json();
    return data.data as Enrollment;
  }
);

export const unenrollFromCourse = createAsyncThunk(
  'enrollment/unenrollFromCourse',
  async (courseId: string) => {
    const response = await fetch('/api/enrollment', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseId }),
    });

    if (!response.ok) {
      throw new Error('Failed to unenroll from course');
    }

    return courseId;
  }
);

export const fetchEnrolledCourses = createAsyncThunk(
  'enrollment/fetchEnrolledCourses',
  async () => {
    const response = await fetch('/api/enrollment');
    if (!response.ok) {
      throw new Error('Failed to fetch enrolled courses');
    }
    const data = await response.json();
    return data.data as string[];
  }
);

// Helper function to get enrolled courses from localStorage
const getStoredEnrolledCourses = (): string[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('enrolledCourses');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading enrolled courses from localStorage:', error);
      return [];
    }
  }
  return [];
};

// Helper function to save enrolled courses to localStorage
const saveEnrolledCourses = (courses: string[]): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('enrolledCourses', JSON.stringify(courses));
    } catch (error) {
      console.error('Error saving enrolled courses to localStorage:', error);
    }
  }
};

// Initial state
const initialState: EnrollmentState = {
  enrolledCourses: getStoredEnrolledCourses(),
  loading: false,
  error: null,
};

// Enrollment slice
const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState,
  reducers: {
    clearEnrollmentError: (state) => {
      state.error = null;
    },
    // For local state management without API calls
    addEnrolledCourse: (state, action: PayloadAction<string>) => {
      if (!state.enrolledCourses.includes(action.payload)) {
        state.enrolledCourses.push(action.payload);
        saveEnrolledCourses(state.enrolledCourses);
      }
    },
    removeEnrolledCourse: (state, action: PayloadAction<string>) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        courseId => courseId !== action.payload
      );
      saveEnrolledCourses(state.enrolledCourses);
    },
    setEnrolledCourses: (state, action: PayloadAction<string[]>) => {
      state.enrolledCourses = action.payload;
      saveEnrolledCourses(state.enrolledCourses);
    },
  },
  extraReducers: (builder) => {
    // Enroll in course
    builder
      .addCase(enrollInCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.enrolledCourses.includes(action.payload.courseId)) {
          state.enrolledCourses.push(action.payload.courseId);
        }
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to enroll in course';
      });

    // Unenroll from course
    builder
      .addCase(unenrollFromCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unenrollFromCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses = state.enrolledCourses.filter(
          courseId => courseId !== action.payload
        );
      })
      .addCase(unenrollFromCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to unenroll from course';
      });

    // Fetch enrolled courses
    builder
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.loading = false;
        // Merge server data with local data, prioritizing local data
        const serverCourses = action.payload || [];
        const localCourses = state.enrolledCourses;
        const mergedCourses = Array.from(new Set([...localCourses, ...serverCourses]));
        state.enrolledCourses = mergedCourses;
        saveEnrolledCourses(mergedCourses);
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enrolled courses';
      });
  },
});

export const {
  clearEnrollmentError,
  addEnrolledCourse,
  removeEnrolledCourse,
  setEnrolledCourses,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
