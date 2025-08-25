import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchBlogCategories } from "@/services/blogCategories/blogCategoriesSlice";
import { useRouter, usePathname } from "next/navigation";

export const useCategoryManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [allCategories, setAllCategories] = useState<Array<{ 
    value: string; 
    name: string; 
    description?: string;
    blogCount?: number;
  }>>([]);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  
  const { categories: blogCategories, isLoading, error } = useSelector(
    (state: RootState) => state.blogCategories
  );

  // Clear selectedCategory on mount to ensure fresh state
  useEffect(() => {
    setSelectedCategory("");
  }, []);

  // Fetch blog categories from API
  useEffect(() => {
    dispatch(fetchBlogCategories());
  }, [dispatch]);

  // Refresh categories when returning from category creation page
  useEffect(() => {
    const handleRouteChange = () => {
      // If we're returning from the blog category page, refresh categories
      if (pathname.includes('/admin/dashboard/blogCategory')) {
        dispatch(fetchBlogCategories());
      }
    };

    // Listen for route changes
    const handleFocus = () => {
      // Refresh categories when window regains focus (user returns from category page)
      dispatch(fetchBlogCategories());
    };

    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [dispatch, pathname]);

  // Update allCategories when blog categories are loaded
  useEffect(() => {
    if (blogCategories.length > 0) {
      // Transform API categories to dropdown format
      const apiCategories = blogCategories
        .filter(cat => cat.status === 'active') // Only show active categories
        .map(cat => ({
          value: cat._id, // Use ObjectId as value
          name: cat.name, // Use 'name' from API response
          description: cat.description,
          blogCount: cat.blogCount
        }));
      
      // Set API categories as the primary list
      setAllCategories(apiCategories);
    } else {
      // No categories available - set empty array
      setAllCategories([]);
    }
  }, [blogCategories, isLoading, error]);

  const resetCategoryState = useCallback(() => {
    setSelectedCategory("");
  }, []);

  const refreshCategories = useCallback(() => {
    dispatch(fetchBlogCategories());
  }, [dispatch]);

  return {
    selectedCategory,
    setSelectedCategory,
    allCategories,
    resetCategoryState,
    refreshCategories,
    isLoading,
  };
}; 