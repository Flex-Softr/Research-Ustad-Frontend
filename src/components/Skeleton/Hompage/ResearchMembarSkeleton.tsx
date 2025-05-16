export const SkeletonCard = () => (
  <div className="relative w-full p-5 transition-all duration-500 border-2 border-transparent bg-white shadow-lg rounded-xl hover:border-[#bc986b] hover:shadow-xl cursor-pointer animate-pulse">
    <div className="flex justify-center">
      <div className="w-24 h-24 rounded-full bg-gray-300"></div>
    </div>
    <h2 className="mt-3 text-lg font-semibold text-center truncate bg-gray-300 h-4 w-3/4 mx-auto my-3"></h2>
    <h5 className="text-sm font-semibold text-center truncate bg-gray-300 h-4 w-1/2 mx-auto"></h5>
    <div className="flex justify-center gap-4 mt-4">
      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
    </div>
  </div>
);