'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCourses, setSearchQuery, setSelectedCategory } from '@/store/slices/coursesSlice';
import { addEnrolledCourse, removeEnrolledCourse } from '@/store/slices/enrollmentSlice';
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
      dispatch(addEnrolledCourse(courseId));
      dispatch(showSuccessNotification({
        title: 'Enrollment Successful',
        message: 'You have been enrolled in the course successfully!',
      }));
    } catch (error) {
      dispatch(showErrorNotification({
        title: 'Enrollment Failed',
        message: 'Failed to enroll in the course. Please try again.',
      }));
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      dispatch(removeEnrolledCourse(courseId));
      dispatch(showSuccessNotification({
        title: 'Unenrollment Successful',
        message: 'You have been unenrolled from the course.',
      }));
    } catch (error) {
      dispatch(showErrorNotification({
        title: 'Unenrollment Failed',
        message: 'Failed to unenroll from the course. Please try again.',
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
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
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
                Search: "{searchQuery}"
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
              <div className="text-gray-400 text-6xl mb-4">📚</div>
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
