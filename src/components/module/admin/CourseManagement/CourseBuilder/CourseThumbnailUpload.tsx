"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { CourseThumbnailUploadProps } from "@/type";



export function CourseThumbnailUpload({ onChange, value, existingImageUrl, isEditMode = false }: CourseThumbnailUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      setError(null);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (existingImageUrl && isEditMode) {
      setPreview(existingImageUrl);
    } else {
      setPreview(null);
    }
  }, [value, existingImageUrl, isEditMode]);

  const validateFile = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload an image file (JPEG, PNG, or WebP)");
      return false;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 5MB");
      return false;
    }

    setError(null);
    return true;
  };

  const handleFileChange = (file: File) => {
    if (validateFile(file)) {
      onChange(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleRemoveImage = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="thumbnail" className="text-sm font-medium">
        Course Thumbnail {!isEditMode && "*"}
      </Label>

      <Input
        ref={fileInputRef}
        id="thumbnail"
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {!preview ? (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            isDragOver
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClickUpload}
        >
          <CardContent className="flex flex-col items-center justify-center py-8 px-4">
            <div className="flex flex-col items-center space-y-3">
              <div
                className={`p-3 rounded-full ${
                  isDragOver ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <Upload
                  className={`w-6 h-6 ${
                    isDragOver ? "text-blue-600" : "text-gray-600"
                  }`}
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">
                  {isDragOver
                    ? "Drop your image here"
                    : isEditMode 
                    ? "Click to upload new image or drag and drop"
                    : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, WebP up to 5MB
                </p>
                {isEditMode && existingImageUrl && (
                  <p className="text-xs text-blue-600 mt-2">
                    Current image will be kept if no new image is selected
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative group">
              <div className="relative w-full h-48 bg-gray-100">
                <Image
                  src={preview}
                  alt="Course thumbnail preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {value?.name || (isEditMode ? "Current image" : "Image uploaded")}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleClickUpload}>
                  Change
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="text-xs text-gray-500">
        <p>• Recommended size: 1200x675 pixels (16:9 aspect ratio)</p>
        <p>• Maximum file size: 5MB</p>
        <p>• Supported formats: JPEG, PNG, WebP</p>
        {isEditMode && (
          <p>• Leave empty to keep the current image</p>
        )}
      </div>
    </div>
  );
}
