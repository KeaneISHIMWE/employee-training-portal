'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCourses, setSearchQuery, setSelectedCategory } from '@/store/slices/coursesSlice';
import { addEnrolledCourse, removeEnrolledCourse, fetchEnrolledCourses } from '@/store/slices/enrollmentSlice';
import { showSuccessNotification, showErrorNotification } from '@/store/slices/uiSlice';
import Layout from '@/components/layout/Layout';
import CourseCard from '@/components/ui/CourseCard';
import SearchBar from '@/components/ui/SearchBar';
import Loading from '@/components/ui/Loading';
import Button from '@/components/ui/Button';

export default function Home() {
  const dispatch = useAppDispatch();
  const {
    filteredCourses,
    loading: coursesLoading,
    error: coursesError,
    searchQuery,
    selectedCategory,
  } = useAppSelector((state) => state.courses);

  const { enrolledCourses } = useAppSelector((state) => state.enrollment);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);

  useEffect(() => {
    // Extract unique categories from courses
    const uniqueCategories = Array.from(
      new Set(filteredCourses.map(course => course.category))
    ).sort();
    setCategories(uniqueCategories);
  }, [filteredCourses]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleEnroll = async (courseId: string) => {
    try {
      const course = filteredCourses.find(c => c.id === courseId);
      dispatch(addEnrolledCourse(courseId));
      dispatch(showSuccessNotification({
        title: 'Successfully Enrolled!',
        message: `You are now enrolled in "${course?.title || 'the course'}". Check your My Courses page to get started.`,
      }));
    } catch {
      dispatch(showErrorNotification({
        title: 'Enrollment Failed',
        message: 'Unable to enroll in the course. Please try again or contact support.',
      }));
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      const course = filteredCourses.find(c => c.id === courseId);
      dispatch(removeEnrolledCourse(courseId));
      dispatch(showSuccessNotification({
        title: 'Successfully Unenrolled',
        message: `You have been unenrolled from "${course?.title || 'the course'}". You can re-enroll anytime.`,
      }));
    } catch {
      dispatch(showErrorNotification({
        title: 'Unenrollment Failed',
        message: 'Unable to unenroll from the course. Please try again or contact support.',
      }));
    }
  };

  const clearFilters = () => {
    dispatch(setSearchQuery(''));
    dispatch(setSelectedCategory(''));
  };

  if (coursesError) {
    return (
      <Layout title="Employee Training Portal" description="Browse and enroll in training courses">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Courses</h2>
          <p className="text-gray-600 mb-4">{coursesError}</p>
          <Button onClick={() => dispatch(fetchCourses())}>
            Try Again
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Employee Training Portal"
      description="Browse and enroll in comprehensive training courses designed to enhance your skills and advance your career"
    >
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search courses by title, description, or instructor..."
            className="w-full md:w-96"
          />

          <div className="flex gap-2 items-center">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {(searchQuery || selectedCategory) && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedCategory) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {searchQuery && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Search: &ldquo;{searchQuery}&rdquo;
                <button
                  onClick={() => dispatch(setSearchQuery(''))}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Category: {selectedCategory}
                <button
                  onClick={() => dispatch(setSelectedCategory(''))}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Loading State */}
      {coursesLoading && (
        <Loading isLoading={true} loadingText="Loading courses..." />
      )}

      {/* Courses Grid */}
      {!coursesLoading && (
        <>
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Courses Found</h2>
              <p className="text-gray-600 mb-4">
                {searchQuery || selectedCategory
                  ? "Try adjusting your search criteria or filters."
                  : "No courses are currently available."}
              </p>
              {(searchQuery || selectedCategory) && (
                <Button onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {filteredCourses.length} Course{filteredCourses.length !== 1 ? 's' : ''} Available
                </h2>
                <div className="text-sm text-gray-600">
                  {enrolledCourses.length} Enrolled
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={enrolledCourses.includes(course.id)}
                    onEnroll={handleEnroll}
                    onUnenroll={handleUnenroll}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
}
