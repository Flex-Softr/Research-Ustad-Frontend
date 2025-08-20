"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import { FilterSidebarProps } from "@/type";

// Types for filter configuration
interface FilterOption {
  id: string;
  name: string;
  count: number;
}

interface FilterConfig {
  key: keyof FilterSidebarProps['filters'];
  title: string;
  options: FilterOption[];
  showMore?: boolean;
}

// Reusable Filter Button Component
const FilterButton = ({ 
  option, 
  isSelected, 
  onClick 
}: { 
  option: FilterOption; 
  isSelected: boolean; 
  onClick: () => void; 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group cursor-pointer ${
      isSelected
        ? "bg-brand-primary text-white shadow-lg"
        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
    }`}
  >
    <span className="font-medium">{option.name}</span>
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        isSelected
          ? "bg-white/20 text-white"
          : "bg-brand-secondary/10 text-brand-secondary"
      }`}
    >
      {option.count}
    </span>
  </button>
);

// Reusable Show More/Less Button Component
const ShowMoreButton = ({ 
  isExpanded, 
  totalCount, 
  onClick 
}: { 
  isExpanded: boolean; 
  totalCount: number; 
  onClick: () => void; 
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-all duration-300 text-sm font-medium cursor-pointer"
  >
    {isExpanded ? (
      <>
        <ChevronUp className="h-4 w-4" />
        Show Less
      </>
    ) : (
      <>
        <ChevronDown className="h-4 w-4" />
        Show More ({totalCount - 3} more)
      </>
    )}
  </button>
);

// Reusable Filter Section Component
const FilterSection = ({ 
  config, 
  filters, 
  onFilterChange 
}: { 
  config: FilterConfig; 
  filters: FilterSidebarProps['filters']; 
  onFilterChange: (key: string, value: string) => void; 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const filteredOptions = config.options.filter(option => option.count > 0 || option.id === "all");
  const displayedOptions = isExpanded ? filteredOptions : filteredOptions.slice(0, 3);
  const showMoreButton = config.showMore && filteredOptions.length > 3;

  if (filteredOptions.length === 0) return null;

  return (
    <div className="mb-6">
      <h4 className="font-semibold text-gray-900 mb-3">{config.title}</h4>
      <div className="space-y-2">
        {displayedOptions.map((option) => (
          <FilterButton
            key={option.id}
            option={option}
            isSelected={filters[config.key] === option.id}
            onClick={() => onFilterChange(config.key, option.id)}
          />
        ))}
        
        {showMoreButton && (
          <ShowMoreButton
            isExpanded={isExpanded}
            totalCount={filteredOptions.length}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        )}
      </div>
    </div>
  );
};

const FilterSidebar = ({
  papers,
  filters,
  searchQuery,
  onFilterChange,
  onSearch,
  onClearFilters,
}: FilterSidebarProps) => {
  // Helper function to get count for a specific filter
  const getFilterCount = (filterType: string, value: string) => {
    if (value === "all") return papers.length;
    
    switch (filterType) {
      case "status":
        return papers.filter((p) => p.status === value).length;
      case "category":
        return papers.filter((p) => p.researchArea === value).length;
      case "year":
        return papers.filter((p) => p.year.toString() === value).length;
      case "paperType":
        return papers.filter((p) => p.paperType === value).length;
      default:
        return 0;
    }
  };

  // Generate filter configurations
  const filterConfigs: FilterConfig[] = [
    {
      key: "status",
      title: "Status",
      showMore: true,
      options: [
        { id: "all", name: "All Papers", count: papers.length },
        { id: "published", name: "Published", count: getFilterCount("status", "published") },
        { id: "ongoing", name: "Ongoing", count: getFilterCount("status", "ongoing") },
        { id: "under_review", name: "Under Review", count: getFilterCount("status", "under_review") },
        { id: "in_preparation", name: "In Preparation", count: getFilterCount("status", "in_preparation") },
        { id: "revision", name: "Revision", count: getFilterCount("status", "revision") },
      ]
    },
    {
      key: "category",
      title: "Research Area",
      showMore: true,
      options: [
        { id: "all", name: "All", count: papers.length },
        ...Array.from(new Set(papers.map((paper) => paper.researchArea).filter(Boolean)))
          .map(area => ({
            id: area,
            name: area,
            count: getFilterCount("category", area)
          }))
      ]
    },
    {
      key: "year",
      title: "Year",
      showMore: true,
      options: [
        { id: "all", name: "All Years", count: papers.length },
        ...Array.from(new Set(papers.map((paper) => paper.year.toString())))
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map(year => ({
            id: year,
            name: year,
            count: getFilterCount("year", year)
          }))
      ]
    },
    {
      key: "paperType",
      title: "Paper Type",
      showMore: false,
      options: [
        { id: "all", name: "All Types", count: papers.length },
        { id: "journal", name: "Journal", count: getFilterCount("paperType", "journal") },
        { id: "conference", name: "Conference", count: getFilterCount("paperType", "conference") },
      ]
    }
  ];

  return (
    <div className="lg:w-80 flex-shrink-0">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="h-5 w-5 text-brand-secondary" />
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200 focus:border-brand-secondary focus:ring-brand-secondary/20"
            />
          </div>
        </div>

        {/* Filter Sections */}
        {filterConfigs.map((config) => (
          <FilterSection
            key={config.key}
            config={config}
            filters={filters}
            onFilterChange={onFilterChange}
          />
        ))}

        {/* Reset Button */}
        <div className="pt-4 border-brand-secondary/10">
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="w-full border-brand-secondary/10 bg-brand-secondary/10 text-brand-secondary hover:text-brand-secondary cursor-pointer transition-all duration-300 font-medium"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
