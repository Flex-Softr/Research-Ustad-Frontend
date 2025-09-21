import { useState, useCallback } from "react";
import { toast } from "sonner";

export const useImageUpload = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files?.length > 0) {
      const file = e.target.files[0];
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large! Please choose a different image under 5MB.", {
          description: `Your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Try compressing the image or choosing a smaller file.`,
          duration: 6000,
        });
        e.target.value = ""; // Clear the input
        return;
      }
      
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  }, []);

  const removeImage = useCallback(() => {
    setPreviewImage(null);
    setSelectedFile(null);
  }, []);

  return {
    previewImage,
    selectedFile,
    onFileChange,
    removeImage,
    setPreviewImage,
  };
}; 