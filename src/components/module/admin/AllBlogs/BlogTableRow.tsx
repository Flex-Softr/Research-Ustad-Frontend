import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { BlogTableRowProps } from "@/type";

const BlogTableRow: React.FC<BlogTableRowProps> = ({
  blog,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDelete,
  formatDate,
}) => {
  return (
    <TableRow key={blog._id || "temp-key"}>
      <TableCell>
        <Checkbox checked={isSelected} onCheckedChange={onSelect} />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-8 rounded overflow-hidden">
            <Image
              src={blog.imageUrl || "/img/default-blog.jpg"}
              alt={blog.title || "Blog"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900 line-clamp-1">
              {blog.title || "Untitled"}
            </div>
            <div className="text-sm text-gray-500 line-clamp-2">
              {blog.content?.replace(/<[^>]*>/g, "").substring(0, 10)}
              ...
            </div>
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
      <TableCell>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            blog.status === "published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {blog.status || "Published"}
        </span>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(blog)}>
              <Eye className="w-4 h-4 mr-2" />
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(blog)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
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
