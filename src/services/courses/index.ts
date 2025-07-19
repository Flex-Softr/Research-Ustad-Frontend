// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  duration: string;
  level: string;
  category: string;
  fee: number;
  originalFee: number;
  enrolled: number;
  capacity: number;
  rating: number;
  totalReviews: number;
  language: string;
  certificate: boolean;
  lifetimeAccess: boolean;
  imageUrl: string;
  curriculum?: string; // HTML content from text editor
  courseFeatures: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  learningOutcomes: string[];
  assessmentInfo: string;
  instructor: {
    name: string;
    imageUrl: string;
    specialization: string;
    experience: string;
    rating: number;
    students: number;
    bio: string;
  };
  tags: string[];
  modules: Array<{
    title: string;
    description: string;
    lessons: Array<{
      title: string;
      duration: string;
      type: string;
      free: boolean;
    }>;
  }>;
  whatYouWillLearn: string[];
  requirements: string[];
  reviews: Array<{
    id: number;
    user: string;
    rating: number;
    date: string;
    comment: string;
  }>;
}

export interface CoursesFilter {
  page: number;
  limit: number;
  status?: "all" | "upcoming" | "ongoing" | "completed";
  category?: string;
}

export interface PaginatedCoursesResponse {
  courses: Course[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

// Load courses data from JSON file
let coursesData: Course[] = [];

const loadCoursesData = async (): Promise<Course[]> => {
  if (coursesData.length === 0) {
    try {
      const response = await fetch("/data/courses.json");
      const data = await response.json();
      coursesData = data.courses;
    } catch (error) {
      console.error("Error loading courses data:", error);
      coursesData = [];
    }
  }
  return coursesData;
};

export const getPaginatedCourses = async (
  filter: CoursesFilter
): Promise<PaginatedCoursesResponse> => {
  const allCourses = await loadCoursesData();

  let filteredCourses = [...allCourses];

  // Apply status filter
  if (filter.status && filter.status !== "all") {
    const now = new Date();
    filteredCourses = filteredCourses.filter((course) => {
      const startDate = new Date(course.startDate);
      const endDate = new Date(course.endDate);

      if (filter.status === "upcoming") {
        return startDate > now;
      } else if (filter.status === "ongoing") {
        return startDate <= now && endDate > now;
      } else if (filter.status === "completed") {
        return endDate <= now;
      }
      return true;
    });
  }

  // Apply category filter
  if (filter.category) {
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.category.toLowerCase() === filter.category!.toLowerCase()
    );
  }

  // Calculate pagination
  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / filter.limit);
  const startIndex = (filter.page - 1) * filter.limit;
  const endIndex = startIndex + filter.limit;
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

  return {
    courses: paginatedCourses,
    currentPage: filter.page,
    totalPages,
    totalItems,
  };
};

export const getCourseById = async (id: string): Promise<Course | null> => {
  const allCourses = await loadCoursesData();
  return allCourses.find((course) => course.id === id) || null;
};

export const getCourseCategories = async (): Promise<string[]> => {
  const allCourses = await loadCoursesData();
  const categories = [...new Set(allCourses.map((course) => course.category))];
  return categories.sort();
};

export const getCourseLevels = async (): Promise<string[]> => {
  const allCourses = await loadCoursesData();
  const levels = [...new Set(allCourses.map((course) => course.level))];
  return levels.sort();
};
