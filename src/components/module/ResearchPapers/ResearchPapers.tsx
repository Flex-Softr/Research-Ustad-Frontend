"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { DeletePaper, GetAllResearchPaperMy } from "@/services/allreserchPaper";
import { TPapers } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ResearchPapers = () => {
  const [data, setData] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();

  // Determine if we're in admin or user dashboard
  const isAdminDashboard = pathname.includes("/admin/dashboard");
  const editRoute = isAdminDashboard
    ? `/admin/dashboard/edit-research-paper`
    : `/user/dashboard/edit-research-paper`;

  useEffect(() => {
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

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await DeletePaper(id);
      if (res) {
        toast.success("Research paper deleted successfully");
        setLoading(true);
        const response = await GetAllResearchPaperMy();
        setData(response?.data || []);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting paper:", error);
      toast.error("Failed to delete research paper");
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
                    {authors.map((author: any, index: number) => (
                      <div key={index} className="mb-1">
                        {typeof author === "string"
                          ? author
                          : author?.name || "Unknown Author"}
                        {typeof author === "object" && author?.email && (
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Research Paper</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{item.title}"? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      />
    </div>
  );
};

export default ResearchPapers;
