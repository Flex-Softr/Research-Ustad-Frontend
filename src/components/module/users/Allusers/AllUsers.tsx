"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { GetAllUsers, PromoteRole } from "@/services/Users";
import { TUser } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, UserCheck } from "lucide-react";

interface ManageAllUserProps {
  data?: TUser[];
}

const ManageAllUser = ({ data: initialData }: ManageAllUserProps) => {
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [data, setData] = useState<TUser[]>(initialData || []);

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
        toast.success(`Successfully changed role for ${res?.data?.fullName}`);

        // Update local state immediately for instant feedback
        setData((prevData) =>
          prevData.map((user) =>
            user._id === id
              ? { ...user, role: user.role === "admin" ? "user" : "admin" }
              : user
          )
        );

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
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.image} alt={item.fullName} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-semibold">
              {item.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
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
