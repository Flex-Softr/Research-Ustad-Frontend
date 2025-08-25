import { formatDate as formatDateUtil } from "@/lib/dateUtils";

// Format date function - re-export for backward compatibility
export const formatDate = (dateString: string) => {
  return formatDateUtil(dateString, { includeTime: true });
};

// Get paginated items
export const getPaginatedItems = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  if (!items || items.length === 0) return [];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};

// Calculate total pages
export const calculateTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

// Filter blogs by category
export const filterBlogsByCategory = <T extends { category?: string | { _id: string; name: string; description?: string; blogCount?: number; status?: string } }>(
  blogs: T[],
  selectedCategory: string
): T[] => {
  if (!blogs) return [];
  if (selectedCategory === "all") {
    return blogs;
  }
  return blogs.filter((blog) => {
    if (typeof blog.category === 'string') {
      return blog.category === selectedCategory;
    } else if (blog.category && typeof blog.category === 'object' && '_id' in blog.category) {
      return blog.category._id === selectedCategory;
    }
    return false;
  });
}; 