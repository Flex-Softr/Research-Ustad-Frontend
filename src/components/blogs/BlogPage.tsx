"use client";
import { useEffect, useState } from "react";
import BlogCard from "./blog/BlogCard";
import BlogCardSkeleton from "./blog/BlogCardSkeleton";
import { GetAllBlog } from "@/services/blogs";
import { TPost } from "@/type";

const BlogPage = () => {
  const [data, setData] = useState<TPost[]>([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); 
      try {
        const response = await GetAllBlog(); 
        setData(response?.data); 
        if(response.data){
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } 
    };

    fetchBlogs(); 
  }, []); 

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container w-[90%]  py-10 mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            From the blog
          </h1>
          <p className="max-w-lg mx-auto mt-4 text-gray-500">
            Salami mustard spice tea fridge authentic Chinese food dish salt tasty liquor. Sweet savory food truck pie.
          </p>
        </div>

        <div className="">
          {loading ? ( // Show skeletons while loading
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
              {data?.map((post) => (
                <BlogCard key={post._id} post={post} /> // Use unique ID for key
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
