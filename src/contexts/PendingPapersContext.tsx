"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { GetPendingResearchPapers } from "@/services/allreserchPaper";

interface PendingPapersContextType {
  pendingCount: number;
  refreshPendingCount: () => Promise<void>;
  isLoading: boolean;
}

const PendingPapersContext = createContext<PendingPapersContextType | undefined>(undefined);

export const usePendingPapers = () => {
  const context = useContext(PendingPapersContext);
  if (context === undefined) {
    throw new Error("usePendingPapers must be used within a PendingPapersProvider");
  }
  return context;
};

interface PendingPapersProviderProps {
  children: React.ReactNode;
}

export const PendingPapersProvider: React.FC<PendingPapersProviderProps> = ({ children }) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPendingCount = async () => {
    try {
      setIsLoading(true);
      const response = await GetPendingResearchPapers();
      const count = response?.data?.length || 0;
      setPendingCount(count);
    } catch (error) {
      console.error("Error fetching pending papers count:", error);
      setPendingCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPendingCount = async () => {
    await fetchPendingCount();
  };

  useEffect(() => {
    fetchPendingCount();
  }, []);

  const value = {
    pendingCount,
    refreshPendingCount,
    isLoading,
  };

  return (
    <PendingPapersContext.Provider value={value}>
      {children}
    </PendingPapersContext.Provider>
  );
};
