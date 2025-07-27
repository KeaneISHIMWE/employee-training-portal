# Employee Training Portal

A comprehensive training platform built with Next.js, TypeScript, and Redux Toolkit that allows employees to browse, search, and enroll in training courses.
## Live URL 

https://employee-training-portal-ua4j.vercel.app/

## Features

### Core Functionality
- **Course Browsing**: View a comprehensive list of training courses with detailed information
- **Advanced Search**: Search courses by title, description, instructor, category, or tags
- **Category Filtering**: Filter courses by category with real-time updates
- **Course Enrollment**: Enroll and unenroll from courses with instant feedback
- **Course Details**: Detailed course pages with full descriptions, prerequisites, and metadata
- **Responsive Design**: Fully responsive design that works on desktop, tablet, and mobile devices

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: Centralized state management for courses, enrollment, and UI state
- **Server-Side API**: RESTful API endpoints for course data and enrollment management
- **Error Handling**: Comprehensive error handling with user-friendly error pages
- **Loading States**: Smooth loading indicators and skeleton screens
- **Notifications**: Toast notifications for user actions and feedback
- **Accessibility**: WCAG-compliant design with proper ARIA labels and semantic HTML

##  Tech Stack

- **Framework**: Next.js 15.4.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit with React-Redux
- **Database**: MongoDB (with JSON fallback for development)
- **Icons**: Heroicons (via Tailwind)
- **Development**: ESLint, Hot Module Replacement

##  Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or pnpm
- MongoDB (optional - will fallback to JSON data if not available)

##  Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd employee-training-portal
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# MongoDB connection string (optional)
# MONGODB_URI=mongodb://localhost:27017/employee-training-portal
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee-training-portal

# Leave commented out to use JSON fallback data
```






## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── courses/       # Course-related endpoints
│   │   └── enrollment/    # Enrollment endpoints
│   ├── courses/[id]/      # Dynamic course detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx          # Home page
│   ├── error.tsx         # Error page
│   └── not-found.tsx     # 404 page
├── components/            # Reusable UI components
│   ├── layout/           # Layout components
│   └── ui/               # UI components (Button, CourseCard, etc.)
├── lib/                  # Utility libraries
│   ├── database.ts       # Database service layer
│   ├── mongodb.ts        # MongoDB connection
│   └── sampleData.ts     # Sample course data
├── store/                # Redux store configuration
│   ├── slices/          # Redux slices
│   ├── index.ts         # Store configuration
│   └── provider.tsx     # Redux provider component
└── types/               # TypeScript type definitions
    └── index.ts         # Shared types and interfaces
```

##  Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Used for primary actions and links
- **Secondary**: Gray (#6B7280) - Used for secondary actions
- **Success**: Green (#10B981) - Used for success states and enrollment status
- **Warning**: Yellow (#F59E0B) - Used for warnings and intermediate levels
- **Error**: Red (#EF4444) - Used for errors and advanced levels
- **Background**: Light gray (#F9FAFB) - Page background
- **Surface**: White (#FFFFFF) - Card and component backgrounds

### Typography
- **Primary Font**: System font stack (Arial, Helvetica, sans-serif)
- **Headings**: text-2xl for course titles, text-xl for section headings
- **Body**: text-base for descriptions and content
- **Small**: text-sm for metadata and secondary information

### Component Design
- **Cards**: Subtle shadow with rounded corners and hover effects
- **Buttons**: Consistent padding, rounded corners, and focus states
- **Forms**: Clean inputs with proper focus indicators
- **Spacing**: Consistent 4px/8px grid system using Tailwind utilities

##  API Endpoints

### Courses
- `GET /api/courses` - Get all courses with optional search and filtering
  - Query parameters: `query`, `category`, `level`, `page`, `limit`
- `GET /api/courses/[id]` - Get specific course by ID

### Enrollment
- `GET /api/enrollment` - Get enrolled courses for current user
- `POST /api/enrollment` - Enroll in a course
  - Body: `{ courseId: string }`
- `DELETE /api/enrollment` - Unenroll from a course
  - Body: `{ courseId: string }`

## 🗄 Database Schema

### Course Document
```typescript
interface Course {
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
```

### Sample Data
The application includes 6 sample courses covering:
- Data Analytics (Beginner)
- JavaScript Development (Advanced)
- Digital Marketing (Beginner)
- Project Management (Intermediate)
- Cybersecurity (Intermediate)
- Cloud Computing with AWS (Intermediate)

##  Key Features Implementation

### State Management
- **Redux Toolkit** for predictable state management
- **Slices** for courses, enrollment, and UI state
- **Async thunks** for API calls with loading and error states
- **Selectors** for efficient data access

### Search and Filtering
- Real-time search across multiple course fields
- Category-based filtering with dynamic options
- Combined search and filter functionality
- Clear filter options with visual indicators

### Enrollment System
- Local state management for demo purposes
- Optimistic updates with error handling
- Visual feedback for enrollment status
- Toggle enrollment/unenrollment functionality

### Error Handling
- Global error boundary for unexpected errors
- API error handling with user-friendly messages
- Loading states for all async operations
- Graceful fallbacks for missing data

##  Deployment

### Vercel (Recommended)
1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment
```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Environment Variables for Production
```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_APP_URL=your_app_url
```

##  Testing

### Manual Testing Checklist
- [ ] Home page loads with course list
- [ ] Search functionality works correctly
- [ ] Category filtering works
- [ ] Course enrollment/unenrollment works
- [ ] Course detail pages load correctly
- [ ] Responsive design works on mobile/tablet
- [ ] Error handling works for API failures
- [ ] Loading states display correctly
- [ ] Notifications appear for user actions

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Consistent component structure and naming
- Proper error handling and loading states

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


