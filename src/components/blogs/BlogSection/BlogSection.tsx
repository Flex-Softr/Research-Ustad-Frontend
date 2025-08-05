"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { allBlogs } from "./data";

const BlogSection = () => {
  return (
    <section className="container mx-auto w-[90%] py-16">
      {/* Section Title */}
      <div className="text-center mb-10">
        <p className="text-[#ff9900] font-semibold text-sm uppercase flex items-center justify-center gap-2">
          🧹 Latest News
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Our most recent posts
        </h2>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBlogs?.slice(0, 3)?.map((blog) => (
          <Link key={blog?.id} href={`/blog/${blog?.id}`} className="group">
            <Card className="hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden flex flex-col h-full">
              <CardHeader>
                <div className="relative w-full h-[250px] overflow-hidden rounded-2xl">
                  <Image
                    src={blog?.imageMain}
                    alt={blog?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute right-10 -bottom-6 bg-[#fff] text-black font-bold rounded-full px-5 py-3 text-xs  shadow-md mb-3">
                    {blog?.date}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <h3 className="text-2xl font-semibold text-gray-900 hover:text-[#ff9900] transition-colors duration-300">
                  {blog?.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{"Web design"}</p>
              </CardContent>
              <CardFooter>
                <button className="text-[#ff9900] font-semibold">
                  Read More
                </button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
