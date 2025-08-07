"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { DeletePaper, GetAllResearchPaperMy } from "@/services/allreserchPaper";
import { TPapers } from "@/type";
import { useEffect, useState } from "react";

const ResearchPapers = () => {
  const [data, setData] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllResearchPaperMy();
        setData(response?.data || []);
      } catch (error) {
        console.error("Error fetching research papers:", error);
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
        setLoading(true);
        const response = await GetAllResearchPaperMy();
        setData(response?.data || []);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting paper:", error);
    }
  };

  const columns = [
    { label: "Year", value: "year" },
    { label: "Title", value: "title" },
    { label: "Authors", value: "authors" },
    { label: "Journal", value: "journal" },
    { label: "Volume", value: "volume" },
    { label: "Impact Factor", value: "impactFactor" },
    { label: "Journal Rank", value: "journalRank" },
    { label: "Visit Link", value: "visitLink" },
    { label: "Paper Type", value: "paperType" },
  ];

  return (
    <div className=" w-full">
      <ManageTable
        data={data}
        isvalue="paper"
        columns={columns}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ResearchPapers;
