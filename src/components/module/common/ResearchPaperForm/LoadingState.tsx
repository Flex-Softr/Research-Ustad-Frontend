"use client";
import { Loader2, FileText } from "lucide-react";

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 bg-white rounded-lg border border-gray-200 p-8">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="h-8 w-8 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Loading Research Paper</h3>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Fetching paper data...</span>
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Please wait while we load your research paper information
      </p>
    </div>
  );
};

export default LoadingState;
