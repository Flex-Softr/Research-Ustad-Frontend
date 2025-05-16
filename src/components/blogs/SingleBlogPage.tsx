"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router"; // For getting dynamic route params
import { Card } from "../ui/card";
import { SingleBlog } from "@/services/blogs";
import { TPost } from "@/type";

function BlogDetailsPage({ id }: { id: string }) {
  const [post, setPost] = useState<TPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
       if(id){
        const response = await SingleBlog(id);
        console.log(response)
        setPost(response.data);
        setLoading(false);
       }
      } catch (err) {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);
  
console.log(post)
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4">
        {/* Skeleton Loader */}
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-48 bg-gray-300 rounded-lg"></div>
          <div className="h-6 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded"></div>
          <div className="h-36 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <Card
        key={post?._id}
        className="bg-white rounded-lg overflow-hidden  shadow-lg"
      >
        {/* Main Image */}
        <div className="relative w-full px-5 h-[300px] md:h-[400px] lg:h-[600px]">
        <Image
                  className="object-cover w-full h-full rounded-full"
                  src={post?.image || "/default-avatar.png"} // Default avatar if no image
                  alt={"blogImg"}
                  width={500}
                  height={400}
                />
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6">
          {/* Title and Intro */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{post?.title}</h1>
          <p className="text-gray-700 text-sm sm:text-base mb-6">
            {post?.shortDescription}
          </p>

          {/* Category and Published Date */}
          <div className="text-gray-500 text-sm mb-4">
            <span>Published on: {new Date(post?.publishedDate!).toLocaleDateString()}</span>
          </div>


          {/* Metadata Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 border-t pt-4 gap-4">
            <span>Author: {post?.author?.fullName}</span>
            <div className="flex items-center gap-4">
           
              <span className="text-blue-500">0 Likes</span>
              <span className="text-green-500">0 Comments</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default BlogDetailsPage;
