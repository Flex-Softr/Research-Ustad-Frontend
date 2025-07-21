"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

interface FilterState {
  category: string;
  status: string;
  year: string;
  journalType: string;
}

interface FilterSidebarProps {
  papers: any[];
  filters: FilterState;
  searchQuery: string;
  onFilterChange: (filterType: keyof FilterState, value: string) => void;
  onSearch: (query: string) => void;
  onClearFilters: () => void;
}

const FilterSidebar = ({
  papers,
  filters,
  searchQuery,
  onFilterChange,
  onSearch,
  onClearFilters,
}: FilterSidebarProps) => {
  // Extract unique values for filters
  const categories = [
    "all",
    ...new Set(papers.map((paper) => paper.journalRank)),
  ];

  const years = [
    "all",
    ...new Set(papers.map((paper) => paper.year.toString())),
  ].sort((a, b) => parseInt(b) - parseInt(a));

  const journalTypes = [
    "all",
    ...new Set(papers.map((paper) => paper.journalType)),
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
                count: papers.filter((p) => p.isApproved).length,
              },
              {
                id: "ongoing",
                name: "Ongoing",
                count: papers.filter((p) => !p.isApproved).length,
              },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange("status", filter.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
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
          <h4 className="font-semibold text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.slice(0, 5).map((category) => (
              <button
                key={category}
                onClick={() => onFilterChange("category", category)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                  filters.category === category
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span className="font-medium">
                  {category === "all" ? "All Categories" : category}
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
                    : papers.filter((p) => p.journalRank === category).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Year Filter */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Year</h4>
          <div className="space-y-2">
            {years.slice(0, 6).map((year) => (
              <button
                key={year}
                onClick={() => onFilterChange("year", year)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
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

        {/* Journal Type Filter */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Journal Type</h4>
          <div className="space-y-2">
            {journalTypes.slice(0, 5).map((type) => (
              <button
                key={type}
                onClick={() => onFilterChange("journalType", type)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                  filters.journalType === type
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span className="font-medium">
                  {type === "all" ? "All Types" : type}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    filters.journalType === type
                      ? "bg-white/20 text-white"
                      : "bg-brand-secondary/10 text-brand-secondary"
                  }`}
                >
                  {type === "all"
                    ? papers.length
                    : papers.filter((p) => p.journalType === type).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(filters.category !== "all" ||
          filters.status !== "all" ||
          filters.year !== "all" ||
          filters.journalType !== "all" ||
          searchQuery) && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="w-full border-brand-secondary/30 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-all duration-300"
          >
            Clear All Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
