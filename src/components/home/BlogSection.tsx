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

// Featured Blog Card Component
const FeaturedBlogCard = ({ post }: { post: Blog }) => (
  <Link href={`/blog/${post._id}`} className="block">
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full">
      {/* Image Section */}
      <div className="relative overflow-hidden h-80">
        <FallbackImage
          src={post.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[var(--color-brand-primary)] text-white px-3 py-1 rounded-full text-xs font-semibold">
            {post.category || "General"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {/* Meta Information */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4 text-[var(--color-brand-primary)]" />
            <span>{post.author?.fullName || "Anonymous"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-[var(--color-brand-primary)]" />
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-[var(--color-brand-primary)] mb-4 font-serif line-clamp-2">
          {post.title}
        </h3>

        {/* Read More Link */}
        <div className="text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]/80 font-semibold cursor-pointer transition-colors duration-300">
          Read more →
        </div>
      </div>
    </div>
  </Link>
);

// Small Blog Card Component
const SmallBlogCard = ({ post }: { post: Blog }) => (
  <Link href={`/blog/${post._id}`} className="block">
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative overflow-hidden h-40">
        <FallbackImage
          src={post.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
          alt={post.title}
          className="w-full h-full object-cover"

        />
        <div className="absolute top-3 left-3">
          <span className="bg-[var(--color-brand-primary)] text-white px-2 py-1 rounded-full text-xs font-semibold">
            {post.category || "General"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Meta Information */}
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3 text-[var(--color-brand-primary)]" />
            <span>{post.author?.fullName || "Anonymous"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-[var(--color-brand-primary)]" />
            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[var(--color-brand-primary)] mb-2 font-serif line-clamp-2">
          {post.title}
        </h3>

        {/* Read More Link */}
        <div className="text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]/80 font-semibold cursor-pointer transition-colors duration-300 text-sm">
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

  // Handle different data scenarios
  const getBlogLayout = () => {
    if (!blogs || blogs.length === 0) return { featuredPost: null, smallPosts: [] };
    
    if (blogs.length === 1) {
      // Single post: show as featured only
      return { featuredPost: blogs[0], smallPosts: [] };
    }
    
    if (blogs.length <= 3) {
      // 2-3 posts: show first as featured, rest as small
      return { featuredPost: blogs[0], smallPosts: blogs.slice(1) };
    }
    
    // 4+ posts: show first as featured, next 4 as small
    return { featuredPost: blogs[0], smallPosts: blogs.slice(1, 5) };
  };

  const { featuredPost, smallPosts } = getBlogLayout();

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-14 bg-white">
        <Container>
          <SectionHeader
            title="Latest Insights"
            description="Stay informed with the latest trends, best practices, and insights from our data experts."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full animate-pulse">
                <div className="h-80 bg-gray-200"></div>
                <div className="p-8">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                    <div className="h-40 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-3 bg-gray-200 rounded mb-3"></div>
                      <div className="h-5 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-14 bg-white">
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
      <section className="py-14 bg-white">
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

  return (
    <section className="py-14 bg-white">
      <Container>
        <SectionHeader
          title="Latest Insights"
          description="Stay informed with the latest trends, best practices, and insights from our data experts."
        />

        {/* Blog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Post */}
          <div className="lg:col-span-1">
            {featuredPost && <FeaturedBlogCard post={featuredPost} />}
          </div>

          {/* Small Posts Grid */}
          <div className="lg:col-span-2">
            {smallPosts.length > 0 ? (
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
                smallPosts.length === 1 ? 'md:grid-cols-1' : ''
              }`}>
                {smallPosts.map((post, index) => (
                  <SmallBlogCard key={post._id || index} post={post} />
                ))}
              </div>
            ) : (
              // Show message when no small posts
              <div className="flex items-center justify-center h-full min-h-[400px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="w-6 h-6 bg-gray-400 rounded"></div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {blogs.length === 1 ? "This is our latest post" : "More posts coming soon"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* View All Articles Button */}
        <div className="text-center flex justify-center">
          <Link href="/blog">
            <Button
              variant="primary"
              size="lg"
              className="flex items-center gap-2"
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