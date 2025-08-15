"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SearchResult } from "../types";
import MemberProfile from "./MemberProfile";
import CompanyRecordCard from "./CompanyRecordCard";

interface SearchResultsProps {
  searchResults: SearchResult[];
  onClearSearch: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  onClearSearch,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Search Results ({searchResults.length})
        </h2>
        <Button
          onClick={onClearSearch}
          variant="outline"
          className="border-white/30 text-black hover:bg-white/10"
        >
          Clear Search
        </Button>
      </div>

      {searchResults.map((result) => (
        <div key={result._id} className="bg-gray-100 rounded-lg p-6 shadow-lg">
          {/* Member Profile Section */}
          <MemberProfile member={result} />

          {/* Client Records Cards Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Client Records:</h4>

            {result.clientRecords.map((record, index) => (
              <CompanyRecordCard
                key={record._id}
                record={record}
                index={index}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
