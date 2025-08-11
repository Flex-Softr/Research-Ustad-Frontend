"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { ApprovePaper, RejectPaper, GetPendingResearchPapers } from "@/services/allreserchPaper";
import { TPapers } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PendingResearchPapers = () => {
  const [data, setData] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

    fetchData();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await ApprovePaper(id);
      if (res?.success) {
        toast.success("Research paper approved successfully!");
        // Refresh the data
        const response = await GetPendingResearchPapers();
        setData(response?.data || []);
      } else {
        toast.error("Failed to approve research paper");
      }
    } catch (error) {
      console.error("Error approving paper:", error);
      toast.error("Error approving research paper");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await RejectPaper(id);
      if (res?.success) {
        toast.success("Research paper rejected successfully!");
        // Refresh the data
        const response = await GetPendingResearchPapers();
        setData(response?.data || []);
      } else {
        toast.error("Failed to reject research paper");
      }
    } catch (error) {
      console.error("Error rejecting paper:", error);
      toast.error("Error rejecting research paper");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // You can implement delete functionality here if needed
      console.log("Delete paper with ID:", id);
    } catch (error) {
      console.error("Error deleting paper:", error);
    }
  };

  const columns = [
    { label: "Year", value: "year" },
    { label: "Title", value: "title" },
    { label: "Authors", value: "authors" },
    // { label: "Journal", value: "journal" },
    { label: "Visit Link", value: "visitLink" },
    { label: "Paper Type", value: "paperType" },
    { label: "Submitted By", value: "user.fullName" },
  ];

  return (
    <div className="">
      <ManageTable
        data={data}
        isvalue="pendingPaper"
        columns={columns}
        loading={loading}
        onDelete={handleDelete}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default PendingResearchPapers;
