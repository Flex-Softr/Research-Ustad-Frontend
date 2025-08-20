"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { deleteBlog, fetchAllBlogsForAdmin, updateBlogStatus } from "@/services/blogs/blogsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Pagination from "@/components/shared/Pagination";
import { toast } from "sonner";

// Import reusable components
import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";
import NoDataMessage from "./NoDataMessage";
import BulkActions from "./BulkActions";
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
  isAdmin?: boolean;
}

const AllBlogsTable = ({ onEditBlog, onViewBlog, isAdmin = false }: AllBlogsTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, isLoading, error } = useSelector(
    (state: RootState) => state.blogs
  );
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

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

  // Filter blogs by category and status
  const filterBlogsByStatus = (blogs: Blog[], status: string) => {
    if (status === "all") return blogs;
    return blogs.filter(blog => blog.status === status);
  };

  const filteredBlogsByCategory = filterBlogsByCategory(blogs || [], selectedCategory);
  const filteredBlogs = filterBlogsByStatus(filteredBlogsByCategory, selectedStatus);

  // Get paginated blogs for current page
  const paginatedBlogs = getPaginatedItems(
    filteredBlogs,
    currentPage,
    itemsPerPage
  );

  // Handle approval/rejection
  const handleApproveBlog = async (blog: Blog) => {
    try {
      await dispatch(updateBlogStatus({ id: blog._id!, status: "approved" })).unwrap();
      toast.success("Blog approved successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to approve blog");
    }
  };

  const handleRejectBlog = async (blog: Blog) => {
    try {
      await dispatch(updateBlogStatus({ id: blog._id!, status: "rejected" })).unwrap();
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
          <Button onClick={() => dispatch(fetchAllBlogsForAdmin())} variant="outline">
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
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          totalCount={0}
        />
        <StatusFilter
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          totalCount={0}
          blogs={blogs || []}
        />
        <NoDataMessage
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
    );
  }

  // Show no data message when there are no blogs in the current page/category
  if (!paginatedBlogs || paginatedBlogs.length === 0) {
    return (
      <div className="space-y-6">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          totalCount={filteredBlogs?.length || 0}
        />
        <StatusFilter
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          totalCount={filteredBlogs?.length || 0}
          blogs={blogs || []}
        />
        <NoDataMessage
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
    );
  }

  // Handle bulk selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentPageBlogIds = paginatedBlogs
        .map((blog) => blog._id || "")
        .filter((id) => id !== "");
      setSelectedBlogs(currentPageBlogIds);
    } else {
      setSelectedBlogs([]);
    }
  };

  const handleSelectBlog = (blogId: string, checked: boolean) => {
    if (checked) {
      setSelectedBlogs((prev) => [...prev, blogId]);
    } else {
      setSelectedBlogs((prev) => prev.filter((id) => id !== blogId));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedBlogs.length === 0) return;

    try {
      for (const blogId of selectedBlogs) {
        if (blogId) {
          await dispatch(deleteBlog(blogId)).unwrap();
        }
      }
      toast.success(`${selectedBlogs.length} blog deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete selected blogs");
    }
    // Clear selection and close dialog regardless of success or error
    setSelectedBlogs([]);
    setDeleteDialogOpen(false);
  };

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

  const isAllSelected =
    paginatedBlogs.length > 0 &&
    paginatedBlogs.every((blog) => selectedBlogs.includes(blog._id || ""));

  return (
    <div className="space-y-6">
      {/* Bulk Actions */}
      <BulkActions
        selectedCount={selectedBlogs.length}
        onClearSelection={() => setSelectedBlogs([])}
        onDeleteSelected={handleBulkDelete}
        deleteButtonText="Delete Selected"
        clearButtonText="Clear Selection"
      />

      {/* Blogs Table */}
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              totalCount={filteredBlogs?.length || 0}
            />
            <StatusFilter
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              totalCount={filteredBlogs?.length || 0}
              blogs={blogs || []}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
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
                    isSelected={selectedBlogs.includes(blog._id || "")}
                    onSelect={(checked) =>
                      handleSelectBlog(blog._id || "", checked)
                    }
                    onView={onViewBlog}
                    onEdit={onEditBlog}
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
    </div>
  );
};

export default AllBlogsTable;
