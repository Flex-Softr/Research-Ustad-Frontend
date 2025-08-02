// Course Types
export interface Course {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  duration: string;
  level: string;
  category: string;
  fee: number;
  enrolled: number;
  capacity: number;
  rating: number;
  totalReviews: number;
  language: string;
  certificate: boolean;
  lifetimeAccess: boolean;
  imageUrl: string;
  status?: "upcoming" | "ongoing" | "completed";
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




export interface AllCoursesTableProps {
  onEditCourse: (course: Course) => void;
  onViewCourse: (course: Course) => void;
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


export interface BasicInformationSectionProps {
  formData: {
    title: string;
    description: string;
    category: string;
    level: string;
    duration: string;
    language: string;
  };
  onChange: (field: string, value: any) => void;
  errors: Array<{ field: string; message: string }>;
}

export interface CourseFeaturesSectionProps {
  formData: {
    certificate: boolean;
    lifetimeAccess: boolean;
  };
  onChange: (field: string, value: any) => void;
}

export interface CourseThumbnailUploadProps {
  onChange: (file: File | null) => void;
  value?: File | null;
  existingImageUrl?: string;
  isEditMode?: boolean;
}

export interface FormProgressIndicatorProps {
  formData: {
    title: string;
    description: string;
    category: string;
    fee: string;
    thumbnail: File | null;
    tags: string[];
    whatYouWillLearn: string[];
    requirements: string[];
    instructors: any[];
  };
  isEditMode?: boolean;
  existingImageUrl?: string;
}

export interface FormSidebarProps {
  formData: {
    title: string;
    description: string;
    category: string;
    fee: string;
    thumbnail: File | null;
    tags: string[];
    whatYouWillLearn: string[];
    requirements: string[];
    instructors: any[];
  };
  onThumbnailChange: (file: File | null) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isEditMode?: boolean;
  existingImageUrl?: string;
  categories?: Array<{ _id: string; name: string; status: string }>;
}

export interface InstructorImageUploadProps {
  onChange: (file: File | null) => void;
  value?: File | null;
  label?: string;
  existingImageUrl?: string;
  isEditMode?: boolean;
}

export interface Instructor {
  name: string;
  imageFile: File | null;
  imageUrl?: string;
  specialization: string;
  experience: string;
  rating: number;
  students: number;
}

export interface InstructorsSectionProps {
  instructors: Instructor[];
  onAddInstructor: () => void;
  onRemoveInstructor: (index: number) => void;
  onUpdateInstructor: (index: number, field: string, value: any) => void;
  errors: Array<{ field: string; message: string }>;
  isEditMode?: boolean;
}


export interface LearningObjectivesSectionProps {
  objectives: string[];
  onAddObjective: () => void;
  onRemoveObjective: (index: number) => void;
  onUpdateObjective: (index: number, value: string) => void;
  errors: Array<{ field: string; message: string }>;
}

export interface PricingSectionProps {
  formData: {
    fee: string;
    startDate: string;
    enrolled: string;
    capacity: string;
    rating: string;
    totalReviews: string;
  };
  onChange: (field: string, value: any) => void;
  errors: Array<{ field: string; message: string }>;
}

export interface RequirementsSectionProps {
  requirements: string[];
  onAddRequirement: () => void;
  onRemoveRequirement: (index: number) => void;
  onUpdateRequirement: (index: number, value: string) => void;
  errors: Array<{ field: string; message: string }>;
}

export interface TagsSectionProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (index: number) => void;
  onUpdateTag: (index: number, value: string) => void;
  errors: Array<{ field: string; message: string }>;
}