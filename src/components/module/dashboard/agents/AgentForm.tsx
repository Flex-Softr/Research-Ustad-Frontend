"use client";

import { useState, useEffect } from "react";
import {
  UserPlus,
  Building,
  Phone,
  Mail,
  MapPin,
  User,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAgent } from "@/services/agents";
import { getAllCompanies, type Company } from "@/services/company";
import { toast } from "sonner";

export default function AgentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    companyName: "",
    fullAddress: "",
    images: [] as string[],
  });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Load companies on component mount
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoadingCompanies(true);
        const result = await getAllCompanies();

        if (result.success && result.data) {
          setCompanies(result.data);
        } else {
          console.error("Failed to load companies:", result.message);
          toast.error("Failed to load companies");
        }
      } catch (error) {
        console.error("Error loading companies:", error);
        toast.error("Error loading companies");
      } finally {
        setLoadingCompanies(false);
      }
    };

    loadCompanies();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast.error("Please enter full name");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter phone number");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter email");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Please enter password");
      return;
    }
    if (!formData.companyName.trim()) {
      toast.error("Please select a company");
      return;
    }
    if (!formData.fullAddress.trim()) {
      toast.error("Please enter full address");
      return;
    }

    setIsLoading(true);

    try {
      const result = await createAgent(formData);

      if (result.success) {
        toast.success("Agent created successfully!");
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          password: "",
          companyName: "",
          fullAddress: "",
          images: [],
        });
      } else {
        toast.error(result.message || "Failed to create agent");
      }
    } catch (error) {
      console.error("Error creating agent:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Create New Agent
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label
            htmlFor="fullName"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <User className="h-4 w-4" />
            Full Name *
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="Enter full name..."
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Phone className="h-4 w-4" />
            Phone Number *
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+8801712345678"
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Mail className="h-4 w-4" />
            Email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="john.doe@example.com"
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Lock className="h-4 w-4" />
            Password *
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Enter password..."
            required
            disabled={isLoading}
            className="w-full"
          />
        </div>

        {/* Company Name Dropdown */}
        <div className="space-y-2">
          <Label
            htmlFor="companyName"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Building className="h-4 w-4" />
            Company *
          </Label>
          <Select
            value={formData.companyName}
            onValueChange={(value) => handleInputChange("companyName", value)}
            disabled={isLoading || loadingCompanies}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  loadingCompanies ? "Loading companies..." : "Select a company"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company._id} value={company.name}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Full Address */}
        <div className="space-y-2">
          <Label
            htmlFor="fullAddress"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <MapPin className="h-4 w-4" />
            Full Address *
          </Label>
          <Textarea
            id="fullAddress"
            name="fullAddress"
            value={formData.fullAddress}
            onChange={(e) => handleInputChange("fullAddress", e.target.value)}
            placeholder="Enter full address..."
            required
            disabled={isLoading}
            className="w-full min-h-[80px]"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || loadingCompanies}
          className="w-full"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Creating Agent...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Create Agent
            </div>
          )}
        </Button>
      </form>
    </div>
  );
}
