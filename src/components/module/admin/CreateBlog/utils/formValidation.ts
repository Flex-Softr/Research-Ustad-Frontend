import { toast } from "sonner";
import { ValidationResult } from "@/type";

// Helper function to validate ObjectId format
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const validateBlogForm = (
  data: { title: string; category: string },
  selectedCategory: string,
  editorContent: string,
  previewImage: string | null,
  selectedFile: File | null
): ValidationResult => {
  // Validate title (required, min 1 character)
  if (!data.title || !data.title.trim()) {
    return { isValid: false, message: "Title is required" };
  }

  if (data.title.trim().length === 0) {
    return { isValid: false, message: "Title cannot be empty" };
  }

  // Validate category (required, min 1 character - ObjectId)
  const finalCategory = selectedCategory || data.category;
  if (!finalCategory || !finalCategory.trim()) {
    return { isValid: false, message: "Category is required" };
  }

  if (finalCategory.trim().length === 0) {
    return { isValid: false, message: "Category cannot be empty" };
  }

  // Validate ObjectId format for category
  if (!isValidObjectId(finalCategory.trim())) {
    return { isValid: false, message: "Invalid category format" };
  }

  // Validate content (required, min 10 characters)
  if (!editorContent || !editorContent.trim()) {
    return { isValid: false, message: "Content is required" };
  }

  if (editorContent.trim().length < 10) {
    return { 
      isValid: false, 
      message: "Content must be at least 10 characters long" 
    };
  }

  // Validate content is not just whitespace
  if (editorContent.trim().length === 0) {
    return { isValid: false, message: "Content cannot be empty" };
  }

  // Validate image (required)
  if (!selectedFile && !previewImage) {
    return { isValid: false, message: "Blog image is required" };
  }

  return { isValid: true };
};

export const validateAndShowError = (
  data: { title: string; category: string },
  selectedCategory: string,
  editorContent: string,
  previewImage: string | null,
  selectedFile: File | null
): boolean => {
  const validation = validateBlogForm(
    data,
    selectedCategory,
    editorContent,
    previewImage,
    selectedFile
  );

  if (!validation.isValid) {
    toast.error(validation.message || "Please fill in all required fields");
    return false;
  }

  return true;
}; 