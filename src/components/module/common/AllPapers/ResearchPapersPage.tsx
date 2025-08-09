"use client";

import { useState, useMemo, useEffect } from "react";
import { FilterState, ResearchPapersPageProps, TPapers } from "@/type";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Pagination from "@/components/shared/Pagination";
import FilterSidebar from "./FilterSidebar";
import PapersTable from "./PapersTable";

const ResearchPapersPage = ({
  papers: propPapers,
}: ResearchPapersPageProps) => {
  const [papers, setPapers] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    status: "all",
    year: "all",
    paperType: "all",
  });

  // Load papers data
  useEffect(() => {
    const loadPapers = async () => {
      try {
        // If papers are provided as props, use them
        if (propPapers && propPapers.length > 0) {
          setPapers(propPapers);
          setLoading(false);
          return;
        }

        // Otherwise, load from JSON file
        const response = await fetch("/json/research-papers.json");
        const data = await response.json();
        setPapers(data.papers || []);
      } catch (error) {
        console.error("Failed to load papers:", error);
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    loadPapers();
  }, [propPapers]);

  // Use papers state
  const papersData = papers;

  // Filter papers based on search and filters
  const filteredPapers = useMemo(() => {
    return papersData.filter((paper) => {
      // Search filter
      const searchMatch =
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.some((author) =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        paper.journal.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const categoryMatch =
        filters.category === "all" || paper.researchArea === filters.category;

      // Status filter (ongoing/published based on isApproved)
      const statusMatch =
        filters.status === "all" ||
        (filters.status === "published" && paper.isApproved) ||
        (filters.status === "ongoing" && !paper.isApproved);

      // Year filter
      const yearMatch =
        filters.year === "all" || paper.year.toString() === filters.year;

      // Paper type filter
      const paperTypeMatch =
        filters.paperType === "all" || paper.paperType === filters.paperType;

      return (
        searchMatch &&
        categoryMatch &&
        statusMatch &&
        yearMatch &&
        paperTypeMatch
      );
    });
  }, [papersData, searchQuery, filters]);

  // Paginate filtered papers
  const paginatedPapers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPapers.slice(startIndex, endIndex);
  }, [filteredPapers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredPapers.length / itemsPerPage);

  // Handle filter changes
  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: "all",
      status: "all",
      year: "all",
      paperType: "all",
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading research papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Research Papers",
          },
        ]}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <FilterSidebar
            papers={papersData}
            filters={filters}
            searchQuery={searchQuery}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onClearFilters={clearFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">
                  Research Papers
                </h2>
                <span className="px-3 py-1 bg-brand-secondary/10 text-brand-secondary rounded-full text-sm font-semibold">
                  {filteredPapers.length} papers
                </span>
              </div>
            </div>

            {/* Papers Table */}
            <PapersTable papers={paginatedPapers} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredPapers.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPapersPage;
