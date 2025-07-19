import { TPost } from "@/type";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ post }: { post: TPost }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      <div className="relative overflow-hidden">
        {/* Blog Image */}
        <Image
          className="object-cover object-center w-full h-64 lg:h-80 group-hover:scale-105 transition-transform duration-300"
          src={post.image}
          alt={post.title || ""}
          width={500}
          height={320}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Blog
          </span>
        </div>

        {/* Author Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
          <div className="flex items-center">
            <Image
              className="object-cover w-10 h-10 rounded-full border-2 border-white/20"
              src={post?.author.image || "/images.png"}
              alt={post.author?.fullName}
              width={40}
              height={40}
            />
            <div className="ml-3">
              <h1 className="text-sm font-semibold text-white">
                {post.author?.fullName}
              </h1>
              <p className="text-xs text-gray-200">{post.author?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3">
          {post.title}
        </h1>

        <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 group-hover:w-20 transition-all duration-300"></div>

        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {post.shortDescription?.slice(0, 120)}...
        </p>

        {/* Read More Button */}
        <Link
          href={`/blog/${post._id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-300"
        >
          Read more
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/10 group-hover:to-purple-50/10 transition-all duration-300 pointer-events-none rounded-2xl"></div>
    </div>
  );
};

export default BlogCard;
