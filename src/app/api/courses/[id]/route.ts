import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { CourseApiResponse } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = params.id;
    const course = await DatabaseService.getCourseById(courseId);

    if (!course) {
      const response: CourseApiResponse = {
        success: false,
        error: 'Course not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: CourseApiResponse = {
      success: true,
      data: course,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching course:', error);
    const response: CourseApiResponse = {
      success: false,
      error: 'Failed to fetch course',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
