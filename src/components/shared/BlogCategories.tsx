import { BlogCategory } from "@/type";

export const blogCategories: BlogCategory[] = [
  { value: "all", label: "All Categories" },
  { value: "technology", label: "Technology" },
  { value: "research", label: "Research" },
  { value: "academic", label: "Academic" },
  { value: "education", label: "Education" },
  { value: "science", label: "Science" },
  { value: "engineering", label: "Engineering" },
  { value: "computer-science", label: "Computer Science" },
  { value: "artificial-intelligence", label: "Artificial Intelligence" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "data-science", label: "Data Science" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "blockchain", label: "Blockchain" },
  { value: "iot", label: "Internet of Things" },
  { value: "cloud-computing", label: "Cloud Computing" },
  { value: "software-development", label: "Software Development" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "database", label: "Database" },
  { value: "networking", label: "Networking" },
  { value: "general", label: "General" },
];

// Helper function to get category label by value
export const getCategoryLabel = (value: string): string => {
  const category = blogCategories.find(cat => cat.value === value);
  return category ? category.label : "Uncategorized";
};

// Helper function to get category value by label
export const getCategoryValue = (label: string): string => {
  const category = blogCategories.find(cat => cat.label === label);
  return category ? category.value : "general";
};

// Helper function to check if a category exists
export const isValidCategory = (value: string): boolean => {
  return blogCategories.some(cat => cat.value === value);
};

// Helper function to get categories excluding "all"
export const getCategoryOptions = (): BlogCategory[] => {
  return blogCategories.filter(cat => cat.value !== "all");
}; 