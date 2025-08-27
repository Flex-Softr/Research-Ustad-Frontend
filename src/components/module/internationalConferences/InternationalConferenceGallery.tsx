"use client";
import { useState } from "react";
import type { InternationalConference } from "@/type/internationalConference";
import { Globe, Star, Award } from "lucide-react";
import FallbackImage from "@/components/shared/FallbackImage";
import Pagination from "@/components/shared/Pagination";

interface InternationalConferenceGalleryProps {
  conferences: InternationalConference[];
  loading: boolean;
  error: string | null;
}

export const InternationalConferenceGallery = ({
  conferences,
  loading,
  error,
}: InternationalConferenceGalleryProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedConference, setSelectedConference] =
    useState<InternationalConference | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // Show 9 conferences per page (3 rows of 3)

  // Calculate pagination
  const totalItems = conferences.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedConferences = conferences.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div
              key={item}
              className="relative h-64 bg-gray-200 animate-pulse rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Award className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to Load Conferences
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (conferences.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Globe className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Conferences Yet
          </h3>
          <p className="text-gray-600">
            We're working on organizing our first international conference.
            Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Conferences Count */}
      {/* <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{totalItems} Conferences</span>
          </div>
        </div>
      </div> */}

      {/* Conferences Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedConferences.map((conference, index) => (
          <div
            key={conference._id}
            className="group relative h-64 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
            onMouseEnter={() => setHoveredId(conference._id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedConference(conference)}
          >
            {/* Image */}
            {conference.imageUrl ? (
              <FallbackImage
                src={conference.imageUrl}
                alt={conference.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-5xl mb-3">🌍</div>
                  <p className="text-sm font-medium">No Image</p>
                </div>
              </div>
            )}

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${
                hoveredId === conference._id ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Content Overlay */}
            <div
              className={`absolute inset-0 flex flex-col justify-end p-6 text-white transition-all duration-500 ${
                hoveredId === conference._id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="space-y-3">
                <h3 className="text-xl font-bold drop-shadow-lg line-clamp-2">
                  {conference.title}
                </h3>
                <p className="text-sm text-gray-200 drop-shadow-lg line-clamp-3 leading-relaxed">
                  {conference.description}
                </p>
              </div>
            </div>

            {/* Hover Indicator */}
            <div
              className={`absolute bottom-4 left-4 w-8 h-1 bg-white rounded-full transition-all duration-300 ${
                hoveredId === conference._id ? "w-12" : "w-8"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            className="mt-8"
          />
        </div>
      )}

      {/* Conference Detail Modal */}
      {selectedConference && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedConference(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-80">
              {selectedConference.imageUrl ? (
                <FallbackImage
                  src={selectedConference.imageUrl}
                  alt={selectedConference.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-6xl mb-4">🌍</div>
                    <p className="text-lg font-medium">No Image</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedConference(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  International Conference
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {selectedConference.title}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-4">
                {selectedConference.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
