"use client";

import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import AllBlogsTable from "./AllBlogsTable";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchAllBlogsForAdmin } from "@/services/blogs/blogsSlice";
import { Button } from "@/components/ui/core";

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  author: {
    fullName: string;
    email: string;
  };
  publishedDate: string;
  createdAt: string;
  updatedAt: string;
  status: "pending" | "approved" | "rejected";
  views?: number;
  likes?: number;
}

const AllBlogs = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load all blogs for admin (including pending and rejected)
    dispatch(fetchAllBlogsForAdmin());
  }, [dispatch]);

  const handleEditBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
    router.push(`/admin/dashboard/editblog/${blog._id}`);
  };

  const handleViewBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsViewModalOpen(true);
    // Navigate to view page
    router.push(`/blog/${blog._id}`);
  };

  const handlePreviewBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsViewModalOpen(true);
  };

  const handleCreateBlog = () => {
    setSelectedBlog(null);
    setIsEditModalOpen(true);
    // Navigate to create blog page
    router.push("/admin/dashboard/createblog");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Blogs</h1>
          <p className="text-gray-600">
            Manage all blogs in the system (including pending approvals)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={handleCreateBlog}>
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search blogs by title, author, or category..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 py-3 border-gray-300 rounded-lg"
        />
      </div>

      {/* Table */}
      <AllBlogsTable
        onEditBlog={handleEditBlog}
        onViewBlog={handleViewBlog}
        onPreviewBlog={handlePreviewBlog}
        isAdmin={true}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default AllBlogs;
