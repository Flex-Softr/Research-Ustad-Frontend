"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchUserBlogs, deleteBlog } from "@/services/blogs/blogsSlice";
import { Blog } from "@/type";
import { toast } from "sonner";
import LoadingSpinner from "@/components/ui/loading-spinner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { GetMe } from "@/services/singleUser";

const MyAllBlog = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, isLoading, error } = useSelector(
    (state: RootState) => state.blogs
  );
  const [user, setUser] = useState<any>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);

  // Determine if user is admin or regular user
  const isAdmin = user?.role === "admin" || user?.role === "superAdmin";
  const basePath = isAdmin ? "/admin/dashboard" : "/user/dashboard";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await GetMe();
        setUser(result?.data || null);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    dispatch(fetchUserBlogs());
  }, [dispatch]);

  const handleCreateBlog = () => {
    router.push(`${basePath}/createblog`);
  };

  const handleEditBlog = (blog: Blog) => {
    router.push(`${basePath}/createblog?edit=true&id=${blog._id}`);
  };

  const handleViewBlog = (blog: Blog) => {
    router.push(`/blog/${blog._id}`);
  };

  const handleDeleteBlog = (blog: Blog) => {
    setBlogToDelete(blog);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        await dispatch(deleteBlog(blogToDelete._id!)).unwrap();
        toast.success("Blog deleted successfully");
        setDeleteDialogOpen(false);
        setBlogToDelete(null);
      } catch (error: any) {
        toast.error(error.message || "Failed to delete blog");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge
            variant="default"
            className="flex items-center gap-1 bg-green-100 text-green-800"
          >
            <CheckCircle className="w-3 h-3" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading blogs: {error}</p>
          <Button onClick={() => dispatch(fetchUserBlogs())} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner
          size="md"
          variant="border"
          text="Loading your blogs..."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isAdmin ? "My Admin Blogs" : "My Blogs"}
          </h1>
          <p className="text-gray-600">
            {isAdmin
              ? "Manage your admin blog posts"
              : "Manage your blog posts"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateBlog}>
            <Plus className="w-4 h-4 mr-2" />
            Create Blog
          </Button>
        </div>
      </div>

      {/* Blog Table */}
      {blogs && blogs.length > 0 ? (
        <Card>
          <CardContent className="px-5">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Blog</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Created Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow key={blog._id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-8 rounded overflow-hidden">
                            <Image
                              src={blog.imageUrl || "/img/default-blog.jpg"}
                              alt={blog.title || "Blog"}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 line-clamp-1 max-w-[200px]">
                              {blog.title?.length > 30
                                ? `${blog.title.substring(0, 30)}...`
                                : blog.title || "Untitled"}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-2 max-w-[200px]">
                              {blog.content
                                ?.replace(/<[^>]*>/g, "")
                                .substring(0, 50)}
                              ...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {blog.category || "Uncategorized"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {formatDate(
                            blog.createdAt || blog.publishedDate || ""
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(blog.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {/* Only show View button for approved blogs */}
                            {blog.status === "approved" && (
                              <DropdownMenuItem
                                onClick={() => handleViewBlog(blog)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleEditBlog(blog)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setTimeout(() => handleDeleteBlog(blog), 0);
                              }}
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
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Blogs Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md">
                You haven't created any blogs yet. Start sharing your thoughts
                and ideas!
              </p>
              <Button
                onClick={handleCreateBlog}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Your First Blog
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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

export default MyAllBlog;
