"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import {
  DeletePaper,
  GetAllResearchPaper,
} from "@/services/allreserchPaper";
import { TPapers } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

const AllreserchPaperAdmin = () => {
  const router = useRouter();
  const [data, setData] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [paperToDelete, setPaperToDelete] = useState<TPapers | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await GetAllResearchPaper();
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching research papers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await DeletePaper(id);
      if (res) {
        toast.success("Research paper deleted successfully!");
        // Refresh data after deletion
        await fetchData();
      }
    } catch (error) {
      console.error("Error deleting paper:", error);
      toast.error("Failed to delete research paper");
    }
  };

  const handleConfirmDelete = async () => {
    if (paperToDelete) {
      await handleDelete(paperToDelete._id);
      setDeleteDialogOpen(false);
      setPaperToDelete(null);
    }
  };

  const openDeleteDialog = (paper: any) => {
    setPaperToDelete(paper);
    setDeleteDialogOpen(true);
  };

  const handleViewPaper = (paperId: string) => {
    router.push(`/allpapers/${paperId}`);
  };





  const columns = [
    { label: "Year", value: "year" },
    { label: "Title", value: "title" },
    { label: "Authors", value: "authors" },
    { label: "Paper Type", value: "paperType" },
    { label: "Status", value: "status" },
    { label: "Submitted By", value: "user.fullName" },
    { label: "Visit Link", value: "visitLink" },
  ];

  return (
    <div className="">
      <ManageTable
        data={data}
        isvalue="paperadmin"
        columns={columns}
        loading={loading}
        onDelete={handleDelete}
        customRenderCell={(column, item) => {
          // Custom rendering for status column
          if (column.value === "status") {
            const status = (item as TPapers).status || "ongoing";
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
          return null; // Use default rendering for other columns
        }}
        customActions={(item) => (
          <div className="flex gap-2">
            {/* View Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewPaper(item._id)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 cursor-pointer"
              title="View Paper"
            >
              View
            </Button>

            {/* Delete Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => openDeleteDialog(item)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200 cursor-pointer"
              title="Delete"
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
        itemName={paperToDelete?.title || null}
        itemType="research paper"
        description={`Are you sure you want to delete "${paperToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default AllreserchPaperAdmin;
