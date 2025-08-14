"use client";
import TableSkeleton from "@/components/Skeleton/Hompage/DashboardTableSkeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ApprovePaper, RejectPaper } from "@/services/allreserchPaper";
import { PromoteRole } from "@/services/Users";
import { ShieldCheck, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { blogCategories } from "../BlogCategories";

interface Column {
  label: string;
  value: string;
}

interface DataItem {
  _id: string;
  [key: string]: any;
}

interface ManageTableProps {
  data: DataItem[];
  loading: boolean;
  columns: Column[];
  isvalue: string;
  onDelete?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  customRenderCell?: (column: Column, item: DataItem) => React.ReactNode | null;
  customActions?: (item: DataItem) => React.ReactNode;
}

const ManageTable: React.FC<ManageTableProps> = ({
  data,
  loading,
  columns,
  onDelete,
  onApprove,
  onReject,
  isvalue,
  customRenderCell,
  customActions,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<DataItem | null>(null);
  const itemsPerPage = 10;

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Get item title for confirmation dialog
  const getItemTitle = (item: DataItem) => {
    if (item.title) return item.title;
    if (item.name) return item.name;
    if (item.fullName) return item.fullName;
    return "this item";
  };

  // Filter data based on search term and category
  const filteredData = data?.filter((item) => {
    const matchesSearch = columns.some((column) =>
      column.value
        .split(".")
        .reduce((o: any, k: string) => (o?.[k] ? o[k] : ""), item)
        ?.toString()
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    // Filter by category for blog items
    if (isvalue === "blog" && selectedCategory !== "all") {
      const matchesCategory = item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }

    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = async (id: string) => {
    try {
      if (onApprove) {
        // Call the custom onApprove function if provided (parent handles approval)
        await onApprove(id);
      } else {
        // Default approval logic (ManageTable handles approval)
        console.log("Approving paper with ID:", id);
        const res = await ApprovePaper(id);
        if (res?.success) {
          toast.success("Paper approved successfully!");
        } else {
          toast.error("Failed to approve paper");
        }
        console.log(res);
      }
    } catch (error) {
      console.error("Error approving paper:", error);
      toast.error("Failed to approve paper");
    }
  };

  const handleReject = async (id: string) => {
    try {
      if (onReject) {
        // Call the custom onReject function if provided (parent handles rejection)
        await onReject(id);
      } else {
        // Default rejection logic (ManageTable handles rejection)
        console.log("Rejecting paper with ID:", id);
        const res = await RejectPaper(id);
        if (res?.success) {
          toast.success("Paper rejected successfully!");
        } else {
          toast.error("Failed to reject paper");
        }
        console.log(res);
      }
    } catch (error) {
      console.error("Error rejecting paper:", error);
      toast.error("Failed to reject paper");
    }
  };

  const handleRoleChange = async (id: string, currentRole: string) => {
    try {
      if (currentRole == "superAdmin") {
        toast.error("superAdmin can not be change");
        return;
      }
      if (currentRole == "user" || currentRole === "admin") {
        const res = await PromoteRole(id);
        if (res.data) {
          console.log(res.data.role);
          toast.success(
            `Promoted ${res?.data?.fullName} to ${res?.data?.role}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  if (loading) {
    return <TableSkeleton />;
  }

  const renderCellContent = (column: Column, item: DataItem) => {
    // Check for custom rendering first
    if (customRenderCell) {
      const customContent = customRenderCell(column, item);
      if (customContent !== null) {
        return customContent;
      }
    }

    // Default rendering logic
    const cellValue = column.value
      .split(".")
      .reduce((o: any, k: string) => (o?.[k] ? o[k] : ""), item);

    if (column.value === "authors") {
      const authors = cellValue || [];
      const authorCount = authors.length;
      const displayText = authorCount > 0 ? `${authorCount} author${authorCount > 1 ? 's' : ''}` : 'No authors';
      
      return (
        <div className="relative group">
          <span className="text-sm text-gray-600 cursor-help">
            {displayText}
          </span>
          {authors.length > 0 && (
            <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap max-w-xs">
              <div className="font-semibold mb-1">Authors:</div>
              {authors.map((author: any, index: number) => (
                <div key={index} className="mb-1">
                  {typeof author === 'string' 
                    ? author 
                    : author?.name || 'Unknown Author'
                  }
                  {typeof author === 'object' && author?.email && (
                    <div className="text-gray-300 text-xs ml-2">
                      {author.email}
                    </div>
                  )}
                </div>
              ))}
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          )}
        </div>
      );
    }

    if (column.value === "paperType") {
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
          {cellValue || "N/A"}
        </span>
      );
    }

    if (column.value === "visitLink") {
      return (
        <a
          href={cellValue}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Visit
        </a>
      );
    }

    if (column.value === "publishedDate" ||
      column.value === "createdAt" ||
      column.value === "updatedAt") {
      return formatDate(cellValue);
    }

    if (column.value === "category") {
      return (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {cellValue || "Uncategorized"}
        </span>
      );
    }

    if (column.value === "role") {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.role === "superAdmin"
              ? "bg-purple-100 text-purple-800"
              : item.role === "admin"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {item.role}
        </span>
      );
    }

    if (column.value === "isApproved") {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.isApproved
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {item.isApproved ? "Approved" : "Pending"}
        </span>
      );
    }

    if (column.value === "title") {
      return (
        <div className="max-w-[150px]">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm cursor-help line-clamp-2">
                {cellValue?.length > 25
                  ? cellValue?.substring(0, 25) + "..."
                  : cellValue}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[300px]">{cellValue}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    }

    return cellValue;
  };

  const renderActions = (item: DataItem) => {
    // Check for custom actions first
    if (customActions) {
      return customActions(item);
    }

    // Default actions logic
    return (
      <div className="flex gap-2">
        {/* View Button */}
        {isvalue === "blog" && (
          <Link href={`/blog/${item._id}`}>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        )}

        {/* Edit Button */}
        {isvalue === "blog" && (
          <Link href={`/admin/dashboard/editblog/${item._id}`}>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
        )}



        {/* Approve/Reject Buttons for Papers */}
        {isvalue === "paperadmin" && (
          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(item._id)}
              className={`px-2 py-1 cursor-pointer transition border rounded-md ${
                item.isApproved
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={item.isApproved}
            >
              {item.isApproved ? "Approved" : "Approve"}
            </button>
            {!item.isApproved && (
              <button
                onClick={() => handleReject(item._id)}
                className="px-2 py-1 cursor-pointer transition border rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Reject
              </button>
            )}
          </div>
        )}

        {/* Pending Papers - Approve/Reject */}
        {isvalue === "pendingPaper" && (
          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(item._id)}
              className="px-2 py-1 cursor-pointer transition border rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(item._id)}
              className="px-2 py-1 cursor-pointer transition border rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        )}

        {/* Role Change Button */}
        {isvalue == "userRole" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRoleChange(item?._id, item?.role)}
          >
            <ShieldCheck className="w-4 h-4" />{" "}
            {item.role === "admin"
              ? "Promot to User"
              : "Promote to Admin"}
          </Button>
        )}

        {/* Delete Button */}
        {(isvalue === "paperadmin" ||
          isvalue === "researhMembar" ||
          isvalue === "blog" ||
          isvalue === "myresearch" ||
          isvalue === "ongoingproject") &&
          onDelete && (
            <AlertDialog open={deleteDialogOpen && itemToDelete?._id === item._id} onOpenChange={setDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setItemToDelete(item);
                    setDeleteDialogOpen(true);
                  }}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{getItemTitle(item)}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      if (itemToDelete) {
                        onDelete(itemToDelete._id);
                        setItemToDelete(null);
                      }
                      setDeleteDialogOpen(false);
                    }}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
      </div>
    );
  };

  return (
    <div className="bg-white border rounded-md p-4">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md w-full md:w-64"
          />

          {/* Category Filter for Blog */}
          {isvalue === "blog" && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md w-full md:w-48"
            >
              {blogCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <p className="text-gray-600 font-semibold">
          Total Data: {filteredData?.length}
        </p>
      </div>

      {filteredData?.length > 0 ? (
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              {columns?.map((column, idx) => (
                <TableHead key={idx} className="text-black">
                  {column.label}
                </TableHead>
              ))}
              {isvalue !== "userOrder" && (
                <TableHead className="text-black">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-500">
            {paginatedData?.map((item, index) => (
              <TableRow key={index}>
                {columns?.map((column, idx) => (
                  <TableCell key={idx}>
                    {renderCellContent(column, item)}
                  </TableCell>
                ))}
                <TableCell>
                  {renderActions(item)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center p-4">No Data Available</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageTable;
