import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Tag } from "lucide-react";
import { TeamMember } from "../../components";
import FallbackImage from "@/components/shared/FallbackImage";
import Link from "next/link";

interface BlogsProps {
  member: TeamMember;
  paginatedData?: any[];
}

const Blogs = ({ member, paginatedData }: BlogsProps) => {
  // Use paginated data if provided, otherwise use member.blogs
  const blogs = paginatedData || member.blogs || [];

  if (blogs.length === 0) {
    return (
      <Card className="rounded-none border-0">
        <CardContent className="py-12">
          <div className="text-center">
            <svg
              className="h-12 w-12 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Blog Posts
            </h3>
            <p className="text-gray-600">No blog posts at the moment.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-none border-0">
      <CardContent className="">
        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <div
              key={blog._id || blog.id || index}
              className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Blog Content */}
                <div className="flex-1">
                  <div className="mb-3">
                    <Link
                      href={`/blog/${blog._id || blog.id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-brand-secondary hover:underline transition-colors cursor-pointer"
                    >
                      {blog.title}
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {blog.publishedDate
                          ? new Date(blog.publishedDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "Date not available"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      <span className="capitalize">
                        {blog.category || "Uncategorized"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Blogs;
