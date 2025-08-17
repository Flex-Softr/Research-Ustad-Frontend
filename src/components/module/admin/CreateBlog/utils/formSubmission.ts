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
  previewImage: string | null
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
  };
};

export const submitBlogForm = async (
  blogData: BlogSubmissionData,
  selectedFile: File | null,
  isEditMode: boolean,
  blogId: string | null,
  dispatch: AppDispatch
): Promise<boolean> => {
  try {
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    formData.append("data", JSON.stringify(blogData));

    if (isEditMode && blogId) {
      await dispatch(updateBlog({ id: blogId, formData })).unwrap();
      toast.success("Blog updated successfully!");
    } else {
      const result = await dispatch(addBlog(formData)).unwrap();
      toast.success("Blog post created successfully!");
      // Return the created blog data for immediate use
      return result;
    }

    return true;
  } catch (err: any) {
    toast.error(
      err.message ||
        (isEditMode ? "Failed to update blog" : "Failed to create blog post")
    );
    return false;
  }
};
