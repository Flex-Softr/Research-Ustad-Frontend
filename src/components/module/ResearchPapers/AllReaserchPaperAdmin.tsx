"use client";
import { TPapers } from "@/type";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { DeletePaper, GetAllResearchPaper, GetAllResearchPaperMy } from "@/services/allreserchPaper";
import { useState, useEffect } from "react";

const AllreserchPaperAdmin = () => {
  const [data, setData] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllResearchPaper();
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
    { label: "Journal Type", value: "journalType" },
  ];

  return (
    <div className=" lg:w-[990px]">
      <ManageTable 
        data={data} 
        isvalue="paperadmin" 
        columns={columns} 
        loading={loading} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default AllreserchPaperAdmin;
