"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Camera, Edit } from "lucide-react";

interface AchievementImageUploadProps {
  onChange: (file: File | null) => void;
  value: File | null;
  label?: string;
  existingImageUrl?: string;
  isEditMode?: boolean;
  required?: boolean;
}

export function AchievementImageUpload({
  onChange,
  value,
  label = "Achievement Image",
  existingImageUrl,
  isEditMode = false,
  required = false,
}: AchievementImageUploadProps) {
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
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="image-upload" className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      <Card className={`border-2 border-dashed transition-colors ${
        isDragOver 
          ? "border-blue-500 bg-blue-50" 
          : required && !preview && !existingImageUrl
          ? "border-red-300 bg-red-50"
          : "border-gray-300 hover:border-gray-400"
      }`}>
        <CardContent className="p-6">
          {preview ? (
            <div className="relative">
              <div 
                className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer group"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
              >
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                {/* Overlay for edit mode */}
                {isEditMode && !value && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-2 bg-white/90 px-3 py-2 rounded-lg shadow-lg">
                      <Edit className="w-4 h-4 text-gray-700" />
                      <span className="text-sm font-medium text-gray-700">Click to change image</span>
                    </div>
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-10 cursor-pointer"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 bg-gray-100 rounded-full">
                  <Camera className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, WebP up to 5MB
                  </p>
                  {required && (
                    <p className="text-xs text-red-500 mt-1">
                      Image is required
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <Input
            ref={fileInputRef}
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
            required={required}
          />
        </CardContent>
      </Card>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {!preview && !isEditMode && (
        <p className="text-sm text-gray-500">
          Upload an image to represent this achievement
          {required && <span className="text-red-500"> (Required)</span>}
        </p>
      )}
      
      {/* {isEditMode && preview && (
        <p className="text-sm text-gray-500">
          Click on the image to upload a new one, or use the X button to remove it
        </p>
      )} */}
    </div>
  );
}
