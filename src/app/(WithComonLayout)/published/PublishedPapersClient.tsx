"use client";

import { ResearchPapersPage } from "@/components/module/common/AllPapers";
import { GetAllResearchPaperPublicByStatus } from "@/services/allreserchPaper";
import { useEffect, useState } from "react";
import { TPapers } from "@/type/research";

const PublishedPapersClient = () => {
  const [papers, setPapers] = useState<TPapers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch only published research papers
        const papersData = await GetAllResearchPaperPublicByStatus("published");

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

        console.log("Fetched published papers count:", fetchedPapers.length);

        // Sort papers by year in descending order (latest to oldest) as a fallback
        fetchedPapers.sort((a, b) => b.year - a.year);
        
        setPapers(fetchedPapers);
      } catch (err) {
        console.error("Error fetching published papers:", err);
        setError("Failed to fetch published research papers");
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
          <p className="text-gray-600">Loading published research papers...</p>
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
      <ResearchPapersPage papers={papers} initialStatus="published" />
    </div>
  );
};

export default PublishedPapersClient;
