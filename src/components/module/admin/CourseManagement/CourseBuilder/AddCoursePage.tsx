"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  addCourse,
  fetchSingleCourse,
  updateCourse,
} from "@/services/courses/coursesSlice";
import { fetchCategories } from "@/services/categories/categoriesSlice";
import {
  validateCourseForm,
  type CourseFormData,
  type ValidationError,
} from "./CourseFormValidation";
import { BasicInformationSection } from "./BasicInformationSection";
import { PricingSection } from "./PricingSection";
import { CourseFeaturesSection } from "./CourseFeaturesSection";
import { TagsSection } from "./TagsSection";
import { LearningObjectivesSection } from "./LearningObjectivesSection";
import { RequirementsSection } from "./RequirementsSection";
import { InstructorsSection } from "./InstructorsSection";
import { CurriculumSection } from "./CurriculumSection";
import { FormSidebar } from "./FormSidebar";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { toast } from "sonner";

export default function AddCoursePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("edit");
  const isEditMode = !!courseId;

  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useSelector((state: RootState) => state.categories);
  const { course, isLoading, error } = useSelector(
    (state: RootState) => state.courses
  );

  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    curriculum: "",
    location: "Online",
    offlineLocation: "",
    duration: "",
    level: "Beginner",
    category: "",
    fee: "",
    isFree: false,
    startDate: "",
    enrolled: "",
    capacity: "",
    rating: "",
    totalReviews: "",
    language: "English",
    certificate: true,
    lifetimeAccess: true,
    enrollLink: "",
    thumbnail: null,
    instructors: [],
    tags: [],
    whatYouWillLearn: [],
    requirements: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Load categories and course data on mount
  useEffect(() => {
    dispatch(fetchCategories());
    if (isEditMode && courseId) {
      dispatch(fetchSingleCourse(courseId));
    }
  }, [dispatch, isEditMode, courseId]);

  // Update form data when course is loaded (for edit mode)
  useEffect(() => {
    if (isEditMode && course) {
      setFormData({
        title: course.title || "",
        description: course.description || "",
        curriculum: course.curriculum || "",
        location: course.location || "Online",
        offlineLocation: course.offlineLocation || "",
        duration: course.duration || "",
        level: course.level || "Beginner",
        category: (() => {
          if (!course.category) return "";
          if (typeof course.category === "object" && course.category !== null) {
            return (course.category as any)._id || "";
          }
          return String(course.category || "");
        })(),
        fee: course.fee?.toString() || "",
        isFree: course.isFree ?? false,
        startDate: course.startDate
          ? new Date(course.startDate).toISOString().split("T")[0]
          : "",
        enrolled: course.enrolled?.toString() || "",
        capacity: course.capacity?.toString() || "",
        rating: course.rating?.toString() || "",
        totalReviews: course.totalReviews?.toString() || "",
        language: course.language || "English",
        certificate: course.certificate ?? true,
        lifetimeAccess: course.lifetimeAccess ?? true,
        enrollLink: (course as any).enrollLink || "",
        thumbnail: null, // We'll handle image separately
        instructors:
          course.instructors?.map((instructor) => ({
            name: instructor.name || "",
            imageFile: null, // We'll handle instructor images separately
            imageUrl: instructor.imageUrl || "", // Add existing image URL
            specialization: instructor.specialization || "",
            experience: instructor.experience || "",
            rating: instructor.rating || 0,
            students: instructor.students || 0,
          })) || [],
        tags: course.tags || [],
        whatYouWillLearn: course.whatYouWillLearn || [],
        requirements: course.requirements || [],
      });
    }
  }, [course, isEditMode]);

  // Update validation errors in real-time when formData changes
  useEffect(() => {
    const validationErrors = validateCourseForm(formData, isEditMode);
    setErrors(validationErrors);
  }, [formData, isEditMode]);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayChange = (
    field: string,
    index: number,
    value: any,
    key = ""
  ) => {
    const arr = [...(formData as any)[field]];
    if (key) {
      arr[index][key] = value;
    } else {
      arr[index] = value;
    }
    setFormData({ ...formData, [field]: arr });
  };

  const addField = (field: string, defaultValue: any) => {
    const arr = [...(formData as any)[field]];
    arr.push(defaultValue);
    setFormData({ ...formData, [field]: arr });
  };

  const removeField = (field: string, index: number) => {
    const arr = [...(formData as any)[field]];
    arr.splice(index, 1);
    setFormData({ ...formData, [field]: arr });
  };

  const handleThumbnailChange = (file: File | null) => {
    setFormData({ ...formData, thumbnail: file });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      curriculum: "",
      location: "Online",
      offlineLocation: "",
      duration: "",
      level: "Beginner",
      category: "",
      fee: "",
      isFree: false,
      startDate: "",
      enrolled: "",
      capacity: "",
      rating: "",
      totalReviews: "",
      language: "English",
      certificate: true,
      lifetimeAccess: true,
      enrollLink: "",
      thumbnail: null,
      instructors: [],
      tags: [],
      whatYouWillLearn: [],
      requirements: [],
    });
    setErrors([]);
  };

  const handleSubmit = async () => {
    setHasAttemptedSubmit(true);
    const validationErrors = validateCourseForm(formData, isEditMode);
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      toast.error("Please fill all the fields correctly before submitting.");
      return;
    }

    // Check if category is selected
    if (!formData.category) {
      toast.error("Please select a category for the course.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();

      // Convert form data to backend format
      const courseData = {
        title: formData.title,
        description: formData.description,
        curriculum: formData.curriculum,
        location: formData.location || "Online",
        offlineLocation: formData.offlineLocation,
        duration: formData.duration,
        level: formData.level,
        category: formData.category,
        fee: formData.isFree ? undefined : parseFloat(formData.fee) || 0,
        isFree: formData.isFree,
        enrolled: parseInt(formData.enrolled) || 0,
        capacity: parseInt(formData.capacity) || 100,
        rating: parseFloat(formData.rating) || 0,
        totalReviews: parseInt(formData.totalReviews) || 0,
        language: formData.language,
        certificate: formData.certificate,
        lifetimeAccess: formData.lifetimeAccess,
        enrollLink: formData.enrollLink,
        instructors: formData.instructors.map((instructor) => ({
          name: instructor.name,
          imageUrl: instructor.imageUrl || "", // Keep existing image URL if no new file
          specialization: instructor.specialization,
          experience: instructor.experience,
          rating: instructor.rating,
          students: instructor.students,
        })),
        tags: formData.tags,
        whatYouWillLearn: formData.whatYouWillLearn,
        requirements: formData.requirements,
        startDate: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : new Date().toISOString(),
        endDate: isEditMode
          ? course?.endDate ||
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        // Remove manual status setting - let backend calculate based on dates
        // status: isEditMode ? (course?.status || "upcoming" as const) : "upcoming" as const,
      };

      // Add the course data as JSON string
      formDataToSend.append("data", JSON.stringify(courseData));

      // Add the main course image file if selected
      if (formData.thumbnail) {
        formDataToSend.append("file", formData.thumbnail);
      }

      // Add instructor image files if selected
      formData.instructors.forEach((instructor, index) => {
        if (instructor.imageFile) {
          formDataToSend.append("instructorFiles", instructor.imageFile);
        }
      });

      // console.log(`${isEditMode ? 'Updating' : 'Submitting'} course data:`, courseData);
      // console.log("FormData contents:");
      for (let [key, value] of formDataToSend.entries()) {
        // console.log(key, value);
      }

      let result;
      if (isEditMode && courseId) {
        // Update existing course
        result = await dispatch(
          updateCourse({ id: courseId, formData: formDataToSend })
        ).unwrap();
        // console.log("Course Updated Successfully:", result);
        toast.success("Course updated successfully!");
        // Redirect instantly after successful update
        router.push("/admin/dashboard/managecourse");
      } else {
        // Create new course
        result = await dispatch(addCourse(formDataToSend)).unwrap();
        // console.log("Course Created Successfully:", result);
        toast.success("Course created successfully!");
        resetForm();
        // Redirect instantly after successful creation
        router.push("/admin/dashboard/managecourse");
      }
    } catch (error: any) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} course:`,
        error
      );

      // More specific error messages
      let errorMessage = "Please try again.";

      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        if (error.includes("401")) {
          errorMessage = "Authentication failed. Please log in again.";
        } else if (error.includes("403")) {
          errorMessage = `You don't have permission to ${
            isEditMode ? "update" : "create"
          } courses.`;
        } else if (error.includes("404")) {
          errorMessage = "Course not found.";
        } else if (error.includes("409")) {
          errorMessage = "A course with this title already exists.";
        } else if (error.includes("422")) {
          errorMessage = "Please check your form data and try again.";
        } else {
          errorMessage = error;
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state if in edit mode and course is still loading
  if (isEditMode && (isLoading || !course)) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <LoadingSpinner />
            <p className="text-gray-600 mt-4">Loading course data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state for edit mode
  if (isEditMode && error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="h-12 w-12 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Error loading course
          </h3>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => router.push("/admin/dashboard/managecourse")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Course Management
          </button>
        </div>
      </div>
    );
  }

  // Show loading state if categories are still loading
  if (!categories) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-between space-y-3 md:space-y-0">
          {/* <div className="flex-1"></div> */}
          <div className="text-start">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode ? "Edit Course" : "Create New Course"}
            </h1>
            <p className="text-gray-600">
              {isEditMode
                ? "Update the course details below"
                : "Fill in the details below to create your course"}
            </p>
          </div>
          <div className="">
            <button
              onClick={() => router.push("/admin/dashboard/managecourse")}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200 flex items-center cursor-pointer gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <BasicInformationSection
            formData={formData}
            onChange={handleChange}
            errors={errors}
            hasAttemptedSubmit={hasAttemptedSubmit}
          />

          <PricingSection
            formData={formData}
            onChange={handleChange}
            errors={errors}
            hasAttemptedSubmit={hasAttemptedSubmit}
          />

          <CourseFeaturesSection formData={formData} onChange={handleChange} />

          <CurriculumSection
            curriculum={formData.curriculum}
            onChange={handleChange}
            errors={errors}
            hasAttemptedSubmit={hasAttemptedSubmit}
          />

          <TagsSection
            tags={formData.tags}
            onAddTag={(tag) => addField("tags", tag)}
            onRemoveTag={(index) => removeField("tags", index)}
            onUpdateTag={(index, value) =>
              handleArrayChange("tags", index, value)
            }
            errors={errors}
            hasAttemptedSubmit={hasAttemptedSubmit}
          />

          <LearningObjectivesSection
            objectives={formData.whatYouWillLearn}
            onAddObjective={() => addField("whatYouWillLearn", "")}
            onRemoveObjective={(index) =>
              removeField("whatYouWillLearn", index)
            }
            onUpdateObjective={(index, value) =>
              handleArrayChange("whatYouWillLearn", index, value)
            }
            errors={errors}
            hasAttemptedSubmit={hasAttemptedSubmit}
          />

          <RequirementsSection
            requirements={formData.requirements}
            onAddRequirement={() => addField("requirements", "")}
            onRemoveRequirement={(index) => removeField("requirements", index)}
            onUpdateRequirement={(index, value) =>
              handleArrayChange("requirements", index, value)
            }
            errors={errors}
            hasAttemptedSubmit={hasAttemptedSubmit}
          />

          <InstructorsSection
            instructors={formData.instructors}
            onAddInstructor={() =>
              addField("instructors", {
                name: "",
                imageFile: null,
                imageUrl: "",
                specialization: "",
                experience: "",
                rating: 0,
                students: 0,
              })
            }
            onRemoveInstructor={(index) => removeField("instructors", index)}
            onUpdateInstructor={(index, field, value) =>
              handleArrayChange("instructors", index, value, field)
            }
            errors={errors}
            isEditMode={isEditMode}
            hasAttemptedSubmit={hasAttemptedSubmit}
          />
        </div>

        {/* Sidebar */}
        <FormSidebar
          formData={formData}
          onThumbnailChange={handleThumbnailChange}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEditMode={isEditMode}
          existingImageUrl={isEditMode ? course?.imageUrl : undefined}
          categories={categories}
          errors={errors}
          hasAttemptedSubmit={hasAttemptedSubmit}
        />
      </div>
    </div>
  );
}
