"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost } from "@/services/blogs";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
export interface BlogPostForm {
  title: string;
  image?: string;
  shortDescription: string;
}

const CreateBlog: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<BlogPostForm>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Clooud_Gen");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dztxlecbe/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setPreviewImage(data.secure_url);
      setImageURL(data.secure_url);
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };
  const removeImage = () => {
    setPreviewImage(null);
    setImageURL("");
  };
  const onSubmit: SubmitHandler<BlogPostForm> = async (data) => {
    const blogPost = {
      title: data.title,
      shortDescription: data.shortDescription,
      image: imageURL,
    };

    try {
      setIsLoading(true);
      console.log(blogPost);
      const res = await BlogPost(blogPost);
      if (res?.success) {
        reset();
        setPreviewImage(null);
        setImageURL("");
        console.log(res);
        toast.success("Blog post created successfully!");
      } else {
        toast.error("Blog post created Not successfully!");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Blog Post</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div className="border p-4 rounded-lg my-5">
          <Label>Upload Image</Label>
          <label className="flex items-center gap-2 cursor-pointer">
            <UploadCloud />
            <input
              type="file"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {isUploading && (
            <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded"></div>
          )}
          {previewImage && (
            <div className="relative w-full h-[400px] border rounded mt-3">
              <Image
                src={previewImage}
                alt="Preview"
                fill
                className="w-full h-full object-cover rounded"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                onClick={removeImage}
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="title" className="mb-2">
            Title:
          </Label>
          <Input
            placeholder="Enter your Title"
            id="title"
            type="text"
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <Label htmlFor="shortDescription" className="mb-2">
            Description:
          </Label>
          <Textarea
            placeholder="Enter your Description"
            id="shortDescription"
            className="h-32 w-full resize-none"
            {...register("shortDescription", { required: true })}
          />
        </div>

        <Button
          disabled={isUploading}
          type="submit"
          className="w-full flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" variant="icon" className="mr-2" />{" "}
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
