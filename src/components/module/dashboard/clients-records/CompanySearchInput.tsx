"use client";

import { useState, useEffect } from "react";
import { Building, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllCompanies, type Company } from "@/services/company";

interface CompanySearchInputProps {
  value: string;
  onChange: (value: string, companyId: string) => void;
  onRemove: () => void;
  selectedCompany: Company | null;
  disabled?: boolean;
  required?: boolean;
}

export default function CompanySearchInput({
  value,
  onChange,
  onRemove,
  selectedCompany,
  disabled = false,
  required = false,
}: CompanySearchInputProps) {
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Load all companies once on component mount
  useEffect(() => {
    const loadAllCompanies = async () => {
      try {
        console.log("Loading all companies...");
        setLoadingCompanies(true);
        const result = await getAllCompanies();

        if (result.success && result.data) {
          console.log("Companies loaded:", result.data.length);
          setAllCompanies(result.data);
        } else {
          console.error("Failed to load companies:", result.message);
          setAllCompanies([]);
        }
      } catch (error) {
        console.error("Error loading companies:", error);
        setAllCompanies([]);
      } finally {
        setLoadingCompanies(false);
      }
    };

    loadAllCompanies();
  }, []);

  // Client-side filtering based on search value
  useEffect(() => {
    // Don't show dropdown if a company is selected from dropdown
    if (selectedCompany && selectedCompany._id) {
      setShowCompanyDropdown(false);
      setFilteredCompanies([]);
      return;
    }

    if (value.trim() === "") {
      // If no search value, show all companies when dropdown is open
      if (showCompanyDropdown) {
        setFilteredCompanies(allCompanies);
      } else {
        setFilteredCompanies([]);
      }
      return;
    }

    // Filter companies based on search term
    const filtered = allCompanies.filter((company) =>
      company.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCompanies(filtered);
    setShowCompanyDropdown(true);
  }, [value, allCompanies, showCompanyDropdown, selectedCompany]);

  // Click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".company-search-container")) {
        setShowCompanyDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCompanySelect = (company: Company) => {
    console.log("Company selected:", company);
    // Immediately set the selected company and update the input value
    onChange(company.name, company._id);
    setShowCompanyDropdown(false);
    setHighlightedIndex(-1);
    console.log("Dropdown should be closed now");
  };

  const handleRemoveCompany = () => {
    onRemove();
    setHighlightedIndex(-1);
    // Re-enable the input for new selection
    setShowCompanyDropdown(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If a company is selected from dropdown, only allow Escape key
    if (selectedCompany && selectedCompany._id) {
      if (e.key === "Escape") {
        handleRemoveCompany();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredCompanies.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCompanies.length - 1
      );
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      const company = filteredCompanies[highlightedIndex];
      if (company) {
        handleCompanySelect(company);
      }
    } else if (e.key === "Escape") {
      setShowCompanyDropdown(false);
      setHighlightedIndex(-1);
    }
  };

  const handleInputFocus = () => {
    // Only allow focus if no company is selected from dropdown
    if (selectedCompany && selectedCompany._id) {
      return;
    }

    if (!loadingCompanies && allCompanies.length > 0) {
      setShowCompanyDropdown(true);
      setFilteredCompanies(allCompanies);
    }
  };

  const handleInputClick = () => {
    // Only allow click if no company is selected from dropdown
    if (selectedCompany && selectedCompany._id) {
      return;
    }

    if (!loadingCompanies && allCompanies.length > 0) {
      setShowCompanyDropdown(true);
      setFilteredCompanies(allCompanies);
    }
  };

  const handleCompanyChange = (newValue: string) => {
    // Don't allow typing if a company is selected from dropdown
    if (selectedCompany && selectedCompany._id) {
      return;
    }

    onChange(newValue, ""); // Clear company ID when typing

    if (newValue.trim() === "") {
      // If input is empty but dropdown is open, show all companies
      if (showCompanyDropdown) {
        setFilteredCompanies(allCompanies);
      } else {
        setFilteredCompanies([]);
      }
      return;
    }

    // Show dropdown immediately for better UX
    setShowCompanyDropdown(true);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="company" className="flex items-center gap-2">
        <Building className="h-4 w-4" />
        Company {required && "*"}
      </Label>
      <div className="relative company-search-container">
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {loadingCompanies ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            ) : (
              <Building className="h-4 w-4 text-gray-400" />
            )}
          </div>
          <Input
            id="company"
            name="company"
            value={value}
            onChange={(e) => handleCompanyChange(e.target.value)}
            placeholder={
              loadingCompanies
                ? "Loading companies..."
                : selectedCompany && selectedCompany._id
                ? "Company selected"
                : "Search for a company..."
            }
            required={required}
            className={`pl-10 ${
              selectedCompany && selectedCompany._id ? "pr-10 bg-gray-50" : ""
            }`}
            disabled={
              disabled ||
              loadingCompanies ||
              !!(selectedCompany && selectedCompany._id)
            }
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onClick={handleInputClick}
          />
          {selectedCompany && selectedCompany._id && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveCompany}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Company Dropdown - Styled like airport search */}
        {showCompanyDropdown &&
          !(selectedCompany && selectedCompany._id) &&
          filteredCompanies.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {filteredCompanies.map((company, index) => (
                <div
                  key={company._id}
                  className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                    highlightedIndex === index ? "bg-blue-100" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCompanySelect(company);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseLeave={() => setHighlightedIndex(-1)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">
                        {company.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Status: {company.status}
                      </div>
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      {company._id.slice(-6).toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        {/* Loading state */}
        {loadingCompanies && !(selectedCompany && selectedCompany._id) && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">
                Loading companies...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
