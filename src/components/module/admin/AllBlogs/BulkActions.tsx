import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface BulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
  onDeleteSelected: () => void;
  deleteButtonText?: string;
  clearButtonText?: string;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onClearSelection,
  onDeleteSelected,
  deleteButtonText = "Delete Selected",
  clearButtonText = "Clear Selection",
}) => {
  if (selectedCount === 0) return null;

  return (
    <Card className="bg-yellow-50 border-yellow-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-yellow-800">
              {selectedCount} item selected
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearSelection}
            >
              {clearButtonText}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onDeleteSelected}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {deleteButtonText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkActions; 