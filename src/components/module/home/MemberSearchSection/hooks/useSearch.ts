import { useState } from "react";
import { SearchResult, ApiResponse } from "../types";
import { config } from "@/config";

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      setHasSearched(true);
      setError(null);

      try {
        const response = await fetch(
          `${config.api.baseUrl}/client/nid/${searchQuery.trim()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data: ApiResponse = await response.json();

        if (data.success && data.data) {
          setSearchResults([data.data]);
        } else {
          setSearchResults([]);
          setError(data.message || "No results found");
        }
      } catch (error) {
        console.error("Error searching for client:", error);
        setSearchResults([]);
        setError("Failed to search. Please try again.");
      } finally {
        setIsSearching(false);
      }
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
    setError(null);
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasSearched,
    error,
    handleSearch,
    clearSearch,
  };
};
