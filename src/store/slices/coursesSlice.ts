import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Course, CoursesState, SearchParams } from '@/types';

// Async thunks for API calls
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params?: SearchParams) => {
    const searchParams = new URLSearchParams();
    if (params?.query) searchParams.append('query', params.query);
    if (params?.category) searchParams.append('category', params.category);
    if (params?.level) searchParams.append('level', params.level);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());

    const response = await fetch(`/api/courses?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await response.json();
    return data.data as Course[];
  }
);

export const fetchCourseById = createAsyncThunk(
  'courses/fetchCourseById',
  async (courseId: string) => {
    const response = await fetch(`/api/courses/${courseId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch course');
    }
    const data = await response.json();
    return data.data as Course;
  }
);

export const searchCourses = createAsyncThunk(
  'courses/searchCourses',
  async (query: string) => {
    const response = await fetch(`/api/courses?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Failed to search courses');
    }
    const data = await response.json();
    return data.data as Course[];
  }
);

// Initial state
const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: '',
  filteredCourses: [],
};

// Courses slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredCourses = filterCourses(state.courses, action.payload, state.selectedCategory);
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.filteredCourses = filterCourses(state.courses, state.searchQuery, action.payload);
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = '';
      state.filteredCourses = state.courses;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.filteredCourses = filterCourses(action.payload, state.searchQuery, state.selectedCategory);
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      });

    // Search courses
    builder
      .addCase(searchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredCourses = action.payload;
      })
      .addCase(searchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search courses';
      });

    // Fetch course by ID
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        // Update the course in the courses array if it exists
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        } else {
          state.courses.push(action.payload);
        }
        state.filteredCourses = filterCourses(state.courses, state.searchQuery, state.selectedCategory);
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch course';
      });
  },
});

// Helper function to filter courses
function filterCourses(courses: Course[], searchQuery: string, selectedCategory: string): Course[] {
  let filtered = courses;

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.shortDescription.toLowerCase().includes(query) ||
      course.fullDescription.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query) ||
      course.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  if (selectedCategory && selectedCategory !== 'all') {
    filtered = filtered.filter(course => 
      course.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  return filtered;
}

export const { setSearchQuery, setSelectedCategory, clearFilters, clearError } = coursesSlice.actions;
export default coursesSlice.reducer;
