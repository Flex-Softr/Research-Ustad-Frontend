import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { Blog } from "@/type";

interface StatusFilterProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  totalCount: number;
  blogs: Blog[];
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onStatusChange,
  totalCount,
  blogs,
}) => {
  // Calculate counts for each status
  const pendingCount = blogs.filter(blog => blog.status === "pending").length;
  const approvedCount = blogs.filter(blog => blog.status === "approved").length;
  const rejectedCount = blogs.filter(blog => blog.status === "rejected").length;

  const statusOptions = [
    { value: "all", label: "All", count: totalCount },
    { value: "pending", label: "Pending", count: pendingCount, icon: Clock },
    { value: "approved", label: "Approved", count: approvedCount, icon: CheckCircle },
    { value: "rejected", label: "Rejected", count: rejectedCount, icon: XCircle },
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Filter by status:</span>
        {statusOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.value}
              variant={selectedStatus === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onStatusChange(option.value)}
              className="flex items-center gap-2"
            >
              {Icon && <Icon className="w-3 h-3" />}
              {option.label}
              {option.value !== "all" && (
                <Badge variant="secondary" className="ml-1">
                  {option.count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusFilter;
