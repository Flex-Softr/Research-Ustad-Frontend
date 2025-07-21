import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search by name, designation, institution, expertise, or research field..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* Filter Badge */}
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-brand-secondary" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
