const BlogCardSkeleton = () => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="relative">
        {/* Skeleton for Blog Image */}
        <div className="h-64 lg:h-80 bg-gray-200" />

        {/* Skeleton for Author Info */}
        <div className="absolute bottom-0 flex items-center p-3 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-80 w-full">
          <div className="w-10 h-10 bg-gray-300 rounded-full" /> {/* Skeleton for author image */}
          <div className="ml-4">
            <div className="h-4 w-24 bg-gray-300 mb-1" /> {/* Skeleton for author name */}
            <div className="h-3 w-16 bg-gray-300" /> {/* Skeleton for author role */}
          </div>
        </div>
      </div>

      {/* Skeleton for Blog Content */}
      <div className="p-5">
        <div className="h-6 w-full bg-gray-300 mb-2" /> {/* Skeleton for title */}
        <hr className="w-32 my-4 border-blue-500" />
        <div className="h-4 w-full bg-gray-300 mb-4" /> {/* Skeleton for description */}

        {/* Skeleton for Read More Button */}
        <div className="h-5 w-24 bg-gray-300" /> {/* Skeleton for button */}
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
