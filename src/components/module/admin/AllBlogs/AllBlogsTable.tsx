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
import { deleteBlog, fetchBlogs } from "@/services/blogs/blogsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Pagination from "@/components/shared/Pagination";
import { toast } from "sonner";

// Import reusable components
import CategoryFilter from "./CategoryFilter";
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

const AllBlogsTable = ({ onEditBlog, onViewBlog }: any) => {
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

  // Load blogs data
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Update total pages when blogs change
  useEffect(() => {
    setTotalPages(calculateTotalPages(blogs?.length || 0, itemsPerPage));
  }, [blogs, itemsPerPage]);

  // Filter blogs by category
  const filteredBlogs = filterBlogsByCategory(blogs || [], selectedCategory);

  // Get paginated blogs for current page
  const paginatedBlogs = getPaginatedItems(
    filteredBlogs,
    currentPage,
    itemsPerPage
  );

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading blogs: {error}</p>
          <Button onClick={() => dispatch(fetchBlogs())} variant="outline">
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
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            totalCount={filteredBlogs?.length || 0}
          />
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
                    formatDate={formatDate}
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
