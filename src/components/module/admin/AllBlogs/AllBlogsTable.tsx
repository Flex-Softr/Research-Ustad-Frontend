"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import {
  deleteBlog,
  fetchAllBlogsForAdmin,
  updateBlogStatus,
} from "@/services/blogs/blogsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Pagination from "@/components/shared/Pagination";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Eye } from "lucide-react";

// Import reusable components
// import CategoryFilter from "./CategoryFilter";
import NoDataMessage from "./NoDataMessage";
import BlogTableRow from "./BlogTableRow";
import {
  formatDate,
  getPaginatedItems,
  calculateTotalPages,
  filterBlogsByCategory,
} from "./utils";
// import { formatDate } from "@/lib/dateUtils";
import { Blog } from "@/type";

interface AllBlogsTableProps {
  onEditBlog: (blog: Blog) => void;
  onViewBlog: (blog: Blog) => void;
  onPreviewBlog?: (blog: Blog) => void;
  isAdmin?: boolean;
  searchTerm?: string;
}

const AllBlogsTable = ({
  onEditBlog,
  onViewBlog,
  onPreviewBlog,
  isAdmin = false,
  searchTerm = "",
}: AllBlogsTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, isLoading, error } = useSelector(
    (state: RootState) => state.blogs
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Load blogs data - use admin endpoint if isAdmin is true
  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchAllBlogsForAdmin());
    } else {
      dispatch(fetchAllBlogsForAdmin()); // For now, always use admin endpoint
    }
  }, [dispatch, isAdmin]);

  // Update total pages when blogs change
  useEffect(() => {
    setTotalPages(calculateTotalPages(blogs?.length || 0, itemsPerPage));
  }, [blogs, itemsPerPage]);

  // Filter blogs by search term
  const filterBlogsBySearch = (blogs: Blog[], searchTerm: string) => {
    if (!searchTerm.trim()) return blogs;

    const searchLower = searchTerm.toLowerCase();

    return blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(searchLower) ||
        blog.author?.fullName?.toLowerCase().includes(searchLower) ||
        blog.author?.email?.toLowerCase().includes(searchLower) ||
        blog.category?.name?.toLowerCase().includes(searchLower) ||
        blog.content?.toLowerCase().includes(searchLower)
    );
  };

  const filteredBlogsByCategory = filterBlogsByCategory(
    blogs || [],
    selectedCategory
  );
  const filteredBlogs = filterBlogsBySearch(
    filteredBlogsByCategory,
    searchTerm
  );
  // Get paginated blogs for current page
  const paginatedBlogs = getPaginatedItems(
    filteredBlogs,
    currentPage,
    itemsPerPage
  );

  // Handle approval/rejection
  const handleApproveBlog = async (blog: Blog) => {
    try {
      await dispatch(
        updateBlogStatus({ id: blog._id!, status: "approved" })
      ).unwrap();
      toast.success("Blog approved successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to approve blog");
    }
  };

  const handleRejectBlog = async (blog: Blog) => {
    try {
      await dispatch(
        updateBlogStatus({ id: blog._id!, status: "rejected" })
      ).unwrap();
      toast.success("Blog rejected successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to reject blog");
    }
  };

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading blogs: {error}</p>
          <Button
            onClick={() => dispatch(fetchAllBlogsForAdmin())}
            variant="outline"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="md" variant="border" text="Loading blogs..." />
      </div>
    );
  }

  // Show no blogs message when there are no blogs
  if (!blogs || blogs.length === 0 || !Array.isArray(blogs)) {
    return (
      <div className="space-y-6">
        <NoDataMessage
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
    );
  }

  // Show no data message when there are no blogs in the current page/category
  if (!paginatedBlogs || paginatedBlogs.length === 0) {
    // Get category name for display
    const categoryName =
      selectedCategory !== "all"
        ? (() => {
            const foundBlog = blogs.find(
              (blog) => blog.category?._id === selectedCategory
            );

            if (foundBlog) {
              return foundBlog.category?.name;
            }
            return selectedCategory;
          })()
        : undefined;

    return (
      <div className="space-y-6">
        <NoDataMessage
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categoryName={categoryName}
        />
      </div>
    );
  }

  // Handle individual delete
  const handleDeleteBlog = (blog: Blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (blogToDelete && blogToDelete._id) {
      try {
        await dispatch(deleteBlog(blogToDelete._id)).unwrap();
        toast.success("Blog deleted successfully");
      } catch (error) {
        toast.error("Failed to delete blog");
      }
      setBlogToDelete(null);
    }
    // Always close the dialog, regardless of success or error
    setDeleteDialogOpen(false);
  };

  // Handle preview modal
  const openPreviewModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setPreviewModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="space-y-6">
      {/* Blogs Table */}
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead>Blog</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBlogs.map((blog) => (
                  <BlogTableRow
                    key={blog._id || "temp-key"}
                    blog={blog}
                    onView={onViewBlog}
                    onEdit={onEditBlog}
                    onPreview={openPreviewModal}
                    onDelete={handleDeleteBlog}
                    onApprove={handleApproveBlog}
                    onReject={handleRejectBlog}
                    formatDate={formatDate}
                    isAdmin={isAdmin}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBlogs && filteredBlogs.length > 10 && (
            <div className="mt-6">
              <Pagination
                itemsPerPage={10}
                currentPage={currentPage}
                totalItems={filteredBlogs?.length || 0}
                onPageChange={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Blog"
        itemName={blogToDelete?.title}
        itemType="blog"
      />

      {/* Preview Modal */}
      <Dialog open={previewModalOpen} onOpenChange={setPreviewModalOpen}>
        <DialogContent 
          className="max-w-[70vw] w-[70vw] max-h-[90vh] overflow-y-auto"
          style={{ width: '70vw', maxWidth: '70vw' }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Blog Preview</span>
            </DialogTitle>
          </DialogHeader>

          {selectedBlog && (
            <div className="space-y-6">
              {/* Blog Image */}
              {selectedBlog.imageUrl && (
                <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={selectedBlog.imageUrl}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Basic Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-red-500">*</span>
                      <span className="text-sm font-semibold text-gray-700">Title</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-gray-900">{selectedBlog.title}</p>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-red-500">*</span>
                      <span className="text-sm font-semibold text-gray-700">Category</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-gray-900 capitalize">
                        {typeof selectedBlog.category === "string"
                          ? selectedBlog.category
                          : selectedBlog.category?.name || "Uncategorized"}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">Status</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          selectedBlog.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : selectedBlog.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedBlog.status?.toUpperCase() || "UNKNOWN"}
                      </span>
                    </div>
                  </div>

                  {/* Published Date */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">Posted Date</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-gray-900">
                        {formatDate(
                          selectedBlog.publishedDate || selectedBlog.createdAt
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Author Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Author</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">Name</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-gray-900">
                        {selectedBlog.author?.fullName || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">Email</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-gray-900">
                        {selectedBlog.author?.email || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Content */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Content</h3>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <div
                    className="prose max-w-none text-gray-900 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                  />
                </div>
              </div>

              {/* Created Date */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">Created</h3>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <p className="text-gray-900">
                    {formatDate(selectedBlog.createdAt)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={closePreviewModal}
                  className="cursor-pointer"
                >
                  Close
                </Button>
                {selectedBlog.status === "pending" && (
                  <Button
                    onClick={() => {
                      handleApproveBlog(selectedBlog);
                      closePreviewModal();
                    }}
                    className="bg-brand-primary text-white hover:bg-brand-primary/80 cursor-pointer"
                  >
                    Approve Blog
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllBlogsTable;
