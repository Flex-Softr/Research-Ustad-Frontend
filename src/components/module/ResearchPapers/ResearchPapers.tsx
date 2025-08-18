"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { DeletePaper, GetAllResearchPaperMy } from "@/services/allreserchPaper";
import { TPapers } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, RefreshCw } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

const ResearchPapers = () => {
  const [data, setData] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<TPapers | null>(null);
  const pathname = usePathname();

  // Determine if we're in admin or user dashboard
  const isAdminDashboard = pathname.includes("/admin/dashboard");
  const editRoute = isAdminDashboard
    ? `/admin/dashboard/edit-research-paper`
    : `/user/dashboard/edit-research-paper`;

  const fetchData = async () => {
    try {
      const response = await GetAllResearchPaperMy();
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching research papers:", error);
      toast.error("Failed to fetch research papers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    setLoading(true);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await DeletePaper(id);
      if (res) {
        toast.success("Research paper deleted successfully");
        refreshData();
      }
    } catch (error) {
      console.error("Error deleting paper:", error);
      toast.error("Failed to delete research paper");
    }
  };

  const openDeleteDialog = (item: any) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await handleDelete(itemToDelete._id);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const columns = [
    { label: "Year", value: "year" },
    { label: "Title", value: "title" },
    { label: "Authors", value: "authors" },
    { label: "Paper Type", value: "paperType" },
    { label: "Status", value: "status" },
    { label: "Approval", value: "isApproved" },
    { label: "Visit Link", value: "visitLink" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Research Papers</h2>
        <Button
          onClick={refreshData}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      <ManageTable
        data={data}
        isvalue="paper"
        columns={columns}
        loading={loading}
        onDelete={handleDelete}
        customRenderCell={(column, item) => {
          // Custom rendering for authors column
          if (column.value === "authors") {
            const authors = item.authors || [];
            const authorCount = authors.length;
            const displayText =
              authorCount > 0
                ? `${authorCount} author${authorCount > 1 ? "s" : ""}`
                : "No authors";

            return (
              <div className="relative group">
                <span className="text-sm text-gray-600 cursor-help">
                  {displayText}
                </span>
                {authors.length > 0 && (
                  <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap max-w-xs">
                    <div className="font-semibold mb-1">Authors:</div>
                    {authors.map((author: any, index: number) => {
                  // Get the display name - prefer user.fullName for registered users, fallback to name
                  let displayName = "Unknown Author";
                  let email = null;
                  
                  if (author?.user?.fullName) {
                    // Registered user - use the fullName from user object
                    displayName = author.user.fullName;
                    email = author.user.email;
                  } else if (author?.name) {
                    // Non-registered user or fallback
                    displayName = author.name;
                  }
                  
                  return (
                    <div key={index} className="mb-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white">{displayName}</span>
                        <span className="text-gray-400 text-xs bg-gray-800 px-2 py-1 rounded-full ml-2">
                          {author?.role || "Author"}
                        </span>
                      </div>
                    </div>
                  );
                })}
                    <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>
            );
          }

          // Custom rendering for status column
          if (column.value === "status") {
            const status = item.status || "ongoing";
            const statusConfig = {
              published: {
                label: "Published",
                className: "bg-green-100 text-green-800",
              },
              ongoing: {
                label: "Ongoing",
                className: "bg-yellow-100 text-yellow-800",
              },
              under_review: {
                label: "Under Review",
                className: "bg-blue-100 text-blue-800",
              },
              in_preparation: {
                label: "In Preparation",
                className: "bg-gray-100 text-gray-800",
              },
              revision: {
                label: "Revision",
                className: "bg-orange-100 text-orange-800",
              },
            };

            const config =
              statusConfig[status as keyof typeof statusConfig] ||
              statusConfig.ongoing;

            return (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}
              >
                {config.label}
              </span>
            );
          }

          return null; // Use default rendering for other columns including title
        }}
                 customActions={(item) => (
           <div className="flex gap-2">
             {/* Edit Button */}
             <Link href={`${editRoute}/${item._id}`}>
               <Button
                 variant="outline"
                 size="sm"
                 className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
               >
                 <Edit className="w-4 h-4" />
               </Button>
             </Link>

             {/* Delete Button */}
             <Button
               variant="outline"
               size="sm"
               className="text-red-500 hover:text-red-700 hover:bg-red-50"
               onClick={() => openDeleteDialog(item)}
             >
               <Trash2 className="w-4 h-4" />
             </Button>
           </div>
                  )}
       />
       
       {/* Delete Confirmation Dialog */}
       <DeleteConfirmationDialog
         isOpen={deleteDialogOpen}
         onOpenChange={setDeleteDialogOpen}
         onConfirm={handleConfirmDelete}
         title="Delete Research Paper"
         itemName={itemToDelete?.title || null}
         itemType="research paper"
         description={`Are you sure you want to delete "${itemToDelete?.title}"? This action cannot be undone.`}
       />
     </div>
   );
 };

export default ResearchPapers;
