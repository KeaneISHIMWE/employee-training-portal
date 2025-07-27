'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCourses } from '@/store/slices/coursesSlice';
import { fetchEnrolledCourses } from '@/store/slices/enrollmentSlice';
import Layout from '@/components/layout/Layout';
import CourseCard from '@/components/ui/CourseCard';
import Loading from '@/components/ui/Loading';
import { Course } from '@/types';

const MyCoursesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { courses, loading: coursesLoading, error: coursesError } = useAppSelector((state) => state.courses);
  const { enrolledCourses } = useAppSelector((state) => state.enrollment);

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
    // Only fetch enrolled courses if we don't have any in local state
    if (enrolledCourses.length === 0) {
      dispatch(fetchEnrolledCourses());
    }
  }, [dispatch, courses.length, enrolledCourses.length]);

  // Filter courses to show only enrolled ones
  const myEnrolledCourses = courses.filter((course: Course) => 
    enrolledCourses.includes(course.id)
  );

  if (coursesLoading) {
    return (
      <Layout title="My Courses" description="View your enrolled courses">
        <Loading isLoading={true} loadingText="Loading your courses..." />
      </Layout>
    );
  }

  if (coursesError) {
    return (
      <Layout title="My Courses" description="View your enrolled courses">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Courses</h2>
          <p className="text-gray-600 mb-4">{coursesError}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="My Courses" description="View and manage your enrolled courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-gray-600">
            {myEnrolledCourses.length > 0 
              ? `You are enrolled in ${myEnrolledCourses.length} course${myEnrolledCourses.length === 1 ? '' : 's'}`
              : 'You are not enrolled in any courses yet'
            }
          </p>
        </div>

        {/* Enrolled Courses */}
        {myEnrolledCourses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Enrolled Courses</h2>
            <p className="text-gray-600 mb-6">
              You haven&apos;t enrolled in any courses yet. Browse our course catalog to get started!
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEnrolledCourses.map((course) => (
              <div key={course.id} className="relative">
                <CourseCard
                  course={course}
                  isEnrolled={true}
                />
                {/* Enrolled Badge */}
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Enrolled
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Course Statistics */}
        {myEnrolledCourses.length > 0 && (
          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Learning Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{myEnrolledCourses.length}</div>
                <div className="text-sm text-gray-600">Enrolled Courses</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {myEnrolledCourses.filter(course => course.level === 'Beginner').length}
                </div>
                <div className="text-sm text-gray-600">Beginner Level</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {myEnrolledCourses.filter(course => course.level === 'Advanced').length}
                </div>
                <div className="text-sm text-gray-600">Advanced Level</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyCoursesPage;
