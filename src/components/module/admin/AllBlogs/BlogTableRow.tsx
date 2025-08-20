import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { BlogTableRowProps } from "@/type";
import FallbackImage from "@/components/shared/FallbackImage";

const BlogTableRow: React.FC<BlogTableRowProps> = ({
  blog,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  formatDate,
  isAdmin = false,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {status || "Unknown"}
          </span>
        );
    }
  };

  return (
    <TableRow key={blog._id || "temp-key"}>
      <TableCell>
        <Checkbox checked={isSelected} onCheckedChange={onSelect} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-8 rounded overflow-hidden">
            <FallbackImage
              src={blog?.imageUrl}
              alt={blog.title || "Blog"}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900 line-clamp-1 max-w-[200px]">
              {blog.title?.length > 30
                ? `${blog.title.substring(0, 30)}...`
                : blog.title || "Untitled"}
            </div>
            {/* <div className="text-sm text-gray-500 line-clamp-2 max-w-[200px]">
              {blog.content?.replace(/<[^>]*>/g, "").substring(0, 50)}...
            </div> */}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {blog.category || "Uncategorized"}
        </span>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div className="font-medium text-gray-700">
            {blog.author?.fullName || "Unknown"}
          </div>
          <div className="text-gray-500">
            {blog.author?.email || "No email"}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div className="font-medium">
            {formatDate(blog.publishedDate || blog.createdAt)}
          </div>
        </div>
      </TableCell>
      <TableCell>{getStatusBadge(blog.status)}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* Only show View button for approved blogs */}
            {blog.status === "approved" && (
              <DropdownMenuItem onClick={() => onView(blog)}>
                <Eye className="w-4 h-4 mr-2" />
                View
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => onEdit(blog)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>

            {/* Admin-only approval actions */}
            {isAdmin && blog.status === "pending" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onApprove?.(blog)}
                  className="text-green-600"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onReject?.(blog)}
                  className="text-red-600"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setTimeout(() => onDelete(blog), 0);
              }}
              className="text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default BlogTableRow;
