"use client";

import React from "react";
import { Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoResultsProps {
  onClearSearch: () => void;
  error?: string | null;
}

const NoResults: React.FC<NoResultsProps> = ({ onClearSearch, error }) => {
  return (
    <div className="text-center py-12">
      {error ? (
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
      ) : (
        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      )}
      <h3 className="text-xl font-semibold text-white mb-2">
        {error ? "Search Error" : "No Results Found"}
      </h3>
      <p className="text-gray-300 mb-4">
        {error || "No members found matching your search criteria."}
      </p>
      <Button
        onClick={onClearSearch}
        variant="outline"
        className="border-white/30 text-white hover:bg-white/10"
      >
        Try Different Search
      </Button>
    </div>
  );
};

export default NoResults;
