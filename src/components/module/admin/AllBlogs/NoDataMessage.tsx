import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { blogCategories } from "@/components/shared/BlogCategories";

interface NoDataMessageProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onCreateClick?: () => void;
  title?: string;
  description?: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({
  selectedCategory,
  onCategoryChange,
  onCreateClick,
  title = "No Blogs Found",
  description,
}) => {
  const getDescription = () => {
    if (description) return description;
    
    return selectedCategory === "all"
      ? "There are no blogs in the system yet. Create your first blog to get started!"
      : `No blogs found in the "${
          blogCategories.find((cat) => cat.value === selectedCategory)?.label
        }" category.`;
  };

  const handleCreateClick = () => {
    if (onCreateClick) {
      onCreateClick();
    } else {
      window.location.href = "/admin/dashboard/createblog";
    }
  };

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md">
            {getDescription()}
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => onCategoryChange("all")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View All Categories
            </Button>
            <Button
              onClick={handleCreateClick}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create First Blog
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoDataMessage; 