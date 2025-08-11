"use client";
import { useEffect, useState } from "react";
import BlogCard from "./blog/BlogCard";
import BlogCardSkeleton from "./blog/BlogCardSkeleton";
import { TPost } from "@/type";
import { Filter, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/shared/Pagination";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchBlogs } from "@/services/blogs/blogsSlice";

// Define the API response structure
interface BlogApiResponse {
  success: boolean;
  message: string;
  data: {
    blogs: TPost[];
  };
}

interface Category {
  id: string;
  name: string;
  count: number;
}

const BlogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, isLoading, error } = useSelector(
    (state: RootState) => state.blogs
  );


  console.log('blogsssssssss', blogs)
  const [errors, setError] = useState<string | null>(null);
  const [data, setData] = useState<TPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(6); // Number of items per page

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);


  // Dynamic categories based on actual blog data
  const [categories, setCategories] = useState<Category[]>([
    { id: "all", name: "All Posts", count: 0 },
  ]);


  const fetchPaginatedData = async (page: number, category: string = "all") => {
    setLoading(true);
    setError(null);

    try {
      // Use blogs from Redux
      const allData = blogs as TPost[]; // safely cast based on structure you confirmed

      // Filter by category
      const filteredData =
        category === "all"
          ? allData
          : allData.filter(
              (post) => post.category?.toLowerCase() === category.toLowerCase()
            );

      // Pagination
      const total = filteredData.length;
      const totalPages = Math.ceil(total / itemsPerPage);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      // Update states
      setData(paginatedData);
      setTotalPages(totalPages);
      setTotalItems(total);
      setCurrentPage(page);

      // Update category counts
      const categoryCounts: { [key: string]: number } = {};
      allData.forEach((post) => {
        const category = post.category?.toLowerCase() || "uncategorized";
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });

      const dynamicCategories: Category[] = [
        { id: "all", name: "All Posts", count: allData.length },
        ...Object.entries(categoryCounts).map(([id, count]) => ({
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, " "),
          count,
        })),
      ];

      setCategories(dynamicCategories);
    } catch (error) {
      console.error("Error fetching paginated data:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch blogs"
      );
      setData([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (blogs.length > 0) {
      fetchPaginatedData(currentPage, selectedCategory);
    }
  }, [blogs, currentPage, selectedCategory]);
  

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

  // Handle retry
  const handleRetry = () => {
    fetchPaginatedData(currentPage, selectedCategory);
  };

  return (
    <>
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Blog",
          },
        ]}
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
                  {categories.map((category) => (
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

              {/* Error State */}
              {error && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="h-12 w-12 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Something went wrong
                  </h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Blog Grid */}
              {!error && (
                <>
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
                      {totalPages > 1 && (
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          totalItems={totalItems}
                          itemsPerPage={itemsPerPage}
                          onPageChange={handlePageChange}
                          className="mt-12"
                        />
                      )}
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
                        {selectedCategory === "all"
                          ? "No blog posts are available at the moment."
                          : "Try selecting a different category."}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
