import { useState, useCallback } from "react";
import { getCategoryOptions } from "@/components/shared/BlogCategories";

export const useCategoryManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [allCategories, setAllCategories] = useState(getCategoryOptions());

  const addCategory = useCallback((category: { value: string; label: string }) => {
    const exists = allCategories.find((cat) => cat.value === category.value);
    if (!exists) {
      setAllCategories((prev) => [...prev, category]);
    }
  }, [allCategories]);

  const resetCategoryState = useCallback(() => {
    setSelectedCategory("");
    setCustomCategory("");
    setShowCustomInput(false);
  }, []);

  return {
    selectedCategory,
    setSelectedCategory,
    customCategory,
    setCustomCategory,
    showCustomInput,
    setShowCustomInput,
    allCategories,
    addCategory,
    resetCategoryState,
  };
}; 