"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchBlogCategories } from "@/services/blogCategories/blogCategoriesSlice";

interface TableHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  isvalue: string;
  filteredDataLength: number;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  isvalue,
  filteredDataLength,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories: blogCategories, isLoading } = useSelector(
    (state: RootState) => state.blogCategories
  );

  // Fetch blog categories when component mounts
  useEffect(() => {
    if (isvalue === "blog" && blogCategories.length === 0) {
      dispatch(fetchBlogCategories());
    }
  }, [dispatch, isvalue, blogCategories.length]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-md w-full md:w-64"
        />

        {/* Category Filter for Blog */}
        {isvalue === "blog" && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md w-full md:w-48"
            disabled={isLoading}
          >
            <option value="">
              {isLoading ? "Loading categories..." : "All Categories"}
            </option>
            {blogCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <p className="text-gray-600 font-semibold">
        Total Data: {filteredDataLength}
      </p>
    </div>
  );
};
