"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { FilterSidebarProps } from "@/type";

const FilterSidebar = ({
  papers,
  filters,
  searchQuery,
  onFilterChange,
  onSearch,
  onClearFilters,
}: FilterSidebarProps) => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Extract unique values for filters
  const categories = [
    "all",
    ...new Set(papers.map((paper) => paper.researchArea).filter(Boolean)),
  ];

  const years = [
    "all",
    ...new Set(papers.map((paper) => paper.year.toString())),
  ].sort((a, b) => parseInt(b) - parseInt(a));

  const paperTypes = [
    "all",
    "journal",
    "conference"
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

        {/* Status Filter */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Status</h4>
          <div className="space-y-2">
            {[
              { id: "all", name: "All Papers", count: papers.length },
              {
                id: "published",
                name: "Published",
                count: papers.filter((p) => p.status === "published").length,
              },
              {
                id: "ongoing",
                name: "Ongoing",
                count: papers.filter((p) => p.status === "ongoing").length,
              },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange("status", filter.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group cursor-pointer ${
                  filters.status === filter.id
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span className="font-medium">{filter.name}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    filters.status === filter.id
                      ? "bg-white/20 text-white"
                      : "bg-brand-secondary/10 text-brand-secondary"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Research Area</h4>
          <div className="space-y-2">
            {(showAllCategories ? categories : categories.slice(0, 4)).map((category) => (
              <button
                key={category}
                onClick={() => onFilterChange("category", category)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group cursor-pointer ${
                  filters.category === category
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span className="font-medium">
                  {category === "all" ? "All" : category}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    filters.category === category
                      ? "bg-white/20 text-white"
                      : "bg-brand-secondary/10 text-brand-secondary"
                  }`}
                >
                  {category === "all"
                    ? papers.length
                    : papers.filter((p) => p.researchArea === category).length}
                </span>
              </button>
            ))}
            
            {/* Show More/Less Button */}
            {categories.length > 4 && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-all duration-300 text-sm font-medium cursor-pointer"
              >
                {showAllCategories ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show More ({categories.length - 4} more)
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Year Filter */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Year</h4>
          <div className="space-y-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => onFilterChange("year", year)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group cursor-pointer ${
                  filters.year === year
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span className="font-medium">
                  {year === "all" ? "All Years" : year}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    filters.year === year
                      ? "bg-white/20 text-white"
                      : "bg-brand-secondary/10 text-brand-secondary"
                  }`}
                >
                  {year === "all"
                    ? papers.length
                    : papers.filter((p) => p.year.toString() === year).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Paper Type Filter */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Paper Type</h4>
          <div className="space-y-2">
            {paperTypes.map((type) => (
              <button
                key={type}
                onClick={() => onFilterChange("paperType", type)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group cursor-pointer ${
                  filters.paperType === type
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span className="font-medium">
                  {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    filters.paperType === type
                      ? "bg-white/20 text-white"
                      : "bg-brand-secondary/10 text-brand-secondary"
                  }`}
                >
                  {type === "all"
                    ? papers.length
                    : papers.filter((p) => p.paperType === type).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button - Always Visible */}
        <div className="pt-4 border-brand-secondary/10 ">
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
