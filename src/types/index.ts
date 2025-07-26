// Course related interfaces
export interface Course {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  instructor: string;
  prerequisites: string[];
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// User and enrollment interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  enrolledCourses: string[];
  completedCourses: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  status: 'enrolled' | 'completed' | 'dropped';
  progress: number; // 0-100
}

// Redux state interfaces
export interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  filteredCourses: Course[];
}

export interface EnrollmentState {
  enrolledCourses: string[];
  loading: boolean;
  error: string | null;
}

export interface UIState {
  searchQuery: string;
  selectedCategory: string;
  isLoading: boolean;
  notifications: Notification[];
}

export interface RootState {
  courses: CoursesState;
  enrollment: EnrollmentState;
  ui: UIState;
}

// API response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CoursesApiResponse extends ApiResponse<Course[]> {
  total: number;
  page: number;
  limit: number;
}

export type CourseApiResponse = ApiResponse<Course>;

export type EnrollmentApiResponse = ApiResponse<Enrollment>;

// Search and filter interfaces
export interface SearchParams {
  query?: string;
  category?: string;
  level?: Course['level'];
  instructor?: string;
  tags?: string[];
  page?: number;
  limit?: number;
}

export interface FilterOptions {
  categories: string[];
  levels: Course['level'][];
  instructors: string[];
  tags: string[];
}

// Component prop interfaces
export interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  onEnroll?: (courseId: string) => void;
  onUnenroll?: (courseId: string) => void;
  className?: string;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

// Notification interface
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  createdAt: string; // ISO string for Redux serialization
}

// Form interfaces
export interface SearchFormData {
  query: string;
  category: string;
  level: string;
}

export interface EnrollmentFormData {
  courseId: string;
  userId: string;
}

// Error interfaces
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: Date;
}

// Loading state interface
export interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
}

// Pagination interface
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
}

// Theme and styling interfaces
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}

// Utility types
export type CourseLevel = Course['level'];
export type UserRole = User['role'];
export type EnrollmentStatus = Enrollment['status'];
export type NotificationType = Notification['type'];
export type ButtonVariant = ButtonProps['variant'];
export type ButtonSize = ButtonProps['size'];

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// Event handler types
export type SearchHandler = (query: string) => void;
export type EnrollHandler = (courseId: string) => void;
export type FilterHandler = (filters: Partial<SearchParams>) => void;
