import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Eye, Heart, Clock } from "lucide-react";
import { TeamMember } from "../../components";

interface BlogsProps {
  member: TeamMember;
}

const Blogs = ({ member }: BlogsProps) => {
  if (!member.blogs || member.blogs.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-none border-0">
      {/* <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <svg
            className="h-6 w-6 text-brand-secondary"
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
          Blog Posts ({member.blogs.length})
        </CardTitle>
      </CardHeader> */}
      <CardContent className="">
        <div className="space-y-4">
          {member.blogs.map((blog, index) => (
            <div
              key={blog.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-brand-secondary transition-colors">
                    {blog.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{blog.publishedDate}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{blog.readTime}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{blog.views.toLocaleString()} views</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{blog.likes} likes</span>
                    </div>

                    <Badge
                      variant="outline"
                      className={
                        blog.status === "Published"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }
                    >
                      {blog.status}
                    </Badge>
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
