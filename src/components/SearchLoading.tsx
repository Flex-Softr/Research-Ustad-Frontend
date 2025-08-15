import { Search, Loader2 } from 'lucide-react';

export default function SearchLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-gray-400 mr-3" />
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
        <p className="text-gray-600 font-medium">Searching for member records...</p>
        <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the data</p>
      </div>
    </div>
  );
} 