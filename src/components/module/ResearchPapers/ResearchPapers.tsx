"use client";

import React, { useState, useEffect } from "react";
import { GetAllResearchPaper } from "@/services/allreserchPaper";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { toast } from "sonner";

interface ResearchPaper {
  _id: string;
  title: string;
  author: string;
  abstract: string;
  keywords: string[];
  isApproved: boolean;
  submittedDate: string;
  approvedDate?: string;
  rejectedDate?: string;
  status: "pending" | "approved" | "rejected";
  visitLink?: string;
}

const ResearchPapers: React.FC = () => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setLoading(true);
        const response = await GetAllResearchPaper();

        if (response.success && response.data) {
          setPapers(response.data);
        } else {
          toast.error(response.message || "Failed to fetch research papers");
        }
      } catch (error) {
        console.error("Error fetching research papers:", error);
        toast.error("Failed to fetch research papers");
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const columns = [
    { label: "Title", value: "title" },
    { label: "Author", value: "author" },
    { label: "Status", value: "status" },
    { label: "Submitted Date", value: "submittedDate" },
    { label: "Approved", value: "isApproved" },
  ];

  const handleDelete = async (id: string) => {
    try {
      // TODO: Implement delete functionality with actual API
      console.log("Deleting paper with ID:", id);

      // Remove from local state for now
      setPapers((prev) => prev.filter((paper) => paper._id !== id));
      toast.success("Research paper deleted successfully");
    } catch (error) {
      console.error("Error deleting research paper:", error);
      toast.error("Failed to delete research paper");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2
          className="text-2xl font-bold text-gray-900"
          style={{ fontFamily: "Siyam Rupali, sans-serif" }}
        >
          Research Papers
        </h2>
        <p className="text-gray-600 mt-2">
          Manage and review all submitted research papers
        </p>
      </div>

      <ManageTable
        data={papers}
        isvalue="paperadmin"
        columns={columns}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ResearchPapers;
