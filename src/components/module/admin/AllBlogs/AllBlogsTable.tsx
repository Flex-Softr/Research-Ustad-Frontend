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
            const foundBlog = blogs.find((blog) =>
              blog.category?._id === selectedCategory
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Blog Preview</span>
              
            </DialogTitle>
          </DialogHeader>

          {selectedBlog && (
            <div className="space-y-6">
              {/* Blog Image */}
              {selectedBlog.imageUrl && (
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedBlog.imageUrl}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Title</h3>
                  <p className="text-gray-700">{selectedBlog.title}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                  <p className="text-gray-700 capitalize">
                    {typeof selectedBlog.category === 'string' 
                      ? selectedBlog.category 
                      : selectedBlog.category?.name || "Uncategorized"
                    }
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
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
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Published Date</h3>
                  <p className="text-gray-700">
                    {formatDate(selectedBlog.publishedDate || selectedBlog.createdAt)}
                  </p>
                </div>
              </div>

              {/* Author Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Author</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <span className="font-medium">Name:</span>{" "}
                      <span className="text-gray-700">
                        {selectedBlog.author?.fullName || "Unknown"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      <span className="text-gray-700">
                        {selectedBlog.author?.email || "Not specified"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Content */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Content</h3>
                <div 
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                />
              </div>

              {/* Statistics */}
             
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm font-medium text-gray-500">Created</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {formatDate(selectedBlog.createdAt)}
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
                    className="bg-green-600 text-white hover:bg-green-700 cursor-pointer"
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
