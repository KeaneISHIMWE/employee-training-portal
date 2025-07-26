'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCourseById } from '@/store/slices/coursesSlice';
import { addEnrolledCourse, removeEnrolledCourse } from '@/store/slices/enrollmentSlice';
import { showSuccessNotification, showErrorNotification } from '@/store/slices/uiSlice';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import { Course } from '@/types';

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const courseId = Array.isArray(params.id) ? params.id[0] : params.id as string;

  const { courses, loading: coursesLoading, error: coursesError } = useAppSelector((state) => state.courses);
  const { enrolledCourses, loading: enrollmentLoading } = useAppSelector((state) => state.enrollment);

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    // First check if course is already in the store
    const existingCourse = courses.find(c => c.id === courseId);
    if (existingCourse) {
      setCourse(existingCourse);
    } else {
      // Fetch course details if not in store
      dispatch(fetchCourseById(courseId));
    }
  }, [courseId, courses, dispatch]);

  useEffect(() => {
    // Update course when it's loaded into the store
    const updatedCourse = courses.find(c => c.id === courseId);
    if (updatedCourse) {
      setCourse(updatedCourse);
    }
  }, [courses, courseId]);

  const isEnrolled = enrolledCourses.includes(courseId);

  const handleEnroll = async () => {
    try {
      dispatch(addEnrolledCourse(courseId));
      dispatch(showSuccessNotification({
        title: 'Enrollment Successful',
        message: `You have been enrolled in "${course?.title}" successfully!`,
      }));
    } catch {
      dispatch(showErrorNotification({
        title: 'Enrollment Failed',
        message: 'Failed to enroll in the course. Please try again.',
      }));
    }
  };

  const handleUnenroll = async () => {
    try {
      dispatch(removeEnrolledCourse(courseId));
      dispatch(showSuccessNotification({
        title: 'Unenrollment Successful',
        message: `You have been unenrolled from "${course?.title}".`,
      }));
    } catch {
      dispatch(showErrorNotification({
        title: 'Unenrollment Failed',
        message: 'Failed to unenroll from the course. Please try again.',
      }));
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (coursesLoading || !course) {
    return (
      <Layout>
        <Loading isLoading={true} loadingText="Loading course details..." />
      </Layout>
    );
  }

  if (coursesError) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Course</h2>
          <p className="text-gray-600 mb-4">{coursesError}</p>
          <div className="space-x-4">
            <Button onClick={() => dispatch(fetchCourseById(courseId))}>
              Try Again
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={course.title} description={course.shortDescription}>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </Button>
        </div>

        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Course Image */}
          <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-white text-8xl">📚</div>
          </div>

          <div className="p-8">
            {/* Title and Level */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 md:mb-0">
                {course.title}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)} w-fit`}>
                {course.level}
              </span>
            </div>

            {/* Course Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Duration:</span>
                <span className="ml-1">{course.duration}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium">Instructor:</span>
                <span className="ml-1">{course.instructor}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="font-medium">Category:</span>
                <span className="ml-1">{course.category}</span>
              </div>
            </div>

            {/* Enrollment Status and Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              {isEnrolled && (
                <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">You are enrolled in this course</span>
                </div>
              )}
              
              <Button
                onClick={isEnrolled ? handleUnenroll : handleEnroll}
                variant={isEnrolled ? 'outline' : 'primary'}
                loading={enrollmentLoading}
                className="w-full sm:w-auto"
              >
                {isEnrolled ? 'Unenroll from Course' : 'Enroll in Course'}
              </Button>
            </div>

            {/* Short Description */}
            <p className="text-lg text-gray-700 leading-relaxed">
              {course.shortDescription}
            </p>
          </div>
        </div>

        {/* Course Details Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Full Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {course.fullDescription}
                </p>
              </div>
            </div>

            {/* Prerequisites */}
            {course.prerequisites.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Prerequisites</h2>
                <ul className="space-y-2">
                  {course.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{prerequisite}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Course Information</h3>
              <div className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Level</dt>
                  <dd className="mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="mt-1 text-sm text-gray-900">{course.duration}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1 text-sm text-gray-900">{course.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Instructor</dt>
                  <dd className="mt-1 text-sm text-gray-900">{course.instructor}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(course.updatedAt).toLocaleDateString()}
                  </dd>
                </div>
              </div>
            </div>

            {/* Enrollment Action Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Enrollment</h3>
              {isEnrolled ? (
                <div className="space-y-4">
                  <div className="flex items-center text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">Enrolled</span>
                  </div>
                  <Button
                    onClick={handleUnenroll}
                    variant="outline"
                    loading={enrollmentLoading}
                    className="w-full"
                  >
                    Unenroll
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Ready to start learning? Enroll now to access this course.
                  </p>
                  <Button
                    onClick={handleEnroll}
                    loading={enrollmentLoading}
                    className="w-full"
                  >
                    Enroll Now
                  </Button>
                </div>
              )}
            </div>

            {/* Share Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Share Course</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    dispatch(showSuccessNotification({
                      title: 'Link Copied',
                      message: 'Course link copied to clipboard!',
                    }));
                  }}
                  className="flex-1"
                >
                  📋 Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
