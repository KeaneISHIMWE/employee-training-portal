import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CourseCardProps } from '@/types';
import Button from './Button';

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isEnrolled = false,
  onEnroll,
  onUnenroll,
  className = '',
}) => {
  const handleEnrollClick = () => {
    if (isEnrolled && onUnenroll) {
      onUnenroll(course.id);
    } else if (!isEnrolled && onEnroll) {
      onEnroll(course.id);
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

  return (
    <article className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${className}`}>
      <Link href={`/courses/${course.id}`} aria-label={`View details for ${course.title}`}>
        <div className="cursor-pointer">
          {/* Course Image */}
          <div className="h-48 relative overflow-hidden">
            <Image
              src={course.imageUrl}
              alt={`${course.title} course thumbnail`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Course Content */}
          <div className="p-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                {course.title}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`} aria-label={`Course level: ${course.level}`}>
                {course.level}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {course.shortDescription}
            </p>

            {/* Course Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {course.instructor}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {course.category}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {course.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {course.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{course.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Enrollment Button */}
      <div className="px-4 pb-4">
        <Button
          onClick={handleEnrollClick}
          variant={isEnrolled ? 'outline' : 'primary'}
          className="w-full"
          aria-label={isEnrolled ? `Unenroll from ${course.title}` : `Enroll in ${course.title}`}
        >
          {isEnrolled ? 'Unenroll' : 'Enroll'}
        </Button>
        {isEnrolled && (
          <div className="mt-2 flex items-center justify-center text-sm text-green-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Enrolled
          </div>
        )}
      </div>
    </article>
  );
};

export default CourseCard;
