"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import LoadingSpinner from "@/components/ui/loading-spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  FileText,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { deleteBlog, fetchBlogs, Blog } from "@/services/blogs/blogsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import Pagination from "@/components/shared/Pagination";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const AllBlogsTable = ({ onEditBlog, onViewBlog }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, isLoading, error } = useSelector((state: RootState) => state.blogs);
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");



  // Blog categories for filtering
  const blogCategories = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "research", label: "Research" },
    { value: "academic", label: "Academic" },
    { value: "education", label: "Education" },
    { value: "science", label: "Science" },
    { value: "engineering", label: "Engineering" },
    { value: "computer-science", label: "Computer Science" },
    { value: "artificial-intelligence", label: "Artificial Intelligence" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "data-science", label: "Data Science" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "blockchain", label: "Blockchain" },
    { value: "iot", label: "Internet of Things" },
    { value: "cloud-computing", label: "Cloud Computing" },
    { value: "software-development", label: "Software Development" },
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "database", label: "Database" },
    { value: "networking", label: "Networking" },
    { value: "general", label: "General" },
  ];

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Load blogs data
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  console.log("blogsssssssssssssssssssss", blogs)


  // Update total pages when blogs change
  useEffect(() => {
    setTotalPages(Math.ceil((blogs?.length || 0) / itemsPerPage));
  }, [blogs, itemsPerPage]);




  // Get paginated blogs
  const getPaginatedBlogs = () => {
    if (!blogs || blogs.length === 0) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return blogs.slice(startIndex, endIndex);
  };

  // Filter blogs by category
  const getFilteredBlogs = () => {
    if (!blogs) return [];
    if (selectedCategory === "all") {
      return blogs;
    }
    return blogs.filter((blog) => blog.category === selectedCategory);
  };

  const filteredBlogs = getFilteredBlogs();

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
        {/* Category Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Blogs (0)</span>
              <div className="flex items-center gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  {blogCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="w-4 h-4" />
                  <span>0 total blogs</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* No Blogs Message */}
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Blogs Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                {selectedCategory === "all" 
                  ? "There are no blogs in the system yet. Create your first blog to get started!"
                  : `No blogs found in the "${blogCategories.find(cat => cat.value === selectedCategory)?.label}" category.`
                }
              </p>
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => setSelectedCategory("all")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  View All Categories
                </Button>
                <Button 
                  onClick={() => window.location.href = "/admin/dashboard/createblog"}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create First Blog
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Additional safety check for paginatedBlogs
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  if (!paginatedBlogs || paginatedBlogs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="md" variant="border" text="Loading blogs..." />
      </div>
    );
  }

  // Handle bulk selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const currentPageBlogIds = getPaginatedBlogs().map((blog) => blog._id || '').filter(id => id !== '');
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

      setSelectedBlogs([]);
      toast.success(`${selectedBlogs.length} blog(s) deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete selected blogs");
    }
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
    setDeleteDialogOpen(false);
  };
  
  const isAllSelected =
  paginatedBlogs.length > 0 &&
  paginatedBlogs.every((blogs) => selectedBlogs.includes(blogs._id || ""));


  return (
    <div className="space-y-6">
      {/* Bulk Actions */}
      {selectedBlogs.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-yellow-800">
                  {selectedBlogs.length} blog(s) selected
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBlogs([])}
                >
                  Clear Selection
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blogs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Blogs ({filteredBlogs?.length})</span>
            <div className="flex items-center gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                {blogCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>{filteredBlogs?.length || 0} total blogs</span>
              </div>
            </div>
          </CardTitle>
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
                  <TableRow key={blog._id || 'temp-key'}>
                    <TableCell>
                      <Checkbox
                        checked={selectedBlogs.includes(blog._id || '')}
                        onCheckedChange={(checked) =>
                          handleSelectBlog(blog._id || '', checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-8 rounded overflow-hidden">
                          <Image
                            src={blog.imageUrl || "/img/default-blog.jpg"}
                            alt={blog.title || "Blog"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-1">
                            {blog.title || "Untitled"}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {blog.content
                              ?.replace(/<[^>]*>/g, "")
                              .substring(0, 10)}
                            ...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {blog.category || "Uncategorized"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {blog.author?.fullName || "Unknown"}
                        </div>
                        <div className="text-gray-500">
                          {blog.author?.email || "No email"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {formatDate(blog.publishedDate || blog.createdAt)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.status || "Published"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewBlog(blog)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEditBlog(blog)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteBlog(blog)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
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
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{blogToDelete?.title}"? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllBlogsTable;
