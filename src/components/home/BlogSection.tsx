"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchBlogs } from "@/services/blogs/blogsSlice";
import { Button } from "@/components/ui/core";
import { ArrowRight, Calendar, Star, User } from "lucide-react";
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
            {post.category || "General"}
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

const BlogSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, isLoading, error } = useSelector(
    (state: RootState) => state.blogs
  );

  // Fetch blogs on component mount
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
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
  }

  // Show error state
  if (error) {
    return (
      <section className="py-16 bg-white">
        <Container>
          <SectionHeader
            title="Latest Insights"
            description="Stay informed with the latest trends, best practices, and insights from our data experts."
          />
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-red-500 rounded"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Failed to load blogs
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button
              variant="primary"
              onClick={() => dispatch(fetchBlogs())}
            >
              Try Again
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  // Show empty state
  if (!blogs || blogs.length === 0) {
    return (
      <section className="py-16 bg-white">
        <Container>
          <SectionHeader
            title="Latest Insights"
            description="Stay informed with the latest trends, best practices, and insights from our data experts."
          />
          <div className="text-center py-16">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No blog posts available
            </h3>
            <p className="text-gray-600">
              Check back later for new insights and articles.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  // Get only 3 blogs
  const displayBlogs = blogs.slice(0, 3);

  return (
    <section className="py-16 bg-white">
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