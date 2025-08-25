"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchBlogs } from "@/services/blogs/blogsSlice";
import { Button } from "@/components/ui/core";
import { ArrowRight, Calendar, Star, User, AlertCircle } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/core";
import FallbackImage from "../shared/FallbackImage";
import { Blog } from "@/type";
import Link from "next/link";

// Simple Blog Card Component
const BlogCard = ({ post }: { post: Blog }) => (
  <Link href={`/blog/${post._id}`} className="block">
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48">
        <FallbackImage
          src={post.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-brand-primary text-white px-2 py-1 rounded text-xs">
            {typeof post.category === 'string' 
              ? post.category 
              : post.category?.name || "General"
            }
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <User className="h-3 w-3" />
          <span>{post.author?.fullName || "Anonymous"}</span>
          <span>•</span>
          <Calendar className="h-3 w-3" />
          <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>

        <div className="text-brand-primary font-medium text-sm">
          Read more →
        </div>
      </div>
    </div>
  </Link>
);

// Error state component
const ErrorState = ({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) => (
  <section className="py-20 bg-white">
    <Container>
      <div className="text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-brand-primary mb-2">
          Failed to load blogs
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button variant="primary" onClick={onRetry}>
          Try Again
        </Button>
      </div>
    </Container>
  </section>
);

// Loading state component
const LoadingState = () => (
  <section className="py-20 bg-white">
    <Container>
      <SectionHeader
        title="Latest Insights"
        description="Stay informed with the latest trends, best practices, and insights from our data experts."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

// Empty state component
const EmptyState = () => (
  <section className="py-20 bg-white">
    <Container>
      <div className="text-center">
        <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-brand-primary mb-2">
          No blog posts available
        </h3>
        <p className="text-gray-600">Check back later for new insights and articles!</p>
      </div>
    </Container>
  </section>
);

const BlogSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, isLoading, error } = useSelector(
    (state: RootState) => state.blogs
  );

  // Fetch blogs on component mount
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={() => dispatch(fetchBlogs())} />;
  }

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // No blogs state
  if (!blogs || blogs.length === 0) {
    return <EmptyState />;
  }

  // Get only 3 blogs
  const displayBlogs = blogs.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader
          title="Latest Insights"
          description="Stay informed with the latest trends, best practices, and insights from our data experts."
        />

        {/* Blog Grid - Only 3 items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {displayBlogs.map((post, index) => (
            <BlogCard key={post._id || index} post={post} />
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button
              variant="primary"
              size="lg"
              className="flex items-center gap-2 mx-auto"
            >
              View All Articles
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default BlogSection;