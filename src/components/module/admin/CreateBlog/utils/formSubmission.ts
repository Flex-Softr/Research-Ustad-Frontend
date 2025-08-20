import { toast } from "sonner";
import { AppDispatch } from "@/store/store";
import { addBlog, updateBlog } from "@/services/blogs/blogsSlice";
import { BlogPostForm, BlogSubmissionData } from "@/type";

export const prepareBlogData = (
  data: BlogPostForm,
  selectedCategory: string,
  showCustomInput: boolean,
  customCategory: string,
  editorContent: string,
  isEditMode: boolean,
  selectedFile: File | null,
  previewImage: string | null,
  isAdmin: boolean = false
): BlogSubmissionData => {
  // Determine the final category to use
  let finalCategory = selectedCategory;
  if (showCustomInput && customCategory.trim()) {
    finalCategory = customCategory.trim().toLowerCase().replace(/\s+/g, "-");
  } else if (data.category && !selectedCategory) {
    finalCategory = data.category;
  }

  return {
    title: data.title,
    category: finalCategory,
    content: editorContent,
    imageUrl: isEditMode && !selectedFile ? previewImage || "" : "",
    status: isAdmin ? "approved" : "pending", // Admin blogs are approved by default
  };
};

export const submitBlogForm = async (
  blogData: BlogSubmissionData,
  selectedFile: File | null,
  isEditMode: boolean,
  blogId: string | null,
  dispatch: AppDispatch,
  isAdmin: boolean = false
): Promise<boolean> => {
  try {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    
    // Set status based on user role
    const finalBlogData = {
      ...blogData,
      status: isAdmin ? "approved" : "pending",
    };
    
    formData.append("data", JSON.stringify(finalBlogData));

    if (isEditMode && blogId) {
      await dispatch(updateBlog({ id: blogId, formData })).unwrap();
      return true;
    } else {
      const result = await dispatch(addBlog(formData)).unwrap();
      // Return the created blog data for immediate use
      return result;
    }
  } catch (err: any) {
    // Let the calling component handle error toasts
    throw err;
  }
};
