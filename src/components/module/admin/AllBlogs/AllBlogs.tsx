"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";
import AllBlogsTable from "./AllBlogsTable";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchAllBlogsForAdmin } from "@/services/blogs/blogsSlice";

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

  const handleCreateBlog = () => {
    setSelectedBlog(null);
    setIsEditModalOpen(true);
    // Navigate to create blog page
    router.push("/admin/dashboard/createblog");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Blogs</h1>
          <p className="text-gray-600">Manage all blogs in the system (including pending approvals)</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateBlog}>
            <Plus className="w-4 h-4 mr-2" />
            Add Blog
          </Button>
        </div>
      </div>

      {/* Table */}
      <AllBlogsTable
        onEditBlog={handleEditBlog}
        onViewBlog={handleViewBlog}
        isAdmin={true}
      />

      {/* TODO: Add Edit/View Modals here */}
      {/* These will be implemented as separate components */}
    </div>
  );
};

export default AllBlogs;
