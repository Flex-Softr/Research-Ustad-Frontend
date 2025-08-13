"use client";
import { Button } from "@/components/ui/button";
import { X, FileText, Edit3 } from "lucide-react";

interface FormHeaderProps {
  isEditMode: boolean;
  onClose?: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ isEditMode, onClose }) => {
  return (
    <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          {isEditMode ? (
            <Edit3 className="h-6 w-6 text-blue-600" />
          ) : (
            <FileText className="h-6 w-6 text-blue-600" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditMode ? "Edit Research Paper" : "Create Research Paper"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isEditMode 
              ? "Update your research paper information" 
              : "Add a new research paper to your portfolio"
            }
          </p>
        </div>
      </div>
      {isEditMode && onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default FormHeader;
