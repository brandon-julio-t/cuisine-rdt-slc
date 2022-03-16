import { CourseMapping } from '../models/CourseMapping';
import courseMappingJson from '../../data/course_mapping.json';

export default class CourseMappingService {
  private static courseMapping: CourseMapping = courseMappingJson;

  public static async get(): Promise<CourseMapping> {
    return this.courseMapping;
  }
}
