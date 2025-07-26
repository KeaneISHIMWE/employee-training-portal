import { Course } from '@/types';
import { DataService, sampleCourses } from './sampleData';

// MongoDB document interface
interface MongoDbCourse {
  _id?: { toString(): string };
  id?: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  instructor: string;
  prerequisites?: string[];
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl?: string;
  tags?: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Database service that handles both MongoDB and fallback JSON data
export class DatabaseService {
  private static useMongoDb = false;

  static async initializeDatabase(): Promise<void> {
    // Check if MongoDB is available
    if (process.env.MONGODB_URI) {
      try {
        const { getDatabase } = await import('./mongodb');
        const db = await getDatabase();
        
        // Check if courses collection exists and has data
        const coursesCollection = db.collection('courses');
        const courseCount = await coursesCollection.countDocuments();
        
        if (courseCount === 0) {
          // Insert sample data if collection is empty
          await coursesCollection.insertMany(sampleCourses);
          console.log('Sample courses inserted into MongoDB');
        }
        
        this.useMongoDb = true;
        console.log('Using MongoDB for data storage');
      } catch (error) {
        console.warn('MongoDB not available, falling back to JSON data:', error);
        this.useMongoDb = false;
      }
    } else {
      console.log('MongoDB URI not provided, using JSON data');
      this.useMongoDb = false;
    }
  }

  static async getAllCourses(): Promise<Course[]> {
    if (this.useMongoDb) {
      try {
        const { getDatabase } = await import('./mongodb');
        const db = await getDatabase();
        const courses = await db.collection('courses').find({}).toArray() as unknown as MongoDbCourse[];
        return courses.map((course) => ({
          id: course._id?.toString() || course.id || '',
          title: course.title,
          shortDescription: course.shortDescription,
          fullDescription: course.fullDescription,
          duration: course.duration,
          instructor: course.instructor,
          prerequisites: course.prerequisites || [],
          category: course.category,
          level: course.level,
          imageUrl: course.imageUrl || '',
          tags: course.tags || [],
          createdAt: new Date(course.createdAt),
          updatedAt: new Date(course.updatedAt)
        }));
      } catch (error) {
        console.error('Error fetching from MongoDB, falling back to JSON:', error);
        return DataService.getAllCourses();
      }
    }
    return DataService.getAllCourses();
  }

  static async getCourseById(id: string): Promise<Course | null> {
    if (this.useMongoDb) {
      try {
        const { getDatabase } = await import('./mongodb');
        const { ObjectId } = await import('mongodb');
        const db = await getDatabase();
        
        let course: MongoDbCourse | null;
        if (ObjectId.isValid(id)) {
          course = await db.collection('courses').findOne({ _id: new ObjectId(id) }) as unknown as MongoDbCourse | null;
        } else {
          course = await db.collection('courses').findOne({ id: id }) as unknown as MongoDbCourse | null;
        }
        
        if (course) {
          return {
            id: course._id?.toString() || course.id || '',
            title: course.title,
            shortDescription: course.shortDescription,
            fullDescription: course.fullDescription,
            duration: course.duration,
            instructor: course.instructor,
            prerequisites: course.prerequisites || [],
            category: course.category,
            level: course.level,
            imageUrl: course.imageUrl || '',
            tags: course.tags || [],
            createdAt: new Date(course.createdAt),
            updatedAt: new Date(course.updatedAt)
          };
        }
        return null;
      } catch (error) {
        console.error('Error fetching course from MongoDB, falling back to JSON:', error);
        return DataService.getCourseById(id);
      }
    }
    return DataService.getCourseById(id);
  }

  static async searchCourses(query: string): Promise<Course[]> {
    if (this.useMongoDb) {
      try {
        const { getDatabase } = await import('./mongodb');
        const db = await getDatabase();
        
        if (!query.trim()) {
          return this.getAllCourses();
        }

        const searchRegex = new RegExp(query, 'i');
        const courses = await db.collection('courses').find({
          $or: [
            { title: searchRegex },
            { shortDescription: searchRegex },
            { fullDescription: searchRegex },
            { category: searchRegex },
            { instructor: searchRegex },
            { tags: { $in: [searchRegex] } }
          ]
        }).toArray() as unknown as MongoDbCourse[];

        return courses.map((course) => ({
          id: course._id?.toString() || course.id || '',
          title: course.title,
          shortDescription: course.shortDescription,
          fullDescription: course.fullDescription,
          duration: course.duration,
          instructor: course.instructor,
          prerequisites: course.prerequisites || [],
          category: course.category,
          level: course.level,
          imageUrl: course.imageUrl || '',
          tags: course.tags || [],
          createdAt: new Date(course.createdAt),
          updatedAt: new Date(course.updatedAt)
        }));
      } catch (error) {
        console.error('Error searching MongoDB, falling back to JSON:', error);
        return DataService.searchCourses(query);
      }
    }
    return DataService.searchCourses(query);
  }

  static async getCoursesByCategory(category: string): Promise<Course[]> {
    if (this.useMongoDb) {
      try {
        const { getDatabase } = await import('./mongodb');
        const db = await getDatabase();
        const courses = await db.collection('courses').find({
          category: new RegExp(`^${category}$`, 'i')
        }).toArray() as unknown as MongoDbCourse[];

        return courses.map((course) => ({
          id: course._id?.toString() || course.id || '',
          title: course.title,
          shortDescription: course.shortDescription,
          fullDescription: course.fullDescription,
          duration: course.duration,
          instructor: course.instructor,
          prerequisites: course.prerequisites || [],
          category: course.category,
          level: course.level,
          imageUrl: course.imageUrl || '',
          tags: course.tags || [],
          createdAt: new Date(course.createdAt),
          updatedAt: new Date(course.updatedAt)
        }));
      } catch (error) {
        console.error('Error fetching by category from MongoDB, falling back to JSON:', error);
        return DataService.getCoursesByCategory(category);
      }
    }
    return DataService.getCoursesByCategory(category);
  }
}

// Initialize database on module load
DatabaseService.initializeDatabase().catch(console.error);
