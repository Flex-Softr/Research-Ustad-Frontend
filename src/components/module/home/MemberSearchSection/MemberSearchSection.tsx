"use client";

import React from "react";
import {
  SearchBar,
  SearchResults,
  LoadingState,
  NoResults,
  FeatureHighlights,
} from "./components";
import { useSearch } from "./hooks";

const MemberSearchSection = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    hasSearched,
    error,
    handleSearch,
    clearSearch,
  } = useSearch();

  return (
    <section className="relative min-h-screen bg-gradient-to-br bg-brand-primary overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Search for Member Records
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Search for member profiles using their NID number to access
            comprehensive client records and information.
          </p>
        </div>

        {/* Search Bar Component */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSubmit={handleSearch}
          isSearching={isSearching}
        />

        {/* Search Results Section */}
        {hasSearched && (
          <div className="max-w-6xl mx-auto mb-12">
            {isSearching ? (
              <LoadingState />
            ) : searchResults.length > 0 ? (
              <SearchResults
                searchResults={searchResults}
                onClearSearch={clearSearch}
              />
            ) : (
              <NoResults onClearSearch={clearSearch} error={error} />
            )}
          </div>
        )}

        {/* Additional Features */}
        {!hasSearched && <FeatureHighlights />}
      </div>
    </section>
  );
};

export default MemberSearchSection;
