"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCategories } from "@/services/categories/categoriesSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen } from "lucide-react";
import { BasicInformationSectionProps } from "@/type";


export function BasicInformationSection({
  formData,
  onChange,
  errors,
}: BasicInformationSectionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading } = useSelector(
    (state: RootState) => state.categories
  );

  // Load categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const getFieldError = (field: string) => {
    return errors.find((err) => err.field === field)?.message;
  };

  // Filter only active categories
  const activeCategories = categories.filter(cat => cat.status === 'active');


  console.log('category', categories)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title *</Label>
          <Input
            id="title"
            placeholder="Enter course title"
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            className="h-12"
          />
          {getFieldError("title") && (
            <p className="text-sm text-red-600">{getFieldError("title")}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your course in detail"
            value={formData.description}
            onChange={(e) => onChange("description", e.target.value)}
            rows={4}
          />
          {getFieldError("description") && (
            <p className="text-sm text-red-600">
              {getFieldError("description")}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => onChange("category", e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              <option value="">Select a category</option>
              {activeCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {isLoading && (
              <p className="text-sm text-gray-500">Loading categories...</p>
            )}
            {!isLoading && activeCategories.length === 0 && (
              <p className="text-sm text-orange-600">No active categories available. Please create categories first.</p>
            )}
            {getFieldError("category") && (
              <p className="text-sm text-red-600">
                {getFieldError("category")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <select
              id="level"
              value={formData.level}
              onChange={(e) => onChange("level", e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="e.g., 10 weeks, 20 hours"
              value={formData.duration}
              onChange={(e) => onChange("duration", e.target.value)}
            />
            {getFieldError("duration") && (
              <p className="text-sm text-red-600">
                {getFieldError("duration")}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              value={formData.language}
              onChange={(e) => onChange("language", e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
