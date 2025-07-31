import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadSectionProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: () => void;
  previewImage: string | null;
  selectedFile: File | null;
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  onFileChange,
  removeImage,
  previewImage,
  selectedFile,
}) => {
  return (
    <div className="border p-4 rounded-lg w-full">
      <Label className="text-lg font-semibold mb-2 block">
        Blog Cover Image
      </Label>
      <div className="w-full">
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
  );
};

export default ImageUploadSection; 