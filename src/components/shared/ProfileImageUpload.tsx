"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, Edit, Crop } from "lucide-react";
import { toast } from "sonner";
import ImageCropper from "./ImageCropper";
import UserAvatar from "./UserAvatar";

interface ProfileImageUploadProps {
  onChange: (file: File | null) => void;
  selectedFile: File | null;
  currentProfileImg?: string;
  label?: string;
  required?: boolean;
  aspectRatio?: number;
  cropShape?: 'rect' | 'round';
}

export const ProfileImageUpload = ({
  onChange,
  selectedFile,
  currentProfileImg,
  label = "Profile Image",
  required = false,
  aspectRatio = 1,
  cropShape = 'round'
}: ProfileImageUploadProps) => {
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload an image file (JPEG, PNG, JPG, or WebP)");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("Image too large! Please choose a different image under 5MB.", {
        description: `Your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Try compressing the image or choosing a smaller file.`,
        duration: 6000,
      });
      return false;
    }

    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      const imageUrl = URL.createObjectURL(file);
      setTempImageSrc(imageUrl);
      setShowCropper(true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
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
      handleFileSelect(file);
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    onChange(croppedFile);
    setShowCropper(false);
    setTempImageSrc(null);
    toast.success("Image cropped successfully!");
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    if (tempImageSrc) {
      URL.revokeObjectURL(tempImageSrc);
      setTempImageSrc(null);
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getDisplayImage = () => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }
    return currentProfileImg;
  };

  return (
    <>
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        
        <Card className={`border-2 border-dashed transition-colors cursor-pointer ${
          isDragOver 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 hover:border-gray-400"
        }`}>
          <CardContent className="p-6">
            {selectedFile || currentProfileImg ? (
              <div className="space-y-4">
                {/* Image Preview */}
                <div className="flex justify-center">
                  <div className="relative">
                    <UserAvatar
                      src={getDisplayImage()}
                      alt="Profile Preview"
                      name="Preview"
                      size="4xl"
                      className="ring-4 ring-gray-200"
                    />
                  </div>
                </div>

                {/* Image Info */}
                {selectedFile && (
                  <div className="text-center space-y-1">
                    <p className="text-sm font-medium text-gray-700">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClick}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Change Image
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center py-8 cursor-pointer"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-gray-100 rounded-full">
                    <Camera className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPEG, PNG, JPG, WebP up to 5MB
                    </p>
                    <p className="text-xs text-blue-600 mt-2 flex items-center justify-center gap-1">
                      <Crop className="h-3 w-3" />
                      Crop and position your image after upload
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
          </CardContent>
        </Card>

        {/* Hidden File Input */}
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          required={required}
        />
      </div>

      {/* Image Cropper Modal */}
      {showCropper && tempImageSrc && (
        <ImageCropper
          imageSrc={tempImageSrc}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          isOpen={showCropper}
          aspectRatio={aspectRatio}
          cropShape={cropShape}
          fileName={`profile-image-${Date.now()}.jpg`}
        />
      )}
    </>
  );
};

export default ProfileImageUpload;
