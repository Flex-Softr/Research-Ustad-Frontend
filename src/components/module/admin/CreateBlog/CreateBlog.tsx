"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlogPost, SingleBlog, UpdateBlog } from "@/services/blogs";
import { UploadCloud, ArrowLeft } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import RichTextEditor from "@/components/blogs/blog/RichTextEditor";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { addBlog, updateBlog } from "@/services/blogs/blogsSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, X } from "lucide-react";

export interface BlogPostForm {
  title: string;
  imageUrl?: string;
  category: string;
  content: string;
}

// Predefined blog categories
const blogCategories = [
  { value: "technology", label: "Technology" },
  { value: "research", label: "Research" },
  { value: "academic", label: "Academic" },
  { value: "education", label: "Education" },
  { value: "science", label: "Science" },
  { value: "engineering", label: "Engineering" },
  { value: "computer-science", label: "Computer Science" },
  { value: "artificial-intelligence", label: "Artificial Intelligence" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "data-science", label: "Data Science" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "blockchain", label: "Blockchain" },
  { value: "iot", label: "Internet of Things" },
  { value: "cloud-computing", label: "Cloud Computing" },
  { value: "software-development", label: "Software Development" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "database", label: "Database" },
  { value: "networking", label: "Networking" },
  { value: "general", label: "General" },
];

const CreateBlog: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<BlogPostForm>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);
  const [editorContent, setEditorContent] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [allCategories, setAllCategories] = useState(blogCategories);
  const dispatch = useDispatch<AppDispatch>();

  // Check if we're in edit mode
  const isEditMode = searchParams.get("edit") === "true";
  const blogId = searchParams.get("id");

  // Load blog data for editing
  useEffect(() => {
    const loadBlogData = async () => {
      if (isEditMode && blogId) {
        try {
          setIsLoadingBlog(true);
          const response = await SingleBlog(blogId);
          if (response?.success && response?.data) {
            const blog = Array.isArray(response.data)
              ? response.data[0]
              : response.data;
            if (blog) {
              setValue("title", blog.title);
              setValue("category", blog.category);
              setSelectedCategory(blog.category);
              setEditorContent(blog.content);
              setPreviewImage(blog.imageUrl); // Use imageUrl instead of image

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
                  setAllCategories((prev) => [...prev, newCategory]);
                }
              }
            } else {
              toast.error("Blog not found");
              router.push("/admin/dashboard/allblogs");
            }
          } else {
            toast.error("Failed to load blog data");
            router.push("/admin/dashboard/allblogs");
          }
        } catch (error) {
          toast.error("Failed to load blog data");
          router.push("/admin/dashboard/allblogs");
        } finally {
          setIsLoadingBlog(false);
        }
      }
    };
    loadBlogData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditMode, blogId, setValue, router]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
  };

  const handleCategoryChange = (value: string) => {
    if (value === "custom") {
      setShowCustomInput(true);
      setSelectedCategory("");
      setValue("category", "");
    } else {
      setShowCustomInput(false);
      setSelectedCategory(value);
      setValue("category", value);
      setCustomCategory("");
    }
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      const newCategory = {
        value: customCategory.trim().toLowerCase().replace(/\s+/g, "-"),
        label: customCategory.trim(),
      };

      // Check if category already exists
      const exists = allCategories.find(
        (cat) => cat.value === newCategory.value
      );
      if (!exists) {
        setAllCategories((prev) => [...prev, newCategory]);
      }

      setSelectedCategory(newCategory.value);
      setValue("category", newCategory.value);
      setShowCustomInput(false);
      setCustomCategory("");
      toast.success("Custom category added successfully!");
    } else {
      toast.error("Please enter a category name");
    }
  };

  const handleCancelCustomCategory = () => {
    setShowCustomInput(false);
    setCustomCategory("");
    setSelectedCategory("");
    setValue("category", "");
  };

  const onSubmit: SubmitHandler<BlogPostForm> = async (data) => {
    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    const blogPost = {
      title: data.title,
      category: selectedCategory,
      content: editorContent,
      imageUrl: isEditMode && !selectedFile ? previewImage || "" : "", // Keep existing image if no new file in edit mode
    };

    try {
      setIsLoading(true);

      // Create FormData for both create and update
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append("data", JSON.stringify(blogPost));

      if (isEditMode && blogId) {
        // Update blog using Redux slice
        await dispatch(updateBlog({ id: blogId, formData })).unwrap();
        toast.success("Blog updated successfully!");
        router.push("/admin/dashboard/allblogs");
      } else {
        // Create blog using Redux slice
        await dispatch(addBlog(formData)).unwrap();
        
        reset();
        setPreviewImage(null);
        setSelectedFile(null);
        setEditorContent("");
        setSelectedCategory("");
        toast.success("Blog post created successfully!");
        router.push("/admin/dashboard/allblogs");
      }
    } catch (err: any) {
      toast.error(
        err.message ||
          (isEditMode ? "Failed to update blog" : "Failed to create blog post")
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingBlog) {
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
        {/* Image Upload Section */}
        <div className="border p-4 rounded-lg">
          <Label className="text-lg font-semibold mb-2 block">
            Blog Cover Image
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                <UploadCloud className="text-gray-400" />
                <span className="text-gray-600">Click to upload image</span>
                <input
                  type="file"
                  onChange={onFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            {selectedFile && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={removeImage}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove Image
                </Button>
              </div>
            )}
          </div>
          {previewImage && !selectedFile && (
            <div className="relative w-full h-[400px] border rounded mt-3">
              <Image
                src={previewImage}
                alt="Preview"
                fill
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                onClick={removeImage}
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Title Input */}
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

        {/* Category Selection */}
        <div>
          <Label
            htmlFor="category"
            className="text-lg font-semibold mb-2 block"
          >
            Blog Category
          </Label>

          {!showCustomInput ? (
            <div className="space-y-3">
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger
                  className="w-full"
                  placeholder="Select a category"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="custom"
                    className="text-brand-primary font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add New Category
                    </div>
                  </SelectItem>
                  {allCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedCategory && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-sm text-green-700">
                    Selected:{" "}
                    <strong>
                      {
                        allCategories.find(
                          (cat) => cat.value === selectedCategory
                        )?.label
                      }
                    </strong>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Enter new category name"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomCategory();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddCustomCategory}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelCustomCategory}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Press Enter or click the + button to add the category
              </p>
            </div>
          )}
        </div>

        {/* Rich Text Editor */}
        <div>
          <Label className="text-lg font-semibold mb-2 block">
            Blog Content
          </Label>
          <RichTextEditor
            value={editorContent}
            onChange={setEditorContent}
            placeholder="Start writing your blog content here..."
            minHeight="400px"
          />
        </div>

        {/* Submit Button */}
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
