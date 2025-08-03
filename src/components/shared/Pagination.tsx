"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = "",
}) => {
  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Calculate start and end items for display
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Items Info */}
      <div className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} items
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100">
        {/* First Page */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          title="First page"
        >
          <ChevronsLeft className="w-4 h-4 text-gray-600" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {generatePageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPage === page
                  ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Page */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          title="Last page"
        >
          <ChevronsRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Page Info */}
      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
