"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { SubmitHandler } from "react-hook-form";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { fetchSingleBlog } from "@/services/blogs/blogsSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// Import custom hooks
import { useBlogForm } from "../../module/admin/CreateBlog/hooks/useBlogForm";
import { BlogPostForm } from "@/type";
import { useCategoryManagement } from "../../module/admin/CreateBlog/hooks/useCategoryManagement";
import { useImageUpload } from "../../module/admin/CreateBlog/hooks/useImageUpload";

// Import components
import ImageUploadSection from "../../module/admin/CreateBlog/components/ImageUploadSection";
import CategorySelection from "../../module/admin/CreateBlog/components/CategorySelection";

// Import utilities
import { validateAndShowError } from "../../module/admin/CreateBlog/utils/formValidation";
import { prepareBlogData, submitBlogForm } from "../../module/admin/CreateBlog/utils/formSubmission";

import RichTextEditor from "@/components/blogs/blog/RichTextEditor";
import { toast } from "sonner";

interface CreateBlogFormProps {
  isAdmin?: boolean;
  onSuccess?: () => void;
  backPath?: string;
  successPath?: string;
  title?: string;
  description?: string;
}

const CreateBlogForm: React.FC<CreateBlogFormProps> = ({
  isAdmin = false,
  onSuccess,
  backPath,
  successPath,
  title,
  description,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  // Custom hooks
  const { register, handleSubmit, reset, setValue } = useBlogForm();
  const {
    selectedCategory,
    setSelectedCategory,
    customCategory,
    setCustomCategory,
    showCustomInput,
    setShowCustomInput,
    allCategories,
    addCategory,
    resetCategoryState,
  } = useCategoryManagement();
  const {
    previewImage,
    selectedFile,
    onFileChange,
    removeImage,
    setPreviewImage,
  } = useImageUpload();

  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [editorContent, setEditorContent] = useState<string>("");

  // Redux state
  const { blog, isLoading: isReduxLoading } = useSelector(
    (state: RootState) => state.blogs
  );

  // Computed values
  const isEditMode = searchParams.get("edit") === "true";
  const blogId = searchParams.get("id");

  // Default values
  const defaultTitle = isAdmin 
    ? (isEditMode ? "Edit Blog Post" : "Create Blog Post")
    : (isEditMode ? "Edit Blog" : "Create New Blog");

  const defaultDescription = isAdmin
    ? ""
    : (isEditMode 
        ? "Update your blog post. Changes will be reviewed by admin." 
        : "Share your thoughts and ideas. Your blog will be reviewed by admin before publishing."
      );

  const defaultBackPath = isAdmin ? "/admin/dashboard/allblogs" : "/user/dashboard/myallblog";
  const defaultSuccessPath = isAdmin ? "/admin/dashboard/allblogs" : "/user/dashboard/myallblog";

  // Reset form when switching between create and edit modes
  useEffect(() => {
    if (!isEditMode) {
      reset();
      setEditorContent("");
      resetCategoryState();
      setPreviewImage(null);
    }
  }, [isEditMode, reset, resetCategoryState, setPreviewImage]);

  // Load blog data for editing using Redux
  useEffect(() => {
    if (isEditMode && blogId) {
      dispatch(fetchSingleBlog(blogId));
    }
  }, [isEditMode, blogId, dispatch]);

  // Set form values when blog data is loaded from Redux
  useEffect(() => {
    if (isEditMode && blog && blog._id === blogId) {
      // Set form values with the blog data
      setValue("title", blog.title || "");
      setValue("category", blog.category || "");
      setSelectedCategory(blog.category || "");
      setEditorContent(blog.content || "");
      setPreviewImage(blog.imageUrl || "");

      // Add the blog's category to allCategories if it doesn't exist
      if (blog.category) {
        const categoryExists = allCategories.find(
          (cat) => cat.value === blog.category
        );
        if (!categoryExists) {
          const newCategory = {
            value: blog.category,
            label:
              blog.category.charAt(0).toUpperCase() +
              blog.category.slice(1).replace(/-/g, " "),
          };
          addCategory(newCategory);
        }
      }
    }
  }, [
    blog,
    blogId,
    isEditMode,
    setValue,
    allCategories,
    addCategory,
    setSelectedCategory,
    setEditorContent,
    setPreviewImage,
  ]);

  const onSubmit: SubmitHandler<BlogPostForm> = async (data) => {
    // Validation
    if (
      !validateAndShowError(
        data,
        selectedCategory,
        showCustomInput,
        customCategory,
        editorContent
      )
    ) {
      return;
    }

    // Prepare blog data
    const blogData = prepareBlogData(
      data,
      selectedCategory,
      showCustomInput,
      customCategory,
      editorContent,
      isEditMode,
      selectedFile,
      previewImage,
      isAdmin
    );

    try {
      setIsLoading(true);

      const result = await submitBlogForm(
        blogData,
        selectedFile,
        isEditMode,
        blogId,
        dispatch,
        isAdmin
      );

      if (result) {
        // Show success message
        if (isAdmin) {
          toast.success(isEditMode ? "Blog updated successfully!" : "Blog post created successfully!");
        } else {
          toast.success(
            isEditMode 
              ? "Blog updated successfully! It will be reviewed by admin." 
              : "Blog created successfully! It will be reviewed by admin."
          );
        }

        // Call custom success handler if provided
        if (onSuccess) {
          onSuccess();
        } else {
          // Navigate to success path
          const targetPath = successPath || defaultSuccessPath;
          router.replace(targetPath);
        }

        // Reset form
        reset();
        setPreviewImage(null);
        setEditorContent("");
        resetCategoryState();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to save blog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    const targetPath = backPath || defaultBackPath;
    router.push(targetPath);
  };

  if (isReduxLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner
          size="lg"
          variant="border"
          text="Loading blog data..."
        />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {title || defaultTitle}
        </h1>
        {description && (
          <p className="text-gray-600 mt-2">
            {description}
          </p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-xl font-bold">Blog Title *</Label>
          <Input
            id="title"
            placeholder="Enter blog title"
            {...register("title")}
            className="mt-1"
          />
        </div>

        {/* Category Selection */}
        <CategorySelection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          customCategory={customCategory}
          setCustomCategory={setCustomCategory}
          showCustomInput={showCustomInput}
          setShowCustomInput={setShowCustomInput}
          allCategories={allCategories}
          addCategory={addCategory}
          setValue={setValue}
        />

        {/* Image Upload */}
        <ImageUploadSection
          previewImage={previewImage}
          selectedFile={selectedFile}
          onFileChange={onFileChange}
          removeImage={removeImage}
        />

        {/* Content Editor */}
        <div>
          <Label htmlFor="content" className="text-xl font-bold">Blog Content *</Label>
          <div className="mt-1">
            <RichTextEditor
              value={editorContent}
              onChange={setEditorContent}
              placeholder="Write your blog content here..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" variant="border" />
            ) : (
              <>{isEditMode ? "Update Blog" : "Create Blog"}</>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
