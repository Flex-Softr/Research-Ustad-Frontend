// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
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
  courseFeatures?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  learningOutcomes?: string[];
  assessmentInfo?: string;
  instructors: Array<{
    name: string;
    imageUrl: string;
    specialization: string;
    experience: string;
    rating: number;
    students: number;
    bio?: string;
  }>;
  tags: string[];
  modules?: Array<{
    title: string;
    description: string;
    lessons: Array<{
      title: string;
      duration: string;
      type: string;
      free: boolean;
    }>;
  }>;
  whatYouWillLearn?: string[];
  requirements?: string[];
  reviews?: Array<{
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

export interface CourseFormData {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  duration: string;
  level: string;
  category: string;
  fee: number;
  originalFee: number;
  capacity: number;
  language: string;
  certificate: boolean;
  lifetimeAccess: boolean;
  imageUrl: string;
  curriculum?: string;
  courseFeatures?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  learningOutcomes?: string[];
  assessmentInfo?: string;
  instructors: Array<{
    name: string;
    imageUrl: string;
    specialization: string;
    experience: string;
    rating: number;
    students: number;
    bio?: string;
  }>;
  tags: string[];
  modules?: Array<{
    title: string;
    description: string;
    lessons: Array<{
      title: string;
      duration: string;
      type: string;
      free: boolean;
    }>;
  }>;
  whatYouWillLearn?: string[];
  requirements?: string[];
}

export interface ValidationError {
  field: string;
  message: string;
} 