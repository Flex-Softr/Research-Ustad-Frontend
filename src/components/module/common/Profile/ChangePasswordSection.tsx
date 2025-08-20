"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { logout } from "@/services/AuthService";
import { ChangePassword } from "@/services/ChangePassword";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  Check,
  CheckCircle,
  CheckCircle2,
  CheckCircle2Icon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
} from "lucide-react";

interface ChangePasswordSectionProps {
  user: any;
}
const ChangePasswordSection = ({ user }: ChangePasswordSectionProps) => {
  const router = useRouter();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ oldPassword: string; newPassword: string }>();

  const onSubmit = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    // Clear any previous password errors
    setPasswordError(null);

    try {
      if (data) {
        const res = await ChangePassword(data);
        if (res.success) {
          reset();
          logout();
          router.push("/");
          toast.success("Password changed successfully!");
        } else {
          // Handle specific error cases
          if (
            res.message?.toLowerCase().includes("current password") ||
            res.message?.toLowerCase().includes("old password") ||
            res.message?.toLowerCase().includes("incorrect password")
          ) {
            setPasswordError("Current password is incorrect");
            toast.error(
              "Current password is incorrect. Please check and try again."
            );
          } else {
            toast.error(
              res.message || "Failed to change password. Please try again."
            );
          }
        }
      }
    } catch (error: any) {
      console.error(error);
      // Check if it's a network error or specific password error
      if (
        error?.message?.toLowerCase().includes("current password") ||
        error?.message?.toLowerCase().includes("old password") ||
        error?.message?.toLowerCase().includes("incorrect password")
      ) {
        setPasswordError("Current password is incorrect");
        toast.error(
          "Current password is incorrect. Please check and try again."
        );
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    }
  };

  return (
    <Card className="shadow-lg rounded-lg">
      <CardContent className="p-6">
        {/* Password Change Notice */}
        <div
          className={`p-4 rounded-md mb-6 text-center font-semibold 
          ${
            user?.needsPasswordChange
              ? "bg-green-100 text-green-600"
              : "bg-blue-100 text-blue-600"
          }
        `}
        >
          {user?.needsPasswordChange ? (
            <p>Please change your password as soon as possible!</p>
          ) : (
            <div>
              <p>Password Up to Date</p>
              <p>
                Password changed at:{" "}
                {new Date(user?.passwordChangedAt as string).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Change Password Form */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <LockIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Change Password
              </h3>
              <p className="text-sm text-gray-600">
                Update your account password for better security
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Old Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Current Password
              </label>
              <div className="relative">
                <Input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  {...register("oldPassword", {
                    required: "Current password is required",
                  })}
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.oldPassword || passwordError
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-gray-600 transition-colors"
                >
                  {showOldPassword ? (
                    <EyeIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeOffIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {(errors.oldPassword || passwordError) && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircleIcon className="w-4 h-4 flex-shrink-0" />
                  {passwordError || errors.oldPassword?.message}
                </div>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                    },
                  })}
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.newPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-gray-600 transition-colors"
                >
                  {showNewPassword ? (
                    <EyeIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeOffIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircleIcon className="w-4 h-4 flex-shrink-0" />
                  {errors.newPassword.message}
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Password Requirements:
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-600">
                    At least 6 characters long
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-600">
                    Contains uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-600">
                    Contains lowercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-gray-600">Contains number</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2Icon />
                Update Password
              </div>
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-semibold text-yellow-800">
                  Security Notice
                </h5>
                <p className="text-sm text-yellow-700 mt-1">
                  After changing your password, you will be automatically logged
                  out for security purposes. Please log in again with your new
                  password.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordSection;
