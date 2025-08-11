import { TPost } from "@/type";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

const BlogCard = ({ post }: { post: TPost }) => {
  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  // Clean content for preview
  const getContentPreview = (content: string) => {
    if (!content) return "No content available";
    const cleanContent = content.replace(/<[^>]*>/g, '').trim();
    return cleanContent.length > 120 ? cleanContent.slice(0, 120) + "..." : cleanContent;
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      <div className="relative overflow-hidden">
        {/* Blog Image */}
        <Image
          className="object-cover object-center w-full h-64 lg:h-80 group-hover:scale-105 transition-transform duration-300"
          src={post.imageUrl || "/default-blog-image.jpg"}
          alt={post.title || "Blog post"}
          width={500}
          height={320}
          onError={(e) => {
            // Fallback to default image on error
            const target = e.target as HTMLImageElement;
            target.src = "/default-blog-image.jpg";
          }}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {post.category || "Blog"}
          </span>
        </div>

        {/* Published Date */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(post.publishedDate || post.createdAt)}</span>
          </div>
        </div>

        {/* Author Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
          <div className="flex items-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
              <Image
                className="object-cover"
                src={post?.author?.image || "/default-avatar.png"}
                alt={post.author?.fullName || "Author"}
                fill
                sizes="40px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/default-avatar.png";
                }}
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-white">
                {post.author?.fullName || "Unknown Author"}
              </h3>
              <p className="text-xs text-gray-200">
                {post.author?.designation || "Author"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 group-hover:text-brand-primary transition-colors duration-300 mb-3 line-clamp-2">
          {post.title || "Untitled Post"}
        </h2>

        <div className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mb-4 group-hover:w-20 transition-all duration-300"></div>

        {/* Meta Information */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author?.fullName || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedDate || post.createdAt)}</span>
          </div>
        </div>

        {/* Read More Button */}
        <Link
          href={`/blog/${post._id}`}
          className="inline-flex items-center text-brand-primary hover:text-brand-secondary font-semibold group-hover:translate-x-1 transition-all duration-300"
        >
          Read more
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/0 to-brand-secondary/0 group-hover:from-brand-primary/5 group-hover:to-brand-secondary/5 transition-all duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
};

export default BlogCard;
