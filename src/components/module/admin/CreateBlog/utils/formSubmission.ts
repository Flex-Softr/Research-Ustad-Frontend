import { toast } from "sonner";
import { AppDispatch } from "@/store/store";
import { addBlog, updateBlog } from "@/services/blogs/blogsSlice";
import { BlogPostForm, BlogSubmissionData } from "@/type";

export const prepareBlogData = (
  data: BlogPostForm,
  selectedCategory: string,
  editorContent: string,
  isEditMode: boolean,
  selectedFile: File | null,
  previewImage: string | null,
  isAdmin: boolean = false
): BlogSubmissionData => {
  // Determine the final category to use
  let finalCategory = selectedCategory;
  if (data.category && !selectedCategory) {
    finalCategory = data.category;
  }

  // Determine the final imageUrl
  let finalImageUrl = "";
  if (selectedFile) {
    // If a new file is selected, we'll upload it and get the URL
    finalImageUrl = "pending-upload"; // Placeholder, will be replaced after upload
  } else if (previewImage) {
    // If no new file but we have a preview image (existing image)
    finalImageUrl = previewImage;
  } else {
    // No image provided
    throw new Error("Blog image is required");
  }

  return {
    title: data.title.trim(),
    category: finalCategory.trim(),
    content: editorContent.trim(),
    imageUrl: finalImageUrl,
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
