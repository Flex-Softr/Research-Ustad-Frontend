"use client";

import { ResearchPapersPage } from "@/components/module/common/AllPapers";
import { GetAllResearchPaperPublic } from "@/services/allreserchPaper";
import { useEffect, useState } from "react";
import { TPapers } from "@/type/research";

const AllPapersClient = () => {
  const [papers, setPapers] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all research papers (no status filter)
        const papersData = await GetAllResearchPaperPublic();

        // Handle different response scenarios
        let fetchedPapers: TPapers[] = [];

        if (papersData?.success && papersData?.data) {
          fetchedPapers = papersData.data;
        } else if (papersData?.data) {
          // If no success flag but data exists
          fetchedPapers = papersData.data;
        } else {
          fetchedPapers = [];
        }

        console.log("Fetched all papers count:", fetchedPapers.length);

        // Sort papers by year in descending order (latest to oldest) as a fallback
        fetchedPapers.sort((a, b) => b.year - a.year);
        
        setPapers(fetchedPapers);
      } catch (err) {
        console.error("Error fetching papers:", err);
        setError("Failed to fetch research papers");
        setPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading research papers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ResearchPapersPage papers={papers} />
    </div>
  );
};

export default AllPapersClient;
