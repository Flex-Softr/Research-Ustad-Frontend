"use client"
import TableSkeleton from "@/components/Skeleton/Hompage/DashboardTableSkeleton";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ApprovePaper } from "@/services/allreserchPaper";
import { PromoteRole } from "@/services/Users";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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
  onDelete: (id: string) => void;
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
  const itemsPerPage = 10;

  // Filter data based on search term
  const filteredData = data?.filter((item) =>
    columns.some((column) =>
      column.value
        .split(".")
        .reduce((o: any, k: string) => (o?.[k] ? o[k] : ""), item)
        ?.toString()
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

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
  const handleRoleChange = async (id:string, currentRole:string) => {
    try {
     if(currentRole =="superAdmin"){
       toast.error('superAdmin can not be change');
       return
       }
     if(currentRole =="user" || currentRole ==="admin"){
       const res = await PromoteRole(id);
      if(res.data){
      console.log(res.data.role)
      toast.success(`Promoted ${res?.data?.fullName} to ${res?.data?.role}`);
      }
     }
    } catch (error) {
     console.log(error)
    }
     };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="bg-white border rounded-md p-4">
      {/* Search Input */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border rounded-md w-1/3"
        />
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
              {isvalue !== "userOrder" && <TableHead className="text-black">Actions</TableHead>}
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
                    ) : (
                      column.value
                        .split(".")
                        .reduce((o: any, k: string) => (o?.[k] ? o[k] : ""), item)
                    )}
                  </TableCell>
                ))}
                <TableCell className="flex gap-2">
                  {isvalue === "paperadmin" && (
                    <button
                      onClick={() => handleApprove(item._id)}
                      className={`px-2 py-1 cursor-pointer transition border rounded-md ${item.isApproved ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                    >
                      {item.isApproved ? "Approved" : "Approve"}
                    </button>
                  )}

               {
                isvalue =="userRole" &&  <Button variant="outline" size="sm" onClick={() => handleRoleChange(item?._id, item?.role)}>
                <ShieldCheck className="w-4 h-4" /> {item.role === "admin" ? "Promot to User" : "Promote to Admin"}
              </Button>
               }
                  {isvalue == "paperadmin" && (
                    <button
                      onClick={() => onDelete(item._id)}
                      className="px-2 cursor-pointer py-1 text-red-500 transition border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  )}
                    {isvalue == "researhMembar" && (
                    <button
                      onClick={() => onDelete(item._id)}
                      className="px-2 cursor-pointer py-1 text-red-500 transition border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  )}
                    {isvalue == "blog" && (
                    <button
                      onClick={() => onDelete(item._id)}
                      className="px-2 cursor-pointer py-1 text-red-500 transition border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  )}
                    {isvalue == "researhMembar" && (
                     <Link className="btn" href={`members/${item?._id}`}>
                     <Button>  Update</Button>
                     </Link>
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
