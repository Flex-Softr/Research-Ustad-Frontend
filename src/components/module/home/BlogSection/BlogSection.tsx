"use client"
import { useEffect, useState } from "react";
import BlogCard from "@/components/blogs/blog/BlogCard";
import SectionTitle from "../../SectionTitle";
import { GetAllBlog } from "@/services/blogs";
import { TPost } from "@/type";
import BlogCardSkeleton from "@/components/blogs/blog/BlogCardSkeleton";


const BlogSection = () => {
  const [data, setData] = useState<TPost[]>([])
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllBlog(); // API থেকে ডাটা আনছে
        setData(response.data); // স্টেটে ডাটা সেট করছে
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // লোডিং শেষ
      }
    };

    fetchData();
  }, []); // Empty dependency array, একবারই রান করবে

  return (
    <div className="container mx-auto w-[90%] mt-8 md:my-10">
      <div className="mb-12">
        <SectionTitle title="Our Recent Blog" />
      </div>

      {loading ? ( // লোডিং হলে স্পিনার দেখাবে
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
       {Array.from({ length: 3 }).map((_, index) => (
         <BlogCardSkeleton key={index} />
       ))}
     </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {data?.slice(0, 3)?.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogSection;
