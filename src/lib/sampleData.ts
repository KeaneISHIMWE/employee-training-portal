import { Course } from '@/types';

export const sampleCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Data Analytics',
    shortDescription: 'Learn the fundamentals of data analysis and visualization techniques.',
    fullDescription: 'This comprehensive course covers the essential concepts of data analytics, including data collection, cleaning, analysis, and visualization. You will learn to use popular tools and techniques to extract meaningful insights from data. The course includes hands-on projects with real-world datasets and covers statistical analysis, data mining, and business intelligence concepts.',
    duration: '6 weeks',
    instructor: 'Dr. Sarah Johnson',
    prerequisites: ['Basic mathematics', 'Computer literacy'],
    category: 'Data Science',
    level: 'Beginner',
    imageUrl: '/images/data-analytics.jpg',
    tags: ['analytics', 'data', 'visualization', 'statistics'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Advanced JavaScript Development',
    shortDescription: 'Master modern JavaScript concepts and advanced programming techniques.',
    fullDescription: 'Dive deep into advanced JavaScript concepts including ES6+ features, asynchronous programming, closures, prototypes, and design patterns. This course covers modern development practices, testing methodologies, and performance optimization. You will build complex applications and learn to write clean, maintainable code following industry best practices.',
    duration: '8 weeks',
    instructor: 'Michael Chen',
    prerequisites: ['Basic JavaScript knowledge', 'HTML/CSS fundamentals'],
    category: 'Programming',
    level: 'Advanced',
    imageUrl: '/images/javascript.jpg',
    tags: ['javascript', 'programming', 'web development', 'es6'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    title: 'Digital Marketing Fundamentals',
    shortDescription: 'Comprehensive guide to digital marketing strategies and tools.',
    fullDescription: 'Learn the core principles of digital marketing including SEO, social media marketing, content marketing, email campaigns, and paid advertising. This course provides practical knowledge on how to create effective marketing campaigns, measure ROI, and use analytics tools to optimize performance. Includes case studies from successful marketing campaigns.',
    duration: '4 weeks',
    instructor: 'Emma Rodriguez',
    prerequisites: ['Basic computer skills'],
    category: 'Marketing',
    level: 'Beginner',
    imageUrl: '/images/digital-marketing.jpg',
    tags: ['marketing', 'seo', 'social media', 'advertising'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '4',
    title: 'Project Management Professional',
    shortDescription: 'Learn professional project management methodologies and best practices.',
    fullDescription: 'This course covers comprehensive project management principles including project planning, execution, monitoring, and closure. You will learn popular methodologies like Agile, Scrum, and Waterfall. The course includes risk management, stakeholder communication, budget management, and quality assurance. Prepare for PMP certification with practical exercises and real-world scenarios.',
    duration: '10 weeks',
    instructor: 'Robert Kim',
    prerequisites: ['Work experience in project environments'],
    category: 'Management',
    level: 'Intermediate',
    imageUrl: '/images/project-management.jpg',
    tags: ['project management', 'agile', 'scrum', 'leadership'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '5',
    title: 'Cybersecurity Essentials',
    shortDescription: 'Essential cybersecurity concepts and practices for modern organizations.',
    fullDescription: 'Understand the fundamentals of cybersecurity including threat assessment, risk management, network security, and incident response. This course covers common attack vectors, security frameworks, compliance requirements, and best practices for protecting organizational assets. Learn to implement security measures and develop security policies.',
    duration: '7 weeks',
    instructor: 'Dr. Lisa Wang',
    prerequisites: ['Basic networking knowledge', 'IT fundamentals'],
    category: 'Security',
    level: 'Intermediate',
    imageUrl: '/images/cybersecurity.jpg',
    tags: ['security', 'cybersecurity', 'networking', 'compliance'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '6',
    title: 'Cloud Computing with AWS',
    shortDescription: 'Master Amazon Web Services and cloud computing fundamentals.',
    fullDescription: 'Comprehensive introduction to cloud computing using Amazon Web Services. Learn about EC2, S3, RDS, Lambda, and other core AWS services. The course covers cloud architecture, security, cost optimization, and deployment strategies. Includes hands-on labs and prepares you for AWS certification exams.',
    duration: '9 weeks',
    instructor: 'David Thompson',
    prerequisites: ['Basic IT knowledge', 'Linux fundamentals'],
    category: 'Cloud Computing',
    level: 'Intermediate',
    imageUrl: '/images/aws-cloud.jpg',
    tags: ['aws', 'cloud', 'infrastructure', 'devops'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  }
];

// Fallback data service for when MongoDB is not available
export class DataService {
  private static courses: Course[] = [...sampleCourses];

  static async getAllCourses(): Promise<Course[]> {
    return this.courses;
  }

  static async getCourseById(id: string): Promise<Course | null> {
    return this.courses.find(course => course.id === id) || null;
  }

  static async searchCourses(query: string): Promise<Course[]> {
    if (!query.trim()) {
      return this.courses;
    }

    const searchTerm = query.toLowerCase();
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.shortDescription.toLowerCase().includes(searchTerm) ||
      course.fullDescription.toLowerCase().includes(searchTerm) ||
      course.category.toLowerCase().includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  static async getCoursesByCategory(category: string): Promise<Course[]> {
    return this.courses.filter(course => 
      course.category.toLowerCase() === category.toLowerCase()
    );
  }
}
