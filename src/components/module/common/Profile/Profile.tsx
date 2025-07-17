"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { logout } from "@/services/AuthService";
import { ChangePassword } from "@/services/ChangePassword";
import { GetMe } from "@/services/singleUser";
import { TUser, UserProfile } from "@/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  console.log(user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ oldPassword: string; newPassword: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetMe();
        setUser(result?.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      if (data) {
        const res = await ChangePassword(data);
        if (res.success) {
          reset();
          logout();
          router.push("/");
          toast.success("Password changed successfully!");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className=" flex justify-center items-center bg-gray-100 p-6">
      <Card className="w-full max-w-5xl shadow-xl rounded-md bg-white flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-2/5 border mx-5  shadow-xl  text-gray-600 p-8 flex flex-col items-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <Avatar className="w-24 h-24 border-4 mt-8 border-white shadow-md">
            {/* Check if imageUrl is available */}
            {user?.image ? (
              <AvatarImage src={user.image} alt={user.role} />
            ) : (
              // If imageUrl is not available, show the fallback (initials)
              <AvatarFallback className="text-2xl font-bold">
                {user?.fullName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <CardTitle className="text-2xl mt-4 text-center font-semibold">
            {user?.fullName}
          </CardTitle>
          <p className=" text-lg text-center mt-1">
            {" "}
            <span className=" font-semibold"> Role: </span> {user?.role}
          </p>
          <p className=" text-sm text-center mt-2">
            {" "}
            <span className=" font-semibold"> Email: </span> {user?.email}
          </p>
          <p className=" text-sm text-center mt-2">
            {" "}
            <span className=" font-semibold"> Designation: </span>{" "}
            {user?.designation}
          </p>
        </div>

        {/* Main Content */}
        <CardContent className="w-full md:w-3/5 p-8">
          {/* Password Change Notice */}
          <div
            className={`p-4 rounded-md mb-4 text-center font-semibold 
            ${
              user?.needsPasswordChange
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
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

          {/* Change Password */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Change Password
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Old Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Old Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter Old Password"
                  {...register("oldPassword", {
                    required: "Old password is required",
                  })}
                  className="w-full border rounded-md p-2"
                />
                {errors.oldPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter New Password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="w-full border rounded-md p-2"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full cursor-pointer  bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
              >
                Change Password
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
