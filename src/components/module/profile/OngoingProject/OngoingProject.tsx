"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeletePaper } from "@/services/allreserchPaper";
import { TPapers } from "@/type";
import { useState } from "react";
import { toast } from "sonner";
import ManageTable from "@/components/shared/ManageTable/ManageTable";

const OngoingProject = ({data}:{data:TPapers[]}) => {
  const [ongotinProjects, setOngoingProjects] = useState<TPapers[]>(data);

  const handleDelete = async (id: string) => {
    try {
      const res = await DeletePaper(id);
      if (res) {
        toast.success("Research paper deleted successfully");
        setOngoingProjects(prev => prev.filter(paper => paper._id !== id));
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
    { label: "Status", value: "isApproved" },
    { label: "Visit Link", value: "visitLink" },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Research Papers</h2>
      <ManageTable
        data={ongotinProjects}
        isvalue="ongoingproject"
        columns={columns}
        loading={false}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default OngoingProject;
