import { NextRequest, NextResponse } from 'next/server';
import { EnrollmentApiResponse, ApiResponse } from '@/types';

// In-memory storage for demo purposes
// In a real application, this would be stored in a database
let enrolledCourses: string[] = [];

export async function GET(request: NextRequest) {
  try {
    const response: ApiResponse<string[]> = {
      success: true,
      data: enrolledCourses,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    const response: ApiResponse<string[]> = {
      success: false,
      error: 'Failed to fetch enrolled courses',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      const response: EnrollmentApiResponse = {
        success: false,
        error: 'Course ID is required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if already enrolled
    if (enrolledCourses.includes(courseId)) {
      const response: EnrollmentApiResponse = {
        success: false,
        error: 'Already enrolled in this course',
      };
      return NextResponse.json(response, { status: 409 });
    }

    // Add to enrolled courses
    enrolledCourses.push(courseId);

    // Create enrollment object for response
    const enrollment = {
      id: Date.now().toString(),
      userId: 'demo-user', // In a real app, this would come from authentication
      courseId,
      enrolledAt: new Date(),
      status: 'enrolled' as const,
      progress: 0,
    };

    const response: EnrollmentApiResponse = {
      success: true,
      data: enrollment,
      message: 'Successfully enrolled in course',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error enrolling in course:', error);
    const response: EnrollmentApiResponse = {
      success: false,
      error: 'Failed to enroll in course',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
      const response: ApiResponse<string> = {
        success: false,
        error: 'Course ID is required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Check if enrolled
    if (!enrolledCourses.includes(courseId)) {
      const response: ApiResponse<string> = {
        success: false,
        error: 'Not enrolled in this course',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Remove from enrolled courses
    enrolledCourses = enrolledCourses.filter(id => id !== courseId);

    const response: ApiResponse<string> = {
      success: true,
      data: courseId,
      message: 'Successfully unenrolled from course',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error unenrolling from course:', error);
    const response: ApiResponse<string> = {
      success: false,
      error: 'Failed to unenroll from course',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
