const BlogCardSkeleton = () => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      <div className="relative overflow-hidden">
        {/* Skeleton for Blog Image */}
        <div className="h-64 lg:h-80 bg-gray-200" />

        {/* Skeleton for Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="w-16 h-6 bg-gray-300 rounded-full" />
        </div>

        {/* Skeleton for Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="w-20 h-6 bg-gray-300 rounded-full" />
        </div>

        {/* Skeleton for Author Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white/20" />
            <div className="ml-3">
              <div className="h-4 w-20 bg-gray-300 rounded mb-1" />
              <div className="h-3 w-16 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton for Blog Content */}
      <div className="p-6">
        {/* Skeleton for Title */}
        <div className="h-6 w-full bg-gray-300 rounded mb-3" />
        <div className="h-6 w-3/4 bg-gray-300 rounded mb-4" />

        {/* Skeleton for Divider */}
        <div className="w-16 h-1 bg-gray-300 rounded-full mb-4" />

        {/* Skeleton for Content */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-gray-300 rounded" />
          <div className="h-4 w-5/6 bg-gray-300 rounded" />
          <div className="h-4 w-4/6 bg-gray-300 rounded" />
        </div>

        {/* Skeleton for Meta Information */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded" />
            <div className="h-3 w-16 bg-gray-300 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded" />
            <div className="h-3 w-20 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Skeleton for Read More Button */}
        <div className="h-5 w-24 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
