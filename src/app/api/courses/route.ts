import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { CoursesApiResponse } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || '';
    const level = searchParams.get('level') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');

    let courses;

    if (query) {
      courses = await DatabaseService.searchCourses(query);
    } else if (category) {
      courses = await DatabaseService.getCoursesByCategory(category);
    } else {
      courses = await DatabaseService.getAllCourses();
    }

    // Filter by level if specified
    if (level) {
      courses = courses.filter(course => 
        course.level.toLowerCase() === level.toLowerCase()
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCourses = courses.slice(startIndex, endIndex);

    const response: CoursesApiResponse = {
      success: true,
      data: paginatedCourses,
      total: courses.length,
      page,
      limit,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching courses:', error);
    const response: CoursesApiResponse = {
      success: false,
      error: 'Failed to fetch courses',
      total: 0,
      page: 1,
      limit: 100,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
