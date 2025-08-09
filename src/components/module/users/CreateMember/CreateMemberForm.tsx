"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { ArrowLeft, UserPlus, Eye, EyeOff } from "lucide-react";
import { FormData } from "@/type";
import { useRouter } from "next/navigation";

// Role options array - must match backend enum values
const roleOptions = [
  "user",
  "admin", 
  "superAdmin"
];

// Designation options array - must match backend enum values
const designationOptions = [
  "Advisor",
  "Lead", 
  "Mentor_Panel",
  "Lead_Research_Associate",
  "Research_Associate"
];

const CreateMemberForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      role: "",
      designation: "",
    },
  });
  const onSubmit = async (data: FormData): Promise<void> => {
    setLoading(true);

    // Validate required fields
    if (!data.role) {
      toast.error("Please select a role");
      setLoading(false);
      return;
    }

    if (!data.designation) {
      toast.error("Please select a designation");
      setLoading(false);
      return;
    }

    const payload = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role,
      designation: data.designation,
      contactNo: data.contactNo || "",
    };

    try {
      const res = await registerUser(payload);
      console.log(res);
      if (res.success) {
        reset();
        setSelectedRole("");
        setSelectedDesignation("");
        setShowPassword(false);
        toast.success("Member created successfully");
      } else {
        toast.error(
          res.err?.code === 11000
            ? "This Email already exists!"
            : "An error occurred."
        );
      }
    } catch (error) {
      console.log("Error from backend:", error);
      toast.error("Member registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-4">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Member Management</h2>
          <p className="text-gray-600">Add new members to the research team</p>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/dashboard/allusers")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Users
        </Button>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name Field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg font-semibold mb-2 block">
              Full Name *
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter full name"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Full name must be at least 2 characters",
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Full name can only contain letters and spaces",
                },
              })}
              className={`transition-all duration-200 ${
                errors.fullName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "focus:border-blue-500 focus:ring-blue-500/20"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-lg font-semibold mb-2 block">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className={`transition-all duration-200 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "focus:border-blue-500 focus:ring-blue-500/20"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Contact Number Field */}
          <div className="space-y-2">
            <Label htmlFor="contactNo" className="text-lg font-semibold mb-2 block">
              Contact Number
            </Label>
            <Input
              id="contactNo"
              type="tel"
              placeholder="Enter contact number"
              {...register("contactNo", {
                pattern: {
                  value: /^[+]?[\d\s\-()]+$/,
                  message: "Please enter a valid contact number",
                },
              })}
              className={`transition-all duration-200 ${
                errors.contactNo
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "focus:border-blue-500 focus:ring-blue-500/20"
              }`}
            />
            {errors.contactNo && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {errors.contactNo.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-lg font-semibold mb-2 block">
              Password *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                })}
                className={`pr-10 transition-all duration-200 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "focus:border-blue-500 focus:ring-blue-500/20"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {errors.password.message}
              </p>
            )}
            <div className="text-xs text-gray-500 mt-1">
              Password must contain at least one uppercase letter, one lowercase
              letter, and one number
            </div>
          </div>

          {/* Role Field */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-lg font-semibold mb-2 block">
              Role *
            </Label>
            <Select
              value={selectedRole}
              onValueChange={(value) => {
                setSelectedRole(value);
                setValue("role", value);
              }}
            >
              <SelectTrigger className="w-full ">
                <SelectValue>{selectedRole || "Select a role"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Designation Field */}
          <div className="space-y-2">
            <Label htmlFor="designation" className="text-lg font-semibold mb-2 block">
               Designation *
            </Label>
            <Select
              value={selectedDesignation}
              onValueChange={(value) => {
                setSelectedDesignation(value);
                setValue("designation", value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>{selectedDesignation || "Select designation"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {designationOptions.map((designation) => (
                  <SelectItem key={designation} value={designation}>
                    {designation.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.designation && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {errors.designation.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full flex items-center justify-center py-3 text-lg font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Creating Member...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Create Member
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMemberForm;
