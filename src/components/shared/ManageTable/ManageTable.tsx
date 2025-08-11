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
import { ApprovePaper } from "@/services/allreserchPaper";
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
}

const ManageTable: React.FC<ManageTableProps> = ({
  data,
  loading,
  columns,
  onDelete,
  isvalue,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
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
    console.log("Approving paper with ID:", id);
    const res = await ApprovePaper(id);
    console.log(res);
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
                    {column.value === "visitLink" ? (
                      <a
                        href={item[column.value]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        Visit
                      </a>
                    ) : column.value === "publishedDate" ||
                      column.value === "createdAt" ||
                      column.value === "updatedAt" ? (
                      formatDate(
                        column.value
                          .split(".")
                          .reduce(
                            (o: any, k: string) => (o?.[k] ? o[k] : ""),
                            item
                          )
                      )
                    ) : column.value === "category" ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {column.value
                          .split(".")
                          .reduce(
                            (o: any, k: string) => (o?.[k] ? o[k] : ""),
                            item
                          ) || "Uncategorized"}
                      </span>
                    ) : column.value === "role" ? (
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
                    ) : (
                      column.value
                        .split(".")
                        .reduce(
                          (o: any, k: string) => (o?.[k] ? o[k] : ""),
                          item
                        )
                    )}
                  </TableCell>
                ))}
                <TableCell className="flex gap-2">
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

                  {isvalue === "researhMembar" && (
                    <Link href={`members/${item?._id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}

                  {/* Approve Button for Papers */}
                  {isvalue === "paperadmin" && (
                    <button
                      onClick={() => handleApprove(item._id)}
                      className={`px-2 py-1 cursor-pointer transition border rounded-md ${
                        item.isApproved
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.isApproved ? "Approved" : "Approve"}
                    </button>
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
                    isvalue === "blog") && onDelete && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item._id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
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
