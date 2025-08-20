"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { GetAllUsers, PromoteRole } from "@/services/Users";
import { TUser } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UserAvatar from "@/components/shared/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { logout } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { GetMe } from "@/services/singleUser";

interface ManageAllUserProps {
  data?: TUser[];
}

const ManageAllUser = ({ data: initialData }: ManageAllUserProps) => {
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [data, setData] = useState<TUser[]>(initialData || []);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await GetAllUsers();
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) {
      fetchData();
    } else {
      // Use initial data immediately for better UX
      setData(initialData);
      setLoading(false);
    }
  }, [initialData]);

  const handleRoleChange = async (id: string, currentRole: string) => {
    try {
      if (currentRole === "superAdmin") {
        toast.error("SuperAdmin role cannot be changed");
        return;
      }

      const res = await PromoteRole(id);
      if (res?.success) {
        const newRole = currentRole === "admin" ? "user" : "admin";

        // Update local state immediately for instant feedback
        setData((prevData) =>
          prevData.map((user) =>
            user._id === id ? { ...user, role: newRole } : user
          )
        );

        // Check if the response indicates token invalidation
        if (res?.data?.requiresReauth) {
          // Check if the current user is the one being changed
          try {
            const currentUser = await GetMe();
            if (currentUser?.data?._id === id) {
              // Current user's role was changed, log them out
              const roleChangeType =
                newRole === "admin" ? "promoted to admin" : "demoted to user";
              toast.info(
                `You have been ${roleChangeType}. You will be logged out and redirected to the home page.`
              );

              // Wait a moment for the toast to be visible
              // setTimeout(async () => {
              await logout();
              router.push("/");
              // }, 2000);
            } else {
              // Another user's role was changed - show single success message with logout info
              const roleChangeMessage =
                newRole === "admin"
                  ? "User promoted to admin successfully"
                  : "Admin demoted to user successfully";
              toast.success(`${roleChangeMessage} for ${res?.data?.fullName}. `);
            }
          } catch (error) {
            console.error("Error checking current user:", error);
            // Show single success message with logout info
            const roleChangeMessage =
              newRole === "admin"
                ? "User promoted to admin successfully"
                : "Admin demoted to user successfully";
            toast.success(`${roleChangeMessage} for ${res?.data?.fullName}. `);
          }
        } else {
          // No token invalidation needed, show simple success message
          const roleChangeMessage =
            newRole === "admin"
              ? "User promoted to admin successfully"
              : "Admin demoted to user successfully";
          toast.success(`${roleChangeMessage} for ${res?.data?.fullName}`);
        }

        // Also refresh from server to ensure consistency
        fetchData();
      } else {
        toast.error(res?.message || "Failed to change role");
      }
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("Failed to change role");
    }
  };

  // Custom renderer for user image and enhanced display
  const customRenderCell = (column: any, item: TUser) => {
    if (column.value === "fullName") {
      return (
        <div className="flex items-center space-x-3">
          <UserAvatar
            src={item.image}
            alt={item.fullName}
            name={item.fullName}
            size="md"
          />
          <div>
            <div className="font-medium text-gray-900">{item.fullName}</div>
            {item.designation && (
              <div className="text-xs text-gray-500">{item.designation}</div>
            )}
          </div>
        </div>
      );
    }

    if (column.value === "role") {
      return (
        <Badge
          variant="outline"
          className={`text-xs ${
            item.role === "superAdmin"
              ? "bg-purple-100 text-purple-800 border-purple-200"
              : item.role === "admin"
              ? "bg-blue-100 text-blue-800 border-blue-200"
              : "bg-green-100 text-green-800 border-green-200"
          }`}
        >
          {item.role === "superAdmin"
            ? "Super Admin"
            : item.role === "admin"
            ? "Admin"
            : "User"}
        </Badge>
      );
    }

    return null; // Let the default renderer handle other columns
  };

  const columns = [
    { label: "Name", value: "fullName" },
    { label: "Email", value: "email" },
    { label: "Role", value: "role" },
  ];

  return (
    <div className="w-full space-y-6">
      <ManageTable
        data={data}
        isvalue="userRole"
        columns={columns}
        loading={loading}
        onRoleChange={handleRoleChange}
        customRenderCell={customRenderCell}
      />
    </div>
  );
};

export default ManageAllUser;
