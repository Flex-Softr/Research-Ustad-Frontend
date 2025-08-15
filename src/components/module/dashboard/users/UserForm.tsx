"use client";

import { useState, useEffect } from "react";
import {
  UserPlus,
  Phone,
  Mail,
  MapPin,
  User,
  Lock,
  Shield,
  Eye,
  EyeOff,
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
  // SelectValue, // Remove due to lint error
} from "@/components/ui/select";
import { createUser } from "@/services/Users";
import { type Company } from "@/services/company";
import { toast } from "sonner";
import CompanySearchInput from "@/components/module/dashboard/clients-records/CompanySearchInput";
import { getCurrentUser } from "@/services/AuthService";

export default function UserForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    role: "",
    company: "",
    fullAddress: "",
    images: [] as string[],
  });
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<string>("");

  // Get current user role on component mount
  useEffect(() => {
    const getCurrentUserRole = async () => {
      try {
        const userInfo = await getCurrentUser();
        if (userInfo) {
          const jwtPayload = userInfo as any;
          setCurrentUserRole(jwtPayload.role || "agent");
        }
      } catch (error) {
        console.error("Error getting current user role:", error);
      }
    };

    getCurrentUserRole();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCompanyChange = (companyName: string, companyId: string) => {
    setFormData((prev) => ({
      ...prev,
      company: companyId, // Store company ID, not name
    }));

    // Update selected company state
    if (companyId) {
      setSelectedCompany({
        _id: companyId,
        name: companyName,
        status: "active",
        createdAt: new Date().toISOString(),
        id: companyId,
      });
    } else {
      setSelectedCompany(null);
    }
  };

  const handleCompanyRemove = () => {
    setFormData((prev) => ({
      ...prev,
      company: "",
    }));
    setSelectedCompany(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    if (!formData.role.trim()) {
      toast.error("Please select a user role");
      return;
    }
    if (!formData.company.trim()) {
      toast.error("Please select a company");
      return;
    }
    if (!formData.fullAddress.trim()) {
      toast.error("Please enter full address");
      return;
    }

    // Role validation based on current user role
    if (currentUserRole === "admin" && formData.role === "admin") {
      toast.error("Admin users cannot create other admin users");
      return;
    }

    // Debug logging
    console.log("Form data being sent:", formData);
    console.log("Selected company:", selectedCompany);

    setIsLoading(true);

    try {
      const result = await createUser(formData);

      if (result.success) {
        toast.success("User created successfully!");
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          password: "",
          role: "",
          company: "",
          fullAddress: "",
          images: [],
        });
        setSelectedCompany(null);
        setShowPassword(false);
      } else {
        toast.error(result.message || "Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border p-8 w-full  mx-auto"
      style={{ fontFamily: "'Siyam Rupali', sans-serif" }}
    >
      <div className="flex items-center gap-3 mb-8">
        <UserPlus className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-semibold text-gray-900">
          Create New User
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      >
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
            className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-200"
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
            className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-200"
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
            className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-200"
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
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter password..."
              required
              disabled={isLoading}
              className="w-full px-4 py-2 pr-10 rounded-md border focus:ring-2 focus:ring-blue-200"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={togglePasswordVisibility}
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        {/* Full Address (span both columns) */}
        <div className="space-y-2 md:col-span-2">
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
            className="w-full min-h-[80px] px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Company Name - Using CompanySearchInput */}
        <div className="space-y-2">
          <CompanySearchInput
            value={selectedCompany?.name || ""}
            onChange={handleCompanyChange}
            onRemove={handleCompanyRemove}
            selectedCompany={selectedCompany}
            disabled={isLoading}
            required
          />
        </div>
        {/* User Role */}
        <div className="space-y-2">
          <Label
            htmlFor="userRole"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <Shield className="h-4 w-4" />
            User Role *
          </Label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleInputChange("role", value)}
            // disabled={isLoading} // Remove, as Select does not support disabled prop
          >
            <SelectTrigger className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-200">
              {/* <SelectValue placeholder="Select user role" /> */}
              {formData.role ? (
                <span>{formData.role === "admin" ? "Admin" : "Agent"}</span>
              ) : (
                <span className="text-gray-400">Select user role</span>
              )}
            </SelectTrigger>
            <SelectContent>
              {/* Superadmin can create both admin and agent */}
              {currentUserRole === "superadmin" && (
                <>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                </>
              )}
              {/* Admin can only create agent */}
              {currentUserRole === "admin" && (
                <SelectItem value="agent">Agent</SelectItem>
              )}
              {/* Agent cannot create users (this shouldn't be visible due to route protection) */}
              {currentUserRole === "agent" && (
                <SelectItem value="agent">Agent (No Permission)</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button (span both columns, centered) */}
        <div className="md:col-span-2 flex justify-center mt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-1/3 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-200 shadow-md"
            style={{ fontFamily: "'Siyam Rupali', sans-serif" }}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating User...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Create User
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
