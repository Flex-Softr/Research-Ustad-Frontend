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
import { usePendingPapers } from "@/contexts/PendingPapersContext";

const PendingResearchPapers = () => {
  const [data, setData] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [paperToDelete, setPaperToDelete] = useState<TPapers | null>(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<TPapers | null>(null);
  
  // Get the refresh function from context
  const { refreshPendingCount } = usePendingPapers();

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
        // Refresh the data and update sidebar count
        await fetchData();
        await refreshPendingCount();
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
        // Refresh the data and update sidebar count
        await fetchData();
        await refreshPendingCount();
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
    { label: "Paper Type", value: "paperType" },
    { label: "Submitted By", value: "user.fullName" },
    // { label: "Visit Link", value: "visitLink" },
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
        <DialogContent
          className="max-w-[95vw] w-[95vw] max-h-[90vh] overflow-y-auto"
          style={{ width: "95vw", maxWidth: "95vw" }}
        >
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
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Basic Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-red-500">*</span>
                      <span className="text-sm font-semibold text-gray-700">
                        Title
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-gray-900">{selectedPaper.title}</p>
                    </div>
                  </div>

                  {/* Year */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-red-500">*</span>
                      <span className="text-sm font-semibold text-gray-700">
                        Year
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-gray-900">{selectedPaper.year}</p>
                    </div>
                  </div>

                  {/* Paper Type */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-red-500">*</span>
                      <span className="text-sm font-semibold text-gray-700">
                        Paper Type
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-gray-900 capitalize">
                        {selectedPaper.paperType || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">
                        Status
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
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
                        {selectedPaper.status
                          ?.replace("_", " ")
                          .toUpperCase() || "ONGOING"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authors */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Authors
                  </h3>
                </div>

                <div className="space-y-4">
                  {Array.isArray(selectedPaper.authors) ? (
                    selectedPaper.authors.map((author, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-4 rounded-md border border-gray-200"
                      >
                        {typeof author === "string" ? (
                          <p className="text-gray-900">{author}</p>
                        ) : (
                          <div>
                            {/* Show user details if registered user */}
                            {(author as any).isRegisteredUser &&
                            (author as any).user ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <div className="mb-2 flex items-center gap-2">
                                    <svg
                                      className="h-4 w-4 text-gray-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                      />
                                    </svg>
                                    <span className="text-sm font-semibold text-gray-700">
                                      Full Name
                                    </span>
                                  </div>
                                  <div className="bg-white p-3 rounded-md border border-gray-200">
                                    <p className="text-gray-900">
                                      {(author as any).user.fullName ||
                                        "Not specified"}{" "}
                                      {(author as any).role
                                        ? `(${(author as any).role})`
                                        : ""}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <div className="mb-2 flex items-center gap-2">
                                    <svg
                                      className="h-4 w-4 text-gray-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                      />
                                    </svg>
                                    <span className="text-sm font-semibold text-gray-700">
                                      Email
                                    </span>
                                  </div>
                                  <div className="bg-white p-3 rounded-md border border-gray-200">
                                    <p className="text-gray-900">
                                      {(author as any).user.email ||
                                        "Not specified"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Show name and role for non-registered users */
                              <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                  <div>
                                    <div className="mb-2 flex items-center gap-2">
                                      <svg
                                        className="h-4 w-4 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                      </svg>
                                      <span className="text-sm font-semibold text-gray-700">
                                        Name
                                      </span>
                                    </div>
                                    <div className="bg-white p-3 rounded-md border border-gray-200">
                                      <p className="text-gray-900">
                                        {(author as any).name ||
                                          "Not specified"}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-2 flex items-center gap-2">
                                      <svg
                                        className="h-4 w-4 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                                        />
                                      </svg>
                                      <span className="text-sm font-semibold text-gray-700">
                                        Role
                                      </span>
                                    </div>
                                    <div className="bg-white p-3 rounded-md border border-gray-200">
                                      <p className="text-gray-900">
                                        {(author as any).role ||
                                          "Not specified"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-orange-50 p-3 rounded-md border border-orange-200">
                                  <p className="text-sm text-orange-700 flex items-center gap-2">
                                    <svg
                                      className="h-4 w-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                      />
                                    </svg>
                                    Not a registered user
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <p className="text-gray-500 text-center">
                        No authors information available
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Publication Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Publication Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Journal */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span className="text-red-500">*</span>
                      <span className="text-sm font-semibold text-gray-700">
                        Journal
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-gray-900">
                        {selectedPaper.journal || "Not specified"}
                      </p>
                    </div>
                  </div>

                  {/* Visit Link */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span className="text-red-500">*</span>
                      <span className="text-sm font-semibold text-gray-700">
                        Research Paper Link
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
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
                </div>
              </div>

              {/* Abstract */}
              {selectedPaper.abstract && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="h-5 w-5 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Abstract
                    </h3>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedPaper.abstract}
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {(selectedPaper.researchArea || selectedPaper.funding) && (
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="h-5 w-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Additional Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedPaper.researchArea && (
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <svg
                            className="h-4 w-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                          </svg>
                          <span className="text-sm font-semibold text-gray-700">
                            Research Area
                          </span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                          <p className="text-gray-900">
                            {selectedPaper.researchArea}
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedPaper.funding && (
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <svg
                            className="h-4 w-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          <span className="text-sm font-semibold text-gray-700">
                            Funding Information
                          </span>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                          <p className="text-gray-900">
                            {selectedPaper.funding}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submitted By */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Submitted By
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">
                        Name
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-gray-900">
                        {(selectedPaper as any).user?.fullName || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm font-semibold text-gray-700">
                        Email
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                      <p className="text-gray-900">
                        {(selectedPaper as any).user?.email || "Not specified"}
                      </p>
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
                  className="bg-brand-primary text-white hover:bg-brand-primary/80 cursor-pointer"
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
