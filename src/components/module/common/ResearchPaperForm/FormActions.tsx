"use client";
import { Button } from "@/components/ui/button";
import { Send, Save } from "lucide-react";

interface FormActionsProps {
  isEditMode: boolean;
  loading: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ isEditMode, loading }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <Button
        type="submit"
        className="w-full h-12 text-lg font-semibold bg-brand-primary hover:bg-brand-secondary cursor-pointer text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {isEditMode ? "Updating..." : "Submitting..."}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {isEditMode ? (
              <>
                <Save className="w-5 h-5" />
                Update Research Paper
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Research Paper
              </>
            )}
          </div>
        )}
      </Button>
      
      <p className="text-sm text-gray-500 text-center mt-3">
        {isEditMode 
          ? "Your changes will be saved immediately"
          : "Please review all information before submitting"
        }
      </p>
    </div>
  );
};

export default FormActions;
