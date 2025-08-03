"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCategories } from "@/services/categories/categoriesSlice";
import { Users, Clock, Globe } from "lucide-react";



const CourseHeader = ({ course }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector(
    (state: RootState) => state.categories
  );

  // Load categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Helper function to get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : categoryId; // Fallback to ID if category not found
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-brand-secondary/10 text-brand-secondary rounded-full text-sm font-medium">
          {getCategoryName(course.category)}
        </span>
        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
          {course.level}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {course.title}
      </h1>

      <p className="text-lg text-gray-600 mb-6 leading-relaxed">
        {course.description}
      </p>

      {/* Course Stats */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center">
          <Users className="w-4 h-4 text-brand-secondary mr-1" />
          <span>{course.enrolled.toLocaleString()} enrolled</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 text-brand-secondary mr-1" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center">
          <Globe className="w-4 h-4 text-brand-secondary mr-1" />
          <span>{course.language}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
