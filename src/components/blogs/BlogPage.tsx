"use client";
import { useEffect, useState } from "react";
import BlogCard from "./blog/BlogCard";
import BlogCardSkeleton from "./blog/BlogCardSkeleton";
import { GetAllBlog } from "@/services/blogs";
import { TPost } from "@/type";
import { Filter, TrendingUp } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/shared/Pagination";
import Breadcrumb from "@/components/shared/Breadcrumb";

const BlogPage = () => {
  const [data, setData] = useState<TPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(6); // Number of items per page

  // Sample categories - you can replace with actual categories from your data
  const categories = [
    { id: "all", name: "All Posts", count: 0 },
    { id: "technology", name: "Technology", count: 12 },
    { id: "research", name: "Research", count: 8 },
    { id: "education", name: "Education", count: 15 },
    { id: "science", name: "Science", count: 6 },
    { id: "innovation", name: "Innovation", count: 9 },
    { id: "academic", name: "Academic", count: 11 },
  ];

  // Function to load demo data from JSON file
  const loadDemoData = async (): Promise<TPost[]> => {
    try {
      const response = await fetch("/json/blog-demo-data.json");
      const jsonData = await response.json();
      return jsonData.blogs || [];
    } catch (error) {
      console.error("Error loading demo data:", error);
      return [];
    }
  };

  // Function to fetch paginated data from server
  const fetchPaginatedData = async (page: number, category: string = "all") => {
    setLoading(true);
    try {
      // If you have a paginated API endpoint, use it here
      // const response = await GetAllBlog({ page, limit: itemsPerPage, category });

      // For now, we'll simulate server-side pagination with demo data
      const allData = await loadDemoData();

      // Filter by category
      const filteredData =
        category === "all"
          ? allData
          : allData.filter((post) => post.category?.toLowerCase() === category);

      // Calculate pagination
      const total = filteredData.length;
      const totalPages = Math.ceil(total / itemsPerPage);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      setData(paginatedData);
      setTotalPages(totalPages);
      setTotalItems(total);
      setCurrentPage(page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching paginated data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaginatedData(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

  // Update category counts
  const updatedCategories = categories.map((cat) => ({
    ...cat,
    count: cat.id === "all" ? totalItems : 0, // This will be updated when we have real category counts
  }));

  return (
    <>
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Blog",
            current: true,
          },
        ]}
        className="py-8"
      />

      {/* Main Content Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-brand-secondary" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Categories
                  </h3>
                </div>

                <div className="space-y-2">
                  {updatedCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          selectedCategory === category.id
                            ? "bg-white/20 text-white"
                            : "bg-brand-secondary/10 text-brand-secondary"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Popular Tags */}
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-gray-700 mb-4">
                    Popular Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Research",
                      "Technology",
                      "Education",
                      "Innovation",
                      "Science",
                      "Academic",
                    ].map((tag) => (
                      <button
                        key={tag}
                        className="px-3 py-1 bg-gray-100 hover:bg-brand-secondary/10 text-gray-600 hover:text-brand-secondary rounded-full text-xs font-medium transition-all duration-300"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Posts</span>
                      <span className="font-semibold text-gray-900">
                        {totalItems}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Categories</span>
                      <span className="font-semibold text-gray-900">
                        {categories.length - 1}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Current Page
                      </span>
                      <span className="font-semibold text-gray-900">
                        {currentPage} of {totalPages}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedCategory === "all"
                      ? "All Posts"
                      : categories.find((c) => c.id === selectedCategory)?.name}
                  </h2>
                  <span className="px-3 py-1 bg-brand-secondary/10 text-brand-secondary rounded-full text-sm font-semibold">
                    {totalItems} posts
                  </span>
                </div>

                {selectedCategory !== "all" && (
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className="text-brand-secondary hover:text-brand-primary font-medium transition-colors duration-300"
                  >
                    View All
                  </button>
                )}
              </div>

              {/* Blog Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Array.from({ length: itemsPerPage }).map((_, index) => (
                    <BlogCardSkeleton key={index} />
                  ))}
                </div>
              ) : data?.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.map((post) => (
                      <BlogCard key={post._id} post={post} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    className="mt-12"
                  />
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Filter className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No posts found
                  </h3>
                  <p className="text-gray-600">
                    Try selecting a different category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
