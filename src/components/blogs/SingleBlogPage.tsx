"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "../ui/card";
import { SingleBlog } from "@/services/blogs";
import { TPost } from "@/type";
import {
  Calendar,
  User,
  Tag,
  Share2,
  Heart,
  MessageCircle,
  BookOpen,
  ArrowLeft,
  Clock,
  Eye,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/shared/Breadcrumb";

function BlogDetailsPage({ id }: { id: string }) {
  const [post, setPost] = useState<TPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [latestPosts, setLatestPosts] = useState<TPost[]>([]);

  // Function to load demo data from JSON file
  const loadDemoData = async (): Promise<TPost[]> => {
    try {
      const response = await fetch("/json/blog-demo-data.json");
      const jsonData = await response.json();
      return jsonData.blogs || [];
    } catch (error) {
      console.error("Error loading demo data:", error);
      return [];
    }
  };

  // Function to find blog post by ID
  const findBlogById = async (blogId: string) => {
    try {
      // First try to get from API
      const apiResponse = await SingleBlog(blogId);
      if (apiResponse?.data) {
        return apiResponse.data;
      }
    } catch (apiError) {
      console.log("API call failed, trying demo data...");
    }

    // If API fails or returns no data, try demo data
    try {
      const allBlogs = await loadDemoData();
      const foundBlog = allBlogs.find((blog) => blog._id === blogId);
      return foundBlog || null;
    } catch (demoError) {
      console.error("Error loading demo data:", demoError);
      return null;
    }
  };

  // Function to load latest posts for sidebar
  const loadLatestPosts = async () => {
    try {
      const allBlogs = await loadDemoData();
      // Get latest 5 posts, excluding current post
      const latest = allBlogs
        .filter((blog) => blog._id !== id)
        .sort(
          (a, b) =>
            new Date(b.publishedDate).getTime() -
            new Date(a.publishedDate).getTime()
        )
        .slice(0, 5);
      setLatestPosts(latest);
    } catch (error) {
      console.error("Error loading latest posts:", error);
    }
  };

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (id) {
        setLoading(true);
        try {
          const blogPost = await findBlogById(id);
          if (blogPost) {
            setPost(blogPost);
            setError("");
          } else {
            setError("Blog post not found");
          }
        } catch (err) {
          console.error("Error fetching blog post:", err);
          setError("Failed to load blog post");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBlogPost();
    loadLatestPosts();
  }, [id]);

  if (loading) {
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
            <p className="text-sm text-gray-500">
              Available blog IDs: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
            </p>
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
        className="py-8"
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
                  {new Date(post.publishedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-4xl">
                {post.shortDescription}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={post.author?.image || "/default-avatar.png"}
                    alt={post.author?.fullName || "Author"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {post.author?.fullName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {post.author?.designation}
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
              <Image
                src={post.image || "/default-blog-image.jpg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div
                dangerouslySetInnerHTML={{
                  __html: post.shortDescription || "",
                }}
              ></div>
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

              <div className="space-y-4">
                {latestPosts.map((latestPost) => (
                  <Link
                    key={latestPost._id}
                    href={`/blog/${latestPost._id}`}
                    className="group block"
                  >
                    <div className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-300 group-hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={latestPost.image}
                            alt={latestPost.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-brand-secondary/10 text-brand-secondary px-2 py-1 rounded-full">
                              {latestPost.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(
                                latestPost.publishedDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-brand-secondary transition-colors duration-300 text-sm line-clamp-2 leading-tight">
                            {latestPost.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
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

export default BlogDetailsPage;
