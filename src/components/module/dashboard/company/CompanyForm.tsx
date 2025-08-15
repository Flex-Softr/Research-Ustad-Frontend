"use client";

import { useState } from "react";
import { Building, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllCompanies, createCompany } from "@/services/company/index";
import { toast } from "sonner";

export default function CompanyForm() {
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }

    setIsLoading(true);

    try {
      const result = await createCompany(companyName.trim());

      if (result.success) {
        toast.success("Company created successfully!");
        setCompanyName(""); // Reset form
      } else {
        toast.error(result.message || "Failed to create company");
      }
    } catch (error) {
      console.error("Error creating company:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border p-8 w-full mx-auto"
      style={{ fontFamily: "'Siyam Rupali', sans-serif" }}
    >
      <div className="flex items-center gap-3 mb-8">
        <Building className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-900">
          Create New Company
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="companyName"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Building className="h-4 w-4" />
            Company Name *
          </Label>
          <Input
            id="companyName"
            name="companyName"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name..."
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-blue-200 text-lg"
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isLoading || !companyName.trim()}
            className="w-full md:w-1/3 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-200 shadow-md"
            style={{ fontFamily: "'Siyam Rupali', sans-serif" }}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create Company
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
