import { useState, useCallback } from "react";

export const useImageUpload = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
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