"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { DeletePaper, GetAllResearchPaper, ApprovePaper, RejectPaper } from "@/services/allreserchPaper";
import { TPapers } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AllreserchPaperAdmin = () => {
  const [data, setData] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      // Refresh data after deletion
      await fetchData();
    } catch (error) {
      console.error("Error deleting paper:", error);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      // Call the approval service
      const res = await ApprovePaper(id);
      if (res) {
        toast.success("Paper approved successfully!");
        // Refresh data after successful approval
        await fetchData();
      }
    } catch (error) {
      console.error("Error approving paper:", error);
      toast.error("Failed to approve paper");
    }
  };

  const handleReject = async (id: string) => {
    try {
      // Call the rejection service
      const res = await RejectPaper(id);
      if (res) {
        toast.success("Paper rejected successfully!");
        // Refresh data after successful rejection
        await fetchData();
      }
    } catch (error) {
      console.error("Error rejecting paper:", error);
      toast.error("Failed to reject paper");
    }
  };

  const columns = [
    { label: "Year", value: "year" },
    { label: "Title", value: "title" },
    // { label: "Authors", value: "authors" },
    // { label: "Journal", value: "journal" },
    { label: "Visit Link", value: "visitLink" },
    { label: "Paper Type", value: "paperType" },
    { label: "Status", value: "isApproved" },
    { label: "Submitted By", value: "user.fullName" },
  ];

  return (
    <div className="">
      <ManageTable
        data={data}
        isvalue="paperadmin"
        columns={columns}
        loading={loading}
        onDelete={handleDelete}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default AllreserchPaperAdmin;
