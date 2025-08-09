"use client";

import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchSingleBlog, fetchBlogs } from "@/services/blogs/blogsSlice";
import {
  Calendar,
  User,
  Tag,
  BookOpen,
  ArrowLeft,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Blog } from "@/type";

function SingleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dispatch = useDispatch<AppDispatch>();
  const { blog, blogs, isLoading, error } = useSelector(
    (state: RootState) => state.blogs
  );
  const [post, setPost] = useState<Blog | null>(null);
  const [latestPosts, setLatestPosts] = useState<Blog[]>([]);

  // Fetch single blog
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleBlog(id));
    }
  }, [id, dispatch]);

  // Fetch all blogs for latest posts sidebar
  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [blogs, dispatch]);

  console.log("bloghjhjgh", blog);

  // Update post state when blog from Redux changes
  useEffect(() => {
    if (blog && blog._id === id) {
      setPost(blog);
    }
  }, [blog, id]);

  // Load latest posts for sidebar
  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const latest = blogs
        .filter((blog) => blog._id !== id)
        .sort(
          (a, b) =>
            new Date(b.publishedDate || b.createdAt).getTime() -
            new Date(a.publishedDate || a.createdAt).getTime()
        )
        .slice(0, 5);
      setLatestPosts(latest);
    }
  }, [blogs, id]);

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  if (isLoading && !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Breadcrumb Skeleton */}
        <div className="w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-6 bg-white/20 rounded w-48"></div>
            </div>
          </div>
        </div>
        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="animate-pulse space-y-8">
                <div className="h-96 bg-gray-300 rounded-2xl"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-80">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-300 rounded w-32"></div>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-20 bg-gray-300 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Blog Post Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error ||
              "The blog post you're looking for doesn't exist or has been removed."}
          </p>
          <div className="space-y-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white px-6 py-3 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Blog",
            href: "/blog",
          },
          {
            label: post.title,
            current: false,
          },
        ]}
      />

      {/* Main Content - Full Width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Hero Section */}
            <div className="mb-12">
              {/* Category Badge */}
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-flex items-center gap-2 bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary px-4 py-2 rounded-full text-sm font-medium">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedDate || post.createdAt)}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={
                      post.author.image ||
                      "https://image.shutterstock.com/image-vector/default-avatar-profile-icon-grey-260nw-767771863.jpg"
                    }
                    alt={post.author?.fullName || "Author"}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://image.shutterstock.com/image-vector/default-avatar-profile-icon-grey-260nw-767771863.jpg";
                    }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {post.author?.fullName || "Unknown Author"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {post.author?.designation || "Author"}
                  </p>
                  {post.author?.email && (
                    <p className="text-xs text-gray-400">{post.author.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.imageUrl && (
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/default-blog-image.jpg";
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            )}

            {/* Article Content */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-10 shadow-2xl border border-gray-100 mb-12 relative overflow-hidden">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10">
                {post.content ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.content,
                    }}
                    className="blog-content"
                  />
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <BookOpen className="h-10 w-10 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No Content Available
                    </h3>
                    <p className="text-gray-500">
                      This blog post doesn't have any content yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Latest Posts */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-brand-secondary" />
                <h3 className="text-lg font-bold text-gray-900">
                  Latest Posts
                </h3>
              </div>

              <div className="">
                {latestPosts.length > 0 ? (
                  latestPosts.map((latestPost) => (
                    <Link
                      key={latestPost._id}
                      href={`/blog/${latestPost._id}`}
                      className="group block"
                    >
                      <div className="bg-gray-50 hover:bg-gray-100 rounded-xl p-2 transition-all duration-300 group-hover:shadow-md">
                        <div className="flex items-start gap-3">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={
                                latestPost.imageUrl || "/default-blog-image.jpg"
                              }
                              fill
                              sizes="64px"
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              alt={latestPost.title}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/default-blog-image.jpg";
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs bg-brand-secondary/10 text-brand-secondary px-2 py-1 rounded-full">
                                {latestPost.category}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(
                                  latestPost.publishedDate ||
                                    latestPost.createdAt
                                )}
                              </span>
                            </div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-brand-secondary transition-colors duration-300 text-sm line-clamp-2 leading-tight">
                              {latestPost.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">
                      No other posts available
                    </p>
                  </div>
                )}
              </div>

              {/* View All Posts Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/blog"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  View All Posts
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBlogPage;
