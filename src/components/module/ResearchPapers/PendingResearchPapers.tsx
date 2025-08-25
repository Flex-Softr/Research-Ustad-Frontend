"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import {
  DeletePaper,
  GetPendingResearchPapers,
  ApprovePaper,
} from "@/services/allreserchPaper";
import { TPapers } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, X } from "lucide-react";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PendingResearchPapers = () => {
  const [data, setData] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [paperToDelete, setPaperToDelete] = useState<TPapers | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<TPapers | null>(null);

  const fetchData = async () => {
    try {
      const response = await GetPendingResearchPapers();
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching pending research papers:", error);
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
        // Refresh the data
        await fetchData();
      }
    } catch (error) {
      console.error("Error deleting paper:", error);
      toast.error("Failed to delete research paper");
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await ApprovePaper(id);
      if (res) {
        toast.success("Research paper approved successfully!");
        // Refresh the data
        await fetchData();
      }
    } catch (error) {
      console.error("Error approving paper:", error);
      toast.error("Failed to approve research paper");
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

  const openPreviewModal = (paper: any) => {
    setSelectedPaper(paper);
    setPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setPreviewModalOpen(false);
    setSelectedPaper(null);
  };

  const handleApproveFromPreview = async () => {
    if (selectedPaper) {
      await handleApprove(selectedPaper._id);
      closePreviewModal();
    }
  };

  const columns = [
    { label: "Year", value: "year" },
    { label: "Title", value: "title" },
    { label: "Authors", value: "authors" },
    // { label: "Paper Type", value: "paperType" },
    { label: "Submitted By", value: "user.fullName" },
    { label: "Visit Link", value: "visitLink" },
  ];

  console.log("data", data);

  return (
    <div className="">
      <ManageTable
        data={data}
        isvalue="pendingPaper"
        columns={columns}
        loading={loading}
        onDelete={handleDelete}
        customActions={(item) => (
          <div className="flex gap-2">
            {/* Preview Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => openPreviewModal(item)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200 cursor-pointer"
              title="Preview"
            >
              <Eye className="w-4 h-4" />
            </Button>

            {/* Approve Button */}
            <Button
              onClick={() => handleApprove(item._id)}
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            >
              Approve
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

      {/* Preview Modal */}
      <Dialog open={previewModalOpen} onOpenChange={setPreviewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Research Paper Preview</span>
              {/* <Button
                variant="ghost"
                size="sm"
                onClick={closePreviewModal}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button> */}
            </DialogTitle>
          </DialogHeader>

          {selectedPaper && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Title</h3>
                  <p className="text-gray-700">{selectedPaper.title}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Year</h3>
                  <p className="text-gray-700">{selectedPaper.year}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Paper Type
                  </h3>
                  <p className="text-gray-700 capitalize">
                    {selectedPaper.paperType || "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedPaper.status === "published"
                        ? "bg-green-100 text-green-800"
                        : selectedPaper.status === "ongoing"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedPaper.status === "under_review"
                        ? "bg-blue-100 text-blue-800"
                        : selectedPaper.status === "in_preparation"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {selectedPaper.status?.replace("_", " ").toUpperCase() ||
                      "ONGOING"}
                  </span>
                </div>
              </div>

              {/* Authors */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Authors</h3>
                <div className="space-y-2">
                  {Array.isArray(selectedPaper.authors) ? (
                    selectedPaper.authors.map((author, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        {typeof author === "string" ? (
                          <p className="text-gray-700">{author}</p>
                        ) : (
                          <div className="space-y-3">
                            {/* Show user details if registered user */}
                            {(author as any).isRegisteredUser &&
                            (author as any).user ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                  <span className="font-medium text-gray-900">
                                    Full Name:
                                  </span>{" "}
                                  <span className="text-gray-700">
                                    {(author as any).user.fullName ||
                                      "Not specified"}
                                  </span>
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900">
                                    Email:
                                  </span>{" "}
                                  <span className="text-gray-700">
                                    {(author as any).user.email ||
                                      "Not specified"}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              /* Show name and role for non-registered users */
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-medium text-gray-900">
                                      Name:
                                    </span>{" "}
                                    <span className="text-gray-700">
                                      {(author as any).name || "Not specified"}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-medium text-gray-900">
                                      Role:
                                    </span>{" "}
                                    <span className="text-gray-700">
                                      {(author as any).role || "Not specified"}
                                    </span>
                                  </div>
                                </div>
                                <div className="pt-1 border-t border-gray-200">
                                  <p className="text-sm text-gray-500 italic">
                                    ⚠️ Not a registered
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No authors information available
                    </p>
                  )}
                </div>
              </div>

              {/* Journal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Journal</h3>
                  <p className="text-gray-700">
                    {selectedPaper.journal || "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Visit Link
                  </h3>
                  <a
                    href={selectedPaper.visitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline break-all"
                  >
                    {selectedPaper.visitLink || "Not specified"}
                  </a>
                </div>
              </div>

              {/* Abstract */}
              {selectedPaper.abstract && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Abstract</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedPaper.abstract}
                  </p>
                </div>
              )}

              {/* Research Area */}
              {selectedPaper.researchArea && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Research Area
                  </h3>
                  <p className="text-gray-700">{selectedPaper.researchArea}</p>
                </div>
              )}

              {/* Funding */}
              {selectedPaper.funding && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Funding Information
                  </h3>
                  <p className="text-gray-700">{selectedPaper.funding}</p>
                </div>
              )}

              {/* Submitted By */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Submitted By
                </h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <span className="font-medium">Name:</span>{" "}
                      {(selectedPaper as any).user?.fullName || "Unknown"}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span>{" "}
                      {(selectedPaper as any).user?.email || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={closePreviewModal}
                  className="cursor-pointer"
                >
                  Close
                </Button>
                <Button
                  onClick={handleApproveFromPreview}
                  className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Approve Paper
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PendingResearchPapers;
