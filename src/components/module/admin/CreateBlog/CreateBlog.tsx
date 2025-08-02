"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { SubmitHandler } from "react-hook-form";
import RichTextEditor from "@/components/blogs/blog/RichTextEditor";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { fetchSingleBlog } from "@/services/blogs/blogsSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// Import custom hooks
import { useBlogForm } from "./hooks/useBlogForm";
import { BlogPostForm } from "@/type";
import { useCategoryManagement } from "./hooks/useCategoryManagement";
import { useImageUpload } from "./hooks/useImageUpload";

// Import components
import ImageUploadSection from "./components/ImageUploadSection";
import CategorySelection from "./components/CategorySelection";

// Import utilities
import { validateAndShowError } from "./utils/formValidation";
import { prepareBlogData, submitBlogForm } from "./utils/formSubmission";

const CreateBlog: React.FC = () => {
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
      previewImage
    );

    try {
      setIsLoading(true);

      const success = await submitBlogForm(
        blogData,
        selectedFile,
        isEditMode,
        blogId,
        dispatch
      );

      if (success) {
        if (!isEditMode) {
          reset();
          setPreviewImage(null);
          setEditorContent("");
          resetCategoryState();
        }
        router.push("/admin/dashboard/allblogs");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
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
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">
          {isEditMode ? "Edit Blog Post" : "Create Blog Post"}
        </h2>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/dashboard/allblogs")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <ImageUploadSection
          onFileChange={onFileChange}
          removeImage={removeImage}
          previewImage={previewImage}
          selectedFile={selectedFile}
        />

        <div>
          <Label htmlFor="title" className="text-lg font-semibold mb-2 block">
            Blog Title
          </Label>
          <Input
            placeholder="Enter your blog title"
            id="title"
            type="text"
            className="text-lg"
            {...register("title", { required: "Title is required" })}
          />
        </div>

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

        <div>
          <Label className="text-lg font-semibold mb-2 block">
            Blog Content
          </Label>
          <RichTextEditor
            value={editorContent}
            onChange={setEditorContent}
            placeholder="Write your blog content here..."
          />
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          className="w-full flex items-center justify-center py-3 text-lg font-semibold"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" variant="icon" className="mr-2" />
              {isEditMode ? "Updating Blog Post..." : "Creating Blog Post..."}
            </>
          ) : isEditMode ? (
            "Update Blog Post"
          ) : (
            "Create Blog Post"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
