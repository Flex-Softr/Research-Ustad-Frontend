"use client"
import { useEffect, useState } from "react";
import BlogCard from "@/components/blogs/blog/BlogCard";
import SectionTitle from "../../SectionTitle";
import { Blog } from "@/type";
import BlogCardSkeleton from "@/components/blogs/blog/BlogCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchBlogs } from "@/services/blogs/blogsSlice";


const BlogSection = () => {
  const [data, setData] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, isLoading, error } = useSelector(
    (state: RootState) => state.blogs
  );

    // Load blogs data
    useEffect(() => {
      dispatch(fetchBlogs());
    }, [dispatch]); // Empty dependency array, একবারই রান করবে

    // Update data when blogs are loaded
    useEffect(() => {
      if (blogs && blogs.length > 0) {
        setData(blogs);
        setLoading(false);
      }
    }, [blogs]);

  return (
    <div className="container mx-auto w-[90%] mt-8 md:my-10">
      <div className="mb-12">
        <SectionTitle title="Our Recent Blog" />
      </div>

      {loading || isLoading ? ( // লোডিং হলে স্পিনার দেখাবে
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
