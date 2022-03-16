export class CourseMapping {
  constructor(
    public courseCode: string = '',
    public courseName: string = '',
    public weeks: CourseMappingWeek[] = [],
  ) {}
}

export class CourseMappingWeek {
  constructor(
    public number: number = -1,
    public title: string = '',
    public foods: { id: string }[] = [],
  ) {}
}
