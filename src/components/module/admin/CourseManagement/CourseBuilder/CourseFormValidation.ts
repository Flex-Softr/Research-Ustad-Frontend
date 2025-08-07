// URL validation helper function
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export interface CourseFormData {
  title: string;
  description: string;
  curriculum: string;
  location: string;
  offlineLocation?: string;
  duration: string;
  level: string;
  category: string;
  fee: string;
  isFree: boolean;
  startDate: string;
  enrolled: string;
  capacity: string;
  rating: string;
  totalReviews: string;
  language: string;
  certificate: boolean;
  lifetimeAccess: boolean;
  enrollLink: string;
  thumbnail: File | null;
  instructors: Array<{
    name: string;
    imageFile: File | null;
    imageUrl?: string;
    specialization: string;
    experience: string;
    rating: number;
    students: number;
  }>;
  tags: string[];
  whatYouWillLearn: string[];
  requirements: string[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export const validateCourseForm = (data: CourseFormData, isEditMode = false): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Required fields
  if (!data.title.trim()) {
    errors.push({ field: "title", message: "Course title is required" });
  } else if (data.title.length < 5) {
    errors.push({
      field: "title",
      message: "Course title must be at least 5 characters",
    });
  }

  if (!data.description.trim()) {
    errors.push({
      field: "description",
      message: "Course description is required",
    });
  } else if (data.description.length < 20) {
    errors.push({
      field: "description",
      message: "Course description must be at least 20 characters",
    });
  }

  // Curriculum validation
  if (!data.curriculum.trim()) {
    errors.push({
      field: "curriculum",
      message: "Course curriculum is required",
    });
  } else if (data.curriculum.length < 50) {
    errors.push({
      field: "curriculum",
      message: "Course curriculum must be at least 50 characters",
    });
  }

  if (!data.category.trim()) {
    errors.push({ field: "category", message: "Course category is required" });
  }

  // Fee validation based on isFree
  if (!data.isFree) {
    if (!data.fee.trim()) {
      errors.push({ field: "fee", message: "Course price is required for paid courses" });
    } else if (isNaN(Number(data.fee)) || Number(data.fee) < 0) {
      errors.push({
        field: "fee",
        message: "Course price must be a valid positive number",
      });
    }
  }

  // Location validation
  if (!data.location.trim()) {
    errors.push({ field: "location", message: "Location is required" });
  } else if (!["Online", "Offline"].includes(data.location)) {
    errors.push({ field: "location", message: "Location must be Online or Offline" });
  }

  // Offline location validation
  if (data.location === "Offline" && (!data.offlineLocation || !data.offlineLocation.trim())) {
    errors.push({ field: "offlineLocation", message: "Offline location is required when location is Offline" });
  }

  // Start date validation
  if (!data.startDate.trim()) {
    errors.push({ field: "startDate", message: "Start date is required" });
  } else {
    const selectedDate = new Date(data.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.push({
        field: "startDate",
        message: "Start date cannot be in the past",
      });
    }
  }

  // Only require thumbnail for new courses, not for editing
  if (!isEditMode && !data.thumbnail) {
    errors.push({
      field: "thumbnail",
      message: "Course thumbnail is required",
    });
  }

  // Duration validation
  if (data.duration.trim() && data.duration.length < 3) {
    errors.push({
      field: "duration",
      message: "Duration must be at least 3 characters",
    });
  }

  // Rating validation
  if (data.rating.trim()) {
    const rating = Number(data.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      errors.push({
        field: "rating",
        message: "Rating must be between 0 and 5",
      });
    }
  }

  // Capacity validation
  if (data.capacity.trim()) {
    const capacity = Number(data.capacity);
    if (isNaN(capacity) || capacity < 0) {
      errors.push({
        field: "capacity",
        message: "Capacity must be a valid positive number",
      });
    }
  }

  // Capacity vs Enrolled validation
  if (data.capacity.trim() && data.enrolled.trim()) {
    const capacity = Number(data.capacity);
    const enrolled = Number(data.enrolled);
    if (capacity < enrolled) {
      errors.push({
        field: "capacity",
        message: "Capacity cannot be less than enrolled students",
      });
    }
  }

  // Enrolled validation
  if (data.enrolled.trim()) {
    const enrolled = Number(data.enrolled);
    if (isNaN(enrolled) || enrolled < 0) {
      errors.push({
        field: "enrolled",
        message: "Enrolled students must be a valid positive number",
      });
    }
  }

  // Tags validation
  if (data.tags.length === 0) {
    errors.push({ field: "tags", message: "At least one tag is required" });
  }

  // Learning objectives validation
  if (data.whatYouWillLearn.length === 0) {
    errors.push({
      field: "whatYouWillLearn",
      message: "At least one learning objective is required",
    });
  } else {
    data.whatYouWillLearn.forEach((objective, index) => {
      if (!objective.trim()) {
        errors.push({
          field: `whatYouWillLearn_${index}`,
          message: "Learning objective cannot be empty",
        });
      }
    });
  }

  // Requirements validation
  if (data.requirements.length === 0) {
    errors.push({
      field: "requirements",
      message: "At least one requirement is required",
    });
  } else {
    data.requirements.forEach((requirement, index) => {
      if (!requirement.trim()) {
        errors.push({
          field: `requirements_${index}`,
          message: "Requirement cannot be empty",
        });
      }
    });
  }

  // Enroll link validation
  if (!data.enrollLink.trim()) {
    errors.push({
      field: "enrollLink",
      message: "Enroll link is required",
    });
  } else if (!isValidUrl(data.enrollLink)) {
    errors.push({
      field: "enrollLink",
      message: "Please enter a valid URL for the enroll link",
    });
  }

  // Instructors validation
  if (data.instructors.length === 0) {
    errors.push({
      field: "instructors",
      message: "At least one instructor is required",
    });
  } else {
    data.instructors.forEach((instructor, index) => {
      if (!instructor.name.trim()) {
        errors.push({
          field: `instructor_${index}_name`,
          message: "Instructor name is required",
        });
      }
      // Only require instructor image for new courses, not for editing
      if (!isEditMode && !instructor.imageFile) {
        errors.push({
          field: `instructor_${index}_image`,
          message: "Instructor profile image is required",
        });
      }
      if (!instructor.specialization.trim()) {
        errors.push({
          field: `instructor_${index}_specialization`,
          message: "Instructor specialization is required",
        });
      }
      if (instructor.rating < 0 || instructor.rating > 5) {
        errors.push({
          field: `instructor_${index}_rating`,
          message: "Instructor rating must be between 0 and 5",
        });
      }
      if (instructor.students < 0) {
        errors.push({
          field: `instructor_${index}_students`,
          message: "Students taught must be a positive number",
        });
      }
    });
  }

  return errors;
};

export const getFieldError = (
  errors: ValidationError[],
  field: string
): string | null => {
  const error = errors.find((err) => err.field === field);
  return error ? error.message : null;
};

export const isFormValid = (data: CourseFormData, isEditMode = false): boolean => {
  return validateCourseForm(data, isEditMode).length === 0;
};
