import { toast } from "sonner";
import { ValidationResult } from "@/type";

export const validateBlogForm = (
  data: { title: string; category: string },
  selectedCategory: string,
  showCustomInput: boolean,
  customCategory: string,
  editorContent: string
): ValidationResult => {
  // Validate title
  if (!data.title.trim()) {
    return { isValid: false, message: "Please enter a blog title" };
  }

  // Validate category
  if (!selectedCategory && !data.category && !showCustomInput) {
    return { isValid: false, message: "Please select a category" };
  }

  if (showCustomInput && !customCategory.trim()) {
    return { isValid: false, message: "Please enter a custom category name" };
  }

  // Validate content
  if (!editorContent.trim()) {
    return { isValid: false, message: "Please enter blog content" };
  }

  return { isValid: true };
};

export const validateAndShowError = (
  data: { title: string; category: string },
  selectedCategory: string,
  showCustomInput: boolean,
  customCategory: string,
  editorContent: string
): boolean => {
  const validation = validateBlogForm(
    data,
    selectedCategory,
    showCustomInput,
    customCategory,
    editorContent
  );

  if (!validation.isValid) {
    toast.error(validation.message || "Please fill in all required fields");
    return false;
  }

  return true;
}; 