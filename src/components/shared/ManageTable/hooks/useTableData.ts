"use client";

import { useState, useEffect } from "react";

interface Column {
  label: string;
  value: string;
}

interface DataItem {
  _id: string;
  [key: string]: any;
}

interface UseTableDataProps {
  data: DataItem[];
  columns: Column[];
  isvalue: string;
  itemsPerPage?: number;
}

export const useTableData = ({
  data,
  columns,
  isvalue,
  itemsPerPage = 10,
}: UseTableDataProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter data based on search term and category
  const filteredData = data?.filter((item) => {
    const matchesSearch = columns.some((column) =>
      column.value
        .split(".")
        .reduce((o: any, k: string) => (o?.[k] ? o[k] : ""), item)
        ?.toString()
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    // Filter by category for blog items
    if (isvalue === "blog" && selectedCategory !== "all") {
      const matchesCategory = item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }

    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when search term or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    selectedCategory,
    setSelectedCategory,
    filteredData,
    paginatedData,
    totalPages,
  };
};
