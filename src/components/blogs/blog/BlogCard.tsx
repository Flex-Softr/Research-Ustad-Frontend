import { TPost } from "@/type";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ post }: { post: TPost }) => {

  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        {/* Blog Image */}
        <Image
          className="object-cover object-center w-full h-64 lg:h-80"
          src={post.image}
          alt={post.title || ""}
          width={500}
          height={320}
        />

        {/* Author Info */}
        <div className="absolute bottom-0 flex items-center p-3 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-80 w-full">
          <Image
            className="object-cover w-10 h-10 rounded-full"
            src={post?.author.image || "/images.png"} // Default avatar if no image
            alt={post.author?.fullName}
            width={40}
            height={40}
          />
          <div className="ml-4">
            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{post.author?.fullName}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{post.author?.role}</p>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-5">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{post.title}</h1>
        <hr className="w-32 my-4 border-blue-500" />
        <p className="text-sm text-gray-600 dark:text-gray-400">{post.shortDescription?.slice(0,100)}</p>

        {/* Read More Button */}
        <Link
          href={`/blog/${post._id}`}
          className="inline-block mt-4 text-blue-600 hover:text-blue-400 font-medium"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
